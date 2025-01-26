import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import User from './user';
import { avatarGroupClasses } from '@mui/joy';

interface UsersRepositoryAsync {
  users: Array<User>;
  currentUser: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Состояние загрузки
  error: string | null; // Ошибка, если она есть
}

// Начальное состояние счетчика
const initialState: UsersRepositoryAsync = {   
  users: [],
  currentUser: null,
  status: "idle",
  error: null
};

function GetUser(users: Array<User>, user: string) : User | null
{
  for (const u of users) {
    if(u.email == user)
      return u;
  }
  return null;
}

interface UserLoginParam
{
   login: string,
   password: string
}

// Создаем асинхронное действие (Thunk) с использованием setTimeout
const loginAsync = createAsyncThunk(
  'users/login', // Уникальное имя действия
  async (arg : UserLoginParam, { getState, rejectWithValue }) => {
    try {
      // Имитируем задержку в 2 секунды
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const state : any = getState(); // <-- invoke and access state object

      const user = GetUser(state.usersContext.users, arg.login);
      if(user == null)
        throw `Пользователь с именем "${arg.login}" не зарегистрирован`;

      if(user.password != arg.password)
          throw `Неверный пароль для пользователя "${arg.login}"`;
      
      return arg; 

    } catch (error : any) {
      // В случае ошибки возвращаем её с помощью rejectWithValue
      return rejectWithValue(error);
    }
  }
);

// Создаем слайс (slice)
const usersSliceAsync = createSlice({
  name: 'usersContextName',
  initialState,

  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
    logout: (state) => {
        state.currentUser = null;
        state.status = "idle";
    },
    register: (state, action: PayloadAction<User>) => {
      // синхронный метод для примера, а login будет асинхронный
      if(action.payload.email == "" || action.payload.userName == "")
      {
        state.status = "failed";
        state.error = `Поля имя и email должны быть не пустыми.`;
      }
      else {
        if(GetUser(state.users, action.payload.email) == null) {        
          state.users = state.users.concat([action.payload]);
          state.status = "succeeded";
        }
        else {
          state.status = "failed";
          state.error = `Пользователь с email ${action.payload.email} уже существует.`;
        }
      }
    }
  },

  // Обрабатываем дополнительные действия (extraReducers)
  // extraReducers — это объект, который содержит обработчики действий, созданных с помощью createAsyncThunk
  extraReducers: (builder) => {
    builder
      // Загрузка началась
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Сбрасываем ошибку
      })
      // Загрузка завершена успешно
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<UserLoginParam>) => {
        state.status = 'succeeded';
        state.currentUser = GetUser(state.users, action.payload.login);
      })
      // Загрузка завершена с ошибкой
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string; // Сохраняем ошибку
      });
  },
});

// Экспортируем действия (actions)
export const { logout, register, resetStatus } = usersSliceAsync.actions;
export { loginAsync };

// Экспортируем редьюсер
export default usersSliceAsync.reducer;