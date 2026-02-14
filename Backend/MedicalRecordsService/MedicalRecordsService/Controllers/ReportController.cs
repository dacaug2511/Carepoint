using MedicalRecordsService.Models;
using MedicalRecordsService.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ReportController : ControllerBase
{
    private readonly IReportRepository _reportRepo;

    public ReportController(IReportRepository reportRepo)
    {
        _reportRepo = reportRepo;
    }



    /*
      {
          "appointmentId": 5,
          "symptoms": "Fever, cough",
          "diagnosis": "Flu",
          "prescription": "Paracetamol",
          "remarks": "Drink fluids",
          "reportDate": "2026-01-22"
           }
    */


    [HttpPost("add-diagnosis")]
    public IActionResult AddDiagnosis([FromBody] Report report)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var result = _reportRepo.AddDiagnosis(report);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpGet("view-diagnosis/{patientId}")]
    public IActionResult ViewDiagnosis(int patientId)
    {
        var result = _reportRepo.ViewDiagnosisByPatientId(patientId);

        if (!result.Any())
            return NotFound("No history found for this patient.");

        return Ok(result);
    }

    

    [HttpGet("get-prescription")]
    public IActionResult GetPrescription(int id)
    {
        return Ok(_reportRepo.GetById(id));
    }


    [HttpGet("get-report")]
    public IActionResult GetReport(int id)
    {
        return Ok(_reportRepo.GetByPatientId(id));
    }



    [HttpGet("genrateReport/{patientId}")]
    public IActionResult GenerateReport(int patientId)
    {
        var history = _reportRepo.GenerateReportByPatientId(patientId);

        if (!history.Any())
            return NotFound("No history found for this patient.");

        return Ok(history);
    }
    [HttpPut("update/{patientId}")]
    public IActionResult Update(int patientId, [FromBody] Report report)
    {
        if (report == null)
            return BadRequest("Report data is required");

        try
        {
            _reportRepo.UpdateReportByPatientId(patientId, report);
            return Ok("Report updated successfully");
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }





}
