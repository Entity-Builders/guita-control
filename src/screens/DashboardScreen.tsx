import React from 'react';
import { View, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { useGuitaStats } from '@eb-packages/logic';
import {
  MonthSummaryCard,
  MonotributoCard,
  FinancialOverviewCard,
  DashboardHeader,
  ExpenseList,
} from '@eb-packages/ui';

const StyledView = styled(View);

// Mock Data for UI gaps
const EXPENSES_BREAKDOWN = [
  { label: 'Alquiler (30%)', value: 30, color: '#3B82F6' }, // blue-500
  { label: 'Comida (20%)', value: 20, color: '#EAB308' }, // yellow-500
  { label: 'Monotributo (25%)', value: 25, color: '#64748B' }, // slate-500
  { label: 'Ahorro (10%)', value: 10, color: '#F43F5E' }, // rose-500
  { label: 'Otros (15%)', value: 15, color: '#10B981' }, // emerald-500
];

const CAT_F_CAP_ESTIMATED = 68000000 / 12; // Example simplified annual cap monthly
// Hardcoding a known limit from the design for visual parity if logic mismatch
const DESIGN_CAP_LIMIT = 1232768;

// Mock Expenses List
const RECENT_EXPENSES = [
  { id: '1', name: 'Spotify Premium', amountARS: 5500 },
  { id: '2', name: 'Fibertel Internet', amountARS: 25000 },
  { id: '3', name: 'Coto Supermercado', amountARS: 150000 },
  { id: '4', name: 'Uber', amountARS: 4500 },
];
const DOLAR_MEP = 1150;

export default function DashboardScreen() {
  const {
    hourlyRate,
    dailyHours,
    businessDays,
    projectedGross,
    liquidity,
    recategorizationRisk,
  } = useGuitaStats(15000);

  // Derived / Mocked Data for UI
  const totalHours = dailyHours * businessDays;
  const workedHours = Math.floor(totalHours * 0.75); // Mock 75% progress
  const daysLeft = Math.floor(30 * 0.25); // Mock
  const missingEarnings = projectedGross * 0.25;

  const currentConsumption = DESIGN_CAP_LIMIT * (recategorizationRisk / 100);

  return (
    <StyledView className='flex-1 bg-[#191A23] pt-12'>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <DashboardHeader />

        <MonthSummaryCard
          estimatedEarnings={projectedGross}
          workedHours={workedHours}
          totalHours={totalHours}
          missingEarnings={missingEarnings}
          daysLeft={daysLeft}
          progressPercentage={75}
        />

        <MonotributoCard
          percentage={recategorizationRisk}
          limit={DESIGN_CAP_LIMIT}
          currentConsumption={currentConsumption}
          category='F'
        />

        <FinancialOverviewCard
          liquidity={liquidity}
          grossIncome={projectedGross}
          expenses={EXPENSES_BREAKDOWN}
        />

        <ExpenseList expenses={RECENT_EXPENSES} dolarMep={DOLAR_MEP} />

        <StyledView className='h-10' />
      </ScrollView>
    </StyledView>
  );
}
