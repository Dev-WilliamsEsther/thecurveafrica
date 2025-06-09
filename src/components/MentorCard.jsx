import React, { useEffect, useState } from "react";

const MentorCard = ({ selected, triggerShuffle }) => {
  const [displayName, setDisplayName] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    if (triggerShuffle) {
      setIsShuffling(true);
      let counter = 0;

      const interval = setInterval(() => {
        const fakeNames = ["Jane", "Bella", "Titi", "Lola", "Ada"];
        const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
        setDisplayName(randomName);
        counter++;
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setIsShuffling(false);
      }, 1500); // 1.5 seconds
    }
  }, [triggerShuffle]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md cursor-default">
      <img src="images/curve.png" alt="" className="w-10" />
      <h2 className="text-xl font-bold text-center">Mentor</h2>
      <p className="text-center text-lg mt-4 text-gray-800">
        {isShuffling
          ? displayName
          : selected
          ? selected.name
          : "Find Match"}
      </p>
    </div>
  );
};

export default MentorCard;
