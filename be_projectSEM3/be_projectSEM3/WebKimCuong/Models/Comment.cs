namespace thuongmaidientus1.Models
{
    public class Comment : BaseEntity
    {
        public string? message { get; set; }
        public byte[]? images { get; set; }
        public Account? accounts { get; set; }
        public Product? products { get; set; }

        public virtual IList<CommentDescription>? commentDescriptions { get; set; }
    }
}
