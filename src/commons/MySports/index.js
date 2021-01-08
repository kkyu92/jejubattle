import React from 'react';
import {HView, Text} from '../../react-native-nuno-ui';

export default function MySports(props) {
  return (
    <HView style={{flexWrap: 'wrap'}}>
      <Text
        fontSize={14}
        color={'gray'}
        text={props.userSport?.length !== 0 ? '대표종목: ' : '대표종목: 없음'}
      />
      {props.userSport?.map((e, i) => {
        return (
          <Text
            key={i}
            fontSize={14}
            color={'gray'}
            text={e.name + (i !== props.userSport.length - 1 ? ', ' : '')}
          />
        );
      })}
    </HView>
  );
}
