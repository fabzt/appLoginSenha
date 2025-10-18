import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Alert, Image } from 'react-native';
import { auth } from './Firebase';
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";

const Perfil = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const db = getFirestore();

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setUserData(data);
                    setName(data.name || '');
                    setBio(data.bio || ''); 
                }
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const docRef = doc(db, 'user', user.uid);
                await updateDoc(docRef, { name, bio });
                setUserData({ ...userData, name, bio });
                setIdEditing(false);
                Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar os dados.');
        }
    };
    
    return (
        <View style={StyleSheet.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : userData ? (
                <>
                <Text style={StyleSheet.title}>Perfil do Usuário</Text>
                { isEditing ? (
                    <>
                    <TextInput
                        style={StyleSheet.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Nome"
                    />
                    <TextInput
                        style={StyleSheet.input}
                        value={bio}
                        onChangeText={setBio}
                        placeholder="Bio"
                    />
                    <Button title="Salvar" onPress={handleSave} />
                    <Button title="Cancelar" onPress={() => setIdEditing(false)} color="#888" />
                    </>
                ): (
                    <>
                    <Text style={StyleSheet.info}>Nome: {userData.name}</Text>
                    <Text style={StyleSheet.info}>Bio: {userData.bio}</Text>
                    <Button title="Editar" onPress={() => setIdEditing(true)} />
                    </>
                )}
                </>
            ) : (
                <Text>Usuário não encontrado.</Text>
            )}
        </View>
    ); 
};

const styles =StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    info: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5
    },
    input: {
        width: '100%',
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        fontSize: 16,
        borderRadius: 5
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10
    }
});

export default Perfil;