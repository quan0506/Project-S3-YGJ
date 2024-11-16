using Payment.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Payment.Domain.Entities
{
    public class Merchant : BaseEntity
    {
        public string? MerchantName { get; set; }   
        public string? MerchantWebLink { get; set; }   
        public string? MerchantIpnUrl { get; set; }   // Trường dữ liệu này trả dữ liệu về phía BackEnd 
        public string? MerchantReturnUrl { get; set; }   
        public string? SecretKey { get; set; }   
        public bool? IsActive { get; set; } 

    }
}
