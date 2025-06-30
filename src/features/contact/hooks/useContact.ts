import { getPage } from "@/core/api/pageApi";
import { Page } from "@/core/api/pageApi/types";
import { useState } from "react";

export const useContact = () => {
  const [contact, setContact] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContact = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPage("7");
      // Handle the API response structure: { status: 200, data: Page, message: "Success" }
      setContact(response.data || response);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    contact,
    isLoading,
    error,
    getContact,
  };
};
