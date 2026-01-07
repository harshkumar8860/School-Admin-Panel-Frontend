/* =======================
   CLASSES
======================= */
export const classes = [
  { id: 1, name: "Class 1", capacity: "10" },
  { id: 2, name: "Class 2", capacity: "10" },
  { id: 3, name: "Class 3", capacity: "10" },
  { id: 4, name: "Class 4", capacity: "10" },
  { id: 5, name: "Class 5", capacity: "10" },
];

/* =======================
   SECTIONS (2 per class)
======================= */
export const sections = [
  { id: 1, name: "A", classId: 1 },
  { id: 2, name: "B", classId: 1 },

  { id: 3, name: "A", classId: 2 },
  { id: 4, name: "B", classId: 2 },

  { id: 5, name: "A", classId: 3 },
  { id: 6, name: "B", classId: 3 },

  { id: 7, name: "A", classId: 4 },
  { id: 8, name: "B", classId: 4 },

  { id: 9, name: "A", classId: 5 },
  { id: 10, name: "B", classId: 5 },
];

/* =======================
   SUBJECTS (GLOBAL)
======================= */
export const subjects = [
  { id: 1, name: "Mathematics", code: "MATH", status: "ACTIVE" },
  { id: 2, name: "Science", code: "SCI", status: "ACTIVE" },
  { id: 3, name: "English", code: "ENG", status: "ACTIVE" },
];

/* =======================
   TEACHERS
======================= */
export const teachers = [
  { id: 1, name: "Anita Verma", email: "anita@school.com", phone: "9999999999", status: "ACTIVE" },
  { id: 2, name: "Rohit Singh", email: "rohit@school.com", phone: "8888888888", status: "ACTIVE" },
  { id: 3, name: "Sunita Sharma", email: "sunita@school.com", phone: "7777777777", status: "ACTIVE" },
];

/* =======================
   TEACHER ↔ CLASS MAP
   (who teaches which class)
======================= */
export const teacherClassMap = [
  { id: 1, teacherId: 1, classId: 1 },
  { id: 2, teacherId: 1, classId: 2 },

  { id: 3, teacherId: 2, classId: 3 },
  { id: 4, teacherId: 2, classId: 4 },

  { id: 5, teacherId: 3, classId: 5 },
];

/* =======================
   SUBJECT ASSIGNMENTS
   (subject + class + teacher)
======================= */
export const subjectAssignments = [
  // Class 1
  { id: 1, subjectId: 1, classId: 1, teacherId: 1 },
  { id: 2, subjectId: 2, classId: 1, teacherId: 1 },
  { id: 3, subjectId: 3, classId: 1, teacherId: 1 },

  // Class 2
  { id: 4, subjectId: 1, classId: 2, teacherId: 1 },
  { id: 5, subjectId: 2, classId: 2, teacherId: 1 },
  { id: 6, subjectId: 3, classId: 2, teacherId: 1 },

  // Class 3
  { id: 7, subjectId: 1, classId: 3, teacherId: 2 },
  { id: 8, subjectId: 2, classId: 3, teacherId: 2 },
  { id: 9, subjectId: 3, classId: 3, teacherId: 2 },

  // Class 4
  { id: 10, subjectId: 1, classId: 4, teacherId: 2 },
  { id: 11, subjectId: 2, classId: 4, teacherId: 2 },
  { id: 12, subjectId: 3, classId: 4, teacherId: 2 },

  // Class 5
  { id: 13, subjectId: 1, classId: 5, teacherId: 3 },
  { id: 14, subjectId: 2, classId: 5, teacherId: 3 },
  { id: 15, subjectId: 3, classId: 5, teacherId: 3 },
];

/* =======================
   STUDENTS
   5 per section
======================= */
export const students = [];
let studentId = 1;

sections.forEach((section) => {
  for (let i = 1; i <= classes.length; i++) {
    students.push({
      name: `Student ${studentId}`,
      // email: `${section.name.replace(" ", "").toLowerCase()}@student.com`,
      rollNumber: `${section.classId}${section.name}${i}`,
      classId: section.classId,
      sectionId: section.id,
      status: "ACTIVE",
      id: studentId++,
    });
  }
});

/* =======================
   USERS
   (Admin + Teachers + Students)
======================= */
export const users = [
  {
    id: 1,
    name: "Admin",
    email: "admin@school.com",
    password: "admin123",
    role: "ADMIN",
    status: "ACTIVE",
  },

  ...teachers.map((t) => ({
    id: 100 + t.id,
    name: t.name,
    email: t.email,
    password: "teacher123",
    role: "TEACHER",
    status: "ACTIVE",
  })),

  ...students.map((s) => ({
    id: 1000 + s.id,
    name: s.name,
    password: "student123",
    email: `${s.name.replace(" ", "").toLowerCase()}@student.com`,
    role: "STUDENT",
    status: "ACTIVE",
  })),
];

/* =======================
   ATTENDANCE
   (per class + section)
======================= */
export const attendance = [];

let attendanceId = 1;
sections.forEach((section) => {
  subjectAssignments
    .filter(sa => sa.classId === section.classId)
    .forEach(sa => {
      attendance.push({
        id: attendanceId++,
        date: "2026-01-01",
        classId: section.classId,
        sectionId: section.id,
        subjectId: sa.subjectId,
        records: students
          .filter(s => s.sectionId === section.id)
          .map((s) => ({
            studentId: s.id,
            status: Math.random() > 0.2 ? "PRESENT" : "ABSENT",
          })),
      });
    });
});

// sections.forEach((section) => {
//     attendance.push({
//         date: "2026-01-01",
//         classId: section.classId,
//         sectionId: section.id,
//         records: [
//             { studentId: 1, status: "PRESENT" },
//             { studentId: 2, status: "ABSENT" },
//         ],
//         id: attendanceId++,
//     });
// });

