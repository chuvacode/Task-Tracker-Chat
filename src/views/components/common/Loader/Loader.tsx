import React, {FC} from 'react';
// @ts-ignore
import Style from './Loader.module.css';
// @ts-ignore
import loader from '../../../../assets/loader.svg';

const Loader: FC = () => <img src={loader} className={Style.loader} alt="loader"/>;

export default Loader;
