import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';
// import WebView from 'react-native-webview';
// import PDFReader from 'rn-pdf-reader-js'

// const PdfReader = ({ url: uri }) => <WebView style={{ flex: 1 }} source={{ uri }} />

export default function PDFExample (props) {
    const source = {uri: props.navigation.getParam('url'),cache:true};
    console.log(props.navigation.getParam('url'),'url ');
    return (
      
        <View style={styles.container}>
          {/* <PDFReader
            source={{
              uri: 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf',
            }}
          /> */}
          <Pdf
            source='http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf'
            />

        </View>
    )
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});