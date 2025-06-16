import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import MenteeCard from "./components/MenteeCard";
import MentorCard from "./components/MentorCard";
import PairingTable from "./components/PairingTable";
import axios from "axios";

const initialMentees = [
  { name: "Ada", stack: "Frontend" },
  { name: "Bola", stack: "Backend" },
  { name: "Tolu", stack: "DevOps" },
  { name: "Esther", stack: "Product Design" },
  { name: "Chioma", stack: "Frontend" },
  { name: "Ben", stack: "Product Design" },
  { name: "Adio", stack: "Backend" },
  { name: "Maggie", stack: "Frontend" },
];

const initialMentors = [
  { name: "Mr. John", stack: "Frontend" },
  { name: "Ms. Grace", stack: "Backend" },
  { name: "Mr. Azeez", stack: "Product Design" },
  { name: "Mr. Colin", stack: "Frontend" },
  { name: "Mr. Tunde", stack: "Product Design" },
  { name: "Mr. Cynthia", stack: "Frontend" },
  { name: "Mr. Ahmed", stack: "Backend" },
  { name: "Mr. Tuni", stack: "DevOps" },
];

const App = () => {
  const [mentees, setMentees] = useState(initialMentees);
  const [mentors, setMentors] = useState(initialMentors);

  const [selectedMentee, setSelectedMentee] = useState("Find a mentee");
  const [selectedMentor, setSelectedMentor] = useState("Find a mentor");

  const [pairings, setPairings] = useState([]);

  const [selectedTab, setSelectedTab] = useState("");

  const [triggerMenteeShuffle, setTriggerMenteeShuffle] = useState(false);
  const [triggerMentorShuffle, setTriggerMentorShuffle] = useState(false);

  const [history, setHistory] = useState([]);

  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  const getRandomFromList = (list) => {
    const index = Math.floor(Math.random() * list.length);
    return list[index];
  };

  const apiPair = "https://mentorship-system.onrender.com/api/get-pairings?";

  const getpairing = async (stack) => {
    try {
      const api = await axios.get(`${apiPair}stack=${stack}`);
      console.log(api.data.data);
      setHistory(api.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedTab) {
      getpairing(selectedTab);
    }
  }, [selectedTab]);

  const handlePair = async (stack) => {
    console.log("Pair made");
    const apiUrl = "https://mentorship-system.onrender.com/api/run?";

    try {
      const api = await axios.get(`${apiUrl}stack=${stack}`);
      console.log(api);
      setSelectedMentee(api?.data?.data?.mentee);
      setSelectedMentor(api?.data?.data?.mentor);
       setTimeout(() => {
        getpairing(stack);
       }, 4000);

      if (api?.data?.success === false) {
        alert(api?.data?.message);
        setSelectedMentor("Find a mentor");
        setSelectedMentee("Find a mentee");
        return;
      }
    } catch (err) {
      console.log(err);
    }

    const mentee = getRandomFromList(mentees);
    const mentor = getRandomFromList(mentors);

    setTriggerMenteeShuffle(true);
    setTriggerMentorShuffle(true);

    setTimeout(() => {
      // Stop shuffle trigger
      setTriggerMenteeShuffle(false);
      setTriggerMentorShuffle(false);

      // Remove paired names
      // setMentees(prev => prev.filter(m => m.name !== mentee.name));
      // setMentors(prev => prev.filter(m => m.name !== mentor.name));

      // Save the pair
      const newPair = {
        mentee: mentee.name,
        mentor: mentor.name,
        stack: mentee.stack,
      };
      setPairings((prev) => [...prev, newPair]);

      // Show confetti
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 1500);
  };

  // useEffect(() => {
  //   if (selectedMentor && selectedMentee) {
  //     setSelectedMentor(null);
  //     setSelectedMentee(null);
  //   }
  // }, [selectedMentor, selectedMentee]);

  const filteredPairings =
    selectedTab === "All"
      ? history
      : history.filter((pair) => pair.stack === selectedTab);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-8 font-sans">
        {showConfetti && <Confetti width={width} height={height} />}
        <h1 className="text-3xl font-bold text-center mb-6">
          <img src="images/curve.png" alt="" className="w-20" /> Mentor-Mentee
          Pairing
        </h1>

        <div className="flex justify-center space-x-4 mb-6 capitalize">
          {["Frontend", "Backend", "Product Design"].map((stack) => (
            <button
              key={stack}
              onClick={() => setSelectedTab(stack)}
              className={`px-4 py-2 rounded-[4px] font-semibold transition border-black ${
                selectedTab === stack
                  ? "bg-orange-400 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {stack}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-10 mb-6">
          <MenteeCard
            selectedMentee={selectedMentee}
            triggerShuffle={triggerMenteeShuffle}
          />
          <button
            onClick={() => handlePair(selectedTab)}
            disabled={selectedTab === ""}
            style={{
              background: selectedTab === "" ? "#ccc" : "orange",
              cursor: selectedTab === "" ? "not-allowed" : "pointer",
              color: selectedTab === "" ? "#666" : "black",
            }}
            className="cursor-pointer px-10 h-16 bg-orange-400 rounded-[4px] hover:bg-orange-500 transition"
          >
            <h1 className="text-2xl font-bold text-center">Pair</h1>
          </button>
          <MentorCard
            selectedMentor={selectedMentor}
            triggerShuffle={triggerMentorShuffle}
          />
        </div>

        <PairingTable pairings={filteredPairings} />
      </div>
    </>
  );
};

export default App;
 