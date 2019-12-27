import React, { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Text, ScrollView, ActivityIndicator, ImagePickerIOS } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from '../constants/Colors'
import Input from '../components/input'
import { Formik } from 'formik'
import * as yup from 'yup'
import * as employeeActions from '../store/actions/employeeActions'
import { useDispatch } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import { Navigation } from "react-native-navigation";


const validationSchema = yup.object().shape({
    name: yup
        .string()
        .required()
        .label('Name')
        .min(3, 'Name should be more than 3 characters')
        .max(8, 'Name should be less than 8 characters'),
    email: yup
        .string()
        .required()
        .email()
        .label('E-mail'),
    phone: yup
        .string()
        .required()
        .min(11)
        .label('Phone'),
    description: yup
        .string()
        .required()
        .min(30, 'Description should me more than 30 characters')
        .max(100, 'You can not exceed 100 characters')
})


const addEmployee = props => {

    const [imageUrl, setImageUrl] = useState('')
    const [isSumbitting, setIsSumbitting] = useState(false)
    const dispatch = useDispatch()

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

    const sumbitHandler = async (values) => {
        setIsSumbitting(true)
        try {
            await dispatch(employeeActions.createEmployee({
                name: values.name,
                email: values.email,
                phone: values.phone,
                description: values.description,
                profileImg: imageUrl
            }))
               setIsSumbitting(false)
               values.name = ''
               values.email = ''
               values.phone = ''
               values.description = ''
               Navigation.pop(props.componentId, {
                component: {
                    name: 'add',
                }
            })
        } catch (err) {
            throw err
        }
    }


    if (isSumbitting) {
        return <ActivityIndicator size='large' color={Colors.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView keyboardVerticalOffset={-500} behavior="padding" style={styles.screen} >

                <View style={styles.upperContainer}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity style={styles.imageHolder} onPress={() => imageHandler()}>
                            <Image source={imageUrl || require('../assets/user.jpg')} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Formik
                    initialValues={{ name: '', email: '', phone: '', description: '' }}
                    onSubmit={(values) => sumbitHandler(values)}
                    validationSchema={validationSchema} sd
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                        <View style={styles.textContainer}>
                            <Input
                                placeHolder='Name'
                                autoCapitalize='none'
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                value={values.name}
                            />
                            {errors.name && <View style={styles.error}><Text style={{ color: 'red' }}>{errors.name}</Text></View>}
                            <Input
                                placeHolder='Email'
                                autoCapitalize='none'
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            {errors.email && <View style={styles.error}><Text style={{ color: 'red' }}>{errors.email}</Text></View>}
                            <Input
                                placeHolder='Phone'
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                                keyboardType='numeric'
                            />
                            {errors.phone && <View style={styles.error}><Text style={{ color: 'red' }}>{errors.phone}</Text></View>}
                            <Input
                                placeHolder='Description'
                                autoCapitalize='none'
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                value={values.description}
                            />
                            {errors.description && <Text style={{ color: 'red' }}>{errors.description}</Text>}
                            <TouchableOpacity style={styles.icon} onPress={handleSubmit} disabled={Object.keys(errors).length > 0}>
                                <Icon name="ios-add" size={40} color='white' />
                                <Text style={{ color: 'white', fontSize: 20 }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>


            </KeyboardAvoidingView>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    upperContainer: {
        width: '100%',
        height: 230,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: '#ccc',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageHolder: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    buttonContainer: {
        width: '50%'
    },
    input: {
        backgroundColor: '#ccc',
        width: '80%'

    },
    screenContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 50,
        backgroundColor: Colors.primary,

    },
    textHolder: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center'
    },
    error: {
        padding: 0,
        margin: 0
    }
})



export default addEmployee