import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Usa la URL de Supabase
// Asegúrate de que la URL y la clave de rol de servicio estén definidas en tu archivo .env
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY; // Usa la clave de rol de servicio de Supabase
// Asegúrate de que la clave de rol de servicio esté definida en tu archivo .env

console.log('supabaseUrl:', supabaseUrl);
console.log('supabaseKey:', supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  throw new Error('supabaseUrl and supabaseKey are required.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
