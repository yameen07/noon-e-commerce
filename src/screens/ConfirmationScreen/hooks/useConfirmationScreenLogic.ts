import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';

type ConfirmationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Confirmation'
>;

export const useConfirmationScreenLogic = () => {
  const navigation = useNavigation<ConfirmationScreenNavigationProp>();

  //Navigate back to home
  const handleBackToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }, [navigation]);

  return {
    handleBackToHome,
  };
};
