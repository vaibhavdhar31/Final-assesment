using Microsoft.EntityFrameworkCore;

namespace Employee.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Models.Employee> Employees { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Models.Employee>(entity =>
        {
            entity.Property(e => e.Salary)
                  .HasColumnType("decimal(18,2)");
        });
    }
}
