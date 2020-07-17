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
import Accordion from 'react-native-collapsible/Accordion';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

export default function Notice(props) {
  const [activeSection, setActiveSection] = React.useState([0]);
  const renderHeader = (content, index, isActive) => {
    return (
      <View style={{paddingHorizontal: 20}}>
        <HView
          style={{
            marginVertical: 10,
            height: 48,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text
              text={'앱 버전이 1.1.5(v)로 업데이트 되었습니다'}
              fontSize={16}
              fontWeight={isActive ? 'bold' : '200'}
            />
            <Seperator height={6} />
            <Text text={'2020.04.12'} fontSize={14} color={'gray'} />
          </View>

          {isActive ? (
            <AntDesign name={'caretup'} size={14} color={'dimgray'} />
          ) : (
            <AntDesign name={'caretdown'} size={14} color={'dimgray'} />
          )}
        </HView>
        {!isActive && <Seperator line />}
      </View>
    );
  };
  const renderContent = (data) => {
    return (
      <View style={{padding: 20}}>
        <Text
          text={
            '학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항학교 운동장, 운동시설 이용시 주의사항'
          }
          fontSize={16}
          color={'dimgray'}
        />
        <Seperator marginTop={20} line />
      </View>
    );
  };
  const updateSection = active => {
    setActiveSection(active);
  };
  return (
    <Container>
      <Header left={'close'} title={'공지사항'} navigation={props.navigation} />
      <Seperator height={20} />
      <View style={{padding: 20}}>
        <Text text={'전체공지'} fontSize={18} fontWeight={'bold'} />
      </View>
      <ScrollView>
        <Accordion
          activeSections={activeSection}
          sections={data}
          expandMultiple={true}
          touchableComponent={(props) => <TouchableOpacity {...props} />}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={updateSection}
        />
      </ScrollView>
    </Container>
  );
}
