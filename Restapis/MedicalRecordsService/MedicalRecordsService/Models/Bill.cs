using System;
using System.Collections.Generic;

namespace MedicalRecordsService.Models;

public partial class Bill
{
    public int BillId { get; set; }

    public int AppointmentId { get; set; }

    public decimal ConsultationFee { get; set; }

    public decimal TotalAmount { get; set; }

    public DateOnly BillingDate { get; set; }

    public int TransactionId { get; set; }

    public string PaymentMode { get; set; } = null!;

    public virtual Appointment Appointment { get; set; } = null!;
}
