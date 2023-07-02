import * as yup from 'yup';

export const traderValidationSchema = yup.object().shape({
  crypto_status: yup.string(),
  user_id: yup.string().nullable(),
});
