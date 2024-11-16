using Payment.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Payment.Domain.Entities
{
    public class PaymentTransaction : BaseEntity
    {
        public string? TranMessage { get; set; }
        public string? TranPayLoad { get; set; }
        public string? TranStatus { get; set; }
        public decimal? TranAmount { get; set; }
        public DateTimeOffset? TranDate { get; set; }
        public int? PaymentId { get; set; }
        public string? TranRefId { get; set; }

        
    }
}
