import React, { useEffect, useState } from 'react'
import './SignUp.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function SignUp({propUpdater,heading,midHeading,warning,buttonText,placeHolder}) {
  const navigate = useNavigate();
  const [localUsername,setLocalUsername] = useState('')
  const [localLevel,setLocalLevel] = useState('')
  const [localWon,setLocalWon] = useState('')
  const [localLost,setLocalLost] = useState('')
  const [localDraw,setLocalDraw] = useState('')
  const [loading,setLoading] = useState(false)

  useEffect(()=>{

    if (localStorage.getItem('username')){
      propUpdater({heading:'Sign Up',midHeading:'Username',warning:'Username must be unique',buttonText:'Enter',placeHolder:'Enter Username 2-15'})
      navigate('/home')
    }
  },[])




  // ############################# All Variables ################################
  const [InputValue,setInputValue] = useState('');
  const [InputValuePassword,setInputValuePassword] = useState('');
  const [warningMarginRight,setWarningMarginRight] = useState(false)
  const [username,setUsername] = useState('');
  const [onLoginpage,setOnLoginPage] = useState(false);


// ############################### ALL FUNCTIONS ################################
  const loginPageLoader = ()=>{
    propUpdater({heading:'Login',midHeading:'Username',warning:'',buttonText:'Enter',placeHolder:'Enter Username'})
    setOnLoginPage(true)
    setInputValue('')
  } 

  const signUpPageloader = ()=>{
    propUpdater({heading:'Sign Up',midHeading:'Username',warning:'Username must be unique',buttonText:'Enter',placeHolder:'Enter Username 2-15'})
    setOnLoginPage(false)
  }

  const storeData = (usernameValue,passwordValue)=>{
    setLoading(true)
    fetch('https://Qasim2.pythonanywhere.com/DataStoring',{
        method:'POST',
        headers:{'content-type':'application/json',
      },
      body:JSON.stringify({username:usernameValue,password:passwordValue})
      })
      .then(Response => Response.json())
      .then(data => {
        setLoading(false)
        localStorage.setItem('username',data[1])
        localStorage.setItem('level',data[3])
        localStorage.setItem('won',data[4])
        localStorage.setItem('draw',data[5])
        localStorage.setItem('lost',data[6])
        propUpdater({heading:'Sign Up',midHeading:'Username',warning:'Username must be unique',buttonText:'Enter',placeHolder:'Enter Username 2-15'})
        navigate('/home')
      })
  }

  const back = ()=>{
    if(warningMarginRight===true){
      propUpdater({heading:'Sign Up',midHeading:'Username',warning:'Username must be unique',buttonText:'Enter',placeHolder:'Enter Username 2-15'})
      setWarningMarginRight(false)
      setInputValue('')
    }
  }

  const valueUpdater = (e)=>{
    setInputValue(e.target.value)
  }
  const ValueUpdaterPassword = (e)=>{
    setInputValuePassword(e.target.value)
  }


  const submitChecker = (e)=>{
    if(onLoginpage === true){
      setLoading(true)
      fetch('https://Qasim2.pythonanywhere.com/CheckUser',{
          method:'POST',
          headers:{'content-type':'application/json',
        },
        body:JSON.stringify({username:InputValue,password:InputValuePassword})
        })
        .then(Response => Response.json())
        .then(data => {
          setLoading(false)
          if(data === 0){
            propUpdater({heading:'Login',midHeading:'Username',buttonText:'Enter',placeHolder:'Enter Username',warning:'Username Does Not Exists'})
          }else if(data === 1){
            propUpdater({heading:'Login',midHeading:'Username',buttonText:'Enter',placeHolder:'Enter Username',warning:'Password Didn\'t matched'})
          }else{
            localStorage.setItem('username',data[1])
            localStorage.setItem('level',data[3])
            localStorage.setItem('won',data[4])
            localStorage.setItem('draw',data[5])
            localStorage.setItem('lost',data[6])
            propUpdater({heading:'Sign Up',midHeading:'Username',warning:'Username must be unique',buttonText:'Enter',placeHolder:'Enter Username 2-15'})
            navigate('/home')
          }
        })
    }else{
      if(((InputValue.length<=2)||(InputValue.length>15))&&(warningMarginRight===false)){
        propUpdater({warning:'Invalid Username', heading:'Sign Up',midHeading:'Username',buttonText:'Enter',placeHolder:'Enter Username 2-15'})
      }else if((((InputValue.length<=2)||(InputValue.length>15))&&(warningMarginRight===true))){
        propUpdater({warning:'Invalid Password',heading:'Set Password',midHeading:'Password',buttonText:'Verify',placeHolder:'Enter Password...'})
      }
      else if(warningMarginRight === false){
        setLoading(true)
        fetch('https://Qasim2.pythonanywhere.com/usernameChecker',{
          method:'POST',
          headers:{'content-type':'application/json',
        },
        body:JSON.stringify(InputValue)
        })
        .then(Response => Response.json())
        .then(data => {
          setLoading(false)
          console.log(data+"username exists or not")
          if(data === true){
            propUpdater({warning:'Username Already Exists', heading:'Sign Up',midHeading:'Username',buttonText:'Enter',placeHolder:'Enter Username 2-15'})
          }else{
            propUpdater({heading:'Set Password',midHeading:'Password',warning:'Password Should Have Numbers',buttonText:'Verify',placeHolder:'Enter Password...'})
            setUsername(InputValue)
            setWarningMarginRight(true)
            setInputValue('')
          }
        })
      }else if(warningMarginRight === true){
        storeData(username,InputValue)
      }
    }
    
    

  }
  return (
    <>
    <div className="background">
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/>
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    <FontAwesomeIcon icon={faHashtag} className='hashtag'/> 
    </div>
    <div className="signUpForm">
      <h2 className='heading'>{heading}</h2>

      <label htmlFor="username" className='username'>{midHeading}</label>
      <input type = {heading ==='Set Password'?'password':'text'} name="username" id="username" placeholder= {placeHolder}  onChange={valueUpdater} value={InputValue} />
      <h2  className="warning">{warning}</h2>

      <label htmlFor="username" className='password' style={{display:onLoginpage?'block':'none'}} >Password</label>
      <input value={InputValuePassword} style={{display:onLoginpage?'block':'none'}} type = 'password'  placeholder= 'Enter Password' onChange={ValueUpdaterPassword} />

      
      <button className='btn submit-button' onClick={submitChecker}>{buttonText}</button>
      <button onClick={back} className="btn back">Back</button>
      <p className='login-link'  onClick={onLoginpage?signUpPageloader:loginPageLoader} >{onLoginpage?'Click Here To Sign Up':'Already have an Account? Click here to Login'}</p>
    </div>
    <div style={{display:loading?'block':'none'}} className="loading"><div className="circle"></div></div>
    </>
    )
  };

  
