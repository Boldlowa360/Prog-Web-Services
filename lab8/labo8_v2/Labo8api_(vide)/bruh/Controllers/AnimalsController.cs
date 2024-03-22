using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bruh.Data;
using bruh.Models;
using Microsoft.DotNet.Scaffolding.Shared.Messaging;

namespace bruh.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AnimalsController : ControllerBase
    {
        
        private readonly AnimalService _service;

        public AnimalsController(AnimalService animalService)
        {
            _service = animalService;
        }

        // GET: api/Animals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Animal>>> GetAnimal()
        {
          IEnumerable<Animal>? Animals = await _service.GetAnimal();
            if (Animals == null) return StatusCode(StatusCodes.Status500InternalServerError);
            return Ok(Animals);
        }

        // GET: api/Animals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Animal>> GetAnimal(int id)
        {

            var animal = await _service.GetAnimal(id);

            if (animal == null)
            {
                return NotFound();
            }

            return animal;
        }

        // PUT: api/Animals/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnimal(int id, Animal animal)
        {
            if (id != animal.Id)
            {
                return BadRequest();
            }

            Animal? UpdatedAnimal = await _service.Edit(id, animal);

            if(UpdatedAnimal != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new { Message = "L'animal a été supprimé ou modifié.Veuillez réessayer" });
            }

            return Ok(UpdatedAnimal);
        }

        // POST: api/Animals
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Animal>> PostAnimal(Animal animal)
        {
            Animal? newAnimal = await _service.AddAnimal(animal);
            if (newAnimal == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }

            return CreatedAtAction("GetAnimal", new { id = newAnimal.Id }, newAnimal);
        }

        // DELETE: api/Animals/5
        [HttpPost("/api/destroy/{id}")]
        public async Task<IActionResult> DeleteAnimal(int id)
        {
            Animal animal = await _service.Delete(id);
            if(animal == null)
            {
                return NotFound();
            }

            return Ok(animal);
        }

        [HttpDelete("/api/destroy")]
        public async Task<IActionResult> DeleteAll()
        {
            await _service.DeleteAll();
            return Ok();
        }

        private bool AnimalExists(int id)
        {
            if (_service.GetAnimal(id) == null) return false;
            else return true;
        }
    }
}
