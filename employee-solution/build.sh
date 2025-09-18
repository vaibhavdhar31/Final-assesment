#!/bin/bash
echo "Building Employee Management System..."

echo ""
echo "=== Building API ==="
cd api
dotnet restore
dotnet build
if [ $? -ne 0 ]; then
    echo "API build failed!"
    exit 1
fi

echo ""
echo "=== Running EF Migrations ==="
dotnet ef database update
if [ $? -ne 0 ]; then
    echo "Database migration failed!"
    exit 1
fi

echo ""
echo "=== Building Angular App ==="
cd ../web
npm install
if [ $? -ne 0 ]; then
    echo "npm install failed!"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    echo "Angular build failed!"
    exit 1
fi

cd ..
echo ""
echo "=== Build Complete ==="
echo "API: Run 'cd api && dotnet run'"
echo "Web: Run 'cd web && ng serve'"
