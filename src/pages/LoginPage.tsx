import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Link, Navigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import Snackbar, { SnackbarProps } from '@mui/joy/Snackbar';

import { useSelector, useDispatch } from 'react-redux'; // Импортируем хуки useSelector и useDispatch из библиотеки react-redux. Хук - это функция, которая позволяет вам использовать состояние и другие возможности React без написания классов
import { AppDispatch, RootState } from '../store/store'; // Импортируем тип RootState из хранилища
import { loginAsync, resetStatus } from '../store/usersSliceAsync'; // Импортируем действия increment, decrement и incrementByAmount из слайса

function LoginPage() {

  const [login, setLogin] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const dispatch : AppDispatch = useDispatch(); // Хук useDispatch позволяет получить доступ к функции dispatch, которая отправляет действия в хранилище

  const status = useSelector((state: RootState) => state.usersContext.status);
  const error = useSelector((state: RootState) => state.usersContext.error);

  const currentUser = useSelector((state: RootState) => state.usersContext.currentUser);

  if(currentUser != null)
  {
    dispatch(resetStatus());
    return (<Navigate to="/"/>);
  }

  return (
      <Box
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 'auto', // margin top & bottom
          px: 2, // padding left & right
          py: 3, // padding top & bottom
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md'
        }}
      >
      
        <div>
            <p><b>Добро пожаловать!</b></p>
            Вход в демонстрационное приложение
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" placeholder="your@email.com" value={login} onChange={(e) => setLogin(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Пароль</FormLabel>
          <Input name="password" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Link to={'/register'}>Зарегистрироваться</Link>
        <Button disabled={status != 'idle'}  sx={{ mt: 1 /* margin top */ }} onClick={() => dispatch(loginAsync({ login: login, password: password })) }>Войти</Button>

        <MessageBox message={error ?? "Ошибка авторизации"} open={status=='failed'} onClose={() => dispatch(resetStatus()) } />

        <Snackbar
          open={status == 'loading'}
        >
          Проверка авторизации... в redux ;-))
        </Snackbar>

      </Box>
  );
}

export default LoginPage
