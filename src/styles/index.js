import {Dimensions} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

export const bottomTabHeight = 50;

export const ShadowStyle = {
  shadowColor: 'black',
  shadowOffset: {
    width: 2,
    height: 2,
  },
  shadowOpacity: 0.20,
  shadowRadius: 8,
  elevation: 3,
};
