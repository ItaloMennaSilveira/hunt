import { createStackNavigator, createAppContainer } from "react-navigation";

import Main from './pages/main';
import Product from './pages/product';

const MainNavigator = createStackNavigator({ Main, Product });

export default createAppContainer( MainNavigator );