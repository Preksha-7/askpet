import React, { useState } from "react";

// Pet data with their characteristics
const pets = [
  {
    id: "dog",
    name: "Shiro the Dog",
    emoji: "🐶",
    image: "/images/dog.png",
    quality:
      "Loyal and goofy. Always happy to help and sometimes a little clumsy.",
    hoverText: "woof woof 🐾",
    hoverColor: "rgb(119, 6, 72)",
  },
  {
    id: "cat",
    name: "Garfy the Cat",
    emoji: "🐱",
    image: "/images/cat.png",
    quality: "Sarcastic and smart. Loves witty comebacks and clever remarks.",
    hoverText: "Meow Meow",
    hoverColor: "rgb(119, 6, 72)",
  },
  {
    id: "penguin",
    name: "Pingu the Penguin",
    emoji: "🐧",
    image: "/images/penguin.png",
    quality:
      'Cool and charming, with a slightly mischievous sense of humor. Loves to "slide" into conversations smoothly.',
    hoverText: "..Pingoooooo",
    hoverColor: "rgb(11, 121, 7)",
  },
  {
    id: "owl",
    name: "Hedwig the Owl",
    emoji: "🦉",
    image: "/images/owl.png",
    quality:
      "Wise and serious, with deep knowledge and a calm, reassuring tone.",
    hoverText: "Hoot Hoot",
    hoverColor: "rgb(28, 156, 49)",
  },
  {
    id: "llama",
    name: "Luna the Llama",
    emoji: "🦙",
    image: "/images/llama.png",
    quality:
      "Sassy and a bit goofy. Always ready with a cheeky comment or a funny story.",
    hoverText: "Llama Llama",
    hoverColor: "rgb(119, 6, 72)",
  },
  {
    id: "octopus",
    name: "Oswald the Octopus",
    emoji: "🐙",
    image: "/images/octopus.png",
    quality:
      "Quirky multitasker, curious and playful. Loves giving answers from multiple angles.",
    hoverText: "Splash Splash",
    hoverColor: "rgb(119, 6, 72)",
  },
  {
    id: "parrot",
    name: "Mithu the Parrot",
    emoji: "🦜",
    image: "/images/parrot.png",
    quality:
      "Talkative and colorful. Mimics your style and loves repeating jokes with flair.",
    hoverText: "Squawk Squawk",
    hoverColor: "rgb(119, 6, 72)",
  },
  {
    id: "turtle",
    name: "Toby the Turtle",
    emoji: "🐢",
    image: "/images/turtle.png",
    quality:
      "Slow and thoughtful. Gives patient, reflective answers with old-school wisdom.",
    hoverText: "Slow and Steady",
    hoverColor: "rgb(119, 6, 72)",
  },
  {
    id: "koala",
    name: "Koko the Koala",
    emoji: "🐨",
    image: "/images/koala.png",
    quality:
      "Calm, chill, and a bit sleepy. Gives laid-back, wise advice with a gentle vibe.",
    hoverText: "Eucalyptus Dreams",
    hoverColor: "rgb(119, 6, 72)",
  },
];

// Main App Component
function App() {
  const [currentView, setCurrentView] = useState("home");
  const [selectedPet, setSelectedPet] = useState(null);

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setCurrentView("pet");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    setSelectedPet(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url(/bg1.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        fontFamily: "sans-serif",
        textAlign: "center",
        color: "rgba(1, 57, 71, 0.5)",
        margin: 0,
        padding: 0,
      }}
    >
      {currentView === "home" ? (
        <HomePage onPetSelect={handlePetSelect} />
      ) : (
        <PetPage pet={selectedPet} onBack={handleBackToHome} />
      )}
    </div>
  );
}

// Home Page Component
function HomePage({ onPetSelect }) {
  return (
    <div>
      <h1
        style={{
          fontSize: "50px",
          margin: "20px 0",
        }}
      >
        Ask your AI Pet
      </h1>
      <h3
        style={{
          fontSize: "30px",
          margin: "20px 0 40px 0",
        }}
      >
        Pick a pet and ask away !!
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px",
          padding: "40px",
          maxWidth: "1000px",
          margin: "0 auto",
          color: "white",
        }}
      >
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onSelect={onPetSelect} />
        ))}
      </div>
    </div>
  );
}

// Pet Card Component
function PetCard({ pet, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: "rgba(1, 57, 71, 0.5)",
        padding: "15px",
        borderRadius: "12px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        cursor: "pointer",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
        boxShadow: isHovered ? "0 4px 10px rgba(1, 57, 71, 0.5)" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(pet)}
    >
      <img
        src={pet.image}
        alt={pet.name}
        style={{
          width: "150px",
          height: "150px",
          objectFit: "contain",
          background: "transparent",
        }}
      />
      <p
        style={{
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {pet.name}
      </p>
      {isHovered && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: "#ddd",
          }}
        >
          {pet.quality}
        </p>
      )}
    </div>
  );
}

// Pet Page Component
function PetPage({ pet, onBack }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const responses = {
        dog: [
          "Woof! That's a great question! *tail wagging intensely*",
          "Oh boy oh boy! I think... *gets distracted by own tail* ...wait, what was the question?",
          "Ruff! Let me think about that while I chase this interesting smell...",
          "Bark bark! You're asking the right dog! Here's what I think...",
        ],
        cat: [
          "*yawn* I suppose I could answer that... if I feel like it.",
          "Purrhaps you should figure that out yourself, human.",
          "Meow. That's actually... not a terrible question. *surprised*",
          "*stretches lazily* Fine, I'll grace you with my wisdom...",
        ],
        penguin: [
          "Cool question! Let me slide into this answer smoothly...",
          "*slides on belly* Wheee! Now, about your question...",
          "Ice to meet your curiosity! Here's what I think...",
          "That's snow joke! Let me waddle through this answer...",
        ],
        owl: [
          "Hoot. A wise question indeed. Let me share my knowledge...",
          "*adjusts feathers thoughtfully* The answer, young one, is...",
          "In my many years of wisdom, I have observed that...",
          "Whooo asks such thoughtful questions? You do! Here's my answer...",
        ],
        llama: [
          "No prob-llama! I've got this answer for you!",
          "*strikes a pose* Drama llama here with your answer!",
          "Llama tell you something interesting about that...",
          "That's a llama-zing question! Here's what I think...",
        ],
        octopus: [
          "With all my arms, I can tackle this from multiple angles!",
          "*waves tentacles* Let me ink about that for a moment...",
          "Tentacle-ly speaking, here's my answer...",
          "I'm all arms when it comes to helping! Here's what I think...",
        ],
        parrot: [
          "Squawk! Great question! Great question! *mimics your voice*",
          "Pretty bird says: Here's your answer!",
          "*ruffles colorful feathers* Let me repeat that back to you...",
          "Polly wants to answer! Here's what I think...",
        ],
        turtle: [
          "Slow down there... let me think about this carefully...",
          "*retreats into shell briefly* Ah yes, here's my thoughtful response...",
          "In my many years of slow living, I've learned that...",
          "Shell I tell you what I think? *chuckles slowly*",
        ],
        koala: [
          "*yawns* That's a chill question... let me think while I munch some eucalyptus...",
          "G'day mate! Here's a laid-back answer for you...",
          "*stretches sleepily* Even half-asleep, I can answer that...",
          "Koala-ty question! Here's my relaxed response...",
        ],
      };

      const petResponses = responses[pet.id] || [
        "That's an interesting question!",
      ];
      const randomResponse =
        petResponses[Math.floor(Math.random() * petResponses.length)];

      setAnswer(randomResponse);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          background: "rgba(1, 57, 71, 0.7)",
          color: "white",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        ← Back to Pets
      </button>

      <h1 style={{ fontSize: "50px", margin: "20px 0" }}>
        {pet.emoji} Hi! I'm {pet.name.split(" ")[0]}
      </h1>
      <h3 style={{ fontSize: "30px", margin: "20px 0" }}>Ask me anything!</h3>

      <div
        style={{
          background: "rgba(1, 57, 71, 0.5)",
          padding: "40px",
          margin: "40px auto",
          width: "90%",
          maxWidth: "600px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(1, 57, 71, 0.5)",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginBottom: "20px",
          }}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <img
            src={pet.image}
            alt={pet.name}
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
              transition: "transform 0.3s ease",
              transform: isImageHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: pet.hoverColor,
              fontWeight: "bold",
              padding: "8px 16px",
              borderRadius: "10px",
              fontSize: "18px",
              whiteSpace: "nowrap",
              opacity: isImageHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          >
            {pet.hoverText}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question here..."
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "25px",
              width: "70%",
              maxWidth: "400px",
              fontSize: "16px",
              outline: "none",
              background: "#fff",
              color: "#013947",
            }}
            disabled={isLoading}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "25px",
              backgroundColor:
                isLoading || !question.trim() ? "#666" : "#013947",
              color: "#fff",
              fontWeight: "bold",
              cursor: isLoading || !question.trim() ? "not-allowed" : "pointer",
              transition: "background-color 0.3s ease",
            }}
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? "Thinking..." : "Submit"}
          </button>
        </div>

        {answer && (
          <div
            style={{
              marginTop: "20px",
              color: "#fff",
              fontSize: "18px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
