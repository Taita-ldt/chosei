/**
 * クエリパラメータ用日付成型メソッド
 */
export const getQuaryDate = () => {
  const date = new Date();
  let yaer = date.getFullYear();
  let month = date.getMonth() + 2;
  if(month > 12) {
    yaer += 1;
    month %= 12;
  }
  const formatMonth = month < 10 ? `0${month}` : `${month}`;
  return yaer + formatMonth;
};
