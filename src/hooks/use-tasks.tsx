import axiosInstance from "@/lib/axios-instance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useTasks = () => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/tasks");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createTaskMutation = useMutation({
    mutationFn: (task: any) => axiosInstance.post("/tasks", task),
    onSuccess: ({ data: task }: any) => {
      queryClient.setQueryData(["tasks"], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return [task, ...oldData];
        }
        return [task];
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: (task: any) => axiosInstance.patch(`/tasks/${task.id}`, task),
    onSuccess: ({ data: task }: any) => {
      queryClient.setQueryData(["tasks"], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return oldData.map((item) => (item.id === task.id ? { ...item, ...task } : item));
        }
        return [];
      });
    },
  });

  const removeTaskMutation = useMutation({
    mutationFn: (id: any) => axiosInstance.delete(`/tasks/${id}`),
    onSuccess: ({ data: task }: any) => {
      queryClient.setQueryData(["tasks"], (oldData: any) => {
        if (Array.isArray(oldData)) {
          return oldData.filter((item) => item.id !== task.id);
        }
        return [];
      });
    },
  });

  return {
    ...tasksQuery,
    create: createTaskMutation.mutate,
    update: updateTaskMutation.mutate,
    remove: removeTaskMutation.mutate,
  };
};

export default useTasks;
