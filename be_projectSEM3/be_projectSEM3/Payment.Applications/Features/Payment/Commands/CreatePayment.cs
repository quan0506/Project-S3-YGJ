using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Payment.Applications.Base.Models;
using Payment.Applications.Constants;
using Payment.Applications.Features.Merchant.Dtos;
using Payment.Applications.Interface;
using Payment.Service.VnPay.Config;
using Payment.Service.VnPay.Request;
using Payment.Service.Zalopay.Config;
using Payment.Service.Zalopay.Request;
using Payment.Ultils.Extensions;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Features.Payment.Commands
{
    public class CreatePayment : IRequest<BaseResultWithData<PaymentLinkDtos>>
    {
        public string? PaymentContent { get; set; }
        public string? PaymentCurrency { get; set; }
        public int? PaymentRefId { get; set; }
        public decimal? PaymentAmount { get; set; }
        public DateTimeOffset? PaymentDate { get; set; } = DateTimeOffset.UtcNow;
        public DateTimeOffset? ExpireDate { get; set; } = DateTimeOffset.UtcNow.AddMinutes(15);
        public string? PaymentLanguage { get; set; }
        public int? MerchantId { get; set; }
        public int? PaymentDestinationId { get; set; }
        public string? Signature { get; set; }
    }

    public class CreatePaymentHandler : IRequestHandler<CreatePayment, BaseResultWithData<PaymentLinkDtos>>
    {
        private readonly ICurrentUserService currentUserService;
        private readonly IConnectionService connectionService;
        private readonly ISqlService sqlService;
        private readonly VnpayConfig vnpayConfigs;
        private readonly ZaloPayConfig zaloPayConfigs;

        public CreatePaymentHandler(ICurrentUserService currentUserService, IConnectionService connectionService, ISqlService sqlService, IOptions<VnpayConfig> vnpayConfigs, IOptions<ZaloPayConfig> zaloPayConfigsOption)
        {
            this.currentUserService = currentUserService;
            this.connectionService = connectionService;
            this.sqlService = sqlService;
            this.vnpayConfigs = vnpayConfigs.Value;
            this.zaloPayConfigs = zaloPayConfigsOption.Value;
        }
        private int[] randomIntArray(int so = 10)
        {
            Random random = new Random();
            int[] mang = new int[so];
            for (int i = 0; i < so; i++)
            {
                mang[i] = random.Next();
            }
            return mang;
        }
        private int[] randomArrMinMax(int so = 10, int min = 0, int max = 10)
        {
            Random random = new Random();
            int[] mang = new int[so];
            for (int i = 0; i < so; i++)
            {
                mang[i] = random.Next(min, max);
            }
            return mang;
        }
        private int randomIntMinMax(int min = 0, int max = 10)
        {
            Random random = new Random();
            int n = random.Next(min, max);
            return n;
        }

        private int randomInt()
        {
            Random random = new Random();
            int n = random.Next();
            return n;
        }
        private int randomMaxInt(int max = 10)
        {
            Random random = new Random();
            int so = random.Next(max);
            return so;
        }

        private string GenerateTransactionReference()
        {
            return DateTime.Now.Ticks.ToString();
        }
        public Task<BaseResultWithData<PaymentLinkDtos>> Handle(CreatePayment request, CancellationToken cancellationToken)
        {
            var resul = new BaseResultWithData<PaymentLinkDtos>();
            try
            {
                var connectionString = connectionService.Database ?? string.Empty;
                var outputIdParam = sqlService.CreateOutoutParameter("@InsertedId", SqlDbType.NVarChar, 250);
                var paramters = new SqlParameter[]
                {
                    //new SqlParameter("@Id", randomInt()),
                    new SqlParameter("@PaymentId", GenerateTransactionReference()),
                    new SqlParameter("@PaymentContent", request.PaymentContent ?? string.Empty),
                    new SqlParameter("@PaymentCurrency", request.PaymentCurrency ?? string.Empty),
                    new SqlParameter("@PaymentRefId", request.PaymentRefId),
                    new SqlParameter("@PaymentAmount", request.PaymentAmount),
                    new SqlParameter("@PaymentDate", DateTime.Now),
                    new SqlParameter("@ExpireDate", DateTime.Now.AddMinutes(15)),
                    new SqlParameter("@PaymentLanguage", request.PaymentLanguage ?? string.Empty),
                    new SqlParameter("@Signature", request.Signature ?? string.Empty),
                    new SqlParameter("@MerchantIdid", request.MerchantId),
                    new SqlParameter("@PaymentDestinationIdid", request.PaymentDestinationId),
                    new SqlParameter("@InsertUser", currentUserService.UserId ?? string.Empty),
                    outputIdParam // Dữ liệu trả về từ Database
                };
                (int affectedRows, string sqlError) = sqlService.ExecuteNonQuery(connectionString, PaymentConstants.InsertSprocName, paramters);
                if (affectedRows > 1)
                {
                    var paymentUrl = string.Empty;
                    switch (request.PaymentDestinationId)
                    {
                        case 1:
                            var vnpayPayRequest = new VnpayPayRequest(vnpayConfigs.Version,
                                vnpayConfigs.TmnCode, DateTime.Now, currentUserService.IpAddress ?? string.Empty,
                                request.PaymentAmount, request.PaymentCurrency ?? string.Empty, "other", request.PaymentContent ?? string.Empty,
                                vnpayConfigs.ReturnUrl, outputIdParam!.Value?.ToString() ?? string.Empty);

                            paymentUrl = vnpayPayRequest.GetLink(vnpayConfigs.PaymentUrl, vnpayConfigs.HashSecret);
                            break;
                        case 2:
                            var zalopayPayRequest = new CreateZalopayPayRequest(zaloPayConfigs.AppId, zaloPayConfigs.AppUser, DateTime.Now.GetTimeStamp(), (long)request.PaymentAmount!, DateTime.Now.ToString("yyMMdd") + "_" + outputIdParam!.Value.ToString() ?? string.Empty, "zalopayapp", request.PaymentContent ?? string.Empty);
                            zalopayPayRequest.MakeSignature(zaloPayConfigs.Key1);
                            (bool createZaloPayLinkResult, string? createZaloPayMessage) = zalopayPayRequest.GetLink(zaloPayConfigs.PaymentUrl);
                            if (createZaloPayLinkResult)
                            {
                                paymentUrl = createZaloPayMessage;
                            }
                            else
                            {
                                resul.Message = createZaloPayMessage;
                            }
                            break;
                        default:
                            break;

                    }
                    resul.Set(true, MessageContants.Ok, new PaymentLinkDtos()
                    {
                        PaymentId = outputIdParam!.Value?.ToString() ?? string.Empty,
                        PaymentUrl = paymentUrl
                    });
                }
                else
                {
                    resul.Set(false, MessageContants.Error);
                    resul.Errors.Add(new BaseError()
                    {
                        code = MessageContants.Error,
                        message = sqlError
                    });
                }
            }
            catch (Exception ex)
            {
                resul.Set(false, MessageContants.Error);
                resul.Errors.Add(new BaseError()
                {
                    code = MessageContants.Exception,
                    message = ex.Message,
                });
            }
            return Task.FromResult(resul);
        }
    }


}
