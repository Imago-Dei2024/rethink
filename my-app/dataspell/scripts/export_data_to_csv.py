#!/usr/bin/env python3
"""
Database Data Export Script

This script exports data from the PostgreSQL database tables to CSV files.
It's useful for exporting data for analysis in other tools or sharing with others.

Usage:
    python export_data_to_csv.py [--output-dir OUTPUT_DIR] [--tables TABLE1,TABLE2,...]

Options:
    --output-dir OUTPUT_DIR    Directory to save CSV files (default: ../exports)
    --tables TABLE1,TABLE2,... Comma-separated list of tables to export (default: all tables)
"""

import sys
import os
import csv
import argparse
from pathlib import Path
from datetime import datetime

# Add the parent directory to the path so we can import the db_config module
sys.path.append(str(Path(__file__).parent.parent / 'connection'))

try:
    import psycopg2
    from psycopg2.extras import RealDictCursor
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

def parse_args():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(description='Export PostgreSQL data to CSV files.')
    parser.add_argument('--output-dir', default='../exports', 
                        help='Directory to save CSV files (default: ../exports)')
    parser.add_argument('--tables', default='',
                        help='Comma-separated list of tables to export (default: all tables)')
    return parser.parse_args()

def get_all_tables():
    """Get a list of all tables in the database."""
    conn = get_connection()
    tables = []
    
    with conn.cursor() as cur:
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
        tables = [row[0] for row in cur.fetchall()]
    
    conn.close()
    return tables

def export_table_to_csv(table_name, output_dir):
    """Export a table to a CSV file."""
    conn = get_connection()
    output_path = Path(output_dir) / f"{table_name}.csv"
    
    try:
        # Create output directory if it doesn't exist
        os.makedirs(output_dir, exist_ok=True)
        
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            # Get the data
            cur.execute(f"SELECT * FROM {table_name};")
            rows = cur.fetchall()
            
            if not rows:
                print(f"Table {table_name} is empty. Creating empty CSV file.")
                with open(output_path, 'w', newline='') as f:
                    writer = csv.writer(f)
                    writer.writerow([])
                return 0
            
            # Write to CSV
            with open(output_path, 'w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=rows[0].keys())
                writer.writeheader()
                writer.writerows(rows)
            
            row_count = len(rows)
            print(f"Exported {row_count} rows from {table_name} to {output_path}")
            return row_count
    except Exception as e:
        print(f"Error exporting table {table_name}: {e}")
        return 0
    finally:
        conn.close()

def main():
    """Main function to export data from the database to CSV files."""
    args = parse_args()
    output_dir = args.output_dir
    
    # Get list of tables to export
    if args.tables:
        tables_to_export = args.tables.split(',')
    else:
        tables_to_export = get_all_tables()
    
    print(f"=== Exporting PostgreSQL Data to CSV ===")
    print(f"Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Output Directory: {output_dir}")
    print(f"Tables to Export: {', '.join(tables_to_export)}")
    print("=" * 40)
    
    # Export each table
    total_rows = 0
    for table in tables_to_export:
        rows = export_table_to_csv(table, output_dir)
        total_rows += rows
    
    print("\n=== Export Complete ===")
    print(f"Exported {total_rows} rows from {len(tables_to_export)} tables to {output_dir}")

if __name__ == "__main__":
    main()
