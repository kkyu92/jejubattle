import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  TextInput,
  Picker,
  DateTime,
  Checkbox,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function BattleEdit(props) {
  const [name, setName] = React.useState('');
  const [sports, setSports] = React.useState('');
  const [sportsItems, setSportsItems] = React.useState([]);
  const [region, setRegion] = React.useState('');
  const [regionItems, setRegionItems] = React.useState([]);
  const [type, setType] = React.useState('');
  const [typeItems, setTypeItems] = React.useState([]);
  const [date, setDate] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [memo, setMemo] = React.useState('');
  return (
    <Container>
      <Header left={'back'} title={'배틀등록'} navigation={props.navigation} />
      <KeyboardAwareScrollView>
        <Seperator height={20} />
        <View style={{padding: 20}}>
          <TextInput
            title={'방 이름 설정'}
            placeholder={'최대 12글자 (띄어쓰기 미포함)'}
            value={name}
            onChangeText={(e) => setName(e)}
            borderWidth={0}
          />
          <Seperator line />
          <Seperator height={30} />
          <Picker title={'스포츠 선택'} items={sportsItems} value={sports} placeholder={'선택'} borderWidth={0} />
          <Seperator line />
          <Seperator height={30} />
          <Picker title={'지역 선택'} items={regionItems} value={region} placeholder={'선택'} borderWidth={0} />
          <Seperator line />
          <Seperator height={30} />
          <Picker title={'게임유형 선택'} items={typeItems} value={type} placeholder={'선택'} borderWidth={0} />
          <Seperator line />
          <Seperator height={30} />
          <DateTime title={'날짜 선택'} value={date} placeholder={'선택'} borderWidth={0} />
          <Seperator line />
          <Seperator height={30} />
          <View>
            <Text fontSize={16} fontWeight={'500'} text={'실력 선택'} color={'dimgray'} />
            <Seperator height={20} />
            <HView style={{justifyContent: 'space-between'}}>
              <Checkbox label={'초보'} value={false} size={'large'} onPress={() => null} />
              <Checkbox label={'중수'} value={false} size={'large'} onPress={() => null} />
              <Checkbox label={'고수'} value={false} size={'large'} onPress={() => null} />
              <Checkbox label={'프로'} value={false} size={'large'} onPress={() => null} />
              <Seperator width={40} />
            </HView>
          </View>
          {/* <Seperator line /> */}
          <Seperator height={30} />
          <TextInput
            title={'비밀번호 설정'}
            placeholder={'최대 8글자 숫자만 가능'}
            value={password}
            onChangeText={(e) => setPassword(e)}
            borderWidth={0}
          />
          <Seperator line />
          <Seperator height={30} />
          <TextInput
            title={'메모'}
            placeholder={'최대 8글자 숫자만 가능'}
            value={memo}
            multiline={true}
            onChangeText={(e) => setMemo(e)}
            maxLength={50}
            showRemain={true}
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{paddingHorizontal: 20, paddingVertical: 10, borderTopColor: 'lightgray', borderTopWidth: 1}}>
        <Button
          text={'등록완료'}
          onPress={() => null}
          color={custom.themeColor}
          disable={false}
          loading={false}
          stretch
        />
        <Seperator bottom />
      </View>
    </Container>
  );
}
