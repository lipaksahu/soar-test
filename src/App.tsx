import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './pages/Settings';
import GlobalStyles from './styles/GlobalStyles';
import { AppProvider } from './context/AppContext';

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #F8F9FA;
`;

function App() {
  return (
    <AppProvider>
      <Router>
        <GlobalStyles />
        <AppContainer>
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MainContent>
        </AppContainer>
      </Router>
    </AppProvider>
  );
}

export default App;
