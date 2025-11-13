using Microsoft.EntityFrameworkCore;
using Chat.DB.Entities;
using Chat.DB.Dtos;
using Microsoft.Extensions.Logging;

namespace Chat.DB.Services;

public class UserService(
    ChatDBContext db,
    ILogger<UserService> logger
    )
{
    private readonly ChatDBContext _db = db;
    private readonly ILogger<UserService> _logger = logger;

    public async Task<List<UserDto>> GetAllAsync() =>
        await _db.Users
            .Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email
            }).ToListAsync();

    public async Task<UserDto?> GetByIdAsync(int id) =>
        await _db.Users
            .Where(u => u.Id == id)
            .Select(u => new UserDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email
            }).FirstOrDefaultAsync();

    public async Task<int> CreateAsync(UserDto model)
    {
        var entity = new User
        {
            FirstName = model.FirstName,
            LastName = model.LastName,
            Email = model.Email
        };

        _db.Users.Add(entity);
        await _db.SaveChangesAsync();

        return entity.Id;
    }

    public async Task<bool> UpdateAsync(UserDto model)
    {
        try
        {
            var entity = await _db.Users.SingleOrDefaultAsync(u => u.Id == model.Id!.Value);

            if (entity == null)
            {
                return false;
            }

            entity.FirstName = model.FirstName;
            entity.LastName = model.LastName;
            entity.Email = model.Email;
            entity.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user with ID {UserId}", model.Id);
            return false;
        }
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user == null) return false;

        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return true;
    }
}