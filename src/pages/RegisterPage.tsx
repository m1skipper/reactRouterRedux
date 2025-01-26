import * as React from 'react';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import MessageBox from '../components/MessageBox';
import { useNavigate } from "react-router";
import User from '../store/user'

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { register, resetStatus } from '../store/usersSliceAsync';

function RegisterPage() {

  const [userName, setUserName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [doMailing, setDoMailing] = React.useState<boolean>(true);

  const error = useSelector((state: RootState) => state.usersContext.error);
  const status = useSelector((state: RootState) => state.usersContext.status);

  let navigate = useNavigate();

  const dispatch : AppDispatch = useDispatch(); // Хук useDispatch позволяет получить доступ к функции dispatch, которая отправляет действия в хранилище
  
  return (
    <Box
    sx={{
      width: 400,
      mx: 'auto', // margin left & right
      my: 'auto', // margin top & bottom
      px: 2, // padding left & right
      py: 3, // padding top & bottom
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      borderRadius: 'sm',
      boxShadow: 'md'
    }}>
      <div><p><b>Регистрация нового пользователя</b></p></div>
      <FormControl sx={{ flexDirection: "row" }}>
        <FormLabel htmlFor="name" sx={{ width: "150px" }}>ФИО</FormLabel>
        <Input autoComplete="name" name="name" required fullWidth id="name" placeholder="Jon Snow" value={userName} onChange={(e) => setUserName(e.target.value)} />
      </FormControl>
      <FormControl sx={{ flexDirection: "row" }}>
        <FormLabel htmlFor="email" sx={{ width: "150px" }}>Email</FormLabel>
        <Input required fullWidth id="email" placeholder="your@email.com" name="email" autoComplete="email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl sx={{ flexDirection: "row" }}>
        <FormLabel htmlFor="password" sx={{ width: "150px" }}>Пароль</FormLabel>
        <Input required fullWidth name="password" placeholder="••••••" type="password" id="password" autoComplete="new-password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Checkbox label="Я хочу получать информационную рассылку" checked={doMailing} onClick={() => setDoMailing(!doMailing)}/>
      <Button type="submit" sx={{ ml: 'auto'}} onClick={()=> {
        const user = new User(email, password);
        user.doMailing = doMailing;
        user.userName = userName;
        dispatch(register(user));
      }}>Зарегистрироваться</Button>

      <MessageBox message={`Пользователь "${email}" успешно зарегистрирован.`} 
        onClose={()=>{dispatch(resetStatus()); navigate("/login")}} open={status == 'succeeded'} 
      />
      <MessageBox message={error ?? "Ошибка авторизации"} open={status=='failed'} onClose={() => dispatch(resetStatus()) } />
    </Box>
  );
}

export default RegisterPage
