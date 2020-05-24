/**
 * クエリパラメータ用日付成型メソッド
 */
export const getQuaryDate = () => {
  const date = new Date();
  const yaer = date.getFullYear();
  const month = date.getMonth() + 2;
  const formatMonth = month < 10 ? `0${month}` : `${month}`;
  return yaer + formatMonth;
};
