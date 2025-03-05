import React, { createContext, useContext, useState, useEffect } from 'react';

const MealPlanContext = createContext();

export const useMealPlan = () => useContext(MealPlanContext);

export const MealPlanProvider = ({ children }) => {
  const [room, setRoom] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [peers, setPeers] = useState({});

  useEffect(() => {
    const initializeRoom = async () => {
      try {
        const newRoom = new WebsimSocket();
        setRoom(newRoom);

        // Handle peer updates
        newRoom.party.subscribe((currentPeers) => {
          setPeers(currentPeers);
        });

        // Load meals
        newRoom.collection('vegan_meal').subscribe((mealsList) => {
          // Sort by creation date (newest first)
          const sortedMeals = [...mealsList].sort((a, b) => 
            new Date(b.created_at) - new Date(a.created_at)
          );
          setMeals(sortedMeals);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error initializing room:', error);
        setIsLoading(false);
      }
    };

    initializeRoom();
  }, []);

  const generateMeal = async (options) => {
    if (!room) return;
    
    setIsGenerating(true);
    try {
      // First, generate the meal description using LLM
      const mealPrompt = `
Create a unique and creative vegan ${options.mealType} recipe with the following preferences: ${options.preferences}.
${options.ingredients !== 'any ingredients' ? `Include these ingredients if possible: ${options.ingredients}.` : ''}
Format your response as JSON with the following structure:
{
  "title": "Name of the dish",
  "description": "Brief description and key features of the dish (3-4 sentences)",
  "ingredients": ["List", "of", "main", "ingredients"],
  "prep_time": "Estimated preparation time",
  "nutritional_highlights": "Brief note about nutritional benefits"
}
      `;
      
      const mealCompletion = await websim.chat.completions.create({
        messages: [
          {
            role: "user",
            content: mealPrompt
          }
        ],
        json: true
      });
      
      const mealDetails = JSON.parse(mealCompletion.content);
      
      // Now, generate an image based on the meal description
      const imagePrompt = `
A professional food photography style image of a ${mealDetails.title}. 
This is a vegan ${options.mealType} dish. 
${mealDetails.description} 
The dish features ${mealDetails.ingredients.join(', ')}. 
Make it look appetizing and visually appealing with beautiful presentation, proper lighting, and styling.
      `;
      
      const imageResult = await websim.imageGen({
        prompt: imagePrompt,
        aspect_ratio: "3:2"
      });
      
      // Store the meal in the database
      await room.collection('vegan_meal').create({
        title: mealDetails.title,
        description: mealDetails.description,
        ingredients: mealDetails.ingredients,
        prep_time: mealDetails.prep_time,
        nutritional_highlights: mealDetails.nutritional_highlights,
        mealType: options.mealType,
        preferences: options.preferences,
        imageUrl: imageResult.url
      });
      
    } catch (error) {
      console.error('Error generating meal:', error);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MealPlanContext.Provider 
      value={{ 
        meals,
        isLoading,
        isGenerating,
        peers,
        generateMeal
      }}
    >
      {children}
    </MealPlanContext.Provider>
  );
};

