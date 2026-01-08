interface PageProps {
  params: {
    locale: string;
  };
}

export default function VueDemoPage({ params }: PageProps) {
  const { locale } = params;
  const vueUrl = process.env.NEXT_PUBLIC_MF_VUE_URL || 'http://localhost:5174';

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {locale === 'tr' ? 'Vue Demo' : 'Vue Demo'}
        </h1>
      </div>
      <div className="flex-1">
        <iframe
          src={vueUrl}
          className="w-full h-full border-0"
          title="Vue Demo"
        />
      </div>
    </div>
  );
}


