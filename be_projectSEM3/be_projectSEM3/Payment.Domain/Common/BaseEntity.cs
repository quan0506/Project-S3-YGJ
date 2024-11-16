using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Payment.Domain.Common
{
    public class BaseEntity
    {
        protected BaseEntity() { }
        [Key]
        public int id { get; set; }
        public bool Deleted { get; set; }
        public string? CretorEdit { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset UpdatedAt { get; set; } = DateTimeOffset.UtcNow;
    }
}
