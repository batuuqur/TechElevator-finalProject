import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import AuthService from './services/AuthService';
import LoginView from './views/LoginView/LoginView';
import LogoutView from './views/LogoutView';
import RegisterView from './views/RegisterView/RegisterView';
import UserProfileView from './views/UserProfileView/UserProfileView';
import MainNav from './components/MainNav/MainNav';
import ProtectedRoute from './components/ProtectedRoute';
import NotLoggedDash from './views/DashBoard/NotLoggedDash';
import axios from 'axios';
import LoggedDash from './views/DashBoard/LoggedDash';
import CharacterCreationView from './views/CharacterCreationView/CharacterCreationView';
import CharacterLineUp from './components/CharacterLineUp/CharacterLineUp.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import GuidePage from './components/GuidePage/GuidePage.jsx';
import LeaderboardTestingView from './views/LeaderboardTestingView/LeaderboardTestingView.jsx';
import LeaderboardPage from './components/LeaderboardPage.jsx';
import FallenPage from './components/FallenPage.jsx';
import BattleView from "./views/Battle/BattleView.jsx";
import TurnerTestingView from './views/TestingViews/TurnerTestingView.jsx';
import BautTestingView from "./views/TestingViews/BautTestingView.jsx";
import PaulTestingView from "./views/TestingViews/PaulTestingView.jsx";
import SabrinaTestingView from "./views/TestingViews/SarbinaTestingView.jsx"
import BryceTestingView from "./views/TestingViews/BryceTestingView.jsx";
import MonsterOfTheWeekList from "./components/MonsterOfTheWeek/MonsterOfTheWeekList.jsx";
import Roster from "./components/Roster/Roster.jsx";
import CharacterCreator from "./components/CharacterCreator/CharacterCreator.jsx";




export default function App() {
  const [user, setUser] = useState(null);

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    // Remove auth data from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Clear auth token from axios
    delete axios.defaults.headers.common['Authorization'];

    // Clear the auth context
    setUser(null);
  }

  // When a user comes back to the app or refreshes the page, check for user/token in local storage and validate it
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (user && token) {
      // Set the token in the axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Make API request to ensure token is still valid
      AuthService.getUserProfile(user.id)
        .then((response) => {
          // Token is still valid, act like user just logged in
          handleLogin(response.data);
        })
        .catch(() => {
          // Token is not valid, act lke user just logged out
          handleLogout();
        });
    }
  }, []);

  return (
    <BrowserRouter>
      <div id="app">
        <UserContext.Provider value={{user, setUser}}>
          {/* <MainNav /> */}
          <Navbar />
          <main id="main-content">
            <Routes>
              <Route path="/" element={user ? <LoggedDash /> : <NotLoggedDash onLogin={handleLogin} />} />
              <Route path="/login" element={<LoginView onLogin={handleLogin} />} />
              <Route path="/logout" element={<LogoutView onLogout={handleLogout} />} />
              <Route path="/register" element={<RegisterView />} />

              <Route path="/CharacterCreation" element={<CharacterCreator/>} />
              <Route path="/CharacterLineUp" element={<Roster/>} />
              <Route path="/battle" element={<BattleView />} />
              <Route path="/monsters" element={<MonsterOfTheWeekList/>}/>
              <Route path="/leaderboard-test" element={<LeaderboardTestingView />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/fallen-heroes" element={<FallenPage />} />
              <Route path="/guide" element={<GuidePage />} />

              <Route path="/TurnerTestingView" element={<TurnerTestingView/>} />
              <Route path="/BautTestingView" element={<BautTestingView/>} />
              <Route path="/PaulTestingView" element={<PaulTestingView/>} />
              <Route path="/SabrinaTestingView" element={<SabrinaTestingView/>} />
              <Route path="/BryceTestingView" element={<BryceTestingView/>} />

              <Route
                path="/userProfile"
                element={
                  <ProtectedRoute>
                    <UserProfileView />
                  </ProtectedRoute>
                }
              />
              <Route path="/dashboard" element={user ? <LoggedDash /> : <NotLoggedDash  onLOgin={handleLogin}/>} />
            </Routes>
          </main>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  );
}
