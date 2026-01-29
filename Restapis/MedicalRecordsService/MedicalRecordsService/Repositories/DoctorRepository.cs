using MedicalRecordsService.Models;
using Microsoft.EntityFrameworkCore;

namespace MedicalRecordsService.Repositories
{
    public class DoctorRepository: IRepository<Doctor>
    {
        public readonly P11CarepointdbContext _ComdbCtext;
        public DoctorRepository(P11CarepointdbContext DoctorsdbContext)
        {
            _ComdbCtext = DoctorsdbContext;
        }

        public IEnumerable<Doctor> GetAll()
        {
            return _ComdbCtext.Doctors.ToList();
        }

        public Doctor GetById(int id)
        {
            return _ComdbCtext.Doctors.Find(id);
        }

        void IRepository<Doctor>.Add(Doctor entity)
        {
            throw new NotImplementedException();
        }

        void IRepository<Doctor>.Delete(int id)
        {
            throw new NotImplementedException();
        }

       

        void IRepository<Doctor>.Update(Doctor entity)
        {
            throw new NotImplementedException();
        }

        public Report AddDiagnosis(Report report)
        {
            
            var appointment = _ComdbCtext.Appointments
                                      .FirstOrDefault(a => a.AppointmentId == report.AppointmentId);

            if (appointment == null)
                throw new Exception("Invalid AppointmentId");

            report.Appointment = appointment;

            _ComdbCtext.Reports.Add(report);
            _ComdbCtext.SaveChanges();
            return report;
        }

    }
}
