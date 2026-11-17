import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { showAlert } from '../../utils/alert';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Inventory Manager' | 'Operations Lead' | 'Staff';
  status: 'active' | 'invited';
}

const INITIAL_TEAM: TeamMember[] = [
  { id: '1', name: 'Muzammal Nazeer', email: 'admin@neuroviax.ai', role: 'Super Admin', status: 'active' },
  { id: '2', name: 'Hamza Sheikh', email: 'hamza@neuroviax.ai', role: 'Inventory Manager', status: 'active' },
  { id: '3', name: 'Ayesha Tariq', email: 'ayesha@neuroviax.ai', role: 'Operations Lead', status: 'active' },
  { id: '4', name: 'Zeeshan Ali', email: 'zeeshan@neuroviax.ai', role: 'Staff', status: 'invited' },
];

export const TeamScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_TEAM);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('Staff');

  const handleInvite = () => {
    if (!name || !email) {
      showAlert('Required', 'Please enter member name and corporate email.');
      return;
    }
    const newMember: TeamMember = {
      id: String(Date.now()),
      name,
      email,
      role,
      status: 'invited',
    };
    setMembers([...members, newMember]);
    setModalVisible(false);
    setName('');
    setEmail('');
    showAlert('Invitation Dispatched', `Invited ${newMember.name} as ${newMember.role}.`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Enterprise Team"
        subtitle="Role-Based Access Control (RBAC)"
        showBack
        onBack={() => navigation.goBack()}
        rightAction={{
          icon: 'person-add-outline',
          onPress: () => setModalVisible(true),
        }}
      />

      <FlatList
        data={members}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name.split(' ').map((n) => n[0]).join('').substring(0, 2)}
                </Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.email}>{item.email}</Text>
                <Text style={styles.role}>{item.role}</Text>
              </View>
              <Badge
                label={item.status === 'active' ? 'ACTIVE' : 'INVITED'}
                variant={item.status === 'active' ? 'success' : 'warning'}
                size="sm"
              />
            </View>
          </Card>
        )}
      />

      {/* Invite Member Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Invite Colleague</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <Input
              label="Full Name"
              placeholder="e.g. Asad Raza"
              value={name}
              onChangeText={setName}
            />
            <Input
              label="Corporate Email"
              placeholder="e.g. asad@company.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Text style={styles.roleLabel}>Assigned Role:</Text>
            <View style={styles.rolesRow}>
              {(['Inventory Manager', 'Operations Lead', 'Staff'] as const).map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.rolePill, role === r && styles.rolePillActive]}
                  onPress={() => setRole(r)}
                >
                  <Text style={[styles.rolePillText, role === r && styles.rolePillTextActive]}>
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button
              title="Send Team Invitation"
              onPress={handleInvite}
              size="lg"
              style={{ marginTop: 20 }}
            />
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
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 10,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  email: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 1,
  },
  role: {
    fontSize: 11,
    color: colors.primaryLight,
    marginTop: 4,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.cardBg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  roleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  rolesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  rolePill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: colors.cardBgElevated,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  rolePillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  rolePillText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  rolePillTextActive: {
    color: '#090d16',
    fontWeight: '700',
  },
});
