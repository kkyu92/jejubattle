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
  Loader,
} from '../../react-native-nuno-ui';
import {
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import {custom} from '../../config';
import Axios from 'axios';
import {logApi, showToast, sleep} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {sports1Table} from '../../constants';
import {screenWidth} from '../../styles';
import StarRating from 'react-native-star-rating';
import deviceInfoModule from 'react-native-device-info';
import Geolocation from 'react-native-geolocation-service';

export default function Evaluation(props) {
  const context = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(false);
  const [getBaCode] = React.useState(props.route.params.info.baCode);
  const [gameResult, setGameResult] = React.useState(0);
  const [timeScope, setTimeScope] = React.useState(0);
  const [playScope, setPlayScope] = React.useState(0);
  const [modalWating, setModalWaiting] = React.useState(false);
  const [modalMsg, setModalMsg] = React.useState('');
  const [evTarget] = React.useState(
    props.route.params.info.teamA.member.filter(
      (e) => e.userPk === context.me.userPk,
    ).length === 0
      ? props.route.params.info.teamA
      : props.route.params.info.teamB,
  );

  const [showPopupModal, setShowPopupModal] = React.useState(false);

  React.useEffect(() => {
    if (getBaCode === 4) {
      props.navigation.goBack();
      console.log('goBack, baCode = ' + getBaCode);
    }
    console.log('useEffect ;;; ' + getBaCode);
  }, [props.route?.params?.info, getBaCode]);

  const getCurrentCoords = async () => {
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
          async (error) => {
            setLoading(false);
            await setShowPopupModal(true);
            console.log('getCurrentPosition1 error', error.code, error.message);
            reject(error);
          },
          {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
        );
      }
    });
  };

  const complete = async () => {
    setLoading(true);
    console.log(`setLoading(true)`);
    const team =
      props.route.params.info.teamA.member.filter(
        (e) => e.userPk === context.me.userPk,
      ).length === 0
        ? 'teamA'
        : 'teamB';
    const coords = await getCurrentCoords();
    console.log(
      `resultBattle > getCurrentCoords > lat : ${coords.latitude} || lon : ${coords.longitude}`,
    );
    await Axios.post('resultBattle', {
      baPk: props.route.params.info.baPk,
      [team]: {
        gameResult: gameResult,
        timeScope: timeScope,
        playScope: playScope,
        lat: coords.latitude,
        lon: coords.longitude,
      },
    })
      .then((res) => {
        logApi('resultBattle ', res);
        console.log(res.data.message);
        if (res.status === 201) {
          if (
            res.data.message ===
            '상대방의 배틀 평가 및 완료를 기다리고 있습니다.'
          ) {
            props.navigation.goBack();
            showToast('상대방의 배틀평가를 기다리고 있습니다.', 2000, 'center');
          } else {
            setModalMsg(res.data.message);
            setModalWaiting(true);
            setLoading(false);
          }
        } else {
          props.route.params.socket.send(
            `/battle/${props.route.params.info.baPk}`,
            {},
            JSON.stringify({
              baCode: 4,
            }),
          );
          props.navigation.goBack();
          showToast('평가를 완료했습니다.', 2000, 'center');
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          // props.navigation.goBack();
        } else {
          logApi('resultBattle error', err.response);
        }
        setLoading(false);
      });
    console.log(`setLoading(false)`);
  };
  let userProfileComponent = null;
  if (evTarget.name === '') {
    if (evTarget?.member[0]?.userImgUrl) {
      userProfileComponent = (
        <View style={{alignItems: 'center'}}>
          <Image
            uri={evTarget.member[0].userImgUrl}
            width={72}
            height={72}
            borderRadius={36}
          />
          <Seperator height={10} />
          <Text
            text={evTarget.member[0].userName}
            fontSize={16}
            fontWeight={'bold'}
          />
        </View>
      );
    } else {
      userProfileComponent = (
        <View style={{alignItems: 'center'}}>
          <Image
            local
            uri={require('../../../assets/img/user_boy.png')}
            width={72}
            height={72}
            borderRadius={36}
          />
          <Seperator height={10} />
          <Text
            text={evTarget.member[0].userName}
            fontSize={16}
            fontWeight={'bold'}
          />
        </View>
      );
    }
  }

  return (
    <Container>
      <Header
        left={'close'}
        title={'상대방 평가하기'}
        navigation={props.navigation}
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <Seperator height={20} />

          {userProfileComponent}

          <Seperator height={20} />

          <Text
            text={'1. 상대방이 시간 약속을 잘 지켰나요?'}
            fontSize={16}
            color={'dimgray'}
          />
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={timeScope}
              starSize={40}
              emptyStarColor={'gray'}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
              selectedStar={(e) => setTimeScope(e)}
            />
          </View>
          <Seperator height={20} />
          <Text
            text={'2. 상대방이 매너있게 플레이 했나요?'}
            fontSize={16}
            color={'dimgray'}
          />
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={playScope}
              starSize={40}
              emptyStarColor={'gray'}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
              selectedStar={(e) => setPlayScope(e)}
            />
          </View>
          <View style={{padding: 20}}>
            <HView style={{justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={() => setGameResult(1)}>
                {(gameResult === 0 || gameResult === 2) && (
                  <Image
                    local
                    uri={require('../../../assets/img/icon-win-unslected.png')}
                    width={100}
                    height={100}
                  />
                )}
                {gameResult === 1 && (
                  <Image
                    local
                    uri={require('../../../assets/img/icon-win-slected.png')}
                    width={100}
                    height={100}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGameResult(2)}>
                {(gameResult === 0 || gameResult === 1) && (
                  <Image
                    local
                    uri={require('../../../assets/img/icon-lose-unslected.png')}
                    width={100}
                    height={100}
                  />
                )}
                {gameResult === 2 && (
                  <Image
                    local
                    uri={require('../../../assets/img/icon-lose-slected.png')}
                    width={100}
                    height={100}
                  />
                )}
              </TouchableOpacity>
            </HView>
          </View>
        </View>
      </ScrollView>
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        <Button
          text={'배틀평가 및 완료'}
          onPress={() => complete()}
          color={custom.themeColor}
          disable={!timeScope || !playScope || !gameResult || loading}
          loading={loading}
          size={'large'}
          stretch
        />
      </HView>
      <Seperator bottom />
      <Modal
        isVisible={modalWating}
        onBackdropPress={() => setModalWaiting(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          {/* <Loader /> */}
          <Seperator height={20} />
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'black'}
            style={{textAlign: 'center'}}
            text={modalMsg}
          />
          <Seperator height={40} />
          <Button
            text={'닫기'}
            size={'large'}
            onPress={() => setModalWaiting(false)}
            stretch
            color={custom.themeColor}
          />
        </View>
      </Modal>

      <Modal
        isVisible={showPopupModal}
        onBackdropPress={() => setShowPopupModal(false)}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            // alignItems: 'center',
          }}>
          <View style={{alignItems: 'center', paddingVertical: 10}}>
            <Text
              text={'위치권한을 확인해주세요.'}
              fontSize={18}
              fontWeight={'bold'}
            />
          </View>
          <Seperator height={20} />
          <HView
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 20,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Button
                paddingVertical={20}
                text={'설정'}
                color={'gray'}
                onPress={async () => {
                  await setShowPopupModal(false);
                  await sleep(100);
                  await Linking.openSettings();
                }}
                size={'middle'}
                stretch
              />
            </View>
            <Seperator width={10} />
            <View style={{flex: 1, alignItems: 'center'}}>
              <Button
                paddingVertical={20}
                text={'닫기'}
                color={custom.themeColor}
                onPress={() => {
                  setShowPopupModal(false);
                }}
                size={'middle'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
