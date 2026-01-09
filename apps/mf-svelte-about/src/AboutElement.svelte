<script>
  import { onMount } from 'svelte';
  import { createClient } from '@supabase/supabase-js';

  export let locale = 'en';

  let loading = true;
  let error = null;
  let profile = null;
  let experiences = [];
  let skills = [];

  // Helper functions
  function pickLocale(obj, loc = locale, fallback = 'en') {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[loc] ?? obj[fallback] ?? '';
  }

  function pickArray(obj, loc = locale, fallback = 'en') {
    if (Array.isArray(obj)) return obj;
    if (!obj) return [];
    return obj[loc] ?? obj[fallback] ?? [];
  }

  function getPeriodText(period) {
    if (!period) return '';
    if (typeof period === 'string') return period;
    
    const start = period.start || '';
    const end = pickLocale(period.end) || period.end || (locale === 'tr' ? 'Mevcut' : 'Present');
    
    return start && end ? `${start} – ${end}` : start || end;
  }

  // Normalized data
  let profileTitle = '';
  let profileSummary = '';
  let profileLocation = '';
  let experiencesNormalized = [];
  let skillsGrouped = [];

  function normalizeData() {
    profileTitle = pickLocale(profile?.title);
    profileSummary = pickLocale(profile?.summary);
    profileLocation = pickLocale(profile?.location);

    experiencesNormalized = experiences.map(e => ({
      ...e,
      roleText: pickLocale(e.role),
      locationText: pickLocale(e.location),
      periodText: getPeriodText(e.period),
      bulletsText: pickArray(e.bullets),
    }));

    const grouped = {};
    skills.forEach(skill => {
      const category = skill.category || 'Other';
      if (!grouped[category]) {
        grouped[category] = [];
      }

      const contentArr = Array.isArray(skill.content) 
        ? skill.content 
        : pickArray(skill.content);

      contentArr.forEach(item => {
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

    skillsGrouped = Object.keys(grouped)
      .sort()
      .map(category => ({
        name: category,
        items: grouped[category],
      }));
  }

  onMount(async () => {
    console.info('[MF] Svelte About mounted');
    
    try {
      const url = window.__SUPABASE_URL__;
      const key = window.__SUPABASE_ANON_KEY__;
      
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

      profile = profileRes.data;
      experiences = expsRes.data || [];
      skills = skillsRes.data || [];
      
      normalizeData();
      loading = false;
    } catch (e) {
      error = e?.message ?? String(e);
      loading = false;
    }
  });
</script>

<div class="max-w-4xl mx-auto px-6 py-12">
  <div class="mb-8">
    <span class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
      This view is rendered using Svelte (Compiled Component)
    </span>
    <p class="mt-2 text-sm text-gray-600">
      This view consumes live data from Supabase and is mounted independently from the Next.js shell.
    </p>
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
          {profileTitle}
        </p>
      </div>
      <div class="max-w-3xl">
        <p class="text-base md:text-lg text-gray-700 leading-relaxed">
          {profileSummary}
        </p>
      </div>
      <div class="pt-2">
        <p class="text-sm text-gray-500">{profileLocation}</p>
      </div>
    </div>

    {#if experiencesNormalized && experiencesNormalized.length > 0}
      <div class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {locale === 'tr' ? 'Deneyim' : 'Experience'}
        </h2>
        <div class="space-y-10">
          {#each experiencesNormalized as exp (exp.id || exp)}
            <div class="space-y-4">
              <div>
                <h3 class="text-xl font-bold text-gray-900">{exp.company}</h3>
                <p class="text-lg text-gray-700 mt-1">{exp.roleText}</p>
                <p class="text-sm text-gray-500 mt-1">{exp.locationText}</p>
                <p class="text-sm text-gray-500 mt-1">{exp.periodText}</p>
              </div>
              {#if exp.bulletsText && exp.bulletsText.length > 0}
                <ul class="ml-4 space-y-2 mt-4">
                  {#each exp.bulletsText as bullet}
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

    {#if skillsGrouped && skillsGrouped.length > 0}
      <div class="mt-12 pt-8 border-t border-gray-200">
        <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          {locale === 'tr' ? 'Yetenekler' : 'Skills'}
        </h2>
        <div class="space-y-8">
          {#each skillsGrouped as category}
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

    {#if !experiencesNormalized || experiencesNormalized.length === 0}
      <div class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-center text-gray-500">{locale === 'tr' ? 'Deneyim verisi bulunamadı' : 'No experience data found'}</p>
      </div>
    {/if}

    {#if !skillsGrouped || skillsGrouped.length === 0}
      <div class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-center text-gray-500">{locale === 'tr' ? 'Yetenek verisi bulunamadı' : 'No skills data found'}</p>
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
