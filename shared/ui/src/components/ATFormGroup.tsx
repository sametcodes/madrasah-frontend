import React from 'react';
import { Label } from './label';
import { Input } from './input';

interface IATFormGroupProps {
  id: string;
  label?: string;
  wrapperClass?: string;
  placeholder?: string;
  type?: string;
}

function ATFormGroup({ id, label, wrapperClass = 'mb-6', placeholder, type = 'text' }: IATFormGroupProps) {
  return (
    <div className={wrapperClass}>
      {label && (
        <Label htmlFor={id} className="mb-3">
          {label}
        </Label>
      )}
      <Input key={id} type={type} placeholder={placeholder} />
    </div>
  );
}

export default ATFormGroup;
