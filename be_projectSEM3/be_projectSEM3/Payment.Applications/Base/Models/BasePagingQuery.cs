using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Base.Models
{
    [BindProperties] // Để phương thức "[BindProperties]" để đảm bảo là "Get" được dữ liệu
    // Class dùng chung
    public class BasePagingQuery
    {
        public string? Criteria { get; set; }
        public int? PageIndex { get; set;}
        public int? PageSize { get; set;}
    }
}
