import NameSpace from "../name-space";

const getCurrentCity = (state) => {
  return state[NameSpace.APP].city;
};

const getChosenCityName = (state) => {
  return state[NameSpace.APP].city.name;
};

const getCityCoords = (state) => {
  return [state[NameSpace.APP].city.location.latitude, state[NameSpace.APP].city.location.longitude];
};

const getCityZoom = (state) => {
  return state[NameSpace.APP].city.location.zoom;
};

const getActiveSorting = (state) => {
  return state[NameSpace.APP].sorting;
};


export {getCityCoords, getCityZoom, getCurrentCity, getActiveSorting, getChosenCityName};
