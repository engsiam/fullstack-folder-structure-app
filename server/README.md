# Folder Structure Viewer - Backend

APIs:
- GET  /api/tree                 -> Read full folder tree
- POST /api/folders              -> Create folder { name, parentId? }
- DELETE /api/folders/:id        -> Delete folder (Root cannot be deleted)

Seed: Root folder auto-created on first run.
