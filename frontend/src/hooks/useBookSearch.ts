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

    // Update ISBN state immediately if searching with a different ISBN
    if (searchIsbn) {
      setIsbn(searchIsbn);
    }

    setLoading(true);
    setError("");
    setBookData(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      console.log("Using API URL:", apiUrl); // Debug log

      const fullUrl = `${apiUrl}/api/book/${targetIsbn}/`;
      console.log("Fetching from:", fullUrl); // Debug log

      const response = await fetch(fullUrl);

      console.log("Response status:", response.status); // Debug log

      if (!response.ok) {
        throw new Error("Book not found or API error");
      }

      const data = await response.json();
      console.log("Response data:", data); // Debug log
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
