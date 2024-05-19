
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
import StoryEditForm from './pages/stories/StoryEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import ProfileImageEditForm from './pages/profiles/ProfileImageEditForm';
import ProfileNameEditForm from './pages/profiles/ProfileNameEditForm';
import ProfileAboutMeEditForm from './pages/profiles/ProfileAboutMeEditForm';
import EditUsernameForm from './pages/profiles/EditUsernameForm';
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
              filter={`like__owner__profile=${profile_id}&ordering=-like__created_at&`}/>
  
            )}
          />
          <Route exact path="/login" render={() => <LoginForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/create-story" render={() => <CreateStory />} />
          <Route exact path="/stories/:id" render={() => <StoryPage />}></Route>
          <Route exact path="/stories/:id/edit" render={() => <StoryEditForm />}></Route>
          <Route exact path="/profiles/:id" render={() => <ProfilePage />}></Route>
          <Route exact path="/profiles/:id/edit/image" render={() => <ProfileImageEditForm />}></Route>
          <Route exact path="/profiles/:id/edit/name" render={() => <ProfileNameEditForm />}></Route>
          <Route exact path="/profiles/:id/edit/about-me" render={() => <ProfileAboutMeEditForm />}></Route>
          <Route exact path="/profiles/:id/edit/username" render={() => <EditUsernameForm />}></Route>
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;