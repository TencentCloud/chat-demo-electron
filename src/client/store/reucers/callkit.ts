
const initialState = {
  isOpen: false,
};

const callkitReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_IS_OPEN':
        console.log(`setIsOpen ${action.payload}`);
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return state;
  }
};

export default callkitReducer;
// const store = createStore(callkitReducer);

// export default store;