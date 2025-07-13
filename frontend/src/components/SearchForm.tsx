import { LoadingSpinner } from "./ui/LoadingSpinner";
import { ErrorMessage } from "./ui/ErrorMessage";

interface SearchFormProps {
  isbn: string;
  onIsbnChange: (isbn: string) => void;
  onSearch: () => void;
  loading: boolean;
  error: string;
  onErrorDismiss?: () => void;
}

export const SearchForm = ({
  isbn,
  onIsbnChange,
  onSearch,
  loading,
  error,
  onErrorDismiss,
}: SearchFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ISBN Number
          </label>
          <div className="flex gap-4">
            <input
              type="text"
              id="isbn"
              value={isbn}
              onChange={(e) => onIsbnChange(e.target.value)}
              placeholder="Enter ISBN (e.g., 9780140328721)"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <LoadingSpinner size="sm" color="white" />
                  <span className="ml-2">Searching...</span>
                </div>
              ) : (
                "🔍 Search"
              )}
            </button>
          </div>
        </div>
      </form>

      {error && <ErrorMessage message={error} onDismiss={onErrorDismiss} />}
    </div>
  );
};
