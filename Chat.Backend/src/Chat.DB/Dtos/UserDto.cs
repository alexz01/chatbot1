namespace Chat.DB.Dtos;

public class UserDto
{
    public int? Id { get; set; }  // optional for create
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}

