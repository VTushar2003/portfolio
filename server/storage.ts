import { users, projects, contacts, type User, type InsertUser, type Project, type InsertProject, type Contact, type InsertContact } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: number, status: string): Promise<Contact | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contacts: Map<number, Contact>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contacts = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentContactId = 1;
    
    // Initialize with sample projects
    this.initializeProjects();
  }

  private initializeProjects() {
    const sampleProjects: InsertProject[] = [
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
        featured: true,
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
        featured: true,
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
        featured: true,
      },
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      ...insertProject,
      id,
      createdAt: new Date(),
      longDescription: insertProject.longDescription || null,
      features: insertProject.features || null,
      liveUrl: insertProject.liveUrl || null,
      githubUrl: insertProject.githubUrl || null,
      videoUrl: insertProject.videoUrl || null,
      imageUrl: insertProject.imageUrl || null,
      featured: insertProject.featured || false,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...updateData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      status: "new",
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (!contact) return undefined;
    
    const updatedContact = { ...contact, status };
    this.contacts.set(id, updatedContact);
    return updatedContact;
  }
}

export const storage = new MemStorage();
