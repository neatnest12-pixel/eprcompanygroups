const app = require("../app");
const { connectDatabase } = require("../config/database");
const { seedPropertiesIfNeeded } = require("../services/propertyService");

let initPromise = null;

async function ensureInitialized() {
  if (!initPromise) {
    initPromise = (async () => {
      const databaseState = await connectDatabase();

      if (databaseState.error) {
        console.warn(
          "MongoDB connection failed, starting with in-memory property storage:",
          databaseState.error.message
        );
      }

      await seedPropertiesIfNeeded();
    })();
  }

  await initPromise;
}

module.exports = async (request, response) => {
  await ensureInitialized();
  return app(request, response);
};
