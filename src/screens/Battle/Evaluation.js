import React from 'react';
import {
  Container,
  Text,
  Header,
  Seperator,
  HView,
  Button,
  Image,
  Checkbox,
} from 'react-native-nuno-ui';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {custom} from '../../config';
import Axios from 'axios';
import {logApi} from 'react-native-nuno-ui/funcs';
import {AppContext} from '../../context';
import {sports1Table} from '../../constants';
import {screenWidth} from '../../styles';
import StarRating from 'react-native-star-rating';

export default function Evaluation(props) {
  const context = React.useContext(AppContext);

  React.useEffect(() => {
  }, []);
  const complete = () => {

  };
  return (
    <Container>
      <Header
        left={'close'}
        title={'상대방 평가하기'}
        navigation={props.navigation}
      />
      <ScrollView>
        <View style={{padding: 20}}>
          <Seperator height={20} />
          <Text text={'1. 상대방이 시간 약속을 잘 지켰나요?'} fontSize={16} color={'dimgray'} />
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={4}
              starSize={40}
              emptyStarColor={'gray'}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
              selectedStar={(e) => null}
            />
          </View>
          <Seperator height={20} />
          <Text text={'2. 상대방이 매너있게 플레이 했나요?'} fontSize={16} color={'dimgray'} />
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={4}
              starSize={40}
              emptyStarColor={'gray'}
              halfStarEnabled={true}
              halfStarColor={custom.themeColor}
              fullStarColor={custom.themeColor}
              selectedStar={(e) => null}
            />
          </View>
        </View>
      </ScrollView>
      <HView
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        }}>
        <Button
          text={'배틀평가 및 완료'}
          onPress={complete}
          color={custom.themeColor}
          disable={false}
          size={'large'}
          stretch
        />
      </HView>
      <Seperator bottom />
    </Container>
  );
}
