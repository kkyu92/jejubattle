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
import { TabView } from 'react-native-tab-view';
import TabFacilityIntroduce from './TabFacilityIntroduce';
import TabFacilityInfo from './TabFacilityInfo';
import TabFacilityReview from './TabFacilityReview';
import { screenWidth } from '../../styles';

const initialLayout = {width: screenWidth};

export default function FacilityView(props) {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: '소개'},
    {key: '2', title: '정보'},
    {key: '3', title: '리뷰'},
  ]);

  const renderTabBar = (tabprops) => {
    return (
      <HView style={{justifyContent: 'space-between', borderBottomColor: 'lightgray', borderBottomWidth: 1}}>
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
        return <TabFacilityIntroduce navigation={props.navigation} />;
      case '2':
        return <TabFacilityInfo navigation={props.navigation} />;
      case '3':
        return <TabFacilityReview navigation={props.navigation} />;
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
          data={[
            'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
            'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
            'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
          ]}
          height={300}
          // onPress={() => setImageViewer(true)}
        />
        <Seperator height={20} />
        <HView style={{padding: 20, justifyContent: 'space-between'}}>
          <Text text={'서귀포시 체육관'} fontWeight={'bold'} fontSize={21} />
          <HView style={{paddingHorizontal: 20, justifyContent: 'flex-end'}}>
            <Icons name={'icon-like-12'} size={18} color={'gray'} />
            <Seperator width={5} />
            <Text text={'32'} fontSize={14} color={'gray'} />
          </HView>
        </HView>
        <View style={{padding: 20}}>
          <Text text={'서귀포 도민들이 가장 자주 가는 체육관'} color={'dimgray'} fontSize={18} />
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
