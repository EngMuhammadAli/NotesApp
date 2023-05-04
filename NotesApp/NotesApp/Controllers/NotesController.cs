using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApp.Data;
using NotesApp.Model;

namespace NotesApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly DataContext _dataContext;
        public NotesController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _dataContext.Notes.ToListAsync());
        }

        
        [HttpPut]
        [Route("Id")]

        public async Task<IActionResult> NotesUpdate(int? Id, Notes notes)
        {
            if ( Id == null)
            {
                return BadRequest();
            }
            Notes notesdb = _dataContext.Notes.Find(Id);
            if (notesdb == null)
            {
                return NotFound();
            }
            notesdb.Title = notes.Title;
            notesdb.Description = notes.Description;
            notesdb.IsActive = notes.IsActive;
            await _dataContext.SaveChangesAsync();
            return Ok(notes);
        }
        [HttpGet("Id")]
        [ActionName("GetNoteById")]
        public async Task<IActionResult> GetNoteById(int? Id)
        {
            if (Id == 0 || Id == null)
            {
                return BadRequest();
            }
            Notes notes = _dataContext.Notes.Find(Id);
            if (notes == null)
            {
                return NotFound();
            }
            return Ok(notes);
        }

        [HttpPost]
        public async Task<IActionResult> AddNotes(Notes note)
        {
           await _dataContext.Notes.AddAsync(note);
           await _dataContext.SaveChangesAsync();
           return CreatedAtAction(nameof(GetNoteById),new {id = note.Id},note);
        }

        [HttpDelete]
        [Route("Id")]
        public async Task<IActionResult> Delete(int? Id)
        {
            if (Id == null)
            {
                return BadRequest();
            }
            Notes notes =  _dataContext.Notes.Find(Id);
            if (notes == null)
            {
                return NotFound();
            }
             _dataContext.Remove(notes);
            await _dataContext.SaveChangesAsync();
            return Ok(notes);
        }
    }
}
