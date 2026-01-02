export const classes = [
    { id: 1, name: "class 1" },
    { id: 1, name: "class 2" },
];

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
