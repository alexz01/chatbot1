using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Chat.DB
{
    public class MySqlDbContextFactory : IDesignTimeDbContextFactory<ChatDBContext>
    {
        public ChatDBContext CreateDbContext(string[] args)
        {
            // Load connection string from appsettings.json / env vars
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            var conn = config.GetConnectionString("Database");

            var options = new DbContextOptionsBuilder<ChatDBContext>()
                .UseMySql(conn, new MySqlServerVersion(new Version(8,0,32)))
                .Options;

            return new ChatDBContext(options);
        }
    }
}
