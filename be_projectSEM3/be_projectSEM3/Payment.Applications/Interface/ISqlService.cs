using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Applications.Interface
{
    public interface ISqlService
    {
        SqlParameter CreateOutoutParameter(string name, SqlDbType type);
        SqlParameter CreateOutoutParameter(string name, SqlDbType type, int size);
        (int, string) ExecuteNonQuery(string connection, string SqlObjectName, params SqlParameter[] parameters);
        Task<(int, string)> ExecuteNonQueryAsync(string connection, string SqlObjectName, params SqlParameter[] parameters);
        (DataTable, string) FillDatabase(string connection, string SqlObjectName, params SqlParameter[] parameters);
        Task<(DataTable, string)> FillDatabaseAsync(string connection, string SqlObjectName, params SqlParameter[] parameters);

    }
}
