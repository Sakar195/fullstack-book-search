import { useState } from "react";
import { BookData } from "@/types/book";

export const useBookSearch = () => {
  const [isbn, setIsbn] = useState("");
  const [bookData, setBookData] = useState<BookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBook = async (searchIsbn?: string) => {
    const targetIsbn = searchIsbn || isbn;

    if (!targetIsbn.trim()) {
      setError("Please enter an ISBN number");
      return;
    }

    if (searchIsbn) {
      setIsbn(searchIsbn);
    }

    setLoading(true);
    setError("");
    setBookData(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL!;

      const fullUrl = `${apiUrl}/api/book/${targetIsbn}/`;

      console.log("Using API URL:", apiUrl);
      console.log("Fetching from:", fullUrl);

      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.log("Error response data:", errorData);
          errorMessage = errorData.error || errorData.detail || errorMessage;
        } catch {
          // If response is not JSON, try to get text
          try {
            const errorText = await response.text();
            console.log("Error response text:", errorText);
            if (errorText) errorMessage = errorText;
          } catch {
            console.log("Could not parse error response");
          }
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Response data:", data);
      setBookData(data);
    } catch (err) {
      console.error("Search error:", err); // Debug log
      setError(
        err instanceof Error ? err.message : "Failed to fetch book data"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setIsbn("");
    setBookData(null);
    setError("");
  };

  return {
    isbn,
    setIsbn,
    bookData,
    loading,
    error,
    searchBook,
    clearSearch,
  };
};
