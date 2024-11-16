using Mapster;
using MediatR;
using Microsoft.Data.SqlClient;
using Payment.Applications.Base.Models;
using Payment.Applications.Constants;
using Payment.Applications.Dtos;
using Payment.Applications.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Features.Merchant.Commands
{
    public class CreateMerchant : IRequest<BaseResultWithData<MerchantDtos>>
    {
        public string? MerchantName { get; set; }
        public string? MerchantWebLink { get; set; }
        public string? MerchantIpnUrl { get; set; }   // Trường dữ liệu này trả dữ liệu về phía BackEnd 
        public string? MerchantReturnUrl { get; set; }
    }

    public class CreateMerchantHandler : IRequestHandler<CreateMerchant, BaseResultWithData<MerchantDtos>>
    {
        private readonly ICurrentUserService currentUserService;
        private readonly ISqlService sqlService;
        private readonly IConnectionService connectionService;

        public CreateMerchantHandler(ICurrentUserService currentUserService, ISqlService sqlService, IConnectionService connectionService)
        {
            this.currentUserService = currentUserService;
            this.sqlService = sqlService;
            this.connectionService = connectionService;
        }
        public Task<BaseResultWithData<MerchantDtos>> Handle(CreateMerchant request, CancellationToken cancellationToken)
        {
            var result = new BaseResultWithData<MerchantDtos>();
            try
            {
                string connectionString = connectionService.Database ?? string.Empty;
                var outputIdParam = sqlService.CreateOutoutParameter("@InsertId", SqlDbType.Int);
                var paramters = new SqlParameter[]
                {
                    new SqlParameter("@MerchantName", request.MerchantName ?? string.Empty),
                    new SqlParameter("@MerchantIpnUrl", request.MerchantIpnUrl ?? string.Empty),
                    new SqlParameter("@MerchantReturnUrl", request.MerchantReturnUrl ?? string.Empty),
                    new SqlParameter("@MerchantWebLink", request.MerchantWebLink ?? string.Empty),
                    new SqlParameter("@InsertUser", currentUserService.UserId ?? string.Empty),
                    outputIdParam // Dữ liệu trả về từ Database
                };
                (int affectedRows, string sqlError) = sqlService.ExecuteNonQuery(connectionString, MerchantContans.InsertSprocName, paramters);
                if(affectedRows == 1)
                {
                    var resultData = request.Adapt<MerchantDtos>();
                    resultData.Id = (int)outputIdParam.Value;
                    result.Set(true, MessageContants.Ok, resultData);
                }
                else
                {
                    result.Set(false, MessageContants.Error);
                    result.Errors.Add(new BaseError()
                    {
                        code = "Sql",
                        message = sqlError
                    });
                }
            }catch(Exception ex)
            {
                result.Set(false, MessageContants.Error);
                result.Errors.Add(new BaseError()
                {
                    code = MessageContants.Exception,
                    message = ex.Message,
                });
            }
            return Task.FromResult(result);
        }
    }
}
