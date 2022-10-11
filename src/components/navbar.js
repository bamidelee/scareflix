  import eye from '../Scareeye.gif'
  import '../styles/navbar.css'
  import {useState, useRef, useEffect} from 'react'

  function NavBar({scroll, Search, setSearch}){
    const [width, setWidth] = useState(false)
    const search = useRef()

    useEffect(() => {
        if(width){
             search.current.style.display = 'block'
             search.current.focus()
        }
        else{
            search.current.style.display = 'none'
        }
    }, [width])
  
    return(
        <div className='navBar' style={scroll < 10? {backgroundImage: 'linear-gradient(to right,rgba(0, 0, 0, 0.5), black)'}: {backgroundImage: 'linear-gradient(to right,black, black)'}}>
            <div className='navLeft'>
                <h2>SCAREFLIX</h2>
            </div>
            <div className='navRight' >
                <div className='search' id='search' >
                    <input type="text" ref={search} onChange={({target}) => setSearch(target.value)} value={Search} placeholder='Search movies'/>
                   {width && <span class="material-symbols-outlined" onClick={() => setSearch('')}>
                        close
                    </span>}
                </div>
                <span className="material-symbols-outlined" onClick={()=> setWidth(!width)} >
                 search
                </span>
                <img src={eye} alt="logo" />
            </div>
        </div>
    )
  }

  export default NavBar