import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleTeamMember from "../supervisor/SingleTeamMember";
import { Navigate, Link, useParams } from "react-router-dom";
import TeamIndividualViewComponenet from "../TeamIndividualViewComponenet";

const AdminTeamIndividualView = () => {
  const [navigate, setNavigate] = useState(false);
  const [message, setMessage] = useState("You are not authenticated");
  const [userData, setUserData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const { selectedTeam } = useParams();

  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/getuser/", {
        withCredentials: true,
      });
      const user = response.data;
      setUserData(user);
      setMessage(`${user.first_name} ${user.last_name}`);
      fetchTeamMembers(user.team);
    } catch (e) {
      console.error(e);
      setNavigate(true);
    }
  };

  const fetchTeamMembers = async (team) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/team_detections/",
        {
          params: { team: team },
        }
      );
      const members = response.data.team_members;
      setTeamMembers(members);
      setTeamLeaders(members.filter((member) => member.is_staff));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <div className="text-center">
        <TeamIndividualViewComponenet team={selectedTeam} role={"Admin"} />
      </div>
    </div>
  );
};

export default AdminTeamIndividualView;
