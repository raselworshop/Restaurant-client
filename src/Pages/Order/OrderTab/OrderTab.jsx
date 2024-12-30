import React from 'react';
import DishCard from '../../../Component/shared/DishCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };
    const itemPerSlide = 3;
    const slides = [];
    for(let i=0; i<items.length; i += itemPerSlide){
        slides.push(items.slice(i, i+itemPerSlide))
    }

    return (
        <div>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
            {slides.map((slideItem, idx)=>(
                <SwiperSlide key={idx}>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 my-12'>
                    {slideItem.map(item => <DishCard
                        key={item._id}
                        item={item}
                    ></DishCard>)}
                </div>
            </SwiperSlide>
            ))}

            </Swiper>
        </div>
    );
};

export default OrderTab;