import { Mail, Phone } from "lucide-react";
import { formatDate } from "../../lib/utils";

export default function EnquiriesTable({ enquiries, propertiesById }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full overflow-hidden rounded-xl text-left">
        <thead className="bg-slate-50 text-sm text-gray-600">
          <tr>
            <th className="px-4 py-3 font-semibold">Customer</th>
            <th className="px-4 py-3 font-semibold">Property</th>
            <th className="px-4 py-3 font-semibold">Message</th>
            <th className="px-4 py-3 font-semibold">Date</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {enquiries.map((enquiry) => (
            <tr key={enquiry.id} className="border-t border-slate-100">
              <td className="px-4 py-4">
                <p className="font-semibold text-slate-900">{enquiry.name}</p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  {enquiry.email}
                </p>
                <p className="mt-1 inline-flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="h-4 w-4" />
                  {enquiry.phone}
                </p>
              </td>
              <td className="px-4 py-4 text-sm text-gray-600">
                {propertiesById[enquiry.propertyId]?.title || "Deleted property"}
              </td>
              <td className="max-w-md px-4 py-4 text-sm text-gray-600 leading-relaxed">
                {enquiry.message}
              </td>
              <td className="px-4 py-4 text-sm text-gray-500">{formatDate(enquiry.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
