import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { FontAwesome, Ionicons, Entypo, Foundation,FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Card from '../Card';

const EducationItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            {/* <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.image }} />
            </View> */}
            <View style={styles.details}>
              <Text style={styles.name}>{props.name}</Text>
              <Text style={styles.institution}>{props.institution}</Text>
              <Text style={styles.content}>
                <MaterialCommunityIcons name="percent" size={15} color="#999" /> {props.score+"   "}
                <AntDesign name="calendar" size={15} color="#999" />{props.start+"  -  "+props.end}
              </Text>
            </View>
            <View style={styles.actions}>
              <Text style={{color:'#888'}}>
                <MaterialIcons name="place" size={15} color="#999" /> {props.place+"   "}
              </Text>
              <View style={styles.row}>
                {props.children}
              </View>
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 90,
    margin: 20,
    marginBottom: 5
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
    height:'100%'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    height: '17%',
    padding: 10,
    flex: 1
  },
  name: {
    fontSize: 14,
    marginVertical: 2,
    color: '#888'
  },
  institution: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  actions: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20
  },
  row:{
    flexDirection: 'row',
    color: '#888'
  },
  content:{
    color: '#888',
    paddingTop:7,
  }
});

export default EducationItem;
