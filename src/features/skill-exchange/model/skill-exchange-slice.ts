import type { TSkillExchange } from './skill-exchange-types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../../app/providers/store';

interface SkillExchangeState {
  exchanges: TSkillExchange[];
}

const initialState: SkillExchangeState = {
  exchanges: [],
};

const skillExchangeSlice = createSlice({
  name: 'skillExchange',
  initialState,
  reducers: {
    // Добавить обмен 
    addExchange: (state, action: PayloadAction<Omit<TSkillExchange, 'toUserId'> & { toUserId?: string | null }>) => {
      const newExchange: TSkillExchange = {
        ...action.payload,
        toUserId: action.payload.toUserId ?? null
      };
      state.exchanges.push(newExchange);
    },
    
    // Добавить toUserId 
    addToUserId: (state, action: PayloadAction<{ id: string; toUserId: string }>) => {
      const exchange = state.exchanges.find(ex => ex.id === action.payload.id);
      if (exchange) {
        exchange.toUserId = action.payload.toUserId;
      }
    },
    
    // Обновить статус обмена
    updateExchangeStatus: (state, action: PayloadAction<{ id: string; status: TSkillExchange['status'] }>) => {
      const exchange = state.exchanges.find(ex => ex.id === action.payload.id);
      if (exchange) {
        exchange.status = action.payload.status;
      }
    },
    
    // Удалить обмен
    removeExchange: (state, action: PayloadAction<string>) => {
      state.exchanges = state.exchanges.filter(ex => ex.id !== action.payload);
    },
    
    // Очистить все обмены
    clearAllExchanges: (state) => {
      state.exchanges = [];
    },
  },
});

export const { 
  addExchange, 
  addToUserId, 
  updateExchangeStatus, 
  removeExchange, 
  clearAllExchanges 
} = skillExchangeSlice.actions;


export const skillExchangeReducer = skillExchangeSlice.reducer;



// Все обмены
export const selectAllExchanges = (state: RootState) => state.skillExchange.exchanges;

// Найти обмен по id
export const selectExchangeById = (state: RootState, id: string) => 
  state.skillExchange.exchanges.find(ex => ex.id === id);

// Все обмены отправленные пользователем
export const selectExchangesSentByUser = (state: RootState, userId: string) => 
  state.skillExchange.exchanges.filter(ex => ex.fromUserId === userId);

// Все обмены полученные пользователем
export const selectExchangesReceivedByUser = (state: RootState, userId: string) => 
  state.skillExchange.exchanges.filter(ex => ex.toUserId === userId);

// Обмены в поиске (без назначенного пользователя)
export const selectExchangesInSearch = (state: RootState) => 
  state.skillExchange.exchanges.filter(ex => ex.toUserId === null);

// Обмены с назначенным пользователем
export const selectExchangesWithAssignedUser = (state: RootState) => 
  state.skillExchange.exchanges.filter(ex => ex.toUserId !== null);