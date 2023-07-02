import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createTrader } from 'apiSdk/traders';
import { Error } from 'components/error';
import { traderValidationSchema } from 'validationSchema/traders';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { TraderInterface } from 'interfaces/trader';

function TraderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TraderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTrader(values);
      resetForm();
      router.push('/traders');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TraderInterface>({
    initialValues: {
      crypto_status: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: traderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Trader
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="crypto_status" mb="4" isInvalid={!!formik.errors?.crypto_status}>
            <FormLabel>Crypto Status</FormLabel>
            <Input
              type="text"
              name="crypto_status"
              value={formik.values?.crypto_status}
              onChange={formik.handleChange}
            />
            {formik.errors.crypto_status && <FormErrorMessage>{formik.errors?.crypto_status}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'trader',
    operation: AccessOperationEnum.CREATE,
  }),
)(TraderCreatePage);
