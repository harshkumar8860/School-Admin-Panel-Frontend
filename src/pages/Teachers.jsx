import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import { useSchool } from '../context/SchoolContext';

const Teachers = () => {
  const { classes, teachers, teacherClassMap, setTeacherClassMap } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    teacherId: "",
    classId: "",
  });

  const getTeacherName = (id) =>
    teachers.find((t) => t.id === id)?.name || "-";

  const getClassName = (id) =>
    classes.find((c) => c.id === id)?.name || "-";

  const handleSubmit = () => {
    if (!formData.teacherId || !formData.classId) {
      alert("Select teacher and class");
      return;
    }

    const exists = teacherClassMap.some(
      (a) =>
        a.teacherId === Number(formData.teacherId) &&
        a.classId === Number(formData.classId)
    );

    if (exists) {
      alert("Teacher already assigned to this class");
      return;
    }

    setTeacherClassMap((prev) => [
      ...prev,
      {
        id: Date.now(),
        teacherId: Number(formData.teacherId),
        classId: Number(formData.classId),
      },
    ]);

    setModalOpen(false);
  }

  const handleDelete = (id) => {
    if (window.confirm("Remove this assignment?")) {
      setTeacherClassMap((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const columns = [
    { key: "teacherName", label: "Teacher" },
    { key: "className", label: "Class" },
  ];

  const tableData = teacherClassMap.map((a) => ({
    ...a,
    teacherName: getTeacherName(a.teacherId),
    className: getClassName(a.classId),
  }));


  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Teacher Assignment</h1>
        <Button onClick={() => setModalOpen(true)}>Assign Teacher</Button>
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
        title="Assign Teacher to Class"
      >
        <div className='space-y-4'>
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

          <select
            className='border px-3 py-2 rounded w-full'
            value={formData.classId}
            onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
          >
            <option value="">Select Class</option>
            {classes.map((c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            )))}
          </select>

          <div className='flex justify-end gap-2'>
            <Button variant='secondary' onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Assign</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Teachers;