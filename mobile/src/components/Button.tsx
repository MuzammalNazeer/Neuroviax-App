import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  style,
  textStyle,
}) => {
  const isGradient = variant === 'primary';

  const getContainerStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryBtn;
      case 'outline':
        return styles.outlineBtn;
      case 'danger':
        return styles.dangerBtn;
      case 'ghost':
        return styles.ghostBtn;
      default:
        return {};
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
      case 'ghost':
        return colors.primary;
      case 'secondary':
        return colors.textPrimary;
      case 'danger':
        return '#ffffff';
      default:
        return '#090d16'; // Dark text on primary emerald
    }
  };

  const content = (
    <View style={styles.innerRow}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={{ marginRight: 8 }}
        />
      ) : icon && iconPosition === 'left' ? (
        <Ionicons
          name={icon}
          size={size === 'sm' ? 16 : 18}
          color={getTextColor()}
          style={{ marginRight: 8 }}
        />
      ) : null}
      <Text
        style={[
          styles.text,
          size === 'sm' && styles.textSm,
          size === 'lg' && styles.textLg,
          { color: getTextColor() },
          textStyle,
        ]}
      >
        {title}
      </Text>
      {!loading && icon && iconPosition === 'right' && (
        <Ionicons
          name={icon}
          size={size === 'sm' ? 16 : 18}
          color={getTextColor()}
          style={{ marginLeft: 8 }}
        />
      )}
    </View>
  );

  if (isGradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.85}
        style={[styles.btnWrapper, disabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={[colors.primaryLight, colors.primary, colors.primaryDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.gradientBtn,
            size === 'sm' && styles.btnSm,
            size === 'lg' && styles.btnLg,
          ]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        styles.baseBtn,
        getContainerStyle(),
        size === 'sm' && styles.btnSm,
        size === 'lg' && styles.btnLg,
        disabled && styles.disabled,
        style,
      ]}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  baseBtn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  btnSm: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnLg: {
    paddingVertical: 18,
    paddingHorizontal: 26,
    borderRadius: 14,
  },
  secondaryBtn: {
    backgroundColor: colors.cardBgElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  dangerBtn: {
    backgroundColor: colors.danger,
  },
  ghostBtn: {
    backgroundColor: 'transparent',
  },
  innerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  textSm: {
    fontSize: 13,
  },
  textLg: {
    fontSize: 17,
  },
  disabled: {
    opacity: 0.5,
  },
});
