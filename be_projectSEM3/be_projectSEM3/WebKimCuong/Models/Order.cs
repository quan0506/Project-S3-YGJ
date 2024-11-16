namespace thuongmaidientus1.Models
{
    public class Order : BaseEntity
    {
        public string? orderName { get; set; }
        public string? status { get; set; }
        //public int account_id { get; set; }
        public virtual Account? Accounts { get; set; }
        public virtual IList<OrderDetails>? OrderDetails { get; set; }
    }
}
