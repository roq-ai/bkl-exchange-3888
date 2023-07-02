import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AnalystInterface {
  id?: string;
  user_id?: string;
  trading_strategy?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface AnalystGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  trading_strategy?: string;
}
