using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Features.Merchant.Commands
{
    public class SetActiveMerchant
    {
        public string? Id { get; set; } 
        public bool? IsActive { get; set; }
    }
}
