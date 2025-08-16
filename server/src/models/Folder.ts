import mongoose, { Document, Schema, Model } from "mongoose";

// Interface for folder in DB (include _id for lean queries)
export interface IFolder {
  _id: mongoose.Types.ObjectId; // <- needed for lean queries
  name: string;
  parentId: mongoose.Types.ObjectId | null;
  isRoot: boolean;
}


// Mongoose Document
export interface IFolderDocument extends Document {
  name: string;
  parentId: mongoose.Types.ObjectId | null;
  isRoot: boolean;
}

const FolderSchema: Schema<IFolderDocument> = new Schema({
  name: { type: String, required: true },
  parentId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  isRoot: { type: Boolean, default: false },
});

const Folder: Model<IFolderDocument> = mongoose.model<IFolderDocument>("Folder", FolderSchema);

export default Folder;
