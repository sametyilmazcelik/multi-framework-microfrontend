import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
  };
  searchParams: {
    fw?: string;
  };
}

export default function AboutPage({ params, searchParams }: PageProps) {
  const { locale } = params;
  const fw = searchParams.fw ? `?fw=${searchParams.fw}` : '';
  redirect(`/${locale}/lab/about${fw}`);
}
