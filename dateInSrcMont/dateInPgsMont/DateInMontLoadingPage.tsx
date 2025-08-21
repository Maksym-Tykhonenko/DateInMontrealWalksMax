import React, {
  useLayoutEffect as useMontLayout,
  useEffect as useMontEffect,
  useRef as useMontRef,
} from 'react';
import {
  Easing as MontEase,
  View as MontContainer,
  Image as MontImg,
  Animated as MontAnim,
  Dimensions as MontDims,
} from 'react-native';
import { useNavigation as useMontNav } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY_MONT_ONBOARD = 'montreal_walks_onboarded';
import LottieView from 'lottie-react-native';
import loadingHeartAnimation from '../dateInAnimations/loadingHeartAnimation.json';


const DateInMontLoadingPage: React.FC = () => {
  const screenSize = MontDims.get('window');
  const navigation = useMontNav();

  // анімаційні значення
  const montScaleRef = useMontRef(new MontAnim.Value(0)).current;
  const montFadeRef = useMontRef(new MontAnim.Value(0)).current;

  // анімації
  useMontEffect(() => {
    MontAnim.spring(montScaleRef, {
      toValue: 1,
      tension: 60,
      friction: 5,
      useNativeDriver: true,
    }).start();

    MontAnim.timing(montFadeRef, {
      toValue: 1,
      duration: 2000,
      easing: MontEase.inOut(MontEase.ease),
      useNativeDriver: true,
    }).start();
  }, [montScaleRef, montFadeRef]);

  // онбординг логіка
  {/** 
  useMontLayout(() => {
    (async () => {
      let goToOnboarding = false;

      try {
        const onboardFlag = await AsyncStorage.getItem(KEY_MONT_ONBOARD);

        if (!onboardFlag) {
          goToOnboarding = true;
          await AsyncStorage.setItem(KEY_MONT_ONBOARD, 'done');
        }
      } catch (err) {
        if (__DEV__) console.log('DateInMontLoadingPage error', err);
      }

      setTimeout(() => {
        //navigation.replace(goToOnboarding ? 'DateInMontOnboarding' : 'DateInMontPagesProvWalks');
      }, 8000);
    })();
  }, [navigation]);
*/}
  return (
    <MontContainer style={{ flex: 1, alignItems: 'center' }}>
      {/* Фон */}
      <MontImg
        source={require('../dateInMontAssts/dateInMontImages/loadingAppImage.png')}
        style={{
          top: 0,
          width: screenSize.width,
          left: 0,
          height: screenSize.height,
          position: 'absolute',
        }}
        resizeMode="cover"
      />

      {/* Лого */}
      <MontAnim.View
        style={{
          transform: [{ scale: montScaleRef }],
          marginTop: screenSize.height * 0.12,
        }}
      >
        <MontImg
          source={require('../dateInMontAssts/dateInMontImages/dateWalksIcon.png')}
          style={{
            borderWidth: screenSize.width * 0.012,
            height: screenSize.width * 0.78,
            borderColor: '#ff7d00',
            borderRadius: screenSize.width * 0.1,
            width: screenSize.width * 0.78,
          }}
        />
      </MontAnim.View>

      {/* Анімація серця */}
      <MontAnim.View
        style={{
          opacity: montFadeRef,
          position: 'absolute',
          bottom: screenSize.height * 0.08,
        }}
      >
        <LottieView
          source={loadingHeartAnimation}
          autoPlay
          loop
          style={{
            width: screenSize.width * 0.55,
            backgroundColor: 'transparent',
            height: screenSize.width * 0.55,
          }}
        />
      </MontAnim.View>
    </MontContainer>
  );
};

export default DateInMontLoadingPage;
