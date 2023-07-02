import axios from 'axios';
import queryString from 'query-string';
import { TraderInterface, TraderGetQueryInterface } from 'interfaces/trader';
import { GetQueryInterface } from '../../interfaces';

export const getTraders = async (query?: TraderGetQueryInterface) => {
  const response = await axios.get(`/api/traders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTrader = async (trader: TraderInterface) => {
  const response = await axios.post('/api/traders', trader);
  return response.data;
};

export const updateTraderById = async (id: string, trader: TraderInterface) => {
  const response = await axios.put(`/api/traders/${id}`, trader);
  return response.data;
};

export const getTraderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/traders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTraderById = async (id: string) => {
  const response = await axios.delete(`/api/traders/${id}`);
  return response.data;
};
