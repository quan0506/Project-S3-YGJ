namespace thuongmaidientus1.Models
{
    public class Category : BaseEntity
    {
        public string? name { get; set; }
        public string? images { get; set; }
        public string? creatorId { get; set; }
        public virtual Account? account { get; set; }
        public virtual IList<ProductCategory>? CategoryProduct { get; set; }
        public virtual IList<Product>? Products { get; set; }
    }
}
