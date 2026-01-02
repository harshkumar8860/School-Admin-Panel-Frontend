// const Users = () => {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Users</h1>
//       <p className="text-gray-600">
//         Welcome to the Users Management Admin Panel.
//       </p>
//     </div>
//   );
// };

// export default Users;




// import React, { useState } from "react";
// import { useSchool } from "../context/SchoolContext";
// import Table from "../components/ui/Table";
// import Modal from "../components/ui/Modal";
// import Input from "../components/ui/Input";
// import Button from "../components/ui/Button";

// const Users = () => {
//   const { users, setUsers } = useSchool();
//   const [modalOpen, setModalOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: "STUDENT",
//     status: "ACTIVE",
//   });

//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "role", label: "Role" },
//     { key: "status", label: "Status" },
//   ];

//   const handleSubmit = () => {
//     if (!formData.name || !formData.email) {
//       alert("Name & email required");
//       return;
//     }

//     setUsers((prev) => [
//       ...prev,
//       { id: Date.now(), ...formData },
//     ]);

//     setModalOpen(false);
//   };

//   return (
//     <div>
//       <div className="flex justify-between mb-4">
//         <h1 className="text-2xl font-bold">Users</h1>
//         <Button onClick={() => setModalOpen(true)}>Add User</Button>
//       </div>

//       <Table columns={columns} data={users} />

//       <Modal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         title="Add User"
//       >
//         <div className="space-y-4">
//           <Input
//             label="Name"
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//           />

//           <Input
//             label="Email"
//             value={formData.email}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />

//           <select
//             className="border px-3 py-2 rounded w-full"
//             value={formData.role}
//             onChange={(e) =>
//               setFormData({ ...formData, role: e.target.value })
//             }
//           >
//             <option value="ADMIN">Admin</option>
//             <option value="TEACHER">Teacher</option>
//             <option value="STUDENT">Student</option>
//           </select>

//           <Button onClick={handleSubmit}>Save</Button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Users;



// import React from "react";
// import { users } from "../data/schoolData";
// import Table from "../components/ui/Table";
// import Button from "../components/ui/Button";

// const Users = () => {
//   const columns = [
//     { key: "name", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "role", label: "Role" },
//     { key: "status", label: "Status" },
//   ];

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Users</h1>
//         <Button>Add User</Button>
//       </div>

//       <Table
//         columns={columns}
//         data={users}
//         actions={() => (
//           <div className="flex gap-2">
//             <Button variant="secondary">Edit</Button>
//             <Button variant="danger">Disable</Button>
//           </div>
//         )}
//       />
//     </div>
//   );
// };

// export default Users;




import React, { useState } from "react";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { users as initialUsers } from "../data/schoolData";

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "STUDENT",
    status: "ACTIVE",
  });

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      role: "STUDENT",
      status: "ACTIVE",
    });
    setModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      alert("Name and Email are required");
      return;
    }

    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id ? { ...u, ...formData } : u
        )
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...formData,
        },
      ]);
    }

    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Disable this user?")) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === id ? { ...u, status: "INACTIVE" } : u
        )
      );
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={openAddModal}>Add User</Button>
      </div>

      <Table
        columns={columns}
        data={users}
        actions={(row) => (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => openEditModal(row)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(row.id)}
            >
              Disable
            </Button>
          </div>
        )}
      />

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editingUser ? "Edit User" : "Add User"}
      >
        <div className="space-y-4">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <Input
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <select
            className="border rounded px-3 py-2 w-full"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          >
            <option value="ADMIN">Admin</option>
            <option value="TEACHER">Teacher</option>
            <option value="STUDENT">Student</option>
          </select>

          <select
            className="border rounded px-3 py-2 w-full"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingUser ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Users;
