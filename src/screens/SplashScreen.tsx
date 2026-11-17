import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  navigation: any;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [statusText, setStatusText] = useState('Initializing AI Neural Engine...');
  
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2400,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();

    const t1 = setTimeout(() => {
      setStatusText('Syncing Autonomous ERP Telemetry...');
    }, 800);

    const t2 = setTimeout(() => {
      setStatusText('Validating Neural Decision Loops...');
    }, 1600);

    const t3 = setTimeout(() => {
      setStatusText('Ready');
    }, 2200);

    const navigateTimer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('Onboarding');
      }
    }, 2600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(navigateTimer);
    };
  }, [isAuthenticated]);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.7],
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#090d16', '#0f172a', '#06131f']}
        style={StyleSheet.absoluteFill}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Glowing Logo Icon */}
        <Animated.View
          style={[
            styles.logoContainer,
            { transform: [{ scale: pulseAnim }] },
          ]}
        >
          <LinearGradient
            colors={[colors.primaryLight, colors.primaryDark]}
            style={styles.logoGradient}
          >
            <Ionicons name="hardware-chip" size={48} color="#090d16" />
          </LinearGradient>
          <View style={styles.logoGlow} />
        </Animated.View>

        {/* Title & Tagline */}
        <Text style={styles.brandTitle}>NEUROVIAX<Text style={styles.aiBadge}> AI</Text></Text>
        <Text style={styles.tagline}>Autonomous Enterprise ERP Intelligence</Text>

        {/* Progress Bar & Status */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBackground}>
            <Animated.View
              style={[
                styles.progressBarFill,
                { width: progressWidth },
              ]}
            />
          </View>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>
      </Animated.View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Enterprise Edition v2.4 • Gemini & Prophet Powered</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    position: 'relative',
    marginBottom: 24,
  },
  logoGradient: {
    width: 96,
    height: 96,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  logoGlow: {
    position: 'absolute',
    inset: -6,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  aiBadge: {
    color: colors.primaryLight,
  },
  tagline: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 48,
    alignItems: 'center',
    width: width * 0.7,
  },
  progressBarBackground: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  statusText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 12,
    fontFamily: 'monospace',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
  },
  footerText: {
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 0.2,
  },
});
