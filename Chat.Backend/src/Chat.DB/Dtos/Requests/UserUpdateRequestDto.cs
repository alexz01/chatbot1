using System.ComponentModel.DataAnnotations;

namespace Chat.DB.Dtos.Requests;

public class UserUpdateRequestDto
{
    [Required]
    public int Id { get; set; }
    public string? FirstName { get; set; }
    [MaxLength(100)]
    [MinLength(1)]
    public string? LastName { get; set; }
    [MaxLength(255)]
    [EmailAddress]
    public string? Email { get; set; }
}
