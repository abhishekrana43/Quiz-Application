# 🧠 Quiz Application

A full-stack **Quiz Application** built using **React.js, Node.js, Express.js, and MongoDB**.
Users can attempt quizzes, view scores, and track their performance.

---

## 🚀 Tech Stack

### Frontend

* React.js
* Axios
* CSS / Tailwind (if used)

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Atlas)

---

## ✨ Features

* 📝 Attempt quizzes
* 📊 View scores instantly
* 🔐 User authentication (if implemented)
* 📚 Dynamic question loading
* ⏱️ Timer-based quiz (optional)
* 📈 Performance tracking

---

## 📁 Project Structure

```
Quiz-Application/
│
├── frontend/        # React frontend
│
├── backend/         # Node + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/abhishekrana43/Quiz-Application.git
cd Quiz-Application
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGODB_URL=your_mongodb_connection_string
PORT=4000
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🌐 Environment Variables

Backend `.env`:

```
MONGODB_URL=your_mongodb_url
PORT=4000
```

---

## 📡 API Endpoints (Example)

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/questions | Get all questions |
| POST   | /api/submit    | Submit quiz       |
| GET    | /api/result    | Get result        |

---

## 🧪 Future Improvements

* 🔐 JWT Authentication
* 🧑‍🤝‍🧑 User profiles
* 📊 Leaderboard
* 📱 Responsive UI improvements
* 🎯 Category-based quizzes

---

## 🌐 Live Demo

👉 **Frontend:** https://quiz-app-frontend-9026.onrender.com/

---


## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhishek Rana**
GitHub: https://github.com/abhishekrana43

---
