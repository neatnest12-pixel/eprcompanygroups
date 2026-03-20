import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createProperty } from "../api";
import PropertyForm from "../components/admin/PropertyForm";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../lib/AuthContext";

export default function AddProperty() {
  const { isAdmin, isReady } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");

  if (!isReady) {
    return null;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (payload) => {
    const property = await createProperty(payload);
    setSuccess("Property created successfully.");
    navigate(`/properties/${property.id}`);
  };

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Add Property"
        title="Create a new ERP Group Company listing."
        description="Add complete details, media, and map information before publishing the property."
      />
      <div className="glass-panel mt-10 rounded-xl p-8">
        {success ? <p className="mb-4 text-sm font-semibold text-green-700">{success}</p> : null}
        <PropertyForm submitLabel="Create property" onSubmit={handleSubmit} />
      </div>
    </section>
  );
}
