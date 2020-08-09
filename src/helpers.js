export const sliceAnArray = (array, maxLength) => {
  return array.length > maxLength ? array.slice(0, maxLength) : array;
};

export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const getRatingPercentage = (ratingValue, maxValue, isInteger) => {
  return isInteger ? Math.round(ratingValue) * 20 : Math.round(ratingValue * 20);
};
