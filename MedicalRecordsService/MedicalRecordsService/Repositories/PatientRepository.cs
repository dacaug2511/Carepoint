using MedicalRecordsService.Models;

namespace MedicalRecordsService.Repositories
{
    public class PatientRepository:IRepository<Patient>
    {
        public readonly P11CarepointdbContext _ComdbCtext;
        public PatientRepository(P11CarepointdbContext PatientsdbContext)
        {
            _ComdbCtext = PatientsdbContext;
        }
        public IEnumerable<Patient> GetAll()
        {
            return _ComdbCtext.Patients.ToList();
        }

        public Patient GetById(int id)
        {
            return _ComdbCtext.Patients.Find(id);
        }

        void IRepository<Patient>.Add(Patient entity)
        {
            throw new NotImplementedException();
        }

        void IRepository<Patient>.Delete(int id)
        {
            throw new NotImplementedException();
        }

        void IRepository<Patient>.Update(Patient entity)
        {
            throw new NotImplementedException();
        }
    }
}
