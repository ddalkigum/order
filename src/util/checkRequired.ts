const UNDEFINED = 'undefined';

export const checkRequired = (parameterList: (number | string)[]) => {
  const result = parameterList.filter((parameter) => typeof parameter === UNDEFINED);
  if (result && result.length > 0) throw new Error('Parameter can not be null');
};
