import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { supabase } from '@eb-packages/logic';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Navigation is handled by layout listener
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        Alert.alert(
          'Registro exitoso',
          '¡Cuenta creada! Revisa tu email o inicia sesión.',
        );
      }
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-black'>
      <View className='flex-1 justify-center p-6'>
        <Text className='text-3xl font-bold text-white text-center mb-2'>
          Guita Control
        </Text>
        <Text className='text-lg text-gray-400 text-center mb-12'>
          {isLogin ? 'Login' : 'Sign Up'}
        </Text>

        <View className='gap-4 mb-8'>
          <TextInput
            className='bg-neutral-900 rounded-xl p-4 text-white text-base border border-neutral-800'
            placeholder='Email'
            placeholderTextColor='#666'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <TextInput
            className='bg-neutral-900 rounded-xl p-4 text-white text-base border border-neutral-800'
            placeholder='Contraseña'
            placeholderTextColor='#666'
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className='bg-white p-4 rounded-xl items-center mb-6'
          onPress={handleAuth}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color='#000' />
          ) : (
            <Text className='text-black text-base font-bold'>
              {isLogin ? 'Entrar' : 'Registrarse'}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className='items-center'
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text className='text-gray-400 text-sm'>
            {isLogin
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
