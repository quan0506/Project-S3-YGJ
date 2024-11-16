using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Constants
{
    public class PaymentConstants
    {
        public static string InsertSprocName => "Sproc_PaymentInsert";
        public static string SelectByIdSprocName => "sproc_PaymentSelectById";
    }
}
