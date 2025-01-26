import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Импортируем хуки useSelector и useDispatch из библиотеки react-redux. Хук - это функция, которая позволяет вам использовать состояние и другие возможности React без написания классов
import { AppDispatch, RootState } from '../store/store'; // Импортируем тип RootState из хранилища
import { logout } from '../store/usersSliceAsync'; // Импортируем действия increment, decrement и incrementByAmount из слайса
import HocWithChangingColor from '../components/HocWithChangingColor'

function HomePage() {

  const currentUser = useSelector((state: RootState) => state.usersContext.currentUser);
  const dispatch : AppDispatch = useDispatch(); // Хук useDispatch позволяет получить доступ к функции dispatch, которая отправляет действия в хранилище
  
  const HocCaption = HocWithChangingColor(Typography);  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2
      }}
    >

      <HocCaption level="h1">
        Добро пожаловать на сайт { currentUser != null ? `${currentUser.userName} (${currentUser.email})` : null }!
      </HocCaption>
      
      { 
        currentUser == null || currentUser.doMailing == false || 
        <HocCaption level="h2">
          Вы подписаны на спам рассылку. Поздравляю!
        </HocCaption>
      }

      <HocCaption level="h4">
        <p>Сайт ничего не делает, но можно попробовать поиграть в настоящий сайт.</p>
      </HocCaption>

      <Typography level="h4">
        <p>Например:</p>
      </Typography>

      { currentUser != null || <Link to={'/login'}>Войти</Link> }
      { currentUser != null || <Link to={'/register'}>Зарегистрироваться</Link> }

      { currentUser == null || <Button onClick={() => dispatch(logout())} >Выйти</Button> }

      <Typography level="h4" style={{ color: 'gray' }}>
        <p>(Пользователи хранятся локально в redux до перезагрузки сайта)</p>
      </Typography>


    </Box> 
  );
}

export default HomePage
