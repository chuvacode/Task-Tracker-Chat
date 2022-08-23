import React, {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {useAppSelector} from '../../../hooks/useAppSelector';
import {authSelectors} from '../../../state/auth';

type Props = { isOpen: boolean, handlerClose: () => void }

const ProfileSettings: FC<Props> = ({isOpen, handlerClose}) => {

  const profile = useAppSelector(authSelectors.getProfile);

  const formik = useFormik({
    initialValues: {
      ...profile,
    },
    onSubmit: () => {
    },
  });

  return (
    <Dialog
      open={isOpen}
      onClose={handlerClose}
    >
      <DialogTitle>Настройки профиля</DialogTitle>
      <DialogContent>
        <TextField fullWidth
                   margin="normal"
                   label="Имя"
                   variant="outlined"
                   name={'first_name'}
                   value={formik.values.first_name}
                   onChange={formik.handleChange}
        />
        <TextField fullWidth
                   margin="normal"
                   label="Фамилия"
                   variant="outlined"
                   name={'last_name'}
                   value={formik.values.last_name}
                   onChange={formik.handleChange}
        />
        <TextField fullWidth
                   margin="normal"
                   label="Имя пользователя"
                   variant="outlined"
                   name={'usernane'}
                   value={formik.values.username}
                   onChange={formik.handleChange}
        />
        <TextField fullWidth
                   margin="normal"
                   label="E-mail"
                   variant="outlined"
                   name={'email'}
                   value={formik.values.email}
                   onChange={formik.handleChange}
        />
        <TextField fullWidth
                   margin="normal"
                   label="Аватарка"
                   variant="outlined"
                   name={'avatar_url'}
                   value={formik.values.avatar_url}
                   onChange={formik.handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handlerClose} color={'secondary'}>Закрыть</Button>
        <Button onClick={handlerClose} color={'primary'} autoFocus>
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileSettings;
