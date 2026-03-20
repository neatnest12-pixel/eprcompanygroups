import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { createProperty, deleteProperty, getProperties, updateProperty } from "../api";
import PropertyForm from "../components/admin/PropertyForm";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../lib/AuthContext";
import { formatCurrency } from "../lib/utils";

export default function AdminDashboard() {
  const { isAdmin, isReady } = useAuth();
  const [properties, setProperties] = useState([]);
  const [editingProperty, setEditingProperty] = useState(null);
  const [message, setMessage] = useState("");

  const loadProperties = async () => {
    const nextProperties = await getProperties();
    setProperties(nextProperties);
  };

  useEffect(() => {
    if (isAdmin) {
      loadProperties();
    }
  }, [isAdmin]);

  if (!isReady) {
    return null;
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
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
    loadProperties();
  };

  const handleDeleteProperty = async (id) => {
    const confirmed = window.confirm("Delete this property listing?");
    if (!confirmed) {
      return;
    }

    await deleteProperty(id);
    setMessage("Property deleted successfully.");
    loadProperties();
  };

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Admin Dashboard"
        title="Upload and manage ERP Group Company property listings."
        description="Add listings with multiple images, update live details, and remove properties when needed."
      />

      {message ? (
        <p className="mt-6 rounded-lg bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-700">
          {message}
        </p>
      ) : null}

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_1.1fr]">
        <div className="glass-panel rounded-xl p-8">
          <h3 className="text-3xl font-semibold text-slate-900">
            {editingProperty ? "Edit property" : "Add new property"}
          </h3>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            Upload multiple images to Cloudinary and publish the listing instantly.
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
                  <div className="min-w-0 flex-1">
                    <div className="mb-3 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={property.images?.[0] || "/logo.png"}
                        alt={property.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900">{property.title}</h4>
                    <p className="mt-1 text-sm text-gray-500">{property.location}</p>
                    <p className="mt-3 text-sm font-semibold text-orange-600">
                      {formatCurrency(property.price)}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProperty(property)}
                    >
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
    </section>
  );
}
