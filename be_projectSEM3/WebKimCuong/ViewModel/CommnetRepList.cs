namespace thuongmaidientus1.ViewModel
{
    public class CommnetRepList
    {
        public int ids { get; set; }
        public string? messagedescription { get; set; }
        public byte[]? image { get; set; }
        public List<CommnetRepList>? commentRep { get; set; } = new List<CommnetRepList>();
        public string? account_Name { get; set; }
        public string? avatar { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
        public int? commentId { get; set; }
        public int? commentDescriptionId { get; set; }

    }
}
