import DateInMontGoToOthersPage from './DateInMontGoToOthersPage';
import React, { useState as useMontState } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  Dimensions as MontDims,
  Platform as MontPlatform,
  View as MontView,
} from 'react-native';

import DateInMontInterMapPage from './DateInMontInterMapPage';

import DateInMontPopularPlacesPage from './DateInMontPopularPlacesPage';

type MontWalkPages =
  | 'Date In Montreal Walks Home'
  | 'Dating Map'
  | 'Popular places'
  | 'Saved locations'
  | 'Places visited';

const DateInMontPagesProvWalks: React.FC = () => {
  const [activeMontPage, setActiveMontPage] = useMontState<MontWalkPages>(
    'Date In Montreal Walks Home'
  );
  const [montScreen, setMontScreen] = useMontState(MontDims.get('window'));

  const showPage = () => {
    switch (activeMontPage) {
      case 'Date In Montreal Walks Home':
        return (
          <DateInMontGoToOthersPage
            setDateInMontEkran={setActiveMontPage}
          />
        );
      case 'Dating Map':
        return <DateInMontInterMapPage setDateInMontEkran={setActiveMontPage} />;
      case 'Popular places':
      case 'Places visited':
      case 'Saved locations':
        return (
          <DateInMontPopularPlacesPage
            setDateInMontEkran={setActiveMontPage}
            dateInMontEkran={activeMontPage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <MontView
    style={{
        backgroundColor: '#000',
        height: montScreen.height,
        flex: 1,
        width: montScreen.width,
      }}
    >
      <ImageBackground
        source={require('../dateInMontAssts/dateInMontImages/dateInMonstrealGround.png')}
        resizeMode="cover"
        style={{
          zIndex: 0,
          width: montScreen.width * 1.1,
          position: 'absolute',
          left: 0,
          height: montScreen.height,
          top: 0,
        }}
      />

      <SafeAreaView />
      {MontPlatform.OS === 'android' && (
        <MontView style={{ paddingTop: montScreen.height * 0.0320546 }} />
      )}

      {showPage()}
    </MontView>
  );
};

export default DateInMontPagesProvWalks;
