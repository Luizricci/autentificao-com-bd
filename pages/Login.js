import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.6:3030/api/auth/login', { //tem que ser o ip da maquina que está rodando o backend
        email,
        senha: password,
      });
      const { token } = response.data;
      if (!token) {
        throw new Error('Token não encontrado na resposta');
      }

      await AsyncStorage.setItem('token', token);

      console.log('Login bem-sucedido:', response.data);
      setError(null); 
      setSuccess('Login realizado com sucesso!');

      navigation.navigate('Home');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage); 
      setSuccess(null); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticação</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {success && <Text style={styles.success}>{success}</Text>} 
      <Button title="Entrar" onPress={handleLogin} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
  success: { 
    color: 'green',
    marginTop: 16,
    textAlign: 'center',
  },
});