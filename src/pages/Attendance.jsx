import React, { useState } from 'react'
import Button from '../components/ui/Button';
import { useSchool } from '../context/SchoolContext';

const Attendance = () => {
  const { classes, students, sections, attendance, setAttendance } = useSchool();
  const [date, setDate] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");

  const [sessionRecords, setSessionRecords] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  // const [attendance, setAttendance] = useState([]);

  const loadStudents = () => {
    if (!date || !classId || !sectionId) {
      alert("select date, class and section");
      return;
    }

    const filtered = students
      .filter((s) =>
        s.classId === Number(classId) &&
        s.sectionId === Number(sectionId)
      )
      .map((s) => ({
        studentId: s.id,
        name: s.name,
        rollNumber: s.rollNumber,
        status: "PRESENT", // default
      }));

    setSessionRecords(filtered);
  }

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

  // const saveAttendance = () => {
  //   const payload = {
  //     date,
  //     classId: Number(classId),
  //     sectionId: Number(sectionId),
  //     records: attendance.map(({ studentId, status }) => ({
  //       studentId,
  //       status,
  //     })),
  //   };

  //   console.log("Attendance payload:", payload);
  //   alert("Attendance saved (check console)");
  // };

  const saveAttendance = () => {
    const exists = attendance.some(
      (a) =>
        a.date === date &&
        a.classId === +classId &&
        a.sectionId === +sectionId &&
        a.subjectId === +subjectId
    );

    if (exists) {
      alert("Attendance already marked for this subject & date");
      return;
    }

    setAttendance((prev) => [
      ...prev,
      {
        id: Date.now(),
        date,
        classId: +classId,
        sectionId: +sectionId,
        subjectId: +subjectId,
        records: sessionRecords.map(({ studentId, status }) => ({
          studentId,
          status,
        })),
      },
    ]);
    console.log(attendance);
    
    alert("Attendance saved");
    setSessionRecords([]);
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
                      className={`px-3 py-2 rounded text-white ${rec.status === "PRESENT"
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
    </div >
  )
}

export default Attendance;