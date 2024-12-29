import React from 'react';
import Banner from './Banner';
import Category from './Category';
import BitroBoss from '../../Component/common/BitroBoss';
import PopularMenu from './PopularMenu';
import ChefRecommends from './ChefRecommends';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <BitroBoss></BitroBoss>
            <PopularMenu></PopularMenu>
            <ChefRecommends></ChefRecommends>
        </div>
    );
};

export default Home;