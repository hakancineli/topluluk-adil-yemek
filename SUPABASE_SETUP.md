# Supabase Kurulum Rehberi

Bu dokümantasyon, AdilYemek projesinin Supabase veritabanına nasıl bağlanacağını açıklar.

## 1. Supabase Database Şemasını Oluşturma

### Adımlar:

1. **Supabase Dashboard'a gidin:**
   - https://supabase.com/dashboard
   - Projenizi seçin: `supabase-pink-door`

2. **SQL Editor'ü açın:**
   - Sol menüden "SQL Editor" seçin
   - "New query" butonuna tıklayın

3. **Şema SQL'ini çalıştırın:**
   - `supabase-schema.sql` dosyasının içeriğini kopyalayın
   - SQL Editor'e yapıştırın
   - "Run" butonuna tıklayın

4. **Kontrol edin:**
   - Sol menüden "Table Editor" seçin
   - Şu tabloların oluşturulduğunu görmelisiniz:
     - `users`
     - `complaints`
     - `contact_messages`
     - `platforms`

## 2. Environment Variables Kontrolü

Vercel Dashboard'da şu environment variables'ların olduğundan emin olun:

### Frontend için (Public):
```
VITE_SUPABASE_URL=https://lmoxmbgixzuznuwfujoz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend için (Private):
```
POSTGRES_URL=postgres://postgres.lmoxmbgixzuznuwfujoz:...
POSTGRES_HOST=db.lmoxmbgixzuznuwfujoz.supabase.co
POSTGRES_USER=postgres
POSTGRES_PASSWORD=LCoLwbvZOK7y32PW
POSTGRES_DATABASE=postgres
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. İlk Kullanıcıları Oluşturma

Uygulama ilk açıldığında otomatik olarak şu kullanıcılar oluşturulacak:

- **Test Kullanıcı:**
  - Email: `test@example.com`
  - Şifre: `test123`
  - Rol: `user`

- **Admin Kullanıcı:**
  - Email: `admin@adilyemek.com`
  - Şifre: `admin123`
  - Rol: `admin`

## 4. Test Etme

1. **Local'de test edin:**
   ```bash
   npm run dev
   ```

2. **Kayıt olun:**
   - `/kayit` sayfasına gidin
   - Yeni bir kullanıcı oluşturun

3. **Giriş yapın:**
   - `/giris` sayfasına gidin
   - Oluşturduğunuz kullanıcı ile giriş yapın

4. **Çıkış yapıp tekrar giriş yapın:**
   - Çıkış yapın
   - Aynı bilgilerle tekrar giriş yapın
   - Artık veritabanından okunuyor olmalı!

## 5. Sorun Giderme

### "Missing Supabase environment variables" hatası:
- Vercel Dashboard'da environment variables'ların doğru olduğundan emin olun
- Yeni bir deployment yapın

### "Table does not exist" hatası:
- SQL şemasını Supabase'de çalıştırdığınızdan emin olun
- Table Editor'de tabloların var olduğunu kontrol edin

### Kullanıcı giriş yapamıyor:
- Şifre hash'leme çalışıyor mu kontrol edin
- Supabase'de `users` tablosunda kullanıcının olduğunu kontrol edin
- `password_hash` alanının dolu olduğundan emin olun

## 6. Production Deployment

1. **Environment variables'ları kontrol edin:**
   - Vercel Dashboard → Project → Settings → Environment Variables
   - Tüm değişkenlerin Production, Preview ve Development için ayarlandığından emin olun

2. **Yeni deployment yapın:**
   - Git push yapın veya Vercel Dashboard'dan "Redeploy" yapın

3. **Test edin:**
   - Production URL'de uygulamayı test edin
   - Kayıt ol, giriş yap, çıkış yap, tekrar giriş yap

## Notlar

- **Şifre Hash'leme:** Şu anda basit bir hash kullanılıyor. Production'da bcrypt kullanılmalı (zaten yüklü, kodda kullanılıyor).
- **RLS (Row Level Security):** Şu anda tüm tablolar herkese açık. Daha sonra güvenlik için RLS politikaları sıkılaştırılabilir.
- **Backup:** Supabase otomatik backup alıyor, ancak önemli veriler için manuel backup da alabilirsiniz.

