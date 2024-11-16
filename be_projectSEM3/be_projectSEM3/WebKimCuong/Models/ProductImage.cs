namespace thuongmaidientus1.Models
{
    public class ProductImage : BaseEntity
    {
        public Product? product { get; set; }
        public string? image {  get; set; }
    }
}
