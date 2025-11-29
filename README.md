# AdilYemek

Yemek sipariş platformlarındaki sorunları toplu olarak ele almak ve çözmek için oluşturulmuş bir topluluk platformu.

## Özellikler

- 📝 Şikayet oluşturma ve yönetimi
- 🏢 Platform bazlı şikayet takibi
- 📊 İstatistikler ve analizler
- 🔗 Resmi makamlara şikayet entegrasyonu (yakında)

## Teknolojiler

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Zustand (State Management)
- React Router

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Proje Yapısı

```
adil-yemek/
├── src/
│   ├── components/     # React bileşenleri
│   ├── pages/          # Sayfa bileşenleri
│   ├── store/          # Zustand store'ları (yakında)
│   ├── types/          # TypeScript interface'leri (yakında)
│   ├── services/       # API servisleri (yakında)
│   └── utils/          # Yardımcı fonksiyonlar (yakında)
├── public/
└── package.json
```

## Geliştirme Planı

- [x] Temel proje yapısı
- [x] Routing ve navigasyon
- [x] Veri modeli ve state yönetimi
- [x] Şikayet formu
- [x] Şikayet listesi ve filtreleme
- [x] Platformlar sayfası
- [x] Resmi makam entegrasyonları
- [x] E-devlet OAuth entegrasyonu
- [x] Gerçek resmi kurum yönlendirmeleri
- [x] Toplu şikayet (Class Action) özelliği

## Gerçek API Entegrasyonu

Platform, gerçek resmi kurumlara entegrasyon için hazırdır. Detaylı bilgi için `REAL_API_INTEGRATION.md` dosyasına bakın.

### Hızlı Başlangıç

1. `.env.example` dosyasını `.env` olarak kopyalayın
2. E-devlet Developer Portal'dan Client ID alın
3. Environment variables'ı doldurun
4. Backend API'yi kurun (E-devlet token exchange için)
5. Production'a deploy edin

### Önemli Notlar

- E-devlet entegrasyonu için backend API gereklidir
- Gerçek API'ler için test ortamında test edin
- KVKK uyumluluğu sağlanmalıdır
- Tüm iletişim HTTPS üzerinden olmalıdır

