import React from 'react';
import { useMealPlan } from '../context/MealPlanContext.js';
import MealCard from './MealCard.js';

const MealGallery = () => {
  const { meals, isLoading } = useMealPlan();

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (meals.length === 0) {
    return (
      <div className="generator-form">
        <h2>No meals yet</h2>
        <p>Be the first to generate a vegan meal by clicking on the "Create Meal" tab!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Community Meal Gallery</h2>
      <div className="meal-gallery">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealGallery;

