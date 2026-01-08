import Link from 'next/link';

interface PageProps {
  params: {
    locale: string;
  };
}

const demos = [
  { name: 'Angular', path: 'angular', color: 'bg-red-600' },
  { name: 'Svelte', path: 'svelte', color: 'bg-orange-500' },
  { name: 'Vue', path: 'vue', color: 'bg-green-500' },
];

export default function DemosPage({ params }: PageProps) {
  const { locale } = params;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {locale === 'tr' ? 'Framework Demo\'ları' : 'Framework Demos'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {demos.map((demo) => (
          <Link
            key={demo.path}
            href={`/${locale}/demos/${demo.path}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-teal-500 transition-colors"
          >
            <div className={`w-12 h-12 ${demo.color} rounded-lg mb-4`}></div>
            <h2 className="text-xl font-semibold text-gray-900">{demo.name}</h2>
            <p className="text-sm text-gray-600 mt-2">
              {locale === 'tr' ? 'Demo\'yu görüntüle' : 'View demo'}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}


