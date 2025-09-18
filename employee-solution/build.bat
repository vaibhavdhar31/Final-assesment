@echo off
echo Building Employee Management System...

echo.
echo === Building API ===
cd api
dotnet restore
dotnet build
if %ERRORLEVEL% neq 0 (
    echo API build failed!
    exit /b 1
)

echo.
echo === Running EF Migrations ===
dotnet ef database update
if %ERRORLEVEL% neq 0 (
    echo Database migration failed!
    exit /b 1
)

echo.
echo === Building Angular App ===
cd ../web
call npm install
if %ERRORLEVEL% neq 0 (
    echo npm install failed!
    exit /b 1
)

call npm run build
if %ERRORLEVEL% neq 0 (
    echo Angular build failed!
    exit /b 1
)

cd ..
echo.
echo === Build Complete ===
echo API: Run 'cd api && dotnet run'
echo Web: Run 'cd web && ng serve'
