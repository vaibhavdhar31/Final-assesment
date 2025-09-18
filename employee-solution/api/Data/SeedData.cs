namespace Employee.Api.Data;

public static class SeedData
{
    public static void Initialize(AppDbContext context)
    {
        if (context.Employees.Any()) return;

        var employees = new[]
        {
            new Models.Employee { Name = "John Doe", Address = "123 Main St, New York", Salary = 75000 },
            new Models.Employee { Name = "Jane Smith", Address = "456 Oak Ave, Los Angeles", Salary = 85000 },
            new Models.Employee { Name = "Mike Johnson", Address = "789 Pine Rd, Chicago", Salary = 65000 }
        };

        context.Employees.AddRange(employees);
        context.SaveChanges();
    }
}
