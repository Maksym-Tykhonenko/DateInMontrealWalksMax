import React from 'react';
import {
    TouchableOpacity as DateInTOpacityMont,
    Text as DateInTextMont,
    View as DateInViewMont,
    Dimensions,
    Image as DateInImageMont,
    GestureResponderEvent,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { fonts as dateInFonts } from '../fonts';

const screenDims = Dimensions.get('window');

interface DatePlaceNotOpenedProps {
    onDatingAction: (event: GestureResponderEvent) => void;
    datingPlace: any;
}

const DatePlaceNotOpened: React.FC<DatePlaceNotOpenedProps> = ({ onDatingAction, datingPlace }) => {
    const renderTitle = () => (
        <DateInTextMont
            numberOfLines={1}
            style={{
                zIndex: 2,
                fontSize: screenDims.width * 0.04,
                fontFamily: dateInFonts.dateInMontMontserratSemiBold,
                color: 'white',
            }}
        >
            {datingPlace.datePlaceName}
        </DateInTextMont>
    );

    const renderCoords = () => (
        <DateInViewMont
            style={{
                paddingVertical: screenDims.height * 0.01,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            }}
        >
            <DateInImageMont
                source={require('../dateInMontAssts/dateInIcsMont/dateInMontrealPin.png')}
                style={{
                    width: screenDims.height * 0.035,
                    height: screenDims.height * 0.035,
                }}
            />
            <DateInTextMont
                numberOfLines={1}
                style={{
                    color: 'white',
                    marginLeft: screenDims.width * 0.01,
                    fontFamily: dateInFonts.dateInMontMontserratRegular,
                    zIndex: 2,
                    fontSize: screenDims.width * 0.035,
                }}
            >
                {datingPlace.dateMontCoordinates.latitude}, {datingPlace.dateMontCoordinates.longitude}
            </DateInTextMont>
        </DateInViewMont>
    );

    const renderDescription = () => (
        <DateInTextMont
            numberOfLines={4}
            ellipsizeMode="tail"
            style={{
                fontFamily: dateInFonts.dateInMontMontserratRegular,
                color: 'white',
                zIndex: 2,
                maxWidth: screenDims.width * 0.5,
                fontSize: screenDims.width * 0.031,
            }}
        >
            {datingPlace.dateMontDescription}
        </DateInTextMont>
    );

    return (
        <DateInTOpacityMont
            activeOpacity={0.777}
            onPress={onDatingAction}
            style={{
                flexDirection: 'row',
                height: screenDims.height * 0.19,
                marginTop: screenDims.width * 0.03,
                justifyContent: 'space-between',
                borderRadius: screenDims.width * 0.05,
                borderWidth: screenDims.width * 0.001,
                alignItems: 'center',
                borderColor: 'white',
                alignSelf: 'center',
                overflow: 'hidden',
                width: screenDims.width * 0.93045,
            }}
        >
            <BlurView
                blurType="dark"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#ad48231d',
                    borderColor: 'rgba(255,255,255,0.18)',
                    overflow: 'hidden',
                    zIndex: 0,
                }}
            />

            <DateInImageMont
                source={datingPlace.dateMontImage}
                style={{
                    borderRadius: screenDims.width * 0.05,
                    width: screenDims.width * 0.3,
                    zIndex: 1,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    height: screenDims.height * 0.21,
                }}
            />

            <DateInViewMont
                style={{
                    height: '100%',
                    flex: 1,
                    justifyContent: 'flex-start',
                    paddingHorizontal: screenDims.width * 0.021,
                    alignItems: 'flex-start',
                    paddingVertical: screenDims.height * 0.014,
                }}
            >
                {renderTitle()}
                {renderCoords()}
                {renderDescription()}
            </DateInViewMont>

            <DateInTOpacityMont onPress={onDatingAction} activeOpacity={0.8}>
                <DateInImageMont
                    source={require('../dateInMontAssts/dateInIcsMont/dateRightMont.png')}
                    resizeMode="contain"
                    style={{
                        height: screenDims.height * 0.031,
                        right: screenDims.width * 0.019,
                        width: screenDims.height * 0.031,
                    }}
                />
            </DateInTOpacityMont>
        </DateInTOpacityMont>
    );
};

export default DatePlaceNotOpened;
