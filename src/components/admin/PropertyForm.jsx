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
  priceLabel: "",
  category: "Plots",
  location: "",
  area: "",
  bedrooms: "",
  bathrooms: "",
  images: "",
  videoUrl: "",
  amenities: "",
  mapQuery: "",
  transactionType: "sale",
  featured: false
};

export default function PropertyForm({ initialValue, onSubmit, onCancel, submitLabel }) {
  const [formState, setFormState] = useState(initialForm);

  useEffect(() => {
    if (initialValue) {
      setFormState({
        ...initialForm,
        ...initialValue,
        price: initialValue.price || "",
        area: initialValue.area || "",
        bedrooms: initialValue.bedrooms || "",
        bathrooms: initialValue.bathrooms || "",
        images: initialValue.images?.join("\n") || "",
        videoUrl: initialValue.videoUrl || "",
        amenities: initialValue.amenities?.join(", ") || ""
      });
    } else {
      setFormState(initialForm);
    }
  }, [initialValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      ...formState,
      price: Number(formState.price || 0),
      area: Number(formState.area || 0),
      bedrooms: Number(formState.bedrooms || 0),
      bathrooms: Number(formState.bathrooms || 0),
      featured: Boolean(formState.featured),
      videoUrl: formState.videoUrl?.trim() || "",
      images: formState.images
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      amenities: formState.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
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
          placeholder="Price label"
          value={formState.priceLabel}
          onChange={(event) =>
            setFormState((current) => ({ ...current, priceLabel: event.target.value }))
          }
        />
        <Input
          type="number"
          min="0"
          placeholder="Area in sqft"
          value={formState.area}
          onChange={(event) =>
            setFormState((current) => ({ ...current, area: event.target.value }))
          }
          required
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
        <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={formState.featured}
            onChange={(event) =>
              setFormState((current) => ({ ...current, featured: event.target.checked }))
            }
          />
          Mark as featured
        </label>
      </div>
      <Textarea
        placeholder="Image URLs (one per line)"
        value={formState.images}
        onChange={(event) =>
          setFormState((current) => ({ ...current, images: event.target.value }))
        }
        required
      />
      <Input
        placeholder="Video URL (YouTube or MP4)"
        value={formState.videoUrl}
        onChange={(event) =>
          setFormState((current) => ({ ...current, videoUrl: event.target.value }))
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Textarea
          placeholder="Amenities (comma separated)"
          value={formState.amenities}
          onChange={(event) =>
            setFormState((current) => ({ ...current, amenities: event.target.value }))
          }
        />
        <Textarea
          placeholder="Google Maps query"
          value={formState.mapQuery}
          onChange={(event) =>
            setFormState((current) => ({ ...current, mapQuery: event.target.value }))
          }
        />
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
