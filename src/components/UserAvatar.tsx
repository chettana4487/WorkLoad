'use client';

import { useState } from 'react';

interface UserAvatarProps {
  src?: string;
  name: string;
  size?: number;
  style?: React.CSSProperties;
}

export default function UserAvatar({ src, name, size = 40, style }: UserAvatarProps) {
  const [error, setError] = useState(false);
  const [retryLower, setRetryLower] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getBackgroundColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const handleError = () => {
    // If .JPG failed and we haven't tried .jpg yet
    if (!retryLower && src?.includes('.JPG')) {
      setRetryLower(true);
    } else {
      setError(true);
    }
  };

  if (!src || error) {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          backgroundColor: getBackgroundColor(name),
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${size * 0.4}px`,
          fontWeight: 600,
          ...style
        }}
      >
        {getInitials(name)}
      </div>
    );
  }

  // If retrying, swap extension to lowercase
  const currentSrc = retryLower ? src.replace('.JPG', '.jpg') : src;

  return (
    <img
      src={currentSrc}
      alt={name}
      onError={handleError}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        objectFit: 'cover',
        ...style
      }}
    />
  );
}
