export interface BookData {
  title: string;
  authors: string[];
  publish_date: string;
  publishers: string[];
  number_of_pages: string | number;
  cover: string;
}

export interface ExampleBook {
  isbn: string;
  title: string;
}
