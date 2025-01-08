import React from 'react';
import { useRouter } from 'expo-router';
import { Formik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import { View,Text,Pressable,TextInput, StyleSheet,Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AnimationComponent from '@/src/components/AnimationComponent';



export default function signIn() {


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
      } else if (!/\S+@\S+\.\S+/.test(values.email) && values.email.length > 1) {
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

       <AnimationComponent/>

      <View 
      style={styles.container_}>
        <Text style={styles.label}>Sign in or {" "}
        <Text
          style={styles.linkText}
          onPress={() => router.push('/signUp')}
        >
          create an account
        </Text></Text>
  
        <TextInput
          placeholder="Email"
          style={styles.input_}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          keyboardType="email-address"
        />
       {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <TextInput
          placeholder="Password"
          style={styles.input_}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          secureTextEntry
        />
        {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
       
        <Pressable style={styles.button_} onPress={()=>handleSubmit()}>
          <Text style={styles.buttonText_}>Sign in</Text>
        </Pressable>
        </View>
      </View>)}
      </Formik>
        );
}

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
    textAlign:"center",
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
    color: '#555D50',
  },
  error: {
    marginVertical: 3,
    color: 'red',
    paddingVertical:1,
    paddingHorizontal: 7,
    paddingBottom:5

  },
  input_: {
    backgroundColor:'white',
   height: 40,
  borderColor: 'gray',
  borderWidth: StyleSheet.hairlineWidth,
  marginBottom: 7,
  paddingHorizontal: 10,
  borderRadius:10,
  marginHorizontal:5,
  },
  button_: {
    backgroundColor: '#050A12',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 10,
    marginTop:10
  
  },
  buttonText_: {
    color: 'white',
    fontWeight: 'bold',
  },

});
