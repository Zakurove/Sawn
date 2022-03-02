import { GET_EPISODES, DELETE_EPISODE, ADD_EPISODE, SHOW_EPISODE, UPDATE_EPISODE, REPLACE_EPISODE, GET_MYEPISODES, GET_ALLEPISODES, GET_EPISODES_BY_ID } from '../actions/types.js'

const initialState = {
  episodes: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_EPISODES:
      return {
        ...state,
        episodes: action.payload.filter((episode) =>   episode.condition == action.condition),
        //  &&
      }
      case GET_EPISODES_BY_ID:
        return {
          ...state,
          notedEpisodes: action.payload.find((episode) =>   episode.condition == action.condition && episode.id == action.id),
          //  &&
        }
      case GET_MYEPISODES:
        return {
          ...state,
          episodes: action.payload.filter((episode) =>  episode.owner_username == action.user ),
          // episodes: action.payload.filter((episode) =>  episode.subject == action.subject && episode.block == action.block),
          //  &&
        }
        case GET_ALLEPISODES:
          return {
            ...state,
            episodes: action.payload,
          }
      case DELETE_EPISODE:
        return {
          ...state,
          episodes: state.episodes.filter((episode) => episode.id !== action.payload),
        };

      case UPDATE_EPISODE:
        console.log(action.payload, "payloaad");
        return {
          ...state,
          episodes: state.episodes.map(episode => {
            if (episode.id !== action.payload.id) {
              return episode;
            } else {
              return { ...episode, title: action.payload.title, description: action.payload.description, images: action.payload.images };
            }
          })
        };


      case ADD_EPISODE:
        return {
          ...state,
          episodes: [...state.episodes, action.payload]
        };
      default:
        return state;
  }
}
