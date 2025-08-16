# 📂 Folder Structure Viewer (Fullstack)

A **fullstack application** to view and manage hierarchical folder structures.
Built with **React + TypeScript + styled-components** (frontend) and **Express + TypeScript + MongoDB** (backend).

## 🚀 Features

* 📑 Display nested folder structures in a tree view.
* ➕ Add new folders dynamically.
* ❌ Delete folders.
* 🌐 Backend API with MongoDB persistence.
* ⚡ Vite for fast React development.
* 🔄 Postman collection for API testing.

## 🛠️ Tech Stack

### Frontend

* React 18 + TypeScript
* styled-components
* Vite

### Backend

* Express.js + TypeScript
* MongoDB (Mongoose ODM)

## 📂 Folder Structure

```markdown
FOLDER-STRUCTURE-VIEWER/
├── client/                        
│   ├── src/                       
│   │   ├── components/            # React components
│   │   │   └── Tree.tsx           
│   │   ├── App.tsx                
│   │   ├── main.tsx               
│   │   ├── types.ts               
│   │   └── index.html             
│   ├── package.json               
│   ├── README.md                  
│   └── vite.config.ts             
│
├── server/                        
│   ├── src/                       
│   │   ├── controllers/           
│   │   │   └── folderController.ts
│   │   ├── models/                
│   │   │   └── Folder.ts          
│   │   ├── routes/                
│   │   │   └── folders.ts         
│   │   ├── services/              
│   │   │   └── folderService.ts   
│   │   └── server.ts              
│   ├── .env.example               
│   ├── folder-structure-viewer.postman.json
│   └── package.json               
│
├── .gitignore                     
├── README.md                      
```

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/folder-structure-viewer.git
cd folder-structure-viewer
```

### 2. Backend Setup

```bash
cp server/.env.example server/.env   # configure MongoDB connection string
npm --prefix server install
npm --prefix server run dev
```

Server will start at **[http://localhost:5000](http://localhost:5000)**

### 3. Frontend Setup

```bash
npm --prefix client install
npm --prefix client run dev
```

Frontend will start at **[http://localhost:5173](http://localhost:5173)**

## 📬 API Endpoints

### Folder Routes

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | `/api/folders`     | Get all folders     |
| POST   | `/api/folders`     | Create a new folder |
| DELETE | `/api/folders/:id` | Delete a folder     |

## 📑 Postman Collection

A ready-to-use Postman collection is included:
`server/folder-structure-viewer.postman.json`

Import it into Postman to test APIs.

## 📸 Screenshots

### 🌳 Folder Tree UI

![Folder Structure Viewer](https://i.ibb.co.com/fzdMhyhF/cq-Wiah-Py-RF6-V04-Jm-MJUHz-A.jpg)




# fullstack-folder-structure-app
