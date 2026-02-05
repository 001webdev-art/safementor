@echo off
setlocal enabledelayedexpansion

:: To use this simple backup solution, ensure 7-Zip is installed (7zip.org)

:: ===================== CONFIGURATION =====================
:: Path to the folder you want to backup [cite: 7]
set "PROJECT_PATH="C:\Users\andre\KURS\safementor"

:: Destination folder for the backup files [cite: 7]
set "BACKUP_PATH=D:\Backup_"

:: Base name for the backup file [cite: 7]
set "BACKUP_NAME=same"

:: Manual path to 7-Zip executable 
set "SEVENZIP_PATH=C:\Program Files\7-Zip\7z.exe"

:: Folders/files to exclude from the backup [cite: 7]
set "EXCLUDE_FILE=%TEMP%\exclude_list.txt"
(
    echo node_modules\
    echo .next\
    echo .git\
    echo *.log
) > "%EXCLUDE_FILE%"

:: ===================== BACKUP LOGIC =====================

:: Create backup directory if it doesn't exist 
if not exist "%BACKUP_PATH%" mkdir "%BACKUP_PATH%"

:: Get universal Date/Time (YYYY-MM-DD_HHMM) to avoid regional format errors
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set "STAMP=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%_%datetime:~8,4%"

:: Initialize backup filename with the timestamp 
set "FINAL_NAME=%BACKUP_NAME%_%STAMP%"

:: If an argument was passed via command line, append it to the name 
if not "%~1"=="" (
    set "FINAL_NAME=%FINAL_NAME%_%~1"
)

:: Add the file extension and full path 
set "BACKUP_FILE=%BACKUP_PATH%\%FINAL_NAME%.zip"

:: ===== 7-ZIP DETECTION =====
set "SEVENZIP="

:: 1. Check the manual path first [cite: 9]
if exist "%SEVENZIP_PATH%" (
    set "SEVENZIP=%SEVENZIP_PATH%"
    echo ✅ Using 7-Zip from manual path: %SEVENZIP_PATH%
) else (
    :: 2. Try to find 7z in the system PATH [cite: 9]
    where 7z >nul 2>nul
    if !errorlevel! equ 0 (
        set "SEVENZIP=7z"
        echo ✅ 7-Zip found in system PATH
    )
)

:: 3. Try default installation paths if still not found [cite: 10]
if not defined SEVENZIP (
    if exist "C:\Program Files\7-Zip\7z.exe" set "SEVENZIP=C:\Program Files\7-Zip\7z.exe"
    if exist "C:\Program Files (x86)\7-Zip\7z.exe" set "SEVENZIP=C:\Program Files (x86)\7-Zip\7z.exe"
)

if not defined SEVENZIP (
    echo ❌ ERROR: 7-Zip not found! [cite: 10]
    echo.
    echo Solutions: [cite: 11]
    echo 1. Edit SEVENZIP_PATH at the top of this file [cite: 11]
    echo 2. Install 7-Zip from: https://www.7-zip.org/ [cite: 11]
    pause
    exit /b 1
)

:: ===== CREATE BACKUP =====
echo.
echo Creating backup... 
echo From: %PROJECT_PATH% 
echo To:   %BACKUP_FILE% 

:: a: Add to archive | -tzip: ZIP format | -mx5: Normal compression | -r: Recursive | -x: Exclude 
"%SEVENZIP%" a -tzip -mx5 -r -x@"%EXCLUDE_FILE%" "%BACKUP_FILE%" "%PROJECT_PATH%\*"

:: Verify the result 
if exist "%BACKUP_FILE%" (
    echo.
    echo ✅ Backup created successfully! 
    echo 📁 File: %BACKUP_FILE% 
    for %%F in ("%BACKUP_FILE%") do set "FILE_SIZE=%%~zF"
    echo 📊 Size: !FILE_SIZE! bytes 
) else (
    echo.
    echo ❌ Error creating backup! 
    echo Please check permissions and folder paths. 
)

:: Cleanup temporary exclude file [cite: 13]
del "%EXCLUDE_FILE%" 2>nul
echo.
pause [cite: 13]
