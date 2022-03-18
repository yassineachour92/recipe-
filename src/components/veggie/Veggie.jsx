import React, { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import './veggie.scss'

function Veggie() {
  const [veggie, setVeggie] = useState([])
  useEffect(() => {
      const getVeggie = async () => {
          const check = localStorage.getItem("veggie");
          if (check) {
            setVeggie(JSON.parse(check));
          } else {
              const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`);
              const data = await api.json();
              setVeggie(data.recipes);
              localStorage.setItem("veggie",JSON.stringify(data.recipes))
          };
      }
      getVeggie()
  }, []);
  return (
    <div>
      <h3>Our Vegetarian Picks</h3>
        <Splide
            options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "5rem"
            }}
        >

            {veggie && veggie.map((recipe, key) => {
                return (
                    <SplideSlide>

                        <div className='card' key={key}>
                            <p className='card__title'>{recipe.title}</p>
                            <img className='card__img' src={recipe.image} alt={recipe.title} />
                        </div>
                    </SplideSlide>
                )
            })}
        </Splide>
    </div>
)
}

export default Veggie