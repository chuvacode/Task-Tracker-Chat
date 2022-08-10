import React, {FunctionComponent} from 'react';
import NavSidebarContainer from '../NavSidebar/NavSidebarContainer';
// @ts-ignore
import Style from './Sidebar.module.css';

type Props = {
    profileImage: string | null
    profileName: string | null
    logout: () => void
}

const Sidebar: FunctionComponent<Props> = ({profileImage, profileName, logout}) => {
  return (
    <div className={Style.sidebar}>
      <div className={Style.profileImageContainer}>
        <img className={Style.profileImage} src={!!profileImage ? profileImage : ''} alt={''} />
      </div>
      <div className={Style.profileName}>{profileName}</div>

      <div className={Style.logout} onClick={logout}>Выйти</div>

      <NavSidebarContainer/>
    </div>
  );
};

export default Sidebar;
