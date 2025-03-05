import React from 'react';
import { useMealPlan } from '../context/MealPlanContext.js';

const Stats = () => {
  const { meals, peers } = useMealPlan();
  
  // Calculate meal type counts
  const mealTypeCounts = meals.reduce((acc, meal) => {
    acc[meal.mealType] = (acc[meal.mealType] || 0) + 1;
    return acc;
  }, {});
  
  const getMostPopularMealType = () => {
    if (meals.length === 0) return 'N/A';
    
    let maxCount = 0;
    let mostPopular = 'N/A';
    
    for (const [type, count] of Object.entries(mealTypeCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostPopular = type;
      }
    }
    
    return mostPopular.charAt(0).toUpperCase() + mostPopular.slice(1);
  };

  return (
    <div className="stats">
      <div className="stat-card">
        <div className="stat-value">{meals.length}</div>
        <div className="stat-label">Total Meals</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{Object.keys(peers).length}</div>
        <div className="stat-label">Users Online</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{getMostPopularMealType()}</div>
        <div className="stat-label">Most Popular Type</div>
      </div>
    </div>
  );
};

export default Stats;

