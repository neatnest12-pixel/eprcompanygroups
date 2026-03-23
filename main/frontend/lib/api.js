const DEFAULT_API_BASE = "http://localhost:5000/api";

function getApiBase() {
  return process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_BASE;
}

async function request(path, options = {}) {
  const response = await fetch(`${getApiBase()}${path}`, options);

  if (!response.ok) {
    let message = "Request failed.";
    try {
      const data = await response.json();
      message = data?.message || message;
    } catch {
      message = response.statusText || message;
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

function withAuth(token, extra = {}) {
  return {
    ...extra,
    Authorization: `Bearer ${token}`
  };
}

function buildPropertyFormData(payload = {}) {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }

    if (key === "imageFiles" && Array.isArray(value)) {
      value.forEach((file) => {
        if (file) {
          formData.append("images", file);
        }
      });
      return;
    }

    if (Array.isArray(value)) {
      formData.append(key, value.join(","));
      return;
    }

    formData.append(key, `${value}`);
  });
  return formData;
}

export async function loginUser(payload) {
  return request("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function listProperties() {
  return request("/properties", { cache: "no-store" });
}

export async function getPropertyById(id) {
  return request(`/properties/${id}`, { cache: "no-store" });
}

export async function createProperty(payload, token) {
  return request("/properties", {
    method: "POST",
    headers: withAuth(token),
    body: buildPropertyFormData(payload)
  });
}

export async function updateProperty(id, payload, token) {
  return request(`/properties/${id}`, {
    method: "PUT",
    headers: withAuth(token),
    body: buildPropertyFormData(payload)
  });
}

export async function deleteProperty(id, token) {
  return request(`/properties/${id}`, {
    method: "DELETE",
    headers: withAuth(token)
  });
}

export async function createEnquiry(payload) {
  return request("/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}

export async function listEnquiries(token) {
  return request("/enquiries", {
    headers: withAuth(token),
    cache: "no-store"
  });
}

export async function updateEnquiryStatus(id, status, token) {
  return request(`/enquiries/${id}`, {
    method: "PATCH",
    headers: {
      ...withAuth(token),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  });
}

export async function removeEnquiry(id, token) {
  return request(`/enquiries/${id}`, {
    method: "DELETE",
    headers: withAuth(token)
  });
}

export async function createSubmission(payload) {
  return request("/submissions", {
    method: "POST",
    body: buildPropertyFormData(payload)
  });
}

export async function listSubmissions(token) {
  return request("/submissions", {
    headers: withAuth(token),
    cache: "no-store"
  });
}

export async function approveSubmission(id, payload, token) {
  return request(`/submissions/${id}/approve`, {
    method: "PATCH",
    headers: {
      ...withAuth(token),
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}
