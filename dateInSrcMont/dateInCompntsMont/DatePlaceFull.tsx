import React,
{ useState, useEffect, useRef } from 'react';
import {
    Text as DateInTextMont,
    Share,
    GestureResponderEvent,
    Image as DateInImageMont,
    Dimensions,
    View as DateInViewMont,
    TouchableOpacity as DateInTOpacityMont,
} from 'react-native';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import MapView, { Marker } from 'react-native-maps'; // Ensure you have react-native-maps installed
import { XCircleIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts as dateInFonts } from '../fonts';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';


interface DatePlaceFullProps {
    onDatingAction: (event: GestureResponderEvent) => void;
    datingPlace: object
}

const DatePlaceFull: React.FC<DatePlaceFullProps> = ({
    datingPlace
}) => {
    const heartAnimRef = useRef<LottieView>(null);
    const [isVisited, setIsVisited] = useState(false);
    const [savedPlaces, setSavedPlaces] = useState<any[]>([]);
    const [isSaved, setIsSaved] = useState(false);
    const [showHeartAnim, setShowHeartAnim] = useState(false);
    const [visitedPlaces, setVisitedPlaces] = useState<any[]>([]);
    const [isDatingMapVisible, setIsDatingMapVisible] = React.useState(false);
    const dateInMontDimens = Dimensions.get('window');

    useEffect(() => {
        const loadSavedDatingMontPlaces = async () => {
            try {
                const jsonDatingValue = await AsyncStorage.getItem('datingPolularMontPlaces');
                const arr = jsonDatingValue ? JSON.parse(jsonDatingValue) : [];
                setSavedPlaces(arr);
                setIsSaved(arr.some((p: any) => p.datePlaceName === datingPlace.datePlaceName));
            } catch (e) { }
        };
        loadSavedDatingMontPlaces();
    }, [datingPlace]);

    const toggleSaveDatingPlaceMont = async () => {
        try {
            let arr = [...savedPlaces];
            if (isSaved) {
                arr = arr.filter((p: any) => p.datePlaceName !== datingPlace.datePlaceName);
            } else {
                arr.push(datingPlace);
                setShowHeartAnim(true);
            }
            await AsyncStorage.setItem('datingPolularMontPlaces', JSON.stringify(arr));
            setSavedPlaces(arr);
            setIsSaved(!isSaved);
        } catch (e) { }
    };

    useEffect(() => {
        const loadVisitedDatingPlaces = async () => {
            try {
                const jsonDatingValue = await AsyncStorage.getItem('datingVisitedMontPlaces');
                const arr = jsonDatingValue ? JSON.parse(jsonDatingValue) : [];
                setVisitedPlaces(arr);
                setIsVisited(arr.some((p: any) => p.datePlaceName === datingPlace.datePlaceName));
            } catch (e) { }
        };
        loadVisitedDatingPlaces();
    }, [datingPlace]);

    const toggleVisitedPlace = async () => {
        try {
            let arr = [...visitedPlaces];
            if (isVisited) {
                arr = arr.filter((p: any) => p.datePlaceName !== datingPlace.datePlaceName);
            } else {
                arr.push(datingPlace);
            }
            await AsyncStorage.setItem('datingVisitedMontPlaces', JSON.stringify(arr));
            setVisitedPlaces(arr);
            setIsVisited(!isVisited);
        } catch (e) { }
    };

    return (
        <DateInViewMont
            activeOpacity={0.777}
            style={styles.dateInRootMont(dateInMontDimens)}
        >
            <BlurView
                style={styles.dateInBlurMont(dateInMontDimens)}
                blurType="dark"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
            />

            <DateInImageMont
                source={datingPlace.dateMontImage}
                style={styles.dateInImageMontFull(dateInMontDimens)}
            />

            <DateInTOpacityMont
                style={styles.dateInVisitedBtnMont(dateInMontDimens, isVisited)}
                onPress={toggleVisitedPlace}
            >
                {isVisited && (
                    <LinearGradient
                        style={styles.dateInVisitedGradientMont(dateInMontDimens)}
                        end={{ x: 0.5, y: 1 }}
                        start={{ x: 0.5, y: 0 }}
                        colors={['#FB6029', '#FEAE06']}
                    />
                )}
                <DateInTextMont style={styles.dateInVisitedTextMont(dateInMontDimens, isVisited)} adjustsFontSizeToFit numberOfLines={1}>
                    {isVisited ? 'Already visited' : 'Mark as visited'}
                </DateInTextMont>
            </DateInTOpacityMont>

            {!isDatingMapVisible ? (
                <DateInViewMont style={styles.dateInContentMont(dateInMontDimens)}>
                    <DateInTextMont
                        style={styles.dateInTitleMont(dateInMontDimens)}
                        numberOfLines={1}
                    >
                        {datingPlace.datePlaceName}
                    </DateInTextMont>

                    <DateInViewMont style={styles.dateInCoordsRowMont(dateInMontDimens)}>
                        <DateInImageMont
                            source={require('../dateInMontAssts/dateInIcsMont/dateInMontrealPin.png')}
                            style={styles.dateInPinMont(dateInMontDimens)}
                        />

                        <DateInTextMont
                            style={styles.dateInCoordsTextMont(dateInMontDimens)}
                        >
                            {datingPlace.dateMontCoordinates.latitude}, {datingPlace.dateMontCoordinates.longitude}
                        </DateInTextMont>
                    </DateInViewMont>

                    <DateInTextMont
                        style={styles.dateInDescMont(dateInMontDimens)}
                    >
                        {datingPlace.dateMontDescription}
                    </DateInTextMont>

                    <DateInViewMont style={styles.dateInActionsRowMont(dateInMontDimens)}>
                        <DateInTOpacityMont style={styles.dateInMapBtnMont(dateInMontDimens)} onPress={() => {
                            setIsDatingMapVisible(true);
                        }}>
                            <LinearGradient
                                end={{ x: 0.5, y: 1 }}
                                start={{ x: 0.5, y: 0 }}
                                style={styles.dateInMapBtnGradientMont(dateInMontDimens)}
                                colors={['#FB6029', '#FEAE06']}
                            />
                            <DateInTextMont style={styles.dateInMapBtnTextMont(dateInMontDimens)} adjustsFontSizeToFit numberOfLines={1}>
                                Open in map
                            </DateInTextMont>
                        </DateInTOpacityMont>

                        <DateInViewMont style={styles.dateInSaveShareRowMont(dateInMontDimens)}>
                            <DateInTOpacityMont style={styles.dateInSaveBtnMont(dateInMontDimens)} onPress={toggleSaveDatingPlaceMont}>
                                {showHeartAnim && (
                                    <LottieView
                                        style={styles.dateInHeartAnimMont(dateInMontDimens)}
                                        source={require('../dateInAnimations/heartsPressed.json')}
                                        loop={false}
                                        autoPlay
                                        onAnimationFinish={() => setShowHeartAnim(false)}
                                        ref={heartAnimRef}
                                    />
                                )}
                                <LinearGradient
                                    start={{ x: 0.5, y: 0 }}
                                    colors={['#FB6029', '#FEAE06']}
                                    style={styles.dateInSaveBtnGradientMont(dateInMontDimens)}
                                    end={{ x: 0.5, y: 1 }}
                                />
                                <DateInImageMont
                                    source={
                                        isSaved
                                            ? require('../dateInMontAssts/dateInIcsMont/dateHeartSavedMont.png')
                                            : require('../dateInMontAssts/dateInIcsMont/dateHeartToSave.png')
                                    }
                                    style={styles.dateInSaveBtnIconMont(dateInMontDimens)}
                                    resizeMode='contain'
                                />
                            </DateInTOpacityMont>

                            <DateInTOpacityMont style={styles.dateInShareBtnMont(dateInMontDimens)} onPress={() => {
                                Share.share({
                                    message: `I know a great place in Montreal for our dating! This is: ${datingPlace?.datePlaceName}`
                                })
                            }}>
                                <LinearGradient
                                    colors={['#FB6029', '#FEAE06']}

                                    style={styles.dateInShareBtnGradientMont(dateInMontDimens)}

                                    start={{ x: 0.5, y: 0 }}

                                    end={{ x: 0.5, y: 1 }}
                                />
                                <DateInImageMont
                                    resizeMode='contain'
                                    style={styles.dateInShareBtnIconMont(dateInMontDimens)}
                                    source={require('../dateInMontAssts/dateInIcsMont/dateToSharing.png')}
                                />
                            </DateInTOpacityMont>
                        </DateInViewMont>
                    </DateInViewMont>
                </DateInViewMont>
            ) : (
                <DateInViewMont style={styles.dateInMapBlockMont(dateInMontDimens)}>
                    <DateInTOpacityMont onPress={() => {
                        setIsDatingMapVisible(false);
                    }} style={styles.dateInMapCloseBtnMont(dateInMontDimens)}>
                        <LinearGradient
                            style={styles.dateInMapCloseGradientMont(dateInMontDimens)}
                            end={{ x: 0.5, y: 1 }}
                            start={{ x: 0.5, y: 0 }}
                            colors={['#FB6029', '#FEAE06']}
                        />
                        <XCircleIcon size={dateInMontDimens.height * 0.03} color='black' />
                    </DateInTOpacityMont>
                    <MapView style={styles.dateInMapMont}
                        initialRegion={{
                            latitude: datingPlace?.dateMontCoordinates?.latitude || 45.5017,
                            longitudeDelta: 0.001,
                            latitudeDelta: 0.001,
                            longitude: datingPlace?.dateMontCoordinates?.longitude || -73.5673,
                        }}
                    >
                        <Marker
                            description={datingPlace?.dateMontDescription}
                            coordinate={{
                                latitude: datingPlace?.dateMontCoordinates?.latitude || 45.5017,
                                longitude: datingPlace?.dateMontCoordinates?.longitude || -73.5673,
                            }}
                            title={datingPlace?.datePlaceName}
                            image={require('../dateInMontAssts/dateInIcsMont/bigPinIco.png')}
                            style={styles.dateInMapPinMont(dateInMontDimens)}
                        />
                    </MapView>
                </DateInViewMont>
            )}

        </DateInViewMont>
    );
};

export default DatePlaceFull;

const styles = StyleSheet.create({
    dateInRootMont: (d: any) => ({
        alignItems: 'center',
        height: d.height * 0.61,
        marginTop: d.height * 0.05,
        overflow: 'hidden',
        borderRadius: d.width * 0.05,
        alignSelf: 'center',
        borderColor: 'white',
        borderWidth: d.width * 0.001,
        width: d.width * 0.93045,
    }),
    dateInBlurMont: (d: any) => ({
        borderColor: 'rgba(255,255,255,0.18)',
        backgroundColor: '#ad48231d',
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        top: 0,
        zIndex: 0,
        position: 'absolute',
    }),
    dateInImageMontFull: (d: any) => ({
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        height: d.height * 0.21,
        zIndex: 1,
        borderRadius: d.width * 0.05,
        width: '100%',
    }),
    dateInVisitedBtnMont: (d: any, visited: boolean) => ({
        borderColor: 'white',
        zIndex: 10,
        borderRadius: d.width * 0.059,
        height: d.height * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: !visited ? d.width * 0.0014 : 0,
        position: 'absolute',
        top: d.height * 0.01,
        width: d.width * 0.5,
        overflow: 'hidden',
        backgroundColor: 'rgba(19, 19, 19, 0.38)',
        alignSelf: 'center',
    }),
    dateInVisitedGradientMont: (d: any) => ({
        zIndex: 0,
        height: '100%',
        width: '100%',
        position: 'absolute',
    }),
    dateInVisitedTextMont: (d: any, visited: boolean) => ({
        fontFamily: dateInFonts.dateInMontMontserratMedium,
        color: visited ? 'black' : 'white',
        fontSize: d.width * 0.0444,
        paddingHorizontal: d.width * 0.05,
    }),
    dateInContentMont: (d: any) => ({
        paddingHorizontal: d.width * 0.021,
        justifyContent: 'flex-start',
        paddingVertical: d.height * 0.014,
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
    }),
    dateInTitleMont: (d: any) => ({
        color: 'white',
        fontSize: d.width * 0.04,
        fontFamily: dateInFonts.dateInMontMontserratBold,
        zIndex: 2,
    }),
    dateInCoordsRowMont: (d: any) => ({
        paddingVertical: d.height * 0.023,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    }),
    dateInPinMont: (d: any) => ({
        width: d.height * 0.035,
        height: d.height * 0.035,
    }),
    dateInCoordsTextMont: (d: any) => ({
        zIndex: 2,
        fontSize: d.width * 0.037,
        fontFamily: dateInFonts.dateInMontMontserratRegular,
        marginLeft: d.width * 0.01,
        color: 'white',
    }),
    dateInDescMont: (d: any) => ({
        color: 'white',
        fontSize: d.width * 0.035,
        fontFamily: dateInFonts.dateInMontMontserratRegular,
        zIndex: 2,
    }),
    dateInActionsRowMont: (d: any) => ({
        marginTop: d.height * 0.04,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: d.height * 0.01,
        alignSelf: 'center',
        alignItems: 'center',
    }),
    dateInMapBtnMont: (d: any) => ({
        width: d.width * 0.5,
        borderRadius: d.width * 0.1,
        justifyContent: 'center',
        height: d.height * 0.059,
        alignItems: 'center',
        alignSelf: 'center',
    }),
    dateInMapBtnGradientMont: (d: any) => ({
        zIndex: 0,
        position: 'absolute',
        borderRadius: d.width * 0.07,
        height: '100%',
        width: '100%',
    }),
    dateInMapBtnTextMont: (d: any) => ({
        paddingHorizontal: d.width * 0.05,
        color: 'black',
        fontSize: d.width * 0.0444,
        fontFamily: dateInFonts.dateInMontMontserratMedium,
    }),
    dateInSaveShareRowMont: (d: any) => ({
        alignSelf: 'center',
        alignItems: 'center',
        gap: d.width * 0.025,
        justifyContent: 'space-between',
        flexDirection: 'row',
    }),
    dateInSaveBtnMont: (d: any) => ({
        justifyContent: 'center',
        borderRadius: d.width * 0.03,
        width: d.height * 0.059,
        overflow: 'visible',
        height: d.height * 0.059,
        alignItems: 'center',
        alignSelf: 'center',
    }),
    dateInHeartAnimMont: (d: any) => ({
        pointerEvents: 'none',
        width: d.height * 0.22,
        zIndex: 1,
        height: d.height * 0.22,
        top: -d.height * 0.082,
        left: -d.height * 0.08,
        position: 'absolute',
    }),
    dateInSaveBtnGradientMont: (d: any) => ({
        position: 'absolute',
        borderRadius: d.width * 0.03,
        width: '100%',
        height: '100%',
        zIndex: 0,
    }),
    dateInSaveBtnIconMont: (d: any) => ({
        width: d.height * 0.035,
        height: d.height * 0.035,
    }),
    dateInShareBtnMont: (d: any) => ({
        overflow: 'hidden',
        borderRadius: d.width * 0.03,
        width: d.height * 0.059,
        justifyContent: 'center',
        height: d.height * 0.059,
        alignItems: 'center',
        alignSelf: 'center',
    }),
    dateInShareBtnGradientMont: (d: any) => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0,
    }),
    dateInShareBtnIconMont: (d: any) => ({
        height: d.height * 0.028,

        width: d.height * 0.028,
    }),
    dateInMapBlockMont: (d: any) => ({
        marginTop: d.height * 0.05,
        height: d.height * 0.28,
        borderRadius: d.width * 0.05,
        width: '91%',
        overflow: 'hidden',
    }),
    dateInMapCloseBtnMont: (d: any) => ({
        alignItems: 'center',
        position: 'absolute',
        justifyContent: 'center',
        top: d.height * 0.010435,
        width: d.height * 0.0444,
        height: d.height * 0.0444,
        borderRadius: d.width * 0.1,
        overflow: 'hidden',
        zIndex: 555,
        left: d.width * 0.03,
    }),
    dateInMapCloseGradientMont: (d: any) => ({
        zIndex: 0,
        width: '100%',
        position: 'absolute',
        height: '100%',
    }),
    dateInMapMont: {
        width: '100%',

        height: '100%',
    },
    dateInMapPinMont: (d: any) => ({
        width: d.height * 0.035,

        height: d.height * 0.035,
    }),
});