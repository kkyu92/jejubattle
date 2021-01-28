import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  Button,
  Modal,
} from '../../react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Icons from '../../commons/Icons';
import StarRating from 'react-native-star-rating';
import {custom} from '../../config';
import {AppContext} from '../../context';
import MySports from '../../commons/MySports';
import Axios from 'axios';
import {logApi} from '../../react-native-nuno-ui/funcs';

export default function MyInfo(props) {
  const context = React.useContext(AppContext);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [totalMatch, setTotalMatch] = React.useState('');
  const [totalWin, setTotalWin] = React.useState('');
  const [totalLose, setTotalLose] = React.useState('');
  const [totalWinRate, setTotalWinRate] = React.useState('');
  const [detailList, setDetailList] = React.useState([]);

  React.useEffect(() => {
    Axios.get('getScore')
      .then(async (res) => {
        logApi('getScore', res.data);
        setTotalMatch(res.data.ago);
        setTotalWin(res.data.win);
        setTotalLose(res.data.lose);
        setTotalWinRate(res.data.winrate);
        setDetailList(res.data.detail);
      })
      .catch((err) => {
        // setLoading(false);
        logApi('getScore error', err?.response);
      });
  }, []);

  return (
    <Container>
      <Header left={'close'} navigation={props.navigation} title={'내정보'} />
      <ScrollView>
        <View
          style={{
            backgroundColor: 'rgba(242, 243, 246, 1)',
            alignItems: 'center',
            padding: 30,
          }}>
          {context.me.userImgUrl ? (
            <Image
              uri={context.me.userImgUrl}
              width={68}
              height={68}
              borderRadius={34}
            />
          ) : (
            <Image
              local
              uri={require('../../../assets/img/img-user2.png')}
              width={68}
              height={68}
              borderRadius={34}
            />
          )}
          <Seperator height={10} />
          <StarRating
            disabled={true}
            maxStars={5}
            rating={5}
            starSize={11}
            emptyStarColor={custom.themeColor}
            halfStarEnabled={true}
            halfStarColor={custom.themeColor}
            fullStarColor={custom.themeColor}
          />
          <Seperator height={10} />
          <Text text={context.me.userName} fontWeight={'bold'} fontSize={21} />
          <Seperator height={10} />
          <MySports userSport={context.me.userSport} />
          <Seperator height={15} />
          <HView>
            <Image
              local
              uri={require('../../../assets/img/icon-coinmoney.png')}
              width={20}
              height={20}
              borderRadius={10}
            />
            <Seperator width={10} />
            <Text fontSize={13} text={`${context.me.userCoin} coin`} />
            <Seperator width={20} />
            <Image
              local
              uri={require('../../../assets/img/icon-pointmoney.png')}
              width={20}
              height={20}
              borderRadius={10}
            />
            <Seperator width={10} />
            <Text fontSize={13} text={`${context.me.userPoint} point`} />
          </HView>
        </View>
        <HView style={{padding: 50, justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{alignItems: 'center'}}>
            <Image
              local
              uri={require('../../../assets/img/icon-myscore.png')}
              width={34}
              height={44}
            />
            <Seperator height={10} />
            <Text fontSize={14} text={'전적'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('CoinCharge')}
            style={{alignItems: 'center'}}>
            <Image
              local
              uri={require('../../../assets/img/icon-coinchange.png')}
              width={44}
              height={44}
            />
            <Seperator height={10} />
            <Text fontSize={14} text={'코인충전소'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EditProfile')}
            style={{alignItems: 'center'}}>
            <Image
              local
              uri={require('../../../assets/img/icon-mypage-modify.png')}
              width={40}
              height={44}
            />
            <Seperator height={10} />
            <Text fontSize={14} text={'정보 수정'} />
          </TouchableOpacity>
        </HView>
      </ScrollView>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={{padding: 20, backgroundColor: 'white', borderRadius: 10}}>
          <View style={{alignItems: 'center'}}>
            <Text text={'전적'} fontWeight={'bold'} fontSize={18} />
          </View>
          <Seperator height={30} />
          <View style={{paddingHorizontal: 5, paddingVertical: 5}}>
            <HView>
              <View style={{flex: 0.3}}>
                <Text
                  text={'종합전적'}
                  fontSize={14}
                  fontWeight={'bold'}
                  color={'dimgray'}
                />
              </View>
              <View style={{flex: 0.7}}>
                <Text
                  text={
                    totalMatch + '전 ' + totalWin + '승 ' + totalLose + '패'
                  }
                  fontSize={14}
                  color={'dimgray'}
                />
              </View>
            </HView>
          </View>
          <View style={{paddingHorizontal: 5, paddingVertical: 5}}>
            <HView>
              <View style={{flex: 0.3}}>
                <Text
                  text={'전체승률'}
                  fontSize={14}
                  fontWeight={'bold'}
                  color={'dimgray'}
                />
              </View>
              <View style={{flex: 0.7}}>
                <Text
                  text={totalWinRate + '%'}
                  fontSize={14}
                  color={'dimgray'}
                />
              </View>
            </HView>
          </View>
          <Seperator height={30} />
          <View style={{paddingHorizontal: 5, paddingVertical: 5}}>
            <Text
              text={'세부전적'}
              fontSize={14}
              fontWeight={'bold'}
              color={'dimgray'}
            />
          </View>

          {detailList.length == 0 ? (
            <View style={{paddingHorizontal: 5, paddingVertical: 5}}>
              <HView>
                <View style={{flex: 0.3}}>
                  <Text
                    text={'전적없음'}
                    fontSize={14}
                    fontWeight={'bold'}
                    color={'dimgray'}
                  />
                </View>
                <View style={{flex: 0.7}}>
                  <Text text={'0전 0승 0패'} fontSize={14} color={'dimgray'} />
                </View>
              </HView>
            </View>
          ) : (
            detailList.map((e) => {
              return (
                <View
                  style={{paddingHorizontal: 5, paddingVertical: 5}}
                  key={e.name}>
                  <HView>
                    <View style={{flex: 0.25}}>
                      <Text
                        text={e.name}
                        fontSize={14}
                        fontWeight={'bold'}
                        color={'dimgray'}
                      />
                    </View>
                    <View style={{flex: 0.75}}>
                      <Text
                        text={
                          e.ago +
                          '전 ' +
                          e.win +
                          '승 ' +
                          e.lose +
                          '패' +
                          '    ' +
                          ((e.win / e.ago) * 100).toFixed(1) +
                          '%'
                        }
                        fontSize={14}
                        color={'dimgray'}
                      />
                    </View>
                  </HView>
                </View>
              );
            })
          )}

          <Seperator height={50} />
          <Button
            text={'확인'}
            onPress={() => setModalVisible(false)}
            color={custom.themeColor}
            stretch
            size={'large'}
          />
        </View>
      </Modal>
    </Container>
  );
}
