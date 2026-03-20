const app = require("./app");
const { port } = require("./config/env");
const { connectDatabase } = require("./config/database");
const { seedPropertiesIfNeeded } = require("./services/propertyService");

async function startServer() {
  const databaseState = await connectDatabase();

  if (databaseState.error) {
    console.warn(
      "MongoDB connection failed, starting with in-memory property storage:",
      databaseState.error.message
    );
  }

  await seedPropertiesIfNeeded();

  app.listen(port, () => {
    console.log(
      `ERP Group backend listening on port ${port} using ${databaseState.mode} storage.`
    );
  });
}

startServer().catch((error) => {
  console.error("Failed to start backend:", error);
  process.exit(1);
});
