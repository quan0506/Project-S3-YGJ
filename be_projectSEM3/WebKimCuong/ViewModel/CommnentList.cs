namespace thuongmaidientus1.ViewModel
{
    public class CommnentList
    {
        public int ids1 { get; set; }
        public string? message { get; set; }
        public byte[]? image { get; set; }
        public List<CommnetRepList>? commentDescription { get; set; } = new List<CommnetRepList>();
        public string? accountName { get; set; }
        public string? avatar { get; set; }
        public string? productName { get; set; }
        public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    }
}
