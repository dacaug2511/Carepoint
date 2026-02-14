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
        public IEnumerable<object> MedicalHistory(int patientId)
        {
            var result = (
                from p in _context.Patients
                join u in _context.Users
                    on p.Uid equals u.Uid

                join h in _context.Histories
                    on p.PatientId equals h.PatientId into histGroup
                from h in histGroup.DefaultIfEmpty()

                join a in _context.Appointments
                    on p.PatientId equals a.PatientId into appGroup
                from a in appGroup.DefaultIfEmpty()

                join d in _context.Doctors
                    on a.DoctorId equals d.DoctorId into docGroup
                from d in docGroup.DefaultIfEmpty()

                join du in _context.Users
                    on d.Uid equals du.Uid into duGroup
                from du in duGroup.DefaultIfEmpty()

                join s in _context.Specializations
                    on d.SpecializationId equals s.SpecializationId into specGroup
                from s in specGroup.DefaultIfEmpty()

                join r in _context.Reports
                    on a.AppointmentId equals r.AppointmentId into repGroup
                from r in repGroup.DefaultIfEmpty()

                join b in _context.Bills
                    on a.AppointmentId equals b.AppointmentId into billGroup
                from b in billGroup.DefaultIfEmpty()

                join f in _context.Feedbacks
                    on a.AppointmentId equals f.AppointmentId into fbGroup
                from f in fbGroup.DefaultIfEmpty()

                where p.PatientId == patientId

                orderby a.AppointmentDate descending

                select new
                {
                    // Patient Info
                    p.PatientId,
                    PatientFirstName = u.Firstname,
                    PatientLastName = u.Lastname,
                    p.Gender,
                    p.Dob,
                    p.BloodGroup,
                    p.Allergy,
                    p.EmergencyContact,

                    // Disease History
                    DiseaseName = h != null ? h.DiseaseName : null,
                    DiseaseStartDate = h != null ? h.StartDate.ToDateTime(TimeOnly.MinValue) : (DateTime?)null,

                    // Appointment
                    a.AppointmentId,
                    AppointmentDate = a != null ? a.AppointmentDate.ToDateTime(TimeOnly.MinValue) : (DateTime?)null,
                    a.SlotTime,
                    AppointmentStatus = a != null ? a.Status : null,

                    // Doctor
                    DoctorFirstName = du != null ? du.Firstname : null,
                    DoctorLastName = du != null ? du.Lastname : null,
                    Specialization = s != null ? s.SpecializationName : null,

                    // Report
                    Symptoms = r != null ? r.Symptoms : null,
                    Diagnosis = r != null ? r.Diagnosis : null,
                    Prescription = r != null ? r.Prescription : null,
                    Remarks = r != null ? r.Remarks : null,
                    ReportDate = r != null ? r.ReportDate.ToDateTime(TimeOnly.MinValue) : (DateTime?)null,

                    // Billing
                    //ConsultationFee = b != null ? b.ConsultationFee : (decimal?)null,
                    TotalAmount = b != null ? b.TotalAmount : (decimal?)null,
                    BillingDate = b != null ? b.BillingDate.ToDateTime(TimeOnly.MinValue) : (DateTime?)null,
                    PaymentMode = b != null ? b.PaymentMode : null,
                    //TransactionId = b != null ? b.TransactionId : (int?)null,

                    // Feedback
                    Rating = f != null ? f.Rating : (int?)null,
                    Comments = f != null ? f.Comments : null,
                    FeedbackDate = f != null ? f.FeedbackDate.ToDateTime(TimeOnly.MinValue) : (DateTime?)null
                }
            );

            return result.ToList();
        }



    }
}
