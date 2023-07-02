import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TraderInterface {
  id?: string;
  user_id?: string;
  crypto_status?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface TraderGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  crypto_status?: string;
}
