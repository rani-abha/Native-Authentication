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
import { useAuth } from '../../context/AuthContext';
import { useFormik  } from 'formik';
import AnimationComponent from '@/src/components/AnimationComponent';

  const signUp = () => {
    
    const router = useRouter();

    const { saveEmail } = useAuth();
    const formik = useFormik({
        initialValues: {
          email: '',
          password: ''
        },
        validate: (values) => {
          const errors:{ email?: string; password?: string } = {};
    
          if (!values.email) {
            errors.email = 'Email is required';
          } else if (!/\S+@\S+\.\S+/.test(values.email)&& values.email.length > 1) {
            errors.email = 'Invalid email format';
          }
    
          if (!values.password) {
            errors.password = 'Password is required';
          } else if (values.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
          }
    
          return errors;
        },
        onSubmit: async (values) => {
            try {
              console.warn('Sign in: ', values.email);
              await saveEmail(values.email);
              router.push({ pathname: '/authenticate', params: { email: values.email } });
            } catch (e) {
              if (e instanceof Error) {
                Alert.alert('Error', e.message);
              } else {
                Alert.alert('Error', 'An unexpected error occurred');
              }
            }
          }
    })
  
    return (
      <View style={styles.container}>
        <AnimationComponent/>
        <View style={styles.container_}>
        <Text style={styles.label}>Create an account</Text>
  
        <TextInput
          placeholder="Email"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          style={styles.input}
        />
          {formik.errors.email && formik.touched.email && (
        <Text style={styles.error}>{formik.errors.email}</Text>
      )}

        <TextInput
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          style={styles.input}
          secureTextEntry
        />
  {formik.errors.password && formik.touched.password && (
        <Text style={styles.error}>
          {formik.errors.password}
          </Text>
      )}

        <Pressable 
        style={styles.button} 
        onPress={()=>formik.handleSubmit()}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    circle: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: 'blue',
    },
    container_: {
      backgroundColor: 'white',
      opacity:0.8,
      justifyContent: 'center',
      padding: 24,
      marginHorizontal:20
    },
    label: {
      fontSize: 24,
      fontWeight:'bold',
      marginVertical: 5,
      color: 'gray',
      padding:10,
      textAlign:"center",
    },
    linkText: {
      fontSize: 24,
      marginVertical: 5,
      color: 'black',
    },
    error: {
      marginVertical: 3,
      color: 'red',
      paddingVertical:2,
      paddingHorizontal: 7,
      paddingBottom:5
  
    },
    input: {
      backgroundColor:'white',
     height: 40,
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius:10,
    marginHorizontal:5,

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
  
  export default signUp;