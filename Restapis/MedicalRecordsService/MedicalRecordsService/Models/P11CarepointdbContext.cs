using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace MedicalRecordsService.Models;

public partial class P11CarepointdbContext : DbContext
{
    public P11CarepointdbContext()
    {
    }

    public P11CarepointdbContext(DbContextOptions<P11CarepointdbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<Bill> Bills { get; set; }

    public virtual DbSet<Doctor> Doctors { get; set; }

    public virtual DbSet<DoctorAvailability> DoctorAvailabilities { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<History> Histories { get; set; }

    public virtual DbSet<Patient> Patients { get; set; }

    public virtual DbSet<Report> Reports { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Specialization> Specializations { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=p11_carepointdb", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.42-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PRIMARY");

            entity.ToTable("appointment");

            entity.HasIndex(e => new { e.DoctorId, e.AppointmentDate, e.SlotTime }, "doctor_id").IsUnique();

            entity.HasIndex(e => e.PatientId, "fk_appointment_patient");

            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.AppointmentDate).HasColumnName("appointment_date");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp")
                .HasColumnName("created_at");
            entity.Property(e => e.DoctorId).HasColumnName("doctor_id");
            entity.Property(e => e.PatientId).HasColumnName("patient_id");
            entity.Property(e => e.SlotTime)
                .HasColumnType("time")
                .HasColumnName("slot_time");
            entity.Property(e => e.Status)
                .HasColumnType("enum('SCHEDULED','COMPLETED','CANCELLED','RESCHEDULED')")
                .HasColumnName("status");

            entity.HasOne(d => d.Doctor).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.DoctorId)
                .HasConstraintName("fk_appointment_doctor");

            entity.HasOne(d => d.Patient).WithMany(p => p.Appointments)
                .HasForeignKey(d => d.PatientId)
                .HasConstraintName("fk_appointment_patient");
        });

        modelBuilder.Entity<Bill>(entity =>
        {
            entity.HasKey(e => e.BillId).HasName("PRIMARY");

            entity.ToTable("bill");

            entity.HasIndex(e => e.AppointmentId, "fk_bill_appointment");

            entity.Property(e => e.BillId).HasColumnName("bill_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.BillingDate).HasColumnName("billing_date");
            entity.Property(e => e.PaymentMode)
                .HasMaxLength(20)
                .HasColumnName("payment_mode");
            entity.Property(e => e.TotalAmount)
                .HasPrecision(10, 2)
                .HasColumnName("total_amount");
            entity.Property(e => e.TransactionId)
                .HasMaxLength(20)
                .HasColumnName("transaction_id");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Bills)
                .HasForeignKey(d => d.AppointmentId)
                .HasConstraintName("fk_bill_appointment");
        });

        modelBuilder.Entity<Doctor>(entity =>
        {
            entity.HasKey(e => e.DoctorId).HasName("PRIMARY");

            entity.ToTable("doctor");

            entity.HasIndex(e => e.SpecializationId, "fk_doctor_specialization");

            entity.HasIndex(e => e.Uid, "fk_doctor_user");

            entity.Property(e => e.DoctorId).HasColumnName("doctor_id");
            entity.Property(e => e.BaseQualification)
                .HasMaxLength(100)
                .HasColumnName("base_qualification");
            entity.Property(e => e.ConsultationFee)
                .HasPrecision(10, 2)
                .HasColumnName("consultation_fee");
            entity.Property(e => e.Experience)
                .HasComment("Years")
                .HasColumnName("experience");
            entity.Property(e => e.PostQualification)
                .HasMaxLength(100)
                .HasColumnName("post_qualification");
            entity.Property(e => e.SpecializationId).HasColumnName("specialization_id");
            entity.Property(e => e.Status)
                .HasDefaultValueSql("'INACTIVE'")
                .HasColumnType("enum('ACTIVE','INACTIVE')")
                .HasColumnName("status");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Specialization).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.SpecializationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("fk_doctor_specialization");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Doctors)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("fk_doctor_user");
        });

        modelBuilder.Entity<DoctorAvailability>(entity =>
        {
            entity.HasKey(e => new { e.DoctorId, e.Day })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("doctor_availability");

            entity.Property(e => e.DoctorId).HasColumnName("doctor_id");
            entity.Property(e => e.Day)
                .HasColumnType("enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday')")
                .HasColumnName("day");
            entity.Property(e => e.AvailableFrom)
                .HasColumnType("time")
                .HasColumnName("available_from");
            entity.Property(e => e.AvailableTo)
                .HasColumnType("time")
                .HasColumnName("available_to");

            entity.HasOne(d => d.Doctor).WithMany(p => p.DoctorAvailabilities)
                .HasForeignKey(d => d.DoctorId)
                .HasConstraintName("fk_availability_doctor");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PRIMARY");

            entity.ToTable("feedback");

            entity.HasIndex(e => e.AppointmentId, "fk_feedback_appointment");

            entity.Property(e => e.FeedbackId).HasColumnName("feedback_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.Comments)
                .HasColumnType("text")
                .HasColumnName("comments");
            entity.Property(e => e.FeedbackDate).HasColumnName("feedback_date");
            entity.Property(e => e.Rating).HasColumnName("rating");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.AppointmentId)
                .HasConstraintName("fk_feedback_appointment");
        });

        modelBuilder.Entity<History>(entity =>
        {
            entity.HasKey(e => e.HistoryId).HasName("PRIMARY");

            entity.ToTable("history");

            entity.HasIndex(e => e.PatientId, "fk_history_patient");

            entity.Property(e => e.HistoryId).HasColumnName("history_id");
            entity.Property(e => e.DiseaseName)
                .HasMaxLength(100)
                .HasColumnName("disease_name");
            entity.Property(e => e.PatientId).HasColumnName("patient_id");
            entity.Property(e => e.StartDate).HasColumnName("start_date");

            entity.HasOne(d => d.Patient).WithMany(p => p.Histories)
                .HasForeignKey(d => d.PatientId)
                .HasConstraintName("fk_history_patient");
        });

        modelBuilder.Entity<Patient>(entity =>
        {
            entity.HasKey(e => e.PatientId).HasName("PRIMARY");

            entity.ToTable("patient");

            entity.HasIndex(e => e.Uid, "fk_patient_users");

            entity.Property(e => e.PatientId).HasColumnName("patient_id");
            entity.Property(e => e.Allergy)
                .HasColumnType("text")
                .HasColumnName("allergy");
            entity.Property(e => e.BloodGroup)
                .HasMaxLength(5)
                .HasColumnName("blood_group");
            entity.Property(e => e.Disease)
                .HasMaxLength(100)
                .HasColumnName("disease");
            entity.Property(e => e.Dob).HasColumnName("dob");
            entity.Property(e => e.EmergencyContact)
                .HasMaxLength(15)
                .HasColumnName("emergency_contact");
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .HasColumnName("gender");
            entity.Property(e => e.RegistrationDate).HasColumnName("registration_date");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.UidNavigation).WithMany(p => p.Patients)
                .HasForeignKey(d => d.Uid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("fk_patient_users");
        });

        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.ReportId).HasName("PRIMARY");

            entity.ToTable("report");

            entity.HasIndex(e => e.AppointmentId, "fk_report_appointment");

            entity.Property(e => e.ReportId).HasColumnName("report_id");
            entity.Property(e => e.AppointmentId).HasColumnName("appointment_id");
            entity.Property(e => e.Diagnosis)
                .HasColumnType("text")
                .HasColumnName("diagnosis");
            entity.Property(e => e.Prescription)
                .HasColumnType("text")
                .HasColumnName("prescription");
            entity.Property(e => e.Remarks)
                .HasColumnType("text")
                .HasColumnName("remarks");
            entity.Property(e => e.ReportDate).HasColumnName("report_date");
            entity.Property(e => e.Symptoms)
                .HasColumnType("text")
                .HasColumnName("symptoms");

            entity.HasOne(d => d.Appointment).WithMany(p => p.Reports)
                .HasForeignKey(d => d.AppointmentId)
                .HasConstraintName("fk_report_appointment");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Rid).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .HasColumnName("role_name");
        });

        modelBuilder.Entity<Specialization>(entity =>
        {
            entity.HasKey(e => e.SpecializationId).HasName("PRIMARY");

            entity.ToTable("specialization");

            entity.HasIndex(e => e.SpecializationName, "specialization_name").IsUnique();

            entity.Property(e => e.SpecializationId).HasColumnName("specialization_id");
            entity.Property(e => e.SpecializationName)
                .HasMaxLength(100)
                .HasColumnName("specialization_name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Aadhaar, "adhaar").IsUnique();

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.Rid, "fk_user_role");

            entity.HasIndex(e => e.Phone, "phone").IsUnique();

            entity.HasIndex(e => e.Uname, "uname").IsUnique();

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Aadhaar)
                .HasMaxLength(12)
                .HasColumnName("aadhaar");
            entity.Property(e => e.Address)
                .HasColumnType("text")
                .HasColumnName("address");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.Firstname)
                .HasMaxLength(50)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(50)
                .HasColumnName("lastname");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .HasColumnName("phone");
            entity.Property(e => e.Rid).HasColumnName("rid");
            entity.Property(e => e.Uname)
                .HasMaxLength(50)
                .HasColumnName("uname");

            entity.HasOne(d => d.RidNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Rid)
                .HasConstraintName("fk_user_role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
