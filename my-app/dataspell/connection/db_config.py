"""
Database connection configuration for DataSpell.
This file provides connection parameters for PostgreSQL database.
"""

# PostgreSQL connection parameters
DB_PARAMS = {
    'host': 'localhost',
    'port': 5432,
    'database': 'mental_health_portal',
    'user': 'connorlaber',
    'password': '',  # No password needed for local user
    'schema': 'public'
}

# SQLAlchemy connection string
SQLALCHEMY_CONNECTION_STRING = (
    f"postgresql://{DB_PARAMS['user']}:{DB_PARAMS['password']}@"
    f"{DB_PARAMS['host']}:{DB_PARAMS['port']}/{DB_PARAMS['database']}"
)

# psycopg2 connection function
def get_connection():
    """
    Get a connection to the PostgreSQL database using psycopg2.
    
    Returns:
        psycopg2 connection object
    """
    import psycopg2
    
    conn = psycopg2.connect(
        host=DB_PARAMS['host'],
        port=DB_PARAMS['port'],
        database=DB_PARAMS['database'],
        user=DB_PARAMS['user'],
        password=DB_PARAMS['password']
    )
    
    return conn

# pandas read_sql helper function
def query_to_dataframe(query):
    """
    Execute a SQL query and return the results as a pandas DataFrame.
    
    Args:
        query (str): SQL query to execute
        
    Returns:
        pandas.DataFrame: Query results
    """
    import pandas as pd
    
    conn = get_connection()
    df = pd.read_sql(query, conn)
    conn.close()
    
    return df
