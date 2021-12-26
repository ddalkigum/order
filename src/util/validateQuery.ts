export const validateQuery = (query: any, params: any[]) => {
  if (!query) {
    const error = new Error('Query does not exist');
    error.name = 'QueryNotExist';
    throw error;
  }

  if (!query.sql) {
    const error = new Error('parameters sql does not exist');
    error.name = 'SqlNotExist';
    throw error;
  }

  if (query.params && query.params.length > 0 && params) {
    if (!Array.isArray(params)) {
      const error = new Error('Parameters type must be array');
      error.name = 'ParametertypeNotMatched';
      throw error;
    }

    if (query.params.length !== params.length) {
      const error = new Error(`Size of parameters does not matched, sizeOfDefinedParameter=${query.params.length}, sizeOfInputParams=${params.length}`);
      error.name = 'ParamterSizeNotMatched';
      throw error;
    }

    for (let i = 0; i < query.params.length; i++) {
      if (query.params[i].type !== typeof params[i]) {
        const error = new Error(`Input parameter type does not match, parameterName=${query.parmas[i].name}, definedParamType=${query.params[i].type}, inputParameterType=${typeof params[i]}`);
        error.name = 'ParameterTypeNotMatch';
        throw error;
      }
    }
  }
}