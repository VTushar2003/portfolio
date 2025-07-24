# replit.md

## Overview

This is a full-stack professional portfolio application for Tushar Vaghela, a full-stack engineer. The application showcases projects, skills, and provides a contact system with a futuristic, tech-inspired design. The portfolio is built using a modern tech stack with React frontend, Express backend, and PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client, server, and shared code:

- **Frontend**: React with TypeScript, styled using Tailwind CSS and shadcn/ui components
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for database operations
- **Shared**: Common schemas and types shared between frontend and backend
- **Build System**: Vite for frontend bundling, esbuild for backend bundling

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library based on Radix UI primitives
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Theme**: Dark mode with neon cyan, purple, and blue accent colors for futuristic aesthetic

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Basic session handling with connect-pg-simple
- **API Design**: RESTful API with proper error handling and logging

### Database Schema
The application uses three main tables:
1. **users**: Basic user authentication (id, username, password)
2. **projects**: Portfolio projects with rich metadata (title, description, technologies, features, category, status, URLs, etc.)
3. **contacts**: Contact form submissions (name, email, project type, message, status)

## Data Flow

1. **Project Display**: Frontend fetches projects from `/api/projects` and displays them in categorized cards
2. **Contact Form**: Users submit contact forms which are stored in the database via `/api/contacts`
3. **Admin Interface**: Hidden admin panel for managing projects and viewing contacts
4. **Real-time Updates**: TanStack Query handles caching and automatic refetching of data

## External Dependencies

### Frontend Dependencies
- **UI/UX**: Radix UI primitives, Lucide React icons, class-variance-authority for component variants
- **Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Hookform resolvers for Zod integration
- **Utilities**: clsx, tailwind-merge for className utilities, date-fns for date handling

### Backend Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connection
- **ORM**: Drizzle ORM with Drizzle Zod for schema validation
- **Session**: connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, various development tools

### Development Tools
- **Build**: Vite for frontend, esbuild for backend
- **Database**: Drizzle Kit for database migrations and schema management
- **TypeScript**: Comprehensive TypeScript setup with strict mode
- **Replit Integration**: Special plugins for Replit development environment

## Deployment Strategy

The application is configured for deployment with:

### Build Process
- Frontend builds to `dist/public` using Vite
- Backend builds to `dist` using esbuild with ESM format
- Single production command serves both frontend and backend

### Environment Configuration
- **Development**: Uses tsx for hot reloading, Vite dev server for frontend
- **Production**: Serves static files from Express server
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Scripts
- `dev`: Development mode with hot reloading
- `build`: Production build for both frontend and backend  
- `start`: Production server startup
- `db:push`: Database schema deployment using Drizzle Kit

The application uses a monolithic deployment approach where the Express server serves both the API endpoints and the built React application, making it suitable for platforms like Replit, Heroku, or similar hosting services.