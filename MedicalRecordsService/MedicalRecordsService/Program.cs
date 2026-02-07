using MedicalRecordsService.Models;
using MedicalRecordsService.Repositories;
using Microsoft.EntityFrameworkCore;
using Steeltoe.Discovery.Client;
using System.Text.Json.Serialization;

namespace MedicalRecordsService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // =========================
            // Controllers + JSON
            // =========================
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler =
                        ReferenceHandler.IgnoreCycles;
                });

            // =========================
            // Swagger
            // =========================
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // =========================
            // CORS (React)
            // =========================
            //builder.Services.AddCors(options =>
            //{
            //    options.AddPolicy("AllowReact", policy =>
            //    {
            //        policy.WithOrigins("http://localhost:3000")
                    
                    
            //              .AllowAnyHeader()
            //              .AllowAnyMethod();
            //    });
            //});

            // =========================
            // Database
            // =========================
            builder.Services.AddDbContext<P11CarepointdbContext>(options =>
            {
                options.UseMySql(
                    builder.Configuration.GetConnectionString("MySqlCon"),
                    ServerVersion.AutoDetect(
                        builder.Configuration.GetConnectionString("MySqlCon")
                    )
                );
            });

            // =========================
            // Repositories
            // =========================
            builder.Services.AddScoped<IRepository<Patient>, PatientRepository>();
            builder.Services.AddScoped<IRepository<Doctor>, DoctorRepository>();
            builder.Services.AddScoped<IReportRepository, ReportRepository>();
            builder.Services.AddScoped<IHistoryRepository, HistoryRepository>();
            builder.Services.AddScoped<IAdminRepository, AdminRepository>();

            // =========================
            // Eureka (Steeltoe)
            // =========================
            builder.Services.AddDiscoveryClient(builder.Configuration);

            var app = builder.Build();

            // =========================
            // Middleware
            // =========================
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseDiscoveryClient();
            // app.UseHttpsRedirection(); // intentionally disabled
            //app.UseCors("AllowReact");
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
