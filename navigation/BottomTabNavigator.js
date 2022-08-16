// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {useColorScheme} from "react-native";

import Colors from "../constants/Colors";
import BrowserScreen from "../screens/BrowserScreen"
import PortfolioScreen from "../screens/PortfolioScreen";
import ShortcutsScreen from "../screens/ShortcutsScreen";
import OptionsScreen from "../screens/OptionsScreen";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="Portfolio"
            screenOptions={{tabBarActiveTintColor: Colors[colorScheme].tint, headerShown: false}}
        >
            <BottomTab.Screen
                name="Browser"
                component={BrowserScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <TabBarIcon name="globe-outline" color={color}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="Portfolio"
                component={PortfolioScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <TabBarIcon name="pie-chart" color={color}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="Shortcuts"
                component={ShortcutsScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <TabBarIcon name="color-wand-outline" color={color}/>
                    ),
                }}
            />
            <BottomTab.Screen
                name="Options"
                component={OptionsScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <TabBarIcon name="ellipsis-horizontal-circle-outline" color={color}/>
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
    return <Ionicons size={25} style={{marginBottom: -3}} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab


