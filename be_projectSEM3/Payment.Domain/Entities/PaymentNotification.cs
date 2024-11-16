using Payment.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Payment.Domain.Entities
{
    public class PaymentNotification : BaseEntity
    {
        public int? PaymentRefId { get; set; }
        public string? NotiDate { get; set; }
        public string? NotiAmount { get; set; }
        public string? NotiContent { get; set; }
        public string? NotiMessage { get; set; }
        public string? NotiSignature { get; set; }
        public int? PaymentId { get; set; }
        public int? MerchantId { get; set; }
        public string? NotiSatus { get; set; }
        public DateTimeOffset? NotiResDate { get; set; }
        
        

    }
}
