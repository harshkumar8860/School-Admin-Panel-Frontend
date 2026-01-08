import React from "react";
import { useSchool } from "../context/SchoolContext";

const StudentAttendance = () => {
	const { currentStudent, attendance } = useSchool();

	if (!currentStudent) {
		return <p className="p-4">Student record not found</p>
	};

	// collect attendance for this student
	const myAttendance = attendance.flatMap((a) =>
		a.records
			.filter((r) => r.studentId === currentStudent.id)
			.map((r) => ({
				date: a.date,
				status: r.status,
			}))
	);
	const classname = currentStudent.rollNumber.split("")[0];
	const sectionname = currentStudent.rollNumber.split("")[1];
	console.log(classname);

	console.log(myAttendance);
	console.log(currentStudent);

	if (myAttendance.length === 0) {
		return <p className="p-4">No attendance records</p>
	}

	return (
		<div>
			<h1 className="text-xl font-bold mb-4">
				My Attendance
			</h1>

			<div className="space-x-2 mb-2 font-semibold">
				<span>Class: {classname}</span>
				<span>Section: {sectionname}</span>
			</div>

			<table className="w-full border">
				<thead>
					<tr className="bg-gray-200">
						<th className="border p-2">Date</th>
						<th className="border p-2">Status</th>
					</tr>
				</thead>
				<tbody>
					{myAttendance.map((a) => (
						<tr key={a.id}>
							<td className="border p-2 text-center">{a.date}</td>
							<td className="text-center border p-2">
								<span
									className={`p-1 rounded ${a.status === "PRESENT"
										? "bg-green-500 text-white"
										: "bg-red-500 text-white"
										}`}

								>
									{a.status}
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default StudentAttendance;
