import React from 'react';
import Banner from './Banner';
import Category from './Category';
import BitroBoss from '../../Component/common/BitroBoss';
import PopularMenu from './PopularMenu';
import ChefRecommends from './ChefRecommends';
import Featured from './Featured/Featured';
import TestiMonials from './Test-Monial/TestiMonials';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <BitroBoss></BitroBoss>
            <PopularMenu></PopularMenu>
            <ChefRecommends></ChefRecommends>
            <Featured></Featured>
            <TestiMonials></TestiMonials>
        </div>
    );
};

export default Home;