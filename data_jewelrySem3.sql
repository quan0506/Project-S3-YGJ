/******* Data jewelry web *******/
INSERT INTO [dbo].[roles] ([name], [Deleted], [CretorEdit], [CreatedAt], [UpdatedAt])
VALUES 
('User', 0, 'system', GETDATE(), GETDATE()),
('Admin', 0, 'system', GETDATE(), GETDATE());


select * from dbo.roles
select * from dbo.Accounts
select * from dbo.tokens

select * from dbo.Categorys
select * from dbo.ProductCategorys
select * from dbo.ProdMsts
select * from dbo.ProductImages

select * from dbo.merchants
select * from dbo.orderDetails
select * from dbo.OrderProcessings
select * from dbo.Orders

select * from dbo.commentDescriptions
select * from dbo.comments
select * from dbo.Reviewss

select * from dbo.paymentDescriptions
select * from dbo.paymentNotifications
select * from dbo.payments
select * from dbo.paymentSignatures
select * from dbo.paymentTransactions

SET IDENTITY_INSERT [shopkimcuongs].[dbo].[paymentDescriptions] ON;

INSERT INTO [shopkimcuongs].[dbo].[paymentDescriptions] (
    [id],
    [DesLogo],
    [DesShortName],
    [DesName],
    [DesSortIndex],
    [ParentIdid],
    [IsActive],
    [Deleted],
    [CretorEdit],
    [CreatedAt],
    [UpdatedAt]
) VALUES
(
    1, 
    'VnPay', 
    'VnPay', 
    'VnPay', 
    123, 
    1, 
    1, 
    0, 
    NULL, 
    '2024-01-18 15:12:05.5000000 +00:00', 
    '2024-01-18 15:12:05.5000000 +00:00'
),
(
    2, 
    'ZaloPay', 
    'ZaloPay', 
    'ZaloPay', 
    123, 
    1, 
    1, 
    0, 
    NULL, 
    '2024-01-18 15:12:05.5000000 +00:00', 
    '2024-01-18 15:12:05.5000000 +00:00'
);
