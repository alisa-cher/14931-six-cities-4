export const sliceAnArray = (array, maxLength) => {
  return array.length > maxLength ? array.slice(0, maxLength) : array;
};
