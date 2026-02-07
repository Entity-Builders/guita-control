import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthScreen as SharedAuthScreen } from '@eb-packages/ui';

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SharedAuthScreen title='Guita Control' themeColor='#000' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
