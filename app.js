import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { HomeScreen, ProfileScreen, EditProfileScreen, NotificationsScreen, HelpScreen, PlansScreen } from './screens/HomeScreens';
import { CatalogListScreen, ItemDetailScreen, AddItemScreen } from './screens/CatalogScreens';
import { AIConfigScreen, ResultsScreen, CreateCatalogScreen } from './screens/GeneratorScreens';
import { Home, Book, Sparkles, CreditCard, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
…      </Router>
    </AppProvider>
  );
};

export default App;
