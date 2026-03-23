const {
  listSubmissions: listMemorySubmissions,
  createSubmission: createMemorySubmission,
  updateSubmission: updateMemorySubmission
} = require("../data/inMemoryStore");

async function listSubmissions() {
  return listMemorySubmissions();
}

async function createSubmission(payload) {
  return createMemorySubmission(payload);
}

async function updateSubmission(id, payload) {
  return updateMemorySubmission(id, payload);
}

module.exports = {
  listSubmissions,
  createSubmission,
  updateSubmission
};
