import React from 'react'
import { FaShieldHalved } from 'react-icons/fa6'

function CodeInput({codeRef, setCode, code}) {
  return (
    <div className="input-group">
        <FaShieldHalved />
        <input
            type="text"
            className="input"
            name="code"
            ref={codeRef}
            autoComplete="off"
            onChange={(e) => setCode(e.target.value)}
            value={code}
            placeholder="Enter 6-digit verification code"
        />
    </div>
  )
}

export default CodeInput