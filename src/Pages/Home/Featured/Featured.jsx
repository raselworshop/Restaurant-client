import React from 'react';
import SectionTitle from '../../../Component/shared/SectionTitle';
import featured from '../../../assets/home/featured.jpg';
import './Featured.css'

const Featured = () => {
    return (
        <section className='featured-item text-white py-8 my-16 bg-fixed'>
            <SectionTitle heading={"Featured Item"} subheading={"---Check it out---"}></SectionTitle>
            <div className='md:flex items-center justify-center py-8 px-16
            bg-slate-500 opacity-60
            '>
                <div>
                    <img src={featured} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>May 06, 2026</p>
                    <p className='uppercase'>Where can I get some?</p>
                    <p>
                        Seamlessly plagiarize global architectures vis-a-vis open-source internal or "organic" sources. Dynamically evisculate market-driven manufactured products and strategic methods of empowerment. Phosfluorescently leverage existing resource-leveling metrics for impactful methods of empowerment. Progressively fabricate integrated methods of empowerment through extensive.
                    </p>
                    <button className='btn border-b-4 border-b-black md:mt-12 lg:mt-16'>Order Now</button>
                </div>
            </div>
        </section>
    );
};

export default Featured;