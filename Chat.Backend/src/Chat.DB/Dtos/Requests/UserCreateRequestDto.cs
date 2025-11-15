using System.ComponentModel.DataAnnotations;

namespace Chat.DB.Dtos.Requests;

public class UserCreateRequestDto
{
    [Required]
    [MaxLength(100)]
    [MinLength(1)]
    public string FirstName { get; set; } = string.Empty;
    [Required]
    [MaxLength(100)]
    [MinLength(1)]
    public string LastName { get; set; } = string.Empty;
    [Required]
    [MaxLength(255)]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
}
