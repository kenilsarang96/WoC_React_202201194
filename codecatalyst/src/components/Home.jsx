import React from 'react';
import Card from './Card';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const features = [
    {
      title: 'AI Chatbot Support',
      description: 'Get real-time coding help and suggestions using our AI-powered assistant.',
      icon: 'chat', 
    },
    {
      title: 'Integrated Terminal',
      description: 'Run commands and debug your code with a built-in terminal.',
      icon: 'terminal',
    },
    {
      title: 'Flexible Input Options',
      description: 'Use keyboard, voice, or even handwriting to write your code.',
      icon: 'input', 
    },
    {
      title: 'Multiple Themes',
      description: 'Switch between dark, light, and custom themes for a personalized experience.',
      icon: 'palette', 
    },
    {
      title: 'Code Anywhere',
      description: 'Access your projects and collaborate in real-time from any device.',
      icon: 'code', 
    },
    {
      title: 'Rich Editor',
      description: 'Enjoy syntax highlighting, auto-completion, and more.',
      icon: 'edit', 
    },
    {
      title: 'File Saving with Login',
      description: 'Save your files securely and access them anytime when logged in.',
      icon: 'save', 
    },
    {
      title: 'Multiple Languages Supported',
      description: 'Write and run code in various programming languages, including Python, Java, and C++.',
      icon: 'language',
    },
  ];

  return (
    <div className="w-full">
      <div className="text-center p-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-blue-600">Welcome to Your Coding Playground!</h1>
        <p className="mt-4 text-gray-700">
          Programming isn't about what you know; it's about what you can figure out. – Chris Pine
        </p>
        <div className="mt-6 flex flex-col items-center space-y-4">
          <Button
            variant="primary"
            size="medium"
            onClick={()=>navigate("/guest")}
          >
            Explore as Guest
          </Button>
          <Button
            variant="outline"
            size="medium"
            icon={<span className="material-icons">lock_open</span>}
            iconPosition="left"
            onClick={()=>navigate("/signup")}
          >
            Sign up for free to
            Unlock More Features
          </Button>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          Log in to access advanced features like file saving and personalized settings.
        </p>
      </div>

      <div className="mt-10 p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Features</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title} 
              title={feature.title}   
              description={feature.description} 
              icon={feature.icon} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;