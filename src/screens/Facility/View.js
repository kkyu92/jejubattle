import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Image,
  Checkbox,
  Button,
  Modal,
  ImageCarousel,
  Loader,
} from '../../react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import ListItem from '../../commons/ListItem';
import {TabView} from 'react-native-tab-view';
import TabFacilityIntroduce from './TabFacilityIntroduce';
import TabFacilityInfo from './TabFacilityInfo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabReview from '../../commons/TabReview';
import {screenWidth} from '../../styles';
import Axios from 'axios';
import {logApi, share} from '../../react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import AntDesign from 'react-native-vector-icons/AntDesign';

const initialLayout = {width: screenWidth};

export default function FacilityView(props) {
  const context = React.useContext(AppContext);
  const [loading, setLoading] = React.useState(true);
  const [index, setIndex] = React.useState(0);
  const [facility, setFacility] = React.useState({});
  const [facilityImgList, setFacilityImgList] = React.useState([]);
  const [reply, setReply] = React.useState([]);
  const [routes] = React.useState([
    {key: '1', title: '소개'},
    {key: '2', title: '정보'},
    {key: '3', title: '리뷰'},
  ]);

  React.useEffect(() => {
    get();
  }, []);
  const get = () => {
    Axios.get(`facilityInfo/${props.route.params.faPk}`)
      .then((res) => {
        logApi('facilityInfo', res.data);
        setFacility(res.data.facility);
        setFacilityImgList(res.data.imgList);
        setReply(res.data.replyList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(props.route.params.faPk);
        logApi('facilityInfo error', err.response);
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
          <TabFacilityIntroduce navigation={props.navigation} data={facility} />
        );
      case '2':
        return (
          <TabFacilityInfo navigation={props.navigation} data={facility} />
        );
      case '3':
        return (
          <TabReview
            navigation={props.navigation}
            data={reply}
            replyCnt={facility.faReplyCnt}
            scopeCnt={facility.faScopeCnt}
            faPk={facility.faPk}
            faName={facility.faName}
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
        // props.route.params?.refresh();
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
        // props.route.params?.refresh();
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
  return loading === true ? (
    <Loader />
  ) : (
    <Container>
      <Header
        left={'back'}
        rightComponent={
          <HView>
            {facility.faScrapType === 'N' ? (
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
            )}
            <TouchableOpacity
              onPress={() =>
                share(
                  `https://jejubattle.com/facility/${facility.faPk}`,
                  facility.faName,
                  facility.faSubject,
                  facility.faImgUrl,
                  '',
                )
              }
              style={{paddingHorizontal: 20, paddingVertical: 5}}>
              <Icons name={'icon-share-20'} size={20} color={'black'} />
            </TouchableOpacity>
          </HView>
        }
        // title={'구기종목'}
        navigation={props.navigation}
        // containerStyle={{borderBottomWidth: 0}}
      />
      <ScrollView>
        <View>
          <ImageCarousel
            data={facilityImgList.map((e) => e.fileUrl)}
            // height={undefined}
            height={Math.floor(screenWidth * 0.7)}
            width={Math.floor(screenWidth)}
          />
        </View>
        {/* <ImageCarousel
          data={[facility.faImgUrl]}
          height={300}
          // onPress={() => setImageViewer(true)}
        /> */}
        <Seperator height={20} />
        <HView style={{paddingHorizontal: 20, justifyContent: 'space-between'}}>
          <Text text={facility.faName} fontWeight={'bold'} fontSize={21} />
          <TouchableOpacity
            onPress={() => (facility.faLikeType === 'N' ? likeOn() : likeOff())}
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
        <Seperator height={10} />
        <View style={{paddingHorizontal: 20}}>
          <Text text={facility.faSubject} color={'dimgray'} fontSize={16} />
        </View>
        <Seperator height={10} />
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
