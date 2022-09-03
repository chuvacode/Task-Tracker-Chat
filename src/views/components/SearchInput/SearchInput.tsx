import React from 'react';
import Style from './SearchInput.module.scss';

const SearchInput = () => {
  return (
    <div className={Style.search}>
      <input type="text" placeholder="Поиск" />
    </div>
  );
};

export default SearchInput;
