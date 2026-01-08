export const environment = {
  supabaseUrl: (typeof window !== 'undefined' && (window as any).__SUPABASE_URL__) || '',
  supabaseAnonKey: (typeof window !== 'undefined' && (window as any).__SUPABASE_ANON_KEY__) || '',
};


