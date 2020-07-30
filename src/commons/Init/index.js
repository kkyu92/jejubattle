import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '../../config';
import axios from 'axios';
import {Platform, NativeModules} from 'react-native';
import {logApi, getCurrentLocation} from 'react-native-nuno-ui/funcs';

export default async () => {
  const lang = await AsyncStorage.getItem('lang');
  if (!lang) {
    let deviceLanguage =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;
    // deviceLanguage = deviceLanguage.substring(0, 2);
    if (deviceLanguage === 'en-US' || deviceLanguage === 'ko-KR') {
      await AsyncStorage.setItem('lang', deviceLanguage);
    } else {
      deviceLanguage = 'ko-KR';
      await AsyncStorage.setItem('lang', deviceLanguage);
    }
    // header.member_lang = deviceLanguage;
    global.lang = deviceLanguage;
  } else {
    // header.member_lang = lang;
    global.lang = lang;
  }

  // location
  global.address = await getCurrentLocation(lang);
  console.log('location', global.address);

  const token = await AsyncStorage.getItem('token');
  global.token = token;
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['token'] = token;
  axios.defaults.headers.common['os'] = Platform.OS === 'android' ? 1 : 2;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  await axios
    .post('version', {})
    .then((res) => {
      logApi('Version', res.data);
    })
    .catch((err) => {
      logApi('Version error', err.response);
    });
};
