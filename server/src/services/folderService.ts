import mongoose from "mongoose";
import Folder, { IFolder } from "../models/Folder";

export type FolderNode = {
  _id: mongoose.Types.ObjectId;
  name: string;
  isRoot: boolean;
  children: FolderNode[];
};

// Build tree recursively
async function buildTree(parentId: mongoose.Types.ObjectId | null): Promise<FolderNode[]> {
  // Cast via unknown first to satisfy TypeScript
  const nodes = await Folder.find({ parentId }).lean().exec() as unknown as IFolder[];
  const result: FolderNode[] = [];

  for (const node of nodes) {
    const children: FolderNode[] = await buildTree(node._id);
    result.push({
      _id: node._id,
      name: node.name,
      isRoot: node.isRoot,
      children,
    });
  }

  return result;
}

// Get full tree starting from root
export const getTree = async (): Promise<FolderNode> => {
  const root = await Folder.findOne({ isRoot: true }).lean().exec() as IFolder | null;
  if (!root) throw new Error("Root missing");

  const children: FolderNode[] = await buildTree(root._id);

  return {
    _id: root._id,
    name: root.name,
    isRoot: true,
    children,
  };
};

// Create folder
export const createFolder = async (name: string, parentId?: string): Promise<IFolder> => {
  if (!name) throw new Error("Name required");

  let parent: IFolder | null = null;

  if (parentId) {
    parent = await Folder.findById(parentId).lean().exec() as IFolder | null;
    if (!parent) throw new Error("Parent not found");
  } else {
    parent = await Folder.findOne({ isRoot: true }).lean().exec() as IFolder | null;
  }

  const folderDoc = await Folder.create({
    name,
    parentId: parent?._id || null,
    isRoot: false,
  });

  return folderDoc.toObject() as IFolder;
};

// Delete subtree
async function deleteSubtree(fid: mongoose.Types.ObjectId): Promise<void> {
  const children = await Folder.find({ parentId: fid }).lean().exec() as unknown as IFolder[];
  for (const c of children) {
    await deleteSubtree(c._id);
  }
  await Folder.findByIdAndDelete(fid).exec();
}


// Delete folder by ID
export const deleteFolder = async (id: string): Promise<void> => {
  const folder = await Folder.findById(id).lean().exec() as IFolder | null;
  if (!folder) throw new Error("Folder not found");
  if (folder.isRoot) throw new Error("Root cannot be deleted");

  await deleteSubtree(folder._id);
};
