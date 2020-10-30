import React from 'react';
import {View} from 'react-native';
import {Container, HView, Seperator, Text} from '../../react-native-nuno-ui';

export default function TabFacilityIntroduce(props) {
  return (
    <Container>
      <View style={{padding: 20}}>
        <Text text={'시설 소개'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 1}}>
          <Text
            text={props.data.fa1Subj?.replace(/<br>/g, '\n')}
            fontSize={18}
            color={'dimgray'}
          />
        </View>
      </HView>

      <Seperator height={20} />

      <View style={{padding: 20}}>
        <Text text={'이용 수칙'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 1}}>
          <Text
            text={props.data.fa2Subj?.replace(/<br>/g, '\n')}
            fontSize={18}
            color={'dimgray'}
          />
        </View>
      </HView>

      <Seperator height={20} />

      <View style={{padding: 20}}>
        <Text text={'공지사항'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 1}}>
          <Text
            text={props.data.fa3Subj?.replace(/<br>/g, '\n')}
            fontSize={18}
            color={'dimgray'}
          />
        </View>
      </HView>
    </Container>
  );
}
