@echo off
cd /d "%~dp0"

REM Create features structure
setlocal enabledelayedexpansion
for %%F in (auth chat chat-history dashboard profile compliance landing) do (
  if not exist "src\features\%%F" mkdir "src\features\%%F"
  if not exist "src\features\%%F\components" mkdir "src\features\%%F\components"
  if not exist "src\features\%%F\hooks" mkdir "src\features\%%F\hooks"
  if not exist "src\features\%%F\types" mkdir "src\features\%%F\types"
)

REM Create auth-specific directories
mkdir "src\features\auth\services" 2>nul
mkdir "src\features\auth\contexts" 2>nul

REM Create chat-specific directories
mkdir "src\features\chat\services" 2>nul
mkdir "src\features\chat\store" 2>nul
mkdir "src\features\chat\contexts" 2>nul

REM Create dashboard-specific directories
mkdir "src\features\dashboard\forms" 2>nul
mkdir "src\features\dashboard\sections" 2>nul
mkdir "src\features\dashboard\store" 2>nul

REM Create profile-specific directories
mkdir "src\features\profile\services" 2>nul

REM Create shared components
mkdir "src\components\ui" 2>nul
mkdir "src\components\layout" 2>nul
mkdir "src\components\shared" 2>nul

REM Create lib structure
mkdir "src\lib\supabase" 2>nul
mkdir "src\lib\i18n" 2>nul
mkdir "src\lib\utils" 2>nul
mkdir "src\lib\constants" 2>nul
mkdir "src\lib\hooks" 2>nul

REM Create types
mkdir "src\types" 2>nul

REM Create app API routes
mkdir "src\app\api\access" 2>nul
mkdir "src\app\api\auth" 2>nul
mkdir "src\app\api\chat" 2>nul

echo Directory structure created successfully
