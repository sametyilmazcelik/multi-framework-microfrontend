import { generateLocaleStaticParams } from '@/lib/i18n';
import ContactPageClient from './ContactPageClient';

export const generateStaticParams = generateLocaleStaticParams;

export default function ContactPage({ params }: { params: { locale: string } }) {
  return <ContactPageClient locale={params.locale} />;
}
