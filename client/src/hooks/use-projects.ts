import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Project, InsertProject } from "@shared/schema";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });
}

export function useFeaturedProjects() {
  return useQuery<Project[]>({
    queryKey: ['/api/projects/featured'],
  });
}

export function useProject(id: number) {
  return useQuery<Project>({
    queryKey: ['/api/projects', id.toString()],
    enabled: !!id,
  });
}

export function useCreateProject() {
  return useMutation({
    mutationFn: async (project: InsertProject) => {
      const response = await apiRequest('POST', '/api/projects', project);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });
}

export function useUpdateProject() {
  return useMutation({
    mutationFn: async ({ id, ...project }: Partial<InsertProject> & { id: number }) => {
      const response = await apiRequest('PUT', `/api/projects/${id}`, project);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    },
  });
}

export function useDeleteProject() {
  return useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });
}
