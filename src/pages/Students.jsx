import React, { useState } from 'react'
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useSchool } from '../context/SchoolContext';

const Students = () => {
  const {classes, sections, students, setStudents} = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const [filters, setFilters] = useState({
    classId: "",
    sectionId: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    classId: "",
    sectionId: "",
    status: "ACTIVE",
  });

  const filteredSections = sections.filter(
    (sec) => Number(formData.classId) === sec.classId
  );

  const filteredStudents = students.filter((stu) => {
    if (filters.classId && stu.classId !== Number(filters.classId)) return false;
    if (filters.sectionId && stu.sectionId !== Number(filters.sectionId)) return false;
    return true;
  });

  const getClassName = (id) =>
    classes.find((c) => c.id === id)?.name || "-";

  const getSectionName = (id) =>
    sections.find((s) => s.id === id)?.name || "-";

  const openEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      classId: student.classId,
      sectionId: student.sectionId,
      status: student.status,
    })
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingStudent(null);
    setFormData({
      name: "",
      rollNumber: "",
      classId: "",
      sectionId: "",
      status: "ACTIVE",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this Student?")) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.rollNumber || !formData.classId || !formData.sectionId) {
      alert("All fields are required");
      return;
    }

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((stu) =>
          stu.id === editingStudent.id
            ? { ...stu, ...formData, classId: Number(formData.classId), sectionId: Number(formData.sectionId) }
            : stu
        )
      );
    } else {
      setStudents((prev) => [

        ...prev,
        {
          id: Date.now(),
          ...formData,
          classId: Number(formData.classId),
          sectionId: Number(formData.sectionId),
        },
      ]);
    }
    closeModal();
  };

  const columns = [
    { key: "name", label: "Student Name" },
    { key: "rollNumber", label: "Roll No" },
    { key: "className", label: "Class" },
    { key: "sectionName", label: "Section" },
    { key: "status", label: "Status" },
  ];

  const tableData = filteredStudents.map((stu) => ({
    ...stu,
    className: getClassName(stu.classId),
    sectionName: getSectionName(stu.sectionId),
  }));

  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Students</h1>
        <Button onClick={() => setModalOpen(true)}>Add Student</Button>
      </div>

      <div className='flex gap-4 mb-4'>
        <select
          className='border px-3 py-2 rounded'
          value={filters.classId}
          onChange={(e) =>
            setFilters({ classId: e.target.value, sectionId: "" })
          }
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>{cls.name}</option>
          ))}
        </select>

        <select
          className="border px-3 py-2 rounded"
          value={filters.sectionId}
          disabled={!filters.classId}
          onChange={(e) =>
            setFilters({ ...filters, sectionId: e.target.value })
          }
        >
          <option value="">All Sections</option>
          {sections
            .filter((s) => s.classId === Number(filters.classId))
            .map((sec) => (
              <option key={sec.id} value={sec.id}>{sec.name}</option>
            ))}
        </select>
      </div>

      <Table
        columns={columns}
        data={tableData}
        actions={(row) => (
          <>
            <Button variant='secondary' onClick={() => openEdit(row)}>
              Edit
            </Button>
            <Button variant='danger' onClick={() => handleDelete(row.id)}>Delete</Button>
          </>
        )}
      />

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingStudent ? "Edit Students" : "Add Students"}
      >
        <div className='space-y-4'>
          <Input
            label="Student Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <Input
            label="Roll Number"
            value={formData.rollNumber}
            onChange={(e) =>
              setFormData({ ...formData, rollNumber: e.target.value })
            }
          />

          {/* class */}
          <select
            className='border rounded px-3 py-2 w-full'
            value={formData.classId}
            onChange={(e) =>
              setFormData({
                ...formData,
                classId: e.target.value,
                sectionId: "",
              })
            }
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>

          {/* section */}
          <select
            className="border rounded px-3 py-2 w-full"
            value={formData.sectionId}
            disabled={!formData.classId}
            onChange={(e) =>
              setFormData({
                ...formData,
                sectionId: e.target.value
              })
            }
          >
            <option value="">Select Section</option>
            {filteredSections.map((sec) => (
              <option key={sec.id} value={sec.id}>{sec.name}</option>
            ))}
          </select>

          {/* Status */}
          <select
            className='border rounded px-3 py-2 w-full'
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="" disabled>Select Option</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <div className='flex justify-end gap-2'>
            <Button variant='secondary' onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Students;