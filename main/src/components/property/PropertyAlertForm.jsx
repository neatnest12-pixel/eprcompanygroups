import { useState } from "react";
import { createAlert } from "../../api";
import { PROPERTY_CATEGORIES } from "../../data/seed";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

const initialState = {
  location: "",
  budget: "",
  propertyType: ""
};

export default function PropertyAlertForm() {
  const [formState, setFormState] = useState(initialState);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createAlert(formState);
    setMessage("Alert saved. ERP Group Company will track matching listings for you.");
    setFormState(initialState);
  };

  return (
    <div className="glass-panel mt-6 rounded-xl p-6">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-slate-900">Property alerts</h3>
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          Subscribe for fresh listings based on your budget and preferred market.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Preferred location"
          value={formState.location}
          onChange={(event) =>
            setFormState((current) => ({ ...current, location: event.target.value }))
          }
          required
        />
        <Input
          type="number"
          min="0"
          placeholder="Budget"
          value={formState.budget}
          onChange={(event) =>
            setFormState((current) => ({ ...current, budget: event.target.value }))
          }
          required
        />
        <Select
          value={formState.propertyType}
          onChange={(event) =>
            setFormState((current) => ({
              ...current,
              propertyType: event.target.value
            }))
          }
          required
        >
          <option value="">Select property type</option>
          {PROPERTY_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        {message ? <p className="text-sm font-medium text-green-700">{message}</p> : null}
        <Button type="submit" className="w-full">
          Subscribe for alerts
        </Button>
      </form>
    </div>
  );
}
