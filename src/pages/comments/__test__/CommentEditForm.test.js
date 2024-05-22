import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import CommentEditForm from "../CommentEditForm";

test('renders CommentEditForm', () => {
    render(
        <Router>
            <CommentEditForm />
        </Router>
    )

    const form = screen.getByTitle("commenteditform")
    expect(form).toBeInTheDocument()
})