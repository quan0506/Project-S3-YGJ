using System.ComponentModel.DataAnnotations;
using thuongmaidientus1.Models;

namespace thuongmaidientus1.ViewModel
{
    public class XulydonhangDTO
    {
        public int id { get; set; }
        public int product_id { get; set; }
        public string? product_name { get; set; }
        public string? account_name { get; set; }
        public float price { get; set; }
        public int soluong { get; set; }
        public int total { get; set; }
        public Status? trangthai { get; set; }
        public int account_id { get; set; }
        public int vanchuyen_id { get; set; }
    }

    public enum Status
    {
        [Display(Name = "Chờ xử lý")]
        Pending,
        [Display(Name = "Đã chấp nhận")]
        Approved,
        [Display(Name = "Bị từ chối")]
        Preparing,
        [Display(Name = "Đang chuẩn bị hàng")]
        Shipping,
        [Display(Name = "Xong")]
        Done,
        [Display(Name = "Hủy")]
        Huy,
    }
}
