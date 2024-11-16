using AutoMapper;
using thuongmaidientus1.Models;
using thuongmaidientus1.ViewModel;

namespace thuongmaidientus1.Mapper
{
    public class OrderMaper : Profile
    {
        public OrderMaper()
        {
            CreateMap<Order, OrderDTO>();
            CreateMap<Models.OrderProcessing, XulydonhangDTO>()
                .ForMember(x => x.price, xdto => xdto.MapFrom(dto => dto.price))
                .ForMember(x => x.total, xdto => xdto.MapFrom(dto => dto.total))
                .ForMember(x => x.product_id, xdto => xdto.MapFrom(dto => dto.product_id))
                .ForMember<string>(x => x.product_name, xdto => xdto.MapFrom<string>(dto => dto.product_name))
                .ForMember(x => x.id, xdto => xdto.MapFrom(dto => dto.id))
                .ForMember(x => x.soluong, xdto => xdto.MapFrom(dto => dto.soluong));
            CreateMap<XulydonhangDTO, Models.OrderProcessing>()
                .ForMember(x => x.price, xdto => xdto.MapFrom(dto => dto.price))
                .ForMember(x => x.total, xdto => xdto.MapFrom(dto => dto.total))
                .ForMember(x => x.product_id, xdto => xdto.MapFrom(dto => dto.product_id))
                .ForMember<string>(x => x.product_name, xdto => xdto.MapFrom<string>(dto => dto.product_name))
                .ForMember(x => x.id, xdto => xdto.MapFrom(dto => dto.id))
                .ForMember(x => x.soluong, xdto => xdto.MapFrom(dto => dto.soluong));

        }
    }
}
