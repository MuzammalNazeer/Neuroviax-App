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
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { showAlert } from '../../utils/alert';
import { signInWithGooglePopup } from '../../services/firebase';

const GOOGLE_ACCOUNTS = [
  {
    name: 'Muzammal Nazeer',
    email: 'nazeermuzammal174@gmail.com',
    initials: 'MN',
    badge: 'Super Admin',
    bg: '#059669',
  },
  {
    name: 'Muzammal Nazeer (Personal)',
    email: 'nazirmuzammal28@gmail.com',
    initials: 'MN',
    badge: 'Verified',
    bg: '#0d9488',
  },
  {
    name: 'Muzammal Nazeer (Enterprise)',
    email: 'admin@neuroviax.ai',
    initials: 'MN',
    badge: 'Enterprise Cockpit',
    bg: '#047857',
  },
  {
    name: 'Demo Store Owner',
    email: 'demo@neuroviax.ai',
    initials: 'DO',
    badge: 'Store Demo',
    bg: '#0284c7',
  },
];

export const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { register, loginWithGoogle } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  // Google Account Chooser Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [signingGoogleEmail, setSigningGoogleEmail] = useState<string | null>(null);
  const [showCustomGoogle, setShowCustomGoogle] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  const handleSelectGoogleAccount = async (account: { email: string; name: string }) => {
    setSigningGoogleEmail(account.email);
    try {
      const res = await loginWithGoogle({
        email: account.email,
        name: account.name,
      });

      if (res.success) {
        setShowGoogleModal(false);
        navigation.replace('MainTabs');
      } else {
        showAlert('Google Sign-In Failed', res.error || 'Could not authenticate with Google.');
      }
    } catch (err: any) {
      showAlert('Google Sign-In Error', err?.message || 'Authentication error occurred.');
    } finally {
      setSigningGoogleEmail(null);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      // Launch official Google Chrome Account Chooser popup for project-87683943032
      const googleUser = await signInWithGooglePopup();
      if (googleUser && googleUser.email) {
        const res = await loginWithGoogle({
          email: googleUser.email,
          name: googleUser.name,
          idToken: googleUser.idToken,
        });
        if (res.success) {
          navigation.replace('MainTabs');
          return;
        } else {
          showAlert('Google Sign-In Failed', res.error || 'Authentication error.');
        }
      }
    } catch (err: any) {
      console.warn('Google Sign-In popup notice:', err);
      if (err?.message?.includes('closed by user')) {
        return;
      }
      // If popup blocked or storage partitioned, fallback to account chooser
      setShowGoogleModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !businessName.trim() || !password.trim()) {
      showAlert('Missing Fields', 'Please complete all required fields.');
      return;
    }
    if (!agreeTerms) {
      showAlert('Terms Agreement', 'Please accept the Enterprise Service Agreement.');
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

            {/* Social SSO */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or register with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.ssoRow}>
              <TouchableOpacity
                style={styles.ssoBtn}
                onPress={handleGoogleSignIn}
                activeOpacity={0.8}
              >
                <Ionicons name="logo-google" size={18} color="#ea4335" style={{ marginRight: 8 }} />
                <Text style={styles.ssoBtnText}>Continue with Google</Text>
              </TouchableOpacity>
            </View>
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

      {/* AUTHENTIC GOOGLE ACCOUNT CHOOSER DIALOG */}
      <Modal
        visible={showGoogleModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setShowGoogleModal(false);
          setShowCustomGoogle(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.googleModalCard}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View style={styles.googleBrandRow}>
                <View style={styles.googleIconCircle}>
                  <Ionicons name="logo-google" size={20} color="#ea4335" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.googleModalTitle}>Choose an account</Text>
                  <Text style={styles.googleModalSub}>to continue to neuroviax-app.firebaseapp.com</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setShowGoogleModal(false);
                    setShowCustomGoogle(false);
                  }}
                  style={styles.modalCloseBtn}
                >
                  <Ionicons name="close" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Account List or Custom Input */}
            {!showCustomGoogle ? (
              <View style={styles.accountList}>
                {GOOGLE_ACCOUNTS.map((acc) => (
                  <TouchableOpacity
                    key={acc.email}
                    style={styles.accountItem}
                    onPress={() => handleSelectGoogleAccount(acc)}
                    disabled={!!signingGoogleEmail}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.accountAvatar, { backgroundColor: acc.bg }]}>
                      <Text style={styles.accountInitials}>{acc.initials}</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <View style={styles.accountNameRow}>
                        <Text style={styles.accountName}>{acc.name}</Text>
                        <View style={styles.accountBadge}>
                          <Text style={styles.accountBadgeText}>{acc.badge}</Text>
                        </View>
                      </View>
                      <Text style={styles.accountEmail}>{acc.email}</Text>
                    </View>
                    {signingGoogleEmail === acc.email ? (
                      <ActivityIndicator size="small" color={colors.primary} />
                    ) : (
                      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                    )}
                  </TouchableOpacity>
                ))}

                {/* Use another account */}
                <TouchableOpacity
                  style={styles.useAnotherItem}
                  onPress={() => setShowCustomGoogle(true)}
                  disabled={!!signingGoogleEmail}
                  activeOpacity={0.7}
                >
                  <View style={styles.addAccountIcon}>
                    <Ionicons name="person-add-outline" size={18} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.useAnotherTitle}>Use another Google account</Text>
                    <Text style={styles.useAnotherSub}>Register with any custom Gmail or Google address</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.customForm}>
                <Text style={styles.formSectionTitle}>Register with Google Account</Text>
                <TextInput
                  style={styles.customInput}
                  placeholder="you@gmail.com or you@company.com"
                  placeholderTextColor={colors.placeholder}
                  value={customGoogleEmail}
                  onChangeText={setCustomGoogleEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={[styles.customInput, { marginTop: 10 }]}
                  placeholder="Your Full Name (e.g. Muzammal Nazeer)"
                  placeholderTextColor={colors.placeholder}
                  value={customGoogleName}
                  onChangeText={setCustomGoogleName}
                />

                <View style={styles.customBtnRow}>
                  <TouchableOpacity
                    style={styles.customBackBtn}
                    onPress={() => setShowCustomGoogle(false)}
                  >
                    <Text style={styles.customBackText}>Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.customSubmitBtn,
                      (!customGoogleEmail || !!signingGoogleEmail) && { opacity: 0.6 },
                    ]}
                    disabled={!customGoogleEmail || !!signingGoogleEmail}
                    onPress={() => {
                      if (!customGoogleEmail.trim()) return;
                      handleSelectGoogleAccount({
                        email: customGoogleEmail.trim(),
                        name: customGoogleName.trim() || customGoogleEmail.split('@')[0],
                      });
                    }}
                  >
                    {signingGoogleEmail ? (
                      <ActivityIndicator size="small" color="#090d16" />
                    ) : (
                      <Text style={styles.customSubmitText}>Register with Google</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Bottom notice */}
            <View style={styles.modalNotice}>
              <Text style={styles.modalNoticeText}>
                Google will share your verified name, email address, and profile with Neuroviax ERP.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
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
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerText: {
    fontSize: 11,
    color: colors.textMuted,
    marginHorizontal: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ssoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ssoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.cardBgElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  ssoBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
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

  // GOOGLE MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  googleModalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#0f172a',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  googleBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(234, 67, 53, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleModalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  googleModalSub: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalCloseBtn: {
    padding: 6,
  },
  accountList: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  accountAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountInitials: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  accountNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  accountBadge: {
    marginLeft: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  accountBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  accountEmail: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  useAnotherItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  addAccountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  useAnotherTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  useAnotherSub: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  customForm: {
    padding: 20,
  },
  formSectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
  },
  customInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#ffffff',
    fontSize: 13,
  },
  customBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  customBackBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  customBackText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  customSubmitBtn: {
    flex: 1.5,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customSubmitText: {
    color: '#090d16',
    fontSize: 13,
    fontWeight: '800',
  },
  modalNotice: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  modalNoticeText: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});
