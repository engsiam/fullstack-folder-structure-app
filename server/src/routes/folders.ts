import { Router } from "express";
import * as folderController from '../controllers/folderController';

const router = Router();

// GET /api/tree
router.get("/tree", folderController.getTree);

// POST /api/folders { name, parentId? }
router.post("/folders", folderController.createFolder);

// DELETE /api/folders/:id
router.delete("/folders/:id", folderController.deleteFolder);

export default router;
