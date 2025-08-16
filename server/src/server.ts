import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import folderRoutes from "./routes/folders";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/folder-structure";

mongoose.connect(MONGO_URI).then(async () => {
  console.log("✅ MongoDB connected");
  // seed root
  const { default: Folder } = await import("./models/Folder");
  const root = await Folder.findOne({ isRoot: true });
  if (!root) {
    await Folder.create({ name: "Root", isRoot: true, parentId: null });
    console.log("🌱 Seeded Root folder");
  }
});

app.use("/api", folderRoutes);

app.listen(PORT, () => console.log(`📁 Folder API on http://localhost:${PORT}`));
