import styled from 'styled-components/native';
import {Platform} from 'react-native';
/*
export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.os === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;
*/
export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DevName = styled.Text`
  font-weight: bold;
  font-size: 16px;
  color: #c3c3c3;
  padding-right: 20px;
`;

export const DevBio = styled.Text`
  font-weight: normal;
  font-size: 14px;
  color: #666;
  padding-top: 5px;
`;

export const DevTechs = styled.Text`
  margin-top: 5px;
  font-weight: normal;
  font-size: 14px;

  color: #666;
  padding-top: 5px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const CalloutDev = styled.View`
  flex: 1;
  width: 260px;
`;

export const ContainerBusca = styled.View`
  position: absolute;
  top: 10px;
  bottom: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255, 0.8)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
  height: 50px;
  background: #fff;
  color: #333;
  border-radius: 25px;
  font-size: 16px;
  box-shadow: 10px 5px 5px black;
`;

export const LoadButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #8e4dff;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;
