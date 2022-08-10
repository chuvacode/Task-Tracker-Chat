import React, {FC} from 'react';
// @ts-ignore
import Style from './NavSidebar.module.css';
import {NavLink} from 'react-router-dom';

type Props = {
    countNewMessages: number
}

const NavSidebar: FC<Props> = ({countNewMessages}) => {
    return (
        <div className={Style.nav}>
            <NavLink className={Style.link + ' ' + Style.linkActive} to="/chat">
                Сообщения
                {countNewMessages > 0 ? <span className={Style.counter}>{countNewMessages}</span> : ''}
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
