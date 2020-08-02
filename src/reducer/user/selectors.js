import NameSpace from "../name-space";

const getAuthorisationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export {getAuthorisationStatus};
