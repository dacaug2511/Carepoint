using System;
using System.Collections.Generic;

namespace MedicalRecordsService.Models;

public partial class User
{
    public int Uid { get; set; }

    public int? Rid { get; set; }

    public string Uname { get; set; } = null!;

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Address { get; set; }

    public string? Aadhaar { get; set; }

    public virtual ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();

    public virtual ICollection<Patient> Patients { get; set; } = new List<Patient>();

    public virtual Role? RidNavigation { get; set; }
}
