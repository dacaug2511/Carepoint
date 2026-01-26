using MedicalRecordsService.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace MedicalRecordsService.Repositories
{
    public class ReportRepository : IReportRepository
    {
        private readonly P11CarepointdbContext _context;

        public ReportRepository(P11CarepointdbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public Report AddDiagnosis(Report report)
        {
            if (report == null)
                throw new ArgumentNullException(nameof(report));

            // Load appointment from DB
            var appointment = _context.Appointments
                .FirstOrDefault(a => a.AppointmentId == report.AppointmentId);

            if (appointment == null)
                throw new Exception("Invalid AppointmentId");


            _context.Reports.Add(report);

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException ex)
            {
                throw new Exception(ex.InnerException?.Message ?? ex.Message);
            }

            return report;
        }


        public Report GetById(int id)
        {

            return _context.Reports.Find(id);
        }

        public IEnumerable<object> GetByPatientId(int patientId)
        {
            var result = from r in _context.Reports
                         join a in _context.Appointments
                            on r.AppointmentId equals a.AppointmentId
                         join p in _context.Patients
                             on a.PatientId equals p.PatientId
                         join u in _context.Users
                             on p.Uid equals u.Uid
                         where a.PatientId == patientId
                         select new
                         {
                            r.ReportId,
                            r.AppointmentId,
                            r.Symptoms,
                             r.Diagnosis,
                             r.Prescription,
                             r.Remarks,
                             r.ReportDate

                         };

            return result.ToList();
            
        }
        public IEnumerable<object> ViewDiagnosisByPatientId(int patientId)
        {
            var result = from r in _context.Reports
                         join a in _context.Appointments
                            on r.AppointmentId equals a.AppointmentId
                         join p in _context.Patients
                             on a.PatientId equals p.PatientId
                         join u in _context.Users
                             on p.Uid equals u.Uid
                         where a.PatientId == patientId
                         select new
                         {
                             PatientName = u.Firstname + " " + u.Lastname,
                             r.Symptoms,
                             r.Diagnosis,
                             r.ReportDate

                         };

            return result.ToList();
        }
        public IEnumerable<object> GenerateReportByPatientId(int patientId)
        {
            var reportDetails =
                from r in _context.Reports
                join a in _context.Appointments
                    on r.AppointmentId equals a.AppointmentId
                join p in _context.Patients
                    on a.PatientId equals p.PatientId
                join u in _context.Users
                    on p.Uid equals u.Uid
                where a.PatientId == patientId
                select new
                {
                    // Report details
                    ReportId = r.ReportId,
                    ReportDate = r.ReportDate,

                    // Patient name from USER table
                    PatientName = u.Firstname + " " + u.Lastname,

                    // Patient details
                    p.Gender,
                    p.Dob,
                    p.BloodGroup,

                    // Appointment details
                    AppointmentDate = a.AppointmentDate,
                    SlotTime = a.SlotTime,
                    Status = a.Status,

                    // Medical details
                    r.Symptoms,
                    r.Diagnosis,
                    r.Prescription,
                    r.Remarks
                };

            return reportDetails.ToList();
        }


       


    }
}
