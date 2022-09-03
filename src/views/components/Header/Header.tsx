import React from 'react';
// @ts-ignore
import Style from './Header.module.css';
import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material';

const Header = () => {
  return (
    <div className={Style.header}>
      <div className={Style.title}>Клиенты</div>
      <div className={Style.actions}>
        <div className="actions__item">
          <Button className={Style.btnAdd}>
            Добавить клиента
            <AddIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
