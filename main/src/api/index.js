import { base44Client } from "./base44Client";

export async function getProperties() {
  return base44Client.properties.list();
}

export async function getPropertyById(id) {
  return base44Client.properties.get(id);
}

export async function createProperty(payload) {
  return base44Client.properties.create(payload);
}

export async function updateProperty(id, payload) {
  return base44Client.properties.update(id, payload);
}

export async function deleteProperty(id) {
  return base44Client.properties.delete(id);
}

export async function createEnquiry(payload) {
  return base44Client.enquiries.create(payload);
}

export async function getEnquiries() {
  return base44Client.enquiries.list();
}

export async function updateEnquiry(id, payload) {
  return base44Client.enquiries.update(id, payload);
}

export async function deleteEnquiry(id) {
  return base44Client.enquiries.delete(id);
}

export async function getUsers() {
  return base44Client.users.list();
}

export async function updateUser(id, payload) {
  return base44Client.users.update(id, payload);
}

export async function deleteUser(id) {
  return base44Client.users.delete(id);
}

export async function getAlerts() {
  return base44Client.alerts.list();
}

export async function createAlert(payload) {
  return base44Client.alerts.create(payload);
}

export async function deleteAlert(id) {
  return base44Client.alerts.delete(id);
}
