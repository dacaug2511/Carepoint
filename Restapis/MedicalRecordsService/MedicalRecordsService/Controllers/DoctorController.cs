using MedicalRecordsService.Models;
using MedicalRecordsService.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MedicalRecordsService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        public readonly IRepository<Doctor> _repo;
        private readonly IReportRepository _reportRepo;
        public DoctorController(IRepository<Doctor> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllDoctors()
        {
            return Ok(_repo.GetAll());
        }
        [HttpGet]
        public IActionResult GetDoctor(int id)
        {
            return Ok(_repo.GetById(id));
        }
        
    }
}
