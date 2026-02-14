
using MedicalRecordsService.Models;

namespace MedicalRecordsService.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly P11CarepointdbContext _context;

        public AdminRepository(P11CarepointdbContext context)
        {
            _context = context;
        }
        public IEnumerable<object> GetDoctorFeedbackByUsername(string username)
        {
            return
                from u in _context.Users
                join d in _context.Doctors on u.Uid equals d.Uid
                join a in _context.Appointments on d.DoctorId equals a.DoctorId
                join f in _context.Feedbacks on a.AppointmentId equals f.AppointmentId
                where u.Uname == username
                select new
                {
                    f.FeedbackId,
                    f.AppointmentId,
                    f.Rating,
                    f.Comments,
                    f.FeedbackDate,
                    DoctorName = u.Firstname + " " + u.Lastname
                };
        }

    }
}
