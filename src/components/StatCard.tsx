import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  isPositive?: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  prefix?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  iconColor = colors.primary,
  prefix = '',
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={[styles.iconWrapper, { backgroundColor: `${iconColor}20` }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
        {change !== undefined && (
          <View
            style={[
              styles.changeBadge,
              {
                backgroundColor: isPositive
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
              },
            ]}
          >
            <Ionicons
              name={isPositive ? 'trending-up' : 'trending-down'}
              size={12}
              color={isPositive ? colors.primaryLight : colors.danger}
              style={{ marginRight: 2 }}
            />
            <Text
              style={[
                styles.changeText,
                { color: isPositive ? colors.primaryLight : colors.danger },
              ]}
            >
              {Math.abs(change)}%
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.value}>
        {prefix}
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 14,
    flex: 1,
    minWidth: '47%',
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  value: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
