import axios from 'axios';
import {createMessage, returnErrors} from "./messages";

import {
    CHECK_REGISTER,
    CLEAR_EVENT,
    EVENT_ERROR,
    EVENT_LOADED,
    EVENT_LOADING,
    EVENT_REGISTER_FAIL,
    EVENT_REGISTER_SUCCESS, LOADER_EVENT_CHECK_REGISTERED, LOADER_EVENT_REGISTER, LOADER_TEAM_REGISTER,
    TEAM_REGISTER_FAIL, TEAM_REGISTER_SUCCESS
} from "./types";
import {tokenConfig} from "./auth";

import {BACKEND_URL} from '../api/endpoints'
import _ from "lodash";

export const clearEvent = () => (dispatch) => {
    dispatch({type: CLEAR_EVENT});
};

export const loadEvent = (eventId) => (dispatch) => {
    dispatch({type: EVENT_LOADING});
    axios.get(`${BACKEND_URL}/api/events/${eventId}`)
        .then(res => {
            dispatch({
                type: EVENT_LOADED,
                payload: res.data.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: EVENT_ERROR
            });
        })
};

export const registerTeam = ({eventID, teamName, team}) => (dispatch, getState) => {
    dispatch({
        type: LOADER_TEAM_REGISTER,
        payload: true
    });
    const body = JSON.stringify({eventID, teamName, team});
    axios.post(`${BACKEND_URL}/events/${eventID}/team/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: TEAM_REGISTER_SUCCESS
            });
            dispatch({
                type: LOADER_TEAM_REGISTER,
                payload: false
            });
            dispatch(createMessage({registerEventSuccess: "Registered Successfully!"}));
        })
        .catch(error => {
            if(!_.isEmpty(error.response.data.errors)){
                const errorMessage = error.response.data.errors.join("\n");
                dispatch(createMessage({registerEventFail: errorMessage}));
            }
            dispatch({
                type: LOADER_TEAM_REGISTER,
                payload: false
            });
            dispatch({
                type: TEAM_REGISTER_FAIL
            });
        });
    return false;
};

export const registerEvent = ({eventID, username}) => (dispatch, getState) => {
    dispatch({
        type: LOADER_EVENT_REGISTER,
        payload: true
    });
    const body = JSON.stringify({eventID, username});
    axios.post(`${BACKEND_URL}/events/${eventID}/register/`, body, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: EVENT_REGISTER_SUCCESS
            });
            dispatch({
                type: LOADER_EVENT_REGISTER,
                payload: false
            });
            dispatch(createMessage({registerEventSuccess: "Registered Successfully!"}));
        })
        .catch(error => {
            if (error.response.status === 302) {
                dispatch({
                    type: EVENT_REGISTER_SUCCESS
                });
                dispatch({
                    type: LOADER_EVENT_REGISTER,
                    payload: false
                });
                dispatch(createMessage({registerEventFail: "Already Registered!"}));
            } else {
                dispatch(createMessage({registerEventFail: "Event Registration failed!"}));
                dispatch({
                    type: LOADER_EVENT_REGISTER,
                    payload: false
                });
                dispatch({
                    type: EVENT_REGISTER_FAIL
                });
            }
        });
};

export const checkRegistered = ({eventID, username}) => (dispatch, getState) => {
    dispatch({type: LOADER_EVENT_CHECK_REGISTERED, payload: true});
    axios.get(`${BACKEND_URL}/events/${eventID}/team/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: CHECK_REGISTER,
                payload: !res.data.response
            });
            dispatch({type: LOADER_EVENT_CHECK_REGISTERED, payload: false});
        })
        .catch(error => {
            dispatch({type: LOADER_EVENT_CHECK_REGISTERED, payload: false});
        });
};
