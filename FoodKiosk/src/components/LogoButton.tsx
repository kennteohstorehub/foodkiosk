import React from 'react';
import { TouchableOpacity, View, StyleSheet, ViewStyle } from 'react-native';

interface LogoButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  size?: number;
  backgroundColor?: string;
  activeOpacity?: number;
}

const LogoButton: React.FC<LogoButtonProps> = ({
  onPress,
  style,
  size = 32,
  backgroundColor = '#FF6B35',
  activeOpacity = 0.7,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
          shadowColor: backgroundColor,
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.4,
          shadowRadius: 7,
          borderWidth: 2,
          borderColor: '#FF8C5A',
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <View style={styles.logoContainer}>
        {/* Company Logo - K in white */}
        <View style={[styles.kLogo, { 
          width: size * 0.6, 
          height: size * 0.6 
        }]}>
          {/* Left vertical line */}
          <View style={[styles.kLeft, { 
            width: size * 0.08, 
            height: size * 0.6 
          }]} />
          {/* Top diagonal line */}
          <View style={[styles.kTopDiagonal, { 
            width: size * 0.35, 
            height: size * 0.08,
            top: size * 0.15,
            left: size * 0.08
          }]} />
          {/* Bottom diagonal line */}
          <View style={[styles.kBottomDiagonal, { 
            width: size * 0.35, 
            height: size * 0.08,
            top: size * 0.37,
            left: size * 0.08
          }]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  kLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  kLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#fff',
  },
  kTopDiagonal: {
    position: 'absolute',
    backgroundColor: '#fff',
    transform: [{ rotate: '25deg' }],
  },
  kBottomDiagonal: {
    position: 'absolute',
    backgroundColor: '#fff',
    transform: [{ rotate: '-25deg' }],
  },
});

export default LogoButton; 