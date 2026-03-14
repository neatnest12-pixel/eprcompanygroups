import { Trash2 } from "lucide-react";
import Button from "../ui/Button";
import Select from "../ui/Select";

export default function UserManagement({ users, onRoleChange, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-xl text-left">
        <thead className="bg-slate-50 text-sm text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Phone</th>
            <th className="px-4 py-3 font-semibold">Role</th>
            <th className="px-4 py-3 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {users.map((user) => (
            <tr key={user.id} className="border-t border-slate-100">
              <td className="px-4 py-4 font-semibold text-slate-900">{user.name}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-4 py-4 text-sm text-gray-600">{user.phone}</td>
              <td className="px-4 py-4">
                <Select
                  value={user.role}
                  onChange={(event) => onRoleChange(user.id, event.target.value)}
                  disabled={user.email === "eprcompanygroups@gmail.com"}
                  className="h-10 min-w-[140px]"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Select>
              </td>
              <td className="px-4 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(user.id)}
                  disabled={user.email === "eprcompanygroups@gmail.com"}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
