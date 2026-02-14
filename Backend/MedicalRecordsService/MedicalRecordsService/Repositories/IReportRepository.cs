using MedicalRecordsService.Models;

namespace MedicalRecordsService.Repositories
{
    public interface IReportRepository
    {
        Report AddDiagnosis(Report report);
        IEnumerable<object> ViewDiagnosisByPatientId(int patientId);
        Report GetById(int report);

        void UpdateReportByPatientId(int patientId, Report updatedReport);
        IEnumerable<object> GenerateReportByPatientId(int patientId);
        IEnumerable<object> GetByPatientId(int patientId);
    }

}
