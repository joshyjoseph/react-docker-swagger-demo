import React, { useState } from "react";
import axios from "axios";
import "../Style.css";
import { Teams } from "./Teams";

export default function MainPage() {
  const [teamName, setTeamName] = useState("");
  const [teamRole, setTeamRole] = useState("");
  const [queryTeam, setQueryRole] = useState("");
  const [data, setData] = useState([]);

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleTeamRoleChange = (event) => {
    setTeamRole(event.target.value);
  };

  const handleQueryTeamChange = (event) => {
    setQueryRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "/add";
    const payload = { teamName: teamName, teamRole: teamRole };
    axios.post(url, payload).then((response) => {
      setData(`Inserted => { ${teamName} : ${teamRole} }`)
    });
  };

  const handleQueryTeamSubmit = (event) => {
    event.preventDefault();
    const url = "http://0.0.0.0:5678/fetch/" + queryTeam;
    axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  const handleFetchAll = (event) => {
    event.preventDefault();
    const url = "http://0.0.0.0:5678/fetch";
    axios.get(url).then((response) => {
      setData(response.data);
    });
  };

  return (
    <div>
      <div></div>
      <div className="split left">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={teamName}
                placeholder="Enter Team Name"
                onChange={handleTeamNameChange}
              ></input>
              <input
                type="text"
                value={teamRole}
                placeholder="Enter Team Role"
                onChange={handleTeamRoleChange}
              ></input>
              <button type="submit" value="Submit">
                Submit
              </button>
            </div>
          </form>
        </div>
        <br />
        <div className="container">
          <form onSubmit={handleQueryTeamSubmit}>
            <div>
              <label>Team Name</label>
              <input
                type="text"
                value={queryTeam}
                placeholder="Enter name of the team name to query"
                onChange={handleQueryTeamChange}
              ></input>
              <button type="submit" value="Submit" onSubmit={handleSubmit}>
                Show
              </button>
            </div>
          </form>
        </div>
        <br />
        <div className="container">
          <h2> <a href="http://0.0.0.0:5678/doc"> swager api </a></h2>
        </div>
      </div>
      <div className="split right">
        <div className="container">
          <button type="submit" style={{ float: "right" }} onClick={handleFetchAll}>
            FetchAll
          </button>
        </div>
        <br />
        <Teams data={data} handleFetchAll={handleFetchAll} />
      </div>
    </div>
  );
}
