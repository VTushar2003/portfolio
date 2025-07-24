import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { useContacts } from "@/hooks/use-contacts";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function ContactSection() {
  const { toast } = useToast();
  const { createContactMutation } = useContacts();
  
  const form = useForm({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await createContactMutation.mutateAsync(data);
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "tushar.vaghela@example.com",
      color: "hsl(180,100%,50%)",
    },
    {
      icon: Linkedin,
      title: "LinkedIn",
      value: "linkedin.com/in/tusharvaghela",
      color: "hsl(259,83%,67%)",
    },
    {
      icon: Github,
      title: "GitHub",
      value: "github.com/tusharvaghela",
      color: "hsl(199,89%,48%)",
    },
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-holographic">Let's Build Something Amazing</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your ideas into cutting-edge digital solutions? Let's connect and discuss your next innovative project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {contactInfo.map((info, index) => (
              <div key={index} className={`glass-effect p-6 rounded-2xl card-3d hover:border-[${info.color}]`}>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-opacity-20"
                    style={{ backgroundColor: `${info.color}33` }}
                  >
                    <info.icon className="w-6 h-6" style={{ color: info.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{info.title}</h3>
                    <p className="text-gray-300">{info.value}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Background Image */}
            <div className="relative mt-8">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                alt="Abstract tech elements with digital network connections" 
                className="rounded-2xl w-full h-48 object-cover opacity-30" 
              />
              <div className="absolute inset-0 holographic rounded-2xl"></div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-effect p-8 rounded-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">First Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-glass border-gray-600 text-white focus:border-[hsl(180,100%,50%)]" 
                            placeholder="John"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Last Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            className="bg-glass border-gray-600 text-white focus:border-[hsl(180,100%,50%)]" 
                            placeholder="Doe"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          className="bg-glass border-gray-600 text-white focus:border-[hsl(180,100%,50%)]" 
                          placeholder="john@example.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-glass border-gray-600 text-white focus:border-[hsl(180,100%,50%)]">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="web-application">Web Application</SelectItem>
                          <SelectItem value="mobile-app">Mobile App</SelectItem>
                          <SelectItem value="ecommerce-platform">E-commerce Platform</SelectItem>
                          <SelectItem value="api-development">API Development</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5}
                          className="bg-glass border-gray-600 text-white focus:border-[hsl(180,100%,50%)]" 
                          placeholder="Tell me about your project..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={createContactMutation.isPending}
                  className="w-full bg-[hsl(180,100%,50%)] text-black py-4 font-semibold hover:bg-opacity-80 transition-all duration-300 hover:animate-glow"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {createContactMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
