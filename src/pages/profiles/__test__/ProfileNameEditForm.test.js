import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import ProfileNameEditForm from "../ProfileNameEditForm"


test('renders ProfileNameEditForm', () => {
    render(
        <Router>
            <ProfileNameEditForm/>
        </Router>
    )

    const form = screen.getByTitle("editname")
    expect(form).toBeInTheDocument()
})