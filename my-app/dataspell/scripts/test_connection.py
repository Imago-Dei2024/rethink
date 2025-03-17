#!/usr/bin/env python3
"""
Database Connection Test Script

This script tests the connection to the PostgreSQL database and
displays basic information about the database schema.

Usage:
    python test_connection.py
"""

import sys
import os
from pathlib import Path
from datetime import datetime

# Add the parent directory to the path so we can import the db_config module
sys.path.append(str(Path(__file__).parent.parent / 'connection'))

try:
    import psycopg2
    from psycopg2.extras import RealDictCursor
    from dotenv import load_dotenv
except ImportError:
    print("Required packages not found. Install with:")
    print("pip install psycopg2-binary python-dotenv")
    sys.exit(1)

# Import our database configuration
try:
    from db_config import DB_PARAMS, get_connection
    print("Successfully imported database configuration.")
except ImportError:
    print("Failed to import database configuration. Make sure db_config.py exists in the connection directory.")
    sys.exit(1)

def test_connection():
    """Test the connection to the PostgreSQL database."""
    try:
        # Try to connect using the get_connection function from db_config
        conn = get_connection()
        print("✅ Successfully connected to the database using get_connection()!")
        
        # Get database server version
        with conn.cursor() as cur:
            cur.execute("SELECT version();")
            version = cur.fetchone()[0]
            print(f"PostgreSQL Server: {version}")
        
        conn.close()
        return True
    except Exception as e:
        print(f"❌ Failed to connect using get_connection(): {e}")
        
        # Try to connect directly using DB_PARAMS
        try:
            conn = psycopg2.connect(
                host=DB_PARAMS['host'],
                port=DB_PARAMS['port'],
                database=DB_PARAMS['database'],
                user=DB_PARAMS['user'],
                password=DB_PARAMS['password']
            )
            print("✅ Successfully connected to the database using DB_PARAMS!")
            conn.close()
            return True
        except Exception as e2:
            print(f"❌ Failed to connect using DB_PARAMS: {e2}")
            return False

def get_schema_info():
    """Get information about the database schema."""
    try:
        conn = get_connection()
        
        # Use RealDictCursor to get results as dictionaries
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Get list of tables
            cur.execute("""
                SELECT 
                    table_name 
                FROM 
                    information_schema.tables 
                WHERE 
                    table_schema = 'public'
                ORDER BY 
                    table_name;
            """)
            tables = cur.fetchall()
            
            print("\n=== Database Tables ===")
            for table in tables:
                print(f"- {table['table_name']}")
            
            # Get row counts for each table
            print("\n=== Table Row Counts ===")
            for table in tables:
                table_name = table['table_name']
                cur.execute(f"SELECT COUNT(*) as count FROM {table_name};")
                count = cur.fetchone()['count']
                print(f"- {table_name}: {count} rows")
            
            # Get column information for a few key tables
            key_tables = ['users', 'patient_profiles', 'providers', 'appointments']
            print("\n=== Key Table Structures ===")
            
            for table_name in key_tables:
                if any(t['table_name'] == table_name for t in tables):
                    cur.execute(f"""
                        SELECT 
                            column_name, 
                            data_type, 
                            is_nullable
                        FROM 
                            information_schema.columns 
                        WHERE 
                            table_schema = 'public' AND 
                            table_name = '{table_name}'
                        ORDER BY 
                            ordinal_position;
                    """)
                    columns = cur.fetchall()
                    
                    print(f"\n{table_name} Columns:")
                    for col in columns:
                        nullable = "NULL" if col['is_nullable'] == "YES" else "NOT NULL"
                        print(f"  - {col['column_name']} ({col['data_type']}, {nullable})")
        
        conn.close()
        return True
    except Exception as e:
        print(f"Error getting schema information: {e}")
        return False

def main():
    """Main function to test the database connection and display schema information."""
    print("=== PostgreSQL Database Connection Test ===")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Database: {DB_PARAMS['database']}")
    print(f"Host: {DB_PARAMS['host']}:{DB_PARAMS['port']}")
    print(f"User: {DB_PARAMS['user']}")
    print("Password: " + "*" * len(DB_PARAMS['password']))
    print("=" * 40)
    
    if test_connection():
        print("\n✅ Connection test successful!")
        get_schema_info()
        print("\n=== Connection Test Complete ===")
        print("You can now use DataSpell to analyze the database.")
    else:
        print("\n❌ Connection test failed!")
        print("Please check your database configuration in db_config.py.")

if __name__ == "__main__":
    main()
