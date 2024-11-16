using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Base.Models
{
    public class BaseError
    {
        public string? code { get; set; }
        public string? message { get; set; }
    }
}
