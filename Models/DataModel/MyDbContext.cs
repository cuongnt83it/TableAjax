using Microsoft.EntityFrameworkCore;

namespace TableAjaxEdit.Models.DataModel
{
    public class MyDbContext : DbContext
    {
        public MyDbContext()
        {
        }
        public MyDbContext(DbContextOptions options) : base(options)
        {
        }
       public DbSet<Employee> Employees { get; set;}
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData (
              new Employee { Id=1,Name = "Andrew Peters", Salary = 3500000, CreatedDate = DateTime.Now, Status = true },
              new Employee { Id = 2, Name = "Brice Lambson", Salary = 3600000, CreatedDate = DateTime.Now, Status = true },
              new Employee { Id = 3, Name = "Andrew Johnson", Salary = 5400000, CreatedDate = DateTime.Now, Status = true },
              new Employee { Id = 4, Name = "Rowan Miller", Salary = 5400000, CreatedDate = DateTime.Now, Status = true },
              new Employee { Id = 5, Name = "Michael Peters", Salary = 3500000, CreatedDate = DateTime.Now, Status = true },
              new Employee { Id = 6, Name = "John Miller", Salary = 1600000, CreatedDate = DateTime.Now, Status = true },
              new Employee { Id = 7, Name = "Rowan Baker", Salary = 1400000, CreatedDate = DateTime.Now, Status = true },
              new Employee { Id = 8, Name = "Tom Miller", Salary = 6400000, CreatedDate = DateTime.Now, Status = true },
                new Employee { Id = 9, Name = "Marry Miller", Salary = 1500000, CreatedDate = DateTime.Now, Status = true },
              new Employee { Id = 10, Name = "Harry Miller", Salary = 1400000, CreatedDate = DateTime.Now, Status = true }
              );
            
  

              base.OnModelCreating(modelBuilder);

        }

    }
}
