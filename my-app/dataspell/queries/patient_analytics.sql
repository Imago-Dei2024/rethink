-- Patient Analytics Queries
-- These queries can be used in DataSpell for analyzing patient data

-- 1. Patient Demographics
SELECT 
    EXTRACT(YEAR FROM AGE(NOW(), u."dateOfBirth")) AS age,
    COUNT(*) AS patient_count
FROM 
    users u
JOIN 
    patient_profiles pp ON u.id = pp."userId"
WHERE 
    u.role = 'PATIENT'
GROUP BY 
    age
ORDER BY 
    age;

-- 2. Appointment Statistics by Month
SELECT 
    DATE_TRUNC('month', "appointmentTime") AS month,
    "appointmentType",
    COUNT(*) AS appointment_count,
    COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) AS completed,
    COUNT(CASE WHEN status = 'CANCELLED' THEN 1 END) AS cancelled,
    COUNT(CASE WHEN status = 'NO_SHOW' THEN 1 END) AS no_show
FROM 
    appointments
GROUP BY 
    month, "appointmentType"
ORDER BY 
    month DESC, "appointmentType";

-- 3. Provider Workload Analysis
SELECT 
    p.id AS provider_id,
    u."firstName" || ' ' || u."lastName" AS provider_name,
    p.specialty,
    COUNT(a.id) AS total_appointments,
    COUNT(DISTINCT a."patientId") AS unique_patients
FROM 
    providers p
JOIN 
    users u ON p."userId" = u.id
LEFT JOIN 
    appointments a ON p.id = a."providerId"
WHERE 
    a."appointmentTime" BETWEEN CURRENT_DATE - INTERVAL '30 days' AND CURRENT_DATE
GROUP BY 
    p.id, provider_name, p.specialty
ORDER BY 
    total_appointments DESC;

-- 4. Medication Prescription Trends
SELECT 
    "medicationName",
    COUNT(*) AS prescription_count,
    COUNT(DISTINCT "patientId") AS patient_count
FROM 
    medications
WHERE 
    status = 'ACTIVE'
GROUP BY 
    "medicationName"
ORDER BY 
    prescription_count DESC
LIMIT 20;

-- 5. Patient Engagement Metrics
SELECT 
    DATE_TRUNC('month', u."createdAt") AS signup_month,
    COUNT(DISTINCT u.id) AS new_patients,
    COUNT(DISTINCT a.id) AS appointments_booked,
    COUNT(DISTINCT m.id) AS messages_sent
FROM 
    users u
LEFT JOIN 
    patient_profiles pp ON u.id = pp."userId"
LEFT JOIN 
    appointments a ON pp.id = a."patientId" AND DATE_TRUNC('month', a."createdAt") = DATE_TRUNC('month', u."createdAt")
LEFT JOIN 
    messages m ON u.id = m."senderId" AND DATE_TRUNC('month', m."createdAt") = DATE_TRUNC('month', u."createdAt")
WHERE 
    u.role = 'PATIENT'
GROUP BY 
    signup_month
ORDER BY 
    signup_month DESC;
