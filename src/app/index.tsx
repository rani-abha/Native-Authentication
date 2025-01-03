import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import * as SecureStore from 'expo-secure-store';

export default function HomeScreen() {
  const router = useRouter();
  const { removeAuthToken, clearSavedEmail} = useAuth();

  React.useEffect(() => {
    SecureStore.getItemAsync('authToken')
      .then((storedToken) => {
        console.log('Token from SecureStore (then):', storedToken);
      })
      .catch((error) => {
        console.error('Error retrieving token:', error);
      });
    
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Home Screen!</Text>
      <View style={styles.semiCircle} />
      <View style={styles.rectangle} />
      <TouchableOpacity style={styles.button} onPress={() => router.push('/signIn')}>
      <Text style={styles.buttonText}>Go to Sign In</Text>

        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={async() => {
        await removeAuthToken()
        SecureStore.getItemAsync('authToken')
      .then((storedToken) => {
        console.log('Token from SecureStore (then):', storedToken);
      })
      .catch((error) => {
        console.error('Error retrieving token:', error);
      });
      }}>
      <Text style={styles.buttonText}>remove</Text>

        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={async() => {
        await clearSavedEmail()
        SecureStore.getItemAsync('savedEmail')
      .then((storedToken) => {
        console.log('Token from SecureStore (then):', storedToken);
      })
      .catch((error) => {
        console.error('Error retrieving token:', error);
      });
      }}>
      <Text style={styles.buttonText}>remove email</Text>

        <Ionicons name="chevron-forward-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f3ee76'
  },
  semiCircle: {
    width: 200,
    height: 200,
    backgroundColor: '#48abe0',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    transform: [{ rotate: '90deg' }],
  },
  rectangle: {
    width: 4,
    height: 100,
    backgroundColor: '#48abe0',
    transform: [{ rotate: '45deg' }],},
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
});

