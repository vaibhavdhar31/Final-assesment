using AutoMapper;
using Employee.Api.Models.DTOs;
using Employee.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Employee.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeeService _service;
    private readonly IMapper _mapper;

    public EmployeeController(IEmployeeService service, IMapper mapper)
    {
        _service = service;
        _mapper = mapper;
    }

    /// <summary>
    /// Get all employees
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<EmployeeReadDto>), 200)]
    public async Task<ActionResult<IEnumerable<EmployeeReadDto>>> GetAll()
    {
        var employees = await _service.GetAllAsync();
        return Ok(_mapper.Map<IEnumerable<EmployeeReadDto>>(employees));
    }

    /// <summary>
    /// Get employee by ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(EmployeeReadDto), 200)]
    [ProducesResponseType(404)]
    public async Task<ActionResult<EmployeeReadDto>> GetById(int id)
    {
        var employee = await _service.GetByIdAsync(id);
        if (employee == null) return NotFound();
        
        return Ok(_mapper.Map<EmployeeReadDto>(employee));
    }

    /// <summary>
    /// Create a new employee
    /// </summary>
    [HttpPost]
    [ProducesResponseType(typeof(EmployeeReadDto), 201)]
    [ProducesResponseType(400)]
    public async Task<ActionResult<EmployeeReadDto>> Create(EmployeeCreateDto dto)
    {
        var employee = _mapper.Map<Models.Employee>(dto);
        var created = await _service.CreateAsync(employee);
        var result = _mapper.Map<EmployeeReadDto>(created);
        
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    /// <summary>
    /// Update an employee
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Update(int id, EmployeeUpdateDto dto)
    {
        var employee = _mapper.Map<Models.Employee>(dto);
        var updated = await _service.UpdateAsync(id, employee);
        
        return updated ? NoContent() : NotFound();
    }

    /// <summary>
    /// Delete an employee
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
