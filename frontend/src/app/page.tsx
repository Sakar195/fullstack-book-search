"use client";

import { useBookSearch } from "@/hooks/useBookSearch";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { BookDetails } from "@/components/BookDetails";
import { ExampleISBNs } from "@/components/ExampleISBNs";

export default function Home() {
  const { isbn, setIsbn, bookData, loading, error, searchBook, clearSearch } =
    useBookSearch();

  const handleExampleClick = (exampleIsbn: string) => {
    searchBook(exampleIsbn);
  };

  const handleErrorDismiss = () => {
    clearSearch();
  };

  return (
    <Layout>
      <Header />

      <SearchForm
        isbn={isbn}
        onIsbnChange={setIsbn}
        onSearch={() => searchBook()}
        loading={loading}
        error={error}
        onErrorDismiss={handleErrorDismiss}
      />

      {bookData && <BookDetails book={bookData} />}

      <ExampleISBNs onExampleClick={handleExampleClick} />
    </Layout>
  );
}
