import {
    FILTER_MOVIES_PANEL,
    CLEAR_FILTER,
    GET_MOVIES,
    MOVIE_ERROR

} from "../types"


export default (state: any, action: { type: string; payload: any }) => {
    switch (action.type) {
        case FILTER_MOVIES_PANEL:
            return {
                ...state,
                filtered: state.movies.filter((movie: any) => {
                    return movie.threed === action.payload.checkbox || action.payload.checkbox === false;
                }).filter((movie: any) => {
                    return movie.genre === action.payload.select || action.payload.select === 'All';
                }).filter((movie: any) => {
                    const regex = new RegExp(`${action.payload.input}`, 'gi');
                    return movie.name.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null

            }
        case GET_MOVIES:
            return {
                ...state,
                movies: action.payload,
                loading: false
            }
        case MOVIE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}