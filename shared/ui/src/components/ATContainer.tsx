import React from 'react';

function ATContainer({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={`${className} w-6xl mx-auto`} {...props} />;
}

export default ATContainer;
