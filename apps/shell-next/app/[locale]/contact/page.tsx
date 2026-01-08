import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { SiGithub, SiLinkedin, SiGmail } from 'react-icons/si';

interface PageProps {
  params: {
    locale: string;
  };
}

export default function ContactPage({ params }: PageProps) {
  const { locale } = params;
  const isEn = locale === 'en';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
          {isEn ? 'Get in Touch' : 'İletişime Geç'}
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          {isEn 
            ? 'I\'d love to hear from you. Send me a message and I\'ll respond as soon as possible.' 
            : 'Sizden haber almak isterim. Bana bir mesaj gönderin, en kısa sürede yanıtlayacağım.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
          <SiGmail size={32} className="mx-auto mb-4 text-neutral-900 dark:text-white" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">Email</h3>
          <a
            href="mailto:samet@example.com"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            samet@example.com
          </a>
        </Card>

        <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
          <SiLinkedin size={32} className="mx-auto mb-4 text-neutral-900 dark:text-white" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">LinkedIn</h3>
          <a
            href="https://www.linkedin.com/in/samet-yilmazcelik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            samet-yilmazcelik
          </a>
        </Card>

        <Card className="text-center hover:scale-[1.02] transition-transform duration-200">
          <SiGithub size={32} className="mx-auto mb-4 text-neutral-900 dark:text-white" />
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">GitHub</h3>
          <a
            href="https://github.com/sametyc"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            sametyc
          </a>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          {isEn ? 'Send a Message' : 'Mesaj Gönder'}
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {isEn ? 'Name' : 'İsim'}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
              {isEn ? 'Message' : 'Mesaj'}
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>
          <Button variant="primary" className="w-full">
            {isEn ? 'Send Message' : 'Mesaj Gönder'}
          </Button>
        </form>
      </Card>
    </div>
  );
}

