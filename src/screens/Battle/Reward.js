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
} from 'react-native';
import {custom} from '../../config';
import Axios from 'axios';
import {logApi, showToast} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';

export default function Reward(props) {
  const context = React.useContext(AppContext);
  const [reward, setReward] = React.useState();
  const [selectedRandomBox, setSelectedRandomBox] = React.useState(0);
  const [randomBox, setRandomBox] = React.useState();

  const getReward = () => {
    Axios.get(`rewardCheck/${props.baPk}`)
      .then((res) => {
        logApi('rewardCheck', res.data);
        setReward(res.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          logApi('rewardCheck 403', err.response.data);
          // props.closeModal();
          showToast(err.response.data.message, 2000, 'center');
        } else {
          logApi('rewardCheck error', err.response);
        }
      });
  };
  const getRandomBox = () => {
    Axios.post('getRandombox', {baPk: props.baPk, code: selectedRandomBox})
      .then((res) => {
        logApi('getRandombox', res.data);
        setRandomBox(res.data);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          logApi('getRandombox 403', err.response.data);
          setRandomBox(err.response.data);
        } else {
          logApi('getRandombox error', err.response);
        }
      });
  };
  let component = null;
  // getReward로 응답이 있을때
  if (reward) {
    // getRandomBox 로 응답이 있을때
    if (randomBox) {
      if (randomBox.rcName) {
        component = (
          <View style={{alignItems: 'center'}}>
            <Image
              uri={randomBox.rcImgUrl}
              height={70}
              width={70}
              borderRadius={35}
              resizeMode={'cover'}
            />
            <Seperator height={30} />
            <Text
              fontSize={16}
              color={'black'}
              style={{textAlign: 'center'}}
              text={randomBox.rcName}
            />
            <Seperator height={30} />
            <Button
              text={'확인'}
              color={custom.themeColor}
              onPress={props.closeModal}
              size={'large'}
              stretch
            />
          </View>
        );
      } else {
        component = (
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={16}
              color={'black'}
              style={{textAlign: 'center'}}
              text={randomBox.message}
            />
            <Seperator height={30} />
            <Button
              text={'확인'}
              color={custom.themeColor}
              onPress={props.closeModal}
              size={'large'}
              stretch
            />
          </View>
        );
      }
    } else {
      if (reward.coinType === 'N') {
        component = (
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={16}
              color={'black'}
              style={{textAlign: 'center'}}
              text={reward.reward.rcName}
            />
            <Seperator height={30} />
            <Button
              text={'확인'}
              color={custom.themeColor}
              onPress={props.closeModal}
              size={'large'}
              stretch
            />
          </View>
        );
      } else if (reward.coinType === 'Y') {
        component = (
          <View style={{alignItems: 'center'}}>
            <Text
              fontSize={18}
              fontWeight={'bold'}
              color={'black'}
              style={{textAlign: 'center'}}
              text={
                props.result === 'win'
                  ? '승리를 축하합니다!\n원하시는 배틀박스를 선택해주세요.'
                  : '다음엔 꼭 이길 수 있어요!\n원하시는 배틀박스를 선택해주세요.'
              }
            />
            <Seperator height={30} />
            <HView style={{flexWrap: 'wrap'}}>
              {reward.randombox.map((e, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedRandomBox(e.code);
                      showToast(
                        e.name + '보상을 선택했습니다.',
                        2000,
                        'bottom',
                      );
                    }}
                    key={i}
                    style={{alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor:
                          selectedRandomBox - 1 === i ? 'orange' : 'lightgray',
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        local
                        // uri={e.imgUrl}
                        uri={require('../../../assets/img/icon_synthesis.png')}
                        height={60}
                        width={60}
                        borderRadius={30}
                        resizeMode={'cover'}
                      />
                    </View>
                    <Text text={e.name} fontSize={16} />
                  </TouchableOpacity>
                );
              })}
            </HView>
            <Seperator height={30} />
            <Button
              text={'선택완료'}
              color={custom.themeColor}
              onPress={() =>
                selectedRandomBox === 0
                  ? showToast('보상박스를 선택해주세요.', 2000, 'bottom')
                  : getRandomBox()
              }
              size={'large'}
              stretch
            />
          </View>
        );
      }
    }
  } else {
    component =
      props.coinType === 'Y' ? (
        <View style={{alignItems: 'center'}}>
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'black'}
            style={{textAlign: 'center'}}
            text={
              '배틀에 앞서 코인을 사용하셨습니다. 지금 보상을 받으시겠어요?'
            }
          />
          <Seperator height={30} />
          <Text
            fontSize={16}
            color={'dimgray'}
            text={
              '아니오를 누르시면 [나의 배틀]에서 다시 선택하실 수 있습니다.\n\n(단, 오늘부터 1주일 이내에 다시 해야합니다.)'
            }
            style={{textAlign: 'center'}}
          />
          <Seperator height={30} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'아니요'}
                color={'gray'}
                onPress={props.closeModal}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'예'}
                color={custom.themeColor}
                onPress={() => getReward()}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      ) : (
        getReward()
      );
  }
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
      }}>
      {component}
    </View>
  );
}
