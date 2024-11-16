using Newtonsoft.Json;
using Payment.Service.Zalopay.Response;
using Payment.Ultils.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Service.Zalopay.Request
{
    public class CreateZalopayPayRequest
    {
        public CreateZalopayPayRequest(int appId, string appUser, long appTime, long amount, string appTransId, string bankCode, string description)
        {
            this.AppId = appId;
            this.AppUser = appUser;
            this.AppTime = appTime;
            this.Amount = amount;
            this.AppTransId = appTransId;
            this.BankCode = bankCode;
            this.Description = description;

        }
        public int AppId { get; set; }
        public string? AppUser { get; set; } = string.Empty;
        public long? AppTime { get; set; }
        public long? Amount { get; set; }
        public string? AppTransId { get; set; } = string.Empty;
        public string? ReturnUrl { get; set; }
        public string? EmbedData { get; set; } = string.Empty;
        public string? Mac { get; set; } = string.Empty;
        public string? BankCode { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;

        public void MakeSignature(string key)
        {
            var data = AppId + "|" + AppTransId + "|" + AppUser + "|" + Amount + "|" + AppTime + "|" + "|";
            this.Mac = HashHelpers.HmacSHA256(data, key);
        }

        public Dictionary<string, string> GetContent()
        {
            Dictionary<string, string> keyValues = new Dictionary<string, string>();
            keyValues.Add("appid", AppId.ToString());
            keyValues.Add("appuser", AppUser);
            keyValues.Add("apptime", AppTime.ToString());
            keyValues.Add("amount", Amount.ToString());
            keyValues.Add("apptransid", AppTransId);
            keyValues.Add("description", Description);
            keyValues.Add("bankcode", "zalopayapp");
            keyValues.Add("mac", Mac);

            return keyValues;
        }

        public (bool, string) GetLink(string paymentUrl)
        {
            using var client = new HttpClient();
            var content = new FormUrlEncodedContent(GetContent());
            var response = client.PostAsync(paymentUrl, content).Result;

            if (response.IsSuccessStatusCode)
            {
                var responseContent = response.Content.ReadAsStringAsync().Result;
                var responseData = JsonConvert.DeserializeObject<CreateZalopayPayResponse>(responseContent);

                if(responseData.returnCode == 1)
                {
                    return (true, responseData.orderUrl);
                }
                else
                {
                    return (false, responseData.returnMessage);
                }
            }
            else
            {
                return (false, response.ReasonPhrase ?? string.Empty);
            }
        }
    }
}
