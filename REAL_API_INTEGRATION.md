# Gerçek Resmi Kurum API Entegrasyonu Dokümantasyonu

Bu dokümantasyon, AdilYemek platformunun gerçek resmi kurumlara entegrasyonu için gerekli bilgileri içerir.

## E-devlet OAuth Entegrasyonu

### Gereksinimler

1. **E-devlet Developer Portal Kaydı**
   - https://developer.turkiye.gov.tr adresinden kayıt olun
   - Uygulama oluşturun ve Client ID alın
   - Redirect URI'ları kaydedin

2. **Environment Variables**
   ```env
   VITE_EDEVLET_CLIENT_ID=your_client_id_here
   VITE_EDEVLET_CLIENT_SECRET=your_client_secret_here
   VITE_EDEVLET_REDIRECT_URI=https://yourdomain.com/edevlet-callback
   ```

### OAuth Flow

1. Kullanıcı "E-devlet ile Giriş Yap" butonuna tıklar
2. E-devlet OAuth sayfasına yönlendirilir
3. Kullanıcı giriş yapar ve izin verir
4. Callback URL'e code parametresi ile dönülür
5. Code, backend API üzerinden token'a çevrilir
6. Token ile kullanıcı bilgileri alınır

### Backend API Gereksinimleri

Gerçek implementasyon için bir backend API gereklidir:

```typescript
// Backend endpoint: POST /api/edevlet/token
// Code'u token'a çevirir
POST /api/edevlet/token
Body: { code: string, state: string }
Response: { access_token: string, refresh_token: string }

// Backend endpoint: GET /api/edevlet/user
// Kullanıcı bilgilerini alır
GET /api/edevlet/user
Headers: { Authorization: "Bearer {access_token}" }
Response: { tcKimlik, adSoyad, email, telefon, adres }
```

## Resmi Kurum Entegrasyonları

### 1. Rekabet Kurumu

**URL:** https://www.rekabet.gov.tr/tr/Sayfalar/Sikayet-Basvuru

**Yöntem:** Web formu yönlendirmesi
- Kullanıcı resmi web sitesine yönlendirilir
- Form verileri URL parametreleri veya localStorage ile aktarılır
- Kullanıcı formu tamamlar

**Gerekli Bilgiler:**
- Şikayet başlığı
- Şikayet açıklaması
- Platform adı
- Kategori bilgisi

### 2. BTK Tüketici Şikayet Sistemi

**URL:** https://www.btk.gov.tr/tr/kurumsal/tuketici-sikayetleri

**Yöntem:** E-devlet girişi + Web formu
- E-devlet girişi zorunludur
- Kullanıcı bilgileri otomatik doldurulur
- Form verileri hazırlanır

**Gerekli Bilgiler:**
- E-devlet kimlik doğrulama
- Şikayet detayları
- Hizmet tipi
- Sorun tipi

### 3. Tüketici Hakem Heyetleri

**URL:** https://www.turkiye.gov.tr/tuketici-hakem-heyeti-basvurusu

**Yöntem:** E-devlet üzerinden başvuru
- Tamamen e-devlet sistemi üzerinden
- E-devlet girişi zorunlu
- Form verileri e-devlet formatında

**Gerekli Bilgiler:**
- E-devlet kimlik bilgileri
- Şikayet detayları
- Talep türü
- İlgili belgeler

### 4. Belediye Şikayet Sistemi

**URL:** https://www.turkiye.gov.tr/belediye-sikayet

**Yöntem:** E-devlet üzerinden başvuru
- E-devlet girişi zorunlu
- İl/İlçe bilgisi gerekli
- Yerel yönetim kapsamında

## Form Verisi Aktarımı

### Yöntem 1: URL Parametreleri

```typescript
const params = new URLSearchParams({
  baslik: complaint.title,
  aciklama: complaint.description,
  platform: complaint.platform,
  // ...
})
const url = `${officialUrl}?${params.toString()}`
```

### Yöntem 2: localStorage

```typescript
// Veriyi kaydet
localStorage.setItem('complaint_data', JSON.stringify(data))

// Resmi sayfada oku (PostMessage API ile)
window.postMessage({ type: 'COMPLAINT_DATA', data }, '*')
```

### Yöntem 3: PostMessage API

Resmi kurum sayfası ile iletişim için:

```typescript
// Yönlendirme yapılan pencerede
const popup = window.open(officialUrl, '_blank')
popup.postMessage({ type: 'FILL_FORM', data }, officialUrl)
```

## Güvenlik Notları

1. **Kişisel Veriler:** KVKK uyumluluğu için:
   - Kullanıcı onayı alın
   - Veriler şifrelenmiş olarak saklanmalı
   - Veri saklama süresi belirlenmeli

2. **E-devlet Token:** 
   - Token'lar güvenli şekilde saklanmalı
   - Refresh token mekanizması kullanılmalı
   - Token süresi dolduğunda yeniden giriş istenmeli

3. **HTTPS:** Tüm iletişim HTTPS üzerinden olmalı

## Test Ortamı

Gerçek API'ler için test ortamı:

1. **E-devlet Test Ortamı:**
   - Test Client ID alın
   - Test kullanıcıları ile test edin

2. **Resmi Kurum Test:**
   - Test başvuruları yapın
   - Gerçek başvuru yapmadan önce test edin

## Production Deployment

1. Environment variables'ı production değerleri ile doldurun
2. Backend API'yi deploy edin
3. E-devlet Client ID'yi production için kaydedin
4. HTTPS sertifikası kurun
5. KVKK uyumluluğunu sağlayın

## Destek ve İletişim

- E-devlet Developer Portal: https://developer.turkiye.gov.tr
- Rekabet Kurumu: https://www.rekabet.gov.tr
- BTK: https://www.btk.gov.tr
- Tüketici Hakem Heyetleri: https://www.turkiye.gov.tr

