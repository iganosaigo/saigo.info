import dateFormat from 'dateformat';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';

export const dateFormatCreated = (str: string): string => {
  const date = new Date(str);
  return dateFormat(date, 'dS mmm, yyyy');
};

export const camelizeResponse = (response: any) =>
  camelcaseKeys(response, { deep: true });

export const decamelizeRequest = (request: any) =>
  snakecaseKeys(request, { deep: true });
