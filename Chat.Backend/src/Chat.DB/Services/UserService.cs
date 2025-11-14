using Microsoft.EntityFrameworkCore;
using Chat.DB.Entities;
using Chat.DB.Dtos.Responses;
using Microsoft.Extensions.Logging;
using Chat.DB.Dtos.Requests;

namespace Chat.DB.Services;

public class UserService(
    ChatDBContext db,
    ILogger<UserService> logger
    )
{
    private readonly ChatDBContext _db = db;
    private readonly ILogger<UserService> _logger = logger;

    public async Task<List<UserResponseDto>> GetAllAsync() =>
        await _db.Users
            .Select(u => new UserResponseDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email
            }).ToListAsync();

    public async Task<UserResponseDto?> GetByIdAsync(int id) =>
        await _db.Users
            .Where(u => u.Id == id)
            .Select(u => new UserResponseDto
            {
                Id = u.Id,
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email
            }).FirstOrDefaultAsync();

    public async Task<int> CreateAsync(UserCreateRequestDto model)
    {
        var entity = new User
        {
            FirstName = model.FirstName,
            LastName = model.LastName,
            Email = model.Email,
            CreatedAt = DateTime.UtcNow,
        };

        _db.Users.Add(entity);
        await _db.SaveChangesAsync();

        return entity.Id;
    }

    public async Task<bool> UpdateAsync(UserUpdateRequestDto dto)
    {
        try
        {
            var entity = await _db.Users.SingleOrDefaultAsync(u => u.Id == dto.Id);

            if (entity == null)
            {
                return false;
            }

            entity.FirstName = dto.FirstName ?? entity.FirstName;
            entity.LastName = dto.LastName ?? entity.LastName;
            entity.Email = dto.Email ?? entity.Email;
            entity.UpdatedAt = DateTime.UtcNow;

            await _db.SaveChangesAsync();

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user with ID {UserId}", dto.Id);
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