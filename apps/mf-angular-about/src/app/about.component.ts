import { Component, OnInit, OnDestroy, ChangeDetectorRef, ElementRef } from '@angular/core';
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
              {{ profileTitle }}
            </p>
          </div>
          <div class="max-w-3xl">
            <p class="text-base md:text-lg text-gray-700 leading-relaxed">
              {{ profileSummary }}
            </p>
          </div>
          <div class="pt-2">
            <p class="text-sm text-gray-500">{{ profileLocation }}</p>
          </div>
        </div>

        @if (experiencesNormalized && experiencesNormalized.length > 0) {
          <div class="mt-12 pt-8 border-t border-gray-200">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {{ locale === 'tr' ? 'Deneyim' : 'Experience' }}
            </h2>
            <div class="space-y-10">
              @for (exp of experiencesNormalized; track exp.id || $index) {
                <div class="space-y-4">
                  <div>
                    <h3 class="text-xl font-bold text-gray-900">{{ exp.company }}</h3>
                    <p class="text-lg text-gray-700 mt-1">{{ exp.roleText }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ exp.locationText }}</p>
                    <p class="text-sm text-gray-500 mt-1">{{ exp.periodText }}</p>
                  </div>
                  @if (exp.bulletsText && exp.bulletsText.length > 0) {
                    <ul class="ml-4 space-y-2 mt-4">
                      @for (bullet of exp.bulletsText; track $index) {
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

        @if (skillsGrouped && skillsGrouped.length > 0) {
          <div class="mt-12 pt-8 border-t border-gray-200">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              {{ locale === 'tr' ? 'Yetenekler' : 'Skills' }}
            </h2>
            <div class="space-y-8">
              @for (category of skillsGrouped; track category.name) {
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

        @if (!experiencesNormalized || experiencesNormalized.length === 0) {
          <div class="mt-12 pt-8 border-t border-gray-200">
            <p class="text-center text-gray-500">{{ locale === 'tr' ? 'Deneyim verisi bulunamadı' : 'No experience data found' }}</p>
          </div>
        }

        @if (!skillsGrouped || skillsGrouped.length === 0) {
          <div class="mt-12 pt-8 border-t border-gray-200">
            <p class="text-center text-gray-500">{{ locale === 'tr' ? 'Yetenek verisi bulunamadı' : 'No skills data found' }}</p>
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

  // Normalized data
  profileTitle = '';
  profileSummary = '';
  profileLocation = '';
  experiencesNormalized: any[] = [];
  skillsGrouped: any[] = [];

  private observer?: MutationObserver;

  constructor(
    private cdr: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>
  ) { }

  ngOnInit() {
    console.info('[MF] Angular About mounted');

    // Read locale from attribute
    this.locale = this.host.nativeElement.getAttribute('locale') || 'en';

    // Initialize Supabase
    this.initSupabase();

    // Load data
    this.load();

    // Watch for locale attribute changes
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'locale') {
          const nextLocale = this.host.nativeElement.getAttribute('locale') || 'en';
          if (nextLocale !== this.locale) {
            console.info(`[MF] Angular locale changed: ${this.locale} -> ${nextLocale}`);
            this.locale = nextLocale;
            this.load();
          }
        }
      });
    });

    this.observer.observe(this.host.nativeElement, {
      attributes: true,
      attributeFilter: ['locale']
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  // Helper functions
  pickLocale(obj: any, fallback: string = 'en'): string {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[this.locale] ?? obj[fallback] ?? '';
  }

  pickArray(obj: any, fallback: string = 'en'): any[] {
    if (Array.isArray(obj)) return obj;
    if (!obj) return [];
    return obj[this.locale] ?? obj[fallback] ?? [];
  }

  getPeriodText(period: any): string {
    if (!period) return '';
    if (typeof period === 'string') return period;

    const start = period.start || '';
    const end = this.pickLocale(period.end) || period.end || (this.locale === 'tr' ? 'Mevcut' : 'Present');

    return start && end ? `${start} – ${end}` : start || end;
  }

  initSupabase() {
    const w: any = window;
    const url = w.__SUPABASE_URL__;
    const key = w.__SUPABASE_ANON_KEY__;

    if (!url || !key) {
      this.error = 'Supabase config missing on window globals';
      this.loading = false;
      this.cdr.detectChanges();
      return;
    }

    this.supabase = createClient(url, key);
  }

  async load() {
    if (!this.supabase) return;

    this.loading = true;
    this.error = null;
    this.cdr.detectChanges();

    try {
      const [profileRes, expsRes, skillsRes] = await Promise.all([
        this.supabase.from('profile').select('*').single(),
        this.supabase.from('experiences').select('*').order('order_index', { ascending: true }),
        this.supabase.from('skills').select('*').order('order_index', { ascending: true }),
      ]);

      if (profileRes.error) throw profileRes.error;

      this.profile = profileRes.data;
      this.experiences = expsRes.data ?? [];
      this.skills = skillsRes.data ?? [];

      this.normalizeData();
      this.loading = false;
      this.cdr.detectChanges();
    } catch (e: any) {
      this.error = e?.message ?? String(e);
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  normalizeData() {
    // Profile
    this.profileTitle = this.pickLocale(this.profile?.title);
    this.profileSummary = this.pickLocale(this.profile?.summary);
    this.profileLocation = this.pickLocale(this.profile?.location);

    // Experiences
    this.experiencesNormalized = this.experiences.map((e: any) => ({
      ...e,
      roleText: this.pickLocale(e.role),
      locationText: this.pickLocale(e.location),
      periodText: this.getPeriodText(e.period),
      bulletsText: this.pickArray(e.bullets),
    }));

    // Skills
    const grouped: Record<string, Array<{ name: string; level?: string }>> = {};

    this.skills.forEach((skill: any) => {
      const category = skill.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }

      const contentArr = Array.isArray(skill.content)
        ? skill.content
        : this.pickArray(skill.content);

      contentArr.forEach((item: any) => {
        if (item && typeof item === 'object' && item.name) {
          grouped[category].push({
            name: item.name,
            level: item.level,
          });
        } else if (typeof item === 'string') {
          grouped[category].push({ name: item });
        }
      });
    });

    this.skillsGrouped = Object.keys(grouped)
      .sort()
      .map((category) => ({
        name: category,
        items: grouped[category],
      }));
  }
}
