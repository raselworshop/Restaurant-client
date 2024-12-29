import React from 'react';
import chefService from '../../assets/home/chef-service.jpg';

const BitroBoss = () => {
    return (
        <div className="relative text-center text-black mb-12">
            <img src={chefService} className='object-cover' alt="Garnishing a dish" />
            <div className='w-fit  lg:px-20'>
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white md:p-10 py-5'>
                    <div className="text-2xl font-bold">BISTRO BOSS</div>
                    <div className="text-base my-5 md:mb-10"> Uniquely drive synergistic customer service vis-a-vis proactive action
                        items. Quickly procrastinate leading-edge e-commerce after user-centric deliverables. Quickly
                        productize strategic networks and diverse scenarios. </div>
                </div>
            </div>
        </div>
    );
};

export default BitroBoss;