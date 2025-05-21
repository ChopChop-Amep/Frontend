import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './EditProfileModal.css'
import { supabase } from './utiles/Authenticator.jsx'

function EditProfileModal ({Close}) {
    const token = localStorage.getItem('authToken'); // Cambia 'authToken' por el nombre de tu token
    const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null; // Decodifica el token JWT

    const [formData, setFormData] = useState({
        name: decodedToken.user_metadata?.name || '',
        surname: decodedToken.user_metadata?.surname || '',
        nif: decodedToken.user_metadata?.nif || '',
        email: decodedToken.user_metadata?.email || ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
            if (!supabaseUrl) {
                alert('Supabase URL is not defined');
                return;
            }
            const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
            if (!supabaseAnonKey) {
                alert('Supabase anon key is not defined');
                return;
            }
            const supabase = createClient(supabaseUrl, supabaseAnonKey);
            const { error } = await supabase.auth.updateUser({
                data: {
                    ...decodedToken.user_metadata,
                    ...formData
                }
            });
            if (!error) {
                alert('Profile updated!');
                Close();
            } else {
                alert(`Error updating profile: ${error.message}`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile MAX');
        }

        const { data: refreshedSession, error: refreshError } = await supabase.auth.refreshSession();
        if (!refreshError && refreshedSession && refreshedSession.session) {
            localStorage.setItem('authToken', refreshedSession.session.access_token);
            window.location.reload();
        } else if (refreshError) {
            alert('Profile updated, but failed to refresh session. Please log out and log in again.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h1> Edit your profile </h1>
                <form onSubmit={handleSubmit}>
                    <p className='header'>
                        Name/Brand Name:
                    </p>
                    <input
                        type="text"
                        name="name"
                        className='input-style-ep'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {decodedToken.user_metadata?.type === 'professional' && (
                        <>
                            <br />
                            <p className='header'>
                                Surname:
                            </p>
                            <input
                                type="text"
                                name="surname"
                                className='input-style-ep'
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                            <br />
                            <p className='header'>
                                NIF:
                            </p>
                            <input
                                type="text"
                                name="nif"
                                className='input-style-ep'
                                value={formData.nif}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    <br />
                    <br />
                    <button className='button-style-ep-close' type="button" onClick={Close}> Close</button>
                    <button className='button-style-ep-save' type="submit"> Save </button>
                </form>
            </div>
        </div>
    );
}
export default EditProfileModal