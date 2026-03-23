const {
  listEnquiries: listMemoryEnquiries,
  createEnquiry: createMemoryEnquiry,
  updateEnquiry: updateMemoryEnquiry,
  deleteEnquiry: deleteMemoryEnquiry
} = require("../data/inMemoryStore");

async function listEnquiries() {
  return listMemoryEnquiries();
}

async function createEnquiry(payload) {
  return createMemoryEnquiry(payload);
}

async function updateEnquiry(id, payload) {
  return updateMemoryEnquiry(id, payload);
}

async function deleteEnquiry(id) {
  return deleteMemoryEnquiry(id);
}

module.exports = {
  listEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
};
