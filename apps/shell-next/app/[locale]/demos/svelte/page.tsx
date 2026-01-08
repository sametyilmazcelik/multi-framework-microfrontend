interface PageProps {
  params: {
    locale: string;
  };
}

export default function SvelteDemoPage({ params }: PageProps) {
  const { locale } = params;
  const svelteUrl = process.env.NEXT_PUBLIC_MF_SVELTE_URL || 'http://localhost:5173';

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {locale === 'tr' ? 'Svelte Demo' : 'Svelte Demo'}
        </h1>
      </div>
      <div className="flex-1">
        <iframe
          src={svelteUrl}
          className="w-full h-full border-0"
          title="Svelte Demo"
        />
      </div>
    </div>
  );
}


