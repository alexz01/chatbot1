using Chat.DB;
using Chat.DB.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// read environment: Development, Production, etc.
var environment = builder.Environment.EnvironmentName;
var conn = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<ChatDBContext>(options =>
{
    if (environment == "Development")
    {
        options.UseSqlite(conn);
    }
    else
    {
        options.UseMySql(conn, ServerVersion.AutoDetect(conn));
    }
});

// Add services to the container.
builder.Services.AddScoped<UserService>();


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
