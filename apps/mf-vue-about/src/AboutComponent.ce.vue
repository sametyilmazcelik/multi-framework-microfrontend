<template>
  <div class="px-4 pb-8 pt-0 md:pb-12 md:pt-6">
    <!-- Framework Indicator -->


    <div v-if="loading" class="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div class="relative w-16 h-16 mb-4">
        <div class="absolute inset-0 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
        <div class="absolute inset-2 border-4 border-accent/10 border-b-accent/50 rounded-full animate-spin [animation-duration:1.5s]"></div>
      </div>
      <div class="text-text-secondary font-medium tracking-wide animate-pulse">
        {{ locale === 'tr' ? 'Yükleniyor...' : 'Loading...' }}
      </div>
    </div>

    <div v-if="error" class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-center">
      {{ error }}
    </div>

    <template v-if="profile && !loading && !error">
      <!-- Hero Section -->
      <div class="relative -mx-6 px-6 py-16 md:py-24 rounded-3xl overflow-hidden mb-12 border border-border bg-surface/30 backdrop-blur-md shadow-2xl">
        <!-- Dynamic Background Gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-background/50 via-transparent to-background/50"></div>
        <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div class="relative z-10 max-w-4xl mx-auto text-center">
          <h1 class="text-5xl md:text-7xl font-bold text-text-primary mb-6 tracking-tight drop-shadow-sm">
            {{ profile.name }}
          </h1>
          <p class="text-xl md:text-2xl text-accent mb-8 font-medium tracking-wide">
            {{ profileTitle }}
          </p>

          <div class="max-w-2xl mx-auto mb-10">
            <p class="text-lg md:text-xl text-text-secondary leading-relaxed font-light">
              {{ profileSummary }}
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-4 mb-8">
            <a href="https://www.linkedin.com/in/samet-yilmazcelik" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg shadow-accent/20 bg-accent hover:bg-accent/90 text-white">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/sametyilmazcelik" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg border-2 border-border/50 text-text-primary hover:bg-surface-elevated hover:border-border bg-transparent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer"
               class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg bg-surface-elevated/50 border border-border/50 text-text-primary hover:bg-surface-elevated">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              {{ locale === 'tr' ? 'Özgeçmiş' : 'CV' }}
            </a>
          </div>

          <p class="text-sm text-text-muted flex items-center justify-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {{ profileLocation }}
          </p>
        </div>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div class="relative overflow-hidden bg-surface/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/30 group text-center">
          <div class="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div class="relative z-10">
            <div class="text-4xl md:text-5xl font-bold text-text-primary mb-2 tracking-tight">9+</div>
            <div class="text-sm text-text-muted font-medium uppercase tracking-wider">{{ locale === 'tr' ? 'Yıl Deneyim' : 'Years Experience' }}</div>
          </div>
        </div>
        <div class="relative overflow-hidden bg-surface/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/30 group text-center">
          <div class="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div class="relative z-10">
            <div class="text-4xl md:text-5xl font-bold text-text-primary mb-2 tracking-tight">20+</div>
            <div class="text-sm text-text-muted font-medium uppercase tracking-wider">{{ locale === 'tr' ? 'Proje' : 'Projects' }}</div>
          </div>
        </div>
        <div class="relative overflow-hidden bg-surface/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-accent/30 group text-center">
          <div class="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div class="relative z-10">
            <div class="text-4xl md:text-5xl font-bold text-text-primary mb-2 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" class="text-accent">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div class="text-sm text-text-muted font-medium uppercase tracking-wider">{{ locale === 'tr' ? 'İstanbul, Türkiye' : 'Istanbul, Turkey' }}</div>
          </div>
        </div>
      </div>

      <!-- Experience Section -->
      <div v-if="experiencesNormalized && experiencesNormalized.length > 0" class="mt-16 pt-8 border-t border-border/30">
        <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-12 flex items-center gap-3">
          <span class="w-1.5 h-8 bg-gradient-to-b from-accent to-accent/50 rounded-full"></span>
          {{ locale === 'tr' ? 'Deneyim' : 'Experience' }}
        </h2>

        <div class="relative border-l border-border/30 ml-3 md:ml-6 space-y-12 pb-12">
          <div v-for="exp in experiencesNormalized" :key="exp.id || exp" class="relative pl-8 md:pl-12 group">
            <!-- Timeline Dot -->
            <div class="absolute -left-[5px] md:-left-[5px] top-6 w-3 h-3 rounded-full bg-accent ring-4 ring-background shadow-[0_0_15px_rgba(34,197,94,0.5)] group-hover:scale-125 transition-transform duration-300"></div>
            
            <div class="relative overflow-hidden bg-surface/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 group">
              <div class="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div class="relative z-10 space-y-4">
                <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <h3 class="text-xl md:text-2xl font-bold text-text-primary mb-1 tracking-tight">{{ exp.company }}</h3>
                    <p class="text-lg text-accent font-medium">{{ exp.roleText }}</p>
                  </div>
                  <div class="flex items-center gap-3 text-sm text-text-muted bg-surface-elevated/50 px-3 py-1.5 rounded-lg self-start md:self-auto border border-border/50">
                    <span class="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      {{ exp.periodText }}
                    </span>
                  </div>
                </div>

                <p class="text-sm text-text-muted flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {{ exp.locationText }}
                </p>

                <div class="h-px bg-border/30 my-4"></div>

                <ul v-if="exp.bulletsText && exp.bulletsText.length > 0" class="space-y-3">
                  <li v-for="(bullet, idx) in exp.bulletsText" :key="idx" class="text-text-secondary flex items-start gap-3 text-base leading-relaxed">
                    <span class="text-accent mt-2 w-1.5 h-1.5 rounded-full bg-accent/80 flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></span>
                    <span>{{ bullet }}</span>
                  </li>
                </ul>

                <div v-if="exp.tech && exp.tech.length > 0" class="mt-6 pt-4 border-t border-border/30 flex flex-wrap gap-2">
                  <span
                    v-for="(tech, idx) in exp.tech"
                    :key="idx"
                    class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-surface-elevated/50 text-text-muted border border-border/50 hover:text-text-primary hover:border-accent/40 transition-colors cursor-default"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Section -->
      <div v-if="skillsGrouped && skillsGrouped.length > 0" class="mt-16 pt-8 border-t border-border/30">
        <h2 class="text-3xl md:text-4xl font-bold text-text-primary mb-12 flex items-center gap-3">
          <span class="w-1.5 h-8 bg-gradient-to-b from-accent to-accent/50 rounded-full"></span>
          {{ locale === 'tr' ? 'Yetenekler' : 'Skills' }}
        </h2>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="category in skillsGrouped" :key="category.name" class="relative overflow-hidden bg-surface/30 backdrop-blur-md border border-border/50 rounded-2xl p-6 shadow-xl transition-all duration-300 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 group">
            <div class="absolute inset-0 bg-gradient-to-br from-text-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div class="relative z-10">
              <h3 class="text-lg font-bold text-text-primary mb-6 pb-2 border-b border-border/10 flex items-center justify-between">
                {{ category.name }}
                <span class="text-xs font-normal text-text-muted px-2 py-0.5 rounded bg-surface-elevated/50">
                  {{ category.items.length }}
                </span>
              </h3>
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="item in category.items"
                  :key="item.name"
                  class="group/item relative inline-flex items-center gap-2 px-3 py-1.5 bg-surface-elevated/30 border border-border/30 rounded-lg hover:bg-surface-elevated hover:border-accent/40 transition-all duration-300"
                >
                  <span class="text-sm font-medium text-text-secondary group-hover/item:text-text-primary transition-colors">{{ item.name }}</span>
                  <span
                    v-if="item.level"
                    :class="[
                      'w-1.5 h-1.5 rounded-full',
                      item.level === 'Advanced' || item.level === 'İleri' ? 'bg-emerald-400' : 
                      item.level === 'Intermediate' || item.level === 'Orta' ? 'bg-yellow-400' : 'bg-blue-400'
                    ]"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!experiencesNormalized || experiencesNormalized.length === 0" class="mt-16 pt-8 border-t border-border/30">
        <p class="text-center text-text-muted">{{ locale === 'tr' ? 'Deneyim verisi bulunamadı' : 'No experience data found' }}</p>
      </div>

      <div v-if="!skillsGrouped || skillsGrouped.length === 0" class="mt-16 pt-8 border-t border-border/30">
        <p class="text-center text-text-muted">{{ locale === 'tr' ? 'Yetenek verisi bulunamadı' : 'No skills data found' }}</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const props = defineProps<{
  locale?: string;
}>();

const locale = props.locale || 'en';

const profile = ref<any>(null);
const experiences = ref<any[]>([]);
const skills = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

// Helper functions
function pickLocale(obj: any, loc: string = locale, fallback: string = 'en'): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  return obj[loc] ?? obj[fallback] ?? '';
}

function pickArray(obj: any, loc: string = locale, fallback: string = 'en'): any[] {
  if (Array.isArray(obj)) return obj;
  if (!obj) return [];
  return obj[loc] ?? obj[fallback] ?? [];
}

// Computed normalized data
const profileTitle = computed(() => pickLocale(profile.value?.title));
const profileSummary = computed(() => pickLocale(profile.value?.summary));
const profileLocation = computed(() => pickLocale(profile.value?.location));

const experiencesNormalized = computed(() => {
  return experiences.value.map((e: any) => ({
    ...e,
    roleText: pickLocale(e.role),
    locationText: pickLocale(e.location),
    periodText: getPeriodText(e.period),
    bulletsText: pickArray(e.bullets),
  }));
});

const skillsGrouped = computed(() => {
  const grouped: Record<string, Array<{ name: string; level?: string }>> = {};
  
  skills.value.forEach((skill: any) => {
    const category = pickLocale(skill.category) || 'Other';
    if (!grouped[category]) {
      grouped[category] = [];
    }

    const contentArr = Array.isArray(skill.content) 
      ? skill.content 
      : pickArray(skill.content);

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

  return Object.keys(grouped)
    .sort()
    .map((category) => ({
      name: category,
      items: grouped[category],
    }));
});

function getPeriodText(period: any): string {
  if (!period) return '';
  if (typeof period === 'string') return period;
  
  const start = period.start || '';
  const end = pickLocale(period.end) || period.end || (locale === 'tr' ? 'Mevcut' : 'Present');
  
  return start && end ? `${start} – ${end}` : start || end;
}

onMounted(async () => {
  console.info('[MF] Vue About mounted');
  
  try {
    const url = (window as any).__SUPABASE_URL__;
    const key = (window as any).__SUPABASE_ANON_KEY__;
    
    if (!url || !key) {
      throw new Error('Supabase config missing on window globals');
    }

    const supabase = createClient(url, key);

    const [profileRes, expsRes, skillsRes] = await Promise.all([
      supabase.from('profile').select('*').single(),
      supabase.from('experiences').select('*').order('order_index', { ascending: true }),
      supabase.from('skills').select('*').order('order_index', { ascending: true }),
    ]);

    if (profileRes.error) throw profileRes.error;

    profile.value = profileRes.data;
    experiences.value = expsRes.data ?? [];
    skills.value = skillsRes.data ?? [];
    loading.value = false;
  } catch (e: any) {
    error.value = e?.message ?? String(e);
    loading.value = false;
  }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

:host {
  display: block;
  font-family: inherit;
  line-height: inherit;
  color: inherit;
}
</style>
