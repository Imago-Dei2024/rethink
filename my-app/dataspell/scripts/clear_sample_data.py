#!/usr/bin/env python3
"""
Clear Sample Data Script

This script clears all sample data from the database tables,
allowing you to start fresh with only real data.

Usage:
    python clear_sample_data.py

Caution:
    This will delete ALL data from the specified tables.
    Make sure you have a backup if needed before running this script.
"""

import sys
from pathlib import Path

# Add the parent directory to the path so we can import the db_config module
sys.path.append(str(Path(__file__).parent.parent / 'connection'))

try:
    import psycopg2
except ImportError:
    print("Required packages not found. Install with:")
    print("pip install psycopg2-binary")
    sys.exit(1)

# Import our database configuration
try:
    from db_config import get_connection
except ImportError:
    print("Failed to import database configuration. Make sure db_config.py exists in the connection directory.")
    sys.exit(1)

def clear_tables():
    """Clear data from all tables."""
    conn = get_connection()
    
    # List of tables to clear, in order to respect foreign key constraints
    tables = [
        'audit_logs',
        'documents',
        'messages',
        'medications',
        'medical_records',
        'appointments',
        'providers',
        'patient_profiles',
        'users'
    ]
    
    try:
        with conn.cursor() as cur:
            # Disable foreign key checks temporarily
            cur.execute("SET session_replication_role = 'replica';")
            
            # Clear each table
            for table in tables:
                print(f"Clearing data from {table}...")
                cur.execute(f"DELETE FROM {table};")
            
            # Re-enable foreign key checks
            cur.execute("SET session_replication_role = 'origin';")
            
            conn.commit()
            print("All sample data has been cleared successfully.")
    except Exception as e:
        conn.rollback()
        print(f"Error clearing data: {e}")
    finally:
        conn.close()

def confirm_action():
    """Confirm with the user before proceeding."""
    print("WARNING: This will delete ALL data from the database tables.")
    print("This action cannot be undone. Make sure you have a backup if needed.")
    response = input("Are you sure you want to proceed? (yes/no): ")
    return response.lower() in ['yes', 'y']

def main():
    """Main function to clear sample data."""
    print("=== Clear Sample Data ===")
    
    if confirm_action():
        clear_tables()
    else:
        print("Operation cancelled.")

if __name__ == "__main__":
    main()
