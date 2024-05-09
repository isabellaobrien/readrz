
import { Container } from 'react-bootstrap';
import './App.css';
import NavBar from './components/NavBar';
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from './pages/auth/SignUpForm';
import LoginForm from './pages/auth/LoginForm';
import LandingPage from './pages/AboutUs';
import CreateStory from './pages/stories/CreateStory';
import StoryPage from './pages/stories/StoryPage';
import StoryList from './pages/stories/StoryList';
import { useCurrentUser } from './contexts/CurrentUserContext';
function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className="App">
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/about-us" render={() => <LandingPage />} />
          <Route exact path="/" render={() => (
              <StoryList message="No results found. Adjust the search keyword." />
            )}
          />
          <Route exact path="/feed" render={() => (
              <StoryList message="No results found. Try following another user."
              filter={`owner__followed__owner__profile=${profile_id}&`}/>
            )}
          />
          <Route exact path="/liked" render={() => (
              <StoryList message="No results found. Try liking a post." 
              filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}/>
              
            )}
          />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/create-story" render={() => <CreateStory />} />
          <Route exact path="/stories/:id" render={() => <StoryPage />}></Route>
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;