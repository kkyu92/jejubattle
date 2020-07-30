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
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ActionSheet from 'react-native-actions-sheet';
import ListItem from '../../commons/ListItem';
import {TabView} from 'react-native-tab-view';
import TabFacilityIntroduce from './TabFacilityIntroduce';
import TabFacilityInfo from './TabFacilityInfo';
import TabReview from '../../commons/TabReview';
import {screenWidth} from '../../styles';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';

const initialLayout = {width: screenWidth};

export default function FacilityView(props) {
  const [index, setIndex] = React.useState(0);
  const [facility, setFacility] = React.useState({});
  const [reply, setReply] = React.useState([]);
  const [routes] = React.useState([
    {key: '1', title: '소개'},
    {key: '2', title: '정보'},
    {key: '3', title: '리뷰'},
  ]);

  React.useEffect(() => {
    Axios.get(`facilityInfo/${props.route.params.faPk}`)
      .then((res) => {
        logApi('facilityInfo', res.data);
        setFacility(res.data.facility);
        setReply(res.data.replyList);
      })
      .catch((err) => {
        logApi('facilityInfo error', err.response);
      });
  }, []);
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
          />
        );
    }
  };
  return (
    <Container>
      <Header
        left={'back'}
        rightComponent={
          <HView>
            <TouchableOpacity
              onPress={() => null}
              style={{paddingHorizontal: 5, paddingVertical: 5}}>
              <Icons name={'icon-bookmark-20'} size={20} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => null}
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
        <ImageCarousel
          data={[facility.faImgUrl]}
          height={300}
          // onPress={() => setImageViewer(true)}
        />
        <Seperator height={20} />
        <HView style={{padding: 20, justifyContent: 'space-between'}}>
          <Text text={facility.faName} fontWeight={'bold'} fontSize={21} />
          <HView style={{paddingHorizontal: 20, justifyContent: 'flex-end'}}>
            <Icons name={'icon-like-12'} size={18} color={'gray'} />
            <Seperator width={5} />
            <Text text={facility.faLikeCnt} fontSize={14} color={'gray'} />
          </HView>
        </HView>
        <View style={{padding: 20}}>
          <Text text={facility.faSubject} color={'dimgray'} fontSize={18} />
        </View>
        <Seperator height={20} />
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
