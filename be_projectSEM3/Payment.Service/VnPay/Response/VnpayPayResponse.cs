﻿using Microsoft.AspNetCore.Mvc;
using Payment.Service.VnPay.Lib;
using Payment.Ultils.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Service.VnPay.Response
{
    [BindProperties]
    public class VnpayPayResponse
    {
        public SortedList<string, string> responseData = new SortedList<string, string>(new VnpayCompare());
        public string? vnp_TmnCode {  get; set; } = string.Empty;
        public string? vnp_BankCode {  get; set; } = string.Empty;
        public string? vnp_BankTranNo {  get; set; } = string.Empty;
        public string? vnp_CardType {  get; set; } = string.Empty;
        public string? vnp_OrderInfo {  get; set; } = string.Empty;
        public string? vnp_TransactionNo {  get; set; } = string.Empty;
        public string? vnp_TransactionStatus {  get; set; } = string.Empty;
        public string? vnp_TxnRef {  get; set; } = string.Empty;
        public string? vnp_SecureHash {  get; set; } = string.Empty;
        public int? vnp_Amount {  get; set; }
        public string? vnp_ResponseCode {  get; set; }
        public string? vnp_PayDate { get; set; } = string.Empty;


		public bool IsValidSignature(string secret)
		{
			MakeRequestData();
			StringBuilder data = new StringBuilder();
			foreach (KeyValuePair<string, string> kv in responseData)
			{
				if (!String.IsNullOrEmpty(kv.Value))
				{
					data.Append(WebUtility.UrlEncode(kv.Key) + "=" + WebUtility.UrlEncode(kv.Value) + "&");
				}

			}
			//data = data.Remove(data.Length - 1, 1);
			string checkSum = HashHelpers.HmacSHA512(secret, data.ToString().Remove(data.Length - 1, 1));
			return checkSum.Equals(this.vnp_SecureHash, StringComparison.InvariantCultureIgnoreCase);
		}

		public void MakeRequestData()
		{
			if (vnp_Amount != null)
				responseData.Add("vnp_Amount", vnp_Amount.ToString() ?? string.Empty);
			if (!string.IsNullOrEmpty(vnp_TmnCode))
				responseData.Add("vnp_TmnCode", vnp_TmnCode.ToString() ?? string.Empty);
			if (!string.IsNullOrEmpty(vnp_BankCode))
				responseData.Add("vnp_BankCode", vnp_BankCode.ToString() ?? string.Empty);
			if (!string.IsNullOrEmpty(vnp_BankTranNo))
				responseData.Add("vnp_BankTranNo", vnp_BankTranNo.ToString() ?? string.Empty);
			if (vnp_CardType != null)
				responseData.Add("vnp_CardType", vnp_CardType.ToString() ?? string.Empty);
			if (vnp_OrderInfo != null)
				responseData.Add("vnp_OrderInfo", vnp_OrderInfo.ToString() ?? string.Empty);
			if (vnp_TransactionNo != null)
				responseData.Add("vnp_TransactionNo", vnp_TransactionNo.ToString() ?? string.Empty);
			if (vnp_TransactionStatus != null)
				responseData.Add("vnp_TransactionStatus", vnp_TransactionStatus.ToString() ?? string.Empty);
			if (vnp_TxnRef != null)
				responseData.Add("vnp_TxnRef", vnp_TxnRef.ToString() ?? string.Empty);
			//if (vnp_SecureHash != null)
			//    responseData.Add("vnp_SecureHash", vnp_SecureHash.ToString() ?? string.Empty);
			if (vnp_PayDate != null)
				responseData.Add("vnp_PayDate", vnp_PayDate.ToString() ?? string.Empty);
			if (vnp_ResponseCode != null)
				responseData.Add("vnp_ResponseCode", vnp_ResponseCode ?? string.Empty);
		}

	}
}
