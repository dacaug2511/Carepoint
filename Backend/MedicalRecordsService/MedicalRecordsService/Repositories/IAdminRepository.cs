using MedicalRecordsService.Models;
namespace MedicalRecordsService.Repositories
{
    public interface IAdminRepository
    {
        IEnumerable<object> GetDoctorFeedbackByUsername(string username);

    }
}
