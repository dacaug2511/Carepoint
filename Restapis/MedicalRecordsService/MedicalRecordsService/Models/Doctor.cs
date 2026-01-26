using System;
using System.Collections.Generic;

namespace MedicalRecordsService.Models;

public partial class Doctor
{
    public int DoctorId { get; set; }

    public int Uid { get; set; }

    public int SpecializationId { get; set; }

    public string BaseQualification { get; set; } = null!;

    public string? PostQualification { get; set; }

    /// <summary>
    /// Years
    /// </summary>
    public int? Experience { get; set; }

    public decimal ConsultationFee { get; set; }

    public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    public virtual ICollection<DoctorAvailability> DoctorAvailabilities { get; set; } = new List<DoctorAvailability>();

    public virtual Specialization Specialization { get; set; } = null!;

    public virtual User UidNavigation { get; set; } = null!;
}
