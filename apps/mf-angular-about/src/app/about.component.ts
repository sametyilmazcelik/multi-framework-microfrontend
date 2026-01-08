import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-4xl mx-auto px-6 py-12">
      <div class="mb-8">
        <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
          This view is rendered using Angular (Web Component)
        </span>
        <p class="mt-2 text-sm text-gray-600">
          This view consumes live data from Supabase and is mounted independently from the Next.js shell.
        </p>
      </div>

      @if (loading) {
        <div class="text-center py-12">
          <p class="text-gray-600">Loading...</p>
        </div>
      }

      @if (error) {
        <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-600">{{ error }}</p>
        </div>
      }

      @if (profile && !loading && !error) {
        <div class="space-y-6">
          <div>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {{ profile.name }}
            </h1>
            <p class="text-xl text-gray-600 mb-6">
              {{ getTitle() }}
            </p>
          </div>
          <div class="max-w-3xl">
            <p class="text-base md:text-lg text-gray-700 leading-relaxed">
              {{ getSummary() }}
            </p>
          </div>
          <div class="pt-2">
            <p class="text-sm text-gray-500">{{ getLocation() }}</p>
          </div>
        </div>

        @if (experiences && experiences.length > 0) {
          <div class="mt-12 pt-8 border-t border-gray-200">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {{ locale === 'tr' ? 'Deneyim' : 'Experience' }}
            </h2>
            <div class="space-y-10">
              @for (exp of experiences; track exp.id || $index) {
                <div class="space-y-4">
                  <div>
                    <h3 class="text-xl font-bold text-gray-900">{{ exp.company }}</h3>
                    <p class="text-lg text-gray-700 mt-1">{{ getRole(exp) }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ getExpLocation(exp) }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ getPeriod(exp) }}</p>
                  </div>
                  @if (getBullets(exp).length > 0) {
                    <ul class="ml-4 space-y-2 mt-4">
                      @for (bullet of getBullets(exp); track $index) {
                        <li class="text-gray-700 flex items-start">
                          <span class="text-teal-500 mr-2">•</span>
                          <span>{{ bullet }}</span>
                        </li>
                      }
                    </ul>
                  }
                  @if (exp.tech && exp.tech.length > 0) {
                    <div class="mt-4 flex flex-wrap gap-2">
                      @for (tech of exp.tech; track $index) {
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          {{ tech }}
                        </span>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        }

        @if (skills && skills.length > 0) {
          <div class="mt-12 pt-8 border-t border-gray-200">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {{ locale === 'tr' ? 'Yetenekler' : 'Skills' }}
            </h2>
            <div class="space-y-8">
              @for (category of getGroupedSkills(); track category.name) {
                <div class="space-y-4">
                  <h3 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    {{ category.name }}
                  </h3>
                  <div class="flex flex-wrap gap-3">
                    @for (item of category.items; track item.name) {
                      <div class="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                        <span class="text-sm font-medium text-gray-900">{{ item.name }}</span>
                        @if (item.level) {
                          <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200">
                            {{ item.level }}
                          </span>
                        }
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AboutComponent implements OnInit, OnDestroy {
  profile: any = null;
  experiences: any[] = [];
  skills: any[] = [];
  loading = true;
  error: string | null = null;
  locale = 'en';
  supabase: SupabaseClient | null = null;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    console.info('[MF] Angular About mounted');

    const element = this.getHostElement();
    const localeAttr = element.getAttribute('locale');
    const supabaseUrl = (window as any).__SUPABASE_URL__ || '';
    const supabaseAnon = (window as any).__SUPABASE_ANON_KEY__ || '';

    if (!supabaseUrl || !supabaseAnon) {
      this.error = 'Missing Supabase configuration';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.locale = localeAttr === 'tr' ? 'tr' : 'en';
    this.supabase = createClient(supabaseUrl, supabaseAnon);
    this.loadData();
  }

  ngOnDestroy() { }

  private getHostElement(): HTMLElement {
    return document.querySelector('mf-angular-about') || document.body;
  }

  private async loadData() {
    if (!this.supabase) return;

    try {
      const [profileRes, experiencesRes, skillsRes] = await Promise.all([
        this.supabase.from('profile').select('*').single(),
        this.supabase.from('experiences').select('*').order('order_index', { ascending: true }),
        this.supabase.from('skills').select('*').order('category', { ascending: true }).order('order_index', { ascending: true }),
      ]);

      if (profileRes.error) {
        this.error = 'Error loading profile data';
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      this.profile = profileRes.data;
      this.experiences = experiencesRes.data || [];
      this.skills = skillsRes.data || [];
      this.loading = false;
      this.cdr.detectChanges();
    } catch (err) {
      this.error = 'Failed to load data';
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  getTitle(): string {
    return this.profile?.title?.[this.locale] || this.profile?.title?.en || '';
  }

  getSummary(): string {
    return this.profile?.summary?.[this.locale] || this.profile?.summary?.en || '';
  }

  getLocation(): string {
    return this.profile?.location?.[this.locale] || this.profile?.location?.en || '';
  }

  getRole(exp: any): string {
    return exp.role?.[this.locale] || exp.role?.en || '';
  }

  getExpLocation(exp: any): string {
    return exp.location?.[this.locale] || exp.location?.en || '';
  }

  getPeriod(exp: any): string {
    const start = exp.period?.start || '';
    let end = '';
    if (typeof exp.period?.end === 'string') {
      end = exp.period.end;
    } else if (exp.period?.end) {
      end = exp.period.end[this.locale] || exp.period.end.en;
    } else {
      end = this.locale === 'en' ? 'Present' : 'Mevcut Durum';
    }
    return `${start} – ${end}`;
  }

  getBullets(exp: any): string[] {
    return exp.bullets?.[this.locale] || exp.bullets?.en || [];
  }

  getGroupedSkills(): Array<{ name: string; items: Array<{ name: string; level?: string }> }> {
    const grouped: Record<string, Array<{ name: string; level?: string }>> = {};

    this.skills.forEach((skill) => {
      const category = skill.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }

      // Parse content JSONB - can be either:
      // 1. Direct array: [{name, level}]
      // 2. Locale-keyed object: {en: [{name, level}], tr: [{name, level}]}
      if (skill.content) {
        let items: any[] = [];

        if (Array.isArray(skill.content)) {
          items = skill.content;
        } else if (typeof skill.content === 'object') {
          items = skill.content[this.locale] || skill.content.en || skill.content.tr || [];
        }

        if (Array.isArray(items)) {
          items.forEach((item: any) => {
            if (item && typeof item === 'object' && item.name) {
              grouped[category].push({
                name: item.name,
                level: item.level,
              });
            } else if (typeof item === 'string') {
              grouped[category].push({ name: item });
            }
          });
        }
      }
    });

    return Object.keys(grouped)
      .sort()
      .map((category) => ({
        name: category,
        items: grouped[category],
      }));
  }
}
