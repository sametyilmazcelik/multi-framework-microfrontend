'use client';

import { useEffect, useRef } from 'react';

type Framework = 'angular' | 'svelte' | 'vue';

interface FrameworkHostProps {
  framework: Framework;
  locale: string;
}

const frameworkScripts = {
  angular: null,
  svelte: '/mf/mf-svelte-about.js',
  vue: '/mf/mf-vue-about.js',
};

const frameworkElements = {
  angular: 'mf-angular-about',
  svelte: 'mf-svelte-about',
  vue: 'mf-vue-about',
};

export default function FrameworkHost({ framework, locale }: FrameworkHostProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (!containerRef.current) return;

    const elementName = frameworkElements[framework];

    const createElement = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        const element = document.createElement(elementName);
        element.setAttribute('locale', locale);
        containerRef.current.appendChild(element);
      }
    };

    if (scriptLoadedRef.current[framework]) {
      createElement();
      return;
    }

    if (framework === 'angular') {
      const loadAngularScripts = async () => {
        try {
          const manifestResponse = await fetch('/mf/angular/manifest.json');
          if (!manifestResponse.ok) {
            throw new Error('Failed to fetch Angular manifest');
          }
          const manifest = await manifestResponse.json();
          const files = manifest.files || [];

          const loadScript = (fileName: string): Promise<void> => {
            return new Promise((resolve, reject) => {
              const scriptId = `mf-angular-${fileName.replace(/[^a-z0-9]/gi, '-')}`;
              if (document.getElementById(scriptId)) {
                resolve();
                return;
              }
              const script = document.createElement('script');
              script.id = scriptId;
              script.type = 'module';
              script.src = `/mf/angular/${fileName}`;
              script.async = false;
              script.onload = () => resolve();
              script.onerror = () => reject(new Error(`Failed to load ${fileName}`));
              document.head.appendChild(script);
            });
          };

          for (const file of files) {
            await loadScript(file);
          }

          scriptLoadedRef.current[framework] = true;
          createElement();
        } catch (err) {
          if (containerRef.current) {
            containerRef.current.innerHTML = '<p class="text-red-600">Failed to load Angular bundle</p>';
          }
        }
      };

      loadAngularScripts();
      return;
    }

    const scriptId = `mf-${framework}-script`;
    const scriptSrc = frameworkScripts[framework];

    if (!scriptSrc) return;

    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      scriptLoadedRef.current[framework] = true;
      createElement();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = scriptSrc;
    script.async = true;

    script.onload = () => {
      scriptLoadedRef.current[framework] = true;
      createElement();
    };

    script.onerror = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '<p class="text-red-600">Failed to load framework bundle</p>';
      }
    };

    document.head.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [framework, locale]);

  useEffect(() => {
    if (!containerRef.current || !scriptLoadedRef.current[framework]) return;

    const elementName = frameworkElements[framework];
    const existingElement = containerRef.current.querySelector(elementName);
    if (existingElement) {
      existingElement.setAttribute('locale', locale);
    }
  }, [locale, framework]);

  return <div ref={containerRef} />;
}

