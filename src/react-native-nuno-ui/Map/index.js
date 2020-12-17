import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {screenWidth, screenHeight, ShadowStyle} from '../style';
import Seperator from '../Seperator';
import {Nuno} from '..';
import {
  getCurrentLocation,
  getAddressFromGeoCode,
  showToast,
  sleep,
} from '../funcs';
import Text from '../Text';

export default function Map({
  latitude,
  longitude,
  customCenter,
  showZoom,
  showCurrent,
  markers,
  markerComponent,
  showButton,
  buttonText,
  onMapReady,
  getCurrentPosition,
  markerOnSelect,
  setLoading,
  mapReady,
}) {
  let mapRef = React.useRef();
  const [camera, setCamera] = React.useState({
    center: {
      latitude: latitude || 0,
      longitude: longitude || 0,
    },
    pitch: 1,
    heading: 1,
    altitude: 1,
    zoom: 15,
  });

  React.useEffect(() => {
    async function getLoc() {
      console.log(mapReady);
      const loc = await getCurrentLocation(Nuno.config.lang);
      const temp = {...camera};
      temp.center = loc.coords;
      if (mapReady === 'aroundme') {
        console.log('getLoc : no Markers');
        setCamera(temp);
        getCurrentPosition(loc.coords);
      }
    }
    // getLoc();
    if (!latitude && !longitude) {
      getLoc();
      console.log('getLoc - fin');
    }
  }, []);
  React.useEffect(() => {
    setLoading(false);
    console.log('out');
    if (mapRef && JSON.stringify(markers) !== '[]') {
      console.log('in - str');
      if (markers.length === 1) {
        console.log('marker one');
        markers = [
          ...markers,
          {
            faLat: latitude,
            faLon: longitude,
          },
        ];
        const temp = markers.map((m) => ({
          latitude: m.faLat,
          longitude: m.faLon,
        }));
        mapRef.fitToCoordinates(temp, {
          edgePadding: {top: 200, right: 200, bottom: 200, left: 200},
          animated: false,
        });
      } else {
        console.log('marker list');
        // list of _id's must same that has been provided to the identifier props of the Marker
        // mapRef.fitToSuppliedMarkers(
        //   markers.map(({marker}) => marker),
        //   {
        //     edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
        //     animated: false,
        //   },
        // );
        const temp = markers.map((m) => ({
          latitude: m.faLat,
          longitude: m.faLon,
        }));
        mapRef.fitToCoordinates(temp, {
          edgePadding: {top: 100, right: 100, bottom: 100, left: 100},
          animated: false,
        });
        console.log('불린다');
      }
    }
    // async function getLoc() {
    //   console.log(mapReady);
    //   const loc = await getCurrentLocation(Nuno.config.lang);
    //   const temp = {...camera};
    //   temp.center = loc.coords;
    //   if (mapReady === 'aroundme' && markers.length === 0) {
    //     console.log('getLoc : no Markers');
    //     setCamera(temp);
    //     getCurrentPosition(loc.coords);
    //   } else if (mapReady === 'facilitySearch' && markers.length === 0) {
    //     console.log('\n\n\n\n\n\n\n\n\n\n');
    //   }
    // }
    // getLoc();
    console.log('in - fin : ' + mapReady);
  }, [markers]);

  const onRegionChangeComplete = async (e) => {
    const temp = await mapRef.getCamera();
    temp.altitude = 1;
    setCamera(temp);
    getCurrentPosition(temp.center);
  };
  const onPressCurrent = async () => {
    const loc = await getCurrentLocation(Nuno.config.lang);
    const temp = {...camera};
    temp.center = loc.coords;
    mapRef.animateCamera(temp, {duration: 500});
    getCurrentPosition(loc.coords);
  };

  const onPressZoomOut = () => {
    const temp = {...camera};
    temp.zoom = temp.zoom === 1 ? 1 : temp.zoom - 1;
    mapRef.animateCamera(temp, {duration: 500});
  };
  const onPressZoomIn = () => {
    const temp = {...camera};
    temp.zoom = temp.zoom === 20 ? 20 : temp.zoom + 1;
    mapRef.animateCamera(temp, {duration: 500});
  };
  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <MapView
        provider={Nuno.config.mapProvider}
        onMapReady={onMapReady}
        ref={(e) => (mapRef = e)}
        style={{width: screenWidth, flex: 1}}
        camera={camera}
        showsCompass={false}
        showsUserLocation
        showsMyLocationButton={false}
        initialCamera={camera}
        onRegionChangeComplete={onRegionChangeComplete}>
        {markers &&
          markers.map((e, i) => (
            <Marker
              identifier={e.faAddr}
              key={i}
              coordinate={e.coords}
              title={e.title}
              description={e.description}
              image={e.markerComponent}
              onPress={() => markerOnSelect(e)}>
              <Callout>
                {/* <View style={{paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgray'}}> */}
                <Text text={e.title} fontSize={14} />
                {/* </View> */}
              </Callout>
            </Marker>
          ))}
      </MapView>
      {/* {mapReady === 'aroundme' || mapReady === 'facilitySearch' ? (
        <View
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            marginLeft: -20,
            marginTop: -20,
          }}>
          {customCenter || (
            <MaterialIcons name={'location-on'} color={'red'} size={40} />
          )}
        </View>
      ) : null} */}
      {/* zoom control */}
      <View style={{position: 'absolute', bottom: 20, right: 20}}>
        {showZoom && (
          <View>
            <TouchableOpacity
              onPress={onPressZoomIn}
              style={{
                backgroundColor: 'white',
                width: 40,
                height: 40,
                borderRadius: 20,
                borderColor: 'lightgray',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                ...ShadowStyle,
              }}>
              <Entypo name={'plus'} size={20} />
            </TouchableOpacity>
            <Seperator height={10} />
            <TouchableOpacity
              onPress={onPressZoomOut}
              style={{
                backgroundColor: 'white',
                width: 40,
                height: 40,
                borderRadius: 20,
                borderColor: 'lightgray',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                ...ShadowStyle,
              }}>
              <Entypo name={'minus'} size={20} />
            </TouchableOpacity>
          </View>
        )}
        {showCurrent && (
          <View>
            <Seperator height={10} />
            <TouchableOpacity
              onPress={() => onPressCurrent()}
              style={{
                backgroundColor: 'white',
                width: 40,
                height: 40,
                borderRadius: 20,
                borderColor: 'lightgray',
                borderWidth: 1,
                alignItems: 'center',
                justifyContent: 'center',
                ...ShadowStyle,
              }}>
              <MaterialIcons name={'my-location'} size={20} />
            </TouchableOpacity>
          </View>
        )}
        <Seperator bottom />
      </View>
    </View>
  );
}
