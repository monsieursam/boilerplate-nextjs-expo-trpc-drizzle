import { clientApi } from "@/trpc/client";

export const useExample = () => {
  const utils = clientApi.useUtils();
  const { data, isLoading } = clientApi.example.get.useQuery();

  const createMutation = clientApi.example.add.useMutation({
    onSuccess: () => {
      utils.example.get.invalidate();
    },
  });

  return {
    createMutation,
    data,
    isLoading,
  }

}
