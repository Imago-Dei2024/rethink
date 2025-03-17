@echo off
REM DataSpell PostgreSQL Integration Setup Script for Windows
REM This script sets up the DataSpell environment and tests the database connection

echo === DataSpell PostgreSQL Integration Setup ===
echo This script will set up the DataSpell environment and test the database connection.
echo.

REM Check if Python is installed
echo Checking Python installation...
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Python found: 
    python --version
) else (
    echo Python not found. Please install Python 3.8 or later.
    exit /b 1
)

REM Create a virtual environment
echo.
echo Setting up a virtual environment...
if exist venv (
    echo Virtual environment already exists.
) else (
    python -m venv venv
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to create virtual environment with venv.
        echo Installing virtualenv...
        pip install virtualenv
        virtualenv venv
    )
)

REM Activate the virtual environment
echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install required packages
echo.
echo Installing required packages...
pip install -r requirements.txt

REM Test the database connection
echo.
echo Testing database connection...
cd scripts
python test_connection.py
cd ..

echo.
echo Setup complete!
echo You can now use DataSpell to analyze the PostgreSQL database.
echo See README.md and dataspell_setup.md for more information.
echo.
echo Next steps:
echo 1. Open DataSpell IDE
echo 2. Open this project folder
echo 3. Configure the database connection
echo 4. Run the Jupyter notebooks in the notebooks directory
echo.
echo To activate this environment in the future, run:
echo call venv\Scripts\activate.bat
