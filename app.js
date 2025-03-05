import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import MealGallery from './components/MealGallery.js';
import MealForm from './components/MealForm.js';
import UsersOnline from './components/UsersOnline.js';
import Stats from './components/Stats.js';
import { MealPlanProvider } from './context/MealPlanContext.js';

const App = () => {
  const [activeTab, setActiveTab] = useState('gallery');

  return (
    <MealPlanProvider>
      <div className="container">
        <header>
          <h1>Vegan Meal Planner</h1>
          <UsersOnline />
        </header>
        
        <div className="tabs">
          <div 
            className={`tab ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            Meal Gallery
          </div>
          <div 
            className={`tab ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create Meal
          </div>
        </div>

        <Stats />
        
        {activeTab === 'create' && <MealForm />}
        {activeTab === 'gallery' && <MealGallery />}
      </div>
    </MealPlanProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

