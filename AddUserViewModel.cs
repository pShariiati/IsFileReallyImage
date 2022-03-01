using System.ComponentModel.DataAnnotations;

namespace IsImageValidation;

public class AddUserViewModel
{
    [Display(Name = "نام کامل")]
    public string? FullName { get; set; }

    [Display(Name = "آواتار")]
    [IsImage(ErrorMessage = "{0} باید یک عکس باشد")]
    public IFormFile? Avatar { get; set; }

    [Display(Name = "عکس کارت ملی")]
    [IsImage(ErrorMessage = "{0} باید یک عکس باشد")]
    public IFormFile? IdCartPicture { get; set; }
}