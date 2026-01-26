using System;
using System.Collections.Generic;

namespace MedicalRecordsService.Models;

public partial class Report
{
    public int ReportId { get; set; }

    
    public int AppointmentId { get; set; }

    public string? Symptoms { get; set; }

    public string? Diagnosis { get; set; }

    public string? Prescription { get; set; }

    public string Remarks { get; set; } = null!;

    public DateOnly ReportDate { get; set; }

    public virtual Appointment? Appointment { get; set; }
}
