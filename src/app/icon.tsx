import { ImageResponse } from 'next/og';

// 1. Favicon ka layout aur size metadata config
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// 2. High-fidelity Cyber Icon Element Stream Engine
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: '#020208',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
          border: '1.5px solid #00ff66',
          boxShadow: '0 0 10px #00ff66',
        }}
      >
        🥷
      </div>
    ),
    { ...size }
  );
}