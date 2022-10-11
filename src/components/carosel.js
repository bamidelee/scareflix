import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/carousel.css'
import { useState, useEffect } from "react";

export default function Carousel ({movies, title, setMovieDetails, setIntro, setMovieToPlay}) {
  const [slideAmount, setSlideAmount] = useState(4)
useEffect(() => {
  if(window.innerWidth < 659){
    setSlideAmount(3)
  }
  if(window.innerWidth < 450){
    setSlideAmount(2)
  }
},[])
const mediaQuery990 = window.matchMedia('(max-width: 750px)')
const mediaQuery700 = window.matchMedia('(max-width: 650px)')
const mediaQuery450 = window.matchMedia('(max-width: 450px)')
  function handleTabletChange(e) {
 
    if (e.matches && slideAmount !== 4) {
    setSlideAmount(4)
    }
  }
  
  function handleTabletChange700(e) {
   
    if (e.matches && slideAmount!== 3) {
    setSlideAmount(3)
    }
  }
  function handleTabletChange450(e) {
   
    if (e.matches && slideAmount!== 2) {
    setSlideAmount(2)
    }
  }
  mediaQuery990.addListener(handleTabletChange)
  mediaQuery700.addListener(handleTabletChange700)
  mediaQuery450.addListener(handleTabletChange450)
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slideAmount,
        slidesToScroll: slideAmount
      }
      return (
        <div className="carousel">
          <h2 className="carouselTitle"> {title} </h2>
         {movies && <Slider {...settings}>
           {movies.map((movie, index) => 
            <div key={movie.id} className='carouselContainer'  onClick={() => setMovieDetails(movie)}>
                <img src={`http://image.tmdb.org/t/p/w342//${movie.backdrop_path || movie.poster_path}`} alt={movie.title} className='caroselImage' />
                <div className="movieControls">
                <span className="material-symbols-outlined play" onClick={() => {setIntro(true); setMovieToPlay(movie.id)}}>
                    play_circle
                </span>
                <span className="material-symbols-outlined add">
                    add_circle
                </span>
                <span className="material-symbols-outlined" onClick={() => setMovieDetails(movie)}>
                    expand_circle_down
                </span>
                <h2>
                    {movie.title}
                </h2>
                </div>
                {title === 'Top rated' && <div className="rating">
                  {index + 1}
                </div>}
            </div>
           )}
          </Slider>}
        </div>
      );
    }
  