import { useState } from "react";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useSchool } from "../context/SchoolContext";

const Classes = () => {
  const { classes, setClasses } = useSchool();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({ name: "", capacity: "" });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // 🔁 SORT LOGIC
  const sortedClasses = [...classes].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const order = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -order;
    if (a[sortConfig.key] > b[sortConfig.key]) return order;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  // ➕ ADD / ✏️ EDIT
  const handleSubmit = () => {
    if (editingClass) {
      setClasses((prev) =>
        prev.map((cls) =>
          cls.id === editingClass.id ? { ...cls, ...formData } : cls
        )
      );
    } else {
      setClasses((prev) => [
        ...prev,
        { id: Date.now(), ...formData },
      ]);
    }

    closeModal();
  };

  // ❌ DELETE
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses((prev) => prev.filter((cls) => cls.id !== id));
    }
  };

  const openAddModal = () => {
    setEditingClass(null);
    setFormData({ name: "", capacity: "" });
    setModalOpen(true);
  };

  const openEditModal = (cls) => {
    setEditingClass(cls);
    setFormData({ name: cls.name, capacity: cls.capacity });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingClass(null);
    setFormData({ name: "", capacity: "" });
  };

  const columns = [
    {
      key: "name",
      label: (
        <button onClick={() => handleSort("name")}>
          Class Name {sortConfig.key === "name" ? "⬍" : ""}
        </button>
      ),
    },
    {
      key: "capacity",
      label: (
        <button onClick={() => handleSort("capacity")}>
          Capacity {sortConfig.key === "capacity" ? "⬍" : ""}
        </button>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Classes</h1>
        <Button onClick={openAddModal}>Add Class</Button>
      </div>d

      {/* Table */}
      <Table
        columns={columns}
        data={sortedClasses}
        actions={(row) => (
          <>
            <Button variant="secondary" onClick={() => openEditModal(row)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(row.id)}>
              Delete
            </Button>
          </>
        )}
      />

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingClass ? "Edit Class" : "Add Class"}
      >
        <div className="space-y-4">
          <Input
            label="Class Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <Input
            label="Capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) =>
              setFormData({ ...formData, capacity: e.target.value })
            }
          />
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingClass ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Classes;
