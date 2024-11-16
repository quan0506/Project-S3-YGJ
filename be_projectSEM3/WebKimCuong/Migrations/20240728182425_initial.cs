using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebKimCuong.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "merchants",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MerchantName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MerchantWebLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MerchantIpnUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MerchantReturnUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecretKey = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_merchants", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "paymentDescriptions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DesLogo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DesShortName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DesName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DesSortIndex = table.Column<int>(type: "int", nullable: false),
                    ParentIdid = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paymentDescriptions", x => x.id);
                    table.ForeignKey(
                        name: "FK_paymentDescriptions_paymentDescriptions_ParentIdid",
                        column: x => x.ParentIdid,
                        principalTable: "paymentDescriptions",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Shippings",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    diachi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shippings", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "payments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    paymentId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentCurrency = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentRefId = table.Column<int>(type: "int", nullable: true),
                    PaymentAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PaymentDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    ExpireDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    PaymentLanguage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MerchantIdid = table.Column<int>(type: "int", nullable: true),
                    PaymentDestinationIdid = table.Column<int>(type: "int", nullable: true),
                    PaidAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentLastMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payments", x => x.id);
                    table.ForeignKey(
                        name: "FK_payments_merchants_MerchantIdid",
                        column: x => x.MerchantIdid,
                        principalTable: "merchants",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_payments_paymentDescriptions_PaymentDestinationIdid",
                        column: x => x.PaymentDestinationIdid,
                        principalTable: "paymentDescriptions",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    phonenumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Action = table.Column<bool>(type: "bit", nullable: false),
                    roleid = table.Column<int>(type: "int", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.id);
                    table.ForeignKey(
                        name: "FK_Accounts_roles_roleid",
                        column: x => x.roleid,
                        principalTable: "roles",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "paymentNotifications",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaymentRefId = table.Column<int>(type: "int", nullable: true),
                    NotiDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotiAmount = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotiContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotiMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotiSignature = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentIdid = table.Column<int>(type: "int", nullable: true),
                    MerchantId = table.Column<int>(type: "int", nullable: true),
                    NotiSatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotiResDate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paymentNotifications", x => x.id);
                    table.ForeignKey(
                        name: "FK_paymentNotifications_payments_PaymentIdid",
                        column: x => x.PaymentIdid,
                        principalTable: "payments",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "paymentSignatures",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SignValue = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SignAlgo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SignDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    SignOwn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentIdid = table.Column<int>(type: "int", nullable: true),
                    IsValid = table.Column<bool>(type: "bit", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paymentSignatures", x => x.id);
                    table.ForeignKey(
                        name: "FK_paymentSignatures_payments_PaymentIdid",
                        column: x => x.PaymentIdid,
                        principalTable: "payments",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "paymentTransactions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TranMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TranPayLoad = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TranStatus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TranAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    TranDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    PaymentIdid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paymentTransactions", x => x.id);
                    table.ForeignKey(
                        name: "FK_paymentTransactions_payments_PaymentIdid",
                        column: x => x.PaymentIdid,
                        principalTable: "payments",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Categorys",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    images = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    creatorId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    accountid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorys", x => x.id);
                    table.ForeignKey(
                        name: "FK_Categorys_Accounts_accountid",
                        column: x => x.accountid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "OrderProcessings",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    product_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<float>(type: "real", nullable: true),
                    soluong = table.Column<int>(type: "int", nullable: false),
                    total = table.Column<int>(type: "int", nullable: false),
                    trangthai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Accountid = table.Column<int>(type: "int", nullable: true),
                    vanchuyenid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProcessings", x => x.id);
                    table.ForeignKey(
                        name: "FK_OrderProcessings_Accounts_Accountid",
                        column: x => x.Accountid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_OrderProcessings_Shippings_vanchuyenid",
                        column: x => x.vanchuyenid,
                        principalTable: "Shippings",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    orderName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Accountsid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.id);
                    table.ForeignKey(
                        name: "FK_Orders_Accounts_Accountsid",
                        column: x => x.Accountsid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Shops",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    diachi = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    sodienthoai = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    accountid = table.Column<int>(type: "int", nullable: true),
                    vanchuyenid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Shops", x => x.id);
                    table.ForeignKey(
                        name: "FK_Shops_Accounts_accountid",
                        column: x => x.accountid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Shops_Shippings_vanchuyenid",
                        column: x => x.vanchuyenid,
                        principalTable: "Shippings",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "tokens",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    accountid = table.Column<int>(type: "int", nullable: true),
                    token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    geneToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tokens", x => x.id);
                    table.ForeignKey(
                        name: "FK_tokens_Accounts_accountid",
                        column: x => x.accountid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "ProdMsts",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    price = table.Column<float>(type: "real", nullable: false),
                    click = table.Column<int>(type: "int", nullable: false),
                    soluong = table.Column<int>(type: "int", nullable: false),
                    Accountsid = table.Column<int>(type: "int", nullable: true),
                    Categorysid = table.Column<int>(type: "int", nullable: true),
                    Shopsid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProdMsts", x => x.id);
                    table.ForeignKey(
                        name: "FK_ProdMsts_Accounts_Accountsid",
                        column: x => x.Accountsid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_ProdMsts_Categorys_Categorysid",
                        column: x => x.Categorysid,
                        principalTable: "Categorys",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_ProdMsts_Shops_Shopsid",
                        column: x => x.Shopsid,
                        principalTable: "Shops",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "ShopVanchuyens",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    shopid = table.Column<int>(type: "int", nullable: true),
                    Vanchuyenid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopVanchuyens", x => x.id);
                    table.ForeignKey(
                        name: "FK_ShopVanchuyens_Shippings_Vanchuyenid",
                        column: x => x.Vanchuyenid,
                        principalTable: "Shippings",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_ShopVanchuyens_Shops_shopid",
                        column: x => x.shopid,
                        principalTable: "Shops",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "comments",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    images = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    accountsid = table.Column<int>(type: "int", nullable: true),
                    productsid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_comments", x => x.id);
                    table.ForeignKey(
                        name: "FK_comments_Accounts_accountsid",
                        column: x => x.accountsid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_comments_ProdMsts_productsid",
                        column: x => x.productsid,
                        principalTable: "ProdMsts",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "orderDetails",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    total = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<float>(type: "real", nullable: false),
                    Ordersid = table.Column<int>(type: "int", nullable: true),
                    Productsid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_orderDetails", x => x.id);
                    table.ForeignKey(
                        name: "FK_orderDetails_Orders_Ordersid",
                        column: x => x.Ordersid,
                        principalTable: "Orders",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_orderDetails_ProdMsts_Productsid",
                        column: x => x.Productsid,
                        principalTable: "ProdMsts",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "ProductCategorys",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Productid = table.Column<int>(type: "int", nullable: true),
                    Categoryid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductCategorys", x => x.id);
                    table.ForeignKey(
                        name: "FK_ProductCategorys_Categorys_Categoryid",
                        column: x => x.Categoryid,
                        principalTable: "Categorys",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_ProductCategorys_ProdMsts_Productid",
                        column: x => x.Productid,
                        principalTable: "ProdMsts",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "ProductImages",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    productid = table.Column<int>(type: "int", nullable: true),
                    image = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductImages", x => x.id);
                    table.ForeignKey(
                        name: "FK_ProductImages_ProdMsts_productid",
                        column: x => x.productid,
                        principalTable: "ProdMsts",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Reviewss",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    sao = table.Column<int>(type: "int", nullable: false),
                    message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    accountid = table.Column<int>(type: "int", nullable: true),
                    productid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviewss", x => x.id);
                    table.ForeignKey(
                        name: "FK_Reviewss_Accounts_accountid",
                        column: x => x.accountid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Reviewss_ProdMsts_productid",
                        column: x => x.productid,
                        principalTable: "ProdMsts",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "commentDescriptions",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    message = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    images = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    commentDescriptionsid = table.Column<int>(type: "int", nullable: true),
                    commentid = table.Column<int>(type: "int", nullable: true),
                    accountid = table.Column<int>(type: "int", nullable: true),
                    Deleted = table.Column<bool>(type: "bit", nullable: false),
                    CretorEdit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_commentDescriptions", x => x.id);
                    table.ForeignKey(
                        name: "FK_commentDescriptions_Accounts_accountid",
                        column: x => x.accountid,
                        principalTable: "Accounts",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_commentDescriptions_commentDescriptions_commentDescriptionsid",
                        column: x => x.commentDescriptionsid,
                        principalTable: "commentDescriptions",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_commentDescriptions_comments_commentid",
                        column: x => x.commentid,
                        principalTable: "comments",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_roleid",
                table: "Accounts",
                column: "roleid");

            migrationBuilder.CreateIndex(
                name: "IX_Categorys_accountid",
                table: "Categorys",
                column: "accountid");

            migrationBuilder.CreateIndex(
                name: "IX_commentDescriptions_accountid",
                table: "commentDescriptions",
                column: "accountid");

            migrationBuilder.CreateIndex(
                name: "IX_commentDescriptions_commentDescriptionsid",
                table: "commentDescriptions",
                column: "commentDescriptionsid");

            migrationBuilder.CreateIndex(
                name: "IX_commentDescriptions_commentid",
                table: "commentDescriptions",
                column: "commentid");

            migrationBuilder.CreateIndex(
                name: "IX_comments_accountsid",
                table: "comments",
                column: "accountsid");

            migrationBuilder.CreateIndex(
                name: "IX_comments_productsid",
                table: "comments",
                column: "productsid");

            migrationBuilder.CreateIndex(
                name: "IX_orderDetails_Ordersid",
                table: "orderDetails",
                column: "Ordersid");

            migrationBuilder.CreateIndex(
                name: "IX_orderDetails_Productsid",
                table: "orderDetails",
                column: "Productsid");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProcessings_Accountid",
                table: "OrderProcessings",
                column: "Accountid");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProcessings_vanchuyenid",
                table: "OrderProcessings",
                column: "vanchuyenid");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Accountsid",
                table: "Orders",
                column: "Accountsid");

            migrationBuilder.CreateIndex(
                name: "IX_paymentDescriptions_ParentIdid",
                table: "paymentDescriptions",
                column: "ParentIdid");

            migrationBuilder.CreateIndex(
                name: "IX_paymentNotifications_PaymentIdid",
                table: "paymentNotifications",
                column: "PaymentIdid");

            migrationBuilder.CreateIndex(
                name: "IX_payments_MerchantIdid",
                table: "payments",
                column: "MerchantIdid");

            migrationBuilder.CreateIndex(
                name: "IX_payments_PaymentDestinationIdid",
                table: "payments",
                column: "PaymentDestinationIdid");

            migrationBuilder.CreateIndex(
                name: "IX_paymentSignatures_PaymentIdid",
                table: "paymentSignatures",
                column: "PaymentIdid");

            migrationBuilder.CreateIndex(
                name: "IX_paymentTransactions_PaymentIdid",
                table: "paymentTransactions",
                column: "PaymentIdid");

            migrationBuilder.CreateIndex(
                name: "IX_ProdMsts_Accountsid",
                table: "ProdMsts",
                column: "Accountsid");

            migrationBuilder.CreateIndex(
                name: "IX_ProdMsts_Categorysid",
                table: "ProdMsts",
                column: "Categorysid");

            migrationBuilder.CreateIndex(
                name: "IX_ProdMsts_Shopsid",
                table: "ProdMsts",
                column: "Shopsid");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategorys_Categoryid",
                table: "ProductCategorys",
                column: "Categoryid");

            migrationBuilder.CreateIndex(
                name: "IX_ProductCategorys_Productid",
                table: "ProductCategorys",
                column: "Productid");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImages_productid",
                table: "ProductImages",
                column: "productid");

            migrationBuilder.CreateIndex(
                name: "IX_Reviewss_accountid",
                table: "Reviewss",
                column: "accountid");

            migrationBuilder.CreateIndex(
                name: "IX_Reviewss_productid",
                table: "Reviewss",
                column: "productid");

            migrationBuilder.CreateIndex(
                name: "IX_Shops_accountid",
                table: "Shops",
                column: "accountid");

            migrationBuilder.CreateIndex(
                name: "IX_Shops_vanchuyenid",
                table: "Shops",
                column: "vanchuyenid");

            migrationBuilder.CreateIndex(
                name: "IX_ShopVanchuyens_shopid",
                table: "ShopVanchuyens",
                column: "shopid");

            migrationBuilder.CreateIndex(
                name: "IX_ShopVanchuyens_Vanchuyenid",
                table: "ShopVanchuyens",
                column: "Vanchuyenid");

            migrationBuilder.CreateIndex(
                name: "IX_tokens_accountid",
                table: "tokens",
                column: "accountid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "commentDescriptions");

            migrationBuilder.DropTable(
                name: "orderDetails");

            migrationBuilder.DropTable(
                name: "OrderProcessings");

            migrationBuilder.DropTable(
                name: "paymentNotifications");

            migrationBuilder.DropTable(
                name: "paymentSignatures");

            migrationBuilder.DropTable(
                name: "paymentTransactions");

            migrationBuilder.DropTable(
                name: "ProductCategorys");

            migrationBuilder.DropTable(
                name: "ProductImages");

            migrationBuilder.DropTable(
                name: "Reviewss");

            migrationBuilder.DropTable(
                name: "ShopVanchuyens");

            migrationBuilder.DropTable(
                name: "tokens");

            migrationBuilder.DropTable(
                name: "comments");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "payments");

            migrationBuilder.DropTable(
                name: "ProdMsts");

            migrationBuilder.DropTable(
                name: "merchants");

            migrationBuilder.DropTable(
                name: "paymentDescriptions");

            migrationBuilder.DropTable(
                name: "Categorys");

            migrationBuilder.DropTable(
                name: "Shops");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Shippings");

            migrationBuilder.DropTable(
                name: "roles");
        }
    }
}
