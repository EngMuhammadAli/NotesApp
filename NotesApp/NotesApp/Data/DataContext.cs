using Microsoft.EntityFrameworkCore;
using NotesApp.Model;

namespace NotesApp.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) :base(options)
        {

        }

        public DbSet<Notes> Notes { get; set; }
    }
}
