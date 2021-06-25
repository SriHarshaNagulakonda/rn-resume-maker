import React,{useEffect} from 'react'
import { StyleSheet, Text, View, Platform,Image } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { useSelector, useDispatch } from 'react-redux';
import * as basicActions from '../../store/actions/BasicDetails'
import { FontAwesome, Ionicons, Entypo, Foundation,FontAwesome5 } from '@expo/vector-icons';

const Basic = () => {

  const dispatch = useDispatch();
  const fetchData = () => {
      dispatch(basicActions.fetchBasics())
  }

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const basicData = useSelector(state => state.basic.basicDetails)
  // console.log(basicData,'basic data selector')

  if(!basicData){
    return(
      <Text>Add some basic data</Text>
    )
  }

    return (
        <View style={styles.center}>
              <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: `https://www.w3schools.com/howto/img_avatar.png` }} />
            </View>

            <Text style={styles.name}><FontAwesome name="user-secret" size={28} color="black" /> {basicData.name}</Text>
            <Text style={styles.name}><Foundation name="mail" size={24} color="black" /> {basicData.email}</Text>
            <Text style={styles.name}><FontAwesome name="phone" size={24} color="black" /> {basicData.phone}</Text>

            <Text style={{...styles.name,paddingTop:20}}>Career Objective</Text>
            <Text  style={styles.name,styles.career_objective}>
                {basicData.career_objective}
            </Text>
        </View>
    )
}

Basic.navigationOptions = (navData) => {
    return {
        headerLeft:()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                  navData.navigation.toggleDrawer();
                }}
              />
            </HeaderButtons>
          ),
          headerRight:()=> (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
              {/* <Item
                title="Cart"
                iconName={() => <FontAwesome5 name="edit" size={24} color="black" />}
                onPress={() => {
                  navData.navigation.navigate('Cart');
                }}
              /> */}
               <FontAwesome5 name="edit" size={24} color="white"
                    onPress={() => {
                        navData.navigation.navigate('BasicDetails');
                    }}
               />
            </HeaderButtons>
          )      
    }
}

export default Basic

const styles = StyleSheet.create({
    center: {
      alignItems: 'center',
      padding:20
    },
    name: {
      fontSize:20,
      paddingTop:5,
    },
    imageContainer: {
      width: '100%',
      height: '50%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    career_objective: {
      justifyContent: 'center',
      fontSize: 20
    }
})
