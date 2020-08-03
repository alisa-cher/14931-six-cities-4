import NameSpace from "../name-space";

const getAuthorisationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

const getUserEmail = (state) => {
  return state[NameSpace.USER].userData.email;
};

const getUserPhoto = (state) => {
  return state[NameSpace.USER].userData.avatarUrl;
};

export {getAuthorisationStatus, getUserEmail, getUserPhoto};
