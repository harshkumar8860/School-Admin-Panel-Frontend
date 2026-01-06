import React, { lazy, useState } from 'react'
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useSchool } from '../context/SchoolContext';

const Sections = () => {
  const {classes, sections, setSections} = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [selectedClass, setSelectedClass] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    classId: "",
  });

  // Helper get class name
  const getClassName = (classId) =>
    classes.find((c) => c.id === classId)?.name || "-";


  // add/edit
  const handleSubmit = () => {
    if (!formData.name || !formData.classId) {
      alert("Section name and class are required");
      return;
    }

    if (editingSection) {
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === editingSection.id
            ? { ...sec, ...formData, classId: Number(formData.classId) }
            : sec
        )
      );
    } else {
      setSections((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: formData.name,
          classId: Number(formData.classId),
        },
      ]);
    }

    closeModal();
  }

  // delete
  const handleDelete = (id) => {
    if (window.confirm("Delete this section?")) {
      setSections((prev) => prev.filter((sec) => sec.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingSection(null);
    setFormData({ name: "", classId: "" });
    setModalOpen(true);
  }

  const openEditModal = (section) => {
    setEditingSection(section);
    setFormData({
      name: section.name,
      classId: section.classId,
    });
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
    setEditingSection(null);
    setFormData({ name: "", classId: "" });
  }

  const columns = [
    { key: "name", label: "Section Name" },
    { key: "className", label: "Class" },
  ];

  // attach className for table display
  const tableData = sections
    .filter((sec) =>
      selectedClass ? sec.classId === Number(selectedClass) : true
    )
    .map((sec) => ({
      ...sec,
      className: getClassName(sec.classId),
    }));


  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Sections</h1>
        <Button onClick={openAddModal}>Add Section</Button>
      </div>

      <div className='mb-4 flex gap=4 items-center'>
        <label className='text-sm font-medium'>Filter by Class:</label>

        <select
          className='boder rounded px-3 py-2 text-sm'
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">All Classes</option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={tableData}
        actions={(row) => (
          <>
            <Button variant='secondary' onClick={() => openEditModal(row)}>
              Edit
            </Button>
            <Button variant='danger' onClick={() => handleDelete(row.id)}>
              Delete
            </Button>
          </>
        )}
      />

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingSection ? "Edit Section" : "Add Section"}
      >
        <div className='space-y-4'>
          <Input
            label="Section Name"
            placeholder="A, B, C"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          {/* Class Dropdown */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm font-medium'>Class</label>
            <select
              className='border rounded px-3 py-2 text-sm'
              value={formData.classId}
              onChange={(e) =>
                setFormData({ ...formData, classId: e.target.value })
              }
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>

          <div className='flex justify-end gap-2'>
            <Button variant='secondary' onClick={closeModal}>Cancel</Button>
            <Button onClick={handleSubmit}>{editingSection ? "Update" : "Save"}</Button>
          </div>
        </div>
      </Modal >
    </div >
  )
}

export default Sections;