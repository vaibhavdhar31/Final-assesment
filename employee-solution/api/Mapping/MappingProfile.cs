using AutoMapper;
using Employee.Api.Models.DTOs;

namespace Employee.Api.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Models.Employee, EmployeeReadDto>();
        CreateMap<EmployeeCreateDto, Models.Employee>();
        CreateMap<EmployeeUpdateDto, Models.Employee>();
    }
}
