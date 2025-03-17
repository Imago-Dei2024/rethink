#!/usr/bin/env python3
"""
Sample Data Generator for Mental Health Portal

This script generates sample data for the mental health portal database.
It creates users, patient profiles, providers, appointments, medical records,
medications, messages, documents, and audit logs.

Usage:
    python generate_sample_data.py

Requirements:
    - psycopg2
    - faker
    - python-dotenv
"""

import os
import sys
import random
import uuid
from datetime import datetime, timedelta
from pathlib import Path
from dotenv import load_dotenv

try:
    import psycopg2
    from psycopg2.extras import execute_values
    from faker import Faker
except ImportError:
    print("Required packages not found. Install with:")
    print("pip install psycopg2-binary faker python-dotenv")
    sys.exit(1)

# Load environment variables from .env file
env_path = Path('../../.env')
load_dotenv(dotenv_path=env_path)

# Database connection parameters
DB_PARAMS = {
    'host': 'localhost',
    'port': 5432,
    'database': 'mental_health_portal',
    'user': 'connorlaber',
    'password': 'password',  # Default from .env, will be overridden if set in environment
}

# Override with environment variables if set
if 'DATABASE_URL' in os.environ:
    # Parse DATABASE_URL
    db_url = os.environ['DATABASE_URL']
    # postgresql://postgres:password@localhost:5432/mental_health_portal?schema=public
    if db_url.startswith('postgresql://'):
        db_url = db_url.replace('postgresql://', '')
        user_pass, host_port_db = db_url.split('@')
        user, password = user_pass.split(':')
        host_port, db_schema = host_port_db.split('/')
        host, port = host_port.split(':')
        db = db_schema.split('?')[0]
        
        DB_PARAMS['user'] = user
        DB_PARAMS['password'] = password
        DB_PARAMS['host'] = host
        DB_PARAMS['port'] = int(port)
        DB_PARAMS['database'] = db

# Initialize Faker
fake = Faker()

# Sample data sizes
NUM_PATIENTS = 100
NUM_PROVIDERS = 10
NUM_APPOINTMENTS_PER_PATIENT = 5
NUM_RECORDS_PER_PATIENT = 3
NUM_MEDICATIONS_PER_PATIENT = 2
NUM_MESSAGES_PER_PATIENT = 5
NUM_DOCUMENTS_PER_PATIENT = 2
NUM_AUDIT_LOGS_PER_USER = 10

# Sample data lists
SPECIALTIES = [
    'Psychiatry', 'Psychology', 'Therapy', 'Counseling', 
    'Social Work', 'Addiction', 'Child & Adolescent', 'Geriatric'
]

APPOINTMENT_TYPES = [
    'Initial Consultation', 'Follow-up', 'Therapy Session', 
    'Medication Review', 'Crisis Intervention', 'Group Therapy'
]

APPOINTMENT_STATUSES = ['SCHEDULED', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']

RECORD_TYPES = [
    'Initial Assessment', 'Progress Note', 'Discharge Summary', 
    'Psychological Evaluation', 'Treatment Plan', 'Lab Results'
]

MEDICATION_NAMES = [
    'Fluoxetine', 'Sertraline', 'Escitalopram', 'Paroxetine', 'Citalopram',
    'Venlafaxine', 'Duloxetine', 'Bupropion', 'Mirtazapine', 'Trazodone',
    'Amitriptyline', 'Nortriptyline', 'Clomipramine', 'Imipramine', 'Doxepin',
    'Alprazolam', 'Clonazepam', 'Diazepam', 'Lorazepam', 'Oxazepam',
    'Lithium', 'Valproate', 'Lamotrigine', 'Carbamazepine', 'Topiramate',
    'Aripiprazole', 'Olanzapine', 'Quetiapine', 'Risperidone', 'Ziprasidone'
]

DOCUMENT_TYPES = [
    'Insurance Card', 'ID Document', 'Medical History', 'Consent Form',
    'Release of Information', 'Treatment Agreement', 'Lab Report'
]

AUDIT_ACTIONS = [
    'LOGIN', 'LOGOUT', 'CREATE', 'READ', 'UPDATE', 'DELETE'
]

RESOURCE_TYPES = [
    'USER', 'PATIENT_PROFILE', 'PROVIDER', 'APPOINTMENT', 
    'MEDICAL_RECORD', 'MEDICATION', 'MESSAGE', 'DOCUMENT'
]

def generate_uuid():
    """Generate a UUID string."""
    return str(uuid.uuid4())

def connect_to_db():
    """Connect to the PostgreSQL database."""
    try:
        conn = psycopg2.connect(
            host=DB_PARAMS['host'],
            port=DB_PARAMS['port'],
            database=DB_PARAMS['database'],
            user=DB_PARAMS['user'],
            password=DB_PARAMS['password']
        )
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        sys.exit(1)

def clear_existing_data(conn):
    """Clear existing data from all tables."""
    with conn.cursor() as cur:
        tables = [
            'audit_logs', 'documents', 'messages', 'medications',
            'medical_records', 'appointments', 'providers',
            'patient_profiles', 'users'
        ]
        
        for table in tables:
            cur.execute(f"TRUNCATE TABLE {table} CASCADE;")
        
        conn.commit()
        print("Cleared existing data from all tables.")

def generate_users(conn):
    """Generate user data."""
    patient_users = []
    provider_users = []
    
    # Generate patient users
    for _ in range(NUM_PATIENTS):
        user_id = generate_uuid()
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 999)}@example.com"
        dob = fake.date_of_birth(minimum_age=18, maximum_age=80)
        
        patient_users.append({
            'id': user_id,
            'email': email,
            'passwordHash': 'hashed_password_placeholder',  # In a real app, use proper hashing
            'firstName': first_name,
            'lastName': last_name,
            'dateOfBirth': dob,
            'phoneNumber': fake.phone_number(),
            'role': 'PATIENT'
        })
    
    # Generate provider users
    for _ in range(NUM_PROVIDERS):
        user_id = generate_uuid()
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = f"dr.{first_name.lower()}.{last_name.lower()}@example.com"
        dob = fake.date_of_birth(minimum_age=30, maximum_age=70)
        
        provider_users.append({
            'id': user_id,
            'email': email,
            'passwordHash': 'hashed_password_placeholder',  # In a real app, use proper hashing
            'firstName': first_name,
            'lastName': last_name,
            'dateOfBirth': dob,
            'phoneNumber': fake.phone_number(),
            'role': 'PROVIDER'
        })
    
    # Insert users into database
    with conn.cursor() as cur:
        user_columns = [
            'id', 'email', '"passwordHash"', '"firstName"', '"lastName"',
            '"dateOfBirth"', '"phoneNumber"', 'role', '"createdAt"', '"updatedAt"'
        ]
        
        user_values = []
        now = datetime.now()
        for user in patient_users + provider_users:
            user_values.append((
                user['id'], user['email'], user['passwordHash'],
                user['firstName'], user['lastName'], user['dateOfBirth'],
                user['phoneNumber'], user['role'], now, now
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO users ({', '.join(user_columns)})
            VALUES %s
            """,
            user_values
        )
        
        conn.commit()
        print(f"Generated {len(patient_users)} patient users and {len(provider_users)} provider users.")
    
    return patient_users, provider_users

def generate_patient_profiles(conn, patient_users):
    """Generate patient profile data."""
    patient_profiles = []
    
    for user in patient_users:
        profile_id = generate_uuid()
        
        patient_profiles.append({
            'id': profile_id,
            'user_id': user['id'],
            'address': fake.address(),
            'emergency_contact': f"{fake.name()}: {fake.phone_number()}",
            'insurance_provider': fake.company(),
            'insurance_id': fake.bothify(text='???-########'),
            'preferred_pharmacy': fake.company()
        })
    
    # Insert patient profiles into database
    with conn.cursor() as cur:
        profile_columns = [
            'id', '"userId"', 'address', '"emergencyContact"',
            '"insuranceProvider"', '"insuranceId"', '"preferredPharmacy"', '"createdAt"', '"updatedAt"'
        ]
        
        profile_values = []
        now = datetime.now()
        for profile in patient_profiles:
            profile_values.append((
                profile['id'], profile['user_id'], profile['address'],
                profile['emergency_contact'], profile['insurance_provider'],
                profile['insurance_id'], profile['preferred_pharmacy'], now, now
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO patient_profiles ({', '.join(profile_columns)})
            VALUES %s
            """,
            profile_values
        )
        
        conn.commit()
        print(f"Generated {len(patient_profiles)} patient profiles.")
    
    return patient_profiles

def generate_providers(conn, provider_users):
    """Generate provider data."""
    providers = []
    
    for user in provider_users:
        provider_id = generate_uuid()
        
        providers.append({
            'id': provider_id,
            'user_id': user['id'],
            'specialty': random.choice(SPECIALTIES),
            'credentials': f"{random.choice(['MD', 'PhD', 'PsyD', 'LCSW', 'LPC'])}, {random.choice(['Board Certified', 'Licensed', 'Certified'])}",
            'bio': fake.paragraph(nb_sentences=3)
        })
    
    # Insert providers into database
    with conn.cursor() as cur:
        provider_columns = [
            'id', '"userId"', 'specialty', 'credentials', 'bio', '"createdAt"', '"updatedAt"'
        ]
        
        provider_values = []
        now = datetime.now()
        for provider in providers:
            provider_values.append((
                provider['id'], provider['user_id'], provider['specialty'],
                provider['credentials'], provider['bio'], now, now
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO providers ({', '.join(provider_columns)})
            VALUES %s
            """,
            provider_values
        )
        
        conn.commit()
        print(f"Generated {len(providers)} providers.")
    
    return providers

def generate_appointments(conn, patient_profiles, providers):
    """Generate appointment data."""
    appointments = []
    
    for patient in patient_profiles:
        for _ in range(random.randint(1, NUM_APPOINTMENTS_PER_PATIENT)):
            appointment_id = generate_uuid()
            provider = random.choice(providers)
            
            # Generate a random date within the last year
            days_ago = random.randint(-365, 30)  # Past appointments and future ones
            appointment_date = datetime.now() + timedelta(days=days_ago)
            
            # Set status based on date
            if days_ago < 0:
                status = random.choice(['COMPLETED', 'CANCELLED', 'NO_SHOW'])
            else:
                status = random.choice(['SCHEDULED', 'CONFIRMED'])
            
            appointments.append({
                'id': appointment_id,
                'patient_id': patient['id'],
                'provider_id': provider['id'],
                'appointment_time': appointment_date,
                'appointment_type': random.choice(APPOINTMENT_TYPES),
                'status': status,
                'notes': fake.paragraph(nb_sentences=2) if random.random() > 0.3 else None
            })
    
    # Insert appointments into database
    with conn.cursor() as cur:
        appointment_columns = [
            'id', '"patientId"', '"providerId"', '"appointmentTime"',
            '"appointmentType"', 'status', 'notes', '"createdAt"', '"updatedAt"'
        ]
        
        appointment_values = []
        now = datetime.now()
        for appointment in appointments:
            appointment_values.append((
                appointment['id'], appointment['patient_id'], appointment['provider_id'],
                appointment['appointment_time'], appointment['appointment_type'],
                appointment['status'], appointment['notes'], now, now
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO appointments ({', '.join(appointment_columns)})
            VALUES %s
            """,
            appointment_values
        )
        
        conn.commit()
        print(f"Generated {len(appointments)} appointments.")
    
    return appointments

def generate_medical_records(conn, patient_profiles, providers):
    """Generate medical record data."""
    medical_records = []
    
    for patient in patient_profiles:
        for _ in range(random.randint(1, NUM_RECORDS_PER_PATIENT)):
            record_id = generate_uuid()
            provider = random.choice(providers)
            
            # Generate a random date within the last year
            days_ago = random.randint(-365, 0)
            record_date = datetime.now() + timedelta(days=days_ago)
            
            medical_records.append({
                'id': record_id,
                'patient_id': patient['id'],
                'provider_id': provider['id'],
                'record_type': random.choice(RECORD_TYPES),
                'content': fake.paragraph(nb_sentences=5),
                'record_date': record_date
            })
    
    # Insert medical records into database
    with conn.cursor() as cur:
        record_columns = [
            'id', '"patientId"', '"providerId"', '"recordType"',
            'content', '"recordDate"', '"createdAt"', '"updatedAt"'
        ]
        
        record_values = []
        now = datetime.now()
        for record in medical_records:
            record_values.append((
                record['id'], record['patient_id'], record['provider_id'],
                record['record_type'], record['content'], record['record_date'], now, now
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO medical_records ({', '.join(record_columns)})
            VALUES %s
            """,
            record_values
        )
        
        conn.commit()
        print(f"Generated {len(medical_records)} medical records.")
    
    return medical_records

def generate_medications(conn, patient_profiles, providers):
    """Generate medication data."""
    medications = []
    
    for patient in patient_profiles:
        for _ in range(random.randint(1, NUM_MEDICATIONS_PER_PATIENT)):
            medication_id = generate_uuid()
            provider = random.choice(providers)
            
            # Generate random dates
            days_ago = random.randint(-180, 0)
            start_date = datetime.now() + timedelta(days=days_ago)
            
            # Determine if medication is active, completed, or discontinued
            status = random.choice(['ACTIVE', 'COMPLETED', 'DISCONTINUED'])
            
            if status != 'ACTIVE':
                end_date = start_date + timedelta(days=random.randint(30, 90))
            else:
                end_date = None
            
            medications.append({
                'id': medication_id,
                'patient_id': patient['id'],
                'prescriber_id': provider['id'],
                'medication_name': random.choice(MEDICATION_NAMES),
                'dosage': f"{random.choice(['10', '20', '25', '50', '100'])} mg",
                'frequency': random.choice(['Once daily', 'Twice daily', 'Three times daily', 'As needed']),
                'start_date': start_date,
                'end_date': end_date,
                'status': status,
                'notes': fake.paragraph(nb_sentences=1) if random.random() > 0.5 else None
            })
    
    # Insert medications into database
    with conn.cursor() as cur:
        medication_columns = [
            'id', '"patientId"', '"prescriberId"', '"medicationName"',
            'dosage', 'frequency', '"startDate"', '"endDate"', 'status', 'notes', '"createdAt"', '"updatedAt"'
        ]
        
        medication_values = []
        now = datetime.now()
        for medication in medications:
            medication_values.append((
                medication['id'], medication['patient_id'], medication['prescriber_id'],
                medication['medication_name'], medication['dosage'], medication['frequency'],
                medication['start_date'], medication['end_date'], medication['status'],
                medication['notes'], now, now
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO medications ({', '.join(medication_columns)})
            VALUES %s
            """,
            medication_values
        )
        
        conn.commit()
        print(f"Generated {len(medications)} medications.")
    
    return medications

def generate_messages(conn, patient_users, provider_users):
    """Generate message data."""
    messages = []
    
    for patient in patient_users:
        # Assign a random provider for this patient's messages
        provider = random.choice(provider_users)
        
        for _ in range(random.randint(1, NUM_MESSAGES_PER_PATIENT)):
            message_id = generate_uuid()
            
            # Determine message direction (patient to provider or provider to patient)
            if random.random() > 0.5:
                sender_id = patient['id']
                recipient_id = provider['id']
            else:
                sender_id = provider['id']
                recipient_id = patient['id']
            
            # Generate a random date within the last 90 days
            days_ago = random.randint(-90, 0)
            sent_at = datetime.now() + timedelta(days=days_ago)
            
            messages.append({
                'id': message_id,
                'sender_id': sender_id,
                'recipient_id': recipient_id,
                'content': fake.paragraph(nb_sentences=random.randint(1, 3)),
                'is_read': random.random() > 0.2,  # 80% chance of being read
                'sent_at': sent_at
            })
    
    # Insert messages into database
    with conn.cursor() as cur:
        message_columns = [
            'id', '"senderId"', '"recipientId"', 'content',
            '"isRead"', '"sentAt"', '"createdAt"', '"updatedAt"'
        ]
        
        message_values = []
        now = datetime.now()
        for message in messages:
            message_values.append((
                message['id'], message['sender_id'], message['recipient_id'],
                message['content'], message['is_read'], message['sent_at'], now, now
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO messages ({', '.join(message_columns)})
            VALUES %s
            """,
            message_values
        )
        
        conn.commit()
        print(f"Generated {len(messages)} messages.")
    
    return messages

def generate_documents(conn, patient_profiles):
    """Generate document data."""
    documents = []
    
    for patient in patient_profiles:
        for _ in range(random.randint(1, NUM_DOCUMENTS_PER_PATIENT)):
            document_id = generate_uuid()
            document_type = random.choice(DOCUMENT_TYPES)
            
            # Generate a random date within the last year
            days_ago = random.randint(-365, 0)
            upload_date = datetime.now() + timedelta(days=days_ago)
            
            documents.append({
                'id': document_id,
                'patient_id': patient['id'],
                'document_type': document_type,
                'filename': f"{document_type.lower().replace(' ', '_')}_{fake.bothify(text='???###')}.pdf",
                'file_path': f"/uploads/documents/{document_id}.pdf",
                'mime_type': 'application/pdf',
                'file_size': random.randint(100000, 5000000),  # 100KB to 5MB
                'upload_date': upload_date
            })
    
    # Insert documents into database
    with conn.cursor() as cur:
        document_columns = [
            'id', '"patientId"', '"documentType"', 'filename',
            '"filePath"', '"mimeType"', '"fileSize"', '"uploadDate"', '"createdAt"', '"updatedAt"'
        ]
        
        document_values = []
        now = datetime.now()
        for document in documents:
            document_values.append((
                document['id'], document['patient_id'], document['document_type'],
                document['filename'], document['file_path'], document['mime_type'],
                document['file_size'], document['upload_date'], now, now
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO documents ({', '.join(document_columns)})
            VALUES %s
            """,
            document_values
        )
        
        conn.commit()
        print(f"Generated {len(documents)} documents.")
    
    return documents

def generate_audit_logs(conn, patient_users, provider_users):
    """Generate audit log data."""
    audit_logs = []
    
    all_users = patient_users + provider_users
    
    for user in all_users:
        for _ in range(random.randint(1, NUM_AUDIT_LOGS_PER_USER)):
            log_id = generate_uuid()
            
            # Generate a random date within the last 30 days
            days_ago = random.randint(-30, 0)
            timestamp = datetime.now() + timedelta(days=days_ago, 
                                                 hours=random.randint(0, 23),
                                                 minutes=random.randint(0, 59),
                                                 seconds=random.randint(0, 59))
            
            action = random.choice(AUDIT_ACTIONS)
            resource_type = random.choice(RESOURCE_TYPES)
            
            audit_logs.append({
                'id': log_id,
                'user_id': user['id'],
                'action': action,
                'resource_type': resource_type,
                'resource_id': generate_uuid() if action != 'LOGIN' and action != 'LOGOUT' else None,
                'details': fake.sentence() if random.random() > 0.5 else None,
                'ip_address': fake.ipv4(),
                'user_agent': fake.user_agent(),
                'timestamp': timestamp
            })
    
    # Insert audit logs into database
    with conn.cursor() as cur:
        log_columns = [
            'id', '"userId"', 'action', '"resourceType"', '"resourceId"',
            'details', '"ipAddress"', '"userAgent"', 'timestamp'
        ]
        
        log_values = []
        for log in audit_logs:
            log_values.append((
                log['id'], log['user_id'], log['action'], log['resource_type'],
                log['resource_id'], log['details'], log['ip_address'],
                log['user_agent'], log['timestamp']
            ))
        
        execute_values(
            cur,
            f"""
            INSERT INTO audit_logs ({', '.join(log_columns)})
            VALUES %s
            """,
            log_values
        )
        
        conn.commit()
        print(f"Generated {len(audit_logs)} audit logs.")
    
    return audit_logs

def main():
    """Main function to generate sample data."""
    print("Connecting to database...")
    conn = connect_to_db()
    
    print("Clearing existing data...")
    clear_existing_data(conn)
    
    print("Generating users...")
    patient_users, provider_users = generate_users(conn)
    
    print("Generating patient profiles...")
    patient_profiles = generate_patient_profiles(conn, patient_users)
    
    print("Generating providers...")
    providers = generate_providers(conn, provider_users)
    
    print("Generating appointments...")
    generate_appointments(conn, patient_profiles, providers)
    
    print("Generating medical records...")
    generate_medical_records(conn, patient_profiles, providers)
    
    print("Generating medications...")
    generate_medications(conn, patient_profiles, providers)
    
    print("Generating messages...")
    generate_messages(conn, patient_users, provider_users)
    
    print("Generating documents...")
    generate_documents(conn, patient_profiles)
    
    print("Generating audit logs...")
    generate_audit_logs(conn, patient_users, provider_users)
    
    conn.close()
    print("Sample data generation complete!")

if __name__ == "__main__":
    main()
