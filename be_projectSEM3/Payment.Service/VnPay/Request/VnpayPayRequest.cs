using Payment.Service.VnPay.Lib;
using Payment.Ultils.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Service.VnPay.Request
{
    public class VnpayPayRequest
    {
        public SortedList<string, string> requestData = new SortedList<string, string>(new VnpayCompare());
        public VnpayPayRequest()
        {
            
        }

        public void MakeRequestData()
        {
            if (vnp_Amount != null)
                requestData.Add("vnp_Amount", vnp_Amount.ToString() ?? string.Empty);
            if (vnp_Command != null)
                requestData.Add("vnp_Command", vnp_Command);
            if (vnp_CreateDate != null)
                requestData.Add("vnp_CreateDate", vnp_CreateDate);
            if (vnp_CurrCode != null)
                requestData.Add("vnp_CurrCode", vnp_CurrCode);
            if (vnp_BankCode != null)
                requestData.Add("vnp_BankCode", vnp_BankCode);
            if (vnp_IpAddr != null)
                requestData.Add("vnp_IpAddr", vnp_IpAddr);
            if (vnp_Locale != null)
                requestData.Add("vnp_Locale", vnp_Locale);
            if (vnp_OrderInfo != null)
                requestData.Add("vnp_OrderInfo", vnp_OrderInfo);
            if (vnp_OrderType != null)
                requestData.Add("vnp_OrderType", vnp_OrderType);
            if (vnp_ReturnUrl != null)
                requestData.Add("vnp_ReturnUrl", vnp_ReturnUrl);
            if (vnp_TmnCode != null)
                requestData.Add("vnp_TmnCode", vnp_TmnCode);
            if (vnp_ExpireDate != null)
                requestData.Add("vnp_ExpireDate", vnp_ExpireDate);
            if (vnp_TxnRef != null)
                requestData.Add("vnp_TxnRef", vnp_TxnRef);
            if (vnp_Version != null)
                requestData.Add("vnp_Version", vnp_Version);
        }

        public VnpayPayRequest(string? version, string tmnCode, DateTime createDate, string ipAddress, decimal? amount, string currCode, string orderType, string orderInfo,
            string returnUrl, string txnRef)
        {
            this.vnp_Locale = "vn";
            this.vnp_IpAddr = ipAddress;
            this.vnp_Version = version;
            this.vnp_CurrCode = currCode;
            this.vnp_CreateDate = createDate.ToString("yyyyMMddHHmmss");
            this.vnp_TmnCode = tmnCode;
            this.vnp_Amount = (int)amount * 100;
            this.vnp_Command = "pay";
            this.vnp_OrderType = orderType;
            this.vnp_OrderInfo = orderInfo;
            this.vnp_ReturnUrl = returnUrl;
            this.vnp_TxnRef = txnRef;

        }

        public string GetLink(string baseUrl, string secretKey)
        {
            MakeRequestData();
            StringBuilder stringBuilder = new StringBuilder();
            foreach(KeyValuePair<string, string> kv in requestData)
            {
                if (!string.IsNullOrEmpty(kv.Key))
                {
                    stringBuilder.Append(WebUtility.UrlEncode(kv.Key) + "=" + WebUtility.UrlEncode(kv.Value) + "&");
                }
            }

            var resul = baseUrl + "?" + stringBuilder.ToString();
            var mahoa = HashHelpers.HmacSHA512(secretKey, stringBuilder.ToString().Remove(stringBuilder.Length - 1, 1)); // "Remove(stringBuilder.Length - 1, 1)" Nghĩa là xóa đi ký tự cuối cùng của chuỗi "stringBuilder", "stringBuilder.Length - 1" là lấy ra ký tự cuối cùng, "1" là xóa đi 1 phần tử 
            return resul += "vnp_SecureHash=" + mahoa;
        }

        public decimal? vnp_Amount { get; set; }
        public string? vnp_Command { get; set; }
        public string? vnp_Create { get; set; }
        public string? vnp_CreateDate { get; set; }
        public string? vnp_CurrCode { get; set; }
        public string? vnp_BankCode { get; set; }
        public string? vnp_IpAddr { get; set; }
        public string? vnp_Locale { get; set; }
        public string? vnp_OrderInfo { get; set; }
        public string? vnp_OrderType { get; set; }
        public string? vnp_ReturnUrl { get; set; }
        public string? vnp_TmnCode { get; set; }
        public string? vnp_ExpireDate { get; set; }
        public string? vnp_TxnRef { get; set; }
        public string? vnp_Version { get; set; }
        public string? vnp_SecureHash { get; set; }
    }
}
