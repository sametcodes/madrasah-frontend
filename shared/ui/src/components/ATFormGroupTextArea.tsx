import React from 'react';
import { Label } from './label';
import { Textarea } from './textarea';
import { cn } from '../lib/utils';

interface IATFormGroupTextAreaProps {
  id: string;
  label?: string;
  wrapperClass?: string;
  placeholder?: string;
  rows?: number;
  inputClassName?: string;
}

function ATFormGroupTextArea({ id, label, wrapperClass = 'mb-6', placeholder, rows = 4, inputClassName = '' }: IATFormGroupTextAreaProps) {
  return (
    <div className={cn(wrapperClass)}>
      {label && (
        <Label htmlFor={id} className="mb-3">
          {label}
        </Label>
      )}

      <Textarea key={id} placeholder={placeholder} rows={rows} className={inputClassName} />
    </div>
  );
}

export default ATFormGroupTextArea;
