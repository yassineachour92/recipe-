import React, { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

import './popular.scss'
function Popular() {
    const [popular, setPopular] = useState([])
    useEffect(() => {
        const getPopular = async () => {
            const check = localStorage.getItem("popular");
            if (check) {
                setPopular(JSON.parse(check));
            } else {
                const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`);
                const data = await api.json();
                setPopular(data.recipes);
                localStorage.setItem("popular",JSON.stringify(data.recipes))
            };
        }
        getPopular()
    }, []);


    return (
        <div>
                  <h3>Our Vegetarian Picks</h3>

            <Splide
                options={{
                    perPage: 4,
                    arrows: false,
                    pagination: false,
                    drag: "free",
                    gap: "5rem"
                }}
            >

                {popular && popular.map((recipe, key) => {
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

export default Popular