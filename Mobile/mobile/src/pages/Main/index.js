import React, {useState, useEffect} from 'react';
import {Image, View, Text, TextInput, TouchableOpacity} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {requestPermissionsAsync, getCurrentPositionAsync} from 'expo-location';
import {MaterialIcons} from '@expo/vector-icons';
import {
  Container,
  CalloutDev,
  DevName,
  DevBio,
  DevTechs,
  ContainerBusca,
  SearchInput,
  LoadButton,
} from './styles';

import api from '~/_services/api';
import {connect, disconnect, subscribeToNewDevs} from '~/_services/socket';

export default function Main({navigation}) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

  useEffect(() => {
    async function loadInitialPosition() {
      const {granted} = await requestPermissionsAsync();
      if (granted) {
        const {coords} = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const {latitude, longitude} = coords;
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }
    loadInitialPosition();
  }, []);

  useEffect(() => {
    subscribeToNewDevs(dev => setDevs([...devs, dev]));
  }, [devs]);

  function setupWebSocket() {
    disconnect();
    const {latitude, longitude} = currentRegion;

    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const {latitude, longitude} = currentRegion;
    const resp = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });
    console.log('===>', resp.data.devs);
    setDevs(resp.data.devs);
    setupWebSocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }
  return (
    <Container>
      <ContainerBusca>
        <SearchInput
          placeholder="Busca devs por techs ..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <LoadButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={0} color="#FFF" />
        </LoadButton>
      </ContainerBusca>
      <MapView
        onRegionChangeComplete={handleRegionChanged}
        style={{flex: 1}}
        initialRegion={currentRegion}>
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1],
            }}>
            <Image
              style={{
                width: 54,
                height: 54,
                borderRadius: 4,
                borderWidth: 4,
                borderColor: '#fff',
              }}
              source={{
                uri: dev.avatar_url,
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username,
                });
              }}>
              <CalloutDev>
                <DevName>{dev.name}</DevName>
                <DevBio>{dev.bio}</DevBio>
                <DevTechs>{dev.techs.join(', ')}</DevTechs>
              </CalloutDev>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </Container>
  );
}
