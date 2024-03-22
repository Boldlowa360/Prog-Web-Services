using bruh.Models;
using Microsoft.EntityFrameworkCore;

namespace bruh.Data
{
    public class GenericService<T> where T : class
    {
        protected readonly bruhContext _context;

        public GenericService(bruhContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<T>?> GetAnimal()
        {
            if (_context.Animal == null)
            {
                return null;
            }
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T?> GetAnimal(int id)
        {
            if (_context == null)
            {
                return null;
            }
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T?> Edit(int id, T t)
        {
            if (_context == null)
            {
                return null;
            }
            _context.Entry(t).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if ((await _context.Set<T>().FindAsync(id) == null)) return null;
                else throw;
            }
            return t;
        }

        public async Task<T?> AddAnimal(T t)
        {
            if (_context.Animal == null)
            {
                return null;
            }
            _context.Set<T>().Add(t);
            await _context.SaveChangesAsync();

            return t;
        }

        public async Task<T?> Delete(int id)
        {
            if (_context.Animal == null)
            {
                return null;
            }

            T? t = await _context.Set<T>().FindAsync(id);

            if (t == null) return null;

            _context.Set<T>().Remove(t);
            await _context.SaveChangesAsync();

            return t;
        }

        
    }
}
