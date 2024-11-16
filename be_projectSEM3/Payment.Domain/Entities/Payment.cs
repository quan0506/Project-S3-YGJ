using Payment.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Payment.Domain.Entities
{
    public class Payment : BaseEntity
    {
        public string? PaymentContent { get; set; }
        public string? PaymentCurrency { get; set; }
        public int? PaymentRefId { get; set; }
        public decimal? PaymentAmount { get; set; }
        public DateTimeOffset? PaymentDate { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset? ExpireDate { get; set; }
        public string? PaymentLanguage { get; set; }
        public int? MerchantId { get; set; }
        public int? PaymentDestinationId { get; set; }
        public decimal? PaidAmount { get; set; }
        public string? PaymentStatus { get; set; }
        public string? PaymentLastMessage { get; set; }
    }
}
