import { render, screen, fireEvent } from "@testing-library/react";
import type { Movie } from "../src/interfaces/movie";
import { MovieView } from "../src/components/MovieView";

jest.mock("../src/components/RecordControls", () => ({
    RecordControls: ({ changeEditing }: { changeEditing: () => void }) => (
        <button onClick={changeEditing}>toggle-edit</button>
    ),
}));

describe("MovieView", () => {
    const movie: Movie = {
        id: "abc",
        title: "The Test Movie",
        rating: 8,
        description: "A movie for testing",
        released: 2020,
        soundtrack: [],
        watched: {
            seen: false,
            liked: false,
            when: null,
        },
    };

    test("renders basic text and toggles edit mode", () => {
        render(
            <MovieView
                movie={movie}
                deleteMovie={() => {}}
                editMovie={() => {}}
                setMovieWatched={() => {}}
            />,
        );

        expect(screen.getByText("The Test Movie")).toBeInTheDocument();
        expect(screen.getByText(/Released 2020/)).toBeInTheDocument();
        expect(screen.getByText("A movie for testing")).toBeInTheDocument();

        fireEvent.click(screen.getByText("toggle-edit"));

        expect(screen.queryByText("The Test Movie")).not.toBeInTheDocument();
    });
});
