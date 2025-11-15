using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace Chat.DB
{
    public class MySqlDbContextFactory : IDesignTimeDbContextFactory<ChatDBContext>
    {
        public ChatDBContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.Development.json", optional: true)
                .AddJsonFile("appsettings.json", optional: true)
                .AddEnvironmentVariables()
                .Build();

            var conn = config.GetConnectionString("DatabaseConnection");

            var options = new DbContextOptionsBuilder<ChatDBContext>()
                .UseMySql(conn, new MySqlServerVersion(new Version(8,0,32)))
                .Options;

            return new ChatDBContext(options);
        }
    }
}
