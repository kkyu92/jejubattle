import AsyncStorage from '@react-native-community/async-storage';
import {API_URL} from '../../config';
import axios from 'axios';
import {Platform, NativeModules} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {logApi, getCurrentLocation} from '../../react-native-nuno-ui/funcs';
import moment from 'moment';
import 'moment/locale/ko';

export default async () => {
  // const lang = await AsyncStorage.getItem('lang');
  // if (!lang) {
  //   let deviceLanguage =
  //     Platform.OS === 'ios'
  //       ? NativeModules.SettingsManager.settings.AppleLanguages[0]
  //       : NativeModules.I18nManager.localeIdentifier;
  //   deviceLanguage = deviceLanguage.substring(0, 2);
  //   if (deviceLanguage === 'en' || deviceLanguage === 'ko') {
  //     await AsyncStorage.setItem('lang', deviceLanguage);
  //   } else {
  //     deviceLanguage = 'ko';
  //     await AsyncStorage.setItem('lang', deviceLanguage);
  //   }
  //   // header.member_lang = deviceLanguage;
  //   global.lang = deviceLanguage.substring(0, 2);
  // } else {
  //   // header.member_lang = lang;
  //   global.lang = lang;
  // }

  global.lang = 'ko';
  moment.locale('ko');

  const token = await AsyncStorage.getItem('token');
  global.token = token;
  axios.defaults.baseURL = API_URL;
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  axios.defaults.headers.common['token'] = token;
  axios.defaults.headers.common['os'] = Platform.OS === 'android' ? 1 : 2;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  // 각종 asyncstorage global value
  const hideFilterGuide = await AsyncStorage.getItem('hideFilterGuide');
  global.hideFilterGuide = hideFilterGuide;
  const hidePermissionAlert = await AsyncStorage.getItem('hidePermissionAlert');
  global.hidePermissionAlert = hidePermissionAlert;
  const appStartGuide = await AsyncStorage.getItem('appStartGuide');
  global.appStartGuide = appStartGuide;

  // location
  // Geolocation.requestAuthorization('whenInUse');

  global.address = await getCurrentLocation(global.lang);
  // console.log('[init] location', global.address);

  // if (Platform.OS === 'ios') {
  //   var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
  //   console.log('[init] iOS : ', response);
  //   if (response === 'granted') {
  //     global.address = await getCurrentLocation(global.lang);
  //     console.log('location', global.address);
  //   }
  // } else {
  //   var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  //   console.log('[init] Android : ', response);
  //   if (response === 'granted') {
  //     global.address = await getCurrentLocation(global.lang);
  //     console.log('location', global.address);
  //   }
  // }

  await axios
    .post('version', {})
    .then((res) => {
      logApi('Version', res.data);
    })
    .catch((err) => {
      logApi('Version error', err);
    });
};
