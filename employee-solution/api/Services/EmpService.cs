using Employee.Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Employee.Api.Services;

public class EmpService : IEmployeeService
{
    private readonly AppDbContext _context;

    public EmpService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Models.Employee>> GetAllAsync()
    {
        return await _context.Employees.AsNoTracking().ToListAsync();
    }

    public async Task<Models.Employee?> GetByIdAsync(int id)
    {
        return await _context.Employees.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<Models.Employee> CreateAsync(Models.Employee entity)
    {
        _context.Employees.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<bool> UpdateAsync(int id, Models.Employee entity)
    {
        var existing = await _context.Employees.FindAsync(id);
        if (existing == null) return false;

        existing.Name = entity.Name;
        existing.Address = entity.Address;
        existing.Salary = entity.Salary;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var employee = await _context.Employees.FindAsync(id);
        if (employee == null) return false;

        _context.Employees.Remove(employee);
        await _context.SaveChangesAsync();
        return true;
    }
}
