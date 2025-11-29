import { Complaint } from '../types'
import { complaintApi } from '../services/complaintApi'

/**
 * Şikayetvar'dan alınan gerçek şikayetler
 * Kaynak: https://www.sikayetvar.com/trendyol-yemek/komisyon
 */
const sikayetvarComplaints: Omit<Complaint, 'id' | 'createdAt' | 'upvotes' | 'status'>[] = [
  // RESTORAN ŞİKAYETLERİ
  {
    title: 'İptal Edilen Siparişler Satıcı Panelinde Hatalı Görünüyor, KDV Ve Komisyon Mağduriyeti',
    description: 'Trendyol Yemek\'te "Kahramanmaraş Bereket Döner" isimli restoran olarak ciddi bir sistem hatası yaşıyorum. Trendyol Yemek üzerinden gelen bir sipariş, müşteri tarafından iptal edilmesine rağmen bizim satıcı panelimizde iptal edilmiş olarak görünmüyor. Biz bu siparişi kendi tarafımızdan iptal etmek istediğimizde sistem bize KDV ve komisyon kesintisi yapıyor. Bu durum maddi zarara neden oluyor.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Haksız İade ve Satıcı Mağduriyeti: Trendyol GO\'da Adil Olmayan Süreç',
    description: 'Trendyol GO üzerinde satıcı olarak hizmet veren bir restoran işletmecisiyim ve 435 TL tutarındaki 19 Kasım 2025 tarihli siparişte tamamen haksız bir iade süreci ile karşı karşıya kaldım. Müşteri bizden 1,5 porsiyon ürün siparişi verdi, ürün kendisine eksiksiz ve 1,5 porsiyon olarak teslim edildi. Ürünün iadesi Trendyol tarafından onaylandı ve biz hem yemeği hem de parayı kaybettik.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Yanlış Sipariş Sonrası Ödeme Mağduriyeti Ve Trendyol Müşteri Hizmetlerinde Çözüm Bulunamıyor',
    description: '10.10.2025 tarihinde saat 02:48\'de Trendyol Yemek üzerinden restoranımız Kıymetli Tatlar Çiğ Köfte adına online ödeme ile verilen 10581769353 numaralı siparişi hazırlayıp kurye ile adrese gönderdik. Kurye müşteriyi aradığında, müşteri Ankara\'da olduğunu ve yanlışlıkla sipariş verdiğini belirtti. Bunun üzerine sipariş iptal edildi ancak ödememiz yapılmadı. Müşteri hizmetleri ile defalarca iletişime geçmemize rağmen sorun çözülmedi.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Sipariş İptalleri Nedeniyle Maddi Ve Gıda Güvenliği Mağduriyeti',
    description: 'Trendyol Yemek platformunda sütlü tatlı satışı yapan bir işletmeyim. Ürünlerimizi siparişe göre hazırlayıp kaseliyoruz. Ancak sipariş iptal edildiğinde, gıda ürünleri olduğu için bu ürünleri tekrar rafa koymamız hem sağlık açısından uygun olmuyor hem de maddi olarak zarara uğruyoruz. Bu durumu defalarca bildirmemize rağmen bir çözüm sunulmadı.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Puan Sistemi Değişikliğiyle İşletmemin Karlılığı Tehlikeye Girdi',
    description: 'Yaklaşık 2-3 hafta önce Trendyol Yemek sisteminde yapılan yeni düzenleme ile birlikte, "Geliştirme Merkezi" bölümündeki puanlarımızda ciddi bir düşüş yaşadık. Platin seviyesinde yer alırken, birden bire gümüş seviyesine geriledim. Platin seviyesine tekrar ulaşabilmek için yalnızca "reklam bakiyesi" yatırmam gerektiği söylendi. Bu durum işletmemin karlılığını ciddi şekilde etkiliyor.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek\'te Yüksek Komisyon Ve İlgisiz Müşteri Hizmetleri Mağduriyeti!',
    description: 'Trendyol GO üzerinden 4 aydır satıcı olarak hizmet veriyorum. Bu süreçte karşılaştığım en büyük sorunlar; ürün içerik değişikliklerinin çok uzun sürmesi, yüksek komisyon oranları ve müşteri temsilcilerinin hiçbir şekilde sorunlara müdahil olmamalarıdır. Yaşadığım bu sorunlar nedeniyle defalarca müşteri hizmetlerine başvurdum ancak hiçbir çözüm sunulmadı.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Başvuru Öncesi Bilgi Eksikliği Restoranları Mağdur Ediyor',
    description: 'Trendyol GO\'ya restoran olarak başvuru yapmak istiyorum ancak bilgi alabileceğim hiçbir platform bulamıyorum. Kendi sistemleri üzerinden yalnızca başvuru formu doldurulabiliyor ve şirketim henüz olmadığı için bu formu dolduramıyorum. Sadece ön bilgi almak, özellikle komisyon oranları gibi temel bilgileri öğrenmek istiyorum ama bu bilgilere ulaşamıyorum.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Kendi Kuryeme Geçiş Talebim 6 Gündür Sonuçlanmadı, Mağduriyet Yaşıyorum',
    description: 'Trendyol Yemek üzerinden restoran sahibi olarak hizmet veriyorum. Komisyon oranlarının çok yüksek olması ve Trendyol GO kuryelerinin müşterilerime nakit para üstü vermemesi nedeniyle kendi kuryeme geçiş yapmak istedim. 6 gün önce geçiş talebimi oluşturdum (Restoran/Bayi numaram: 442536/18682). Ancak bugüne kadar hiçbir geri dönüş yapılmadı ve talebim hala beklemede.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek\'te İş Yeri Sahipleri İçin Yetersiz Destek Ve İlgisizlik',
    description: 'Trendyol Yemek platformunda 6655625 cari numarasıyla kayıtlıyım. Üye iş yeri olmak veya üyeliği iptal etmek çok kısa sürede gerçekleşebiliyor; ancak yaşanan herhangi bir sorunda muhatap bulmak neredeyse imkansız. İlk defa böyle bir deneyim yaşadım. Trendyol müşteri temsilcileriyle iki kez iletişim kurmaya çalıştım ancak hiçbir yardım alamadım.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Haksız İade Sonrası Ödememiz Yapılmadı Müşteriye Hem Yemek Hem Para Verildi',
    description: 'Biz Trendyol GO da restoranız müşteri haksız bir şekilde hiçbir şekilde dağılmayan yemeğimizi dağılmış olarak belirtip iade talebi oluşturmuş ve müşterinin yüklediği görsellerde yemeğimizin dağılmadığı görüntülenmektedir. Biz iade talebini reddettik buna rağmen Trendyol yemek iadeyi kabul etmiş ve biz hem yemeği hem de parayı kaybettik. Müşteri hem yemeği yedi hem de parasını geri aldı.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek\'te Esnafı Mağdur Eden Yorum Sistemi',
    description: 'Bir esnaf olarak maalesef biz de Trendyol Yemek ile çalışıyoruz. Bizden aldıkları binlerce lira komisyon yetmezmiş gibi, bir de yorum kısmı ile bizi mağdur ediyorlar. Bu birime kimse ulaşamıyor; yalan, yanlış ve aslı olmayan yorumları onaylayıp mağdur ediyorlar. Muhatap yok.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Haksız İade Taleplerini Onaylaması Restoranları Mağdur Ediyor',
    description: 'Trendyol ile 822614 restoran ıd kodu ile çalışan bir restoran olarak şikayetimiz, Trendyol\'un müşterinin haksız iade talebini onaylamasıdır. Bu durum suistimale açık olup, Trendyol\'un bu tutumu müşteriler tarafından kullanılmaktadır. Müşteri bu sayede bedava yemek yemektedir. Restoranlar bu anlamda ciddi zarara uğramaktadır.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol GO\'da Haksız İade Onayları Ve Restoran Mağduriyeti',
    description: 'Trendyol GO (Trendyol Yemek) üyesi bir restoran işletmesiyiz. 4 ay önce bir müşteri, gönderdiğimiz bir yemeğe bir bahane bularak ücret iadesi istedi. Kusurlu olmayan yemeğin iadesi Trendyol tarafından onaylandı. Biz de telefonla Trendyol\'a ulaşıp, kusurlu olmamasına rağmen nasıl onayladıklarını sorduk. Hiçbir açıklama yapılmadı ve sorun çözülmedi.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Reklam Ve Komisyon Sorunu',
    description: 'Trendyol GO, restoranları reklama itiyor. Kim daha çok reklam verirse ona daha çok müşteri gönderiyor ve oldukça fazla komisyon kesiyor. Buna bir çözüm bulunması gerekiyor. Restoranlar da bu sebeple dükkanlarında 100₺\'ye sattıkları ürünü 170-180₺\'ye insanlara gönderiyorlar.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  // MÜŞTERİ ŞİKAYETLERİ
  {
    title: 'Teslimat Ücreti Alınıp Siparişin Gecikmeli Ve Dolaylı Teslim Edilmesi',
    description: 'Trendyol Yemek üzerinden sipariş verdim. Teslimat ücreti ödendi ancak sipariş çok gecikmeli geldi ve dolaylı bir şekilde teslim edildi. Müşteri hizmetlerine ulaşmaya çalıştım ancak yeterli yardım alamadım. Teslimat ücreti ödendiği halde kaliteli bir hizmet alınamadı.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek\'te Kömür Gibi Lahmacun Şoku',
    description: '2 Nisan 2025 tarihinde Trendyol Yemek uygulaması üzerinden Bursa Nilüfer\'de lokanta hizmeti veren Yahyazade Restaurant firmasına lahmacun siparişi verdim. Gelen siparişi görünce Trendyol asistana bağlanıp görseli gönderdim. Kömür zehir resmen. Restaurant ve firma umurunda bile değil. Kömür gibi yemek geldi ve hiçbir çözüm sunulmadı.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
]

/**
 * Şikayetvar'dan alınan şikayetleri sisteme ekler
 */
export async function importSikayetvarComplaints(): Promise<void> {
  console.log(`Şikayetvar'dan ${sikayetvarComplaints.length} şikayet ekleniyor...`)
  
  for (const complaint of sikayetvarComplaints) {
    try {
      await complaintApi.create(complaint)
      console.log(`✓ Şikayet eklendi: ${complaint.title.substring(0, 50)}...`)
    } catch (error) {
      console.error(`✗ Şikayet eklenirken hata: ${complaint.title}`, error)
    }
  }
  
  console.log('Şikayetler başarıyla eklendi!')
}

