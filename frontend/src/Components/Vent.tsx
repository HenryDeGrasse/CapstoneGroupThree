import React, { useState } from 'react'
import './vents.css'
import { useGameSettings } from '../GameSettingProvider'
export const paragraphStyles: React.CSSProperties={
  color: '#FFFFFF',
  fontStyle: 'normal',
  padding: '5px 0px 0',
  fontSize: "9.5px",
  fontWeight: 500,
  lineHeight: "9.5px",
  flex: "1 0 0",
  textAlign:'center',
  fontFamily: "Inter",


}
const Slider: React.FC<{
  label1: string
  value: number
  label2: string
  onChange: (value: number) => void
}> = ({ label1,label2, value, onChange }) => (
  < div className='vent-styles'  >
    <p style={paragraphStyles} >
      {label1}
    </p>
    <input
  className="slider"
  type="range"
  min="0"
  max="100"
  value={value}
  onChange={(event) => onChange(parseInt(event.target.value, 10))}
/>

    <p style={paragraphStyles}>{label2}</p>
   
  </div>
)

const Vents: React.FC = () => {
  const {ventTop,setVentTop}=useGameSettings()
  // const [rightValue, setRightValue] = useState<number>(50)

  return (
    <div style={{paddingBottom:'30px', width:'100%'}}>
    <div className='vent'>
        <p style={paragraphStyles}> Degree: {ventTop}</p>
      <Slider label1="Close" label2='Open' value={ventTop} onChange={setVentTop} />
    
      {/* <Slider label="down" value={rightValue} onChange={setRightValue} /> */}
    </div>
    </div>
  )
}

export default Vents