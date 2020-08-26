import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  Image,
  Checkbox,
  Modal,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {custom} from '../../config';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {sports1Table} from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../styles';
import StarRating from 'react-native-star-rating';
import MySports from '../../commons/MySports';
import Icons from '../../commons/Icons';

export default function BattleMemberReport(props) {
  const context = React.useContext(AppContext);
  const [member, setMember] = React.useState([
    ...props.route.params.info.teamA.member,
    ...props.route.params.info.teamB.member,
    ...props.route.params.info.history,
  ]);

  React.useEffect(() => {}, []);
  return (
    <Container>
      <Header left={'close'} title={'신고하기'} navigation={props.navigation} />
      <ScrollView>
        <View style={{padding: 20}}>
          <HView style={{flexWrap: 'wrap', justifyContent: 'flex-start'}}>
            {member.map((e, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() =>
                    props.navigation.navigate('Report', {
                      type: 1,
                      userPk: e.userPk,
                      userName: e.userName,
                      userImgUrl: e.userImgUrl,
                    })
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: 'whitesmoke',
                    padding: 12,
                    borderRadius: 5,
                    marginRight: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    text={e.userName}
                    fontSize={14}
                    fontWeight={'500'}
                    color={'dimgray'}
                  />
                </TouchableOpacity>
              );
            })}
          </HView>
        </View>
      </ScrollView>
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: 'lightgray',
        }}>
        <View style={{flex: 1}}>
          <Button
            text={'취소'}
            color={'gray'}
            onPress={() => {
              props.navigation.goBack();
            }}
            size={'large'}
            stretch
          />
        </View>
        <Seperator width={20} />
        <View style={{flex: 1}}>
          <Button
            text={'완료'}
            color={custom.themeColor}
            onPress={() => null}
            size={'large'}
            stretch
          />
        </View>
      </HView>
      <Seperator bottom />
    </Container>
  );
}