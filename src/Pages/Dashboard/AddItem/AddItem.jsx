import React from 'react';
import SectionTitle from '../../../Component/shared/SectionTitle';
import RecipeForm from './RecipeForm';

const AddItem = () => {
    return (
        <div>
            <SectionTitle heading={'add an item'} subheading={"What's new?"}></SectionTitle>
            <RecipeForm/>
        </div>
    );
};

export default AddItem;