import React, { useState } from 'react'

const Input = ({type, value, name, placeholder}) => {
    const [initialValue, setInitialValue] = useState(value || '');
  return (
    <>
        <label htmlFor= {label}>{label}</label>
        <input type = {type} value={initialValue} name={name} placeholder={placeholder} onChange={(e) => setInitialValue(e.target.initialValuealue)} />
    </>
  )
}

export default Input