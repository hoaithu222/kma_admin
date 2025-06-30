import { getPage } from "@/core/api/pageApi";
import { Page } from "@/core/api/pageApi/types";
import { useState } from "react";

export const useOrganization = () => {
  const [organization, setOrganization] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOrganization = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPage("4"); // Assuming organization page has ID 4
      // Handle the API response structure: { status: 200, data: Page, message: "Success" }
      setOrganization(response.data || response);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    organization,
    isLoading,
    error,
    getOrganization,
  };
};
