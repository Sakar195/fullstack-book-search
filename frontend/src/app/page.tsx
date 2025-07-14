"use client";

import { Suspense, lazy } from "react";
import { useBookSearch } from "@/hooks/useBookSearch";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { SearchForm } from "@/components/SearchForm";
import { ConnectionTest } from "@/components/ConnectionTest";

// Lazy load components that are conditionally rendered or less critical
const BookDetails = lazy(() =>
  import("@/components/BookDetails").then((module) => ({
    default: module.BookDetails,
  }))
);
const ExampleISBNs = lazy(() =>
  import("@/components/ExampleISBNs").then((module) => ({
    default: module.ExampleISBNs,
  }))
);

// Loading fallback components
const BookDetailsLoader = () => (
  <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
    <div className="animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
    </div>
  </div>
);

const ExampleISBNsLoader = () => (
  <div className="bg-white rounded-xl shadow-lg p-8">
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded"></div>
        ))}
      </div>
    </div>
  </div>
);

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

      {/* Debug: Connection Test */}
      <div className="mb-8">
        <ConnectionTest />
      </div>

      <SearchForm
        isbn={isbn}
        onIsbnChange={setIsbn}
        onSearch={() => searchBook()}
        loading={loading}
        error={error}
        onErrorDismiss={handleErrorDismiss}
      />

      {bookData && (
        <Suspense fallback={<BookDetailsLoader />}>
          <BookDetails book={bookData} />
        </Suspense>
      )}

      <Suspense fallback={<ExampleISBNsLoader />}>
        <ExampleISBNs onExampleClick={handleExampleClick} />
      </Suspense>
    </Layout>
  );
}
