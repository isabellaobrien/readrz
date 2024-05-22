import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import ProfileImageEditForm from '../ProfileImageEditForm'


test('renders ProfileImageEditForm', () => {
    render(
        <Router>
            <ProfileImageEditForm/>
        </Router>
    )

    const form = screen.getByTitle("editimage")
    expect(form).toBeInTheDocument()
})