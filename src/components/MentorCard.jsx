import React, { useEffect, useState } from "react";

const MentorCard = ({ selectedMentor, triggerShuffle }) => {
  const [displayName, setDisplayName] = useState(null);
  const [isShuffling, setIsShuffling] = useState(false);
  console.log(selectedMentor)

  useEffect(() => {
    if (triggerShuffle) {
      setIsShuffling(true);
      let counter = 0;

      const interval = setInterval(() => {
        const fakeNames = ["Agbo Emmanuel", "Ogudu Sylveste", "	Jehoshaphat", "	Kingsley Adio", "Suliton Olalere"];
        const randomName = fakeNames[Math.floor(Math.random() * fakeNames.length)];
        setDisplayName(randomName);
        counter++;
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setIsShuffling(false);
      }, 2000); 
    }
  }, [triggerShuffle]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md cursor-default">
      <img src="images/curve.png" alt="" className="w-10" />
      <h2 className="text-xl font-bold text-center">Mentor</h2>
      <p className="text-center text-lg mt-4 text-gray-800">
        {isShuffling
          ? displayName
          : selectedMentor
      }</p>
    </div>
  );
};

export default MentorCard;
