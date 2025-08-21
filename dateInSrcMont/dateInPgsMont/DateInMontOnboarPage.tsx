import React, {
    useState as useMontState,
} from 'react';
import {
    View as MontView,
    Image as MontImg,
    TouchableOpacity as MontTouch,
    Dimensions as MontDims,
    Text as MontTxt,
} from 'react-native';
import { useNavigation as useMontNav } from '@react-navigation/native';
import { fonts as dateInMontFonts } from '../fonts';
import dateInOnboardingsMontrealWalks from '../dateInDannyMont/dateInOnboardingsMontrealWalks';

const DateInMontOnboarPage: React.FC = () => {
    const [montSlide, setMontSlide] = useMontState(0);
    const montScreen = MontDims.get('window');
    const montNav = useMontNav();

    const goNextSlide = () => {
        if (montSlide < dateInOnboardingsMontrealWalks.length - 1) {
            setMontSlide(prev => prev + 1);
        } else {
            montNav.replace?.('DateInMontPagesProvWalks');
        }
    };

    return (
        <MontView style={{ flex: 1 }}>
            {/* Зображення слайду */}
            <MontImg
                source={dateInOnboardingsMontrealWalks[montSlide].dateInMontImgaOnb}
                resizeMode="cover"
                style={{
                    alignSelf: 'center',
                    width: montScreen.width * 1.03,
                    position: 'absolute',
                    height: montScreen.height,
                }}
            />

            {/* Текст і кнопка */}
            <MontView
                style={{
                    alignItems: 'center',
                    alignSelf: 'center',
                    bottom: 0,
                    width: montScreen.width,
                    height: montScreen.height * 0.28,
                    position: 'absolute',
                }}
            >
                <MontTxt
                    style={{
                        fontFamily: dateInMontFonts.dateInMontMontserratBold,
                        fontSize: montScreen.width * 0.044,
                        paddingHorizontal: montScreen.width * 0.05,
                        color: 'white',
                        textAlign: 'center',
                    }}
                >
                    {dateInOnboardingsMontrealWalks[montSlide].dateInMontTitleOnb}
                </MontTxt>

                <MontTxt
                    style={{
                        fontSize: montScreen.width * 0.04,
                        fontFamily: dateInMontFonts.dateInMontMontserratRegular,
                        textAlign: 'center',
                        marginTop: montScreen.width * 0.04,
                        color: 'white',
                        paddingHorizontal: montScreen.width * 0.05,
                    }}
                >
                    {dateInOnboardingsMontrealWalks[montSlide].dateInMontSecondOnb}
                </MontTxt>

                <MontTouch
                    onPress={goNextSlide}
                    style={{
                        position: 'absolute',
                        bottom: montScreen.height * 0.04,
                    }}
                >
                    <MontImg
                        source={require('../dateInMontAssts/dateInMontImages/onboardingButton.png')}
                        resizeMode="stretch"
                        style={{
                            marginTop: montScreen.width * 0.05,
                            width: montScreen.width * 0.55,
                            justifyContent: 'center',
                            height: montScreen.height * 0.05,
                            alignItems: 'center',
                        }}
                    />
                </MontTouch>
            </MontView>
        </MontView>
    );
};

export default DateInMontOnboarPage;
