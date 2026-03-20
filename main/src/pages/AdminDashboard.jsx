import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  createProperty,
  deleteProperty,
  deleteUser,
  getEnquiries,
  getProperties,
  getUsers,
  updateProperty,
  updateUser
} from "../api";
import EnquiriesTable from "../components/admin/EnquiriesTable";
import PropertyForm from "../components/admin/PropertyForm";
import UserManagement from "../components/admin/UserManagement";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../lib/AuthContext";
import { formatCurrency, formatDate } from "../lib/utils";

const tabs = [
  { id: "properties", label: "Manage Properties" },
  { id: "enquiries", label: "View Enquiries" },
  { id: "users", label: "Manage Users" }
];

export default function AdminDashboard() {
  const { isAdmin, isReady, user } = useAuth();
  const [activeTab, setActiveTab] = useState("properties");
  const [properties, setProperties] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const [nextProperties, nextEnquiries, nextUsers] = await Promise.all([
      getProperties(),
      getEnquiries(),
      getUsers()
    ]);

    setProperties(nextProperties);
    setEnquiries(nextEnquiries);
    setUsers(nextUsers);
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

  const handlePropertySubmit = async (payload) => {
    if (editingProperty) {
      await updateProperty(editingProperty.id, payload);
      setMessage("Property updated successfully.");
    } else {
      await createProperty(payload);
      setMessage("Property created successfully.");
    }

    setEditingProperty(null);
    loadData();
  };

  const handleDeleteProperty = async (id) => {
    const confirmed = window.confirm("Delete this property listing?");
    if (!confirmed) {
      return;
    }

    await deleteProperty(id);
    setMessage("Property deleted successfully.");
    loadData();
  };

  const handleRoleChange = async (id, role) => {
    await updateUser(id, { role });
    setMessage("User role updated.");
    loadData();
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Delete this user?");
    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(id);
      setMessage("User deleted successfully.");
      loadData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Admin Dashboard"
        title="Manage listings, enquiries, and users from one control panel."
        description="Signed in as the ERP Group Company admin account."
      />

      <div className="mt-8 flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "primary" : "outline"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
        <Link
          to="/admin/leads"
          className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-gray-50"
        >
          Lead Management
        </Link>
      </div>

      {message ? (
        <p className="mt-6 rounded-lg bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700">
          {message}
        </p>
      ) : null}

      {activeTab === "properties" ? (
        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_1.1fr]">
          <div className="glass-panel rounded-xl p-8">
            <h3 className="text-3xl font-semibold text-slate-900">
              {editingProperty ? "Edit property" : "Add new property"}
            </h3>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Publish new listings or update existing inventory details.
            </p>
            <div className="mt-6">
              <PropertyForm
                initialValue={editingProperty}
                onSubmit={handlePropertySubmit}
                onCancel={editingProperty ? () => setEditingProperty(null) : undefined}
                submitLabel={editingProperty ? "Update property" : "Create property"}
              />
            </div>
          </div>

          <div className="glass-panel rounded-xl p-8">
            <h3 className="text-3xl font-semibold text-slate-900">Current inventory</h3>
            <div className="mt-6 space-y-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900">{property.title}</h4>
                      <p className="mt-1 text-sm text-gray-500">{property.location}</p>
                      <p className="mt-3 text-sm font-semibold text-orange-600">
                        {property.priceLabel || formatCurrency(property.price)}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.28em] text-orange-500">
                        Added {formatDate(property.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingProperty(property)}
                      >
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {activeTab === "enquiries" ? (
        <div className="glass-panel mt-8 rounded-xl p-8">
          <h3 className="text-3xl font-semibold text-slate-900">Customer enquiries</h3>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            Review incoming enquiries for each property and follow up quickly.
          </p>
          <div className="mt-6">
            <EnquiriesTable enquiries={enquiries} propertiesById={propertiesById} />
          </div>
        </div>
      ) : null}

      {activeTab === "users" ? (
        <div className="glass-panel mt-8 rounded-xl p-8">
          <h3 className="text-3xl font-semibold text-slate-900">Registered users</h3>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            Manage platform access and admin roles for your user base.
          </p>
          <div className="mt-6">
            <UserManagement
              users={users}
              onRoleChange={handleRoleChange}
              onDelete={handleDeleteUser}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
