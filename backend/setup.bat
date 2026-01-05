@echo off
echo ========================================
echo   DermaCare Backend Setup
echo ========================================
echo.

echo Step 1: Checking if Python is installed...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.11+ from https://www.python.org/downloads/
    pause
    exit /b 1
)

echo Step 2: Creating virtual environment...
if not exist "venv" (
    python -m venv venv
)

echo Step 3: Activating virtual environment...
call venv\Scripts\activate.bat

echo Step 4: Installing dependencies...
pip install -r requirements.txt

echo Step 5: Checking for .env file...
if not exist ".env" (
    echo WARNING: .env file not found
    echo Copying .env.example to .env
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit .env and add your GROQ_API_KEY
    echo Get a free API key from: https://console.groq.com
    echo.
    pause
)

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the backend server:
echo   1. Make sure PostgreSQL is running
echo   2. Update DATABASE_URL in .env if needed
echo   3. Run: cd app && python main.py
echo.
echo Or use Docker:
echo   docker-compose up --build
echo.
pause
