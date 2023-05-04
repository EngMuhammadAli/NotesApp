using System.ComponentModel.DataAnnotations;

namespace NotesApp.Model
{
    public class Notes
    {
        
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }

        public bool IsActive { get; set; }
    }
}
