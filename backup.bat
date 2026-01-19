

setlocal enabledelayedexpansion

set "PROJECT_PATH=C:\xampp\htdocs\temp\next1_intl"
set "BACKUP_PATH=D:\dev\nextjs\ver1\backup"
set "BACKUP_NAME=nextjs_safementor"

:: Arquivo de exclusão SIMPLES
set "EXCLUDE_FILE=%TEMP%\exclude_list.txt"

:: Criar lista de exclusão (apenas o necessário)
(
    echo node_modules\
    echo .next\
    echo .git\
    ::echo .env.local
    echo *.log
) > "%EXCLUDE_FILE%"

:: Criar pasta de backup se não existir
if not exist "%BACKUP_PATH%" mkdir "%BACKUP_PATH%"

:: Gerar data e hora no formato YYYYMMDD_HHMMSS
for /f "tokens=2-4 delims=/ " %%a in ('date /t') do (
    set "MES=%%a"
    set "DIA=%%b"
    set "ANO=%%c"
)
for /f "tokens=1-2 delims=: " %%a in ('time /t') do (
    set "HORA=%%a"
    set "MINUTO=%%b"
)

:: Remover espaços e formatar corretamente
::set "DATA_HORA=%ANO%%MES%%DIA%_%HORA%%MINUTO%"
set "DATA_HORA=%DIA%_%MES%_%ANO%_%HORA%%MINUTO%"


:: Nome do arquivo de backup
::set "BACKUP_FILE=%FOLDER_NAME%_%DATA_HORA%.zip"
set "BACKUP_FILE=%BACKUP_NAME%_%DATA_HORA%.zip"

:: Criar arquivo de exclusão temporário
::set "EXCLUDE_FILE=%TEMP%\exclude_list.txt"
::(
::    echo node_modules\
::    echo .next\
::    echo .git\
::    echo out\
::    echo dist\
::    echo build\
::    echo coverage\
::    echo .env.local
::    echo .env*.local
::    echo npm-debug.log*
::    echo yarn-debug.log*
::    echo yarn-error.log*
::) > "%EXCLUDE_FILE%"

:: Verificar se 7z está no PATH
where 7z >nul 2>nul
if %errorlevel% neq 0 (
    echo 7-Zip nao encontrado no PATH!
    echo Tentando caminho padrao...
    
    :: Tenta caminhos comuns do 7-Zip
    if exist "C:\Program Files\7-Zip\7z.exe" (
        set "SEVENZIP=C:\Program Files\7-Zip\7z.exe"
    ) else if exist "C:\Program Files (x86)\7-Zip\7z.exe" (
        set "SEVENZIP=C:\Program Files (x86)\7-Zip\7z.exe"
    ) else (
        echo ERRO: 7-Zip nao encontrado! Instale o 7-Zip primeiro.
        pause
        exit /b 1
    )
) else (
    set "SEVENZIP=7z"
)

echo Criando backup...
echo De: %PROJECT_PATH%
echo Para: %BACKUP_PATH%\%BACKUP_FILE%

:: Criar o backup com 7-Zip
::"%SEVENZIP%" a -t7z -mx=9 -m0=lzma2 -md=32m -r -x@"%EXCLUDE_FILE%" "%BACKUP_PATH%\%BACKUP_FILE%" "%PROJECT_PATH%\*"
::"%SEVENZIP%" a -tzip -r -x@"%EXCLUDE_FILE%" "%BACKUP_PATH%\%BACKUP_FILE%" "%PROJECT_PATH%\*"

:: Verificar se o backup foi criado com sucesso
if exist "%BACKUP_PATH%\%BACKUP_FILE%" (
    echo.
    echo ✅ Backup criado com sucesso!
    echo 📁 Arquivo: %BACKUP_PATH%\%BACKUP_FILE%
    
    :: Mostrar tamanho do arquivo
    for %%F in ("%BACKUP_PATH%\%BACKUP_FILE%") do set "TAMANHO=%%~zF"
    echo 📊 Tamanho: !TAMANHO! bytes
) else (
    echo.
    echo ❌ Erro ao criar backup!
)

:: Limpar arquivo temporário
del "%EXCLUDE_FILE%" 2>nul

::echo.
::echo Pressione qualquer tecla para sair...
::pause >nul