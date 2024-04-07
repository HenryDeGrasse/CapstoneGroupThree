import React, { useState } from 'react';
import { useNavigate,Navigate } from 'react-router-dom';
import { useGameSettings } from '../GameSettingProvider';
import { formStyle , formGroup} from './login';
import { LandingStyle } from './LandingPage';
import { TitleDesign } from './Main';
import axios from 'axios';
import { HOST } from '../App';
interface UserFormProps {
    onCreate: () => void;
  }
function UserForm({onCreate}:UserFormProps) {
    const {setUserData,userData,userName}=useGameSettings()
    const navigate = useNavigate();
    let userID:number; 
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
            
        });
    };

     const handleSubmit = async (e:any) => {
        
        // try{
        //     const resp:any= await axios.get(`http://${HOST}:1337/api/users?filters[username][$eq]=${userName}`)
        //     userID=resp.data[0].id
        
           
            
        // }
        // catch(error){
        //     console.log(error)

        // }
        // try{
        //     const data ={
        //         "userDatas": {
        //           "firstname": userData.firstname,
        //           "lastname": userData.lastname,
        //           "address": userData.address,
        //           "preferredRoomTemperature": userData.preferredRoomTemperature,
        //           "sleepTime": userData.sleepTime,
        //           "wakeTime": userData.wakeTime,
        //           "awayDTime": userData.awayDTime,
        //           "awayATime": userData.awayATime,
        //           "arrivalTemperature": userData.arrivalTemperature
        //         }
        //       }
              
        //     const up:any= await axios.put(`http://${HOST}:1337/api/users/${userID}`,data)
       
        //    onCreate(userName);
        onCreate()
            
        //     navigate('/home')
        // }
        // catch(error){
        //     console.log(error)
        // }
       
        console.log('Form data submitted:', userData);
    };

    return (
        <div  style={{ width: '100vw', 
        height: '100vh', 
        backgroundColor: '#122701', 
        display: 'flex', 
        alignItems: 'center', 
        flexDirection: 'column', 
        justifyContent: 'center',}}>
        <h1 style={{ color: 'white', padding:'10px 0' ,fontSize: "14px",...TitleDesign }}> User Settings</h1>
        <form style={{alignItems:'stretch',  justifyContent:'space-between',display:'flex',flexDirection:'column', padding:'0 15vh '}}onSubmit={handleSubmit}>
           <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                First Name:
                <input style={{flexGrow:'1'}}type="text" name="firstname" value={userData.firstname} onChange={handleChange} />
            </label>
            </div>
            <br />
            <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                Last Name:
                <input style={{flexGrow:'1'}}type="text" name="lastname" value={userData.lastname} onChange={handleChange} />
            </label>
            </div>
            <br />
            <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                Address:
                <input style={{flexGrow:'1'}}type="text" name="address" value={userData.address} onChange={handleChange} />
            </label>
            </div>
            <br />
            <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                Preferred Room Temperature:
                <input style={{flexGrow:'1' }}type="text" name="preferredRoomTemperature" value={userData.preferredRoomTemperature} onChange={handleChange} />
            </label>
            </div>
            <br />
            <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                Sleep Time:
                <input style={{flexGrow:'1'}} type="time" name="sleepTime" value={userData.sleepTime} onChange={handleChange} />
            </label>
            </div>
            <br />
            <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                Wake Time:
                <input style={{flexGrow:'1'}} type="time" name="wakeTime" value={userData.wakeTime} onChange={handleChange} />
            </label>
            </div>
            <br />
            <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                Away departure time:
                <input style={{flexGrow:'1'}}type="time" name="awayDTime" value={userData.awayDTime} onChange={handleChange} />
            </label>
            </div>
            <br />
            <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                Away arrival time:
                <input style={{flexGrow:'1'}}type="time" name="awayATime" value={userData.awayATime} onChange={handleChange} />
            </label>
            </div>
            <br />
            <div className="form-group"style={formGroup}>
            <label style={labelStyle}>
                Arrival Temperature:
                <input style={{flexGrow:'1'}}type="text" name="arrivalTemperature" value={userData.arrivalTemperature} onChange={handleChange} />
            </label>
            </div>

            <br />
            <button onClick={handleSubmit} type="submit">Submit</button>

        </form>
        </div>
  

    );
}
const labelStyle={width:'100%',gap:'5px',  alignItems:'center',display:'flex',color: 'white', fontSize: "12px",...TitleDesign }


export default UserForm;
