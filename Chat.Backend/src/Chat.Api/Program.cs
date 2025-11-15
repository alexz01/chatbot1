using Chat.DB;
using Chat.DB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var conn = builder.Configuration.GetConnectionString("DatabaseConnection");

builder.Services.AddDbContext<ChatDBContext>(options =>
{
    options.UseMySql(conn, ServerVersion.AutoDetect(conn));
});

// Add services to the container.
builder.Services.AddScoped<UserService>();


builder.Services.AddControllers();
/*
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var env = context.HttpContext.RequestServices.GetRequiredService<IWebHostEnvironment>();
            if (env.IsDevelopment())
            {
                return new BadRequestObjectResult(context.ModelState);
            }
            else
            {
                var errors = context.ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .Select(x => x.Value.Errors.First().ErrorMessage)
                    .ToArray();
                return new BadRequestObjectResult(new { message = "Invalid request", details = errors });
            }
        };
    });
*/
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
