-- Query to get name and date of birth for all patients
SELECT 
    u."firstName" || ' ' || u."lastName" AS patient_name,
    u."dateOfBirth" AS date_of_birth
FROM 
    users u
JOIN 
    patient_profiles pp ON u.id = pp."userId"
WHERE 
    u.role = 'PATIENT'
ORDER BY 
    u."lastName", u."firstName";
