import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth'
import { GET_EPISODES, DELETE_EPISODE, ADD_EPISODE, SHOW_EPISODE, UPDATE_EPISODE, REPLACE_EPISODE, GET_MYEPISODES, GET_ALLEPISODES, GET_EPISODES_BY_ID} from './types';

//Choose Block

//GET Episodes
export const getEpisodes = (condition) => (dispatch, getState) => {
  axios.get('/api/episodes/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_EPISODES,
        payload: res.data,
        condition: condition
        
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//GET Episodes By ID
export const getEpisodeById = (  condition, id) => (dispatch, getState) => {
  axios.get('/api/episodes/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_EPISODES_BY_ID,
        payload: res.data,
        condition: condition,
        id: id
        
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//GET My Episodes
export const getMyEpisodes = (user) => (dispatch, getState) => {
  axios.get('/api/episodes/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_MYEPISODES,
        payload: res.data,
        user: user
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//GET ALL EPISODES
export const getAllEpisodes = () => (dispatch, getState) => {
  axios.get('/api/episodes/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ALLEPISODES,
        payload: res.data,
      
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//ADD Episodes
export const addEpisode = episode => (dispatch, getState) => {
  axios
    .post('/api/episodes/', episode, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({success: "Episode Added Successfully"}))
      dispatch({
        type: ADD_EPISODE,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Update Episodes
export const updateEpisode = (episode, id) => (dispatch, getState) => {
  axios
    .put(`/api/episodes/${id}/`, episode, tokenConfig(getState), {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
      dispatch(createMessage({info: "Episode Edited"}))
      dispatch({
        type: UPDATE_EPISODE,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Show details of a single SHOW_EPISODE
export const showEpisode = id => (dispatch, getState) => {
  axios.get('/api/episodes/', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: SHOW_EPISODE,
        payload: id

      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Episodes
export const deleteEpisode = (id) => (dispatch, getState) => {
  axios
   .delete(`/api/episodes/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Episode Deleted"}))
      dispatch({
        type: DELETE_EPISODE,
        payload: id
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


//Add Note
export const addNote = (episode, id) => (dispatch, getState) => {
  axios
    .put(`/api/episodes/${id}/`, episode, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({success: "Note Added"}))
      dispatch({
        type: UPDATE_EPISODE,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
//Remove Images
export const removeImage = (episode, id) => (dispatch, getState) => {
  axios
    .put(`/api/episodes/${id}/`, episode, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Image Removed"}))
      dispatch({
        type: UPDATE_EPISODE,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Edit Note
export const editNote = (episode, id) => (dispatch, getState) => {
  axios
    .put(`/api/episodes/${id}/`, episode, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({info: "Note Edited"}))
      dispatch({
        type: UPDATE_EPISODE,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

//Delete Note
export const deleteNote = (episode, id) => (dispatch, getState) => {
  axios
    .put(`/api/episodes/${id}/`, episode, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({danger: "Note Deleted"}))
      dispatch({
        type: UPDATE_EPISODE,
        payload: res.data
      });
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
  };