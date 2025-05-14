import { View, Text, Image, StyleSheet } from 'react-native';

export default function ItemCard({ evento_id, image, content, data_postagem }) {

    return (
        <View style={styles.card}>
            <Image 
                source={{ uri: image.startsWith("http") ? image : `http://192.168.1.6:3000/uploads/${image}` }}
                style={styles.image} 
            />
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.date}>Postado em: {new Date(data_postagem).toLocaleDateString()}</Text>
            <Text style={styles.date}>Evento: {evento_id}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        width: '90%',
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 8,
    },
    content: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
});