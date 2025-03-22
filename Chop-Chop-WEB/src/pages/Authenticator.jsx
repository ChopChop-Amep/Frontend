import { createClient } from '@supabase/supabase-js';
import express from 'express';

const router = express.Router();

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // Usa la URL de Supabase
// Asegúrate de que la URL y la clave de rol de servicio estén definidas en tu archivo .env
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY; // Usa la clave de rol de servicio de Supabase
// Asegúrate de que la clave de rol de servicio esté definida en tu archivo .env

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({ message: 'Usuario creado con éxito', user });
  } catch (err) {
    console.error('Error en el registro:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;