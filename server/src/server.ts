import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import folderRoutes from "./routes/folders";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;

// Connect to MongoDB first
connectDB().then(async () => {
  // Seed root folder if missing
  const { default: Folder } = await import("./models/Folder");
  const root = await Folder.findOne({ isRoot: true });
  if (!root) {
    await Folder.create({ name: "Root", isRoot: true, parentId: null });
    console.log("🌱 Seeded Root folder");
  }

  // Register routes
  app.use("/api", folderRoutes);

  app.listen(PORT, () =>
    console.log(`📁 Folder API running on http://localhost:${PORT}`)
  );
});
