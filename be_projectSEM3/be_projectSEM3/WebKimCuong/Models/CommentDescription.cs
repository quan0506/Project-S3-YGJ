namespace thuongmaidientus1.Models
{
    public class CommentDescription : BaseEntity
    {
        public string? message { get; set; }
        public byte[]? images { get; set; }
        public CommentDescription? commentDescriptions { get; set; }
        public Comment? comment { get; set; }
        public Account? account { get; set; }
        public virtual IList<CommentDescription>? commentDescriptionsList { get; set; }
    }
}
