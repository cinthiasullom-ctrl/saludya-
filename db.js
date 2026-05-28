// db.js - Central Data Layer for Salud Ya application simulation
// Manages shared state in localStorage across all HTML pages

const DEFAULT_PATIENT = {
  name: "María López García",
  age: 24,
  gender: "Femenino",
  bloodType: "O+",
  email: "maria.lopez@gmail.com",
  phone: "+52 123 456 7890",
  avatar: "ML"
};

const DEFAULT_DOCTORS = [
  { id: 1, name: "Dra. Ana Martínez", spec: "Medicina General", cmp: "CMP 123456", rating: "4.9", reviews: "128", avail: "Disponible hoy", time: "8:00 AM – 5:00 PM", initials: "AM", bg: "#dce9fb", tc: "#2563eb", status: "Disponible" },
  { id: 2, name: "Dr. Carlos Rodríguez", spec: "Cardiología", cmp: "CMP 789012", rating: "4.8", reviews: "96", avail: "Disponible hoy", time: "9:00 AM – 6:00 PM", initials: "CR", bg: "#e0e8f5", tc: "#3b5fa0", status: "Disponible" },
  { id: 3, name: "Dra. Laura Sánchez", spec: "Pediatría", cmp: "CMP 345678", rating: "4.7", reviews: "78", avail: "En consulta", time: "Hoy 10:00 AM – 2:00 PM", initials: "LS", bg: "#e1f5ee", tc: "#26a269", status: "En consulta" },
  { id: 4, name: "Dr. Miguel Torres", spec: "Traumatología", cmp: "CMP 901234", rating: "4.9", reviews: "112", avail: "Disponible hoy", time: "8:00 AM – 4:00 PM", initials: "MT", bg: "#e8edf8", tc: "#4a6fa5", status: "Disponible" },
  { id: 5, name: "Dra. Sofía Herrera", spec: "Ginecología", cmp: "CMP 567890", rating: "4.6", reviews: "54", avail: "No disponible", time: "Inactivo", initials: "SH", bg: "#faeeda", tc: "#ba7517", status: "No disponible" }
];

const DEFAULT_APPOINTMENTS = [
  { id: 1, docName: "Dr. Carlos Martínez", spec: "Medicina General", date: "15 de mayo de 2026", time: "10:30 AM", status: "Confirmada", location: "Centro de Salud Central" },
  { id: 2, docName: "Dra. Ana Martínez", spec: "Medicina General", date: "21 de mayo de 2026", time: "08:00 AM", status: "Confirmada", location: "Centro de Salud Central" },
  { id: 3, docName: "Dr. Carlos Rodríguez", spec: "Cardiología", date: "21 de mayo de 2026", time: "09:30 AM", status: "Confirmada", location: "Clínica San Marcos" },
  { id: 4, docName: "Dra. Laura Sánchez", spec: "Pediatría", date: "21 de mayo de 2026", time: "11:00 AM", status: "Pendiente", location: "Centro de Salud Central" }
];

const DEFAULT_MEDICINES = [
  { id: 1, name: "Losartán 50 mg", freq: "1 tableta cada 24 horas", next: "Próxima toma: Hoy 08:00 AM", ci: 0, taken: false, time: "08:00 AM", period: "Mañana" },
  { id: 2, name: "Metformina 850 mg", freq: "1 tableta cada 12 horas", next: "Próxima toma: Hoy 02:00 PM", ci: 1, taken: false, time: "02:00 PM", period: "Tarde" },
  { id: 3, name: "Atorvastatina 20 mg", freq: "1 tableta cada 24 horas", next: "Próxima toma: Hoy 08:00 PM", ci: 2, taken: false, time: "08:00 PM", period: "Noche" }
];

const DEFAULT_PATIENTS = [
  { id: 1, name: "María González López", age: 28, gender: "Femenino", doc: "DNI 12345678", phone: "987 654 321", status: "Activo", lastAppt: "20/05/2026" },
  { id: 2, name: "Juan Pérez Ramírez", age: 35, gender: "Masculino", doc: "DNI 87654321", phone: "912 345 678", status: "Activo", lastAppt: "18/05/2026" },
  { id: 3, name: "Laura Sánchez Díaz", age: 22, gender: "Femenino", doc: "DNI 11223344", phone: "923 456 789", status: "Con cita", lastAppt: "25/05/2026 · 10:00 AM" },
  { id: 4, name: "Roberto Díaz Morales", age: 60, gender: "Masculino", doc: "DNI 33445566", phone: "934 567 890", status: "Activo", lastAppt: "10/05/2026" },
  { id: 5, name: "Carmen Herrera Ruiz", age: 55, gender: "Femenino", doc: "DNI 44556677", phone: "945 678 901", status: "Inactivo", lastAppt: "Sin citas recientes" }
];

const DEFAULT_CONFIGS = {
  clinicName: "Clínica Salud Total",
  timezone: "GMT-05:00",
  language: "Español",
  darkMode: false,
  enableTelemedicine: true,
  notificationsEnabled: true
};

// Initialization check
if (!localStorage.getItem("sy_initialized")) {
  localStorage.setItem("sy_patient", JSON.stringify(DEFAULT_PATIENT));
  localStorage.setItem("sy_doctors", JSON.stringify(DEFAULT_DOCTORS));
  localStorage.setItem("sy_appointments", JSON.stringify(DEFAULT_APPOINTMENTS));
  localStorage.setItem("sy_medicines", JSON.stringify(DEFAULT_MEDICINES));
  localStorage.setItem("sy_patients", JSON.stringify(DEFAULT_PATIENTS));
  localStorage.setItem("sy_configs", JSON.stringify(DEFAULT_CONFIGS));
  localStorage.setItem("sy_initialized", "true");
}

// Helper methods to read/write state
const SaludYaDB = {
  getPatient: () => JSON.parse(localStorage.getItem("sy_patient")),
  savePatient: (patient) => localStorage.setItem("sy_patient", JSON.stringify(patient)),
  
  getDoctors: () => JSON.parse(localStorage.getItem("sy_doctors")),
  saveDoctors: (doctors) => localStorage.setItem("sy_doctors", JSON.stringify(doctors)),
  
  getAppointments: () => JSON.parse(localStorage.getItem("sy_appointments")),
  saveAppointments: (appt) => localStorage.setItem("sy_appointments", JSON.stringify(appt)),
  
  getMedicines: () => JSON.parse(localStorage.getItem("sy_medicines")),
  saveMedicines: (meds) => localStorage.setItem("sy_medicines", JSON.stringify(meds)),
  
  getPatients: () => JSON.parse(localStorage.getItem("sy_patients")),
  savePatients: (patients) => localStorage.setItem("sy_patients", JSON.stringify(patients)),
  
  getConfigs: () => JSON.parse(localStorage.getItem("sy_configs")),
  saveConfigs: (configs) => localStorage.setItem("sy_configs", JSON.stringify(configs)),

  // Aliases used by medicamentos screen
  getMedicamentos: function(){ return this.getMedicines(); },
  setMedicamentos: function(m){ this.saveMedicines(m); },

  // Session helpers
  logout: function(){
    localStorage.removeItem("sy_loggedIn");
    localStorage.removeItem("sy_userRole");
    window.location.href = "salud_ya_welcome_screen.html";
  }
};
