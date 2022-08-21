import React, {FC, useEffect} from 'react';
// @ts-ignore
import Style from './NavSidebar.module.css';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {chatOperations, chatSelectors} from '../../../state/chat';
import {DispatchWithThunk} from '../../../state/store';

const NavSidebar: FC = () => {

  const dispatch: DispatchWithThunk = useDispatch();
  const countUnread = useSelector(chatSelectors.getCountUnread);
  const dialogs = useSelector(chatSelectors.getDialogs);

  useEffect(() => {
    dispatch(chatOperations.calculateCountUnread());
  }, [dialogs]);

  return (
    <div className={Style.nav}>
      <NavLink className={Style.link + ' ' + Style.linkActive} to="/chat">
        Сообщения
        {countUnread > 0 ? <span className={Style.counter}>{countUnread}</span> : ''}
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
