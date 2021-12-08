export const provideErrorHandler = (req: any, res: any, next: any) => {
  res.sendApiError = ({ status = 422, title = 'error', detail = 'error' }) => {
    return res.status(status).send({
      errors: [{ title, detail }],
    });
  };

  res.mongoError = (dbError: any) => {
    const normalizedErrors = [];
    const errorField = 'errors';

    if (dbError && dbError.hasOwnProperty(errorField) && dbError.name === 'ValidationError') {
      const errors = dbError[errorField];

      for (let property in errors) {
        normalizedErrors.push({
          title: property,
          detail: errors[property].message,
        });
      }
    } else {
      normalizedErrors.push({
        title: 'Db Error!',
        detail: 'Ooops, something went wrong!',
      });
    }

    return res.status(422).send({ errors: normalizedErrors });
  };

  next();
};
