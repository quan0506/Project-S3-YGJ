using System.ComponentModel.DataAnnotations;

namespace thuongmaidientus1.Models
{
    public class OrderProcessing : BaseEntity
    {
        public int product_id { get; set; }
        public string? product_name { get; set;}
        public float? price { get; set; }
        public int soluong { get; set; }
        public int total {  get; set; } 
        public string? trangthai { get; set; }
        public Account? Account { get; set; }
        public Shipping? vanchuyen { get; set; }

    }

    

}
