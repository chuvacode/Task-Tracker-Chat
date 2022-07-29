import React from "react";
import Style from "./DialogsManager.module.css"

let DialogsManager = props => {
  return (
    <div className={Style.chatManager}>
      <div className={Style.chatManagerHeader}>
        <div className={`${Style.chatManagerHeader__item} ${Style.active}`}>Обсуждения</div>
        <div className={`${Style.chatManagerHeader__item}`}>Контакты</div>
      </div>
      <div className={Style.search}>
        <input type="text" placeholder="Поиск"/>
      </div>
      <div className={Style.dialogs}>
        {props.dialogs.map(dialog => {
          if (dialog.type === props.activeType) {
            return (
              <div className={Style.dialog + " " + (dialog.id === props.currentDialogID ? Style.active : "")}
                   onClick={() => {
                     props.setActiveDialog(dialog.id);
                   }}
                   key={dialog.id}>
                <img className={Style.dialog__image} src={dialog.image}/>
                <div className={Style.dialog__info}>
                  <div className={Style.dialog__title}>Пройти инструктаж по безопасности</div>
                  <div className={Style.dialog__subtitle}>Отдел охраны труда</div>
                </div>
                <div className={Style.dialog__note}>
                  <div className={Style.date}>25 Фев</div>
                  <div className={Style.countNewMessage}>3</div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  );
};

export default DialogsManager;
