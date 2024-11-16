namespace thuongmaidientus1.Models
{
    public class ProductCategory : BaseEntity
    {
        public virtual Product? Product { get; set; }
        public virtual Category? Category { get; set; }
    }
}
