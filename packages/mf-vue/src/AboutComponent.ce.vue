<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <div class="mb-8">
      <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
        This page is implemented with Vue
      </span>
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

      <div v-if="experiences && experiences.length > 0" class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {{ validLocale === 'tr' ? 'Deneyim' : 'Experience' }}
        </h2>
        <div class="space-y-10">
          <div v-for="exp in experiences" :key="exp.id || exp" class="space-y-4">
            <div>
              <h3 class="text-xl font-bold text-gray-900">{{ exp.company }}</h3>
              <p class="text-lg text-gray-700 mt-1">{{ getRole(exp) }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ getExpLocation(exp) }}</p>
              <p class="text-sm text-gray-500 mt-1">{{ getPeriod(exp) }}</p>
            </div>
            <ul v-if="getBullets(exp).length > 0" class="ml-4 space-y-2 mt-4">
              <li v-for="(bullet, idx) in getBullets(exp)" :key="idx" class="text-gray-700 flex items-start">
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

      <div v-if="skills && skills.length > 0" class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {{ validLocale === 'tr' ? 'Yetenekler' : 'Skills' }}
        </h2>
        <div class="space-y-8">
          <div v-for="category in getGroupedSkills()" :key="category.name" class="space-y-4">
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const props = defineProps<{
  supabaseUrl?: string;
  supabaseAnon?: string;
  locale?: string;
}>();

const profile = ref<any>(null);
const experiences = ref<any[]>([]);
const skills = ref<any[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const supabase = ref<SupabaseClient | null>(null);

const validLocale = computed(() => (props.locale === 'tr' ? 'tr' : 'en'));

onMounted(async () => {
  if (!props.supabaseUrl || !props.supabaseAnon) {
    error.value = 'Missing Supabase configuration';
    loading.value = false;
    return;
  }

  supabase.value = createClient(props.supabaseUrl, props.supabaseAnon);
  await loadData();
});

async function loadData() {
  if (!supabase.value) return;

  try {
    const [profileRes, experiencesRes, skillsRes] = await Promise.all([
      supabase.value.from('profile').select('*').single(),
      supabase.value.from('experiences').select('*').order('order_index', { ascending: true }),
      supabase.value.from('skills').select('*').order('category', { ascending: true }).order('order_index', { ascending: true }),
    ]);

    if (profileRes.error) {
      error.value = 'Error loading profile data';
      loading.value = false;
      return;
    }

    profile.value = profileRes.data;
    experiences.value = experiencesRes.data || [];
    skills.value = skillsRes.data || [];
    loading.value = false;
  } catch (err) {
    error.value = 'Failed to load data';
    loading.value = false;
  }
}

function getTitle(): string {
  return profile.value?.title?.[validLocale.value] || profile.value?.title?.en || '';
}

function getSummary(): string {
  return profile.value?.summary?.[validLocale.value] || profile.value?.summary?.en || '';
}

function getLocation(): string {
  return profile.value?.location?.[validLocale.value] || profile.value?.location?.en || '';
}

function getRole(exp: any): string {
  return exp.role?.[validLocale.value] || exp.role?.en || '';
}

function getExpLocation(exp: any): string {
  return exp.location?.[validLocale.value] || exp.location?.en || '';
}

function getPeriod(exp: any): string {
  const start = exp.period?.start || '';
  let end = '';
  if (typeof exp.period?.end === 'string') {
    end = exp.period.end;
  } else if (exp.period?.end) {
    end = exp.period.end[validLocale.value] || exp.period.end.en;
  } else {
    end = validLocale.value === 'en' ? 'Present' : 'Mevcut Durum';
  }
  return `${start} – ${end}`;
}

function getBullets(exp: any): string[] {
  return exp.bullets?.[validLocale.value] || exp.bullets?.en || [];
}

function getGroupedSkills(): Array<{ name: string; items: Array<{ name: string; level?: string }> }> {
  const grouped: Record<string, Array<{ name: string; level?: string }>> = {};
  
  skills.value.forEach((skill) => {
    if (!skill.content || typeof skill.content !== 'object') return;
    const items = skill.content[validLocale.value] || skill.content.en || [];
    if (!Array.isArray(items)) return;
    
    if (!grouped[skill.category]) {
      grouped[skill.category] = [];
    }
    items.forEach((item: any) => {
      grouped[skill.category].push({
        name: item.name,
        level: item.level,
      });
    });
  });

  return Object.keys(grouped)
    .sort()
    .map((category) => ({
      name: category,
      items: grouped[category],
    }));
}
</script>


