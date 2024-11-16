using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Features.Merchant.Commands
{
    public class UpdateMerchant
    {
        public int id { get; set; }
        public string? MerchantName { get; set; }
        public string? MerchantWebLink { get; set; }
        public string? MerchantIpnUrl { get; set; }   // Trường dữ liệu này trả dữ liệu về phía BackEnd 
        public string? MerchantReturnUrl { get; set; }
        public string? SecretKey { get; set; }
        public bool? IsActive { get; set; }
    }
}
