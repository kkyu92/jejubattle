import React from 'react';
import {
  Container,
  Header,
  Text,
  Image,
  HView,
  Seperator,
  TextInput,
  Button,
  Checkbox,
  Modal,
  ImageCarousel,
} from '../../react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TabView} from 'react-native-tab-view';
import TabTourIntroduction from './TabTourIntroduction';
import Axios from 'axios';
import {logApi, share} from '../../react-native-nuno-ui/funcs';
import TabReview from '../../commons/TabReview';
import {AppContext} from '../../context';

const initialLayout = {width: screenWidth};

export default function TravelView(props) {
  const context = React.useContext(AppContext);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: '소개'},
    {key: '2', title: '리뷰'},
  ]);
  const [facility, setFacility] = React.useState({});
  const [reply, setReply] = React.useState([]);

  React.useEffect(() => {
    get();
  }, []);
  const get = () => {
    Axios.get(`advertInfo/${props.route.params.faPk}`)
      .then((res) => {
        logApi('advertInfo', res.data);
        setFacility(res.data.facility);
        setReply(res.data.replyList);
      })
      .catch((err) => {
        logApi('advertInfo error', err.response);
      });
  };
  const renderTabBar = (tabprops) => {
    return (
      <HView
        style={{
          justifyContent: 'space-between',
          borderBottomColor: 'lightgray',
          borderBottomWidth: 1,
        }}>
        {tabprops.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'center',
                paddingVertical: 15,
                borderBottomColor: custom.themeColor,
                borderBottomWidth: index === i ? 3 : 0,
              }}
              key={i}
              onPress={() => setIndex(i)}>
              {index === i ? (
                <Text text={route.title} fontWeight={'bold'} fontSize={17} />
              ) : (
                <Text text={route.title} color={'gray'} fontSize={17} />
              )}
            </TouchableOpacity>
          );
        })}
      </HView>
    );
  };
  const renderScene = ({route}) => {
    switch (route.key) {
      case '1':
        return (
          <TabTourIntroduction navigation={props.navigation} data={facility} />
        );
      case '2':
        return (
          <TabReview
            navigation={props.navigation}
            data={reply}
            replyCnt={facility.faReplyCnt}
            scopeCnt={facility.faScopeCnt}
            faPk={facility.faPk}
            refresh={get}
          />
        );
    }
  };
  const scrapOn = () => {
    Axios.post('scrapOn', {
      faPk: facility.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOn', res.data);
        get();
      })
      .catch((err) => {
        logApi('scrapOn error', err.response);
      });
  };
  const scrapOff = () => {
    Axios.post('scrapOff', {
      faPk: facility.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('scrapOff', res.data);
        get();
      })
      .catch((err) => {
        logApi('scrapOff error', err.response);
      });
  };
  const likeOn = () => {
    Axios.post('likeOn', {
      faPk: facility.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('likeOn', res.data);
        get();
        // props.route.params?.refresh();
      })
      .catch((err) => {
        logApi('likeOn error', err.response);
      });
  };
  const likeOff = () => {
    Axios.post('likeOff', {
      faPk: facility.faPk,
      userPk: context.me.userPk,
    })
      .then((res) => {
        logApi('likeOff', res.data);
        get();
        // props.route.params?.refresh();
      })
      .catch((err) => {
        logApi('likeOff error', err.response);
      });
  };
  return (
    <Container>
      <Header
        left={'close'}
        // title={'추천코스'}
        navigation={props.navigation}
        rightComponent={
          <HView>
            {props.route.params.showScrap &&
              (facility.faScrapType === 'N' ? (
                <TouchableOpacity
                  onPress={() => scrapOn()}
                  style={{paddingHorizontal: 5, paddingVertical: 5}}>
                  {/* <Icons name={'icon-bookmark-20'} size={20} color={'black'} /> */}
                  <MaterialIcons
                    name={'bookmark-border'}
                    size={24}
                    color={'black'}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => scrapOff()}
                  style={{paddingHorizontal: 5, paddingVertical: 5}}>
                  {/* <Icons
                    name={'icon-bookmark-s-20'}
                    size={24}
                    color={custom.themeColor}
                  /> */}
                  <MaterialIcons
                    name={'bookmark'}
                    size={24}
                    color={custom.themeColor}
                  />
                </TouchableOpacity>
              ))}
            <TouchableOpacity
              onPress={() =>
                share(
                  `https://jejubattle.com/tourinfo/${props.route.params.faPk}`,
                  '',
                )
              }
              style={{paddingHorizontal: 20, paddingVertical: 5}}>
              <Icons name={'icon-share-20'} size={20} color={'black'} />
            </TouchableOpacity>
          </HView>
        }
      />
      <ScrollView /*stickyHeaderIndices={[1]}*/>
        <View>
          <ImageCarousel
            data={[facility.faImgUrl]}
            height={Math.floor(screenWidth * 0.6)}
            width={screenWidth}
          />
          <Seperator height={20} />

          <HView style={{padding: 20, justifyContent: 'space-between'}}>
            <Text text={facility.faName} fontSize={21} fontWeight={'bold'} />

            <TouchableOpacity
              onPress={() =>
                facility.faLikeType === 'N' ? likeOn() : likeOff()
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
                justifyContent: 'flex-end',
                paddingVertical: 10,
              }}>
              {facility.faLikeType === 'N' ? (
                <AntDesign name={'like2'} size={20} color={'gray'} />
              ) : (
                <AntDesign name={'like1'} size={20} color={custom.themeColor} />
              )}
              <Seperator width={5} />
              <Text text={facility.faLikeCnt} fontSize={14} color={'gray'} />
            </TouchableOpacity>
          </HView>
          <View style={{paddingHorizontal: 20}}>
            <Text
              text={facility.faSubject?.replace(/<br>/g, '\n')}
              fontSize={18}
              color={'dimgray'}
            />
          </View>
          <Seperator height={20} />
        </View>
        <TabView
          lazy
          renderTabBar={renderTabBar}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </ScrollView>
    </Container>
  );
}
