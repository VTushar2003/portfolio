import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Contact, InsertContact } from "@shared/schema";

export function useContacts() {
  const query = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  const createContactMutation = useMutation({
    mutationFn: async (contact: InsertContact) => {
      const response = await apiRequest('POST', '/api/contacts', contact);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  const updateContactStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest('PUT', `/api/contacts/${id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
    },
  });

  return {
    ...query,
    createContactMutation,
    updateContactStatusMutation,
  };
}
