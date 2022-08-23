import React, {FC} from 'react';
// @ts-ignore
import Style from './FormLoader.module.css';
import Loader from '../Loader/Loader';

const FormLoader: FC<{isSubmitting: boolean}> = ({isSubmitting}) => {
  return (<>
    {isSubmitting && <div className={Style.formLoader}>
      <Loader/>
    </div>}
  </>);
};

export default FormLoader;
