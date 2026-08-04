<div align="center">

# 🏠 Fixora

### AI-Powered Hostel Complaint Management System

An intelligent full-stack web application that enables students to report hostel issues while helping administrators efficiently manage and resolve complaints using AI.

<br>

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![AI](https://img.shields.io/badge/Groq-LLM-orange?style=for-the-badge)

</div>

---

# 📖 Overview

Fixora is an **AI-powered hostel complaint management platform** built to simplify complaint reporting and resolution within hostels.

Students can submit complaints along with images, while the integrated AI automatically:

- 📌 Classifies complaint categories
- ⚡ Predicts complaint priority
- 📝 Generates concise summaries

Administrators can review AI insights, update complaint status, and efficiently manage hostel maintenance.

---

# ✨ Features

| 👨‍🎓 Student | 👨‍💼 Admin | 🤖 AI |
|-------------|------------|-------|
| Secure Login | Admin Dashboard | Complaint Classification |
| Submit Complaints | View All Complaints | Priority Prediction |
| Upload Images | Search Complaints | AI Summary Generation |
| Track Status | Update Status | Intelligent Analysis |
| Complaint History | View Images | Faster Decision Making |
| Delete Complaint | Complaint Monitoring | LLM Integration |

---

# 🛠 Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | HTML5, CSS3, Bootstrap 5, JavaScript, EJS |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Authentication** | JWT, Password Hashing |
| **AI** | Groq API, LLM |
| **Tools** | Git, GitHub, Multer, dotenv |

---

# 🏗 System Architecture

```text
                Student
                   │
                   ▼
         Submit Complaint
                   │
         Upload Image + Description
                   │
                   ▼
          AI Complaint Analysis
        ┌─────────┼─────────┐
        │         │         │
        ▼         ▼         ▼
 Category   Priority   Summary
        │
        ▼
      MySQL Database
        │
        ▼
   Admin Dashboard
        │
        ▼
 Status Update & Resolution

---

# 📂 Project Structure

```text
Fixora
│
├── config/
├── controllers/
├── middleware/
├── routes/
├── utils/
├── views/
│
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/
│
├── app.js
├── package.json
├── .env
└── README.md
```

---

# 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/your-username/Fixora.git
```

### Navigate to the project

```bash
cd Fixora
```

### Install dependencies

```bash
npm install
```

### Create `.env`

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=fixora

JWT_SECRET=your_secret_key

GROQ_API_KEY=your_api_key
```

### Run the project

Development

```bash
npm run dev
```

Production

```bash
node app.js
```

---

# 🗄 Database

### Users

- Student Details
- Admin Details
- Hostel Information
- Authentication Data

### Complaints

- Title
- Description
- Category
- Priority
- Status
- Uploaded Image
- AI Summary
- AI Analysis
- Created Date

---

# 🔒 Security

- JWT Authentication
- Password Hashing
- Role-Based Access Control
- Protected Routes
- Environment Variables
- Input Validation

---

# 🌟 Key Highlights

- 🤖 AI-powered complaint analysis
- 🖼 Image-based complaint reporting
- 🔐 Secure authentication system
- 📱 Fully responsive design
- 👨‍🎓 Student dashboard
- 👨‍💼 Admin dashboard
- ⚡ Priority prediction
- 📝 AI-generated summaries

---

# 🚀 Future Enhancements

- 📧 Email Notifications
- 🔔 Real-time Updates
- 💬 AI Chatbot
- 📱 Mobile App
- 📊 Analytics Dashboard
- 🏢 Multi-Hostel Support

---

# 👩‍💻 Author

**Kalaga Dimple Sai Harikha**

🎓 B.Tech – Computer Science & Engineering

📧 Email: your-email@example.com

🔗 LinkedIn: https://linkedin.com/in/your-profile

💻 GitHub: https://github.com/your-username

---

<div align="center">

### ⭐ If you like this project, don't forget to star the repository!

Made with ❤️ using Node.js, Express.js, MySQL, and AI.

</div>
