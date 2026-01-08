<script lang="ts">
  import { onMount } from 'svelte';
  import { createClient, SupabaseClient } from '@supabase/supabase-js';

  export let supabaseUrl: string;
  export let supabaseAnon: string;
  export let locale: string = 'en';

  let profile: any = null;
  let experiences: any[] = [];
  let skills: any[] = [];
  let loading = true;
  let error: string | null = null;
  let supabase: SupabaseClient | null = null;

  const validLocale = locale === 'tr' ? 'tr' : 'en';

  onMount(async () => {
    if (!supabaseUrl || !supabaseAnon) {
      error = 'Missing Supabase configuration';
      loading = false;
      return;
    }

    supabase = createClient(supabaseUrl, supabaseAnon);
    await loadData();
  });

  async function loadData() {
    if (!supabase) return;

    try {
      const [profileRes, experiencesRes, skillsRes] = await Promise.all([
        supabase.from('profile').select('*').single(),
        supabase.from('experiences').select('*').order('order_index', { ascending: true }),
        supabase.from('skills').select('*').order('category', { ascending: true }).order('order_index', { ascending: true }),
      ]);

      if (profileRes.error) {
        error = 'Error loading profile data';
        loading = false;
        return;
      }

      profile = profileRes.data;
      experiences = experiencesRes.data || [];
      skills = skillsRes.data || [];
      loading = false;
    } catch (err) {
      error = 'Failed to load data';
      loading = false;
    }
  }

  function getTitle(): string {
    return profile?.title?.[validLocale] || profile?.title?.en || '';
  }

  function getSummary(): string {
    return profile?.summary?.[validLocale] || profile?.summary?.en || '';
  }

  function getLocation(): string {
    return profile?.location?.[validLocale] || profile?.location?.en || '';
  }

  function getRole(exp: any): string {
    return exp.role?.[validLocale] || exp.role?.en || '';
  }

  function getExpLocation(exp: any): string {
    return exp.location?.[validLocale] || exp.location?.en || '';
  }

  function getPeriod(exp: any): string {
    const start = exp.period?.start || '';
    let end = '';
    if (typeof exp.period?.end === 'string') {
      end = exp.period.end;
    } else if (exp.period?.end) {
      end = exp.period.end[validLocale] || exp.period.end.en;
    } else {
      end = validLocale === 'en' ? 'Present' : 'Mevcut Durum';
    }
    return `${start} – ${end}`;
  }

  function getBullets(exp: any): string[] {
    return exp.bullets?.[validLocale] || exp.bullets?.en || [];
  }

  function getGroupedSkills(): Array<{ name: string; items: Array<{ name: string; level?: string }> }> {
    const grouped: Record<string, Array<{ name: string; level?: string }>> = {};
    
    skills.forEach((skill) => {
      if (!skill.content || typeof skill.content !== 'object') return;
      const items = skill.content[validLocale] || skill.content.en || [];
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

<div class="max-w-4xl mx-auto px-6 py-12">
  <div class="mb-8">
    <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
      This page is implemented with Svelte
    </span>
  </div>

  {#if loading}
    <div class="text-center py-12">
      <p class="text-gray-600">Loading...</p>
    </div>
  {/if}

  {#if error}
    <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-600">{error}</p>
    </div>
  {/if}

  {#if profile && !loading && !error}
    <div class="space-y-6">
      <div>
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {profile.name}
        </h1>
        <p class="text-xl text-gray-600 mb-6">
          {getTitle()}
        </p>
      </div>
      <div class="max-w-3xl">
        <p class="text-base md:text-lg text-gray-700 leading-relaxed">
          {getSummary()}
        </p>
      </div>
      <div class="pt-2">
        <p class="text-sm text-gray-500">{getLocation()}</p>
      </div>
    </div>

    {#if experiences && experiences.length > 0}
      <div class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {validLocale === 'tr' ? 'Deneyim' : 'Experience'}
        </h2>
        <div class="space-y-10">
          {#each experiences as exp (exp.id || exp)}
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900">{exp.company}</h3>
                <p class="text-lg text-gray-700 mt-1">{getRole(exp)}</p>
                <p class="text-sm text-gray-500 mt-1">{getExpLocation(exp)}</p>
                <p class="text-sm text-gray-500 mt-1">{getPeriod(exp)}</p>
              </div>
              {#if getBullets(exp).length > 0}
                <ul class="ml-4 space-y-2 mt-4">
                  {#each getBullets(exp) as bullet}
                    <li class="text-gray-700 flex items-start">
                      <span class="text-teal-500 mr-2">•</span>
                      <span>{bullet}</span>
                    </li>
                  {/each}
                </ul>
              {/if}
              {#if exp.tech && exp.tech.length > 0}
                <div class="mt-4 flex flex-wrap gap-2">
                  {#each exp.tech as tech}
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      {tech}
                    </span>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    {/if}

    {#if skills && skills.length > 0}
      <div class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {validLocale === 'tr' ? 'Yetenekler' : 'Skills'}
        </h2>
        <div class="space-y-8">
          {#each getGroupedSkills() as category}
            <div class="space-y-4">
              <h3 class="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                {category.name}
              </h3>
              <div class="flex flex-wrap gap-3">
                {#each category.items as item}
                  <div class="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                    <span class="text-sm font-medium text-gray-900">{item.name}</span>
                    {#if item.level}
                      <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border bg-blue-100 text-blue-800 border-blue-200">
                        {item.level}
                      </span>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
  }
</style>


