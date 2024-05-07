
import { Container } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import LandingPage from './pages/AboutUs';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/about-us" render={() => <LandingPage />} />
          <Route exact path="/" render={() => <p>home</p>} />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;