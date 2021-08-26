export const dateFormatter = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export const timeFormatter = (date: Date) => {
  const min =
    date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`;
  const hr = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`;
  return `${hr}:${min}`;
};
