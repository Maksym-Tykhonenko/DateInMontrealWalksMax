import React, { type ReactNode } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { fonts } from '../fonts';

const winWidth = Dimensions.get('window').width;

interface DragonRedButtonProps {
  buttonHeight?: number;
  dragonPlantPropsLabel?: string;
  fontSize?: number;
  onPress: (event: GestureResponderEvent) => void;
  buttonWidth?: number;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: ReactNode;
  imageResizeMode?: 'cover' | 'contain' | 'stretch';
}

const DateInHeartsBtn: React.FC<DragonRedButtonProps> = props => {
  const {
    buttonHeight = winWidth * 0.275,
    dragonPlantPropsLabel,
    fontSize = winWidth * 0.053,
    onPress,
    buttonWidth = winWidth * 0.8,
    buttonStyle,
    textStyle,
    children,
    imageResizeMode = 'stretch',
  } = props;

  const backgroundSource = require('../dateInMontAssts/dateInMontImages/dateInMontrealButtonImage.png');

  const renderLabel = () => {
    if (children) return children;
    return (
      <Text style={[styles.dateInLabelMontreal, { fontSize }, textStyle]}>
        {dragonPlantPropsLabel}
      </Text>
    );
  };

  return (
    <TouchableOpacity
      style={[{
        margin: 8,
        overflow: 'hidden',
      }, buttonStyle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={backgroundSource}
        resizeMode={imageResizeMode}
        style={[styles.dateInBackMontreal, { width: buttonWidth, height: buttonHeight }]}
      >
        {renderLabel()}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dateInBackMontreal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateInLabelMontreal: {
    letterSpacing: 1,
    color: 'white',
    textAlign: 'center',
    fontFamily: fonts.dateInMontMontserratSemiBold,
  },
});

export default DateInHeartsBtn;
