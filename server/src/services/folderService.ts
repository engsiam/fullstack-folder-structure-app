import mongoose from "mongoose";
import Folder from "../models/Folder";

async function buildTree(parentId: mongoose.Types.ObjectId | null) {
  const nodes = await Folder.find({ parentId });
  const result = [];
  for (const node of nodes) {
    const children = await buildTree(node._id);
    result.push({
      _id: node._id,
      name: node.name,
      isRoot: node.isRoot,
      children
    });
  }
  return result;
}

export const getTree = async () => {
    const root = await Folder.findOne({ isRoot: true });
    if (!root) throw new Error("Root missing");
    const children = await buildTree(root._id);
    return {
        _id: root._id,
        name: root.name,
        isRoot: true,
        children
    };
};

export const createFolder = async (name: string, parentId?: string) => {
    if (!name) throw new Error("Name required");

    let parent = null;
    if (parentId) {
        parent = await Folder.findById(parentId);
        if (!parent) throw new Error("Parent not found");
    } else {
        parent = await Folder.findOne({ isRoot: true });
    }

    const folder = await Folder.create({ name, parentId: parent?._id || null, isRoot: false });
    return folder;
};

async function deleteSubtree(fid: mongoose.Types.ObjectId) {
    const children = await Folder.find({ parentId: fid });
    for (const c of children) await deleteSubtree(c._id);
    await Folder.findByIdAndDelete(fid);
}

export const deleteFolder = async (id: string) => {
    const folder = await Folder.findById(id);
    if (!folder) throw new Error("Folder not found");
    if (folder.isRoot) throw new Error("Root cannot be deleted");
    await deleteSubtree(folder._id);
};