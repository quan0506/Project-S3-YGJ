namespace thuongmaidientus1.Models
{
    public class Reviews : BaseEntity
    {
        public int sao { get; set; }
        public string? message { get; set; }
        public Account? account { get; set; }
        public Product? product { get; set; }

    }
}
