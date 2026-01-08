import React, { createContext, useContext, useState, useEffect } from "react";
import * as data from "../data/schoolData";

const SchoolContext = createContext(null);

export const SchoolProvider = ({ children }) => {
    const [classes, setClasses] = useState([...data.classes]);
    const [sections, setSections] = useState([...data.sections] || []);
    const [teachers, setTeachers] = useState([...data.teachers]);
    const [students, setStudents] = useState([...data.students] || []);
    const [subjects, setSubjects] = useState([...data.subjects] || []);
    const [teacherClassMap, setTeacherClassMap] = useState([...data.teacherClassMap] || []);
    const [subjectAssignments, setSubjectAssignments] = useState([...data.subjectAssignments] || []);
    const [users, setUsers] = useState([...data.users]);
    const [attendance, setAttendance] = useState([...data.attendance]);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("currentUser")) || null
    );
    const [teacherAttendance, setTeacherAttendance] = useState([]);

    const login = (email, password) => {
        const user = users.find(
            (u) =>
                u.email === email &&
                u.password === password &&
                ["ADMIN", "TEACHER", "STUDENT"].includes(u.role)
            // (u.role === "ADMIN" || u.role === "TEACHER")
        );
        if (user) {
            setCurrentUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
            return true;
        }
        return false;
    }

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    }

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

    const today = new Date().toISOString().split("T")[0];

    const currentTeacher =
        currentUser?.role === "TEACHER"
            ? teachers.find(t => t.email === currentUser.email)
            : null;

    const currentStudent =
        currentUser?.role === "STUDENT"
            ? students.find(s => s.email === currentUser.email)
            : null;

    const studentAttendance =
        currentUser?.role === "STUDENT" &&
            currentStudent
            ? attendance.filter(
                (a) => a.studentId === currentStudent.id
            ) : [];

    const mustMarkTeacherAttendance =
        currentUser?.role === "TEACHER" &&
        currentTeacher &&
        !teacherAttendance.some(
            (a) =>
                a.teacherId === currentTeacher.id &&
                a.date === today
        );

    return (
        <SchoolContext.Provider
            value={{
                classes, setClasses,
                sections, setSections,
                teachers, setTeachers,
                students, setStudents,
                subjects, setSubjects,
                teacherClassMap, setTeacherClassMap,
                subjectAssignments, setSubjectAssignments,
                users, setUsers,
                attendance, setAttendance,
                currentUser, currentTeacher, currentStudent,
                login, logout,
                teacherAttendance, setTeacherAttendance,
                mustMarkTeacherAttendance, studentAttendance
            }}
        >
            {children}
        </SchoolContext.Provider>
    );
};

export const useSchool = () => useContext(SchoolContext);