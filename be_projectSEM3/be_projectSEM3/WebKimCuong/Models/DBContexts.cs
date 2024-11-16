using Microsoft.EntityFrameworkCore;
using System.Data;

namespace thuongmaidientus1.Models
{
    public class DBContexts : DbContext
    {
        public DBContexts(DbContextOptions options) : base(options) { }

        #region DBSet
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Category> Categorys { get; set; }
        public DbSet<Product> ProdMsts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> orderDetails { get; set; }
        public DbSet<ProductCategory> ProductCategorys { get; set; }
        public DbSet<Roles> roles { get; set; }
        public DbSet<Tokens> tokens { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopVanchuyen> ShopVanchuyens { get; set; }
        public DbSet<Shipping> Shippings { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<OrderProcessing> OrderProcessings { get; set; }

        public DbSet<Payment> payments { get; set; }
        public DbSet<Merchant> merchants { get; set; }
        public DbSet<PaymentTransaction> paymentTransactions { get; set; }
        public DbSet<PaymentDescription> paymentDescriptions { get; set; }
        public DbSet<PaymentNotification> paymentNotifications { get; set; }
        public DbSet<PaymentSignature> paymentSignatures { get; set; }
        public DbSet<Comment> comments { get; set; }
        public DbSet<CommentDescription> commentDescriptions { get; set; }
        public DbSet<Reviews> Reviewss { get; set; }

        #endregion

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=MSI\\SQLEXPRESS;Initial Catalog=shopkimcuongss;Persist Security Info=True;User ID=sa;Password=123;Encrypt=True;Trust Server Certificate=True")
                         .EnableSensitiveDataLogging(); // Bật chế độ ghi log chi tiết
        }
    }
}
