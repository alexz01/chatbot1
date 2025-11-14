using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Chat.DB.Entities;

public class User
{
    [Key]
    public int Id { get; set; }
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
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
}

public class UserConfig : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
    }
}