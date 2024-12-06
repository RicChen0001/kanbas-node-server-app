// import express from 'express';
// import Hello from './Hello.js';
// import Lab5 from './Lab5/index.js';
// import cors from 'cors';
// // import UserRoutes from "./Kanbas/Users/routes.js";

// const app = express();
// // UserRoutes(app);


// app.use(cors());

// Lab5(app);
// Hello(app);

// app.listen(process.env.PORT || 4000, () => {
//     console.log(`Server is running on port ${process.env.PORT || 4000}`);
// });


import express from 'express';
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from './Kanbas/Users/routes.js';
import session from "express-session";
import "dotenv/config";
import CourseRoutes from './Kanbas/Courses/routes.js';
import ModuleRoutes from './Kanbas/Modules/routes.js';
import AssignmentRoutes from './Kanbas/Assignments/routes.js';
import mongoose from "mongoose";

const CONNECTION_STRING =  process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express();
const PORT = process.env.PORT || 4000;

// Exit if PORT is not set
if (!PORT) {
  console.error("PORT environment variable is not set.");
  process.exit(1);
}

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:3000",
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
  proxy: process.env.NODE_ENV !== "development",
  cookie: process.env.NODE_ENV !== "development" ? {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  } : {},
};

app.use(session(sessionOptions));
app.use(express.json());

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});