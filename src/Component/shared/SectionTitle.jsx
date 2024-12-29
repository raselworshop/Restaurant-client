import React from 'react';

const SectionTitle = ({heading, subheading}) => {
    return (
        <div className='md:w-4/12 mx-auto text-center my-8 '>
            <p className='text-yellow-600 mb-2'>{subheading}</p>
            <h3 className='text-2xl md:text-3xl lg:text-4xl uppercase border-y-4 py-5'>{heading}</h3>
        </div>
    );
};

export default SectionTitle;