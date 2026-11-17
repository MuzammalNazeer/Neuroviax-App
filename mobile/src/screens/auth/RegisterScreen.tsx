import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';

export const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !businessName.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please complete all required fields.');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('Terms Agreement', 'Please accept the Enterprise Service Agreement.');
      return;
    }

    setLoading(true);
    // Send to OTP verification
    navigation.navigate('VerifyOTP', {
      name,
      email,
      businessName,
      password,
    });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.title}>Register Business</Text>
            <Text style={styles.subtitle}>
              Deploy autonomous AI intelligence to power your supply chain, inventory, and finance.
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="e.g. Muzammal Nazeer"
              value={name}
              onChangeText={setName}
              icon="person-outline"
            />

            <Input
              label="Work Email"
              placeholder="e.g. founder@company.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <Input
              label="Business / Organization Name"
              placeholder="e.g. Apex Manufacturing Inc."
              value={businessName}
              onChangeText={setBusinessName}
              icon="business-outline"
            />

            <Input
              label="Secure Password"
              placeholder="Minimum 8 characters"
              value={password}
              onChangeText={setPassword}
              isPassword
              icon="lock-closed-outline"
            />

            <TouchableOpacity
              onPress={() => setAgreeTerms(!agreeTerms)}
              style={styles.termsRow}
              activeOpacity={0.7}
            >
              <Ionicons
                name={agreeTerms ? 'checkbox' : 'square-outline'}
                size={18}
                color={agreeTerms ? colors.primary : colors.textMuted}
              />
              <Text style={styles.termsText}>
                I accept the <Text style={styles.termsLink}>Enterprise SLA</Text> and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
              </Text>
            </TouchableOpacity>

            <Button
              title="Continue with OTP Verification"
              onPress={handleRegister}
              loading={loading}
              icon="arrow-forward"
              iconPosition="right"
              size="lg"
              style={{ marginTop: 12 }}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.haveAccountText}>Already registered? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexGrow: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.cardBgElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
    lineHeight: 20,
  },
  form: {
    width: '100%',
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  termsText: {
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingBottom: 20,
  },
  haveAccountText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  signInLink: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },
});
