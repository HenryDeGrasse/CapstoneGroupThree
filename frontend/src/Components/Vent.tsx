import React, { useState } from 'react'
import './vents.css'
const paragraphStyles={
  color: '#FFFFFF',
  fontFamily: 'Inter',
  fontSize: '8px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '9px',
  padding: '5px'
}
const Slider: React.FC<{
  label: string
  value: number
  onChange: (value: number) => void
}> = ({ label, value, onChange }) => (
  < div className='vent-styles' >
    <p style={paragraphStyles} >
      {label}
    </p>
    <input
  className="slider"
  type="range"
  min="0"
  max="180"
  value={value}
  onChange={(event) => onChange(parseInt(event.target.value, 10))}
/>

    <p style={paragraphStyles}>{value}</p>
   
  </div>
)

const Vents: React.FC = () => {
  const [leftValue, setLeftValue] = useState<number>(50)
  const [rightValue, setRightValue] = useState<number>(50)

  return (
    <div className='vent'>
      <Slider label="up" value={leftValue} onChange={setLeftValue} />
      <Slider label="down" value={rightValue} onChange={setRightValue} />
    </div>
  )
}

export default Vents