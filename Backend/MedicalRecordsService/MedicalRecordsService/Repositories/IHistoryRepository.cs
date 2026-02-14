using MedicalRecordsService.Models;

namespace MedicalRecordsService.Repositories
{
    public interface IHistoryRepository
    {
        History GetById(int PatientId);
        IEnumerable<object> MedicalHistory(int PatientId);
    }
}
