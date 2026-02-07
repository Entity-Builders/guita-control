import { FixedExpensesManager } from '@eb-packages/ui';
import { View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);

export default function ExpensesScreen() {
  return (
    <StyledView className='flex-1 bg-[#1e293b]'>
      <FixedExpensesManager />
    </StyledView>
  );
}
