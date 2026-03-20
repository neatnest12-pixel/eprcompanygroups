import {
  createUser,
  deleteAlertFromStore,
  deleteEnquiryFromStore,
  getEnquiriesFromStore,
  getAlertsFromStore,
  getPropertiesFromStore,
  getPropertyFromStore,
  getUsersFromStore,
  removeProperty,
  saveAlert,
  saveEnquiry,
  saveProperty,
  updateEnquiryInStore,
  updateUserRecord,
  deleteUserRecord
} from "../data/storage";

function resolve(data) {
  return Promise.resolve(data);
}

export const base44Client = {
  properties: {
    list: () => resolve(getPropertiesFromStore()),
    get: (id) => resolve(getPropertyFromStore(id)),
    create: (payload) => resolve(saveProperty(payload)),
    update: (id, payload) => resolve(saveProperty({ ...payload, id })),
    delete: (id) => resolve(removeProperty(id))
  },
  enquiries: {
    list: () => resolve(getEnquiriesFromStore()),
    create: (payload) => resolve(saveEnquiry(payload)),
    update: (id, payload) => resolve(updateEnquiryInStore(id, payload)),
    delete: (id) => resolve(deleteEnquiryFromStore(id))
  },
  alerts: {
    list: () => resolve(getAlertsFromStore()),
    create: (payload) => resolve(saveAlert(payload)),
    delete: (id) => resolve(deleteAlertFromStore(id))
  },
  users: {
    list: () => resolve(getUsersFromStore()),
    create: (payload) => resolve(createUser(payload)),
    update: (id, payload) => resolve(updateUserRecord(id, payload)),
    delete: (id) => resolve(deleteUserRecord(id))
  }
};
