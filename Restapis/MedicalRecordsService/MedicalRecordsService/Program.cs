
using MedicalRecordsService.Models;
using MedicalRecordsService.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

namespace MedicalRecordsService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReact",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000")
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });
            builder.Services.AddControllers().AddJsonOptions(x =>
x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
            builder.Services.AddControllers();
            builder.Services.AddDbContext<P11CarepointdbContext>(options =>
            {
                options.UseMySql(
                builder.Configuration.GetConnectionString("MySqlCon"),
                ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MySqlCon"))
                );
            });


            //builder.Services.AddScoped<IRepository<Department>, DepartmentRepository>();
            builder.Services.AddScoped<IRepository<Patient>, PatientRepository>();
            builder.Services.AddScoped<IRepository<Doctor>, DoctorRepository>();
            builder.Services.AddScoped<IReportRepository, ReportRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowReact");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
