import React, { useEffect, useState, useRef } from 'react'
import './match.css'
import { useFetcher, useNavigate } from 'react-router-dom';

export default function Bot() {
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

  const [myTurn,setMyTurn] = useState(true)
  const [gameOver,setGameOver] = useState(false)
  const [whoWon,setWhoWon] = useState('')
  const [myPlayAgain,setMyPlayAgain] = useState(false)



  const crossWinner = ()=>{
    setWhoWon(localStorage.getItem('username')+' Won')
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
      setWhoWon('Bot Won')
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
        setMyPlayAgain(true)
      }

  useEffect(()=>{
    if((myPlayAgain)){
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

      setWhoWon('')
      setGameOver(false)
      setMyPlayAgain(false)
    }
  },[myPlayAgain])

  const QuitMatch = ()=>{
    setTimeout(() => {
      navigate('/home')
    }, 500);
  }

  const backMatch = ()=>{
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
    backMatch();
  }

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
    }else{
        return false
    }
    
  }
useEffect(()=>{
  GameChecker();
},[cross1,cross2,cross3,cross4,cross5,cross6,cross7,cross8,cross9,circle1,circle2,circle3,circle4,circle5,circle6,circle7,circle8,circle9,space1,space2,space3,space4,space5,space6,space7,space8,space9])


useEffect(()=>{
    setMyTurn(true)
    localStorage.setItem('tool','cross')
},[])

useEffect(()=>{
    GameChecker()
    if(myTurn === false){
        const amIWining = ()=>{
            if((circle1)&&(circle2)&&(space3)){
                return 'circle3'
            }else if((circle1)&&(circle3)&&(space2)){
                return 'circle2'
            }else if((circle2)&&(circle3)&&(space1)){
                return 'circle1'
            }else if((circle4)&&(circle5)&&(space6)){
                return 'circle6'
            }else if((circle5)&&(circle6)&&(space4)){
                return 'circle4'
            }else if((circle4)&&(circle6)&&(space5)){
                return 'circle5'
            }else if((circle7)&&(circle8)&&(space9)){
                return 'circle9'
            }else if((circle8)&&(circle9)&&(space7)){
                return 'circle7'
            }else if((circle7)&&(circle9)&&(space8)){
                return 'circle8'
            }else if((circle1)&&(circle4)&&(space7)){
                return 'circle7'
            }else if((circle4)&&(circle7)&&(space1)){
                return 'circle1'
            }else if((circle1)&&(circle7)&&(space4)){
                return 'circle4'
            }else if((circle2)&&(circle5)&&(space8)){
                return 'circle8'
            }else if((circle5)&&(circle8)&&(space2)){
                return 'circle2'
            }else if((circle2)&&(circle8)&&(space5)){
                return 'circle5'
            }else if((circle3)&&(circle6)&&(space9)){
                return 'circle9'
            }else if((circle6)&&(circle9)&&(space3)){
                return 'circle3'
            }else if((circle9)&&(circle3)&&(space6)){
                return 'circle6'
            }else if((circle1)&&(circle5)&&(space9)){
                return 'circle9'
            }else if((circle5)&&(circle9)&&(space1)){
                return 'circle1'
            }else if((circle1)&&(circle9)&&(space5)){
                return 'circle5'
            }else if((circle3)&&(circle5)&&(space7)){
                return 'circle7'
            }else if((circle5)&&(circle7)&&(space3)){
                return 'circle3'
            }else if((circle3)&&(circle7)&&(space5)){
                return 'circle5'
            }else{
                return false
            }
        }
        const isHeWinning = ()=>{
            if((cross1)&&(cross2)&&(space3)){
                return 'circle3'
            }else if((cross1)&&(cross3)&&(space2)){
                return 'circle2'
            }else if((cross2)&&(cross3)&&(space1)){
                return 'circle1'
            }else if((cross4)&&(cross5)&&(space6)){
                return 'circle6'
            }else if((cross5)&&(cross6)&&(space4)){
                return 'circle4'
            }else if((cross4)&&(cross6)&&(space5)){
                return 'circle5'
            }else if((cross7)&&(cross8)&&(space9)){
                return 'circle9'
            }else if((cross8)&&(cross9)&&(space7)){
                return 'circle7'
            }else if((cross7)&&(cross9)&&(space8)){
                return 'circle8'
            }else if((cross1)&&(cross4)&&(space7)){
                return 'circle7'
            }else if((cross4)&&(cross7)&&(space1)){
                return 'circle1'
            }else if((cross1)&&(cross7)&&(space4)){
                return 'circle4'
            }else if((cross2)&&(cross5)&&(space8)){
                return 'circle8'
            }else if((cross5)&&(cross8)&&(space2)){
                return 'circle2'
            }else if((cross2)&&(cross8)&&(space5)){
                return 'circle5'
            }else if((cross3)&&(cross6)&&(space9)){
                return 'circle9'
            }else if((cross6)&&(cross9)&&(space3)){
                return 'circle3'
            }else if((cross9)&&(cross3)&&(space6)){
                return 'circle6'
            }else if((cross1)&&(cross5)&&(space9)){
                return 'circle9'
            }else if((cross5)&&(cross9)&&(space1)){
                return 'circle1'
            }else if((cross1)&&(cross9)&&(space5)){
                return 'circle5'
            }else if((cross3)&&(cross5)&&(space7)){
                return 'circle7'
            }else if((cross5)&&(cross7)&&(space3)){
                return 'circle3'
            }else if((cross3)&&(cross7)&&(space5)){
                return 'circle5'
            }else{
                return false
            }
        }
        const randomly = ()=>{
            let num = Math.floor(Math.random() * 9) + 1;
                    if((num === 1)&&(!circle1)&&(space1)){
                        setCircle1(true)
                        setSpace1(false)
                        return true
                    }else if((num === 2)&&(!circle2)&&(space2)){
                        setCircle2(true)
                        setSpace2(false)
                        return true
                    }else if((num === 3)&&(!circle3)&&(space3)){
                        setCircle3(true)
                        setSpace3(false)
                        return true
                    }else if((num === 4)&&(!circle4)&&(space4)){
                        setCircle4(true)
                        setSpace4(false)
                        return true
                    }else if((num === 5)&&(!circle5)&&(space5)){
                        setCircle5(true)
                        setSpace5(false)
                        return true
                    }else if((num === 6)&&(!circle6)&&(space6)){
                        setCircle6(true)
                        setSpace6(false)
                        return true
                    }else if((num === 7)&&(!circle7)&&(space7)){
                        setCircle7(true)
                        setSpace7(false)
                        return true
                    }else if((num === 8)&&(!circle8)&&(space8)){
                        setCircle8(true)
                        setSpace8(false)
                        return true
                    }else if((num === 9)&&(!circle9)&&(space9)){
                        setCircle9(true)
                        setSpace9(false)    
                        return true               
                    }else{
                        randomly()
                    }
                }
            let ans = amIWining()
            if((ans === 'circle1')&&(!circle1)&&(space1)){
                setCircle1(true)
                setSpace1(false)
            }else if((ans === 'circle2')&&(!circle2)&&(space2)){
                setCircle2(true)
                setSpace2(false)
            }else if((ans === 'circle3')&&(!circle3)&&(space3)){
                setCircle3(true)
                setSpace3(false)
            }else if((ans === 'circle4')&&(!circle4)&&(space4)){
                setCircle4(true)
                setSpace4(false)
            }else if((ans === 'circle5')&&(!circle5)&&(space5)){
                setCircle5(true)
                setSpace5(false)
            }else if((ans === 'circle6')&&(!circle6)&&(space6)){
                setCircle6(true)
                setSpace6(false)              
            }else if((ans === 'circle7')&&(!circle7)&&(space7)){
                setCircle7(true)
                setSpace7(false)                
            }else if((ans === 'circle8')&&(!circle8)&&(space8)){
                setCircle8(true)
                setSpace8(false)              
            }else if((ans === 'circle9')&&(!circle9)&&(space9)){
                setCircle9(true)
                setSpace9(false)            
            }else{
                let ans2 = isHeWinning()
                if((ans2 === 'circle1')&&(!circle1)&&(space1)){
                    setCircle1(true)
                    setSpace1(false)  
                }else if((ans2 === 'circle2')&&(!circle2)&&(space2)){
                    setCircle2(true)
                    setSpace2(false)
                }else if((ans2 === 'circle3')&&(!circle3)&&(space3)){
                    setCircle3(true)
                    setSpace3(false)
                }else if((ans2 === 'circle4')&&(!circle4)&&(space4)){
                    setCircle4(true)
                    setSpace4(false)
                }else if((ans2 === 'circle5')&&(!circle5)&&(space5)){
                    setCircle5(true)
                    setSpace5(false)
                }else if((ans2 === 'circle6')&&(!circle6)&&(space6)){
                    setCircle6(true)
                    setSpace6(false)              
                }else if((ans2 === 'circle7')&&(!circle7)&&(space7)){
                    setCircle7(true)
                    setSpace7(false)                
                }else if((ans2 === 'circle8')&&(!circle8)&&(space8)){
                    setCircle8(true)
                    setSpace8(false)              
                }else if((ans2 === 'circle9')&&(!circle9)&&(space9)){
                    setCircle9(true)
                    setSpace9(false)            
                }else{
                  if((cross5)&&(!circle1)&&(space1)){
                    setCircle1(true)
                    setSpace1(false)
                  }else if((cross5)&&(!circle3)&&(space3)){
                    setCircle3(true)
                    setSpace3(false)
                  }else if((cross5)&&(!circle7)&&(space7)){
                    setCircle7(true)
                    setSpace7(false)
                  }else if((cross5)&&(!circle9)&&(space9)){
                    setCircle9(true)
                    setSpace9(false)
                  }
                  else if((cross1)&&(!circle5)&&(space5)){
                    setCircle5(true)
                    setSpace5(false)
                  }else if((cross3)&&(!circle5)&&(space5)){
                    setCircle5(true)
                    setSpace5(false)
                  }else if((cross7)&&(!circle5)&&(space5)){
                    setCircle5(true)
                    setSpace5(false)
                  }else if((cross9)&&(!circle5)&&(space5)){
                    setCircle5(true)
                    setSpace5(false)
                  }else if(((cross1)&&(cross9))&&((!circle2)&&(space2))){
                    setCircle2(true)
                    setSpace2(false)
                  }else if(((cross1)&&(cross9))&&((!circle4)&&(space4))){
                    setCircle4(true)
                    setSpace4(false)
                  }else if(((cross1)&&(cross9))&&((!circle6)&&(space6))){
                    setCircle6(true)
                    setSpace6(false)
                  }else if(((cross1)&&(cross9))&&((!circle9)&&(space9))){
                    setCircle9(true)
                    setSpace9(false)
                  }
                  else{
                    let a = GameChecker()
                    if(a === false){
                        randomly()
                    }
                  }
                    
                    
                    
                 }               
    }     
        setMyTurn(true)
    }
},[myTurn])

        
    



  const moveUpdater = (e)=>{
      if(e.target.className === 'space1 space'){
        setCross1(true)
        setSpace1(false)
        setMyTurn(false)
      }else if(e.target.className === 'space2 space'){
        setCross2(true)
        setSpace2(false)
        setMyTurn(false)
      }else if(e.target.className === 'space3 space'){
        setCross3(true)
        setSpace3(false)
        setMyTurn(false)
      }else if(e.target.className === 'space4 space'){
        setCross4(true)
        setSpace4(false)
        setMyTurn(false)
      }else if(e.target.className === 'space5 space'){
        setCross5(true)
        setSpace5(false)
        setMyTurn(false)
      }else if(e.target.className === 'space6 space'){
        setCross6(true)
        setSpace6(false)
        setMyTurn(false)
      }else if(e.target.className === 'space7 space'){
          setCross7(true)
          setSpace7(false)
        setMyTurn(false)
      }else if(e.target.className === 'space8 space'){
        setCross8(true)
        setSpace8(false)
        setMyTurn(false)
      }else{
        setCross9(true)
        setSpace9(false)
        setMyTurn(false)
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
          <h2 style={{border:myTurn?'2px solid white':'none'}} className='my-name-heading'>{localStorage.getItem('username')}</h2>
        </div>
        <div className="opponent-data">
          <h2 style={{border:myTurn?'none':'2px solid white'}} className="opponent-heading">Bot</h2>
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


