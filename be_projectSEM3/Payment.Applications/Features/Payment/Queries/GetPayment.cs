using MediatR;
using Microsoft.Data.SqlClient;
using Payment.Applications.Base.Models;
using Payment.Applications.Constants;
using Payment.Applications.Features.Dtos;
using Payment.Applications.Interface;
using Payment.Ultils.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Features.Payment.Queries
{
    public class GetPayment : IRequest<BaseResultWithData<PaymentDtos>>
    {
        private readonly ICurrentUserService currentUserService;
        private readonly ISqlService sqlService;
        private readonly IConnectionService connectionService;

        public string? Id { get; set; } = string.Empty;
        public GetPayment(ICurrentUserService currentUserService, ISqlService sqlService, IConnectionService connectionService)
        {
            this.currentUserService = currentUserService;
            this.sqlService = sqlService;
            this.connectionService = connectionService;
        }

        public Task<BaseResultWithData<PaymentDtos>> Handle(GetPayment request, CancellationToken cancellationToken)
        {
            var result = new BaseResultWithData<PaymentDtos>();
            try
            {
                string connectionString = connectionService.Database ?? string.Empty;
                var paramters = new SqlParameter[]
                {
                    new SqlParameter("@PaymentId", int.TryParse(request.Id, out int songuyen)),
                };

                (var data, string sqlError) = sqlService.FillDatabase(connectionString, PaymentConstants.SelectByIdSprocName, paramters);
                var payment = data.AsListObject<PaymentDtos>()?.SingleOrDefault();

                if (payment != null)
                {
                    result.Set(true, MessageContants.Ok, payment);
                }
                else
                {
                    result.Set(false, MessageContants.NotFound);
                }
            }catch(Exception ex)
            {
                result.Set(false, MessageContants.Error);
                result.Errors.Add(new BaseError()
                {
                    code = MessageContants.Exception,
                    message = ex.Message
                });
            }
            return Task.FromResult(result);
        }
    }
}
