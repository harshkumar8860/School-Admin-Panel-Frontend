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

    const login = (email, password) => {
        const user = users.find(
            (u) =>
                u.email === email &&
                u.password === password &&
                (u.role === "ADMIN" || u.role === "TEACHER"));
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

    // useEffect(() => {
    //     const savedUser = localStorage.getItem("currentUser");
    //     if (savedUser) setCurrentUser(JSON.parse(savedUser));
    // }, []);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
            localStorage.removeItem("currentUser");
        }
    }, [currentUser]);

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
                currentUser, login, logout
            }}
        >
            {children}
        </SchoolContext.Provider>
    );
};

export const useSchool = () => useContext(SchoolContext);