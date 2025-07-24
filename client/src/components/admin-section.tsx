import { useState } from "react";
import { useProjects } from "@/hooks/use-projects";
import { useContacts } from "@/hooks/use-contacts";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Eye, Mail, Plus, Edit, Trash2 } from "lucide-react";

export default function AdminSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { data: projects } = useProjects();
  const { data: contacts } = useContacts();
  
  const { data: stats } = useQuery({
    queryKey: ['/api/stats'],
  });

  // For demo purposes, this section is hidden by default
  // In a real application, this would be protected by authentication
  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="glass-effect p-3 rounded-full text-[hsl(180,100%,50%)] hover:bg-[hsla(180,100%,50%,0.1)] transition-all duration-300"
        >
          <Plus size={20} />
        </button>
      </div>
    );
  }

  return (
    <section id="admin" className="py-20">
      <div className="container mx-auto px-6">
        <div className="glass-effect p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-holographic text-center">Project Management Dashboard</h2>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Stats */}
            <div className="glass-effect p-6 rounded-lg text-center">
              <BarChart3 className="w-12 h-12 text-[hsl(180,100%,50%)] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">Total Projects</h3>
              <p className="text-2xl font-bold text-[hsl(180,100%,50%)]">{(stats as any)?.totalProjects || 0}</p>
            </div>
            <div className="glass-effect p-6 rounded-lg text-center">
              <Eye className="w-12 h-12 text-[hsl(259,83%,67%)] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">Portfolio Views</h3>
              <p className="text-2xl font-bold text-[hsl(259,83%,67%)]">{(stats as any)?.views || 0}</p>
            </div>
            <div className="glass-effect p-6 rounded-lg text-center">
              <Mail className="w-12 h-12 text-[hsl(199,89%,48%)] mb-4 mx-auto" />
              <h3 className="text-xl font-semibold">New Messages</h3>
              <p className="text-2xl font-bold text-[hsl(199,89%,48%)]">{(stats as any)?.messages || 0}</p>
            </div>
          </div>

          {/* Project Management */}
          <div className="glass-effect p-6 rounded-lg mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Manage Projects</h3>
              <button className="bg-[hsl(180,100%,50%)] text-black px-4 py-2 rounded hover:bg-opacity-80 transition-all duration-300 flex items-center gap-2">
                <Plus size={16} />
                Add Project
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="py-3 px-4">Project Name</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Tech Stack</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects?.map((project: any) => (
                    <tr key={project.id} className="border-b border-gray-700">
                      <td className="py-3 px-4">{project.title}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          project.status === 'Live' 
                            ? 'bg-green-500 text-black' 
                            : 'bg-yellow-500 text-black'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{project.technologies.slice(0, 3).join(', ')}</td>
                      <td className="py-3 px-4">
                        <button className="text-[hsl(180,100%,50%)] hover:text-[hsl(199,89%,48%)] mr-2">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact Messages */}
          <div className="glass-effect p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Recent Messages</h3>
            <div className="space-y-4">
              {contacts?.slice(0, 5).map((contact: any) => (
                <div key={contact.id} className="glass-effect p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{contact.firstName} {contact.lastName}</h4>
                      <p className="text-gray-400 text-sm">{contact.email}</p>
                      <p className="text-gray-300 mt-2">{contact.message.substring(0, 100)}...</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      contact.status === 'new' 
                        ? 'bg-[hsl(180,100%,50%)] text-black' 
                        : 'bg-gray-500 text-white'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                </div>
              )) || <p className="text-gray-400">No messages yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
