using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Dtos
{
    public class MerchantDtos
    {
        public int Id { get; set; }
        public string? MerchantName { get; set; }
        public string? MerchantWebLink { get; set; }
        public string? MerchantIpnUrl { get; set; }   // Trường dữ liệu này trả dữ liệu về phía BackEnd 
        public string? MerchantReturnUrl { get; set; }
        public bool? IsActive { get; set; }
    }
}
