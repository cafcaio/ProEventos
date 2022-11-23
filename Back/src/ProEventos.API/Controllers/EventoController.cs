using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dto;

namespace ProEventos.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventoController : ControllerBase
{

    private readonly IEventoService _eventoService;

    public EventoController(IEventoService eventoService)
    {
        this._eventoService = eventoService;

    }

    //[HttpGet(Name = "GetEvento")]
    [HttpGet]

    public async Task<IActionResult> Get()
    {
        try
        {
            var eventos = await _eventoService.GetAllEventosAsync(true);
            if (eventos == null) return NoContent();

            return Ok(eventos);
        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            new {message = $"Erro ao tentar recuperar eventos. Erro: {ex.Message}"});
        }
    }

    [HttpGet("{id}")]

    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var evento = await _eventoService.GetEventoByIdAsync(id, true);
            if (evento == null) return NoContent();

            return Ok(evento);
        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            new {message = $"Erro ao tentar recuperar eventos. Erro: {ex.Message}"});
        }
    }

    [HttpGet("tema/{tema}")]

    public async Task<IActionResult> GetByTema(string tema)
    {
        try
        {
            var evento = await _eventoService.GetAllEventosByTemaAsync(tema, true);
            if (evento == null) return NoContent();

            return Ok(evento);
        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            new {message = $"Erro ao tentar recuperar eventos. Erro: {ex.Message}"});
        }
    }

    [HttpPost]

    public async Task<IActionResult> Post(EventoDto model)
    {
        try
        {
            var evento = await _eventoService.AddEvento(model);
            if (evento == null) return BadRequest(new {message = "Erro ao adicionar evento."});

            return Ok(evento);
        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            new {message = $"Erro ao tentar adicionar eventos. Erro: {ex.Message}"});
        }

    }

    [HttpPut("{id}")]

    public async Task<IActionResult> Put(int id, EventoDto model)
    {
        try
        {
            var evento = await _eventoService.UpdateEvento(id, model);
            if (evento == null) return BadRequest(new {message = "Evento com este ID não foi encontrado."});

            return Ok(evento);
        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            new {message = $"Erro ao tentar atualizar eventos. Erro: {ex.Message}"});
        }
    }

    [HttpDelete("{id}")]

    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            if (await _eventoService.DeleteEvento(id)){
                return Ok(new {message = $"Evento com ID {id} deletado."});
            } 
            return BadRequest(new {message = "Não foi possível deletar o evento."});
            

        }
        catch (Exception ex)
        {
            
            return this.StatusCode(StatusCodes.Status500InternalServerError,
            new {message = $"Erro ao tentar deletar eventos. Erro: {ex.Message}"});
        }
    }
}
