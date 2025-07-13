import { ExampleBook } from "@/types/book";

interface ExampleISBNsProps {
  onExampleClick: (isbn: string) => void;
}

const EXAMPLE_BOOKS: ExampleBook[] = [
  { isbn: "9780140328721", title: "Fantastic Mr. Fox" },
  { isbn: "9780747532699", title: "Harry Potter" },
  { isbn: "9780316769174", title: "The Catcher in the Rye" },
];

export const ExampleISBNs = ({ onExampleClick }: ExampleISBNsProps) => {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        📝 Try these example ISBNs:
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EXAMPLE_BOOKS.map((example) => (
          <button
            key={example.isbn}
            onClick={() => onExampleClick(example.isbn)}
            className="p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <div className="font-medium text-blue-600">{example.isbn}</div>
            <div className="text-sm text-gray-600">{example.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
