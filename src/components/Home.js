import React, { useEffect, useState } from 'react'
import './home.css'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'
import io from 'socket.io-client';



export default function Home() {
    const socket = io('https://Qasim2.pythonanywhere.com/')

    fetch('https://Qasim2.pythonanywhere.com/GetData',{
            method:'POST',
            headers:{'content-type':'application/json',
          },
          body:JSON.stringify(localStorage.getItem('username'))
          })
          .then(Response => Response.json())
          .then(data => {
            localStorage.setItem('MyID',data[0])
            localStorage.setItem('username',data[1])
            localStorage.setItem('password',data[2])
            localStorage.setItem('level',data[3])
            localStorage.setItem('won',data[4])
            localStorage.setItem('draw',data[5])
            localStorage.setItem('lost',data[6])
          })
    

    const [friendReqBox,setFriendReqBox] = useState(false)
    const [friendValue,setFriendValue] = useState('')
    const [senderUsername,setSenderUsername] = useState('')
    const [friendsSidebar,setFriendsSidebar] = useState(false)
    const [AllPlayersSidebar,setAllPlayersSidebar] = useState(false)
    const [showFriends,setShowFriends] = useState(false)
    const [showPending,setShowPending] = useState(false)
    const [showSent,setShowSent] = useState(false)
    const [allPlayersData,setAllPlayersData] = useState([])
    const [friendsData,setFriendsdata] = useState([])
    const [pendingArray,setPendingArray] = useState([])
    const [sentArray,setSentArray] = useState([])
    const [loading,setLoading] = useState(false)

    const AllPlayersInfo = ()=>{
        if(AllPlayersSidebar){
            setAllPlayersSidebar(false)
        }else{
            setFriendsSidebar(false)
            setAllPlayersSidebar(true)
            fetch('https://Qasim2.pythonanywhere.com/GetAllUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                // body:JSON.stringify({username:usernameValue,password:passwordValue})
            })
                .then(Response => Response.json())
                .then(data => {
                    const valueOfAllPlayers = Object.values(data)
                    const valueOfAllPlayersExceptMe =  valueOfAllPlayers.filter(name => name[1] !== localStorage.getItem('username'))
                    setAllPlayersData(valueOfAllPlayersExceptMe)
                })
    }
    }
    const SendRequestFromAllPlayers = (e)=>{
        const receiverFromAllPlayers = e.target.parentElement.parentElement.parentElement.querySelector(".heading").textContent
        socket.emit('game_req', {sender:localStorage.getItem('username'),receiver:receiverFromAllPlayers});
        e.target.style.border = '2px solid green'
        e.target.style.boxShadow = '0px 0px 10px green'
        e.target.style.backgroundColor = 'green'
    }
    const SendFriendRequest = (id,username,e) =>{
        setLoading(true)
        fetch('https://Qasim2.pythonanywhere.com/UpdateUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:username,id:localStorage.getItem('MyID'),stat:'pending'})
            })
        
        fetch('https://Qasim2.pythonanywhere.com/UpdateUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),id:id,stat:'sent'})
            })
            .then(Response => Response.json())
            .then(data => {
                setLoading(false)
                    if(data === 'done'){
                        e.target.style.border = '2px solid green'
                        e.target.style.boxShadow = '0px 0px 10px green'
                        e.target.style.backgroundColor = 'green'
                    }
                })
    }
    const Unfriend = (id,username,event)=>{
        fetch('https://Qasim2.pythonanywhere.com/RemoveUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),id:id,stat:'friend_ids'})
            })
        fetch('https://Qasim2.pythonanywhere.com/RemoveUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:username,id:localStorage.getItem('MyID'),stat:'friend_ids'})
            })
            .then(Response => Response.json())
            .then(data => {
                if(data === 'done'){
                    setFriendsSidebar(false)
                }
            })
    }
    const friendReqBoxShow = ()=>{
        if(friendsSidebar){
            setFriendsSidebar(false)
        }else{
            setFriendsSidebar(true)
            setAllPlayersSidebar(false)
            setShowFriends(true)
        }
    }
    const friendValueUpdater = (e)=>{
        setFriendValue(e.target.value)
    }
    const rejectRequest = ()=>{
        setSenderUsername('')
    }
    const acceptRequest = ()=>{
        socket.emit('JoinRoom',{sender:senderUsername,receiver:localStorage.getItem('username')});
    }
    const acceptFriendRequest = (id,username)=>{
        fetch('https://Qasim2.pythonanywhere.com/UpdateUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:username,id:localStorage.getItem('MyID'),stat:'friend_ids'})
            })
        
        fetch('https://Qasim2.pythonanywhere.com/RemoveUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:username,id:localStorage.getItem('MyID'),stat:'sent'})
            })
        
        fetch('https://Qasim2.pythonanywhere.com/UpdateUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),id:id,stat:'friend_ids'})
            })
        
        fetch('https://Qasim2.pythonanywhere.com/RemoveUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),id:id,stat:'pending'})
            })

            .then(Response => Response.json())
            .then(data => {
                setFriendsSidebar(false)
                setShowFriends(false)
                setShowPending(false)
                setShowSent(false)
            })
    }
    const removeFromSent = (id,username,e) =>{
    fetch('https://Qasim2.pythonanywhere.com/RemoveUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:username,id:localStorage.getItem('MyID'),stat:'pending'})
            })
    fetch('https://Qasim2.pythonanywhere.com/RemoveUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),id:id,stat:'sent'})
            })
            .then(Response => Response.json())
            .then(data => {
                setFriendsSidebar(false)
                setShowFriends(false)
                setShowPending(false)
                setShowSent(false)
            })
    }
    const declineFriendRequest = (id,username,e) =>{
        fetch('https://Qasim2.pythonanywhere.com/RemoveUserData',{
            method:'POST',
            headers:{'content-type':'application/json',
        },
            body:JSON.stringify({username:username,id:localStorage.getItem('MyID'),stat:'sent'})
        })
        fetch('https://Qasim2.pythonanywhere.com/RemoveUserData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),id:id,stat:'pending'})
            })
            .then(Response => Response.json())
            .then(data => {
                setFriendsSidebar(false)
                setShowFriends(false)
                setShowPending(false)
                setShowSent(false)
            })
    }
    const robot = ()=>{
        navigate('/bot')
    }
    

    useEffect(()=>{
        if(showFriends){
            fetch('https://Qasim2.pythonanywhere.com/GetFriendsData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),stat:-3})
            })
                .then(Response => Response.json())
                .then(data => {
                    setFriendsdata(data)
        })
        }else if(showPending){
            fetch('https://Qasim2.pythonanywhere.com/GetFriendsData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),stat:-2})
            })
                .then(Response => Response.json())
                .then(data => {
                    setPendingArray(data)
        })
        }else if(showSent){
            fetch('https://Qasim2.pythonanywhere.com/GetFriendsData',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify({username:localStorage.getItem('username'),stat:-1})
            })
                .then(Response => Response.json())
                .then(data => {
                    setSentArray(data)
        })
        }
        if(friendsSidebar === false){
            setShowFriends(false)
            setShowPending(false)
            setShowSent(false)
        }
    },[showFriends,showPending,showSent,friendsSidebar])

    useEffect(()=>{
        socket.on('JoinRoom',data =>{
            if(data[1] === localStorage.getItem('username')){
             localStorage.setItem('roomID',data[0])
             localStorage.setItem('opponent',data[2])
             navigate('/match')
            }else if(data[2] === localStorage.getItem('username')){
             localStorage.setItem('roomID',data[0])
             localStorage.setItem('opponent',data[1])
             navigate('/match')
            }
         })
    },[])
    useEffect(()=>{
        socket.on('game_req', data => {
            if(data[1] === localStorage.getItem('username')){
                setSenderUsername(data[0])
                console.log(senderUsername)
            }
        });

    },[])


    const sendRequest = (e)=>{
        setLoading(true)
        fetch('https://Qasim2.pythonanywhere.com/UserCheckForRequest',{
                method:'POST',
                headers:{'content-type':'application/json',
            },
                body:JSON.stringify(friendValue)
            })
            .then(Response => Response.json())
            .then(data => {
                setLoading(false)
                if(data){
                    setLoading(true)
                    fetch('https://Qasim2.pythonanywhere.com/UpdateUserData',{
                        method:'POST',
                        headers:{'content-type':'application/json',
                        },
                        body:JSON.stringify({username:data[1],id:localStorage.getItem('MyID'),stat:'pending'})
                    })
        
                    fetch('https://Qasim2.pythonanywhere.com/UpdateUserData',{
                        method:'POST',
                        headers:{'content-type':'application/json',
                        },
                        body:JSON.stringify({username:localStorage.getItem('username'),id:data[0],stat:'sent'})
                        }   )
                    .then(Response => Response.json())
                    .then(data => {
                        setLoading(false)
                    if(data === 'done'){
                        e.target.style.border = '2px solid green'
                        e.target.style.boxShadow = '0px 0px 10px green'
                        e.target.style.backgroundColor = 'green'
                    }
                })
                }else{
                    setFriendValue('Username Not Found')
                }
            })


        
    }
    

    const navigate = useNavigate();
    const LogOut = ()=>{
        localStorage.clear();
        navigate('/')
    }   
    


  return (
    <>
    <div className="navbar">
        <h2 className='username-on-header'>{localStorage.getItem('username')}</h2>
        <div className="score">
        <h2 className='matches-won'>{localStorage.getItem('won')} | </h2>
        <h2 className='matches-draw'>&nbsp;{localStorage.getItem('draw')}</h2>
        <h2 className='matches-lost'>&nbsp;|&nbsp;{localStorage.getItem('lost')} </h2>
        </div>
        <h2 className='level'>Level : {localStorage.getItem('level')}</h2>
    </div>
    <div className="hashbox">
        <div className="line1 line"></div>
        <div className="line2 line"></div>
        <div className="line3 line"></div>
        <div className="line4 line"></div>
        <div onClick={LogOut} className="log-out option-box"><h2>Log Out</h2></div>
        <div className="options option-box"><h2>Options</h2></div>
        <div onClick={robot} className="bot option-box"><h2>Play <FontAwesomeIcon className='icon' icon={faRobot}/> With Bot</h2></div>
        <div onClick={AllPlayersInfo} className="worldwide option-box"><h2>Play <FontAwesomeIcon className='icon' icon={faGlobe}/> <br/>WorldWide</h2></div>
        <div onClick={friendReqBoxShow} className="friend option-box"><h2>Play <FontAwesomeIcon className='icon' icon={faUserGroup}/> With Friends</h2></div>
    </div>

    <div onClick={() =>{setFriendsSidebar(false)}} style={{display:friendsSidebar?'inline-block':'none'}} className="overlay-home"></div>
    <div onClick={() =>{setAllPlayersSidebar(false)}} style={{display:AllPlayersSidebar?'inline-block':'none'}} className="overlay-home"></div>
    <div style={{display:friendsSidebar?'inline-block':'none'}} className="friends-sidebar">
        <div className="options-of-friend-sidebar">

            <h2 onClick={() =>{
                setShowSent(false)
                setShowPending(false)
                setShowFriends(true)
            }} style={{textShadow:showFriends?'0px 0px 20px white':'none', fontWeight:showFriends?'600':'400'}}  className="friends">Friends</h2>

            <h2 onClick={() =>{
                setShowSent(false)
                setShowPending(true)
                setShowFriends(false)
            }} style={{textShadow:showPending?'0px 0px 20px white':'none', fontWeight:showPending?'600':'400'}} className="incoming">Incoming</h2>

            <h2 onClick={() =>{
                setShowSent(true)
                setShowPending(false)
                setShowFriends(false)
            }} style={{textShadow:showSent?'0px 0px 20px white':'none', fontWeight:showSent?'600':'400'}} className="sent">Sent</h2>

        </div>
        <div style={{display:showFriends?'block':'none'}} className="friends-data">
        <ul>
            {/* <li className='all-players-heading'>All Players</li> */}
            {friendsData.map(eachData =>(
                <li key={eachData[0]}>
                    <div className="heading-level">
                        <div className="heading heading-friends">{eachData[1]}</div>
                        <div className="heading heading-friends">Level : {eachData[3]}</div>
                    </div>
                    <div className="user-extra-data">
                        <div className="buttons-for-req">
                            <button onClick={SendRequestFromAllPlayers} className="btn send-game-invite">Send invite</button>
                            <button onClick={() => Unfriend(eachData[0],eachData[1])} className="btn send-friend-request unfriend">Unfriend</button>
                        </div>
                        <div className="extra-data">
                            <h2 className="h2-extra-data">Won : {eachData[4]}</h2>
                            <h2 className="h2-extra-data">Draw : {eachData[5]}</h2>
                            <h2 className="h2-extra-data">Lost : {eachData[6]}</h2>
                        </div>
                    </div>                  
                </li>
            ))}
        </ul>
        </div>

        <div style={{display:showPending?'block':'none'}} className="pending-data">
        <ul>
            {/* <li className='all-players-heading'>All Players</li> */}
            {pendingArray.map(eachData =>(
                <li key={eachData[0]}>
                    <div className="heading-level">
                        <div className="heading heading-friends">{eachData[1]}</div>
                        <div className="heading heading-friends">Level : {eachData[3]}</div>
                    </div>
                    <div className="user-extra-data">
                        <div className="buttons-for-req">
                            <button onClick={()=>{acceptFriendRequest(eachData[0],eachData[1])}} className="btn send-game-invite">Accept</button>
                            <button onClick={(e) => declineFriendRequest(eachData[0],eachData[1],e)} className="btn send-friend-request unfriend">Decline</button>
                        </div>
                        <div className="extra-data">
                            <h2 className="h2-extra-data">Won : {eachData[4]}</h2>
                            <h2 className="h2-extra-data">Draw : {eachData[5]}</h2>
                            <h2 className="h2-extra-data">Lost : {eachData[6]}</h2>
                        </div>
                    </div>                  
                </li>
            ))}
        </ul>
        </div>

        <div style={{display:showSent?'block':'none'}} className="sent-data">
        <div className="sending-by-name">
            <input value={friendValue} onChange={friendValueUpdater} placeholder='Send Request By Name...' type="text" className="text" id='send-friend-request' />
            <button onClick={(e) => sendRequest(e)} className='send-friend-request btn'>Send</button>
        </div>
        <ul>
            {/* <li className='all-players-heading'>All Players</li> */}
            {sentArray.map(eachData =>(
                <li key={eachData[0]}>
                    <div className="heading-level">
                        <div className="heading heading-friends">{eachData[1]}</div>
                        <div className="heading heading-friends">Level : {eachData[3]}</div>
                    </div>
                    <div className="user-extra-data">
                        <div className="buttons-for-req">
                            <button onClick={SendRequestFromAllPlayers} className="btn send-game-invite">Send invite</button>
                            <button onClick={(e) => removeFromSent(eachData[0],eachData[1],e)} className="btn send-friend-request unfriend">Remove</button>
                        </div>
                        <div className="extra-data">
                            <h2 className="h2-extra-data">Won : {eachData[4]}</h2>
                            <h2 className="h2-extra-data">Draw : {eachData[5]}</h2>
                            <h2 className="h2-extra-data">Lost : {eachData[6]}</h2>
                        </div>
                    </div>                  
                </li>
            ))}
        </ul>
        </div>

    </div>


    <div style={{display:AllPlayersSidebar?'inline-block':'none'}} className="all-players-sidebar">
        <ul>
            <li className='all-players-heading'>All Players</li>
            {allPlayersData.map(eachData =>(
                <li key={eachData[0]}>
                    <div className="heading-level">
                        <div className="heading">{eachData[1]}</div>
                        <div className="heading">Level : {eachData[3]}</div>
                    </div>
                    <div className="user-extra-data">
                        <div className="buttons-for-req">
                            <button onClick={(e)=>{SendFriendRequest(eachData[0],eachData[1],e)}} className="btn send-friend-request">Send Request</button>
                            <button onClick={SendRequestFromAllPlayers} className="btn send-game-invite">Send invite</button>
                        </div>
                        <div className="extra-data">
                            <h2 className="h2-extra-data">Won : {eachData[4]}</h2>
                            <h2 className="h2-extra-data">Draw : {eachData[5]}</h2>
                            <h2 className="h2-extra-data">Lost : {eachData[6]}</h2>
                        </div>

                    </div>

                </li>
            ))}
        </ul>
    </div>

        <div style={{display:senderUsername !== ''?'flex':'none'}} className="incoming-request">
            <h2 className='request-username'>Incoming Request From {senderUsername}</h2>
            <div className="request-control">
                <button onClick={acceptRequest} className='accept-button btn'>Accept</button>
                <button onClick={rejectRequest} className='reject-button btn'>Reject</button>
            </div>

        </div>
    <div style={{display:loading?'inline-block':'none'}} className="loading"><div className="circle"></div></div>

        
    </>
  )
}
