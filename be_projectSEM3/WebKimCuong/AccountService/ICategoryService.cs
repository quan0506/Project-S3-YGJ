using thuongmaidientus1.Common;
using thuongmaidientus1.Models;

namespace thuongmaidientus1.AccountService
{
    public interface ICategoryService
    {
        Task<PayLoad<object>> FindAll(string? name, int page = 1, int pageSize = 20);
        Task<PayLoad<Category>> FindOneId(int id);
        Task<PayLoad<Category>> AddCategory(Category category);
        Task<PayLoad<Category>> UpdateCategory(int id, Category category, string? name);
        Task<PayLoad<string>> DeleteCategory(IList<string> id);


    }
}
