namespace thuongmaidientus1.Models
{
    public class Product : BaseEntity
    {
        public string? title { get; set; }
        public string? description { get; set; }
        public string? image { get; set; }
        public float price { get; set; }
        public int click { get; set; }
        //public int account_id { get; set; }
        public int soluong { get; set; }
        public virtual Account? Accounts { get; set; }
        public virtual Category? Categorys { get; set; }
        public virtual Shop? Shops { get; set; }
        public virtual IList<OrderDetails>? OrderDetails { get; set; }
        public virtual IList<ProductCategory>? CategoryProduct { get; set; }
        public virtual IList<ProductImage>? ProductImages { get; set; }
        public virtual IList<Comment>? Comments { get; set; }
        public virtual IList<Reviews>? Danhgia { get; set; }
    }
}
