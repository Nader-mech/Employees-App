import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, AsyncStorage, Button, ImageBackground, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import Card from '../components/card';
import Colors from '../constants/Colors';
import { gotoMain } from '../navigation/mainNavigator';
import * as authActions from '../store/actions/authActions';

const userAuth = props => {
  const [imageUrl, setImageUrl]=useState('')
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setIsLoading(false);
        gotoMain();
        return;
      }
    };
    tryLogin();
  }, [dispatch, setIsLoading]);

  const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
  }
  

  const imageHandler = () => {
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: 'data:image/jpeg;base64,' + response.data };
        setImageUrl(source);
      }
    })
  }



  const sumbitHandler = async values => {
   try{
    if (!isSignUp) {
      await dispatch(authActions.Login(values.email, values.password , imageUrl));
    } else if (isSignUp) {
      await dispatch(authActions.signUp(values.email, values.password , imageUrl));
    }
    gotoMain();
  }catch(error){
    Alert.alert(`${error}`) 
  }
}


  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }
  return (
    <KeyboardAvoidingView
      behavior="height"
      keyboardVerticalOffset={20}
      style={styles.screen}>
      <ImageBackground
        source={require('../assets/main.jpg')}
        style={{ width: '100%', height: '100%' }}>
        <View style={styles.cardContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={sumbitHandler}>
              
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <Card style={styles.authContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                <View style={styles.buttonContainer}>
                {isSignUp && <View style={{ paddingVertical: '4%' }}><Button title='Add your image' onPress={()=>imageHandler()} /></View>}
                  <View style={styles.button}>
                    <Button
                      title={isSignUp ? 'SignUp' : 'Login'}
                      color={Colors.primary}
                      onPress={handleSubmit}
                    />
                  </View>
                  <View style={styles.button}>
                    <Button
                      title={`Switch to ${isSignUp ? 'Login' : 'Signup'}`}
                      color={Colors.accent}
                      onPress={() => setIsSignUp(prevState => !prevState)}
                    />
                   
                  </View>
                </View>
              </Card>
            )}
          </Formik>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  authContainer: {
    width: '70%',
    height: 260,
  },
  input: {
    marginVertical: 10,
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '70%',
    marginVertical: 5,
  },
});

export default userAuth;
