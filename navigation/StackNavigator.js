import {createNativeStackNavigator} from '@react-navigation/native-stack';
import login from '../pages/Login';
import home from '../pages/Home';


const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Login" component={login} />
            <Stack.Screen name="Home" component={home} />
            {/* Adicione mais telas aqui */}
        </Stack.Navigator>
    );
}