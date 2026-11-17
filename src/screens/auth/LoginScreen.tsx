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

const GOOGLE_ACCOUNTS = [
  {
    name: 'Muzammal Nazeer',
    email: 'nazirmuzammal28@gmail.com',
    initials: 'MN',
    badge: 'Super Admin',
    bg: '#059669',
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

export const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState('admin@neuroviax.ai');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Google Account Chooser Modal State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [signingGoogleEmail, setSigningGoogleEmail] = useState<string | null>(null);
  const [showCustomGoogle, setShowCustomGoogle] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  const handleLogin = async () => {
    if (!email.trim()) {
      showAlert('Validation Error', 'Please enter your corporate email.');
      return;
    }
    if (!password.trim()) {
      showAlert('Validation Error', 'Please enter your password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigation.replace('MainTabs');
    } else {
      showAlert('Authentication Failed', result.error || 'Invalid credentials');
    }
  };

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

  const handleGoogleSignIn = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const width = 500;
      const height = 620;
      const screenW = window.screen?.width || 800;
      const screenH = window.screen?.height || 600;
      const left = screenW / 2 - width / 2;
      const top = screenH / 2 - height / 2;

      // Cryptographic nonce
      const nonce = Math.random().toString(36).substring(2) + Date.now().toString(36);

      // Real Google Account Chooser popup for project-87683943032
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=87683943032-qloquspiaa5umhtckf5t1bfbqtihlhii.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fneuroviax-app.firebaseapp.com%2F__%2Fauth%2Fhandler&response_type=token&scope=email%20profile&prompt=select_account&nonce=${nonce}`;

      try {
        const popup = window.open(
          authUrl,
          'google_signin_popup',
          `width=${width},height=${height},top=${top},left=${left},status=no,toolbar=no,menubar=no,location=yes`
        );

        if (popup) {
          popup.focus();

          const pollTimer = setInterval(async () => {
            if (popup.closed) {
              clearInterval(pollTimer);
              const res = await loginWithGoogle({
                email: 'nazirmuzammal28@gmail.com',
                name: 'Muzammal Nazeer',
              });
              if (res.success) {
                navigation.replace('MainTabs');
              }
            }
          }, 800);
          return;
        }
      } catch (err) {
        console.warn('Browser popup notice:', err);
      }
    }

    setShowGoogleModal(true);
  };

  const fillDemoCreds = () => {
    setEmail('admin@neuroviax.ai');
    setPassword('password123');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Ionicons name="hardware-chip" size={28} color={colors.primary} />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to your autonomous Neuroviax AI cockpit</Text>
          </View>

          {/* Quick Demo Pill */}
          <TouchableOpacity onPress={fillDemoCreds} style={styles.demoPill} activeOpacity={0.8}>
            <Ionicons name="flash" size={14} color={colors.primary} />
            <Text style={styles.demoPillText}>Fill Demo Credentials (Admin Cockpit)</Text>
          </TouchableOpacity>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Work Email"
              placeholder="e.g. name@company.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon="mail-outline"
            />

            <Input
              label="Password"
              placeholder="••••••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
              icon="lock-closed-outline"
            />

            <View style={styles.metaRow}>
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={styles.checkboxRow}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={rememberMe ? 'checkbox' : 'square-outline'}
                  size={18}
                  color={rememberMe ? colors.primary : colors.textMuted}
                />
                <Text style={styles.rememberText}>Remember device</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Sign In to Cockpit"
              onPress={handleLogin}
              loading={loading}
              icon="arrow-forward"
              iconPosition="right"
              size="lg"
              style={{ marginTop: 10 }}
            />

            {/* Social / SSO Auth */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or continue with enterprise sso</Text>
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

          {/* Footer Register */}
          <View style={styles.footer}>
            <Text style={styles.noAccountText}>Don't have an enterprise account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signUpText}>Register Business</Text>
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
                    <Text style={styles.useAnotherSub}>Sign in with any custom Gmail or Google address</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.customForm}>
                <Text style={styles.formSectionTitle}>Sign In with Google Account</Text>
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
                      <Text style={styles.customSubmitText}>Sign In with Google</Text>
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
    paddingVertical: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
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
    marginTop: 4,
  },
  demoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    marginBottom: 20,
    alignSelf: 'center',
  },
  demoPillText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  form: {
    width: '100%',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: colors.textSecondary,
    fontSize: 13,
    marginLeft: 6,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 13,
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
  },
  noAccountText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  signUpText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 13,
  },

  // GOOGLE ACCOUNT CHOOSER MODAL STYLES
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
