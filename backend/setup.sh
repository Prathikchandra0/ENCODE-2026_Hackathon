#!/bin/bash

echo "========================================"
echo "   DermaCare Backend Setup"
echo "========================================"
echo ""

echo "Step 1: Checking if Python is installed..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed"
    echo "Please install Python 3.11+ from https://www.python.org/downloads/"
    exit 1
fi

echo "Step 2: Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

echo "Step 3: Activating virtual environment..."
source venv/bin/activate

echo "Step 4: Installing dependencies..."
pip install -r requirements.txt

echo "Step 5: Checking for .env file..."
if [ ! -f ".env" ]; then
    echo "WARNING: .env file not found"
    echo "Copying .env.example to .env"
    cp .env.example .env
    echo ""
    echo "IMPORTANT: Please edit .env and add your GROQ_API_KEY"
    echo "Get a free API key from: https://console.groq.com"
    echo ""
    read -p "Press enter to continue..."
fi

echo ""
echo "========================================"
echo "   Setup Complete!"
echo "========================================"
echo ""
echo "To start the backend server:"
echo "  1. Make sure PostgreSQL is running"
echo "  2. Update DATABASE_URL in .env if needed"
echo "  3. Run: cd app && python main.py"
echo ""
echo "Or use Docker:"
echo "  docker-compose up --build"
echo ""
