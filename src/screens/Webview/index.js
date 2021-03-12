import React from 'react';
import {Platform, Linking, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {Header, Loader} from '../../react-native-nuno-ui';

export default function Webview(props) {
  React.useEffect(() => {
    Linking.addEventListener('url', handleOpenURL);
    return () => Linking.removeEventListener('url', handleOpenURL);
  }, []);
  const handleOpenURL = (event) => {
    console.log('handleOpenURL', event);
  };
  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <Header
        left={'close'}
        navigation={props.navigation}
        title={props.route.params.title}
      />
      <WebView
        // ref={(ref) => {
        //   this.webview = ref;
        // }}
        source={{
          uri: props.route.params.url,
        }}
        // onNavigationStateChange={(event) => {
        //   if (event.url !== props.route.params.url) {
        //     this.webview.stopLoading();
        //     Linking.openURL(event.url);
        //   }
        // }}
        style={{paddingHorizontal: 5}}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderLoading={() => <Loader />}
      />
    </View>
  );
}
