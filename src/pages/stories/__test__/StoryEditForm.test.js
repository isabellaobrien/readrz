import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import StoryEditForm from '../StoryEditForm'


test('renders StoryEditForm', () => {
    render(
        <Router>
            <StoryEditForm />
        </Router>
    )

    const form = screen.getByTitle("editstory")
    expect(form).toBeInTheDocument()
})