import React from 'react'
import Button from './ui/Button'
import { useSchool } from '../context/SchoolContext'

const TeacherAttendanceModal = () => {
    const { currentUser, mustMarkTeacherAttendance, setTeacherAttendance, teachers, currentTeacher } = useSchool();
    if (currentUser?.role !== "TEACHER" || !mustMarkTeacherAttendance) {
        return null;
    }

    const today = new Date().toISOString().split("T")[0];

    const markAttendance = (status) => {
        if (!currentTeacher) {
            alert("Teacher record not found");
            return;
        }
        setTeacherAttendance((prev) => [
            ...prev,
            {
                id: Date.now(),
                teacherId: currentTeacher.id,
                date: today,
                status,
            },
        ]);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded w-100 text-center">
                <h2 className="text-xl font-bold mb-4">
                    Mark Your Attendance
                </h2>

                <p className="mb-6">
                    Date: <strong>{today}</strong>
                </p>

                <div className="flex justify-around">
                    <Button
                        variant="primary"
                        children="PRESENT"
                        onClick={() => markAttendance("PRESENT")}
                    />
                    <Button
                        variant="danger"
                        onClick={() => markAttendance("ABSENT")}
                        children="ABSENT"
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherAttendanceModal