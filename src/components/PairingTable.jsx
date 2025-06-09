import React from "react";

const PairingTable = ({ pairings }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">🧑‍🤝‍🧑 Matched Pairs</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Mentee</th>
            <th className="p-2">Mentor</th>
            <th className="p-2">Stack</th>
          </tr>
        </thead>
        <tbody>
          {pairings.map((pair, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{pair.mentees
              }</td>
              <td className="p-2">{pair.mentor
              }</td>
              <td className="p-2">{pair.stack}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PairingTable;
