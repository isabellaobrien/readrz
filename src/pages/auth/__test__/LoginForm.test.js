import { render, screen} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";
import LoginForm from '../LoginForm'


test('renders LoginForm', () => {
    render(
        <Router>
            <LoginForm />
        </Router>
    )

    const form = screen.getByTitle("loginform")
    expect(form).toBeInTheDocument()
})