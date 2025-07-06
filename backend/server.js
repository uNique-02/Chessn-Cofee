import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./lib/connectToMongoDB.js";
import projectRoutes from "./routes/project.route.js";
import blogRoutes from "./routes/blog.route.js";
import subscriberRoutes from "./routes/subscriber.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/subscriber", subscriberRoutes);
app.use("/api/contact", contactRoutes);

// Production: serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  connectToMongoDB();
});
