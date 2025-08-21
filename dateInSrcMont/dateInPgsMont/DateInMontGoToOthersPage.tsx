import DateInHeartsBtn from '../dateInCompntsMont/DateInHeartsBtn';
import React, { useState, useEffect, useRef } from 'react';
import {
    Animated,
    Text as DateInTextMont,
    View as DateInViewMont,
    TouchableOpacity as DateInTOpacityMont,
    Platform,
    SafeAreaView,
    Image as DateInImageMont,
    Dimensions as DateInMontDimension,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';


const dateInMontButtons = [
    'Popular places',
    'Places visited',
];

interface DateInMontGoToOthersPageProps {
    setDateInMontEkran: (page: string) => void;
}

const dateInMontRowButtons = [
    {
        dateScreen: 'Dating Map',
        dateIcon: require('../dateInMontAssts/dateInIcsMont/dateMapIcon.png'),
    },
    {
        dateScreen: 'Saved locations',
        dateIcon: require('../dateInMontAssts/dateInIcsMont/dateHeartIcon.png'),
    },
];

import { fonts as dateInFonts } from '../fonts';


const styles = {
    dateMainBlockIn: (dimens: any) => ({
        height: dimens.height * 0.268988,
        width: dimens.width * 0.930435,
        justifyContent: 'flex-end',
        borderRadius: dimens.width * 0.05,
        alignItems: 'center',
        backgroundColor: 'rgba(30,30,30,0.25)',
        borderWidth: dimens.width * 0.001,
        borderColor: 'white',
        overflow: 'hidden',
    }),
    dateBlurIn: (dimens: any) => ({
        overflow: 'hidden',
        backgroundColor: 'rgba(30,30,30,0.25)',
        top: 0,
        height: '100%',
        left: 0,
        width: '100%',
        position: 'absolute',
        borderRadius: dimens.width * 0.05,
        borderColor: 'rgba(255,255,255,0.18)',
    }),
    womanImg: (dimens: any) => ({
        bottom: -dimens.height * 0.03,
        left: -dimens.width * 0.05,
        height: dimens.height * 0.28,
        position: 'absolute',
        width: dimens.width * 0.4,
    }),
    dateRootIn: (dimens: any) => ({
        alignSelf: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : dimens.height * 0.280435,
        width: dimens.width,
    }),
    dateContentBlockIn: (dimens: any) => ({
        height: '100%',
        alignSelf: 'flex-end',
        paddingHorizontal: dimens.width * 0.05,
        paddingVertical: dimens.height * 0.021023,
        width: '80%',
    }),
    catchTitle: (dimens: any) => ({
        textAlign: 'center',
        fontSize: dimens.width * 0.05,
        color: 'white',
        fontFamily: dateInFonts.dateInMontMontserratSemiBold,
    }),
    heartBlock: (dimens: any) => ({
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: dimens.height * 0.025023,
        marginLeft: dimens.width * 0.08,
        height: dimens.height * 0.14,
        borderRadius: dimens.width * 0.05,
        borderColor: '#FEAE06',
        backgroundColor: 'black',
        borderWidth: dimens.width * 0.003,
        marginTop: dimens.height * 0.02,
        alignItems: 'center',
        width: '88%',
    }),
    heartImg: (dimens: any) => ({
        marginHorizontal: dimens.width * 0.012,
        height: dimens.height * 0.04,
        width: dimens.height * 0.04,
    }),
    message: (dimens: any) => ({
        padding: 10,
        fontFamily: dateInFonts.dateInMontMontserratSemiBold,
        textAlign: 'center',
        fontSize: dimens.width * 0.04,
        color: 'white',
    }),
    objectiveRow: (dimens: any) => ({
        alignItems: 'center',
        paddingHorizontal: dimens.width * 0.05,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: dimens.height * 0.004,
        width: '80%',
    }),
    objectiveText: (dimens: any) => ({
        fontFamily: dateInFonts.dateInMontMontserratSemiBold,
        color: 'white',
        fontSize: dimens.width * 0.04,
        textAlign: 'center',
    }),
    bottomBlock: (dimens: any) => ({
        borderWidth: dimens.width * 0.001,
        bottom: dimens.height * 0.080456,
        alignSelf: 'center',
        borderRadius: dimens.width * 0.05,
        width: dimens.width * 0.90546,
        overflow: 'hidden',
        alignItems: 'center',
        borderColor: 'white',
        position: 'absolute',
    }),
    gradient: {
        zIndex: -1,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    blurBottom: {
        backgroundColor: 'rgba(30,30,30,0.25)',
        top: 0,
        left: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        borderColor: 'rgba(255,255,255,0.18)',
        overflow: 'hidden',
        position: 'absolute',
    },
    bottomBtns: (dimens: any) => ({
        paddingVertical: dimens.height * 0.016,
    }),
    rowBtns: (dimens: any) => ({
        paddingBottom: dimens.height * 0.016,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    }),
    rowBtnImg: (dimens: any) => ({
        height: dimens.height * 0.04,
        width: dimens.height * 0.04,
    }),
};

const DateInMontGoToOthersPage: React.FC<DateInMontGoToOthersPageProps> = ({ setDateInMontEkran }) => {
    // Time logic
    const now = new Date();
    const hours = now.getHours();
    const isMorning = hours >= 0 && hours < 12;
    const dateInMontDimens = DateInMontDimension.get('window');
    const isEvening = hours >= 12 && hours < 24;

    // State for caught hearts

    const [morningHearts, setMorningHearts] = useState(0);
    const [eveningHearts, setEveningHearts] = useState(0);
    // Animation for flying heart
    const flyAnim = useRef(new Animated.Value(0)).current;
    const [showHeart, setShowHeart] = useState(true);


    // Only allow catching if less than 5 hearts in current period
    const canCatch = (isMorning && morningHearts < 5) || (isEvening && eveningHearts < 5);

    // Animate heart flying in
    useEffect(() => {
        if (canCatch && showHeart) {
            flyAnim.setValue(0);
            Animated.timing(flyAnim, {
                toValue: 1,
                duration: 1800,
                useNativeDriver: true,
            }).start();
        }
    }, [showHeart, canCatch, flyAnim]);

    // Handler for catching heart
    const handleCatchHeart = () => {
        if (!canCatch) return;
        if (isMorning && morningHearts < 5) {
            setMorningHearts(morningHearts + 1);
        } else if (isEvening && eveningHearts < 5) {
            setEveningHearts(eveningHearts + 1);
        }
        setShowHeart(false);
        setTimeout(() => setShowHeart(true), 800); // Show next heart after short delay
    };

    // Counter for UI
    const caughtCount = isMorning ? morningHearts : isEvening ? eveningHearts : 0;

    return (
        <DateInViewMont style={styles.dateRootIn(dateInMontDimens)}>
            <SafeAreaView />

            <DateInViewMont style={styles.dateMainBlockIn(dateInMontDimens)}>
                <BlurView style={styles.dateBlurIn(dateInMontDimens)}
                    blurType="dark"
                    blurAmount={18}
                    reducedTransparencyFallbackColor="white"
                />
                <DateInImageMont
                    source={require('../dateInMontAssts/dateInMontImages/womanWithLike.png')}
                    style={styles.womanImg(dateInMontDimens)}
                    resizeMode='contain'
                />

                <DateInViewMont style={styles.dateContentBlockIn(dateInMontDimens)}>
                    {canCatch && showHeart && (
                        <DateInTextMont style={styles.catchTitle(dateInMontDimens)}>
                            Catch the heart
                        </DateInTextMont>
                    )}

                    {canCatch && showHeart ? (
                        <DateInViewMont style={styles.heartBlock(dateInMontDimens)}>
                            <Animated.View
                                style={{
                                    position: 'absolute',
                                    transform: [
                                        {
                                            translateX: flyAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, 70],
                                            }),
                                        },
                                        {
                                            translateY: flyAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [30, 0],
                                            }),
                                        },
                                    ],
                                    opacity: flyAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.7, 1],
                                    }),
                                }}
                            >
                                <DateInTOpacityMont onPress={handleCatchHeart}>
                                    <DateInImageMont
                                        source={require('../dateInMontAssts/dateInMontImages/dateHeartWithWings.png')}
                                        style={styles.heartImg(dateInMontDimens)}
                                        resizeMode='contain'
                                    />
                                </DateInTOpacityMont>
                            </Animated.View>
                        </DateInViewMont>
                    ) : !canCatch ? (
                        <DateInTextMont style={styles.message(dateInMontDimens)}>
                            Take a walk together to a coffee shop, order different drinks, and swap cups — let the taste of the day be a surprise.
                        </DateInTextMont>
                    ) : null}

                    {canCatch && showHeart && (
                        <DateInViewMont style={styles.objectiveRow(dateInMontDimens)}>
                            <DateInTextMont style={styles.objectiveText(dateInMontDimens)}>
                                Objective:
                            </DateInTextMont>
                            <DateInImageMont
                                source={require('../dateInMontAssts/dateInMontImages/dateHeartWithWings.png')}
                                style={styles.heartImg(dateInMontDimens)}
                                resizeMode='contain'
                            />
                            <DateInTextMont style={styles.objectiveText(dateInMontDimens)}>
                                {caughtCount}/5
                            </DateInTextMont>
                        </DateInViewMont>
                    )}
                </DateInViewMont>
            </DateInViewMont>

            <DateInViewMont style={styles.bottomBlock(dateInMontDimens)}>
                <LinearGradient
                    colors={['#0c0a09ff', '#fb7b1c']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                />

                <BlurView style={styles.blurBottom}
                    blurType="dark"
                    blurAmount={18}
                    reducedTransparencyFallbackColor="white"
                />

                <DateInViewMont style={styles.bottomBtns(dateInMontDimens)}>
                    {dateInMontButtons.map((page, index) => (
                        <DateInViewMont key={index}>
                            <DateInHeartsBtn
                                dragonPlantPropsLabel={page}
                                fontSize={dateInMontDimens.width * 0.08}
                                buttonWidth={dateInMontDimens.width * 0.78}
                                buttonHeight={dateInMontDimens.height * 0.073}
                                onPress={() => { setDateInMontEkran(page); }}
                                textStyle={{
                                    color: 'black',
                                    fontSize: dateInMontDimens.width * 0.05,
                                    zIndex: 5
                                }}
                                buttonStyle={{
                                    borderRadius: dateInMontDimens.width * 0.1,
                                }}
                            />
                        </DateInViewMont>
                    ))}
                </DateInViewMont>

                <DateInViewMont style={styles.rowBtns(dateInMontDimens)}>
                    {dateInMontRowButtons.map((page, index) => (
                        <DateInViewMont key={index}>
                            <DateInHeartsBtn
                                dragonPlantPropsLabel={page.dateScreen}
                                fontSize={dateInMontDimens.width * 0.08}
                                buttonWidth={dateInMontDimens.height * 0.1}
                                buttonHeight={dateInMontDimens.height * 0.1}
                                onPress={() => { setDateInMontEkran(page.dateScreen); }}
                                textStyle={{
                                    color: 'black',
                                    fontSize: dateInMontDimens.width * 0.05,
                                    zIndex: 5
                                }}
                                buttonStyle={{
                                    borderRadius: dateInMontDimens.width * 0.05,
                                }}
                                imageResizeMode="cover"
                            >
                                <DateInImageMont
                                    source={page.dateIcon}
                                    style={styles.rowBtnImg(dateInMontDimens)}
                                    resizeMode='contain'
                                />
                            </DateInHeartsBtn>
                        </DateInViewMont>
                    ))}
                </DateInViewMont>
            </DateInViewMont>
        </DateInViewMont>
    );
};

export default DateInMontGoToOthersPage;
