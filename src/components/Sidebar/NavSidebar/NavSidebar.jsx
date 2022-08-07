import React from 'react';
import Style from './NavSidebar.module.css';
import {NavLink} from 'react-router-dom';

const NavSidebar = props => {
  return (
    <div className={Style.nav}>
      <NavLink className={Style.link + ' ' + Style.linkActive} to="/chat">
        Сообщения
        {props.countNewMessages > 0 ? <span className={Style.counter}>{props.countNewMessages}</span> : ''}
      </NavLink>
      <NavLink className={Style.link} to="/task-line">
        Лента задач
        <span className={Style.counter}>12</span>
      </NavLink>
      <NavLink className={Style.link} to="/clients">Клиенты</NavLink>
    </div>
  );
};

export default NavSidebar;
