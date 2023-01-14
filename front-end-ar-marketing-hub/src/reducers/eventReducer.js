import {
    EVENTS_LIST_REQUEST,
    EVENTS_LIST_SUCCESS,
    EVENTS_LIST_FAIL,
    EVENTS_TICKET_ADD,
  } from "../constants/eventConstant";

  export const eventListReducer = (state = { events: [] }, action) => {
    switch (action.type) {
      case EVENTS_LIST_REQUEST:
        return { loading: true };
      case EVENTS_LIST_SUCCESS:
        return { loading: false, events: action.payload };
      case EVENTS_LIST_FAIL:
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };

  export const eventTicketReducer = (state = {}, action) => {
    switch (action.type) {
      case EVENTS_TICKET_ADD:
        return { loading: true };
      case EVENTS_TICKET_ADD:
        return { loading: false, eventInfo: action.payload };
      case EVENTS_TICKET_ADD:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  