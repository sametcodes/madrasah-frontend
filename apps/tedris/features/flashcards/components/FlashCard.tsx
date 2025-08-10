'use client';

import { Card } from '@madrasah/ui/components/card';
import { ReactNode } from 'react';

interface FlashCardProps {
  children: ReactNode;
}

export default function FlashCard({ children }: FlashCardProps) {
  return (
    <Card className="relative mx-auto flex h-[500px] w-[300px] select-none flex-col justify-center rounded-2xl p-4 text-center shadow-lg sm:p-6">
      {children}
    </Card>
  );
}
