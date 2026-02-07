using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MedicalRecordsService.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int AppointmentId { get; set; }

    public int? Rating { get; set; }

    public string? Comments { get; set; }

    public DateOnly FeedbackDate { get; set; }
    [JsonIgnore]
    public virtual Appointment Appointment { get; set; } = null!;

}
