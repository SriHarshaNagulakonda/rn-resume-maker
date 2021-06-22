import React, {useState} from 'react'
import { StyleSheet,Button, Image, Text, View, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';

const ImageSelector = () => {
    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA);
        if(result.status!=='granted'){
            Alert.alert(
                'Insuffieicent Permissions',
                'You need to grant camera permissions to use this app',
                [{text: 'Okay'}]
            )
            return false;
        }
        return true;
    }

    const takeImageHandler = async () => {
        const hasPermmison = await verifyPermissions();
        if(!hasPermmison){
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [3,4],
            quality: 0.5
        });
        console.log(image);
        setPickedImage(image.uri);
    }

    return (
        <View>
            <Text>No image picked yer</Text>
            <Image source={{uri: pickedImage}} style={styles.image} />
            <Button title="Take image" 
                color="blue"
                onPress={takeImageHandler}
            />
        </View>
    )
}

export default ImageSelector

const styles = StyleSheet.create({
    imagePicker: {},
    imagePreivew:{
        width:'100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc'
    },
    image:{
        width:'100%',
        // height:'100%',
    }
})
