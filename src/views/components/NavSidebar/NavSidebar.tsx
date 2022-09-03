import React, {FC, useEffect} from 'react';
// @ts-ignore
import Style from './NavSidebar.module.css';
import {matchPath, NavLink} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {chatOperations, chatSelectors} from '../../../state/chat';
import {AppDispatch} from '../../../state/store';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {RouteNames} from '../../../router';

const NavSidebar: FC = () => {

  const dispatch: AppDispatch = useDispatch();
  const countUnread = useAppSelector(chatSelectors.getCountUnread);
  const dialogs = useAppSelector(chatSelectors.getDialogs);

  useEffect(() => {
    dispatch(chatOperations.calculateCountUnread());
  }, [dialogs]);

  return (
    <div className={Style.nav}>
      <NavLink className={Style.link + ' ' + Style.linkActive} to={'/chat'}>
        Сообщения
        {countUnread > 0 ? <span className={Style.counter}>{countUnread}</span> : ''}
      </NavLink>
      <NavLink className={Style.link + ' ' + Style.linkActive} to={RouteNames.CLIENTS}>
        Клиенты
      </NavLink>
      {/*<NavLink className={Style.link} to="/task-line">*/}
      {/*    Лента задач*/}
      {/*    <span className={Style.counter}>12</span>*/}
      {/*</NavLink>*/}
      {/*<NavLink className={Style.link} to="/clients">Клиенты</NavLink>*/}
    </div>
  );
};

export default NavSidebar;
