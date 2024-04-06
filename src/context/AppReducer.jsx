export default (state, action) => {
  switch (action.type) {
    case "ADD_PROGRAM":
      return {
        programs: [...state.programs, action.payload],
      };
    case "DELETE_PROGRAM":
      return {
        ...state,
        programs: state.programs.filter(
          (program) => program.pid !== action.payload
        ),
      };
    case "CLEAR":
      return {
        programs: [],
      };
    default:
      return state;
  }
};
