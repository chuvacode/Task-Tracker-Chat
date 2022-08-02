import React from "react";
import Style from "./Sidebar.module.css"
import NavSidebarContainer from "./NavSidebar/NavSidebarContainer";

let Sidebar = props => {
  return (
    <div className={Style.sidebar}>
      <div className={Style.profileImageContainer}>
        <img className={Style.profileImage} src={props.profileImage} alt={''} />
      </div>
      <div className={Style.profileName}>{props.profileName}</div>

      <div className={Style.logout} onClick={props.logout}>Выйти</div>

      <NavSidebarContainer/>
    </div>
  );
};

export default Sidebar;
