using MedicalRecordsService.Models;
using MedicalRecordsService.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MedicalRecordsService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepo;

        public AdminController(IAdminRepository adminRepo)
        {
            _adminRepo = adminRepo;
        }

        [HttpGet("doctor-feedback/{username}")]
        public IActionResult GetDoctorFeedback(string username)
        {
            var feedbacks = _adminRepo.GetDoctorFeedbackByUsername(username);

            if (feedbacks == null || !feedbacks.Any())
                return NotFound("No feedback found for this doctor");

            return Ok(feedbacks);
        }

    }
}
