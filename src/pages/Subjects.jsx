import React, { useState } from 'react'
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { useSchool } from '../context/SchoolContext';

const Subjects = () => {
  const {classes, teachers, subjects, subjectAssignments, setSubjectAssignments} = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subjectId: "",
    classId: "",
    teacherId: "",
  });

  const getName = (list, id) =>
    list.find((i) => i.id === id)?.name || "-";

  const handleSubmit = () => {
    const { subjectId, classId, teacherId } = formData;

    if (!subjectId || !classId || !teacherId) {
      alert("All fields required");
      return;
    }

    const exists = subjectAssignments.some(
      (a) =>
        a.subjectId === Number(subjectId) &&
        a.classId === Number(classId)
    );

    if (exists) {
      alert("Subject already assigned to this class");
      return;
    }

    setSubjectAssignments((prev) => [
      ...prev,
      {
        id: Date.now(),
        subjectId: Number(subjectId),
        classId: Number(classId),
        teacherId: Number(teacherId),
      }
    ]);

    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove assignment?")) {
      setSubjectAssignments((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const columns = [
    { key: "subject", label: "Subject" },
    { key: "class", label: "Class" },
    { key: "teacher", label: "Teacher" },
  ];

  const tableData = subjectAssignments.map((a) => ({
    ...a,
    subject: getName(subjects, a.subjectId),
    class: getName(classes, a.classId),
    teacher: getName(teachers, a.teacherId),
  }));

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Subjects Assignment</h1>
        <Button onClick={() => setModalOpen(true)}>Assign Subject</Button>
      </div>

      <Table
        columns={columns}
        data={tableData}
        actions={(row) => (
          <Button variant='danger' onClick={() => handleDelete(row.id)}>
            Remove
          </Button>
        )}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Assign Subject"
      >
        <div className='space-y-4'>
          <select
            className='border px-3 py-2 rounded w-full'
            value={formData.subjectId}
            onChange={(e) =>
              setFormData({ ...formData, subjectId: e.target.value })
            }
          >
            <option value="">Select Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            className='border px-3 py-2 rounded w-full'
            value={formData.classId}
            onChange={(e) =>
              setFormData({ ...formData, classId: e.target.value })
            }
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            className='border px-3 py-2 rounded w-full'
            value={formData.teacherId}
            onChange={(e) =>
              setFormData({ ...formData, teacherId: e.target.value })
            }
          >
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <div>
            <Button variant='secondary' onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Assign</Button>
          </div>
        </div>

      </Modal>

    </div>

  )
}

export default Subjects;