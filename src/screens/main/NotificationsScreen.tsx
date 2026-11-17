import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { MOCK_NOTIFICATIONS, NotificationItem } from '../../services/mockData';
import { showAlert } from '../../utils/alert';

export const NotificationsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showAlert('Notifications', 'All notifications marked as read.');
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Notification Center"
        subtitle="Live Autonomous Signals"
        showBack
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: 'checkmark-done-outline',
          onPress: markAllRead,
        }}
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleRead(item.id)} activeOpacity={0.8}>
            <Card style={[styles.card, !item.read && styles.unreadCard]}>
              <View style={styles.topRow}>
                <View style={styles.iconWrap}>
                  <Ionicons
                    name={
                      item.type === 'alert'
                        ? 'warning'
                        : item.type === 'success'
                        ? 'checkmark-circle'
                        : item.type === 'ai'
                        ? 'hardware-chip'
                        : 'information-circle'
                    }
                    size={20}
                    color={
                      item.type === 'alert'
                        ? colors.danger
                        : item.type === 'success'
                        ? colors.primary
                        : item.type === 'ai'
                        ? colors.secondaryLight
                        : colors.textSecondary
                    }
                  />
                </View>

                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.message}>{item.message}</Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.time}>{item.time}</Text>
                  {!item.read && <View style={styles.unreadDot} />}
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 10,
    padding: 14,
  },
  unreadCard: {
    borderColor: 'rgba(16, 185, 129, 0.4)',
    backgroundColor: 'rgba(17, 24, 39, 0.95)',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.cardBgElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
  },
  message: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
    lineHeight: 16,
  },
  time: {
    fontSize: 10,
    color: colors.textMuted,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 6,
  },
});
