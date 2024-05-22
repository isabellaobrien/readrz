import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import CreateComment from '../CreateComment'


test('renders CreateComment', () => {
    render(
        <Router>
            <CreateComment />
        </Router>
    )

    const form = screen.getByTitle("createcomment")
    expect(form).toBeInTheDocument()
})