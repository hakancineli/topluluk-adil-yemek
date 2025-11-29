import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import './index.css'
import { initializeComplaints } from './utils/initializeComplaints'

// Uygulama başlangıcında şikayetleri yükle
// Production'da localStorage boş olabilir, bu yüzden her zaman çalıştır
if (typeof window !== 'undefined') {
  initializeComplaints()
    .then(() => {
      console.log('[main.tsx] Şikayetler başarıyla yüklendi')
    })
    .catch((error) => {
      console.error('[main.tsx] Şikayetler yüklenirken hata:', error)
    })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          duration: 4000,
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  </React.StrictMode>,
)

