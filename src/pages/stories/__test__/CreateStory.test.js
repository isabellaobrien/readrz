import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import CreateStory from '../CreateStory'


test('renders CreateStory', () => {
    render(
        <Router>
            <CreateStory />
        </Router>
    )

    const form = screen.getByTitle("createstory")
    expect(form).toBeInTheDocument()
})