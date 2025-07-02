// pages/TestSupabase.tsx (if using React)
import { useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export default function TestSupabase() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from('news_articles') // Use your actual table name
        .select('*')
        .limit(1);

      if (error) {
        console.error('❌ Supabase connection failed:', error.message);
      } else {
        console.log('✅ Supabase connected. Sample data:', data);
      }
    }

    test();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Testing Supabase...</h1>
      <p>Check console (F12) for output.</p>
    </div>
  );
}
