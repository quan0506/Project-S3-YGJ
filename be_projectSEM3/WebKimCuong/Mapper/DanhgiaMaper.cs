using AutoMapper;
using thuongmaidientus1.Models;
using thuongmaidientus1.ViewModel;

namespace thuongmaidientus1.Mapper
{
    public class DanhgiaMaper : Profile
    {
        public DanhgiaMaper()
        {
            // Class "DanhgiaDTO" đang chuyền dữ liệu sang cho Class "Reviews"
            CreateMap<DanhgiaDTO, Reviews>()
                .ForMember(x => x.message, xd => xd.MapFrom(xdt => xdt.message))
                .ForMember(x => x.sao, xd => xd.MapFrom(xdt => xdt.sao));

            // Class "Reviews" đang chuyền dữ liệu sang cho Class "DanhgiaDTO"
            CreateMap<Reviews, DanhgiaDTO>()
                .ForMember(x => x.message, xd => xd.MapFrom(xdt => xdt.message))
                .ForMember(x => x.sao, xd => xd.MapFrom(xdt => xdt.sao));
        }
    }
}
