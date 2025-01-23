import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import GlobalStyles from './styles/GlobalStyles';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <GlobalStyles />
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
