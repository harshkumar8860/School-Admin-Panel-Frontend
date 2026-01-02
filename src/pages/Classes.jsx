import React, { useState } from "react";
import Table from "../components/ui/Table";
import Modal from "../components/ui/Modal";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

const Classes = () => {
  const [open, setOpen] = useState(false);

  const classes = [
    { name: "Class 1", capacity: 10 },
    { name: "Class 2", capacity: 12 },
    { name: "Class 3", capacity: 10 },
    { name: "Class 4", capacity: 12 },
  ]

  const columns = [
    { key: "name", label: "Class Name" },
    { key: "capacity", label: "Capacity" },
  ];

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Classes</h1>
        <Button onClick={() => setOpen(true)}>Add Class</Button>
      </div>

      <Table
        columns={columns}
        data={classes}
        actions={() => (
          <>
            <Button variant="secondary">Edit</Button>
            <Button variant="danger">Delete</Button>
          </>
        )}
      />

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Add Class">
        <div className="space-y-4">
          <Input label="Class Name" />
          <Input label="Capacity" type="number" />
          <div>
            <Button variant="secondary" onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button>Save</Button>
          </div>
          <Input />
        </div>
      </Modal >

    </div >
  );
};

export default Classes;
