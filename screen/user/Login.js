import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { TextInput } from 'react-native-paper'
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [eyeIcon, setEyeIcon] = useState("eye-with-line")
    const [passwordVisibility, setPasswordVisibility] = useState(true);

    const emailChangeHandler = (email) => {
        setEmail(email);
    }

    const passwordChangeHandler = (password) => {
      setPassword(password);
    }

    const passwordVisibilityHandler = () => {
      eyeIcon=="eye"?setEyeIcon("eye-with-line"):setEyeIcon("eye")
      setPasswordVisibility(!passwordVisibility);
    }

    
    
    return (
        <View style={styles.cantainer}>
        <Text style={styles.headerTxt}>WELCOME</Text>
        {/* <ScrollView> */}
        <View style={styles.subView}>
          <Text style={styles.subTxt}>Login</Text>
          <TextInput style={styles.nameInput}
            mode="flat"
            left={<TextInput.Icon style={styles.inputIcon} name={() => <Entypo name="mail" size={28} color="black" />}  />}
            label="Email"
            onChangeText={emailChangeHandler} />
           <TextInput style={styles.nameInput}
            mode="flat"
            secureTextEntry={passwordVisibility}
            left={<TextInput.Icon style={styles.inputIcon} name={() =><Ionicons name="md-lock-closed" size={28} color="black" /> }  />}
            right={<TextInput.Icon style={styles.inputIcon} onPress={passwordVisibilityHandler} name={() =><Entypo name={eyeIcon} size={24} color="black" /> }  />}
            label="Password" onChangeText={passwordChangeHandler} />
          <TouchableOpacity style={styles.btn} >
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>
          <View style={styles.endView}>
            <Text style={styles.endTxt}>Create an account?</Text>
            <TouchableOpacity
              style={styles.endBtn}
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.loginTxt}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    )
}

export default Login

const styles = StyleSheet.create({
    cantainer: {
        backgroundColor: '#521be3',
        height: '100%',
      },
      subView: {
        backgroundColor: 'white',
        height: '80%',
        marginTop: 240,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
      },
      headerTxt: {
        fontSize: 40,
        marginLeft: 40,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        marginTop: '20%',
      },
      subTxt: {
        color: 'black',
        marginTop: 20,
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 40,
      },
      nameInput: {
        height: 50,
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
      btn: {
        height: 50,
        width: 200,
        backgroundColor: 'blue',
        borderRadius: 80,
        borderWidth: 2,
        marginLeft: 70,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnTxt: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
      },
      endView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      endTxt: {
        fontSize: 15,
        marginTop: 30,
        marginLeft: 60,
        fontWeight: 'bold',
      },
      endBtn: {
        marginRight: 80,
      },
      loginTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 24,
      },
})
