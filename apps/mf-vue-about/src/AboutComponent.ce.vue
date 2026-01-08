<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="mb-8">
      <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        This view is rendered using Vue (Microfrontend)
      </span>
      <p class="mt-2 text-sm text-gray-600">
        This view consumes live data from Supabase and is mounted independently from the Next.js shell.
      </p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <p class="text-gray-600">Loading...</p>
    </div>

    <div v-if="error" class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <template v-if="profile && !loading && !error">
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

      <div v-if="experiencesNormalized && experiencesNormalized.length > 0" class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {{ locale === 'tr' ? 'Deneyim' : 'Experience' }}
        </h2>
        <div class="space-y-10">
          <div v-for="exp in experiencesNormalized" :key="exp.id || exp" class="space-y-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ exp.company }}</h3>
              <p class="text-lg text-gray-700 mt-1">{{ exp.roleText }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ exp.locationText }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ exp.periodText }}</p>
            </div>
            <ul v-if="exp.bulletsText && exp.bulletsText.length > 0" class="ml-4 space-y-2 mt-4">
              <li v-for="(bullet, idx) in exp.bulletsText" :key="idx" class="text-gray-700 flex items-start">
                <span class="text-teal-500 mr-2">•</span>
                <span>{{ bullet }}</span>
              </li>
            </ul>
            <div v-if="exp.tech && exp.tech.length > 0" class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="(tech, idx) in exp.tech"
                :key="idx"
                class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="skillsGrouped && skillsGrouped.length > 0" class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {{ locale === 'tr' ? 'Yetenekler' : 'Skills' }}
        </h2>
        <div class="space-y-8">
          <div v-for="category in skillsGrouped" :key="category.name" class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
              {{ category.name }}
            </h3>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="item in category.items"
                :key="item.name"
                class="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
              >
                <span class="text-sm font-medium text-gray-900">{{ item.name }}</span>
                <span
                  v-if="item.level"
                  class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200"
                >
                  {{ item.level }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!experiencesNormalized || experiencesNormalized.length === 0" class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-center text-gray-500">{{ locale === 'tr' ? 'Deneyim verisi bulunamadı' : 'No experience data found' }}</p>
      </div>

      <div v-if="!skillsGrouped || skillsGrouped.length === 0" class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-center text-gray-500">{{ locale === 'tr' ? 'Yetenek verisi bulunamadı' : 'No skills data found' }}</p>
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
    const category = skill.category || 'Other';
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
