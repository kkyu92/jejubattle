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
} from '../../react-native-nuno-ui';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import {AppContext} from '../../context';
import RNIap, {
  InAppPurchase,
  SubscriptionPurchase,
  ProductPurchase,
  PurchaseError,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
  consumeAllItemsAndroid,
} from 'react-native-iap';
import Axios from 'axios';
import {logApi, showToast} from '../../react-native-nuno-ui/funcs';

export default function CoinCharge(props) {
  const context = React.useContext(AppContext);
  const [showPurchaseModal, setShowPurchaseModal] = React.useState(false);
  const [modalIcon, setModalIcon] = React.useState();
  const [modalContent, setModalContent] = React.useState();
  const [usePoint, setUsePoint] = React.useState();
  const [coinCount, setCoinCount] = React.useState();
  const [product, setProduct] = React.useState([]);

  let purchaseUpdateSubscription;
  let purchaseErrorSubscription;
  // var purchaseUpdateSubscription;
  // var purchaseErrorSubscription;
  // const loadIAPListeners = () => {
  //   initConnection(); // important, or else it won't trigger before a random state change
  //   purchaseUpdateSubscription = purchaseUpdatedListener(
  //     async (
  //       purchase: InAppPurchase | SubscriptionPurchase | ProductPurchase,
  //     ) => {
  //       console.log('purchaseUpdatedListener', purchase);
  //       let receipt = purchase.transactionReceipt;
  //       if (receipt) {
  //         if (Platform.OS === 'ios') {
  //           await RNIap.finishTransactionIOS(purchase.transactionId);
  //         } else if (Platform.OS === 'android') {
  //           await RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
  //         }
  //         await RNIap.finishTransaction(purchase, true);
  //         await RNIap.finishTransaction(purchase, false);
  //       } else {
  //         // Retry / conclude the purchase is fraudulent, etc...
  //       }
  //     },
  //   );
  //   purchaseErrorSubscription = purchaseErrorListener(
  //     (error: PurchaseError) => {
  //       console.log('purchaseErrorListener', error);
  //     },
  //   );
  // };

  React.useEffect(() => {
    fetchProducts();
    // loadIAPListeners();
    purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            if (Platform.OS === 'ios') {
              // 4.1.0 이상부터 두 플랫폼 모두 동작 가능
              await finishTransactionIOS(purchase.transactionId);
            } else if (Platform.OS === 'android') {
              // If consumable (can be purchased again)
              await consumePurchaseAndroid(purchase.purchaseToken);
              // If not consumable
              // await acknowledgePurchaseAndroid(purchase.purchaseToken);
            }
            const ackResult = await finishTransaction(purchase);
            console.log(ackResult);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }
          addCoin(false);
          setShowPurchaseModal(false);
          console.log('Receipt : ' + receipt);
        }
      },
    );

    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        if (error.code !== 'E_USER_CANCELLED') {
          Alert.alert('purchase error', JSON.stringify(error));
        }
      },
    );

    return () => {
      // purchaseUpdateSubscription.remove();
      // purchaseErrorSubscription.remove();
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }
      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }
      RNIap.endConnection();
    };
  }, []);

  const fetchProducts = async () => {
    console.log('fetch');
    try {
      const result = await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      console.log('result', result);

      const itemSkus = Platform.select({
        ios: ['1', '2', '3'],
        android: ['battlecoin1200', 'battlecoin6000', 'battlecoin11000'],
      });
      let prod = [];
      prod = await RNIap.getProducts(itemSkus);
      setProduct(prod);
      Alert.alert('product', JSON.stringify(prod));
    } catch (err) {
      console.log('product error', err);
    }
  };
  const purchase = async (sku) => {
    try {
      console.log('coin count : ' + coinCount + '\n' + sku.productId);
      await RNIap.requestPurchase(sku.productId, false);
    } catch (err) {
      setShowPurchaseModal(false);
      console.log('purchase error', err.code);
      if (err.code === 'E_USER_CANCELLED') {
        showToast('구매를 취소했습니다.', 2000, 'center');
      } else {
        Alert.alert(err.code, err.message);
      }
    }
  };
  const addCoin = (usePoint) => {
    if (usePoint) {
      let coinType = coinCount === 5 ? 2 : 1;
      Axios.post('pointBuy', {pointType: coinType})
        .then((res) => {
          logApi('pointBuy', res.data);
          context.me.userCoin += coinCount;
          context.me.userPoint -= coinCount * 3;
          context.dispatch({
            type: 'UPDATEME',
            data: {
              userCoin: context.me.userCoin,
              userPoint: context.me.userPoint,
            },
          });
          console.log('coin : ' + context.me.userCoin);
          console.log('point : ' + context.me.userPoint);
          showToast('코인 ' + coinCount + '개를 충전했습니다.', 2000, 'center');
        })
        .catch((err) => {
          if (err.response.status === 403) {
            logApi('pointBuy 403', err.response.data);
            showToast(err.response.data.message, 2000, 'center');
          } else {
            logApi('pointBuy error', err.response);
          }
        });
      setShowPurchaseModal(false);
    } else {
      Axios.post('coinBuy', {coin: coinCount})
        .then((res) => {
          logApi('coinBuy', res.data);
          context.dispatch({
            type: 'UPDATEME',
            data: {
              userCoin: context.me.userCoin + coinCount,
            },
          });
          showToast('코인 ' + coinCount + '개를 충전했습니다.', 2000, 'center');
        })
        .catch((err) => {
          if (err.response.status === 403) {
            logApi('coinBuy 403', err.response.data);
            showToast(err.response.data.message, 2000, 'center');
          } else {
            logApi('coinBuy error', err.response);
          }
        });
    }
  };
  return (
    <Container>
      <Header
        left={'close'}
        rightComponent={
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('PurchaseHistory')}
            onPress={() =>
              Platform.OS === 'android'
                ? Linking.openURL(
                    'https://play.google.com/store/account/orderhistory?hl=ko&gl=US',
                  )
                : Linking.openURL('itms-apps://apps.apple.com/today')
            }
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
              setUsePoint(false);
              setCoinCount(1);
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
              setUsePoint(false);
              setCoinCount(5);
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
              setUsePoint(false);
              setCoinCount(10);
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
          <Text text={'포인트로 구매하기'} fontSize={18} fontWeight={'bold'} />
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
              setUsePoint(true);
              setCoinCount(1);
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
              setUsePoint(true);
              setCoinCount(5);
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
                onPress={() => {
                  usePoint === true
                    ? addCoin(true)
                    : purchase(
                        Platform.OS === 'ios'
                          ? product[
                              coinCount === 1 ? 0 : coinCount === 5 ? 1 : 2
                            ]
                          : product[
                              coinCount === 1 ? 1 : coinCount === 5 ? 2 : 0
                            ],
                      );
                }}
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
