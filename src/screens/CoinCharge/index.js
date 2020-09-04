import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  Modal,
  Button,
  TextInput,
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, Platform, Alert} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {AppContext} from '../../context';
import * as RNIap from 'react-native-iap';

export default function CoinCharge(props) {
  const context = React.useContext(AppContext);
  const [showPurchaseModal, setShowPurchaseModal] = React.useState(false);
  const [modalIcon, setModalIcon] = React.useState();
  const [modalContent, setModalContent] = React.useState();
  const [product, setProduct] = React.useState();
  React.useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const itemSkus = Platform.select({
      ios: [
        'com.jejubattle.battlecoin1200',
        'com.jejubattle.battlecoin6000',
        'com.jejubattle.battlecoin11000',
      ],
      android: [
        'com.jejubattle.battlecoin1200',
        'com.jejubattle.battlecoin6000',
        'com.jejubattle.battlecoin11000',
      ],
    });
    try {
      const prod = await RNIap.getProducts(itemSkus);
      setProduct(prod);
    } catch (err) {
      console.log('purchase error', err);
    }
    // Alert.alert('product', JSON.stringify(prod));
  };
  const purchase = async (sku) => {
    try {
      await RNIap.requestPurchase(sku, false);
    } catch (err) {
      console.log('purchase error', err);
    }
  };
  return (
    <Container>
      <Header
        left={'close'}
        rightComponent={
          <TouchableOpacity
            onPress={() => props.navigation.navigate('PurchaseHistory')}
            style={{paddingHorizontal: 20, paddingVertical: 5}}>
            <Text
              text={'구매내역'}
              fontSize={16}
              fontWeight={'500'}
              color={'dimgray'}
            />
          </TouchableOpacity>
        }
        title={'코인충전소'}
        navigation={props.navigation}
      />
      <ScrollView>
        {/* <Seperator height={20} /> */}
        <View style={{padding: 20}}>
          <Text
            text={'현재 내 코인&포인트'}
            fontSize={18}
            fontWeight={'bold'}
          />
        </View>
        <HView style={{paddingHorizontal: 20}}>
          <HView style={{flex: 0.5, padding: 10, alignItems: 'center'}}>
            <Image
              local
              uri={require('../../../assets/img/icon-coinmoney.png')}
              height={32}
              width={32}
              resizeMode={'cover'}
            />
            <Seperator width={10} />
            <Text
              text={`배틀코인 ${context.me.userCoin}개`}
              fontSize={13}
              color={'dimgray'}
            />
          </HView>
          <HView style={{flex: 0.5, padding: 20, alignItems: 'center'}}>
            <Image
              local
              uri={require('../../../assets/img/icon-pointmoney.png')}
              height={32}
              width={32}
              resizeMode={'cover'}
            />
            <Seperator width={10} />
            <Text
              text={`배틀포인트 ${context.me.userPoint}개`}
              fontSize={13}
              color={'dimgray'}
            />
          </HView>
        </HView>

        <Seperator height={10} />

        <View style={{padding: 20}}>
          <Text text={'유료 구매하기'} fontSize={18} fontWeight={'bold'} />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => {
              setModalIcon(
                <Image
                  local
                  uri={require('../../../assets/img/icon-coinmoney.png')}
                  height={70}
                  width={70}
                  resizeMode={'cover'}
                />,
              );
              setModalContent(
                <View>
                  <HView>
                    <Text text={'배틀코인 '} fontSize={18} />
                    <Text text={'1개'} fontSize={18} fontWeight={'bold'} />
                  </HView>
                  <Seperator height={6} />
                  <View>
                    <Text text={'1,200 원'} fontSize={23} />
                  </View>
                </View>,
              );
              setShowPurchaseModal(true);
            }}>
            <HView style={{padding: 10}}>
              <Image
                local
                uri={require('../../../assets/img/icon-coinmoney.png')}
                height={40}
                width={40}
                resizeMode={'cover'}
              />
              <Seperator width={20} />
              <View>
                <HView>
                  <Text text={'배틀코인 '} fontSize={18} />
                  <Text text={'1개'} fontSize={18} fontWeight={'bold'} />
                </HView>
                <Seperator height={6} />
                <HView style={{alignItems: 'flex-end'}}>
                  <Text text={'1,200 원'} fontSize={23} />
                </HView>
              </View>
            </HView>
          </TouchableOpacity>
          <Seperator line />
          <TouchableOpacity
            onPress={() => {
              setModalIcon(
                <Image
                  local
                  uri={require('../../../assets/img/icon-fivecoins.png')}
                  height={70}
                  width={70}
                  resizeMode={'cover'}
                />,
              );
              setModalContent(
                <View>
                  <HView>
                    <Text text={'배틀코인 '} fontSize={18} />
                    <Text text={'5개'} fontSize={18} fontWeight={'bold'} />
                  </HView>
                  <Seperator height={6} />
                  <View>
                    <Text text={'6,000 원'} fontSize={23} />
                  </View>
                </View>,
              );
              setShowPurchaseModal(true);
            }}>
            <HView style={{padding: 10}}>
              <Image
                local
                uri={require('../../../assets/img/icon-fivecoins.png')}
                height={40}
                width={40}
                resizeMode={'cover'}
              />
              <Seperator width={20} />
              <View>
                <HView>
                  <Text text={'배틀코인 '} fontSize={18} />
                  <Text text={'5개'} fontSize={18} fontWeight={'bold'} />
                </HView>
                <Seperator height={6} />
                <HView style={{alignItems: 'flex-end'}}>
                  <Text text={'6,000 원'} fontSize={23} />
                </HView>
              </View>
            </HView>
          </TouchableOpacity>
          <Seperator line />
          <TouchableOpacity
            onPress={() => {
              setModalIcon(
                <Image
                  local
                  uri={require('../../../assets/img/icon-tencoins.png')}
                  height={70}
                  width={70}
                  resizeMode={'cover'}
                />,
              );
              setModalContent(
                <View style={{alignItems: 'center'}}>
                  <HView>
                    <Text text={'배틀코인 '} fontSize={18} />
                    <Text text={'10개'} fontSize={18} fontWeight={'bold'} />
                  </HView>
                  <Seperator height={6} />
                  <HView>
                    <Text
                      text={'12,000 원'}
                      fontSize={23}
                      color={'darkgray'}
                      style={{textDecorationLine: 'line-through'}}
                    />
                    <Seperator width={10} />
                    <Text text={'11,000 원'} fontSize={23} />
                    <Seperator width={10} />
                    <Text text={'-10%'} fontSize={20} color={'red'} />
                  </HView>
                </View>,
              );
              setShowPurchaseModal(true);
            }}>
            <HView style={{padding: 10}}>
              <Image
                local
                uri={require('../../../assets/img/icon-tencoins.png')}
                height={40}
                width={40}
                resizeMode={'cover'}
              />
              <Seperator width={20} />
              <View>
                <HView>
                  <Text text={'배틀코인 '} fontSize={18} />
                  <Text text={'10개'} fontSize={18} fontWeight={'bold'} />
                </HView>
                <Seperator height={6} />
                <HView style={{alignItems: 'flex-end'}}>
                  <Text
                    text={'12,000 원'}
                    fontSize={23}
                    color={'darkgray'}
                    style={{textDecorationLine: 'line-through'}}
                  />
                  <Seperator width={10} />
                  <Text text={'11,000 원'} fontSize={23} />
                  <Seperator width={10} />
                  <Text text={'-10%'} fontSize={20} color={'red'} />
                </HView>
              </View>
            </HView>
          </TouchableOpacity>
        </View>

        <Seperator height={10} />

        <View style={{padding: 20}}>
          <Text text={'구구매하기'} fontSize={18} fontWeight={'bold'} />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => {
              setModalIcon(
                <Image
                  local
                  uri={require('../../../assets/img/icon-coinmoney.png')}
                  height={70}
                  width={70}
                  resizeMode={'cover'}
                />,
              );
              setModalContent(
                <View>
                  <HView>
                    <Text text={'배틀코인 '} fontSize={18} />
                    <Text text={'1개'} fontSize={18} fontWeight={'bold'} />
                  </HView>
                  <Seperator height={6} />
                  <View>
                    <Text text={'포인트 3개 필요'} fontSize={14} />
                  </View>
                </View>,
              );
              setShowPurchaseModal(true);
            }}>
            <HView style={{padding: 10}}>
              <Image
                local
                uri={require('../../../assets/img/icon-coinmoney.png')}
                height={40}
                width={40}
                resizeMode={'cover'}
              />
              <Seperator width={20} />
              <View>
                <HView>
                  <Text text={'배틀코인 '} fontSize={18} />
                  <Text text={'1개'} fontSize={18} fontWeight={'bold'} />
                </HView>
                <Seperator height={6} />
                <HView style={{alignItems: 'flex-end'}}>
                  <Text text={'포인트 3개 필요'} fontSize={14} />
                </HView>
              </View>
            </HView>
          </TouchableOpacity>
          <Seperator line />
          <TouchableOpacity
            onPress={() => {
              setModalIcon(
                <Image
                  local
                  uri={require('../../../assets/img/icon-fivecoins.png')}
                  height={70}
                  width={70}
                  resizeMode={'cover'}
                />,
              );
              setModalContent(
                <View>
                  <HView>
                    <Text text={'배틀코인 '} fontSize={18} />
                    <Text text={'5개'} fontSize={18} fontWeight={'bold'} />
                  </HView>
                  <Seperator height={6} />
                  <View>
                    <Text text={'포인트 15개 필요'} fontSize={14} />
                  </View>
                </View>,
              );
              setShowPurchaseModal(true);
            }}>
            <HView style={{padding: 10}}>
              <Image
                local
                uri={require('../../../assets/img/icon-fivecoins.png')}
                height={40}
                width={40}
                resizeMode={'cover'}
              />
              <Seperator width={20} />
              <View>
                <HView>
                  <Text text={'배틀코인 '} fontSize={18} />
                  <Text text={'5개'} fontSize={18} fontWeight={'bold'} />
                </HView>
                <Seperator height={6} />
                <HView style={{alignItems: 'flex-end'}}>
                  <Text text={'포인트 15개 필요'} fontSize={14} />
                </HView>
              </View>
            </HView>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        isVisible={showPurchaseModal}
        onBackdropPress={() => setShowPurchaseModal(false)}
        onModalHide={() => console.log('modal hide')}>
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text
            fontSize={18}
            fontWeight={'bold'}
            color={'black'}
            text={'코인구매'}
          />
          <Seperator height={30} />
          {modalIcon}
          <Seperator height={30} />
          {modalContent}
          <Seperator height={30} />
          <HView>
            <View style={{flex: 1}}>
              <Button
                text={'아니오'}
                color={'gray'}
                onPress={() => {
                  setShowPurchaseModal(false);
                }}
                size={'large'}
                stretch
              />
            </View>
            <Seperator width={20} />
            <View style={{flex: 1}}>
              <Button
                text={'예'}
                color={custom.themeColor}
                onPress={() => null}
                size={'large'}
                stretch
              />
            </View>
          </HView>
        </View>
      </Modal>
    </Container>
  );
}
