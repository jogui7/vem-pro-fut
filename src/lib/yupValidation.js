import * as R from 'ramda';
import { setIn } from 'final-form';

const unflatObject = R.pipe(
  R.toPairs,
  R.reduce((result, currentKeyValue) => {
    const [field, value] = currentKeyValue;
    return R.assocPath(R.split('.', field), value, result);
  }, {}),
);

const yupValidation = (schema) => async (data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return {};
  } catch (err) {
    const errors = err.inner?.reduce(
      (formError, innerError) => setIn(formError, innerError.path, innerError.message),
      {},
    );
    return unflatObject(errors);
  }
};

export default yupValidation;
