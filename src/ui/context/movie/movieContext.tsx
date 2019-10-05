import { createContext } from "react";

interface IMovieContext {
    movies?: Array<object>,
    filtered?: object[],
    loading?: boolean,
    filterMoviesPanel(checkbox: boolean, select: string, input: string | number): void,
    clearFilter(): void,
    getMovies?: () => Promise<void>,

}

const movieContext = createContext<IMovieContext | null>(null);


export default movieContext;