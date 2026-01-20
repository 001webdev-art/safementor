@echo off
setlocal enabledelayedexpansion

:: To Use this simple and nice backup solution, install 7zip.org

:: ===================== CONFIGURAÇÕES - EDITE AQUI =====================
set "PROJECT_PATH=C:\xampp\htdocs\temp\next1_intl"
set "BACKUP_PATH=D:\dev\nextjs\ver1\backup"
set "BACKUP_NAME=nextjs_safementor"

:: CAMINHO MANUAL DO 7-ZIP (descomente e edite se o auto-detect falhar)
:: Exemplos:
:: set "SEVENZIP_PATH=C:\Program Files\7-Zip\7z.exe"
:: set "SEVENZIP_PATH=C:\Program Files (x86)\7-Zip\7z.exe"
set "SEVENZIP_PATH=C:\Program Files\7-Zip\7z.exe"

:: Pastas/arquivos a excluir
set "EXCLUDE_FILE=%TEMP%\exclude_list.txt"
(
    echo node_modules\
    echo .next\
    echo .git\
    echo *.log
) > "%EXCLUDE_FILE%"

:: ===================== LÓGICA DO BACKUP (NÃO EDITE) =====================

:: Criar pasta de backup se não existir
if not exist "%BACKUP_PATH%" mkdir "%BACKUP_PATH%"

:: Gerar data e hora no formato DD_MM_AAA_HHMM
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
    set "MES=%%a"
    set "DIA=%%b"
    set "ANO=%%c"
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set "HORA=%%a"
    set "MINUTO=%%b"
)
set "DATA_HORA=%DIA%_%MES%_%ANO%_%HORA%%MINUTO%"
set "BACKUP_FILE=%BACKUP_NAME%_%DATA_HORA%.zip"

:: ===== DETECÇÃO DO 7-ZIP =====
:: 1. Tenta o caminho manual se definido
if defined SEVENZIP_PATH (
    if exist "%SEVENZIP_PATH%" (
        set "SEVENZIP=%SEVENZIP_PATH%"
        echo ✅ Usando 7-Zip do caminho manual: %SEVENZIP_PATH%
        goto :skip_detection
    ) else (
        echo ⚠️ Caminho manual definido mas arquivo não encontrado: %SEVENZIP_PATH%
    )
)

:: 2. Tenta encontrar no PATH do sistema
where 7z >nul 2>nul
if %errorlevel% equ 0 (
    set "SEVENZIP=7z"
    echo ✅ 7-Zip encontrado no PATH do sistema
    goto :skip_detection
)

:: 3. Tenta caminhos padrão
set "SEVENZIP="
if exist "C:\Program Files\7-Zip\7z.exe" set "SEVENZIP=C:\Program Files\7-Zip\7z.exe"
if exist "C:\Program Files (x86)\7-Zip\7z.exe" set "SEVENZIP=C:\Program Files (x86)\7-Zip\7z.exe"

if defined SEVENZIP (
    echo ✅ 7-Zip encontrado no caminho padrão: %SEVENZIP%
) else (
    echo ❌ ERRO: 7-Zip não encontrado!
    echo.
    echo Soluções:
    echo 1. Edite SEVENZIP_PATH no topo deste arquivo
    echo 2. Instale o 7-Zip em: https://www.7-zip.org/
    pause
    exit /b 1
)

:skip_detection

:: ===== CRIAR BACKUP =====
echo.
echo Criando backup...
echo De: %PROJECT_PATH%
echo Para: %BACKUP_PATH%\%BACKUP_FILE%

"%SEVENZIP%" a -tzip -r -x@"%EXCLUDE_FILE%" "%BACKUP_PATH%\%BACKUP_FILE%" "%PROJECT_PATH%\*"

:: Verificar resultado
if exist "%BACKUP_PATH%\%BACKUP_FILE%" (
    echo.
    echo ✅ Backup criado com sucesso!
    echo 📁 Arquivo: %BACKUP_PATH%\%BACKUP_FILE%
    for %%F in ("%BACKUP_PATH%\%BACKUP_FILE%") do set "TAMANHO=%%~zF"
    echo 📊 Tamanho: !TAMANHO! bytes
) else (
    echo.
    echo ❌ Erro ao criar backup!
    echo Verifique as permissões e caminhos.
)

:: Limpar
del "%EXCLUDE_FILE%" 2>nul
echo.
pause