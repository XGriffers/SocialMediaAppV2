import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as UserApi from "../../api/UserRequests.js";

const InfoCard = () => {
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        console.log("its me yay", user);
      } else {
        console.log("fetching some rando");
        const { data } = await UserApi.getUser(profileUserId);
        setProfileUser(data);
        console.log("got em", data);
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="info">
        <span><b>Status </b></span>
        <span>{profileUser.relationship || "n/a"}</span>
      </div>
      <div className="info">
        <span><b>Lives in </b></span>
        <span>{profileUser.livesIn || "somewhere"}</span>
      </div>
      <div className="info">
        <span><b>Works at </b></span>
        <span>{profileUser.worksAt || "nowhere lol"}</span>
      </div>
    </div>
  );
};

export default InfoCard;