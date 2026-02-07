using System;
using System.Collections.Generic;

namespace MedicalRecordsService.Models;

public partial class Patient
{
    public int PatientId { get; set; }

    public int? Uid { get; set; }

    public string? Gender { get; set; }

    public DateOnly? Dob { get; set; }

    public DateOnly? RegistrationDate { get; set; }

    public string EmergencyContact { get; set; } = null!;

    public string? Allergy { get; set; }

    public string? Disease { get; set; }

    public string? BloodGroup { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<History> Histories { get; set; } = new List<History>();

    public virtual User? UidNavigation { get; set; }
}
