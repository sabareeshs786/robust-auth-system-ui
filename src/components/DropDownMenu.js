import React from 'react'

function DropDownMenu({options, selectedOption, handleSelectChange}) {
  return (
    <select className="dropdown-input"  id="dropdown" value={selectedOption} onChange={handleSelectChange}>
        {Object.entries(options).map(([key, value]) => (
            <option className="option" key={key} value={key}>{value}</option>
        ))}
    </select>
  )
}

export default DropDownMenu