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
} from '../../react-native-nuno-ui';
import {View, TouchableOpacity, FlatList} from 'react-native';
import Icons from '../../commons/Icons';
import {custom} from '../../config';
import ListItemReco from '../../commons/ListItemReco';
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {screenWidth} from '../../styles';

export default function TabTourIntroduction(props) {
  const renderItem = ({item, index}) => {
    return (
      <ListItemReco
        onPress={() =>
          props.navigation.push('TravelView', {
            faPk: item.faPk,
            showScrap: true,
          })
        }
        item={item}
        index={index}
      />
    );
  };
  return props.courseList ? (
    <Container>
      <Seperator height={20} />
      <View style={{padding: 20}}>
        <Text text={'여행 설명'} fontSize={18} fontWeight={'bold'} />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text
          text={props.data.fa1Subj?.replace(/<br>/g, '\n')}
          fontSize={18}
          color={'dimgray'}
        />
      </View>
      {/* <View style={{padding: 20}}>
        <Button text={'더보기'} color={'white'} onPress={() => null} stretch />
      </View> */}
      <View style={{padding: 20}}>
        {props.courseList.map((list, index) => {
          return (
            <HView style={{paddingVertical: 5}}>
              <View style={{flex: 0.2, alignItems: 'center'}}>
                <Text
                  text={'0' + (index + 1)}
                  fontSize={28}
                  fontWeight={'bold'}
                  color={'lightgray'}
                />
              </View>
              {index === 0 ? (
                <View style={{flex: 0.1, alignItems: 'center'}}>
                  <Icons
                    name={'icon-loaction-18'}
                    size={26}
                    color={custom.themeColor}
                  />
                </View>
              ) : index === props.courseList.length - 1 ? (
                <View style={{flex: 0.1, alignItems: 'center'}}>
                  <Icons
                    name={'icon-loaction-18'}
                    size={26}
                    color={'dimgray'}
                  />
                </View>
              ) : (
                <View style={{flex: 0.1, alignItems: 'center'}}>
                  <Icons
                    name={'icon-loaction-18'}
                    size={26}
                    color={'lightgray'}
                  />
                </View>
              )}
              {index % 2 === 0 ? ( // 짝수
                <View style={{flex: 0.1, alignItems: 'center'}}>
                  <Text
                    text={'••••••'}
                    fontSize={10}
                    fontWeight={'bold'}
                    color={'lightgray'}
                  />
                </View> // 홀수
              ) : (
                <View style={{flex: 0.2, alignItems: 'center'}}>
                  <Text
                    text={'••••••••••••'}
                    fontSize={10}
                    fontWeight={'bold'}
                    color={'lightgray'}
                  />
                </View>
              )}
              <Seperator width={10} />
              <HView style={{flex: 0.5}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  text={
                    list.faName.length < 11
                      ? list.faName
                      : list.faName.substring(0, 8) + '...'
                  }
                  fontSize={18}
                  color={'dimgray'}
                />
                <Seperator width={10} />
                {index === 0 ? (
                  <Button
                    size={'small'}
                    text={'출발'}
                    textColor={custom.themeColor}
                    borderColor={custom.themeColor}
                  />
                ) : index === props.courseList.length - 1 ? (
                  <Button
                    size={'small'}
                    text={'도착'}
                    textColor={'dimgray'}
                    borderColor={'dimgray'}
                  />
                ) : null}
              </HView>
            </HView>
          );
        })}
      </View>

      <FlatList
        data={props.courseList}
        keyExtractor={(item) => JSON.stringify(item.faPk)}
        renderItem={renderItem}
        // ListEmptyComponent={<Empty />}
        // ListHeaderComponent={FlatListHeader()}
        // refreshing={pullToRefresh}
        // onRefresh={() => {
        //   setIsLast(false);
        //   setPullToRefresh(true);
        // }}
      />
    </Container>
  ) : (
    <Container>
      <View style={{padding: 20}}>
        <Text text={'시설 소개'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 1}}>
          <Text
            text={props.data.fa1Subj?.replace(/<br>/g, '\n')}
            fontSize={18}
            color={'dimgray'}
          />
        </View>
      </HView>

      <Seperator height={20} />

      <View style={{padding: 20}}>
        <Text text={'이용 수칙'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 1}}>
          <Text
            text={props.data.fa2Subj?.replace(/<br>/g, '\n')}
            fontSize={18}
            color={'dimgray'}
          />
        </View>
      </HView>

      <Seperator height={20} />

      <View style={{padding: 20}}>
        <Text text={'공지사항'} fontSize={18} fontWeight={'bold'} />
      </View>
      <HView
        style={{
          paddingHorizontal: 40,
          alignItems: 'flex-start',
          marginBottom: 30,
        }}>
        <View style={{flex: 1}}>
          <Text
            text={props.data.fa3Subj?.replace(/<br>/g, '\n')}
            fontSize={18}
            color={'dimgray'}
          />
        </View>
      </HView>
    </Container>
  );
}
