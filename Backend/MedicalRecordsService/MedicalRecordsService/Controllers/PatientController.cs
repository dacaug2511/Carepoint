using MedicalRecordsService.Models;
using MedicalRecordsService.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicalRecordsService.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PatientController:ControllerBase
    {
        public readonly IRepository<Patient> _repo;
        public PatientController(IRepository<Patient> repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllPatient(int id)
        {
            return Ok(_repo.GetById(id));
        }
        [HttpGet]
        public IActionResult GetPatient(int id)
        {
            return Ok(_repo.GetById(id));
        }
        //Get all Reports of a Patient
        
        
        

    }
}
