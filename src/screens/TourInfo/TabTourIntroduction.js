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
} from 'react-native-nuno-ui';
import {View, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItem from '../../commons/ListItem';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { screenWidth } from '../../styles';

const data = [
  {id: '0'},
  {id: '1'},
  {id: '2'},
  {id: '3'},
  {id: '4'},
  {id: '5'},
  {id: '6'},
  {id: 's'},
];

export default function TabTourIntroduction(props) {
  const renderItem = ({item, index}) => {
    return (
      <ListItem
        onPress={() => props.navigation.navigate('TourCourseView', {faPk: item.faPk})}
        item={item}
      />
    );
  };
  return (
    <Container>
      <Seperator height={20} />
      <View style={{padding: 20}}>
        <Text text={'여행 설명'} fontSize={18} fontWeight={'bold'} />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text text={props.data.fa1Subj?.replace(/<br>/g, '\n')} fontSize={18} color={'dimgray'} />
      </View>
      <View style={{padding: 20}}>
        <Button text={'더보기'} color={'white'} onPress={() => null} stretch />
      </View>
      <View style={{padding: 20}}>
        <HView style={{paddingVertical: 5}}>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Text text={'01'} fontSize={28} fontWeight={'bold'} color={'lightgray'} />
          </View>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Icons name={'icon-loaction-18'} size={26} color={custom.themeColor} />
          </View>
          <View style={{flex: 0.1, alignItems: 'center'}}>
            <Text text={'••••••'} fontSize={10} fontWeight={'bold'} color={'lightgray'} />
          </View>
          <HView style={{flex: 0.5}}>
            <Text text={'제주 국제공항'} fontSize={18} color={'dimgray'} />
            <Seperator width={10} />
            <Button size={'small'} text={'출발'} textColor={custom.themeColor} borderColor={custom.themeColor} />
          </HView>
        </HView>
        <HView style={{paddingVertical: 5}}>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Text text={'02'} fontSize={28} fontWeight={'bold'} color={'lightgray'} />
          </View>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Icons name={'icon-loaction-18'} size={26} color={'lightgray'} />
          </View>
          <View style={{flex: 0.1, alignItems: 'center'}}>
            <Text text={'••••••'} fontSize={10} fontWeight={'bold'} color={'lightgray'} />
          </View>
          <HView style={{flex: 0.5}}>
            <Text text={'제주 국제공항'} fontSize={18} color={'dimgray'} />
          </HView>
        </HView>
        <HView style={{paddingVertical: 5}}>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Text text={'05'} fontSize={28} fontWeight={'bold'} color={'lightgray'} />
          </View>
          <View style={{flex: 0.2, alignItems: 'center'}}>
            <Icons name={'icon-loaction-18'} size={26} color={'dimgray'} />
          </View>
          <View style={{flex: 0.1, alignItems: 'center'}}>
            <Text text={'••••••'} fontSize={10} fontWeight={'bold'} color={'lightgray'} />
          </View>
          <HView style={{flex: 0.5}}>
            <Text text={'제주 국제공항'} fontSize={18} color={'dimgray'} />
            <Seperator width={10} />
            <Button size={'small'} text={'도착'} textColor={'dimgray'} borderColor={'dimgray'} />
          </HView>
        </HView>
      </View>

{/*
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      /> */}
    </Container>
  );
}
