interface AboutLayoutProps {
  children: React.ReactNode;
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {children}
    </div>
  );
}

