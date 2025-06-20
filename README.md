# 🔐 Password‑Protected File‑Sharing App

A lightweight and secure file-sharing web application built with Express.js and MongoDB.
It allows users to upload files and generate unique shareable links, with the option to protect downloads using a password.
When a recipient accesses the link, they're prompted for the password (if set) before securely downloading the file.
Ideal for quick, private, and temporary file sharing with access control.

---

## ✨ Features

- **Single‑click upload** of any file type (stored temporarily in `/uploads`)
- **Optional password** per file using secure `bcrypt` hashing
- **Unique shareable link** generated after every upload
- **Download counter** tracked in MongoDB
- Simple, responsive UI with **EJS** templates
- Written in modern **ES Modules** and auto‑restarts in dev with **nodemon** :contentReference[oaicite:0]{index=0}

---

## 🏗 Tech Stack

| Layer          | Library / Tool |
| -------------- | -------------- |
| Web server     | [Express](https://expressjs.com/) |
| File uploads   | [multer](https://github.com/expressjs/multer) |
| Database ODM   | [Mongoose](https://mongoosejs.com/) |
| Password hash  | [bcrypt](https://github.com/kelektiv/node.bcrypt.js) |
| Templating     | [EJS](https://ejs.co/) |
| Dev workflow   | nodemon |

Dependencies are listed in **`package.json`**

---

## 📂 Project Structure

```
.
├── server.js # Main server
├── /models/File.js # Mongoose schema (not shown here)
├── /public # Static assets (CSS, JS)
├── /uploads # Uploaded files (auto‑created)
├── /views # EJS templates (index.ejs, password.ejs)
├── .env # Environment variables (never commit!)
└── package.json
```

## 📑 API Endpoints

| Method | Route       | Purpose                             | Notes                         |
| ------ | ----------- | ----------------------------------- | ----------------------------- |
| GET    | `/`         | Render upload form                  |                               |
| POST   | `/upload`   | Handle file upload & save metadata  | Multipart form (`file` field) |
| GET    | `/file/:id` | Download page or password prompt    |                               |
| POST   | `/file/:id` | Verify password, then download file |                               |

## 🛡 Security Notes
- File passwords are hashed with 10 salt rounds (bcrypt.hash(..., 10)). 
- Uploaded files are not virus‑scanned; only share with trusted users.

## 📜 License
This project is released under the MIT License—feel free to use and modify it.
