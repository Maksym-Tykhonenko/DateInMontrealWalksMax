import DatePlaceFull from '../dateInCompntsMont/DatePlaceFull';
import DateInHeartsBtn from '../dateInCompntsMont/DateInHeartsBtn';
import { StyleSheet } from 'react-native';
import DatePlaceNotOpened from '../dateInCompntsMont/DatePlaceNotOpened';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts as dateInFonts } from '../fonts';
interface DateInMontPopularPlacesPageProps {
    setDateInMontEkran: (page: string) => void;
}

import React, { useRef as useDateRef, useEffect } from 'react';
import dateInMontPlacesData from '../dateInDannyMont/dateInMontPlacesData';
import { ScrollView as DateInScrollingMont } from 'react-native-gesture-handler';
import {
    Image as DateInImageMont,
    Animated as DateAnimatedWalks,
    View as DateInViewMont,
    Dimensions as DateDimensionWalks,
    Text as DateTextWalks,
    TouchableOpacity as DateInTOpacityMont,
}
    from 'react-native';


const topCategories = [
    {
        topTitle: 'Enchanting walks',
        topImage: require('../dateInMontAssts/dateInMontImages/topDatingPlaces/dateWalksIcon.png'),
    },
    {
        topTitle: 'Atmosphere and taste',
        topImage: require('../dateInMontAssts/dateInMontImages/topDatingPlaces/dateAtmosphereIcon.png'),
    },
    {
        topTitle: 'Moments that you want to preserve',
        topImage: require('../dateInMontAssts/dateInMontImages/topDatingPlaces/dateMomentsIcon.png'),
    },
]


const DateInMontPopularPlacesPage: React.FC<DateInMontPopularPlacesPageProps> = ({ setDateInMontEkran, dateInMontEkran }) => {
    
    const [isDatingPlaceDetailsVisible, setIsDatingPlaceDetailsVisible] = React.useState(false);
    const dateInMontDimens = DateDimensionWalks.get('window');
    
    const [visitedPlaces, setVisitedPlaces] = React.useState<any[]>([]);
    const [isCategorySelected, setIsCategorySelected] = React.useState(false);
    const [selectedDatingCategory, setSelectedDatingCategory] = React.useState<string | null>(null);
    const slideAnim = useDateRef(new DateAnimatedWalks.Value(20)).current;
    const [selectedDatingPlace, setSelectedDatingPlace] = React.useState<object | null>(null);
    
    const [savedPlaces, setSavedPlaces] = React.useState<any[]>([]);
    const fadeAnim = useDateRef(new DateAnimatedWalks.Value(0)).current;

    useEffect(() => {
        const loadSavedDatingPlaces = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('datingPolularMontPlaces');
                const arr = jsonValue ? JSON.parse(jsonValue) : [];
                setSavedPlaces(arr);
            } catch (e) { }
        };
        loadSavedDatingPlaces();
    }, [isDatingPlaceDetailsVisible, dateInMontEkran]);

    useEffect(() => {
        const loadVisitedPlaces = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('datingVisitedMontPlaces');
                const arr = jsonValue ? JSON.parse(jsonValue) : [];
                setVisitedPlaces(arr);
            } catch (e) { }
        };
        loadVisitedPlaces();
    }, [isDatingPlaceDetailsVisible, dateInMontEkran]);

    useEffect(() => {
        console.log('saved places:', savedPlaces);

        console.log('visited places:', visitedPlaces);
    }, [savedPlaces, visitedPlaces]);

    useEffect(() => {
        DateAnimatedWalks.parallel([
            DateAnimatedWalks.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            DateAnimatedWalks.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    const getDatingPlaceArr = () => {
        if (dateInMontEkran === 'Popular places') {
            return dateInMontPlacesData.filter(place => place.dateMontCategory === selectedDatingCategory);
        } else if (dateInMontEkran === 'Saved locations') {
            return savedPlaces;
        } else if (dateInMontEkran === 'Places visited') {
            return visitedPlaces;
        } else return [];
    }

    const datingPlaces = getDatingPlaceArr();

    return (
        <DateInViewMont style={styles.root}>
            <DateInViewMont style={styles.headerRow(dateInMontDimens)}>
                <DateInViewMont style={styles.headerIconBlock(dateInMontDimens)}>
                    <LinearGradient
                        style={styles.headerGradient}
                        end={{ x: 1, y: 1 }}
                        start={{ x: 0, y: 0 }}
                        colors={['#0c0a09ff', '#fb7b1c']}
                    />
                    <BlurView
                        reducedTransparencyFallbackColor="white"
                        blurType="dark"
                        blurAmount={18}
                        style={styles.headerBlur}
                    />
                    <DateInImageMont
                        source={require('../dateInMontAssts/dateInMontImages/dateWalksIcon.png')}
                        style={styles.headerIcon(dateInMontDimens)}
                    />
                </DateInViewMont>
                <DateInHeartsBtn
                    buttonHeight={dateInMontDimens.height * 0.07}
                    buttonWidth={dateInMontDimens.width * 0.640354}
                    fontSize={dateInMontDimens.width * 0.08}
                    onPress={() => {
                        if (isDatingPlaceDetailsVisible) {
                            setIsDatingPlaceDetailsVisible(false);
                        }
                        else if (isCategorySelected) {
                            setIsCategorySelected(false);
                        } else setDateInMontEkran('Date In Montreal Walks Home');
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
                    <DateInViewMont style={styles.heartsBtnRow(dateInMontDimens)}>
                        <DateInImageMont
                            source={require('../dateInMontAssts/dateInIcsMont/dateInBack.png')}
                            style={styles.heartsBtnIcon(dateInMontDimens)}
                            resizeMode='contain'
                        />
                        <DateTextWalks style={styles.heartsBtnText(dateInMontDimens)}>
                            {dateInMontEkran}
                        </DateTextWalks>
                        <DateInViewMont style={styles.heartsBtnSpacer(dateInMontDimens)} />
                    </DateInViewMont>
                </DateInHeartsBtn>
            </DateInViewMont>

            {dateInMontEkran !== 'Popular places' && datingPlaces.length === 0 && (
                <DateInViewMont style={styles.emptyBlock(dateInMontDimens)}>
                    <LinearGradient
                        end={{ x: 0.5, y: 1 }}
                        colors={['#FB6029', '#FEAE06']}
                        style={styles.emptyGradient(dateInMontDimens)}
                        start={{ x: 0.5, y: 0 }}
                    />
                    <DateTextWalks style={styles.emptyText(dateInMontDimens)} adjustsFontSizeToFit numberOfLines={1}>
                        You haven't {dateInMontEkran === 'Places visited' ? 'visited' : 'saved'} the location yet
                    </DateTextWalks>
                </DateInViewMont>
            )}

            {!isCategorySelected && dateInMontEkran === 'Popular places' && (
                <>
                    <DateTextWalks style={styles.selectCategoryText(dateInMontDimens)}>
                        Select a category:
                    </DateTextWalks>
                    <DateInScrollingMont
                        style={styles.categoryScroll(dateInMontDimens)}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.categoryScrollContent(dateInMontDimens)}
                    >
                        {topCategories.map((category, index) => (
                            <DateInTOpacityMont
                                onPress={() => {
                                    setSelectedDatingCategory(category.topTitle);
                                    setIsCategorySelected(true);
                                }}
                                key={index}
                                style={styles.categoryBtn(dateInMontDimens)}
                                activeOpacity={0.75}
                            >
                                <DateInImageMont
                                    source={category.topImage}
                                    style={styles.categoryImg}
                                />
                                <DateInViewMont style={styles.categoryTitleBlock(dateInMontDimens)}>
                                    <LinearGradient
                                        style={styles.categoryTitleGradient(dateInMontDimens)}
                                        end={{ x: 0.5, y: 1 }}
                                        start={{ x: 0.5, y: 0 }}
                                        colors={['#FB6029', '#FEAE06']}
                                    />
                                    <DateTextWalks key={index} style={styles.categoryTitleText(dateInMontDimens)} adjustsFontSizeToFit numberOfLines={1}>
                                        {category.topTitle}
                                    </DateTextWalks>
                                </DateInViewMont>
                            </DateInTOpacityMont>
                        ))}
                    </DateInScrollingMont>
                </>
            )}

            {((dateInMontEkran === 'Popular places' && isCategorySelected) || (dateInMontEkran !== 'Popular places')) && (
                !isDatingPlaceDetailsVisible ? (
                    <DateInScrollingMont
                        showsVerticalScrollIndicator={false}
                        style={styles.placesScroll(dateInMontDimens)}
                        contentContainerStyle={styles.placesScrollContent(dateInMontDimens)}
                    >
                        {datingPlaces.map((place, index) => (
                            <DatePlaceNotOpened
                                key={index}
                                datingPlace={place}
                                onDatingAction={() => {
                                    setSelectedDatingPlace(place);
                                    setIsDatingPlaceDetailsVisible(true);
                                }}
                            />
                        ))}
                    </DateInScrollingMont>
                ) : (
                    <DatePlaceFull
                        datingPlace={selectedDatingPlace}
                        onDatingAction={() => {
                            // handlePlacePress(place)
                        }}
                    />
                )
            )}
        </DateInViewMont>
    );
};

export default DateInMontPopularPlacesPage;

const styles = StyleSheet.create({
    root: { flex: 1 },
    headerRow: (d: any) => ({
        paddingBottom: d.width * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        width: d.width * 0.90546,
    }),
    headerIconBlock: (d: any) => ({
        borderColor: 'white',
        alignSelf: 'center',
        width: d.width * 0.25,
        borderWidth: d.width * 0.001,
        height: d.width * 0.25,
        justifyContent: 'center',
        borderRadius: d.width * 0.05,
        alignItems: 'center',
        overflow: 'hidden',
    }),
    headerGradient: { position: 'absolute', width: '100%', height: '100%', zIndex: -1 },
    headerBlur: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderColor: 'rgba(255,255,255,0.18)', overflow: 'hidden', backgroundColor: 'rgba(30,30,30,0.25)', zIndex: 0 },
    headerIcon: (d: any) => ({
        borderRadius: d.width * 0.05,
        zIndex: 1,
        height: d.width * 0.21,
        width: d.width * 0.21,
    }),
    heartsBtnRow: (d: any) => ({
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: d.width * 0.031,
    }),
    heartsBtnIcon: (d: any) => ({
        width: d.height * 0.028,
        height: d.height * 0.028,
    }),
    heartsBtnText: (d: any) => ({
        color: 'black',
        fontSize: d.width * 0.0431,
        fontFamily: dateInFonts.dateInMontMontserratSemiBold,
    }),
    heartsBtnSpacer: (d: any) => ({
        width: d.height * 0.028,
        height: d.height * 0.028,
        opacity: 0,
    }),
    emptyBlock: (d: any) => ({
        justifyContent: 'center',
        borderRadius: d.width * 0.1,
        marginTop: d.height * 0.3,
        alignItems: 'center',
        height: d.height * 0.068,
        width: d.width * 0.930345,
        alignSelf: 'center',
    }),
    emptyGradient: (d: any) => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: d.width * 0.07,
        zIndex: 0,
    }),
    emptyText: (d: any) => ({
        paddingHorizontal: d.width * 0.05,
        fontSize: d.width * 0.0444,
        color: 'black',
        fontFamily: dateInFonts.dateInMontMontserratMedium,
    }),
    selectCategoryText: (d: any) => ({
        color: 'white',
        marginTop: d.height * 0.025,
        alignSelf: 'center',
        fontFamily: dateInFonts.dateInMontMontserratSemiBold,
        fontSize: d.width * 0.055,
    }),
    categoryScroll: (d: any) => ({
        width: d.width * 0.90546,
        alignSelf: 'center',
    }),
    categoryScrollContent: (d: any) => ({
        paddingBottom: d.height * 0.1,
    }),
    categoryBtn: (d: any) => ({
        alignSelf: 'center',
        marginTop: d.height * 0.031043,
        width: d.width * 0.80465,
        justifyContent: 'center',
        borderRadius: d.width * 0.07,
        height: d.height * 0.3,
        alignItems: 'center',
        overflow: 'hidden',
    }),
    categoryImg: { width: '100%', height: '100%', position: 'absolute' },
    categoryTitleBlock: (d: any) => ({
        maxWidth: d.width * 0.7,
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: d.width * 0.07,
        height: d.height * 0.05,
        alignItems: 'center',
        bottom: d.height * 0.019,
    }),
    categoryTitleGradient: (d: any) => ({
        zIndex: 0,
        borderRadius: d.width * 0.07,
        width: '100%',
        height: '100%',
        position: 'absolute',
    }),
    categoryTitleText: (d: any) => ({
        paddingHorizontal: d.width * 0.05,
        fontSize: d.width * 0.04,
        color: 'black',
        fontFamily: dateInFonts.dateInMontMontserratSemiBold,
    }),
    placesScroll: (d: any) => ({ flex: 1 }),
    placesScrollContent: (d: any) => ({
        paddingBottom: d.height * 0.1,
    }),
});
