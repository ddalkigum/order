export const checkRequired = (params: any[]) => {
  if (!params) throw new Error('NoParams')
  const result = params.filter((param) => typeof param === 'undefined');
  if (result && result.length > 0) throw new Error('Parameter can not be null')
  return result;
}