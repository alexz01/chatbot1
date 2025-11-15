using Chat.DB.Dtos.Requests;
using Chat.DB.Dtos.Responses;
using Chat.DB.Services;
using Microsoft.AspNetCore.Mvc;

namespace Chat.Api.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UsersController(
    ILogger<UsersController> logger,
    UserService userService
    ) : ControllerBase
{
    private readonly ILogger<UsersController> _logger = logger;
    private readonly UserService _userService = userService;

    [HttpGet("")]
    public async Task<ActionResult<IEnumerable<UserResponseDto>>> GetAll()
    {
        try
        {
            return await _userService.GetAllAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching all users");
            throw;
        }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserResponseDto?>> Get(int id)
    {
        try
        {
            var dto = await _userService.GetByIdAsync(id);
            if (dto == null)
            {
                return NotFound();
            }
            return dto;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching user with ID {UserId}", id);
            throw;
        }
    }

    [HttpPost]
    public async Task<ActionResult<int>> Create([FromBody] UserCreateRequestDto user)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return await _userService.CreateAsync(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating new user");
            throw;
        }
    }

    [HttpPut]
    public async Task<ActionResult<bool>> Update([FromBody] UserUpdateRequestDto user)
    {
        try
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return await _userService.UpdateAsync(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating new user");
            throw;
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult<bool>> Delete(int id)
    {
        return await _userService.DeleteAsync(id);
    }
}
