import { useEffect, useState } from "react";
import { PROPERTY_CATEGORIES } from "../../data/seed";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

const initialForm = {
  title: "",
  description: "",
  price: "",
  category: "Apartments",
  location: "",
  size: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  facing: "",
  contactNumber: "8939427799",
  transactionType: "sale"
};

export default function PropertyForm({ initialValue, onSubmit, onCancel, submitLabel }) {
  const [formState, setFormState] = useState(initialForm);
  const [imageFiles, setImageFiles] = useState([]);

  useEffect(() => {
    if (initialValue) {
      setFormState({
        ...initialForm,
        ...initialValue,
        price: initialValue.price || "",
        size: initialValue.size || "",
        area: initialValue.area || "",
        bedrooms: initialValue.bedrooms || "",
        bathrooms: initialValue.bathrooms || ""
      });
    } else {
      setFormState(initialForm);
    }

    setImageFiles([]);
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formState,
      price: Number(formState.price || 0),
      area: Number(formState.area || 0),
      bedrooms: Number(formState.bedrooms || 0),
      bathrooms: Number(formState.bathrooms || 0),
      imageFiles,
      existingImages: initialValue?.images || []
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <Input
          placeholder="Property title"
          value={formState.title}
          onChange={(event) =>
            setFormState((current) => ({ ...current, title: event.target.value }))
          }
          required
        />
        <Input
          placeholder="Location"
          value={formState.location}
          onChange={(event) =>
            setFormState((current) => ({ ...current, location: event.target.value }))
          }
          required
        />
      </div>

      <Textarea
        placeholder="Property description"
        value={formState.description}
        onChange={(event) =>
          setFormState((current) => ({ ...current, description: event.target.value }))
        }
        required
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          type="number"
          min="0"
          placeholder="Price"
          value={formState.price}
          onChange={(event) =>
            setFormState((current) => ({ ...current, price: event.target.value }))
          }
          required
        />
        <Input
          placeholder="Size label (e.g. 650 sqft)"
          value={formState.size}
          onChange={(event) =>
            setFormState((current) => ({ ...current, size: event.target.value }))
          }
          required
        />
        <Input
          type="number"
          min="0"
          placeholder="Area in sqft"
          value={formState.area}
          onChange={(event) =>
            setFormState((current) => ({ ...current, area: event.target.value }))
          }
        />
        <Select
          value={formState.category}
          onChange={(event) =>
            setFormState((current) => ({ ...current, category: event.target.value }))
          }
        >
          {PROPERTY_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Input
          type="number"
          min="0"
          placeholder="Bedrooms"
          value={formState.bedrooms}
          onChange={(event) =>
            setFormState((current) => ({ ...current, bedrooms: event.target.value }))
          }
        />
        <Input
          type="number"
          min="0"
          placeholder="Bathrooms"
          value={formState.bathrooms}
          onChange={(event) =>
            setFormState((current) => ({ ...current, bathrooms: event.target.value }))
          }
        />
        <Input
          placeholder="Facing"
          value={formState.facing}
          onChange={(event) =>
            setFormState((current) => ({ ...current, facing: event.target.value }))
          }
        />
        <Input
          placeholder="Contact number"
          value={formState.contactNumber}
          onChange={(event) =>
            setFormState((current) => ({ ...current, contactNumber: event.target.value }))
          }
        />
      </div>

      <Select
        value={formState.transactionType}
        onChange={(event) =>
          setFormState((current) => ({
            ...current,
            transactionType: event.target.value
          }))
        }
      >
        <option value="sale">For Sale</option>
        <option value="rent">For Rent</option>
      </Select>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-900">
          Upload property images
        </label>
        <Input
          type="file"
          multiple
          accept="image/*"
          onChange={(event) => setImageFiles(Array.from(event.target.files || []))}
          required={!initialValue}
          className="h-auto py-3"
        />
        {initialValue?.images?.length ? (
          <p className="text-xs text-gray-500">
            Leave this empty to keep the current images, or upload new ones to replace them.
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button type="submit">{submitLabel}</Button>
        {onCancel ? (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  );
}
