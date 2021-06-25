import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, Text, View, Linking } from 'react-native'
import TemplateItem from '../components/TemplateItem'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { useSelector, useDispatch } from 'react-redux';

import * as basicActions from '../store/actions/BasicDetails'
import * as projectsActions from '../store/actions/projects';
import * as educationsActions from '../store/actions/educations';
import * as skillsActions from '../store/actions/skills';
import * as achievementsActions from '../store/actions/achievements';


const Resume = (props) => {
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

    const dispatch = useDispatch();
    const fetchData = () => {
        dispatch(basicActions.fetchBasics())
        dispatch(projectsActions.fetchProjects());
        dispatch(educationsActions.fetchEducations());
        dispatch(skillsActions.fetchSkills());
        dispatch(achievementsActions.fetchAchievements());
    }

    const basicData = useSelector(state => state.basic.basicDetails)
    const userProjects = useSelector(state => state.project.availableProjects);
    const userEducations = useSelector(state => state.education.availableEducations);
    const userSkills = useSelector(state => state.skill.availableSkills);

    useEffect(() => {
        fetchData();
    }, [dispatch]);

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
            props.navigation.navigate('PDFViewer', { url: uri });
            // Linking.openURL(uri)
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
