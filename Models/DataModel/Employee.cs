using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TableAjaxEdit.Models.DataModel
{
    [Table("Employee")]
    public class Employee
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(255)]
        [Column(TypeName = "nvarchar")]
        [Required(ErrorMessage ="Name not nulll!")]
        public string Name { get; set; }

        public double Salary { get; set; }

        [Required]
        public DateTime CreatedDate {  get; set; }
        public bool Status { get; set; }
    }
}
