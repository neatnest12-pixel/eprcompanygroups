export const defaultEnquiry = {
  id: "",
  name: "",
  email: "",
  phone: "",
  propertyId: "",
  message: "",
  status: "new",
  date: new Date().toISOString()
};

export function normalizeEnquiry(enquiry) {
  return {
    ...defaultEnquiry,
    ...enquiry
  };
}
