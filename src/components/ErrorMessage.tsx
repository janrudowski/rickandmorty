import React from 'react';

export default function ErrorMessage({
  message,
}: {
  message: string;
}): JSX.Element {
  return <div className='error-message'>{message}</div>;
}
