const initialState = {
  loading: false,
  name: "",
  currentSupply: 0,
  price: 0,
  maxSupply: 0,
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        name: action.payload.name,
        currentSupply: action.payload.currentSupply,
        price: action.payload.price,
        maxSupply: action.payload.maxSupply,
        balanceOf: action.payload.balanceOf,
        error: false,
        errorMsg: "",
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};
export default dataReducer;
