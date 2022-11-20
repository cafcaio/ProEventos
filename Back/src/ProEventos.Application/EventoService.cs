using ProEventos.Application.Contratos;
using ProEventos.Persistence.Contratos;
using ProEventos.Domain;
using ProEventos.Application.Dto;
using AutoMapper;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IEventoPersist _eventoPersist;
        private readonly IMapper _mapper;
        public EventoService(IGeralPersist geralPersist,
                             IEventoPersist eventoPersist,
                             IMapper mapper)
        {
            this._mapper = mapper;
            this._eventoPersist = eventoPersist;
            this._geralPersist = geralPersist;

        }
    public async Task<EventoDto> AddEvento(EventoDto model)
    {
        try
        {
            var evento = _mapper.Map<Evento>(model);
            _geralPersist.Add<Evento>(evento);

            if (await _geralPersist.SaveChangesAsync())
            {
                var eventoRetorno = await _eventoPersist.GetEventoByIdAsync(evento.Id, false);
                return _mapper.Map<EventoDto>(eventoRetorno);
            }
            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto> UpdateEvento(int eventoId, EventoDto model)
    {
        try
        {

            var antigoEvento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
            if (antigoEvento == null) return null;

            var novoEvento = _mapper.Map<Evento>(model);

            novoEvento.Id = antigoEvento.Id;

            _geralPersist.Update<Evento>(novoEvento);

            if (await _geralPersist.SaveChangesAsync())
            {
                var retorno = await _eventoPersist.GetEventoByIdAsync(model.Id, false);
                return _mapper.Map<EventoDto>(retorno);
            }
            return null;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }

    }

    public async Task<bool> DeleteEvento(int eventoId)
    {
        try
        {
            var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, false);
            if (evento == null) throw new Exception("Evento a ser deletado não foi encontrado.");

            _geralPersist.Delete(evento);
            return await _geralPersist.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false)
    {
        try
        {
            var eventos = await _eventoPersist.GetAllEventosAsync(includePalestrantes);
            if (eventos == null) return null;

            return _mapper.Map<EventoDto[]>(eventos);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto[]> GetAllEventosByTemaAsync(string tema, bool includePalestrantes = false)
    {
        try
        {
            var eventos = await _eventoPersist.GetAllEventosByTemaAsync(tema, includePalestrantes);
            if (eventos == null) return null;

            return _mapper.Map<EventoDto[]>(eventos);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<EventoDto> GetEventoByIdAsync(int eventoId, bool includePalestrantes = false)
    {
        try
        {
            var evento = await _eventoPersist.GetEventoByIdAsync(eventoId, includePalestrantes);
            if (evento == null) return null;

            return _mapper.Map<EventoDto>(evento);
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }


}
}