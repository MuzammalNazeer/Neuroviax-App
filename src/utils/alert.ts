import { Alert, Platform } from 'react-native';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export const showAlert = (
  title: string,
  message?: string,
  buttons?: AlertButton[]
) => {
  if (Platform.OS === 'web') {
    const fullMessage = message ? `${title}\n\n${message}` : title;

    if (buttons && buttons.length > 1) {
      // Confirmation dialog
      const confirmed = window.confirm(fullMessage);
      if (confirmed) {
        const actionBtn = buttons.find((b) => b.style !== 'cancel') || buttons[0];
        actionBtn?.onPress?.();
      } else {
        const cancelBtn = buttons.find((b) => b.style === 'cancel');
        cancelBtn?.onPress?.();
      }
      return;
    }

    // Simple alert
    window.alert(fullMessage);
    if (buttons && buttons[0]?.onPress) {
      buttons[0].onPress();
    }
    return;
  }

  // Native iOS / Android
  Alert.alert(title, message, buttons);
};
