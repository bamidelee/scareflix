import '../styles/intro.css'
import sound from '../sound.mp3'
import {useEffect, useRef} from 'react'


function Intro ({intro}) {
    const play = useRef()
    useEffect(()=> {
        if(intro){
            play.current.play()
        }
    }, [intro])


    return(
        <div className="intro">
            <h1>SCAREFLIX</h1>
            <audio src={sound} controls type="audio/mpeg" ref={play} className='audio'></audio>
        </div>
    )
}

export default Intro 