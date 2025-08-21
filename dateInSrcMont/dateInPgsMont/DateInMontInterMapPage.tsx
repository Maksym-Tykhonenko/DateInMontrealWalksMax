import React from 'react';

interface DateInMontInterMapPageProps {
    datingPlace: object;
    setDateInMontEkran: React.Dispatch<React.SetStateAction<any>>;
    onDatingAction: (event: GestureResponderEvent) => void;
}

import {
    Image as DateInImageMont,
    View as DateInViewMont,
    Text as DateInTextMont,
    GestureResponderEvent,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import DatePlaceNotOpened from '../dateInCompntsMont/DatePlaceNotOpened';
import { BlurView } from '@react-native-community/blur';
import DatePlaceFull from '../dateInCompntsMont/DatePlaceFull';
import LinearGradient from 'react-native-linear-gradient';
import DateInHeartsBtn from '../dateInCompntsMont/DateInHeartsBtn';
import { fonts as dateInFonts } from '../fonts';
import dateInMontPlacesData from '../dateInDannyMont/dateInMontPlacesData';
import MapView, { Marker } from 'react-native-maps'; // Ensure you have react-native-maps installed



const DateInMontInterMapPage: React.FC<DateInMontInterMapPageProps> = ({
    setDateInMontEkran,
}) => {
    const dateInMontDimens = Dimensions.get('window');
    const [isDatingPlaceDetailsVisible, setIsDatingPlaceDetailsVisible] = React.useState(false);
    const [selectedDatingPlace, setSelectedDatingPlace] = React.useState<object | null>(null);


    return (
        <TouchableWithoutFeedback onPress={() => {
            if (isDatingPlaceDetailsVisible) {
                setIsDatingPlaceDetailsVisible(false);
            } else {
                setSelectedDatingPlace(null)
            }
        }}>
            <DateInViewMont style={{ flex: 1 }}>
                <DateInViewMont
                    style={{
                        paddingBottom: dateInMontDimens.width * 0.03,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignSelf: 'center',
                        alignItems: 'center',
                        width: dateInMontDimens.width * 0.90546,
                    }}
                >
                    <DateInViewMont
                        style={{
                            borderWidth: dateInMontDimens.width * 0.001,
                            alignItems: 'center',
                            borderRadius: dateInMontDimens.width * 0.05,
                            width: dateInMontDimens.width * 0.25,
                            height: dateInMontDimens.width * 0.25,
                            justifyContent: 'center',
                            borderColor: 'white',
                            overflow: 'hidden',
                            alignSelf: 'center',
                        }}
                    >
                        <LinearGradient
                            colors={['#0c0a09ff', '#fb7b1c']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={{
                                zIndex: -1,
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                            }}
                        />

                        <BlurView
                            style={{
                                zIndex: 0,
                                overflow: 'hidden',
                                position: 'absolute',
                                left: 0,
                                backgroundColor: 'rgba(30,30,30,0.25)',
                                width: '100%',

                                borderColor: 'rgba(255,255,255,0.18)',
                                height: '100%',
                                top: 0,
                            }}
                            blurType="dark"
                            blurAmount={18}
                            reducedTransparencyFallbackColor="white"
                        />

                        <DateInImageMont
                            source={require('../dateInMontAssts/dateInMontImages/dateWalksIcon.png')}
                            style={{
                                borderRadius: dateInMontDimens.width * 0.05,
                                zIndex: 1,
                                height: dateInMontDimens.width * 0.21,
                                width: dateInMontDimens.width * 0.21,
                            }}
                        />
                    </DateInViewMont>

                    <DateInHeartsBtn
                        fontSize={dateInMontDimens.width * 0.08}
                        buttonWidth={dateInMontDimens.width * 0.640354}
                        buttonHeight={dateInMontDimens.height * 0.07}
                        onPress={() => {
                            setDateInMontEkran('Date In Montreal Walks Home');
                        }}
                        textStyle={{
                            color: 'black',
                            fontSize: dateInMontDimens.width * 0.05,
                            zIndex: 5
                        }}
                        buttonStyle={{
                            borderRadius: dateInMontDimens.width * 0.1,
                        }}
                        imageResizeMode="cover"
                    >
                        <DateInViewMont style={{
                            width: '100%',
                            alignItems: 'center',
                            paddingHorizontal: dateInMontDimens.width * 0.031,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>
                            <DateInImageMont
                                source={require('../dateInMontAssts/dateInIcsMont/dateInBack.png')}
                                style={{
                                    width: dateInMontDimens.height * 0.028,
                                    height: dateInMontDimens.height * 0.028,
                                }}
                                resizeMode='contain'
                            />
                            <DateInTextMont
                                style={{
                                    color: 'black',
                                    fontSize: dateInMontDimens.width * 0.0431,
                                    fontFamily: dateInFonts.dateInMontMontserratSemiBold
                                }}
                            >
                                Dating Map
                            </DateInTextMont>

                            <DateInViewMont style={{
                                width: dateInMontDimens.height * 0.028,
                                height: dateInMontDimens.height * 0.028, opacity: 0
                            }} />
                        </DateInViewMont>
                    </DateInHeartsBtn>
                </DateInViewMont>
                <DateInViewMont style={{
                    width: dateInMontDimens.width,
                    height: dateInMontDimens.height,
                }}>
                    <MapView style={{
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                    }}
                        initialRegion={{
                            longitudeDelta: 0.001,
                            latitudeDelta: 0.001,
                            longitude: dateInMontPlacesData[0]?.dateMontCoordinates?.longitude || -73.5673,
                            latitude: dateInMontPlacesData[0]?.dateMontCoordinates?.latitude || 45.5017,
                        }}
                    >
                        {dateInMontPlacesData.map((place, idx) => (
                            <Marker
                                key={idx}
                                coordinate={{
                                    latitude: place?.dateMontCoordinates?.latitude || 45.5017,
                                    longitude: place?.dateMontCoordinates?.longitude || -73.5673,
                                }}
                                image={require('../dateInMontAssts/dateInIcsMont/bigPinIco.png')}
                                onPress={() => {
                                    setSelectedDatingPlace(place);
                                }}
                            />
                        ))}
                    </MapView>
                </DateInViewMont>

                {selectedDatingPlace && (
                    !isDatingPlaceDetailsVisible ? (
                        <DateInViewMont style={{
                            zIndex: 10,
                            bottom: dateInMontDimens.height * 0.05,
                            alignSelf: 'center',
                            position: 'absolute',
                        }}>
                            <DatePlaceNotOpened
                                datingPlace={selectedDatingPlace}
                                onDatingAction={() => {
                                    setIsDatingPlaceDetailsVisible(true);
                                }}
                            />
                        </DateInViewMont>
                    ) : (
                        <DateInViewMont style={{
                            zIndex: 10,
                            marginTop: dateInMontDimens.height * 0.14,
                            alignSelf: 'center',
                            position: 'absolute',
                        }}>
                            <DatePlaceFull
                                datingPlace={selectedDatingPlace}
                                onDatingAction={() => {
                                    // handlePlacePress(place)
                                }}
                            />
                        </DateInViewMont>
                    )
                )}
            </DateInViewMont>
        </TouchableWithoutFeedback>
    );
};

export default DateInMontInterMapPage;