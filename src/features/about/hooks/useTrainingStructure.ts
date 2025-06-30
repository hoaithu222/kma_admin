import { getPage } from "@/core/api/pageApi";
import { Page } from "@/core/api/pageApi/types";
import { useState } from "react";

export const useTrainingStructure = () => {
  const [trainingStructure, setTrainingStructure] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTrainingStructure = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPage("3"); // Assuming training structure page has ID 4
      // Handle the API response structure: { status: 200, data: Page, message: "Success" }
      setTrainingStructure(response.data || response);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    trainingStructure,
    isLoading,
    error,
    getTrainingStructure,
  };
};
