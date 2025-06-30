import { getPage } from "@/core/api/pageApi";
import { Page } from "@/core/api/pageApi/types";
import { useState } from "react";

export const useMaster = () => {
  const [master, setMaster] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMaster = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPage("6"); // Assuming master page has ID 6
      // Handle the API response structure: { status: 200, data: Page, message: "Success" }
      setMaster(response.data || response);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    master,
    isLoading,
    error,
    getMaster,
  };
};
