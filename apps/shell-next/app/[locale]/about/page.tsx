import { generateLocaleStaticParams } from '@/lib/i18n';
import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    locale: string;
  };
}

export const generateStaticParams = generateLocaleStaticParams;

export default function AboutPage({ params }: PageProps) {
  const { locale } = params;
  // Redirect to lab/about - fw param handled client-side by FrameworkToggle
  redirect(`/${locale}/lab/about`);
}
