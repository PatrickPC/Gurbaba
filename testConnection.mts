// testConnection.ts

import { supabase } from './src/integrations/supabase/Client'; 
 
async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from('news_articles') // Replace with an actual table name
    .select('*')
    .limit(1);

  if (error) {
    console.error('Connection failed:', error.message);
  } else {
    console.log('Connection successful. Sample data:', data);
  }
}

testSupabaseConnection();
