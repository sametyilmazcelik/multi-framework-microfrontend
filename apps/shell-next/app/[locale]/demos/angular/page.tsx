interface PageProps {
  params: {
    locale: string;
  };
}

export default function AngularDemoPage({ params }: PageProps) {
  const { locale } = params;
  const angularUrl = process.env.NEXT_PUBLIC_MF_ANGULAR_URL || 'http://localhost:4200';

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {locale === 'tr' ? 'Angular Demo' : 'Angular Demo'}
        </h1>
      </div>
      <div className="flex-1">
        <iframe
          src={angularUrl}
          className="w-full h-full border-0"
          title="Angular Demo"
        />
      </div>
    </div>
  );
}


