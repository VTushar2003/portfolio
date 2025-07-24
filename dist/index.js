// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  projects;
  contacts;
  currentUserId;
  currentProjectId;
  currentContactId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;
    this.initializeProjects();
  }
  initializeProjects() {
    const sampleProjects = [
      {
        title: "N8N Workflow Automation",
        description: "Advanced workflow automation platform with complex multi-step processes, API integrations, and real-time monitoring dashboard.",
        longDescription: "A comprehensive workflow automation solution built with N8N that streamlines business processes through intelligent automation. Features include complex multi-step workflows, third-party API integrations, real-time monitoring dashboard, and automated reporting systems.",
        technologies: ["N8N", "Node.js", "Docker", "PostgreSQL", "Redis"],
        features: [
          "Advanced user authentication system",
          "Real-time workflow monitoring",
          "Multi-step process automation",
          "Third-party API integrations",
          "Automated reporting dashboard"
        ],
        category: "Automation",
        status: "Live",
        liveUrl: "https://n8n-demo.example.com",
        githubUrl: "https://github.com/tusharvaghela/n8n-automation",
        videoUrl: "https://example.com/demo-video.mp4",
        imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true
      },
      {
        title: "MERN E-Commerce Platform",
        description: "Complete e-commerce solution with payment processing, inventory management, and advanced analytics dashboard.",
        longDescription: "A full-featured e-commerce platform built with the MERN stack, featuring secure payment processing, comprehensive inventory management, customer relationship management, and detailed analytics dashboard with real-time reporting.",
        technologies: ["React", "Node.js", "MongoDB", "Express.js", "Stripe", "JWT"],
        features: [
          "Secure payment processing with Stripe",
          "Advanced inventory management",
          "Customer relationship management",
          "Real-time analytics dashboard",
          "Mobile-responsive design"
        ],
        category: "Full Stack",
        status: "Live",
        liveUrl: "https://ecommerce-demo.example.com",
        githubUrl: "https://github.com/tusharvaghela/mern-ecommerce",
        videoUrl: "https://example.com/ecommerce-demo.mp4",
        imageUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true
      },
      {
        title: "React Native Fitness App",
        description: "Cross-platform fitness tracking application with AI-powered workout recommendations and social features.",
        longDescription: "A comprehensive fitness tracking mobile application built with React Native and Expo. Features AI-powered workout recommendations, social networking capabilities, progress tracking, and integration with wearable devices.",
        technologies: ["React Native", "Expo", "Firebase", "TensorFlow", "Node.js"],
        features: [
          "AI-powered workout recommendations",
          "Social networking features",
          "Progress tracking and analytics",
          "Wearable device integration",
          "Cross-platform compatibility"
        ],
        category: "Mobile",
        status: "In Progress",
        liveUrl: "https://fitness-app.example.com",
        githubUrl: "https://github.com/tusharvaghela/fitness-app",
        videoUrl: "https://example.com/fitness-demo.mp4",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        featured: true
      }
    ];
    sampleProjects.forEach((project) => {
      this.createProject(project);
    });
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async getProjects() {
    return Array.from(this.projects.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }
  async getFeaturedProjects() {
    return Array.from(this.projects.values()).filter((project) => project.featured).sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }
  async getProject(id) {
    return this.projects.get(id);
  }
  async createProject(insertProject) {
    const id = this.currentProjectId++;
    const project = {
      ...insertProject,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      longDescription: insertProject.longDescription || null,
      features: insertProject.features || null,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      videoUrl: insertProject.videoUrl || null,
      imageUrl: insertProject.imageUrl || null,
      featured: insertProject.featured || false
    };
    this.projects.set(id, project);
    return project;
  }
  async updateProject(id, updateData) {
    const project = this.projects.get(id);
    if (!project) return void 0;
    const updatedProject = { ...project, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }
  async deleteProject(id) {
    return this.projects.delete(id);
  }
  async getContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }
  async createContact(insertContact) {
    const id = this.currentContactId++;
    const contact = {
      ...insertContact,
      id,
      status: "new",
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  async updateContactStatus(id, status) {
    const contact = this.contacts.get(id);
    if (!contact) return void 0;
    const updatedContact = { ...contact, status };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  technologies: text("technologies").array().notNull(),
  features: text("features").array(),
  category: text("category").notNull(),
  status: text("status").notNull(),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  videoUrl: text("video_url"),
  imageUrl: text("image_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  message: text("message").notNull(),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  status: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects2 = await storage.getProjects();
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  app2.get("/api/projects/featured", async (req, res) => {
    try {
      const projects2 = await storage.getFeaturedProjects();
      res.json(projects2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured projects" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });
  app2.post("/api/projects", async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create project" });
    }
  });
  app2.put("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, updateData);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid project data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update project" });
    }
  });
  app2.delete("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteProject(id);
      if (!deleted) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getContacts();
      res.json(contacts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact" });
    }
  });
  app2.put("/api/contacts/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      const contact = await storage.updateContactStatus(id, status);
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: "Failed to update contact status" });
    }
  });
  app2.get("/api/stats", async (req, res) => {
    try {
      const projects2 = await storage.getProjects();
      const contacts2 = await storage.getContacts();
      const newMessages = contacts2.filter((c) => c.status === "new").length;
      res.json({
        totalProjects: projects2.length,
        views: 1247,
        // This would come from analytics in a real app
        messages: newMessages
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
async function vite_config_default() {
  const cartographerPlugin = process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [(await import("@replit/vite-plugin-cartographer")).cartographer()] : [];
  return defineConfig({
    plugins: [
      react(),
      runtimeErrorOverlay(),
      ...cartographerPlugin
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets")
      }
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"]
      }
    }
  });
}

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "6000", 10);
  server.listen({
    port,
    host: "0.0.0.0"
  }, () => {
    log(`serving on port ${port}`);
  });
})();
