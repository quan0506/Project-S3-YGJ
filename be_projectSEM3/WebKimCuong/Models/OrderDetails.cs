namespace thuongmaidientus1.Models
{
    public class OrderDetails : BaseEntity
    {
        public int quantity { get; set; }
        public int total { get; set; }
        public float price { get; set; }
        //public int order_id { get; set; }
        public virtual Order? Orders { get; set; }
        //public int product_id { get; set; }
        public virtual Product? Products { get; set; }

    }
}
