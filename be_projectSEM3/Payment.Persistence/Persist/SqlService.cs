using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Payment.Applications.Interface;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Payment.Persistence.Persist
{
    public class SqlService : ISqlService
    {
        public SqlParameter CreateOutoutParameter(string name, SqlDbType type)
        {
            var param = new SqlParameter(name, type);
            param.Direction = ParameterDirection.Output;
            return param;
        }
            
        public SqlParameter CreateOutoutParameter(string name, SqlDbType type, int size)
        {
            var param = new SqlParameter(name, type, size);
            param.Direction = ParameterDirection.Output;
            return param;
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

        public (int, string) ExecuteNonQuery(string connection, string SqlObjectName, params SqlParameter[] parameters)
        {
            int result = -1;
            string message = string.Empty;
            try
            {
                using(SqlConnection conn = new SqlConnection(connection))
                {
                    using(SqlCommand cmd = new SqlCommand(SqlObjectName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Id", randomInt()); // Bổ sung thêm dữ liệu vào "parameters" được chuyền vào
                        cmd.CommandTimeout = 900;
                        cmd.Parameters.AddRange(parameters);
                        conn.Open();
                        result = cmd.ExecuteNonQuery();
                        conn.Close();

                    }
                }
            }catch(Exception ex)
            {
                message = ex.Message;
            }
            return (result, message);
        }

        public Task<(int, string)> ExecuteNonQueryAsync(string connection, string SqlObjectName, params SqlParameter[] parameters)
        {
            int result = -1;
            string message = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection(connection))
                {
                    using (SqlCommand cmd = new SqlCommand(SqlObjectName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 900;
                        cmd.Parameters.AddRange(parameters);
                        conn.OpenAsync();
                        result = cmd.ExecuteNonQuery();
                        conn.CloseAsync();

                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

            return Task.FromResult((result, message));
        }

        public (DataTable, string) FillDatabase(string connection, string SqlObjectName, params SqlParameter[] parameters)
        {
            DataTable dataTable = new DataTable();
            string message = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection(connection))
                {
                    using (SqlCommand cmd = new SqlCommand(SqlObjectName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 900;
                        cmd.Parameters.AddRange(parameters);
                        SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
                        sqlDataAdapter.SelectCommand = cmd;
                        conn.Open();
                        sqlDataAdapter.Fill(dataTable);
                        conn.Close();

                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

            return (dataTable, message);
        }

        public Task<(DataTable, string)> FillDatabaseAsync(string connection, string SqlObjectName, params SqlParameter[] parameters)
        {
            DataTable dataTable = new DataTable();
            string message = string.Empty;

            try
            {
                using (SqlConnection conn = new SqlConnection(connection))
                {
                    using (SqlCommand cmd = new SqlCommand(SqlObjectName, conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.CommandTimeout = 900;
                        cmd.Parameters.AddRange(parameters);
                        SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
                        sqlDataAdapter.SelectCommand = cmd;
                        conn.OpenAsync();
                        sqlDataAdapter.Fill(dataTable);
                        conn.CloseAsync();

                    }
                }
            }
            catch (Exception ex)
            {
                message = ex.Message;
            }

            return Task.FromResult((dataTable, message));
        }
    }
}
