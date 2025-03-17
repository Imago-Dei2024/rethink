# Setting Up DataSpell for PostgreSQL Analysis

This guide will help you set up JetBrains DataSpell IDE to connect to the PostgreSQL database for data analysis.

## Prerequisites

1. [JetBrains DataSpell](https://www.jetbrains.com/dataspell/) installed
2. PostgreSQL database running with the mental health portal schema
3. Python 3.8+ installed

## Installation Steps

### 1. Install Required Python Packages

Open a terminal and run:

```bash
pip install psycopg2-binary pandas numpy matplotlib seaborn jupyter python-dotenv faker
`
### 2. Open the Project in DataSpell

1. Launch DataSpell
2. Select "Open" and navigate to the `my-app/dataspell` directory
3. Open the project

### 3. Configure Database Connection

#### Option 1: Using the Database Tool Window

1. In DataSpell, go to View → Tool Windows → Database
2. Click the "+" button and select "Data Source" → "PostgreSQL"
3. Enter the following details:
   - Host: localhost
   - Port: 5432
   - Database: mental_health_portal
   - User: postgres
   - Password: password (or your actual password)
4. Test the connection and click "Apply" if successful

#### Option 2: Using the Provided Configuration

1. In DataSpell, go to File → Settings → Plugins
2. Make sure the "Database Tools and SQL" plugin is installed
3. Go to View → Tool Windows → Database
4. Click the "+" button and select "Import from sources"
5. Navigate to the `connection/database.xml` file and import it
6. Update the credentials if needed

### 4. Generate Sample Data (Optional)

If you need sample data for testing:

1. Open a terminal in DataSpell
2. Navigate to the `scripts` directory
3. Run the sample data generator:

```bash
cd scripts
python generate_sample_data.py
```

### 5. Run SQL Queries

1. In the Database tool window, expand your PostgreSQL connection
2. Right-click on any table and select "Jump to Query Console"
3. Open the SQL files from the `queries` directory
4. Execute the queries to analyze the data

### 6. Open Jupyter Notebooks

1. In DataSpell, go to File → Open
2. Navigate to the `notebooks` directory
3. Open the `patient_data_analysis.ipynb` notebook
4. Run the cells to perform data analysis

## Troubleshooting

### Connection Issues

If you have trouble connecting to the database:

1. Verify PostgreSQL is running: `pg_isready -h localhost -p 5432`
2. Check your credentials in the `.env` file
3. Ensure the database exists: `psql -U postgres -c "SELECT datname FROM pg_database WHERE datname='mental_health_portal'"`

### Python Package Issues

If you encounter issues with Python packages:

1. Verify your Python environment: `python --version`
2. Update pip: `pip install --upgrade pip`
3. Install packages individually to identify problematic dependencies

## Using DataSpell Features

### SQL Editor Features

- Code completion for SQL keywords and table/column names
- Query execution with results in a grid view
- Export results to CSV, JSON, or other formats
- Visual query builder

### Jupyter Notebook Features

- Interactive data visualization
- Code completion and inspection
- Variable explorer
- Integrated terminal
- Git integration

## Next Steps

1. Explore the sample SQL queries in the `queries` directory
2. Run and modify the Jupyter notebook in the `notebooks` directory
3. Create your own SQL queries and notebooks for custom analysis
4. Connect to other data sources for integrated analysis
