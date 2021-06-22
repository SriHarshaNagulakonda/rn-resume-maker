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

import Card from '../Card';

const SkillItem = props => {
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
              <Text style={styles.title}>{props.name}</Text>
              <Text style={styles.value}>{props.value}%</Text>
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
    height: 70,
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
    height: '17%',
    padding: 10
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // height: '23%',
    paddingHorizontal: 20
  }
});

export default SkillItem;
