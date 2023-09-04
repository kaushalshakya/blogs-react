import React, { useState } from 'react'

const Input = ({type, label, value, name, placeholder}) => {
    const [initialValue, setInitialValue] = useState(value || '');
  return (
    <>
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input type = {type} value={initialValue} name={name} className="input input-bordered w-full max-w-xs" placeholder={placeholder} onChange={(e) => setInitialValue(e.target.initialValuealue)} />
    </>
  )
}

export default Input