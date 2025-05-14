import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ItemCard from '../components/ItemCard';

export default function Home() {
    const [itens, setItens] = useState([]);
    const [error, setError] = useState(null);

    const fetchItens = async () => {
        try {

            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('Token não encontrado');
            }

            const userId = 1; 
            const response = await axios.get(`http://192.168.1.6:3030/api/posts/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });


            setItens(response.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            setError('Erro ao buscar itens. Tente novamente.');
        }
    };

    useEffect(() => {
        fetchItens();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao Feed</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            {itens.length > 0 ? (
                itens.map((item) => (
                    <ItemCard
                        key={item.evento_id}
                        evento_id={item.evento_name}
                        image={item.image}
                        content={item.content}
                        data_postagem={item.data_postagem}
                    />
                ))
            ) : (
                <Text>Nenhum item encontrado.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    error: {
        color: 'red',
        marginTop: 16,
    },
    item: {
        fontSize: 18,
        marginVertical: 8,
    },
});