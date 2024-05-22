import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import ProfileAboutMeEditForm from "../ProfileAboutMeEditForm"


test('renders ProfileAboutMeEditForm', () => {
    render(
        <Router>
            <ProfileAboutMeEditForm/>
        </Router>
    )

    const form = screen.getByTitle("editaboutme")
    expect(form).toBeInTheDocument()
})