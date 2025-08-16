import mongoose, { Schema, Document } from "mongoose";

export interface IFolder extends Document {
  name: string;
  parentId: mongoose.Types.ObjectId | null;
  isRoot: boolean;
}

const FolderSchema = new Schema<IFolder>({
  name: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  isRoot: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IFolder>("Folder", FolderSchema);
