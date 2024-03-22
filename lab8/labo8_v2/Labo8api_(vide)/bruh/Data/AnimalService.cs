using bruh.Models;
using Microsoft.EntityFrameworkCore;

namespace bruh.Data
{
    public class AnimalService : GenericService<Animal>
    {
        public AnimalService(bruhContext context) : base(context) { }

        public async Task DeleteAll()
        {
            _context.Animal.RemoveRange(_context.Animal);
            await _context.SaveChangesAsync();
        }
    }
}
