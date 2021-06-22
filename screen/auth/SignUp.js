import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,ActivityIndicator } from 'react-native'
import { TextInput, Snackbar } from 'react-native-paper'
import { FontAwesome, Ionicons, Entypo } from '@expo/vector-icons';
import * as authAction from '../../store/actions/auth'
import { useSelector, useDispatch } from 'react-redux';


const Signup = (props) => {
    const [name,setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [eyeIcon, setEyeIcon] = useState("eye-with-line")
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const [snackBarVisible,setSnackBarVisible] = useState(false);
    

    const nameChangeHandler = (name) => {
        setName(name);
    }
    const emailChangeHandler = (email) => {
        setEmail(email);
    }

    const passwordChangeHandler = (password) => {
      setPassword(password);
    }

    const confirmPasswordChangeHandler = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
    }

    const passwordVisibilityHandler = () => {
      eyeIcon=="eye"?setEyeIcon("eye-with-line"):setEyeIcon("eye")
      setPasswordVisibility(!passwordVisibility);
    }

    const onDismissSnackBar = () => setSnackBarVisible(false);


    const dispatch = useDispatch();
    const signUpHandler = async () => {
        setError("");
        setEmail(email.trim().toLocaleLowerCase());
        if(name.trim().length==0){
            setError("Name cant be empty");
            return;
        }
        if(password.length<4){
            setError("Password > 4 characters");
            return;
        }
        if(password!=confirmPassword){
            setError("Password's did not match");
            return;
        }
        setLoading(true);
        try{
            const signup = await dispatch(authAction.signup(
                name, email, password
            ))
            setSnackBarVisible(true);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => props.navigation.navigate('Login'),2000);
        }
        catch(err){
            console.log(err);
            setError(err.message);
        }
        setLoading(false);
    }
    
    return (
        <View style={styles.cantainer}>
        <Text style={styles.headerTxt}>WELCOME</Text>
        <ScrollView>
            <View style={styles.subView}>
            <Text style={styles.subTxt}>SignUp</Text>
            <TextInput style={styles.nameInput}
                mode="flat"
                left={<TextInput.Icon style={styles.inputIcon} name={() => <FontAwesome name="user-secret" size={28} color="black" />}  />}
                label="Name"
                onChangeText={nameChangeHandler} />
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
            <TextInput style={styles.nameInput}
                mode="flat"
                secureTextEntry
                left={<TextInput.Icon style={styles.inputIcon} name={() =><Ionicons name="md-lock-closed" size={28} color="black" /> }  />}
                // right={<TextInput.Icon style={styles.inputIcon} onPress={passwordVisibilityHandler} name={() =><Entypo name={eyeIcon} size={24} color="black" /> }  />}
                label="Confirm Password" onChangeText={confirmPasswordChangeHandler} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.btn} onPress={signUpHandler} >
                {loading? <ActivityIndicator size="large" color="white" /> : <Text style={styles.btnTxt}>SignUp</Text>}
            </TouchableOpacity>
            
            {/* end view */}
            <View style={styles.endView}>
                <Text style={styles.endTxt}>Already Have an Account?</Text>
                <TouchableOpacity
                    style={styles.endBtn}
                    onPress={() => props.navigation.goBack()}>
                <Text style={styles.loginTxt}>Login</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ScrollView>
        <Snackbar
            visible={snackBarVisible}
            onDismiss={onDismissSnackBar}
            action={{
                label: 'LOGIN',
                onPress: () => {
                   props.navigation.navigate('Login');
                },
            }}>
            Account Created
        </Snackbar>
      </View>
    )
}

export default Signup

const styles = StyleSheet.create({
    cantainer: {
        backgroundColor: '#521be3',
        height: '100%',
      },
      subView: {
        backgroundColor: 'white',
        height: '90%',
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
      errorText: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center'
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
        marginBottom:20,
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
