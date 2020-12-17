import React from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Image,
  Checkbox,
  Button,
  Modal,
  Nuno,
  Loader,
} from '../../react-native-nuno-ui';
import {screenHeight, screenWidth} from '../../react-native-nuno-ui/style';

export default function FinishBattle() {
  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const changeStep = (step) => {
    setLoading(true);
    setStep(step);
    setLoading(false);
  };
  return loading === true ? (
    <Loader />
  ) : (
    <View
      style={{
        height: 'auto',
        maxHeight: screenHeight,
      }}>
      <ScrollView style={{padding: 20}}>
        {step === 1 ? (
          <>
            <HView
              style={{justifyContent: 'space-around', alignItems: 'center'}}>
              <Text
                fontWeight={'bold'}
                fontSize={18}
                text={'Step 1. 리더들의 평가'}
              />
              <Seperator width={10} />
              <TouchableOpacity
                style={{borderRadius: 5, borderWidth: 1, padding: 5}}
                onPress={() => changeStep(2)}>
                <Text fontWeight={'bold'} fontSize={18} text={'Step 2.'} />
              </TouchableOpacity>
            </HView>
            <Image
              local
              uri={require('../../../assets/img/img-guide-finishbattle1.png')}
              height={Math.floor(screenHeight - 60)}
              width={Math.floor(screenWidth - 40)}
              resizeMode={'contain'}
            />
          </>
        ) : (
          <>
            <HView
              style={{justifyContent: 'space-around', alignItems: 'center'}}>
              <TouchableOpacity
                style={{borderRadius: 5, borderWidth: 1, padding: 5}}
                onPress={() => changeStep(1)}>
                <Text fontWeight={'bold'} fontSize={18} text={'Step 1.'} />
              </TouchableOpacity>
              <Seperator width={10} />
              <Text
                fontWeight={'bold'}
                fontSize={18}
                text={'Step 2. 보상받기'}
              />
            </HView>
            <Image
              local
              uri={require('../../../assets/img/img-guide-finishbattle2.png')}
              height={Math.floor(screenHeight - 60)}
              width={Math.floor(screenWidth - 40)}
              resizeMode={'contain'}
            />
          </>
        )}
        <Seperator height={20} />
      </ScrollView>
    </View>
  );
}
