const mongoose = require("mongoose");
const { mongoUri } = require("./env");

let useInMemoryStore = false;

async function connectDatabase() {
  if (!mongoUri) {
    useInMemoryStore = true;
    return { connected: false, mode: "memory" };
  }

  try {
    await mongoose.connect(mongoUri);
    useInMemoryStore = false;
    return { connected: true, mode: "mongo" };
  } catch (error) {
    useInMemoryStore = true;
    return { connected: false, mode: "memory", error };
  }
}

function shouldUseInMemoryStore() {
  return useInMemoryStore;
}

module.exports = {
  connectDatabase,
  shouldUseInMemoryStore
};
