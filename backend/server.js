import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./lib/connectToMongoDB.js";
import projectRoutes from "./routes/project.route.js";
import blogRoutes from "./routes/blog.route.js";
import subscriberRoutes from "./routes/subscriber.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

const __dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.use("/api/contact", contactRoutes);

if (process.env.NODE_ENV === "production") {
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectToMongoDB();
});
