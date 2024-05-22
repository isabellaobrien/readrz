import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import SignUpForm from '../SignUpForm'


test('renders SignUpForm', () => {
    render(
        <Router>
            <SignUpForm />
        </Router>
    )

    const form = screen.getByTitle("signupform")
    expect(form).toBeInTheDocument()
})
