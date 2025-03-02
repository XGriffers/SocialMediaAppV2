import React from "react";
import Noti from "../../img/noti.png";
import Message from "../../img/message.png";
import Settings from "../../img/settings.png";
import SignOut from "../../img/signOut.png";
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import { useDispatch } from "react-redux";

const NavIcons = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
    console.log("bailing out");
  };

  return (
    <div className="navIcons">
      <img src={Settings} alt="settings" />
      <img src={Noti} alt="noti" />
      <Link to="../chat">
        <img src={Message} alt="chat" />
      </Link>
      <Link to="../auth">
        <img src={SignOut} onClick={handleLogOut} alt="signout" />
      </Link>
    </div>
  );
};

export default NavIcons;