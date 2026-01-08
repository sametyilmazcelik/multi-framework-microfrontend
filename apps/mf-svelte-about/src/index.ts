import AboutElement from './AboutElement.svelte';

class MfSvelteAbout extends HTMLElement {
  private app: AboutElement | null = null;

  connectedCallback() {
    const locale = this.getAttribute('locale') || 'en';
    const supabaseUrl = (window as any).__SUPABASE_URL__ || '';
    const supabaseAnon = (window as any).__SUPABASE_ANON_KEY__ || '';

    this.app = new AboutElement({
      target: this,
      props: {
        locale,
        supabaseUrl,
        supabaseAnon,
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


