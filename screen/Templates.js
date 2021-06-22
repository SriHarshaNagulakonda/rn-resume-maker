import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Resume = () => {
    return (
        <View style={styles.container}>
            <Text>Resume</Text>
        </View>
    )
}


Resume.navigationOptions = (navData) => {
    return {
        headerTitle: "TEMPLATES",
        headerStyle: {
            backgroundColor: 'blue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
}

  
export default Resume;


const styles = StyleSheet.create({
    container: {
        padding:30,
    }
})
