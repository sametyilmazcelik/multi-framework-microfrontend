import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AboutComponent } from './app/about.component';

(async () => {
  const app = await createApplication({
    providers: [],
  });

  const AboutElement = createCustomElement(AboutComponent, {
    injector: app.injector,
  });

  customElements.define('mf-angular-about', AboutElement);
})();


