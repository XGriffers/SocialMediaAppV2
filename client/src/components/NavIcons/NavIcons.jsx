import React from "react";

import Noti from "../../img/noti.png";
import Message from "../../img/message.png";
import Settings from "../../img/settings.png";
import SignOut from '../../img/signOut.png';
import { Link } from "react-router-dom";
import { logout } from "../../actions/AuthActions";
import { useDispatch } from "react-redux";



const NavIcons = () => {
  const handleLogOut = () => {
    dispatch(logout())
  }
  const dispatch = useDispatch()
  return (
    <div className="navIcons">
      <img src={Settings} alt="" />

      <img src={Noti} alt="" />

      <Link to="../chat">
        <img src={Message} alt="" />
      </Link>

      <Link to={'../auth'}>
        <img src={SignOut} onClick={handleLogOut} alt="" />
      </Link>
    </div>
  );

};

export default NavIcons;
