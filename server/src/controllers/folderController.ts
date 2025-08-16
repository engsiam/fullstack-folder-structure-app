import { Request, Response } from "express";
import * as folderService from '../services/folderService';

export const getTree = async (_req: Request, res: Response) => {
    try {
        const tree = await folderService.getTree();
        res.json(tree);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createFolder = async (req: Request, res: Response) => {
    const { name, parentId } = req.body;
    try {
        const folder = await folderService.createFolder(name, parentId);
        res.status(201).json(folder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteFolder = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await folderService.deleteFolder(id);
        res.json({ message: "Deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
