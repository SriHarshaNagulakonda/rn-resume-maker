import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Linking
} from 'react-native';
import { FontAwesome, Ionicons, Entypo, Foundation,FontAwesome5, Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Card from '../Card';

const ProjectItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.details}>
              <Text style={styles.name}>{props.name}</Text>
              <Text style={styles.description}>{props.description}</Text>
              <Text style={styles.content}>
                <AntDesign name="calendar" size={15} color="#999" />{props.start+"  -  "+props.end}
              </Text>
            </View>
            <View style={styles.actions}>
              <View style={styles.row}>
                <Text style={{color: 'blue'}}
                      onPress={() => Linking.openURL('http://google.com')}>
                  {"view"}<Feather name="external-link" size={15} color="blue" />
                </Text>
                <Text style={{color: 'blue'}}
                      onPress={() => Linking.openURL('http://google.com')}>
                  {"  code"}<Entypo name="code" size={15} color="blue" />
                </Text>
              </View>
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
    flex: 1,
    margin: 20,
    marginBottom: 5
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
    height:'150%',
    flex: 1
  },
  details: {
    // height: '17%',
    padding: 10,
    flex: 0,
    width: '70%'
  },
  name: {
    fontSize: 18,
    marginVertical: 2,
    color: 'black',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#888',
    justifyContent: 'space-around',
    textAlign: 'justify'
  },
  actions: {
    // height: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    paddingHorizontal: 20
  },
  row:{
    top:10,
    // left:200,
    right:-230,
    flexDirection: 'row',
    color: '#888',
    paddingBottom:20
  },
  content:{
    color: '#888',
    paddingTop:7,
  }
});

export default ProjectItem;
