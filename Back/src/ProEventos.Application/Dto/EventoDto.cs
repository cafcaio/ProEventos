using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dto
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string? DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
        //MinLength(4, ErrorMessage = "{0} deve ter no mínimo 4 caracteres."),
        //MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres.")
        StringLength(50, MinimumLength = 3, ErrorMessage = "{0} deve ter entre 3 e 50 caracteres.")]
        public string Tema { get; set; }
        
        [Range(1, 120000, ErrorMessage = "{0} deve estar entre 1 e 120000.")]
        public int QtdPessoas { get; set; }
        
        [RegularExpression(@"^\w+\.(gif|jpe?g|bmp|png)$",
        ErrorMessage = "Nome da imagem é inválido. São aceitos os formatos gif, jpg, jpeg, bmp e png.")]
        public string ImagemURL { get; set; }
        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        [Phone(ErrorMessage = "O {0} inserido é inválido.")]
        public string Telefone { get; set; }
        
        [Display(Name ="e-mail"),
        Required(ErrorMessage = "O campo {0} é obrigatório."),
        EmailAddress(ErrorMessage = "O {0} inserido é inválido.")]
        public string Email { get; set; }
        public IEnumerable<LoteDto>? Lotes { get; set; }
        public IEnumerable<RedeSocialDto>? RedesSociais { get; set; }
        public IEnumerable<PalestranteDto>? Palestrantes { get; set; }
    }
}