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
import { createAnalyst } from 'apiSdk/analysts';
import { Error } from 'components/error';
import { analystValidationSchema } from 'validationSchema/analysts';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { AnalystInterface } from 'interfaces/analyst';

function AnalystCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: AnalystInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createAnalyst(values);
      resetForm();
      router.push('/analysts');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<AnalystInterface>({
    initialValues: {
      trading_strategy: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: analystValidationSchema,
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
            Create Analyst
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="trading_strategy" mb="4" isInvalid={!!formik.errors?.trading_strategy}>
            <FormLabel>Trading Strategy</FormLabel>
            <Input
              type="text"
              name="trading_strategy"
              value={formik.values?.trading_strategy}
              onChange={formik.handleChange}
            />
            {formik.errors.trading_strategy && <FormErrorMessage>{formik.errors?.trading_strategy}</FormErrorMessage>}
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
    entity: 'analyst',
    operation: AccessOperationEnum.CREATE,
  }),
)(AnalystCreatePage);
