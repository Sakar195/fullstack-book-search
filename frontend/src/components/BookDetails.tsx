import { BookData } from "@/types/book";
import { BookCover } from "./BookCover";

interface BookDetailsProps {
  book: BookData;
}

export const BookDetails = ({ book }: BookDetailsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Details</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="md:col-span-1">
          <BookCover cover={book.cover} title={book.title} />
        </div>

        {/* Book Information */}
        <div className="md:col-span-2 space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {book.title}
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <BookInfoItem
              icon="👤"
              label="Authors"
              value={book.authors.length > 0 ? book.authors.join(", ") : "N/A"}
            />

            <BookInfoItem
              icon="📅"
              label="Publication Date"
              value={book.publish_date || "N/A"}
            />

            <BookInfoItem
              icon="🏢"
              label="Publishers"
              value={
                book.publishers.length > 0 ? book.publishers.join(", ") : "N/A"
              }
            />

            <BookInfoItem
              icon="📄"
              label="Pages"
              value={book.number_of_pages?.toString() || "N/A"}
            />
          </div>

          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              ✅ Book found successfully!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BookInfoItemProps {
  icon: string;
  label: string;
  value: string;
}

const BookInfoItem = ({ icon, label, value }: BookInfoItemProps) => (
  <div>
    <h4 className="font-medium text-gray-700 mb-1">
      {icon} {label}
    </h4>
    <p className="text-gray-600">{value}</p>
  </div>
);
