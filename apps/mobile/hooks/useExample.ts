import { clientApi } from "@/trpc/client";

export const useExample = () => {
  const utils = clientApi.useUtils();
  const { data, isLoading } = clientApi.example.get.useQuery();

  const createMutation = clientApi.example.add.useMutation({
    onSuccess: () => {
      utils.example.get.invalidate();
    },
  });

  const deleteMutation = clientApi.example.remove.useMutation({
    onSuccess: () => {
      utils.example.get.invalidate();
    },
  });

  return {
    createMutation,
    deleteMutation,
    data,
    isLoading,
  }

}
