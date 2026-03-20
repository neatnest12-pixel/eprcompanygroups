import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  deleteAlert,
  deleteEnquiry,
  getAlerts,
  getEnquiries,
  getProperties,
  updateEnquiry
} from "../api";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../lib/AuthContext";
import { formatDate } from "../lib/utils";

export default function AdminLeads() {
  const { isAdmin, isReady, user } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [properties, setProperties] = useState([]);

  const loadData = async () => {
    const [nextAlerts, nextEnquiries, nextProperties] = await Promise.all([
      getAlerts(),
      getEnquiries(),
      getProperties()
    ]);
    setAlerts(nextAlerts);
    setEnquiries(nextEnquiries);
    setProperties(nextProperties);
  };

  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  const propertiesById = useMemo(
    () =>
      properties.reduce((accumulator, property) => {
        accumulator[property.id] = property;
        return accumulator;
      }, {}),
    [properties]
  );

  if (!isReady) {
    return null;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const markContacted = async (enquiryId) => {
    await updateEnquiry(enquiryId, {
      status: "contacted"
    });
    loadData();
  };

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Lead Management"
        title="Track enquiries and property alert subscriptions."
        description="Review inbound leads, update contact status, and manage saved property alerts from one admin page."
      />

      <div className="glass-panel mt-10 rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-slate-900">Property enquiries</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Property</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-t border-slate-200">
                  <td className="px-4 py-4 font-semibold text-slate-900">{enquiry.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{enquiry.phone}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {propertiesById[enquiry.propertyId]?.title || "Deleted property"}
                  </td>
                  <td className="max-w-xs px-4 py-4 text-sm text-gray-600 leading-relaxed">
                    {enquiry.message}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">{formatDate(enquiry.date)}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                      {enquiry.status || "new"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" variant="outline" onClick={() => markContacted(enquiry.id)}>
                        Mark contacted
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          deleteEnquiry(enquiry.id).then(loadData);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-panel mt-8 rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-slate-900">Property alerts</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Budget</th>
                <th className="px-4 py-3 font-semibold">Property type</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id} className="border-t border-slate-200">
                  <td className="px-4 py-4 text-sm text-gray-600">{alert.location}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{alert.budget}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{alert.propertyType}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {formatDate(alert.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        deleteAlert(alert.id).then(loadData);
                      }}
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
      </div>
    </section>
  );
}
