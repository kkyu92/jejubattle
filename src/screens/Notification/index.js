import React from 'react';
import {Container, Header, Text, Image, HView, Seperator} from '../../react-native-nuno-ui';
import {View, ScrollView} from 'react-native';
import Icons from '../../commons/Icons';

export default function Notification(props) {
  return (
    <Container>
      <Header left={'close'} navigation={props.navigation} title={'알림'} />
      <ScrollView>
        <View style={{padding: 20}}>
          <Text fontWeight={'bold'} fontSize={18} text={'06.03 (수)'} />
        </View>
        <HView style={{paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'rgba(244, 161, 0, 0.3)'}}>
          <Image
            height={52}
            width={52}
            borderRadius={4}
            uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
            onPress={() => null}
            resizeMode={'cover'}
          />
          <Seperator width={10} />
          <View style={{flex: 1}}>
            <Text
              fontWeight={'bold'}
              fontSize={14}
              text={
                '스포츠배틀방이름의 모든 인원이 배틀 준비가 되었습니다. 배틀을 시작하세요!'
              }
            />
            <Seperator height={5} />
            <Text color={'gray'} fontSize={12} text={'1시간 전'} />
          </View>
        </HView>
        <Seperator marginTop={10} marginBottom={10} line />
        <HView style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Image
            height={52}
            width={52}
            borderRadius={4}
            uri={'https://homepages.cae.wisc.edu/~ece533/images/airplane.png'}
            onPress={() => null}
            resizeMode={'cover'}
          />
          <Seperator width={10} />
          <View style={{flex: 1}}>
            <Text
              fontWeight={'bold'}
              fontSize={14}
              text={
                '스포츠배틀방이름의 모든 인원이 배틀 준비가 되었습니다. 배틀을 시작하세요!'
              }
            />
            <Seperator height={5} />
            <Text color={'gray'} fontSize={12} text={'1시간 전'} />
          </View>
        </HView>
      </ScrollView>
    </Container>
  );
}
