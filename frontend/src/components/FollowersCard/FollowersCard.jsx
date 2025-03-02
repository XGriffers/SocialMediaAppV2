import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUsers } from "../../api/UserRequests"; // fixed name
import User from "../User/User";
import { useSelector } from "react-redux";

const FollowersCard = ({ location }) => {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUsers();
      setPersons(data);
      console.log("got all the dudes", data);
    };
    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>Discover Other Users</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}
      <FollowersModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default FollowersCard;