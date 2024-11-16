using MediatR;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Payment.Applications.Base.Models;
using Payment.Applications.Constants;
using Payment.Applications.Dtos;
using Payment.Applications.Features.Dtos;
using Payment.Applications.Features.Payment.Dtos;
using Payment.Applications.Interface;
using Payment.Service.VnPay.Config;
using Payment.Service.VnPay.Response;
using Payment.Ultils.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Features.Payment.Commands
{
    public class ProcessVnpayPaymentReturn : VnpayPayResponse, IRequest<BaseResultWithData<(PaymentReturnDtos, string)>>
    {

    }

    public class ProcessVnpayPaymentReturnHandler : IRequestHandler<ProcessVnpayPaymentReturn, BaseResultWithData<(PaymentReturnDtos, string)>>
    {
        private readonly IConnectionService connectionService;
        private readonly ISqlService sqlService;
        private readonly VnpayConfig vnpayConfig;

        public ProcessVnpayPaymentReturnHandler(IConnectionService connectionService, ISqlService sqlService, IOptions<VnpayConfig> vnpayConfig)
        {
            this.connectionService = connectionService;
            this.sqlService = sqlService;
            this.vnpayConfig = vnpayConfig.Value;
        }
        public Task<BaseResultWithData<(PaymentReturnDtos, string)>> Handle(ProcessVnpayPaymentReturn request, CancellationToken cancellationToken)
        {
            var result = new BaseResultWithData<(PaymentReturnDtos, string)>();
            string returnUrl = string.Empty;

            try
            {
                var resultData = new PaymentReturnDtos();
                var isValidSignature = request.IsValidSignature(vnpayConfig.HashSecret);
                if (isValidSignature)
                {
                    if (request.vnp_ResponseCode == "00")
                    {
                        string connectionString = connectionService.Database ?? string.Empty;
                        var paramters = new SqlParameter[]
                        {
                            new SqlParameter("@PaymentId", request.vnp_TxnRef)
                            //new SqlParameter("@PaymentId", "638554769512229579")
                        };
                        (var data, string sqlError) = sqlService.FillDatabase(connectionString, PaymentConstants.SelectByIdSprocName, paramters);
                        var payment = data.AsListObject<PaymentDtos>()?.SingleOrDefault();
                        if (payment != null)
                        {
                            paramters = new SqlParameter[]
                            {
                                //new SqlParameter("@Id", payment.MerchantId)
                                new SqlParameter("@Id", 1)
                            };

                            (data, sqlError) = sqlService.FillDatabase(connectionString, MerchantContans.SelectByIdSprocName, paramters);
                            var merchant = data.AsListObject<MerchantDtos>()?.SingleOrDefault();

                            returnUrl = merchant?.MerchantReturnUrl ?? string.Empty;

                            resultData.PaymentStatus = "00";
                            resultData.PaymentId = payment.id;


                            resultData.Signature = Guid.NewGuid().ToString();
                        }
                        else
                        {
                            resultData.PaymentStatus = "11";
                            resultData.PaymentMessage = "Can't find payment at payment service";
                        }
                    }
                    else
                    {
                        resultData.PaymentStatus = "10";
                        resultData.PaymentMessage = "Payment Process Faild";
                    }
                }
                else
                {
                    resultData.PaymentStatus = "99";
                    resultData.PaymentMessage = "Invalid Signature in response";
                }

                result.Success = true;
                result.Message = MessageContants.Ok;
                result.Data = (resultData, returnUrl);
            }
            catch (Exception ex)
            {
                result.Set(false, MessageContants.Error);
                result.Errors.Add(new BaseError()
                {
                    code = MessageContants.Exception,
                    message = ex.Message
                });
            }

            return Task.FromResult((result));
        }
    }
}
