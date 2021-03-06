import {
  Platform,
  Share,
  Alert,
  Linking,
  PermissionsAndroid,
  ActionSheetIOS,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-root-toast';
import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Nuno} from '.';
import {screenWidth} from './style';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
// import DeviceInfo from 'react-native-device-info';
import deviceInfoModule from 'react-native-device-info';
import RNBootSplash from 'react-native-bootsplash';

export function log(func, data) {
  console.log(func, data);
}
export function error(func, data) {
  console.error(func, data);
}
export function logApi(func, data) {
  console.groupCollapsed(`[API] ${func}`);
  console.info(data);
  console.groupEnd();
}
export function errorApi(endpoint, data) {
  console.groupCollapsed(`[API ERROR] ${endpoint}`);
  console.error(data);
  console.groupEnd();
}
export function checkEmail(email) {
  if (email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      return {
        valid: false,
        msg: '이메일 형식에 맞지않습니다.',
      };
    } else {
      return {
        valid: true,
      };
    }
  }
}
export function checkPassword(password, repassword) {
  if (password !== repassword) {
    return {
      valid: false,
      msg: '입력된 두 비밀번호가 서로 다릅니다',
    };
  }
  if (!password.length || !repassword.length) {
    return {
      valid: false,
      msg: '비밀번호를 입력해주세요',
    };
  }
  if (password) {
    // 비밀번호 형식은 최소6자에서 최대20자, 영문 대소문자, 숫자,
    // 특수기호를 입력할수 있고 대문자와 특수기호가 하나씩 필수로 포함해야된다 .
    // 포함 되지 않을 때는 “비밀번호 형식은 최소6자에서 최대 20자, 영문 대문자와
    // 특수기호가 하나씩 포함되어야 합니다.” 에러 메세지를 보여준다.
    // const re = /^(?=.*[A-Z])(?=.*[$@$!%*#?&])[a-zA-Z0-9\d$@$!%*#?&]{6,20}$/

    // 비밀번호 형식은 영문 대소문자, 숫자 반드시포함 6자리 이상 (특수문자 포함되어도 상관없음 필수는 아님)
    const rule = /^(?=.*[0-9])(?=.*[A-z])[A-z0-9\d$@$!%*#?&]{6,}$/;
    if (!rule.test(password)) {
      return {
        valid: false,
        msg: '비밀번호 영문과 숫자가 포함 6자리 이상이어야 합니다',
      };
    }
  }

  return {
    valid: true,
  };
}
export function getAge(s) {
  if (!s) {
    return 0;
  }
  // ISODateString => Date
  const b = s.split(/\D+/);
  const birthday = new Date(
    Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]),
  );

  const ageDifMs = Date.now() - birthday.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export function gotoStore() {
  if (Platform.OS === 'android') {
    Linking.openURL(Nuno.config.ANDROID_PLAY_STORE).catch((err) =>
      console.log(err),
    );
  } else {
    Linking.openURL(Nuno.config.IOS_APP_STORE).catch((err) => console.log(err));
  }
}
export async function getAddressFromGeoCode(latitude, longitude) {
  return new Promise((resolve, reject) => {
    fetch(
      'https://maps.googleapis.com/maps/api/geocode/json?' +
        new URLSearchParams({
          latlng: `${latitude},${longitude}`,
          key: Nuno.config.GEOCODE_API,
          language: Nuno.config.lang,
          // region: global.lang,
        }),
      {
        method: 'GET',
        // headers: {
        //   'Accept-Language': global.lang + '-KR',
        // },
      },
    )
      .then(async (res) => {
        const response = await res.json();
        console.log('geocoderFrom', response);
        if (response.status === 'OK') {
          resolve({
            address:
              response.results[0].address_components[
                response.results[0].address_components.length - 3
              ].short_name +
              ' ' +
              response.results[0].address_components[
                response.results[0].address_components.length - 4
              ].short_name,
            coords: {
              latitude: latitude,
              longitude: longitude,
            },
          });
        } else {
          reject();
        }
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
}
export async function getCurrentCoords() {
  const isEmulator = await deviceInfoModule.isEmulator();
  return new Promise((resolve, reject) => {
    if (isEmulator) {
      resolve({latitude: 37.5683905, longitude: 126.9510365});
    } else {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log('current location', position.coords);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          // See error code charts below.
          console.log('getCurrentPosition1 error', error.code, error.message);
          reject(error);
        },
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
      );
    }
  });
}
export async function getCurrentLocation(lang) {
  let granted;
  let result;
  if (Platform.OS === 'android') {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        // title: '',
        message: '회원님의 위치정보를 권한을 확인해주세요.',
      },
    );
  } else {
    result = await Geolocation.requestAuthorization('whenInUse');
    console.log('geolocation : ' + result);
    if (result !== 'granted') {
      setTimeout(async () => {
        await Alert.alert('회원님의 위치정보를 권한을 확인해주세요.', '', [
          {text: '권한 설정하기', onPress: () => openSetting()},
          {text: '취소', onPress: () => {}},
        ]);
      }, 400);
      granted = result;
    } else {
      granted = PermissionsAndroid.RESULTS.GRANTED;
    }
  }
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const isEmulator = await deviceInfoModule.isEmulator();

  return new Promise(async (resolve, reject) => {
    if (granted === 'granted') {
      if (isEmulator) {
        resolve({
          address: '서울시 중구',
          coords: {latitude: 37.568676, longitude: 126.978031},
        });
      } else {
        await Geolocation.getCurrentPosition(
          (position) => {
            console.log('current location', position);
            fetch(
              'https://maps.googleapis.com/maps/api/geocode/json?' +
                new URLSearchParams({
                  latlng: `${position.coords.latitude},${position.coords.longitude}`,
                  key: Nuno.config.GEOCODE_API,
                  language: Nuno.config.lang,
                  // region: global.lang,
                }),
              {
                method: 'GET',
                // headers: {
                //   'Accept-Language': global.lang + '-KR',
                // },
              },
            )
              .then(async (res) => {
                const response = await res.json();
                console.log('geocoderFrom', response);
                if (response.status === 'OK') {
                  resolve({
                    address:
                      response.results[0].address_components[
                        response.results[0].address_components.length - 3
                      ].short_name +
                      ' ' +
                      response.results[0].address_components[
                        response.results[0].address_components.length - 4
                      ].short_name,
                    coords: position.coords,
                  });
                } else {
                  reject();
                }
              })
              .catch((err) => {
                console.log(err);
                reject();
              });
          },
          (error) => {
            // See error code charts below.
            console.log('getCurrentPosition2 error', error.code, error.message);
            reject(error);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
      }
    } else {
      console.log('location permission not granted');
      // Alert.alert(
      //   `근접 회원님과의 매칭을 위해 회원님의 위치정보를 허락해주세요.`,
      //   '',
      //   [
      //     {text: '권한 설정하기', onPress: () => openSetting()},
      //     {text: '취소', onPress: () => {}},
      //   ],
      // );
      reject();
    }
  });
}
export async function saveRecentKeyword(keyword, max) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('searchKeywords')
      .then((resStorage) => {
        let locals = [];
        if (resStorage) {
          locals = JSON.parse(resStorage);
        }
        const found = locals.map((e) => e.keyword).indexOf(keyword);
        if (found !== -1) {
          locals.splice(found, 1);
        }
        locals.splice(0, 0, {
          keyword: keyword,
          date: new Date().toISOString(),
        });
        if (locals.length > max) {
          locals.splice(5, 1);
        }
        AsyncStorage.setItem('searchKeywords', JSON.stringify(locals));
        resolve(locals);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
}
export async function removeRecentKeyword(keyword) {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('searchKeywords')
      .then((resStorage) => {
        let locals = [];
        if (resStorage) {
          locals = JSON.parse(resStorage);
        }
        const found = locals.map((e) => e.keyword).indexOf(keyword);
        if (found !== -1) {
          locals.splice(found, 1);
        }
        AsyncStorage.setItem('searchKeywords', JSON.stringify(locals));
        resolve(locals);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
}
export async function getRecentKeyword() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('searchKeywords')
      .then((resStorage) => {
        let locals = [];
        if (resStorage) {
          locals = JSON.parse(resStorage);
        }
        resolve(locals);
      })
      .catch((err) => {
        console.log(err);
        reject();
      });
  });
}
export function showToast(msg, duration, position) {
  let containerStyle = {};
  if (position === 'center') {
    position = Toast.positions.CENTER;
  } else {
    position = Toast.positions.TOP;
    containerStyle = {
      width: screenWidth,
      height: 70 + (isIphoneX() ? getStatusBarHeight() : 0),
      paddingTop: isIphoneX() ? getStatusBarHeight() + 8 : 8,
      top: -20,
      borderRadius: 0,
      justifyContent: 'center',
    };
  }
  Toast.show(msg, {
    duration: duration,
    position: position,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    opacity: 0.8,
    textStyle: {fontSize: 14, color: 'white'},
    containerStyle: containerStyle,
  });
}
export const swap = (arr, index1, index2) =>
  arr.map((val, idx) => {
    if (idx === index1) return arr[index2];
    if (idx === index2) return arr[index1];
    return val;
  });
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function share(deeplink, title, contents, img, callback) {
  fetch(
    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${Nuno.config.FIREBASE_WEB_API}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        longDynamicLink: `${Nuno.config.dynamicLink}/?link=${deeplink}&ibi=${Nuno.config.BUNDLE_ID}&isi=${Nuno.config.IOS_STORE_ID}&apn=${Nuno.config.PACKAGE_NAME}&st=${title}
        &sd=${contents}
        &si=${img}`,
        // &efr='1'`,
      }),
    },
  )
    .then(async (response) => {
      const link = await response.json();
      console.log('shortlink', link.shortLink);
      Share.share({
        message: link.shortLink,
        title: title,
      }).then((res) => {
        if (res.action === Share.sharedAction) {
          callback && callback();
        } else if (res.action === Share.dismissedAction) {
          // dismissed
        }
      });
    })
    .catch((err) => {
      Alert.alert(err);
    });
}
export function getDateFromHours(timeStr) {
  const h = timeStr.split(':')[0];
  const m = timeStr.split(':')[1];
  const s = '0';
  let date = new Date();
  return date.setHours(h, m, s);
}
export function getPhotos(index, multiple) {
  return new Promise((resolve, reject) => {
    if (index === 0) {
      ImagePicker.openCamera({
        // writeTempFile: false,
        width: 300,
        height: 300,
        mediaType: 'photo',
        // cropping: true,
        multiple: multiple,
      })
        .then((res) => {
          console.log('ImagePicker openCamera', res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
    if (index === 1) {
      ImagePicker.openPicker({
        // writeTempFile: false,
        width: 300,
        height: 300,
        mediaType: 'photo',
        smartAlbums: ['UserLibrary'],
        // cropping: true,
        multiple: multiple,
      })
        .then((res) => {
          console.log('ImagePicker openPicker', res);
          if (res.mime !== 'image/jpeg' && res.mime !== 'image/png') {
            Alert.alert(lang[global.lang].notSupportedFile);
            reject();
          } else {
            resolve(res);
          }
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}
