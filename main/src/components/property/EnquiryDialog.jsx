import { useEffect, useState } from "react";
import { createEnquiry } from "../../api";
import { useAuth } from "../../lib/AuthContext";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Textarea from "../ui/Textarea";

const defaultState = {
  name: "",
  email: "",
  phone: "",
  message: "Hello, I am interested in this property listed on ERP Group Company website."
};

export default function EnquiryDialog({ property, open, onClose }) {
  const { user } = useAuth();
  const [formState, setFormState] = useState(defaultState);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFormState({
        ...defaultState,
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || ""
      });
      setSuccess("");
      setError("");
    }
  }, [open, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createEnquiry({
        ...formState,
        propertyId: property.id
      });
      setSuccess(
        "Your enquiry has been sent. The ERP Group Company team will contact you shortly."
      );
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Enquire about ${property.title}`}>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Your name"
          value={formState.name}
          onChange={(event) =>
            setFormState((current) => ({ ...current, name: event.target.value }))
          }
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={formState.email}
          onChange={(event) =>
            setFormState((current) => ({ ...current, email: event.target.value }))
          }
          required
        />
        <Input
          placeholder="Phone number"
          value={formState.phone}
          onChange={(event) =>
            setFormState((current) => ({ ...current, phone: event.target.value }))
          }
          required
        />
        <Textarea
          placeholder="Message"
          value={formState.message}
          onChange={(event) =>
            setFormState((current) => ({ ...current, message: event.target.value }))
          }
          required
        />
        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
        {success ? <p className="text-sm font-medium text-green-700">{success}</p> : null}
        <Button type="submit" className="w-full">
          Send enquiry
        </Button>
      </form>
    </Modal>
  );
}
