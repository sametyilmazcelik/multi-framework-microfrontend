import AboutElement from './AboutElement.svelte';

class MfSvelteAbout extends HTMLElement {
  private app: AboutElement | null = null;

  connectedCallback() {
    const supabaseUrl = this.getAttribute('data-supabase-url') || '';
    const supabaseAnon = this.getAttribute('data-supabase-anon') || '';
    const locale = this.getAttribute('data-locale') || 'en';

    this.app = new AboutElement({
      target: this,
      props: {
        supabaseUrl,
        supabaseAnon,
        locale,
      },
    });
  }

  disconnectedCallback() {
    if (this.app) {
      this.app.$destroy();
    }
  }
}

customElements.define('mf-svelte-about', MfSvelteAbout);


