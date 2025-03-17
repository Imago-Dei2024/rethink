# DataSpell PostgreSQL Integration

This directory contains configuration files, SQL scripts, and Python utilities for connecting to and analyzing the PostgreSQL database using JetBrains DataSpell IDE.

## Overview

The DataSpell integration allows data scientists and analysts to connect to the same PostgreSQL database used by the application for advanced data analysis, visualization, and reporting. This integration provides:

- SQL queries for common analytics tasks
- Jupyter notebooks for interactive data analysis
- Python utilities for database connectivity
- Sample data generation scripts
- Data export utilities

## Setup Instructions

1. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

2. Open DataSpell IDE
3. Open this project folder
4. Configure the database connection using the provided connection details
5. Use the SQL scripts in the `queries` directory for data analysis
6. Run the Jupyter notebooks in the `notebooks` directory for interactive analysis

For detailed setup instructions, see [dataspell_setup.md](dataspell_setup.md).

## Database Connection Details

- **Host**: localhost
- **Port**: 5432
- **Database**: mental_health_portal
- **Username**: postgres
- **Password**: password (change in production)
- **Schema**: public

## Directory Structure

- `connection/` - Contains database connection configuration
- `queries/` - Contains example SQL queries for data analysis
- `notebooks/` - Contains Jupyter notebooks for data analysis
- `scripts/` - Contains utility scripts for data generation and export
- `exports/` - Default directory for exported data (gitignored)

## Available Scripts

- `scripts/test_connection.py` - Test the database connection and display schema information
- `scripts/generate_sample_data.py` - Generate sample data for testing
- `scripts/export_data_to_csv.py` - Export database tables to CSV files

## Available Queries

- `queries/patient_analytics.sql` - Queries for analyzing patient data
- `queries/operational_reports.sql` - Queries for operational reporting

## Available Notebooks

- `notebooks/patient_data_analysis.ipynb` - Interactive analysis of patient data
