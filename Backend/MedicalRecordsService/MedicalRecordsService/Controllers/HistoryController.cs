using MedicalRecordsService.Models;
using MedicalRecordsService.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace MedicalRecordsService.Controllers
{
    [Route("api/history")]
    [ApiController]
    public class HistoryController : ControllerBase
    {
        private readonly P11CarepointdbContext _context;
        private readonly IHistoryRepository _historyRepo;

        // ✅ Single constructor
        public HistoryController(
            P11CarepointdbContext context,
            IHistoryRepository historyRepo)
        {
            _context = context;
            _historyRepo = historyRepo;
        }

        [HttpGet("patient/{patientId}")]
        public IActionResult GetPatientHistory(int patientId)
        {
            var history = from patient in _context.Patients
                          join historyItem in _context.Histories
                              on patient.PatientId equals historyItem.PatientId
                          where patient.PatientId == patientId
                          select new
                          {
                              HistoryId = historyItem.HistoryId,
                              Gender = patient.Gender,
                              Dob = patient.Dob,
                              RegistrationDate = patient.RegistrationDate,
                              Allergy = patient.Allergy,
                              Disease = patient.Disease,
                              DiseaseName = historyItem.DiseaseName
                          };

            if (!history.Any())
                return NotFound("No history found for this patient.");

            return Ok(history);
        }

        [HttpPost("add")]
        public IActionResult AddHistory([FromBody] History history)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Histories.Add(history);
            _context.SaveChanges();

            return Ok(history);
        }

        [HttpGet("MedicalHistory/{patientId}")]
        public IActionResult MedicalHistory(int patientId)
        {
            var result = _historyRepo.MedicalHistory(patientId);

            if (result == null || !result.Any())
                return NotFound("No history found for this patient.");

            return Ok(result);
        }
    }
}
