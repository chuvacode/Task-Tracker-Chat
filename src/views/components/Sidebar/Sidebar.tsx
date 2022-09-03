import React, {FC, useState} from 'react';
import NavSidebarContainer from '../NavSidebar/NavSidebarContainer';
// @ts-ignore
import Style from './Sidebar.module.css';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {useActions} from '../../../hooks/useActions';
import {authSelectors} from '../../../state/auth';
import ProfileSettings from '../ProfileSettings/ProfileSettings';

const Sidebar: FC = () => {
  const profileImage = useAppSelector(authSelectors.getProfileImage);
  const profileName = useAppSelector(authSelectors.getProfileFullName);
  const {logout} = useActions();

  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const handlerOpenSettings = () => {
    setIsOpenSettings(true);
  };
  const handlerCloseSettings = () => {
    setIsOpenSettings(false);
  };

  return (
    <div className={Style.sidebar}>
      <div className={Style.profileImageContainer}>
        <img className={Style.profileImage} src={!!profileImage ? profileImage : ''} alt={''}/>
      </div>
      <div className={Style.btn}  onClick={handlerOpenSettings}>{profileName}</div>
      {/*<div className={Style.logout} >Настройки</div> /!*style={{marginTop: 'auto'}}*!/*/}
      <div className={Style.btn} onClick={logout}>Выйти</div>
      <NavSidebarContainer/>


      <ProfileSettings isOpen={isOpenSettings} handlerClose={handlerCloseSettings}/>
    </div>
  );
};

export default React.memo(Sidebar);
