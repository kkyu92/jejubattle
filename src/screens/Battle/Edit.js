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
import moment from 'moment';
import {custom} from '../../config';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {AppContext} from '../../context';

export default function BattleEdit(props) {
  const context = React.useContext(AppContext);
  const [name, setName] = React.useState('');
  const [sports, setSports] = React.useState('');
  const [sportsItems, setSportsItems] = React.useState([]);
  const [region, setRegion] = React.useState('');
  const [regionItems, setRegionItems] = React.useState([]);
  const [type, setType] = React.useState('');
  const [typeItems, setTypeItems] = React.useState([]);
  const [level, setLevel] = React.useState('');
  const [levelItems, setLevelItems] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [password, setPassword] = React.useState('');
  const [memo, setMemo] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    Axios.get('getBattleEtc')
      .then((res) => {
        logApi('getBattleEtc', res.data);
        let temp = {...res.data};
        temp.bcCode.splice(0, 0, {code: '', name: '선택해주세요'});
        temp.bzCode.splice(0, 0, {code: '', name: '선택해주세요'});
        temp.btCode.splice(0, 0, {code: '', name: '선택해주세요'});
        setSportsItems(temp.bcCode);
        setRegionItems(res.data.bzCode);
        setTypeItems(res.data.btCode);
        setLevelItems(res.data.blCode);
      })
      .catch((err) => {
        logApi('getBattleEtc error', err.response);
      });
  }, []);
  const save = () => {
    setLoading(true);
    Axios.post('insertBattle', {
      baSubject: name,
      baPwd: password,
      bcCode: sports,
      bzCode: region,
      btCode: type,
      blCode: level,
      baDate: moment(date).format('YYYY-MM-DD'),
      baContent: memo,
      teamA: {
        name: '',
        member: [{userPk: context.me.userPk}],
      },
      teamB: {
        name: '',
        member: [],
      },
    })
      .then((res) => {
        logApi('InsertBattle', res.data);
        setLoading(false);
        props.route?.params?.refresh();
        props.navigation.goBack();
      })
      .catch((err) => {
        logApi('InsertBattle error', err.response);
        setLoading(false);
      });
  };
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
            maxLength={12}
            onChangeText={(e) => setName(e)}
            borderWidth={0}
          />
          <Seperator line />
          <Seperator height={30} />
          <Picker
            title={'스포츠 선택'}
            items={sportsItems}
            value={sports}
            onChange={(e) => setSports(e)}
            placeholder={'선택해 주세요'}
            borderWidth={0}
            closeBar
          />
          <Seperator line />
          <Seperator height={30} />
          <Picker
            title={'지역 선택'}
            items={regionItems}
            value={region}
            onChange={(e) => setRegion(e)}
            placeholder={'선택해 주세요'}
            borderWidth={0}
            closeBar
          />
          <Seperator line />
          <Seperator height={30} />
          <Picker
            title={'게임유형 선택'}
            items={typeItems}
            value={type}
            onChange={(e) => setType(e)}
            placeholder={'선택해 주세요'}
            borderWidth={0}
            closeBar
          />
          <Seperator line />
          <Seperator height={30} />
          <DateTime
            title={'날짜 선택'}
            value={date}
            placeholder={'선택해 주세요'}
            borderWidth={0}
            onChange={(e) => setDate(e)}
          />
          <Seperator line />
          <Seperator height={30} />
          <View>
            <Text
              fontSize={16}
              fontWeight={'500'}
              text={'실력 선택'}
              color={'dimgray'}
            />
            <Seperator height={20} />
            <HView style={{justifyContent: 'space-between'}}>
              {levelItems.map((e, i) => {
                return (
                  <Checkbox
                    key={i}
                    label={e.name}
                    checked={level === e.code}
                    // size={'large'}
                    onPress={() => setLevel(e.code)}
                  />
                );
              })}
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
            maxLength={250}
            showRemain={true}
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        <Button
          text={'등록완료'}
          onPress={save}
          color={custom.themeColor}
          disable={!name || !sports || !region || !type || !date || !level}
          loading={loading}
          size={'large'}
          stretch
        />
        <Seperator bottom />
      </View>
    </Container>
  );
}
