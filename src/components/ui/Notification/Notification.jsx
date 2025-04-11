import { Toaster } from 'react-hot-toast';

const Notification = () => {
  return (
    <Toaster
      position="center-right"
      toastOptions={{
        success: {
          style: {
            color: 'var(--primary-color-blue)',
            backgroundColor: 'var(--primary-color-gray-light)',
            fontWeight: 'bold',
            padding: '8px 30px',
            borderRadius: '10px',
          },
          iconTheme: {
            primary: 'var(--primary-color-blue)',
            secondary: 'var(--primary-color-white)',
          },
          duration: 3000,
        },
        error: {
          style: {
            color: 'var(--primary-color-white)',
            backgroundColor: 'var(--secondary-color-red)',
            fontWeight: 'bold',
            padding: '8px 30px',
            borderRadius: '10px',
          },
          iconTheme: {
            primary: 'var(--primary-color-white)',
            secondary: 'var(--secondary-color-red)',
          },
          duration: 3000,
        },
      }}
    />
  );
};

export default Notification;
