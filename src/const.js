const DEFAULT_ERROR_MESSAGE = `Something went wrong. Please try again later.`;

const SortingLabel = {
  POPULAR: `Popular`,
  TO_HIGH: `Price: low to high`,
  TO_LOW: `Price: high to low`,
  TOP_RATED: `Price: high to low`
};

const SortingValue = {
  POPULAR: `popular`,
  TO_HIGH: `to-high`,
  TO_LOW: `to-low`,
  TOP_RATED: `top-rated`
};

const ClientEvaluation = {
  PERFECT: `perfect`,
  GOOD: `good`,
  NOT_BAD: `not bad`,
  BADLY: `badly`,
  TERRIBLY: `terribly`,
};

const Textarea = {
  MIN_LENGTH: 50,
  MAX_LENGTH: 300
};

const Button = {
  STATUS: {
    IS_FAVORITE: 1,
    IS_NOT_FAVORITE: 0,
  },
  SIZE: {
    BIG_BUTTON_WIDTH: 32,
    BIG_BUTTON_HEIGHT: 33,
    SMALL_BUTTON_WIDTH: 18,
    SMALL_BUTTON_HEIGHT: 19,
  }
};

const AppRouting = {
  MAIN: `/`,
  LOGIN: `/login`,
  FAVORITES: `/favorites`,
  DETAILED_OFFER: `/offer/:hotel_id/`,
};

export {SortingLabel, SortingValue, ClientEvaluation, Textarea, Button, AppRouting, DEFAULT_ERROR_MESSAGE};
