using Microsoft.EntityFrameworkCore;
using Chat.DB.Entities;

namespace Chat.DB;

public class ChatDBContext(DbContextOptions<ChatDBContext> options)
    : DbContext(options)
{
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(b =>
        {
            b.HasKey(u => u.Id);
            b.Property(u => u.Email).IsRequired();
        });
    }
}

