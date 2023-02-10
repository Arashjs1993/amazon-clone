import React from 'react'
import './Home.css'
import Product from './Product'

function Home() {
  return (
    <div className='home'>
        <div className="home__container">

            <img className='home__image' src='https://m.media-amazon.com/images/I/71mI4d5pZqL._SX3000_.jpg'></img>
        
            <div className="home__row">
                <Product 
                    id= {0}
                    title="the lean startup" 
                    price={19.99} 
                    url="https://m.media-amazon.com/images/I/61GGSamowvL._AC_SY230_.jpg"
                    rating= {3}
                    />
                <Product 
                    id= {1}
                    title="Informatics" 
                    price={19.99} 
                    url="https://images-eu.ssl-images-amazon.com/images/G/29/Events/2021/IT_fallback_campaigns/XCM_CUTTLE_1321861_1653915_DE_3783397_379x304_1X_IT._SY304_CB639715330_.jpg"
                    rating= {4}
                    />
            </div>

            <div className="home__row">
                <Product 
                    id= {2}
                    title="Health and personal care: products of the moment" 
                    price={19.99} 
                    url="https://images-eu.ssl-images-amazon.com/images/G/29/Prime/2022/GTM/August/Bestseller/PCA/XCM_CUTTLE_1458020_2516249_379x304_1X_it_IT._SY304_CB629575489_.jpg"
                    rating= {4}
                    />
                <Product 
                    id= {3}
                    title="The products of the moment in Home and" 
                    price={19.99} 
                    url="https://images-eu.ssl-images-amazon.com/images/G/29/Prime/2022/GTM/August/Bestseller/Home/XCM_CUTTLE_1458001_2516071_379x304_1X_it_IT._SY304_CB629572855_.jpg"
                    rating= {4}
                    />
                <Product 
                    id= {4}
                    title="Discover the most sustainable products" 
                    price={19.99} 
                    url="https://images-eu.ssl-images-amazon.com/images/G/29/Prime/2022/GTM/August/Bestseller/Home/XCM_CUTTLE_1458001_2516071_379x304_1X_it_IT._SY304_CB629572855_.jpg"
                    rating= {4}
                    />
            </div>

        </div>
    </div>
  )
}

export default Home