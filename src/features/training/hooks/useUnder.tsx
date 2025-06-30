import { getPage } from "@/core/api/pageApi";
import { Page } from "@/core/api/pageApi/types";
import { useState } from "react";

export const useUnder = () => {
  const [under, setUnder] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUnder = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPage("5"); // Assuming under page has ID 5
      // Handle the API response structure: { status: 200, data: Page, message: "Success" }
      setUnder(response.data || response);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    under,
    isLoading,
    error,
    getUnder,
  };
};
