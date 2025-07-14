interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mobile-py tablet-py py-12 mobile-padding tablet-padding px-4 sm:px-6 lg:px-8">
      <div className="responsive-container max-w-4xl mx-auto">{children}</div>
    </div>
  );
};
