import { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  gradient?: [string, string];
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export function Button({
  label,
  onPress,
  icon,
  variant = 'primary',
  gradient = [colors.yellow400, colors.orange500],
  style,
  textStyle,
  fullWidth,
}: ButtonProps) {
  const content = (
    <>
      {icon}
      <Text
        style={[
          styles.label,
          variant === 'outline' && styles.labelOutline,
          variant === 'ghost' && styles.labelGhost,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </>
  );

  if (variant === 'primary' && gradient) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          fullWidth && styles.fullWidth,
          pressed && styles.pressed,
          style,
        ]}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, fullWidth && styles.fullWidth]}
        >
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        style,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  outline: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
  labelOutline: {
    color: colors.white,
  },
  labelGhost: {
    color: colors.yellow400,
    fontSize: 14,
  },
});
