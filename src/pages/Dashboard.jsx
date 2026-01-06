import React from "react";
import { useSchool } from "../context/SchoolContext";

const Dashboard = () => {
  const {
    classes,
    teachers,
    students,
    users,
  } = useSchool();
  
  const stats = [
    { label: "Total Classes", value: classes.length },
    { label: "Total Teachers", value: teachers.length },
    { label: "Total Students", value: students.length },
    {
      label: "Active Users",
      value: users.filter((u) => u.status === "ACTIVE").length,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded shadow p-4 border"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded shadow border p-4">
        <h2 className="text-lg font-semibold mb-4">
          Recent Activity
        </h2>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>✔ New student Rahul Sharma added</li>
          <li>✔ Teacher Anita Verma assigned to Class 1</li>
          <li>✔ Attendance marked for Class 1-A</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
