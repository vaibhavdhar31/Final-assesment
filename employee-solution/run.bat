@echo off
echo Starting Employee Management System...

echo Starting API...
start "Employee API" cmd /k "cd api && dotnet run"

timeout /t 5 /nobreak > nul

echo Starting Angular App...
start "Employee Web" cmd /k "cd web && ng serve"

echo.
echo Both applications are starting...
echo API will be available at: http://localhost:5000
echo Web app will be available at: http://localhost:4200
echo.
echo Press any key to exit...
pause > nul
