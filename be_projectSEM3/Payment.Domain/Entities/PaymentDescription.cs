using Payment.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Payment.Domain.Entities
{
    public class PaymentDescription : BaseEntity
    {
        public string? DesLogo { get; set; }
        public string? DesShortName { get; set; }
        public string? DesName { get; set; }
        public int DesSortIndex { get; set; }
        public int? ParentId { get; set; } // Đây là khóa ngoại sẽ liệu kết đến khóa chính của bảng này luôn("ParentId" này sẽ liên kết trực tiếp đến "Id" của bảng "PaymentDescription" này luôn)
        public bool? IsActive { get; set; }

    }
}
