# Employee Management System

A full-stack application built with .NET 8 Web API and Angular 17 for managing employee data.

## Tech Stack

- **Backend**: .NET 8 Web API, EF Core 8, SQL Server
- **Frontend**: Angular 17, TypeScript 5, Bootstrap 5
- **Testing**: xUnit, Moq, FluentAssertions, Jasmine/Karma

## Quick Start

### Prerequisites
- .NET 8 SDK
- Node.js 20+
- SQL Server (LocalDB or full instance)

### Backend Setup

```bash
cd api
dotnet restore
dotnet tool install --global dotnet-ef
dotnet ef database update
dotnet run
```

API will be available at `https://localhost:5001` and `http://localhost:5000`

### Frontend Setup

```bash
cd web
npm install
ng serve
```

Angular app will be available at `http://localhost:4200`

## Database Configuration

### LocalDB (Default)
```json
"Server=(localdb)\\mssqllocaldb;Database=EmployeeDb;Trusted_Connection=True;MultipleActiveResultSets=true"
```

### Full SQL Server Instance
```json
"Server=localhost;Database=EmployeeDb;Integrated Security=true;TrustServerCertificate=true"
```

## API Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/{id}` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee

## Testing

### Backend Tests
```bash
cd api/Tests
dotnet test
```

### Frontend Tests
```bash
cd web
npm test
```

## Architecture

- **Service Layer**: Business logic separated from controllers
- **DTOs**: Clean API contracts separate from entities
- **AutoMapper**: Entity-DTO mapping
- **Code-First**: EF migrations for database schema
- **Standalone Components**: Modern Angular architecture

## Troubleshooting

### Database Issues
- Ensure SQL Server is running
- Check connection string in appsettings.json
- Run `dotnet ef database update` to apply migrations

### CORS Issues
- API configured for localhost:4200 in development
- Update CORS policy for production deployment

### Port Conflicts
- API: Change ports in launchSettings.json
- Angular: Use `ng serve --port 4201`
