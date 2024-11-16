namespace thuongmaidientus1.ViewModel
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public string? orderName { get; set; }
        public string? status { get; set; }
    }

    public class Xulydonhang
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public Status? Status { get; set; }
    }
}
