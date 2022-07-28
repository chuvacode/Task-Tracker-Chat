import React from "react";
import Style from "./Chat.module.css"

let Chat = props => {
  return (
    <div className={Style.chatContainer}>
      <div className={Style.chatManager}>
        <div className={Style.chatManagerHeader}>
          <div className={`${Style.chatManagerHeader__item} ${Style.active}`}>Обсуждения</div>
          <div className={`${Style.chatManagerHeader__item}`}>Контакты</div>
        </div>

        <div className={Style.search}>
          <input type="text" placeholder="Поиск" />
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

      <div className={Style.dialogWindow}>
        <div className={Style.dialogWindowHeader}>
          <div className={Style.dialogWindowHeader__title}>Реализация товаров и услуг</div>
          <div className={Style.dialogWindowHeader__subtitle}>Отдел продаж</div>
        </div>

        <div className={Style.messenger}>
          <div className={Style.message}>
            <div className={Style.messageInfo}>
              <img className={Style.profileImage} src="https://picsum.photos/100/100?random=5" />
              <div className={Style.messageTime}>11:05</div>
            </div>
            <div className={Style.messageContent}>
              <div className={Style.profileName}>Карина Привезенцева</div>
              <div className={Style.messageText}>Привет! Заполняю сейчас документ по «Ромашке». Какие им нужны гвозди и сколько штук? Уточни, пожалуйста.</div>
            </div>
          </div>
          <div className={Style.message}>
            <div className={Style.messageInfo}>
              <img className={Style.profileImage} src="https://picsum.photos/100/100?random=6" />
              <div className={Style.messageTime}>12:17</div>
            </div>
            <div className={Style.messageContent}>
              <div className={Style.profileName}>Марсель Немировский</div>
              <div className={Style.messageText}>Валерия, твои пироги просто бомба! 😋 Обалдеть! Просто невероятно вкусно!</div>
            </div>
          </div>

          <div className={Style.myMessage}>

            <div className={Style.messageContent}>
              <div className={Style.messageText}>Валерия, твои пироги просто бомба! 😋 Обалдеть! Просто невероятно вкусно!</div>
            </div>
            <div className={Style.messageInfo}>
              <div className={Style.messageTime}>12:17</div>
            </div>
          </div>

          <div className={Style.message}>
            <div className={Style.messageInfo}>
              <img className={Style.profileImage} src="https://picsum.photos/100/100?random=7" />
              <div className={Style.messageTime}>12:20</div>
            </div>
            <div className={Style.messageContent}>
              <div className={Style.profileName}>Роман Гордеев</div>
              <div className={Style.messageText}>Уточнил: медные 60 шт.</div>
            </div>
          </div>

          <div className={Style.myMessage}>

            <div className={Style.messageContent}>
              <div className={Style.messageText}>Спасибо, сейчас заполню 😌</div>
            </div>
            <div className={Style.messageInfo}>
              <div className={Style.messageTime}>12:32</div>
            </div>
          </div>

        </div>

        <div className={Style.formNewMessage}>
          <input type="text" placeholder="Напишите сообщение..."/>
          <button>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.1067 4.20728L9.64303 14.1266C9.00193 15.5513 6.95714 15.4857 6.4086 14.0229L5.4793 11.5448C5.30184 11.0716 4.92843 10.6982 4.45519 10.5207L1.97708 9.5914C0.514282 9.04286 0.448744 6.99806 1.87341 6.35696L11.7927 1.89327C13.2614 1.23238 14.7676 2.73863 14.1067 4.20728Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>


    </div>
  );
};

export default Chat;
