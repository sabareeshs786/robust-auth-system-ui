import React, { useContext } from 'react'
import MfaRequestContext from '../context/MfaRequestContext'
import DropDownMenu from './DropDownMenu';
import SubmitButton from './SubmitButton';

function MfaRequestForm() {
    const {handleSubmit, selectedOption, handleSelectChange} = useContext(MfaRequestContext);
    const options = {"authApp": "Authenticator App", "email":"Email Address"}
  return (
    <form onSubmit={handleSubmit} className="form-body">
        <div>
            <label className="label" htmlFor="dropdown">Choose where you want to receive the verification code: </label>
            <div className="dropdown-container">
                <DropDownMenu options={options} selectedOption={selectedOption} handleSelectChange={handleSelectChange} />
            </div>
        </div>
        <div className="footer action-button-1">
            <SubmitButton content="Continue"/>
        </div>
    </form>
  )
}

export default MfaRequestForm