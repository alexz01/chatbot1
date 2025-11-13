using Chat.DB.Dtos;
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
    public async Task<IEnumerable<UserDto>> GetAll()
    {
        return await _userService.GetAllAsync();
    }

    [HttpGet("{id:int}")]
    public async Task<UserDto?> Get(int id)
    {
        return await _userService.GetByIdAsync(id);
    }

    [HttpPost]
    public async Task<int> Create([FromBody] UserDto user)
    {
        return await _userService.CreateAsync(user);
    }

    [HttpPut]
    public async Task<bool> Update([FromBody] UserDto user)
    {
        return await _userService.UpdateAsync(user);
    }

    [HttpDelete("{id:int}")]
    public async Task<bool> Delete(int id)
    {
        return await _userService.DeleteAsync(id);
    }
}
