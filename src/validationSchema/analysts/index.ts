import * as yup from 'yup';

export const analystValidationSchema = yup.object().shape({
  trading_strategy: yup.string(),
  user_id: yup.string().nullable(),
});
