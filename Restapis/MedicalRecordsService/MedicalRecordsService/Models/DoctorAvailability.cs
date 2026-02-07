using System;
using System.Collections.Generic;

namespace MedicalRecordsService.Models;

public partial class DoctorAvailability
{
    public int DoctorId { get; set; }

    public string Day { get; set; } = null!;

    public TimeOnly AvailableFrom { get; set; }

    public TimeOnly AvailableTo { get; set; }

    public virtual Doctor Doctor { get; set; } = null!;
}
