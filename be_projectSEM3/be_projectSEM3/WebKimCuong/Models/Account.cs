using System.Data;

namespace thuongmaidientus1.Models
{
    public class Account : BaseEntity
    {
        public string? username { get; set; }
        public string? password { get; set; }
        public string? email { get; set; }
        public string? phonenumber { get; set; }
        public bool Action { get; set; }
        // Khóa ngoại
        //public int role_id { get; set; }
        public Roles? role { get; set; }
        public string? image { get; set; }
        public virtual IList<Shop>? Shops { get; set; }
        public virtual IList<Product>? Products { get; set; }
        public virtual IList<Category>? Categories { get; set; }
        public virtual IList<Order>? Orders { get; set; }  
        public virtual IList<OrderProcessing>? Xulydonhangs { get; set; }
        public virtual IList<CommentDescription>? commentDescriptions { get; set; }
        public virtual IList<Comment>? Comments { get; set; }
        public virtual IList<Reviews>? Danhgia { get; set; }
    }
}
