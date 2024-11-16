namespace thuongmaidientus1.Models
{
    public class Shop : BaseEntity
    {
        public string? Name { get; set; }
        public string? diachi { get; set; }
        public string? email { get; set;}
        public string? sodienthoai { get; set;}
        public string? image { get; set;}
        public Account? account { get; set;}
        public Shipping? vanchuyen { get; set; }
        public virtual IList<Product>? Products { get; set; }
        public virtual IList<ShopVanchuyen>? ShopVanchuyens { get; set; }

    }
}
