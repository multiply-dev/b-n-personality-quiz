import React, { useState } from 'react';
import ChewCrew from './components/ChewCrew/ChewCrew';
import Question from './components/Question/Question';
import Results from './components/Results/Results';

import Question1 from './assets/Question1.png';
import Question2 from './assets/Question2.png';
import Question3 from './assets/Question3.png';
import Question4 from './assets/Question4.jpg';
import Question5 from './assets/Question5.png';

import './App.css';

const questions = [
  { id: 1, 
    question: "How would your friends describe you?", 
    choices: ['Kind And Loyal', 'Fun and Adventurous', 'Intelligent And Creative', 'Strong and Brave'],
    image: Question1
  },
  { id: 2, 
    question: "How do you spend your free time?", 
    choices: ['Reading a book', 'Socializing with friends', 'Arts and Crafts', 'Exercising and Sports'],
    image: Question2
  },
  { id: 3, 
    question: "Where's your ideal getaway?", 
    choices: ['Relaxing on the beach', 'Hitting the ski slopes', 'Exploring a new city', 'Camping in the mountains'],
    image: Question3 
  },
  { id: 4, 
    question: "What's your fantasy superpower?", 
    choices: ['Control the weather', 'Invisibility', 'Flying', 'Super Strength'],
    image: Question4
  },
  { id: 5, 
    question: "What's the best OG Flavor?", 
    choices: ['Strawberry', 'Grape', 'Mango', 'Green Apple'] ,
    image: Question5
  }
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleAnswer = (choice) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = choice;
    setAnswers(newAnswers);
    setCurrentQuestion(currentQuestion+1);
  };

  const handleSignupComplete = () => {
    setIsSignedUp(true);
  };

  return (
    <div className="container">
      {currentQuestion < questions.length ? (
        <Question
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />
      )
       : !isSignedUp ? (
        <ChewCrew onSignupComplete={handleSignupComplete} />
      ) 
      : (
        <Results answers={answers} />
      )}
    </div>
  );
};

export default App;