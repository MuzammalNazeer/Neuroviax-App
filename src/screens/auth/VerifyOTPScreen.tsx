import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { showAlert } from '../../utils/alert';

export const VerifyOTPScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { register } = useAuth();
  const { name, email, businessName, password, mode } = route.params || {};

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
  };

  const handleVerify = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      showAlert('Incomplete Code', 'Please enter all 6 digits of the verification code.');
      return;
    }

    setLoading(true);
    if (mode === 'forgot') {
      setLoading(false);
      navigation.navigate('ResetPassword', { email });
      return;
    }

    // Register flow
    const res = await register(
      name || 'New Enterprise User',
      email || 'user@enterprise.com',
      businessName || 'Neuroviax Tenant',
      password || 'securePass123'
    );
    setLoading(false);

    if (res.success) {
      navigation.replace('MainTabs');
    } else {
      showAlert('Verification Failed', res.error || 'Invalid code');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="shield-checkmark" size={32} color={colors.primary} />
          </View>
          <Text style={styles.title}>Two-Factor Security</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit verification code dispatched to{' '}
            <Text style={{ color: '#ffffff', fontWeight: '700' }}>
              {email || 'your email'}
            </Text>
          </Text>
        </View>

        {/* 6 Digit Input Boxes */}
        <View style={styles.otpRow}>
          {otp.map((digit, idx) => (
            <TextInput
              key={idx}
              value={digit}
              onChangeText={(v) => handleOtpChange(v.slice(-1), idx)}
              keyboardType="number-pad"
              maxLength={1}
              style={[
                styles.otpBox,
                digit ? styles.otpBoxFilled : null,
              ]}
              autoFocus={idx === 0}
            />
          ))}
        </View>

        {/* Resend Timer */}
        <View style={styles.timerRow}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in <Text style={{ color: colors.primary }}>00:{timer < 10 ? `0${timer}` : timer}</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={() => setTimer(60)}>
              <Text style={styles.resendText}>Resend Verification Code</Text>
            </TouchableOpacity>
          )}
        </View>

        <Button
          title="Verify & Continue"
          onPress={handleVerify}
          loading={loading}
          size="lg"
          style={{ marginTop: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.cardBgElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
    paddingHorizontal: 16,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpBox: {
    width: 46,
    height: 54,
    borderRadius: 12,
    backgroundColor: colors.inputBg,
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  otpBoxFilled: {
    borderColor: colors.primary,
  },
  timerRow: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timerText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  resendText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
});
