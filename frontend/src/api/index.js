const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AUTH_STORAGE_KEY = "erp-admin-auth";

function readAuthToken() {
  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) {
      return "";
    }

    const session = JSON.parse(rawValue);
    return session?.token || "";
  } catch (error) {
    return "";
  }
}

async function request(path, options = {}) {
  const { body, headers = {}, token, isFormData = false, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...headers
    },
    body
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong while calling the API.");
  }

  return data;
}

function appendFormData(formData, key, value) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  formData.append(key, value);
}

function createPropertyFormData(payload) {
  const formData = new FormData();

  appendFormData(formData, "title", payload.title);
  appendFormData(formData, "price", payload.price);
  appendFormData(formData, "location", payload.location);
  appendFormData(formData, "category", payload.category);
  appendFormData(formData, "size", payload.size);
  appendFormData(formData, "area", payload.area);
  appendFormData(formData, "bedrooms", payload.bedrooms);
  appendFormData(formData, "bathrooms", payload.bathrooms);
  appendFormData(formData, "description", payload.description);
  appendFormData(formData, "facing", payload.facing);
  appendFormData(formData, "transactionType", payload.transactionType);
  appendFormData(formData, "contactNumber", payload.contactNumber);
  appendFormData(
    formData,
    "existingImages",
    Array.isArray(payload.existingImages) ? payload.existingImages.join(",") : ""
  );

  if (Array.isArray(payload.imageFiles)) {
    payload.imageFiles.forEach((file) => {
      formData.append("images", file);
    });
  }

  return formData;
}

export async function loginAdmin(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

export async function getProperties() {
  return request("/properties");
}

export async function getPropertyById(id) {
  return request(`/properties/${id}`);
}

export async function createProperty(payload) {
  return request("/properties", {
    method: "POST",
    token: readAuthToken(),
    body: createPropertyFormData(payload),
    isFormData: true
  });
}

export async function updateProperty(id, payload) {
  return request(`/properties/${id}`, {
    method: "PUT",
    token: readAuthToken(),
    body: createPropertyFormData(payload),
    isFormData: true
  });
}

export async function deleteProperty(id) {
  return request(`/properties/${id}`, {
    method: "DELETE",
    token: readAuthToken()
  });
}

export async function createEnquiry() {
  throw new Error("Direct enquiry storage is not enabled. Please use the WhatsApp enquiry button.");
}

export async function getEnquiries() {
  return [];
}

export async function updateEnquiry() {
  throw new Error("Enquiry updates are not enabled in this build.");
}

export async function deleteEnquiry() {
  throw new Error("Enquiry deletion is not enabled in this build.");
}

export async function getUsers() {
  return [];
}

export async function updateUser() {
  throw new Error("User management is not enabled in this build.");
}

export async function deleteUser() {
  throw new Error("User management is not enabled in this build.");
}

export async function getAlerts() {
  return [];
}

export async function createAlert() {
  return {
    success: true
  };
}

export async function deleteAlert() {
  throw new Error("Alert deletion is not enabled in this build.");
}
