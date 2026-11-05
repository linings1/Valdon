@echo off
chcp 65001 >nul
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo.
    echo  Node.js не е намерен на този компютър.
    echo  1. Отворете https://nodejs.org/
    echo  2. Изтеглете и инсталирайте версията LTS
    echo  3. Рестартирайте компютъра ^(препоръчително^)
    echo  4. Пуснете отново START.bat
    echo.
    pause
    exit /b 1
)

echo.
echo  Валдон — локален сървър
echo  Адрес: http://localhost:8080/
echo  Затворете този прозорец, за да спрете сайта.
echo.

start "" "http://localhost:8080/"
node "%~dp0scripts\dev-server.js"

pause
