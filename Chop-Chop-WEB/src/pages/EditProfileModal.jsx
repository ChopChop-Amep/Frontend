import React from 'react';
import './EditProfileModal.css'

function EditProfileModal ({Close}) {
    return (
        <div className = "modal-overlay"> 
            <div className="modal-content"> 
                <h2> Edit your profile</h2>
                <form>
                    <label className='header'>
                        Name/Brand Name: 
                        <input type="text" name = "name" />
                    </label>
                    <br /> 
                    <label>
                        email:
                        <input type = "email" name = "email" /> 
                    </label>
                    <br /> 
                   
                    <button type = "button" onClick={Close}> Close</button>
                    <button type = "submit"> Save </button>
                </form>
            </div>
        </div>
    );
}
export default EditProfileModal