import React, { useState } from 'react'
import { StyleSheet, FlatList, Text, View } from 'react-native'
import TemplateItem from '../components/TemplateItem'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";


const Resume = () => {
    const [userTemplates, setUserTemplates] = useState([
        {
            id:1,
            name:'Template 1',
            icon: 'numeric-1-box-multiple'
        },
        {
            id:2,
            name:'Template 2',
            icon: 'numeric-2-box-multiple'
        },
        {
            id:3,
            name:'Template 3',
            icon: 'numeric-3-box-multiple'
        }
    ]);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hello, Template1!</h1>
    </body>
    </html>
`;

    const createPDF = async (id) =>  {
        console.log(id)
        try {
            const { uri } = await Print.printToFileAsync({ html });
            console.log(uri)
            console.log('uri...created');
            if (Platform.OS === "ios") {
              await Sharing.shareAsync(uri);
            } else {
              const permission = await MediaLibrary.requestPermissionsAsync();
        
              if (permission.granted) {
                await MediaLibrary.createAssetAsync(uri);
              }
            }
        
          }
        catch (error) {
            console.error(error);
        }
        console.log('created..')
    }
    

    return (
        <FlatList
        data={userTemplates}
        keyExtractor={item => item.id.toString()}
        renderItem={itemData => (
          <TemplateItem
            name={itemData.item.name}
            icon={itemData.item.icon}
            onSelect={() => {
            //   editTemplateHandler(itemData.item.id);
            }}
          >
            <FontAwesome name="download"    
                onPress={() => {
                createPDF(itemData.item.id);
              }}
               size={24} color="#28a745" style={styles.icon} />

          </TemplateItem>
        )}
      />
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
