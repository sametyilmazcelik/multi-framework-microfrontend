import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-6 py-12">
      <div class="mb-8">
        <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
          This page is implemented with Angular
        </span>
      </div>
      <div class="space-y-6">
        <div>
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Samet Yılmazçelik</h1>
          <p class="text-xl text-gray-600 mb-6">Senior Frontend Developer</p>
        </div>
        <div class="max-w-3xl">
          <p class="text-base md:text-lg text-gray-700 leading-relaxed">
            Senior Frontend Developer with over 9 years of experience in frontend development.
            Proficient in HTML, CSS, Sass, Less, Bootstrap, Tailwind CSS, jQuery, and JavaScript,
            as well as modern frameworks like React.js, Vue.js, and Svelte.
          </p>
        </div>
        <div class="pt-2">
          <p class="text-sm text-gray-500">Istanbul, Turkey</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent {}


