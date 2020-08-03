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
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';

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
  const [notices, setNotices] = React.useState([]);
  React.useEffect(() => {
    Axios.get('notice')
      .then((res) => {
        logApi('event', res.data);
        setNotices(res.data);
      })
      .catch((err) => {
        logApi('event error', err.response);
      });
  }, []);

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
              text={content.noSubject}
              fontSize={16}
              fontWeight={isActive ? 'bold' : '200'}
            />
            <Seperator height={6} />
            <Text text={content.noDetetime} fontSize={14} color={'gray'} />
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
  const renderContent = (content) => {
    return (
      <View style={{padding: 20}}>
        <Text
          text={content.noContent.replace(/<br>/g, '\n')}
          fontSize={16}
          color={'dimgray'}
        />
        <Seperator marginTop={20} line />
      </View>
    );
  };
  const updateSection = (active) => {
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
          sections={notices}
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
