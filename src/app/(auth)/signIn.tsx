import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
  } from 'react-native';
  import React from 'react';
  import { useRouter } from 'expo-router';
  import { Formik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import * as SecureStore from 'expo-secure-store';


  const signIn = () => {
    
    const router = useRouter();

    const { saveEmail } = useAuth();

    React.useEffect(() => {
      SecureStore.getItemAsync('savedEmail')
        .then((storedToken) => {
          console.log('Token from SecureStore (then):', storedToken);
        })
        .catch((error) => {
          console.error('Error retrieving token:', error);
        });
    }, []);

    const validate = (values: { email: string; password: string }) => {
      const errors: { email?: string; password?: string } = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email format';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      return errors;
    };

  
    const onSignIn = async (values: { email: string; password: string }) => {
      console.warn('Sign in: ', values.email);
      try {
        await saveEmail(values.email)
        router.push({ pathname: '/authenticate', params: { email:values.email, passowrd: values.password } });
      } catch (e) {
        if (e instanceof Error) {
          Alert.alert('Error', e.message); 
        } else {
          Alert.alert('Error', 'An unexpected error occurred');
        }
      }
    };
  
    return (
      <Formik
      initialValues={{ email: '', password: '' }}
      validate={validate}
      onSubmit={onSignIn}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={styles.container}>
        <Text style={styles.label}>Sign in or {" "}<Text
          style={styles.linkText}
          onPress={() => router.push('/signUp')}
        >
          create an account
        </Text></Text>
  
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          keyboardType="email-address"
        />
       {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry
        />
        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
       
        <Pressable style={styles.button} onPress={()=>handleSubmit()}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>)}
      </Formik>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    label: {
      fontSize: 24,
      marginVertical: 5,
      color: 'gray',
    },
    linkText: {
      fontSize: 24,
      marginVertical: 5,
      color: 'black',
    },
    error: {
      marginVertical: 5,
      color: 'red',
    },
    input: {
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      padding: 10,
      fontSize: 20,
      marginVertical: 5,
      borderRadius: 10,
    },
    button: {
      backgroundColor: '#050A12',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      marginVertical: 5,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
  });
  
  export default signIn;