export const classes = [
    { id: 1, name: "class 1" },
    { id: 2, name: "class 2" },
];

export const sections = [
    { id: 1, name: "A", classId: 1 },
    { id: 2, name: "B", classId: 1 },
    { id: 3, name: "A", classId: 2 },
    { id: 4, name: "B", classId: 2 },
]

export const teachers = [
    {
        id: 1,
        name: "Anita Verma",
        email: "anita@school.com",
        phone: "9999999999",
        status: "ACTIVE",
    },
    {
        id: 2,
        name: "Rohit Singh",
        email: "rohit@school.com",
        phone: "8888888888",
        status: "ACTIVE",
    },
];

export const teacherClassMap = [
    {
        id: 1,
        teacherId: 1,
        classId: 1
    },
];

export const subjects = [
    { id: 1, name: "Mathematics", code: "MATH", status: "ACTIVE" },
    { id: 2, name: "Science", code: "SCI", status: "ACTIVE" },
    { id: 3, name: "English", code: "ENG", status: "ACTIVE" },
];

export const subjectAssignments = [
    {
        id: 1,
        subjectId: 1,
        classId: 1,
        teacherId: 1,
    },
];

export const users = [
    {
        id: 1,
        name: "Admin",
        email: "admin@school.com",
        role: "ADMIN",
        status: "ACTIVE",
    },
    {
        id: 2,
        name: "Anita Verma",
        email: "anita@school.com",
        role: "TEACHER",
        status: "ACTIVE",
    },
    {
        id: 3,
        name: "Rahul Sharma",
        email: "rahul@student.com",
        role: "STUDENT",
        status: "ACTIVE",
    },
];

export const students = [
    {
        id: 1,
        name: "Rahul Sharma",
        rollNumber: "01",
        classId: 1,
        sectionId: 1,
        status: "ACTIVE",
    },
    {
        id: 2,
        name: "Aman Gupta",
        rollNumber: "02",
        classId: 1,
        sectionId: 1,
        status: "ACTIVE",
    },
];

export const attendance = [
    {
        id: 1,
        data: "2026-01-01",
        classId: 1,
        sectionId: 1,
        records: [
            { subjectId: 1, status: "PRESENT" },
            { subjectId: 2, status: "ABSENT" },
        ],
    },
];