import Image from "next/image";

interface BookCoverProps {
  cover: string;
  title: string;
  className?: string;
}

export const BookCover = ({ cover, title, className = "" }: BookCoverProps) => {
  if (cover && cover !== "N/A") {
    return (
      <div className={`mobile-cover-height relative h-80 w-full ${className}`}>
        <Image
          src={cover}
          alt={title}
          fill
          className="object-cover rounded-lg shadow-md"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
          quality={75}
          unoptimized={true}
          onError={() => {
            console.log("Image failed to load:", cover);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`mobile-cover-height h-80 w-full bg-gray-200 rounded-lg flex items-center justify-center ${className}`}
    >
      <div className="text-center text-gray-500">
        <div className="text-3xl sm:text-4xl mb-2">📖</div>
        <p className="text-sm sm:text-base">No cover available</p>
      </div>
    </div>
  );
};
