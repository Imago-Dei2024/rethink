#!/bin/bash
# DataSpell PostgreSQL Integration Setup Script
# This script sets up the DataSpell environment and tests the database connection

# Set up colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== DataSpell PostgreSQL Integration Setup ===${NC}"
echo "This script will set up the DataSpell environment and test the database connection."
echo

# Check if Python is installed
echo -e "${YELLOW}Checking Python installation...${NC}"
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
    echo -e "${GREEN}Python 3 found: $(python3 --version)${NC}"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
    echo -e "${GREEN}Python found: $(python --version)${NC}"
else
    echo -e "${RED}Python not found. Please install Python 3.8 or later.${NC}"
    exit 1
fi

# Create a virtual environment
echo -e "\n${YELLOW}Setting up a virtual environment...${NC}"
if command -v virtualenv &>/dev/null; then
    virtualenv venv
elif $PYTHON_CMD -m venv --help &>/dev/null; then
    $PYTHON_CMD -m venv venv
else
    echo -e "${RED}Neither virtualenv nor venv module found. Installing virtualenv...${NC}"
    pip install virtualenv
    virtualenv venv
fi

# Activate the virtual environment
echo -e "\n${YELLOW}Activating virtual environment...${NC}"
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows
    source venv/Scripts/activate
else
    # Unix/Linux/MacOS
    source venv/bin/activate
fi

# Install required packages
echo -e "\n${YELLOW}Installing required packages...${NC}"
pip install -r requirements.txt

# Test the database connection
echo -e "\n${YELLOW}Testing database connection...${NC}"
cd scripts
python test_connection.py
cd ..

echo -e "\n${GREEN}Setup complete!${NC}"
echo "You can now use DataSpell to analyze the PostgreSQL database."
echo "See README.md and dataspell_setup.md for more information."
echo
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Open DataSpell IDE"
echo "2. Open this project folder"
echo "3. Configure the database connection"
echo "4. Run the Jupyter notebooks in the notebooks directory"
echo
echo -e "${YELLOW}To activate this environment in the future, run:${NC}"
echo "source venv/bin/activate  # On Unix/Linux/MacOS"
echo "source venv/Scripts/activate  # On Windows"
