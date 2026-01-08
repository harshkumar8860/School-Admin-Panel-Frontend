import React, { useState } from 'react'
import Button from '../components/ui/Button';
import { useSchool } from '../context/SchoolContext';

const Attendance = () => {
  const { classes, students, sections, teachers,
    attendance, setAttendance,
    currentUser, teacherAttendance,
    setTeacherAttendance } = useSchool();
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sessionRecords, setSessionRecords] = useState([]);

  const loadStudents = () => {
    if (!date || !classId || !sectionId) {
      alert("select date, class and section");
      return;
    }

    const existing = attendance.find(
      (a) => a.date === date &&
        a.classId === +classId &&
        a.sectionId === +sectionId
    );

    if (!existing) {
      alert("No attendance record found for this date");
      return;
    }

    const recordWithDetails = existing.records.map((r) => {
      const student = students.find(s => s.id === r.studentId);
      return {
        studentId: r.studentId,
        name: student?.name,
        rollNumber: student?.rollNumber,
        status: r.status,
      };
    });
    console.log(recordWithDetails);
    setSessionRecords(recordWithDetails);
  };

  const toggleStatus = (id) => {
    setSessionRecords((prev) =>
      prev.map((rec) =>
        rec.studentId === id
          ? {
            ...rec,
            status: rec.status === "PRESENT" ? "ABSENT" : "PRESENT",
          } : rec
      )
    );
  };

  const saveAttendance = () => {
    if (sessionRecords.length === 0) {
      alert("No students loaded");
      return;
    }

    setAttendance((prev) =>
      prev.map((a) =>
        a.date === date &&
          a.classId === +classId &&
          a.sectionId === +sectionId
          ? {
            ...a,
            records: sessionRecords.map(({ studentId, status }) => ({
              studentId,
              status,
            })),
          } : a
      )
    );
    console.log(sessionRecords);
    alert("Attendance saved successfully");
  };

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Attendance</h1>
      <div className='flex gap-4 mb-4'>
        <input
          type="date"
          className='border px-3 py-2 rounded'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select
          className='border px-3 py-2 rounded'
          value={classId}
          onChange={(e) => {
            setClassId(e.target.value);
            setSectionId("");
          }}
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          className='border px-3 py-2 rounded'
          value={sectionId}
          disabled={!classId}
          onChange={(e) => setSectionId(e.target.value)}
        >
          <option value="">Select Section</option>
          {sections
            .filter((s) => s.classId === Number(classId))
            .map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
        </select>

        <Button onClick={loadStudents}>Load Students</Button>
      </div>

      {sessionRecords.length > 0 && (
        <>
          <table className='w-full border mb-4'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='border p-2'>Roll</th>
                <th className='border p-2'>Name</th>
                <th className='border p-2'>Status</th>
              </tr>
            </thead>
            <tbody>
              {sessionRecords.map((rec) => (
                <tr key={rec.studentId}>
                  <td className='border p-2'>{rec.rollNumber}</td>
                  <td className='border p-2'>{rec.name}</td>
                  <td className='border p-2 text-center'>
                    <button
                      onClick={() => toggleStatus(rec.studentId)}
                      className={`px-3 py-2 rounded text-white hover:cursor-pointer ${rec.status === "PRESENT"
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                    >
                      {rec.status}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button onClick={saveAttendance}>Save Attendance</Button>
        </>
      )}

      {currentUser.role === "ADMIN" && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Teacher Attendance</h2>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Teacher</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {teacherAttendance.map((a) => (
                <tr key={a.id}>
                  <td className="border p-2 text-center">
                    {teachers.find((t) => t.id === a.teacherId)?.name || "-"}
                  </td>
                  <td className="border p-2 text-center">{a.date}</td>
                  <td className="border p-2 text-center">
                    <span className={`${a.status === "PRESENT" ? "bg-green-500" : "bg-red-500"} p-1 rounded`}>
                      {a.status}
                    </span>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div >
  )
}

export default Attendance;