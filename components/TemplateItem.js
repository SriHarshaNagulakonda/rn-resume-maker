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
import { FontAwesome } from '@expo/vector-icons';
import Card from './Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SkillItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View  style={styles.row}>
            <View  style={styles.details}>
              <MaterialCommunityIcons name={props.icon} size={24} color="blue" />
              <Text style={styles.title}>{"   "+props.name}</Text>
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 50,
    margin: 20
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
    // height: '17%',
    padding: 5,
    flexDirection: 'row',
    width:'80%'
  },
  title: {
    fontSize: 18,
    marginVertical: 2
  },
  value: {
    fontSize: 14,
    color: '#888'
  },
  actions: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    right:0,
  },
  row:{
    flexDirection: 'row',
    padding: 5,
  },
});

export default SkillItem;
