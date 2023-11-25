

using Microsoft.EntityFrameworkCore;
using TodoListApp.Models;

namespace TodoListApp.Data
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options)
        {
        }

        public DbSet<Todo> Todos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Todo Seed
            modelBuilder.Entity<Todo>().HasData(
                new Todo { Id = 1, Title = "وظیفه 1", IsCompleted = false },
                new Todo { Id = 2, Title = "وظیفه 2", IsCompleted = true }
            );
        }

    }
}
