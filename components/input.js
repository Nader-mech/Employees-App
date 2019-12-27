import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'


const Input = props => {
    return (
        <View style={styles.textHolder}>
            <TextInput

                {...props}
                placeholder={props.placeHolder}
                placeholderTextColor='black'
                style={styles.input} />
        </View>
    )
}



const styles = StyleSheet.create({
    textHolder: {
        paddingBottom: 11,
        width: '100%',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#ccc',
        width: '80%'

    }
})

export default Input