namespace thuongmaidientus1.Models
{
    public class Shipping : BaseEntity
    {
        public string? name { get; set; }
        public string? diachi { get; set; }
        public string? image { get; set; }

        public virtual IList<Shop>? Shops { get; set; }
        public virtual IList<ShopVanchuyen>? ShopVanchuyens { get; set; }
        public virtual IList<OrderProcessing>? Vanchuyens { get; set; }
    }
}
