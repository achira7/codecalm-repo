import React, { useEffect, useState } from "react";
import axios from "axios";

const AddTeam = ({ teamId }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    const teamData = { name, description };

    await axios.post("http://localhost:8000/api/team/", teamData)
    .then(() => alert("Team created successfully"))
    .catch(error => console.error("There was an error creating the team!", error));
  }

  return (
    <div>
      <h2>Create Team</h2>
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <form method="POST" onSubmit={handleSubmit}>
        <div>
          <label>Team Name:</label>
          <input
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            placeholder="Team Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Team Description:</label>
          <textarea
            name="description"
            placeholder="Team Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
                    className="flex w-full justify-center rounded-md disabled:bg-green-200 disabled:text-gray-400 bg-green-300 px-3 py-1.5 font-google text-sm font-semibold leading-6 text-neutral-950 shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-300"
                    type="submit"
                  >
                    Create Team
                  </button>
      </form>
    </div>
    </div>
  );
};

export default AddTeam;
