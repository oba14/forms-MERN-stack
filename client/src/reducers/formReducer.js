const initialState = {
  form: null,
  attachments: [],
  isFetching: false,
  formSubmitted: false,
  formExist: false,
  error: null,
  error_adding: false,
  error_deleting: false,
  form_id: null,
  loaded: false,
  token: "",
  form_deleted: false,
  form_updated: false
};
/**
 *
 * @param {*} state
 * @param {*} action
 */
const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ATTACHMENTS":
      return {
        ...state,
        attachments: action.attachments
      };

    case "FILES_LOADED":
      return {
        ...state,
        loaded: true
      };

    case "FORM_EXIST":
      return {
        ...state,
        formExist: action.formExist
      };
    case "IS_FETCHING":
      return {
        ...state,
        isFetching: true
      };

    case "ERROR_FETCHING":
      return {
        ...state,
        isFetching: false,
        formExist: false,
        error: action.error
      };

    case "SHOW_FORM":
      return {
        ...state,
        form: action.form,
        isFetching: false,
        formExist: true,
        formSubmitted: false,
        error: null
      };

    case "ERROR_DELETING":
      return {
        ...state,
        error_deleting: true
      };

    case "ERROR_ADDING":
      return {
        ...state,
        error_adding: true
      };

    case "ADD_FORM":
      return {
        ...state,
        formSubmitted: true,
        isFetching: false,
        error: null,
        error_adding: false,
        error_deleting: false,
        form_id: action.form_id
      };

    case "DELETE_FORM":
      return {
        ...state,
        form: state.form.filter(e => e._id !== action.id),
        isFetching: false,
        formExist: false,
        error: null,
        error_adding: false,
        error_deleting: false,
        form_deleted: true
      };

    case "EDIT_FORM":
      return {
        ...state,
        form: state.form.map(e => {
          if (e.id === action.form.id) {
            return action.form;
          }
          return e;
        }),
        isFetching: false,
        formSubmitted: false,
        formExist: false,
        error: null,
        error_adding: false,
        error_deleting: false,
        form_updated: true
      };

    default:
      return state;
  }
};

export default formReducer;
