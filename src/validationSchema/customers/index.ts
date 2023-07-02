import * as yup from 'yup';

export const customerValidationSchema = yup.object().shape({
  trading_order: yup.string(),
  user_id: yup.string().nullable(),
});
