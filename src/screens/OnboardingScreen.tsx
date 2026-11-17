import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';

interface Slide {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  highlight: string;
  description: string;
  accentColor: string;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    icon: 'git-network',
    title: 'Autonomous Business',
    highlight: 'Optimization',
    description:
      'Self-regulating ERP loops that detect inventory drops, predict demand spikes, and automate procurement decisions in real-time.',
    accentColor: colors.primary,
  },
  {
    id: '2',
    icon: 'chatbubbles',
    title: 'Executive AI Copilot',
    highlight: 'At Your Fingertips',
    description:
      'Instant multi-modal intelligence for sales forecasts, anomaly explanations, and strategic executive recommendations.',
    accentColor: colors.secondaryLight,
  },
  {
    id: '3',
    icon: 'shield-checkmark',
    title: 'Full Stack ERP',
    highlight: 'Unified Operations',
    description:
      'From live inventory & multi-channel orders to cash flow forecasting and supplier logistics—all in one high-performance mobile app.',
    accentColor: '#f59e0b',
  },
];

export const OnboardingScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { login } = useAuth();

  const scrollToSlide = (index: number) => {
    if (index >= 0 && index < SLIDES.length) {
      setCurrentIndex(index);
      try {
        flatListRef.current?.scrollToOffset({
          offset: index * width,
          animated: true,
        });
      } catch {
        flatListRef.current?.scrollToIndex({
          index,
          animated: true,
        });
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollToSlide(currentIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  const handleDemoQuickAccess = async () => {
    await login('admin@neuroviax.ai', 'password123');
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <Ionicons name="hardware-chip" size={20} color={colors.primary} />
          <Text style={styles.brandName}>Neuroviax AI</Text>
        </View>

        <View style={styles.topRightActions}>
          <TouchableOpacity onPress={handleDemoQuickAccess} style={styles.demoBtn} activeOpacity={0.8}>
            <Ionicons name="flash" size={13} color={colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.demoBtnText}>Demo Mode</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSkip} style={styles.topSkipBtn} activeOpacity={0.7}>
            <Text style={styles.topSkipText}>Skip</Text>
            <Ionicons name="chevron-forward" size={14} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={(info) => {
          setTimeout(() => {
            flatListRef.current?.scrollToOffset({
              offset: info.index * width,
              animated: true,
            });
          }, 50);
        }}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          if (index >= 0 && index < SLIDES.length) {
            setCurrentIndex(index);
          }
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={[styles.iconCircle, { borderColor: `${item.accentColor}40` }]}>
              <View style={[styles.iconInner, { backgroundColor: `${item.accentColor}20` }]}>
                <Ionicons name={item.icon} size={64} color={item.accentColor} />
              </View>
            </View>

            <Text style={styles.title}>
              {item.title}{' '}
              <Text style={{ color: item.accentColor }}>{item.highlight}</Text>
            </Text>

            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      {/* Pagination Dots (Clickable) */}
      <View style={styles.pagination}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => scrollToSlide(i)}
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <View
              style={[
                styles.dot,
                currentIndex === i && styles.activeDot,
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Buttons (Skip & Next / Get Started) */}
      <View style={styles.footer}>
        {currentIndex < SLIDES.length - 1 ? (
          <View style={styles.actionRow}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Button
                title="Skip"
                variant="outline"
                onPress={handleSkip}
                size="lg"
              />
            </View>
            <View style={{ flex: 1.5 }}>
              <Button
                title="Next"
                variant="primary"
                onPress={handleNext}
                icon="arrow-forward"
                iconPosition="right"
                size="lg"
              />
            </View>
          </View>
        ) : (
          <Button
            title="Get Started"
            variant="primary"
            onPress={handleNext}
            icon="arrow-forward"
            iconPosition="right"
            size="lg"
          />
        )}

        <View style={styles.bottomLinkRow}>
          <Text style={styles.haveAccountText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginLeft: 8,
  },
  topRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    marginRight: 8,
  },
  demoBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  topSkipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  topSkipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginRight: 2,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  iconInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 18,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cardBorder,
    marginHorizontal: 5,
  },
  activeDot: {
    width: 24,
    backgroundColor: colors.primary,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  haveAccountText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 14,
  },
});