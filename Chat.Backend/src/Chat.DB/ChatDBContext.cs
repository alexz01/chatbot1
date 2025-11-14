using Microsoft.EntityFrameworkCore;
using Chat.DB.Entities;

namespace Chat.DB;

public class ChatDBContext(DbContextOptions<ChatDBContext> options)
    : DbContext(options)
{
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ChatDBContext).Assembly);
    }
}

