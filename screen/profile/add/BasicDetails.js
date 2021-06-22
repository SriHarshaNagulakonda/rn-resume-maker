import React, {useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Snackbar } from 'react-native-paper'
import { FontAwesome, Ionicons, Entypo, Foundation,FontAwesome5 } from '@expo/vector-icons';
import HeaderButton from '../../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ImageSelector from '../../../components/ImageSelector'
import { useSelector, useDispatch } from 'react-redux';
import * as basicActions from '../../../store/actions/BasicDetails'


const BasicDetails = (props) => {
    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [careerObjective,setCareerObjective] = useState("")
    
    const nameChangeHandler = (name) => {
        setName(name);
    }

    const dispatch = useDispatch();
    const submitHandler = useCallback(async() => {
        try {
            const basic = await dispatch(basicActions.createBasic(
                name, email, phone, careerObjective
            ))
        }
        catch(err){
            console.log(err)
        }
    },[dispatch,name,email,careerObjective,phone])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
      }, [submitHandler]);


    return (
        <View>
                <TextInput style={styles.nameInput}
                    mode="flat"
                    left={<TextInput.Icon style={styles.inputIcon} name={() => <FontAwesome name="user-secret" size={28} color="black" />}  />}
                    label="Name"
                    onChangeText={nameChangeHandler} />
                <TextInput style={styles.nameInput}
                    mode="flat"
                    left={<TextInput.Icon style={styles.inputIcon} name={() => <Foundation name="mail" size={24} color="black" />}  />}
                    label="Email"
                    onChangeText={(email) => setEmail(email)} />
                <TextInput style={styles.nameInput}
                    mode="flat"
                    left={<TextInput.Icon style={styles.inputIcon} name={() => <FontAwesome name="phone" size={24} color="black" />}  />}
                    label="Phone"
                    onChangeText={(phone) => setPhone(phone)} />
                 <TextInput style={styles.textArea}
                    mode="flat"
                    left={<TextInput.Icon style={styles.inputIcon} name={() => <FontAwesome5 name="lightbulb" size={24} color="black" />}  />}
                    label="Career Objective"
                    numberOfLines={4}
                    multiline
                    onChangeText={(careerObjective) => setCareerObjective(careerObjective)} />
                {/* <ImageSelector /> */}
        </View>
    )
}

export default BasicDetails

BasicDetails.navigationOptions = (navData) => {
    const submit = navData.navigation.getParam('submit');

    return {
          headerRight: (
            <HeaderButtons>
               <Ionicons name="md-save" size={24} color="white"
                    onPress={submit}
               />
            </HeaderButtons>
          )      
    }
}

const styles = StyleSheet.create({
    nameInput: {
        height: 50,
        width: '85%',
        marginLeft: 40,
        borderBottomWidth: 1,
        marginTop:  30,
        borderColor:'blue',
        paddingBottom:10
      },
      textArea: {
        height: 150,
        width: '85%',
        marginLeft: 40,
        borderBottomWidth: 1,
        marginTop:  30,
        borderColor:'blue',
        paddingBottom:10
      },
      inputIcon: {
        marginTop:15
      },
})
