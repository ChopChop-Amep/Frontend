import React from 'react';
import './EditProfileModal.css'

function EditProfileModal ({Close}) {
    return (
        <div className = "modal-overlay"> 
            <div className="modal-content"> 
                <h1> Edit your profile </h1>
                <form>
                    <p className='header'>
                        Name/Brand Name: 
                    </p>
                    <input type="text" name = "name" />
                    <br /> 
                    <p className='header'>
                        Email:
                    </p>
                    <input type = "email" name = "email" /> 
                    <br /> 
                    <br /> 
                    <button className='button-style-ep' type = "button" onClick={Close}> Close</button>
                    <br />
                    <br />
                    <button className='button-style-ep' type = "submit"> Save </button>
                </form>
            </div>
        </div>
    );
}
export default EditProfileModal