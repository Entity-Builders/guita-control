import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { supabase } from '@eb-packages/logic';
import { Auth } from '@eb-packages/ui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });
      if (error) throw error;
      // Navigation is handled by layout listener
    } catch (e: any) {
      setError(e.message);
      Alert.alert('Authentication Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email: string, pass: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password: pass,
      });
      if (error) throw error;
      Alert.alert(
        'Registro exitoso',
        '¡Cuenta creada! Revisa tu email o inicia sesión.',
      );
    } catch (e: any) {
      setError(e.message);
      Alert.alert('Authentication Error', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Auth
        onLogin={handleLogin}
        onRegister={handleRegister}
        loading={loading}
        error={error}
        title='Guita Control'
        themeColor='#000' // Matching the app's dark theme/style preference if possible, though Auth component has light bg hardcoded
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
