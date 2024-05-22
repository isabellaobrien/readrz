import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import CreateReply from "../CreateReply";

test('renders CreateReply', () => {
    render(
        <Router>
            <CreateReply />
        </Router>
    )

    const form = screen.getByTitle("createreply")
    expect(form).toBeInTheDocument()
})