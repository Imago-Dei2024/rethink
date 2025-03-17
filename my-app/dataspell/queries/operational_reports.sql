-- Operational Reports
-- These queries can be used for operational reporting and administrative tasks

-- 1. User Activity Audit
SELECT 
    al.action,
    al."resourceType",
    COUNT(*) AS action_count,
    MIN(al.timestamp) AS first_occurrence,
    MAX(al.timestamp) AS last_occurrence
FROM 
    audit_logs al
WHERE 
    al.timestamp > CURRENT_DATE - INTERVAL '30 days'
GROUP BY 
    al.action, al."resourceType"
ORDER BY 
    action_count DESC;

-- 2. System Usage by Hour of Day
SELECT 
    EXTRACT(HOUR FROM al.timestamp) AS hour_of_day,
    COUNT(*) AS activity_count
FROM 
    audit_logs al
WHERE 
    al.timestamp > CURRENT_DATE - INTERVAL '7 days'
GROUP BY 
    hour_of_day
ORDER BY 
    hour_of_day;

-- 3. Document Storage Analysis
SELECT 
    "documentType",
    COUNT(*) AS document_count,
    SUM("fileSize") / (1024*1024) AS total_size_mb,
    AVG("fileSize") / 1024 AS avg_size_kb
FROM 
    documents
GROUP BY 
    "documentType"
ORDER BY 
    total_size_mb DESC;

-- 4. Message Response Time Analysis
WITH message_pairs AS (
    SELECT 
        m1.id AS original_message_id,
        m1."senderId",
        m1."recipientId",
        m1."sentAt" AS original_sent_at,
        MIN(m2."sentAt") AS response_sent_at
    FROM 
        messages m1
    LEFT JOIN 
        messages m2 ON m1."senderId" = m2."recipientId" 
                    AND m1."recipientId" = m2."senderId"
                    AND m2."sentAt" > m1."sentAt"
    GROUP BY 
        m1.id, m1."senderId", m1."recipientId", m1."sentAt"
)
SELECT 
    u.role AS sender_role,
    AVG(EXTRACT(EPOCH FROM (response_sent_at - original_sent_at)) / 3600) AS avg_response_time_hours,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM (response_sent_at - original_sent_at)) / 3600) AS median_response_time_hours
FROM 
    message_pairs mp
JOIN 
    users u ON mp."senderId" = u.id
WHERE 
    mp.response_sent_at IS NOT NULL
GROUP BY 
    u.role;

-- 5. Appointment Scheduling Lead Time
SELECT 
    "appointmentType",
    AVG(EXTRACT(EPOCH FROM ("appointmentTime" - "createdAt")) / 86400) AS avg_lead_time_days,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY EXTRACT(EPOCH FROM ("appointmentTime" - "createdAt")) / 86400) AS median_lead_time_days
FROM 
    appointments
WHERE 
    "createdAt" > CURRENT_DATE - INTERVAL '90 days'
GROUP BY 
    "appointmentType"
ORDER BY 
    avg_lead_time_days DESC;

-- 6. Provider Availability Analysis
WITH provider_hours AS (
    SELECT 
        "providerId",
        "appointmentTime"::date AS work_date,
        MIN("appointmentTime"::time) AS first_appointment,
        MAX("appointmentTime"::time) AS last_appointment,
        COUNT(*) AS appointments_per_day
    FROM 
        appointments
    WHERE 
        "appointmentTime" > CURRENT_DATE - INTERVAL '30 days'
    GROUP BY 
        "providerId", work_date
)
SELECT 
    u."firstName" || ' ' || u."lastName" AS provider_name,
    p.specialty,
    AVG(ph.appointments_per_day) AS avg_appointments_per_day,
    AVG(EXTRACT(EPOCH FROM (ph.last_appointment - ph.first_appointment)) / 3600) AS avg_work_hours
FROM 
    provider_hours ph
JOIN 
    providers p ON ph."providerId" = p.id
JOIN 
    users u ON p."userId" = u.id
GROUP BY 
    provider_name, p.specialty
ORDER BY 
    avg_appointments_per_day DESC;
