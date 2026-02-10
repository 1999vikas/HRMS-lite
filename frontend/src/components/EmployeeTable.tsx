export default function EmployeeTable({ data, onDelete }: any) {
  if (!data.length)
    return <p className="text-gray-500">No employees found.</p>;

  return (
    <table className="w-full mt-10 bg-white border rounded">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-3 text-left">ID</th>
          <th className="p-3">Name</th>
          <th className="p-3">Email</th>
          <th className="p-3">Department</th>
          <th className="p-3"></th>
        </tr>
      </thead>
      <tbody>
        {data.map((e: any) => (
          <tr key={e.id} className="border-t">
            <td className="p-3">{e.employee_id}</td>
            <td className="p-3">{e.full_name}</td>
            <td className="p-3">{e.email}</td>
            <td className="p-3">{e.department}</td>
            <td className="p-3">
              <button
                onClick={() => onDelete(e.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
