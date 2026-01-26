using MedicalRecordsService.Models;
using Microsoft.EntityFrameworkCore;

namespace MedicalRecordsService.Repositories
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly P11CarepointdbContext _context;

        public HistoryRepository(P11CarepointdbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }



        public History GetById(int id)
        {
            return _context.Histories.Find(id);
        }
    }
}
