namespace thuongmaidientus1.Models
{
    public class ShopVanchuyen : BaseEntity
    {
        public Shop? shop { get; set; }  
        public Shipping? Vanchuyen { get; set; }
    }
}
