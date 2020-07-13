import React from 'react';
import {
  Container,
  Seperator,
  Text,
  TextInput,
  Button,
  Image,
  HView,
  Header,
  Checkbox,
  Picker,
} from 'react-native-nuno-ui';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {custom} from '../../config';
import Icons from '../../commons/Icons';

export default function Join(props) {
  const [name, setName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');

  return (
    <Container>
      <Header left={'back'} navigation={props.navigation} title={'회원가입'} />
      <KeyboardAwareScrollView>
        <Seperator height={30} />
        <View style={{padding: 20}}>
          <HView>
            <View>
              <Image
                local
                uri={require('../../../assets/img/img-user1.png')}
                width={72}
                height={72}
                borderRadius={36}
                onPress={() => null}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  right: 0,
                  bottom: 0,
                }}>
                <Icons name={'icon-pencil-12'} size={13} color={'lightgray'} />
              </View>
            </View>
          </HView>
          <Seperator height={30} />
          <Text text={'이름'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          <TextInput
            value={name}
            onChangeText={(e) => setName(e)}
            borderWidth={0}
            placeholder={'본인의 이름을 입력해주세요'}
          />
          <Seperator line />
          <Seperator height={30} />
          <Text text={'성별'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          <HView>
            <Checkbox
              size={'large'}
              checked={gender === 'male'}
              label={'남성'}
              onPress={() => setGender('male')}
            />
            <Seperator width={60} />
            <Checkbox
              size={'large'}
              checked={gender === 'female'}
              label={'여성'}
              onPress={() => setGender('female')}
            />
          </HView>

          <Seperator height={30} />
          <Text text={'휴대폰 인증'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          <View>
            <HView>
              <Picker
                items={[]}
                value={''}
                placeholder={'통신사'}
                onPress={() => null}
                closeBar={true}
              />
              <Seperator width={10} />
              <View style={{flex: 1}}>
                <HView>
                  <View style={{flex: 1}}>
                    <TextInput
                      value={''}
                      onChangeText={(e) => null}
                      borderWidth={0}
                      keyboardType={'number-pad'}
                      placeholder={'전화번호를 입력해주세요'}
                    />
                  </View>
                  <Button
                    text={'인증요청'}
                    onPress={() => null}
                    textColor={'dimgray'}
                    color={'white'}
                    borderRadius={20}
                  />
                </HView>
                <Seperator line />
              </View>
            </HView>
            <Seperator height={10} />
            <HView>
              <View style={{flex: 1}}>
                <TextInput
                  value={''}
                  onChangeText={(e) => null}
                  borderWidth={0}
                  keyboardType={'number-pad'}
                  placeholder={'인증번호를 입력해주세요'}
                />
              </View>
              <Button
                text={'인증'}
                onPress={() => null}
                textColor={'dimgray'}
                color={'white'}
                borderRadius={20}
              />
            </HView>
            <Seperator line />
          </View>

          <Seperator height={20} />
          {/* 약관동의 */}
          <HView>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Checkbox
                multiple
                // customChecked={<Icons name={'icon-radiocheck-28'} size={28} color={custom.themeColor} />}
                label={'약관1'}
                onPress={() => null}
                checked={true}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Checkbox
                multiple
                label={'약관1'}
                onPress={() => null}
                checked={false}
              />
            </View>
          </HView>
          <Seperator height={5} />
          <HView>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Checkbox
                multiple
                label={'약관1'}
                onPress={() => null}
                checked={false}
              />
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Checkbox
                multiple
                label={'약관1'}
                onPress={() => null}
                checked={false}
              />
            </View>
          </HView>

          <Seperator height={30} />
          <Text text={'아이디'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          <TextInput
            value={email}
            onChangeText={(e) => setEmail(e)}
            borderWidth={0}
            placeholder={'아이디로 사용할 이메일을 입력해주세요'}
          />
          <Seperator line />

          <Seperator height={30} />
          <Text text={'비밀번호'} fontSize={16} fontWeight={'500'} />
          <Seperator height={10} />
          <TextInput
            value={password}
            onChangeText={(e) => setPassword(e)}
            showEye={true}
            borderWidth={0}
            placeholder={'비밀번호(영문숫자포함 6~12자)'}
          />
          <Seperator line />

          <Seperator height={30} />
          <Text text={'비밀번호 확인'} fontSize={16} fontWeight={'500'} />
          <TextInput
            value={repassword}
            showEye={true}
            onChangeText={(e) => setRepassword(e)}
            borderWidth={0}
            placeholder={'입력했던 비밀번호를 다시 입력해주세요'}
          />
          <Seperator line />
          <Seperator height={20} />
          <Checkbox
            label={'약관에 동의하였습니다'}
            checked={true}
            onPress={() => null}
          />
        </View>
      </KeyboardAwareScrollView>
      <View
        style={{
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Button
          stretch
          size={'large'}
          text={'회원가입'}
          onPress={() => null}
          color={custom.themeColor}
        />
        <Seperator bottom />
      </View>
    </Container>
  );
}
