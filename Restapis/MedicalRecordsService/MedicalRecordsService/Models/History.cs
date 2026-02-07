using System;
using System.Collections.Generic;

namespace MedicalRecordsService.Models;

public partial class History
{
    public int HistoryId { get; set; }

    public int PatientId { get; set; }

    public string DiseaseName { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public virtual Patient Patient { get; set; } = null!;
}
