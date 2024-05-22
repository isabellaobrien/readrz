import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import ReplyEditForm from "../ReplyEditForm";

test('renders ReplyEditForm', () => {
    render(
        <Router>
            <ReplyEditForm />
        </Router>
    )

    const form = screen.getByTitle("replyeditform")
    expect(form).toBeInTheDocument()
})