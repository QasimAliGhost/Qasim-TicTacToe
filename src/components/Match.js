import React, { useEffect, useState, useRef } from 'react'
import './match.css'
import io from 'socket.io-client';
import { useFetcher, useNavigate } from 'react-router-dom';

export default function Match() {
  const socket = io('https://Qasim2.pythonanywhere.com')
  const navigate = useNavigate();

  const [cross1,setCross1] = useState(false)
  const [cross2,setCross2] = useState(false)
  const [cross3,setCross3] = useState(false)
  const [cross4,setCross4] = useState(false)
  const [cross5,setCross5] = useState(false)
  const [cross6,setCross6] = useState(false)
  const [cross7,setCross7] = useState(false)
  const [cross8,setCross8] = useState(false)
  const [cross9,setCross9] = useState(false)

  const [circle1,setCircle1] = useState(false)
  const [circle2,setCircle2] = useState(false)
  const [circle3,setCircle3] = useState(false)
  const [circle4,setCircle4] = useState(false)
  const [circle5,setCircle5] = useState(false)
  const [circle6,setCircle6] = useState(false)
  const [circle7,setCircle7] = useState(false)
  const [circle8,setCircle8] = useState(false)
  const [circle9,setCircle9] = useState(false)

  const [space1,setSpace1] = useState(true)
  const [space2,setSpace2] = useState(true)
  const [space3,setSpace3] = useState(true)
  const [space4,setSpace4] = useState(true)
  const [space5,setSpace5] = useState(true)
  const [space6,setSpace6] = useState(true)
  const [space7,setSpace7] = useState(true)
  const [space8,setSpace8] = useState(true)
  const [space9,setSpace9] = useState(true)

  const [wline1,setWline1] = useState(false)
  const [wline2,setWline2] = useState(false)
  const [wline3,setWline3] = useState(false)
  const [wline4,setWline4] = useState(false)
  const [wline5,setWline5] = useState(false)
  const [wline6,setWline6] = useState(false)
  const [wline7,setWline7] = useState(false)
  const [wline8,setWline8] = useState(false)

  const [myPlayAgain,setMyPlayAgain] = useState(false)
  const [opponentPlayAgain,setOpponentPlayAgain] = useState(false)

  const [myTurn,setMyTurn] = useState(false)
  const [gameOver,setGameOver] = useState(false)
  const [whoWon,setWhoWon] = useState('')
  const [timer,setTimer] = useState(30)
  const [timerTrigger,setTimerTrigger] = useState(1)

useEffect(() => {
  const interval = setInterval(() => {
    setTimer(tim => tim-1)
  }, 1000);
  return () => clearInterval(interval);
}, []);

useEffect(()=>{
  setTimer(30)
},[timerTrigger])

useEffect(()=>{
  if((timer === 0)&&(myTurn)){
    setMyTurn(false)
    socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent')});  
  }
},[timer])

  const crossWinner = ()=>{
    if(localStorage.getItem('tool') === 'cross'){
      setWhoWon(localStorage.getItem('username')+' Won')
      socket.emit('updateData',{username:localStorage.getItem('username'),field:'won'});
    }else{
      setWhoWon(localStorage.getItem('opponent')+' Won')
      socket.emit('updateData',{username:localStorage.getItem('username'),field:'lost'});
    }
    setSpace1(false)
    setSpace2(false)
    setSpace3(false)
    setSpace4(false)
    setSpace5(false)
    setSpace6(false)
    setSpace7(false)
    setSpace8(false)
    setSpace9(false)
  }
  const circleWinner = ()=>{
    if(localStorage.getItem('tool') === 'circle'){
      setWhoWon(localStorage.getItem('username')+' Won')
      socket.emit('updateData',{username:localStorage.getItem('username'),field:'won'});

    }else{
      setWhoWon(localStorage.getItem('opponent')+' Won')
      socket.emit('updateData',{username:localStorage.getItem('username'),field:'lost'});
    }
    setSpace1(false)
    setSpace2(false)
    setSpace3(false)
    setSpace4(false)
    setSpace5(false)
    setSpace6(false)
    setSpace7(false)
    setSpace8(false)
    setSpace9(false)
  }
  const draw = ()=>{
    setWhoWon('Draw')
    socket.emit('updateData',{username:localStorage.getItem('username'),field:'draw'});
    setSpace1(false)
    setSpace2(false)
    setSpace3(false)
    setSpace4(false)
    setSpace5(false)
    setSpace6(false)
    setSpace7(false)
    setSpace8(false)
    setSpace9(false)
  }

  const playAgain = ()=>{
    socket.emit('didOpponentLeft',localStorage.getItem('id'))
    socket.on('didOpponentLeft',msg => {
      if((msg[1] === localStorage.getItem('username'))||(msg[0] === localStorage.getItem('username'))){
        setMyPlayAgain(true)
        socket.emit('PlayAgainID',{Fplayer:localStorage.getItem('username'),Splayer:localStorage.getItem('opponent')})
      }else if(msg[0] === 'id not found'){
        setWhoWon(localStorage.getItem('opponent')+' left the game')
      }
    })
    

}

useEffect(()=>{
  socket.on('PlayAgainID',data =>{
    if((data.Splayer === localStorage.getItem('username'))){
     setOpponentPlayAgain(true)

    }
 })
 },[])


  useEffect(()=>{
    console.log(opponentPlayAgain+' this is opponent play again')
    console.log(myPlayAgain+' this is my play again')
    if((myPlayAgain)&&(opponentPlayAgain)){
      setCircle1(false)
      setCircle2(false)
      setCircle3(false)
      setCircle4(false)
      setCircle5(false)
      setCircle6(false)
      setCircle7(false)
      setCircle8(false)
      setCircle9(false)

      setCross1(false)
      setCross2(false)
      setCross3(false)
      setCross4(false)
      setCross5(false)
      setCross6(false)
      setCross7(false)
      setCross8(false)
      setCross9(false)

      setSpace1(true)
      setSpace2(true)
      setSpace3(true)
      setSpace4(true)
      setSpace5(true)
      setSpace6(true)
      setSpace7(true)
      setSpace8(true)
      setSpace9(true)

      setWline1(false)
      setWline2(false)
      setWline3(false)
      setWline4(false)
      setWline5(false)
      setWline6(false)
      setWline7(false)
      setWline8(false)

      setTimer(30)
      setWhoWon('')
      setGameOver(false)
      setMyPlayAgain(false)
      setOpponentPlayAgain(false)
      console.log('my desired block is runnning')
    }
  },[myPlayAgain,opponentPlayAgain])

  const QuitMatch = ()=>{
    setTimeout(() => {
      navigate('/home')
    }, 500);
  }

  const backMatch = ()=>{
    localStorage.setItem('tool','')
    localStorage.setItem('opponent','')
    socket.emit('deleteID',localStorage.getItem('id'));
    localStorage.setItem('id','')
    fetch('https://Qasim2.pythonanywhere.com/GetData',{
            method:'POST',
            headers:{'content-type':'application/json',
          },
          body:JSON.stringify(localStorage.getItem('username'))
          })
          .then(Response => Response.json())
          .then(data => {
            localStorage.setItem('username',data[1])
            localStorage.setItem('password',data[2])
            localStorage.setItem('level',data[3])
            localStorage.setItem('won',data[4])
            localStorage.setItem('draw',data[5])
            localStorage.setItem('lost',data[6])
          })
    QuitMatch();
  }

  const leftTrigger = ()=>{
    socket.emit('opponentLeft',localStorage.getItem('username'))
    backMatch();
  }

  useEffect(()=>{
    socket.on('opponentLeft',data => {
      if(data === localStorage.getItem('opponent')){
        setGameOver(true)
        setWhoWon(localStorage.getItem('opponent')+' left the game')
      }
    })
  },[])

  const Gameover = ()=>{
    setTimeout(() => {
      setGameOver(true)
    }, 1000);
  }

  const GameChecker = ()=>{
    if((cross1)&&(cross2)&&(cross3)){
      crossWinner()
      Gameover()
      setWline1(true)
    }else if((cross1)&&(cross4)&&(cross7)){
      Gameover()
      crossWinner()
      setWline4(true)
    }else if((cross1)&&(cross5)&&(cross9)){
      Gameover()
      crossWinner()
      setWline8(true)
    }else if((cross4)&&(cross5)&&(cross6)){
      Gameover()
      crossWinner()
      setWline2(true)
    }else if((cross7)&&(cross8)&&(cross9)){
      Gameover()
      crossWinner()
      setWline3(true)
    }else if((cross2)&&(cross5)&&(cross8)){
      Gameover()
      crossWinner()
      setWline5(true)
    }else if((cross3)&&(cross6)&&(cross9)){
      Gameover()
      crossWinner()
      setWline6(true)
    }else if((cross3)&&(cross5)&&(cross7)){
      Gameover()
      crossWinner()
      setWline7(true)
    }else if((circle1)&&(circle4)&&(circle7)){
      Gameover()
      circleWinner()
      setWline4(true)
    }else if((circle1)&&(circle5)&&(circle9)){
      Gameover()
      circleWinner()
      setWline8(true)
    }else if((circle4)&&(circle5)&&(circle6)){
      Gameover()
      circleWinner()
      setWline2(true)
    }else if((circle7)&&(circle8)&&(circle9)){
      Gameover()
      circleWinner()
      setWline3(true)
    }else if((circle2)&&(circle5)&&(circle8)){
      Gameover()
      circleWinner()
      setWline5(true)
    }else if((circle3)&&(circle6)&&(circle9)){
      Gameover()
      circleWinner()
      setWline6(true)
    }else if((circle3)&&(circle5)&&(circle7)){
      Gameover()
      circleWinner()
      setWline7(true)
    }else if((circle1)&&(circle2)&&(circle3)){
      Gameover()
      circleWinner()
      setWline1(true)
    }else if((!space1)&&(!space2)&&(!space3)&&(!space4)&&(!space5)&&(!space6)&&(!space7)&&(!space8)&&(!space9)){
      Gameover()
      draw();
    }
    
  }


useEffect(()=>{
  GameChecker();
},[cross1,cross2,cross3,cross4,cross5,cross6,cross7,cross8,cross9,circle1,circle2,circle3,circle4,circle5,circle6,circle7,circle8,circle9])


  useEffect(()=>{

    socket.emit('MatchStarter',localStorage.getItem('roomID'));

    socket.on('MatchStarter',data =>{ 
      if (data[0] === localStorage.getItem('username')){
        setMyTurn(true)
        localStorage.setItem('tool','circle')
        localStorage.setItem('id',data[1])

      }else{
        localStorage.setItem('tool','cross')
        localStorage.setItem('id',data[1])

      }
    })


  },[])

        useEffect(()=>{
          socket.on('bariChanger',data =>{
            if((data.opponent === localStorage.getItem('username'))||(data.Iam === localStorage.getItem('username'))){
              setTimerTrigger(trigger => trigger + 1)
            if(data.baridone === 'c1'){
              setCross1(true)
              setSpace1(false)
            }else if(data.baridone === 'c2'){
              setCross2(true)
              setSpace2(false)
            }else if(data.baridone === 'c3'){
              setCross3(true)
              setSpace3(false)
            }else if(data.baridone === 'c4'){
              setCross4(true)
              setSpace4(false)
            }else if(data.baridone === 'c5'){
              setCross5(true)
              setSpace5(false)
            }else if(data.baridone === 'c6'){
              setCross6(true)
              setSpace6(false)
            }else if(data.baridone === 'c7'){
              setCross7(true)
              setSpace7(false)
            }else if(data.baridone === 'c8'){
              setCross8(true)
              setSpace8(false)
            }else if(data.baridone === 'c9'){
              setCross9(true)
              setSpace9(false)
            }else if(data.baridone === 'C1'){
              setCircle1(true)
              setSpace1(false)
            }else if(data.baridone === 'C2'){
              setCircle2(true)
              setSpace2(false)
            }else if(data.baridone === 'C3'){
              setCircle3(true)
              setSpace3(false)
            }else if(data.baridone === 'C4'){
              setCircle4(true)
              setSpace4(false)
            }else if(data.baridone === 'C5'){
              setCircle5(true)
              setSpace5(false)
            }else if(data.baridone === 'C6'){
              setCircle6(true)
              setSpace6(false)
            }else if(data.baridone === 'C7'){
              setCircle7(true)
              setSpace7(false)
            }else if(data.baridone === 'C8'){
              setCircle8(true)
              setSpace8(false)
            }else if(data.baridone === 'C9'){
              setCircle9(true)
              setSpace9(false)
            }
            if((data.opponent === localStorage.getItem('username'))){
              setMyTurn(true); 
            }

          }
          }
        )
          },[])
        
    



  const moveUpdater = (e)=>{
    if(localStorage.getItem('tool') === 'cross'){
      if(e.target.className === 'space1 space'){
        setCross1(true)
        setSpace1(false)
        setMyTurn(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c1'});
  
      }else if(e.target.className === 'space2 space'){
        setCross2(true)
        setMyTurn(false)
        setSpace2(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c2'});
      }else if(e.target.className === 'space3 space'){
        setCross3(true)
        setMyTurn(false)
        setSpace3(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c3'});
      }else if(e.target.className === 'space4 space'){
        setCross4(true)
        setMyTurn(false)
        setSpace4(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c4'});
      }else if(e.target.className === 'space5 space'){
        setCross5(true)
        setMyTurn(false)
        setSpace5(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c5'});
      }else if(e.target.className === 'space6 space'){
        setCross6(true)
        setMyTurn(false)
        setSpace6(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c6'});
      }else if(e.target.className === 'space7 space'){
        setCross7(true)
        setMyTurn(false)
        setSpace7(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c7'});
      }else if(e.target.className === 'space8 space'){
        setCross8(true)
        setMyTurn(false)
        setSpace8(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c8'});
      }else{
        setCross9(true)
        setMyTurn(false)
        setSpace9(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'c9'});
      }
    }else if(localStorage.getItem('tool') === 'circle'){
      if(e.target.className === 'space1 space'){
        setCircle1(true)
        setMyTurn(false)
        setSpace1(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'C1'});
  
      }else if(e.target.className === 'space2 space'){
        setCircle2(true)
        setMyTurn(false)
        setSpace2(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'C2'});
      }else if(e.target.className === 'space3 space'){
        setCircle3(true)
        setMyTurn(false)
        setSpace3(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'C3'});
      }else if(e.target.className === 'space4 space'){
        setCircle4(true)
        setMyTurn(false)
        setSpace4(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'C4'});
      }else if(e.target.className === 'space5 space'){
        setCircle5(true)
        setMyTurn(false)
        setSpace5(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'C5'});
      }else if(e.target.className === 'space6 space'){
        setCircle6(true)
        setMyTurn(false)
        setSpace6(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'C6'});
      }else if(e.target.className === 'space7 space'){
        setCircle7(true)
        setMyTurn(false)
        setSpace7(false)
        socket.emit('bariChanger',{opponent:localStorage.getItem('opponent'),baridone:'C7'});
      }else if(e.target.className === 'space8 space'){
        setCircle8(true)
        setMyTurn(false)
        setSpace8(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'C8'});
      }else{
        setCircle9(true)
        setMyTurn(false)
        setSpace9(false)
        socket.emit('bariChanger',{Iam:localStorage.getItem('username'),opponent:localStorage.getItem('opponent'),baridone:'C9'});
      }
    }
    }
    
  const updateTurn = (e)=>{
    e.target.style.display = 'inlineBlock'
  }

  return (
    <>
    <div className="my-name">
      <div onClick={leftTrigger} className="left-button">Left</div>
      <div className="score-match">
        <div className="my-dataa">
          <div className="timer"><h2 style={{display:myTurn?'Block':'none'}} >{timer}</h2></div>
          <h2 style={{border:myTurn?'2px solid white':'none'}} className='my-name-heading'>{localStorage.getItem('username')}</h2>
        </div>
        <div className="opponent-data">
          <h2 style={{border:myTurn?'none':'2px solid white'}} className="opponent-heading">{localStorage.getItem('opponent')}</h2>
          <div className="timer"><h2 style={{display:myTurn?'none':'block'}} >{timer}</h2></div>
        </div>
      </div>
      <div className="level">Level : {localStorage.getItem('level')}</div>
    </div>
    <div className="hashbox-match">
        <div className="line1 line"></div>
        <div className="line2 line"></div>
        <div className="line3 line"></div>
        <div className="line4 line"></div>
        <div className="my-turns">
          <div style={{display:cross1?'inline-block':'none'}} className="cross1 cross-common">X</div>
          <div style={{display:cross2?'inline-block':'none'}} className="cross2 cross-common">X</div>
          <div style={{display:cross3?'inline-block':'none'}} className="cross3 cross-common">X</div>
          <div style={{display:cross4?'inline-block':'none'}} className="cross4 cross-common">X</div>
          <div style={{display:cross5?'inline-block':'none'}} className="cross5 cross-common">X</div>
          <div style={{display:cross6?'inline-block':'none'}} className="cross6 cross-common">X</div>
          <div style={{display:cross7?'inline-block':'none'}} className="cross7 cross-common">X</div>
          <div style={{display:cross8?'inline-block':'none'}} className="cross8 cross-common">X</div>
          <div style={{display:cross9?'inline-block':'none'}} className="cross9 cross-common">X</div>    

          <div style={{display:circle1?'inline-block':'none'}} className="circle1 Circle">O</div>
          <div style={{display:circle2?'inline-block':'none'}} className="circle2 Circle">O</div>
          <div style={{display:circle3?'inline-block':'none'}} className="circle3 Circle">O</div>
          <div style={{display:circle4?'inline-block':'none'}} className="circle4 Circle">O</div>
          <div style={{display:circle5?'inline-block':'none'}} className="circle5 Circle">O</div>
          <div style={{display:circle6?'inline-block':'none'}} className="circle6 Circle">O</div>
          <div style={{display:circle7?'inline-block':'none'}} className="circle7 Circle">O</div>
          <div style={{display:circle8?'inline-block':'none'}} className="circle8 Circle">O</div>
          <div style={{display:circle9?'inline-block':'none'}} className="circle9 Circle">O</div>

        </div>
        <div className="empty-spaces">
          <div style={{display:(myTurn)&&(space1)?'block':'none'}} onClick={moveUpdater} className="space1 space"></div>
          <div style={{display:(myTurn)&&(space2)?'inline-block':'none'}} onClick={moveUpdater} className="space2 space"></div>
          <div style={{display:(myTurn)&&(space3)?'inline-block':'none'}} onClick={moveUpdater} className="space3 space"></div>
          <div style={{display:(myTurn)&&(space4)?'inline-block':'none'}} onClick={moveUpdater} className="space4 space"></div>
          <div style={{display:(myTurn)&&(space5)?'inline-block':'none'}} onClick={moveUpdater} className="space5 space"></div>
          <div style={{display:(myTurn)&&(space6)?'inline-block':'none'}} onClick={moveUpdater} className="space6 space"></div>
          <div style={{display:(myTurn)&&(space7)?'inline-block':'none'}} onClick={moveUpdater} className="space7 space"></div>
          <div style={{display:(myTurn)&&(space8)?'inline-block':'none'}} onClick={moveUpdater} className="space8 space"></div>
          <div style={{display:(myTurn)&&(space9)?'inline-block':'none'}} onClick={moveUpdater} className="space9 space"></div>
        </div>
        <div className="winning-lines">
          <div style={{display:wline1?'inline-block':'none'}} className="winning-line1 winning-line"></div>
          <div style={{display:wline2?'inline-block':'none'}} className="winning-line2 winning-line"></div>
          <div style={{display:wline3?'inline-block':'none'}} className="winning-line3 winning-line"></div>
          <div style={{display:wline4?'inline-block':'none'}} className="winning-line4 winning-line"></div>
          <div style={{display:wline5?'inline-block':'none'}} className="winning-line5 winning-line"></div>
          <div style={{display:wline6?'inline-block':'none'}} className="winning-line6 winning-line"></div>
          <div style={{display:wline7?'inline-block':'none'}} className="winning-line7 winning-line"></div>
          <div style={{display:wline8?'inline-block':'none'}} className="winning-line8 winning-line"></div>
        </div>
    </div>
    <div style={{display:gameOver?'inlineBlock':'none'}} className="overlay"></div>
    <div style={{display:gameOver?'flex':'none'}} className="popup-won">
      <h2 className="who-won">{whoWon}</h2>
      <button onClick={playAgain} className="play-again btn">Play Again</button>
      <button onClick={backMatch} className="back-match btn ">Back</button>
    </div>
    </>
  )
}
