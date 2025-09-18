namespace Employee.Api.Services;

public interface IEmployeeService
{
    Task<IEnumerable<Models.Employee>> GetAllAsync();
    Task<Models.Employee?> GetByIdAsync(int id);
    Task<Models.Employee> CreateAsync(Models.Employee entity);
    Task<bool> UpdateAsync(int id, Models.Employee entity);
    Task<bool> DeleteAsync(int id);
}
