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
        <div className={Style.dialog}>
          <img className={Style.dialog__image} src="https://picsum.photos/100/100?random=1"/>
          <div className={Style.dialog__info}>
            <div className={Style.dialog__title}>Пройти инструктаж по безопасности</div>
            <div className={Style.dialog__subtitle}>Отдел охраны труда</div>
          </div>
          <div className={Style.dialog__note}>
            <div className={Style.date}>25 Фев</div>
            <div className={Style.countNewMessage}>3</div>
          </div>
        </div>
        <div className={Style.dialog}>
          <img className={Style.dialog__image} src="https://picsum.photos/100/100?random=2"/>
          <div className={Style.dialog__info}>
            <div className={Style.dialog__title}>Реализация товаров и услуг</div>
            <div className={Style.dialog__subtitle}>Отдел продаж</div>
          </div>
          <div className={Style.dialog__note}>
            <div className={Style.date}>25 Фев</div>
            <div className={Style.countNewMessage}>3</div>
          </div>
        </div>
        <div className={Style.dialog}>
          <img className={Style.dialog__image} src="https://picsum.photos/100/100?random=3"/>
          <div className={Style.dialog__info}>
            <div className={Style.dialog__title}>Провести обучение новых сотрудни...</div>
            <div className={Style.dialog__subtitle}>Отдел продаж</div>
          </div>
          <div className={Style.dialog__note}>
            <div className={Style.date}>25 Фев</div>
            <div className={Style.countNewMessage}>3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogsManager;
