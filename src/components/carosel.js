import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../styles/carousel.css'

export default function Carousel ({movies, title}) {
    
      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
      }
      return (
        <div className="carousel">
          <h2 className="carouselTitle"> {title} </h2>
         {movies && <Slider {...settings}>
           {movies.map((movie) => 
            <div key={movie.id} className='carouselContainer'>
                <img src={`http://image.tmdb.org/t/p/w342//${movie.backdrop_path}`} alt={movie.title} className='caroselImage' />
                <div className="movieControls">
                <span className="material-symbols-outlined play">
                    play_circle
                </span>
                <span className="material-symbols-outlined add">
                    add_circle
                </span>
                <span className="material-symbols-outlined">
                    expand_circle_down
                </span>
                <h2>
                    {movie.title}
                </h2>
                </div>
            </div>
           )}
          </Slider>}
        </div>
      );
    }
  