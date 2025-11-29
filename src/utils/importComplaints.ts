import { Complaint } from '../types'
import { complaintApi } from '../services/complaintApi'

/**
 * Şikayetvar'dan alınan gerçek şikayetler
 * Kaynak: https://www.sikayetvar.com/trendyol-yemek/komisyon (4 sayfa)
 * Toplam: 93 şikayet (tüm sayfalar)
 */
const sikayetvarComplaints: Omit<Complaint, 'id' | 'createdAt' | 'upvotes' | 'status'>[] = [
  // SAYFA 1 - RESTORAN ŞİKAYETLERİ
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
  // SAYFA 1 - MÜŞTERİ ŞİKAYETLERİ
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
  // SAYFA 2 - RESTORAN ŞİKAYETLERİ
  {
    title: 'Trendyol\'da Fiş Kaybı Ve Müşteri Açığı Sorunu',
    description: 'Trendyol Yemek üzerinden iki marka ile hizmet veren bir işletme sahibiyim. 15.03.2025 tarihinde 1830 ₺ tutarında online kredi kartı yöntemi ile bir müşteriden sipariş aldım. Ürünleri hazırladım, fişini kestim, poşete koydum ve Trendyol kuryesi ile gönderdim. Ancak sistemde fiş kaybı oldu ve müşteri açığı oluştu. Bu durum maddi zarara neden oldu.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol\'un Sipariş Takip Sorunu',
    description: 'Trendyol üzerinde 4 restoran sahibiyim ve siparişlerimi takip edebilmek için 4 ayrı internet sitesine giriş yapıyorum. Tek panel üzerinde toplanmıyor siparişler. Böyle bir devirde bunu yapmıyor olmaları büyük eksik ve bu kadar yüksek komisyon alıyorlar (%38) ve bunu yapmıyor olmamaları akıl alır gibi değil.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek\'te Haksız Komisyon Sorunu',
    description: 'Trendyol yemek sayfasında restoranız. Yemek kartı ile satışlarda zaten yemek kartı firmasına komisyon ödüyoruz, ayrıca Trendyol Yemek neden bizden haksız yere komisyon alıyor? Haksız kazançtır, iade edilmeli. Müşteri hizmetleri bu sorumuza cevap veremiyor çünkü haksız kazancın farkındalar, muhatap bulamıyoruz.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Kurye Ataması Ve Komisyon Adaletsizliği',
    description: 'Sipariş 11.36\'da geldi. 11.43\'te kuryeye teslim hale getirdik. Tam 32 dakika kurye ataması yapamadılar. 7 dakikada hazır ettiğimiz pizza buz gibi oldu. İkinci kez ısıttık. 32 dakikada bana kurye bulamıyorsanız %38 komisyonu ne hakla talep edersiniz? 32 dakika sonra kurye benden alıp en az 8-10 dakika daha geç teslim etti.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Uygulamasında Haksız Ödeme Engeli!',
    description: 'Trendyol Yemek uygulaması ile 961304 cari kodu ile müşterilerine hizmet veren bir iş yeri sahibiyim ve Trendyol Yemek\'te adımıza açık olmayan bir icra davası varmış gibi ödememize el koyuyor ve ödememek için müşteri temsilcisi yetkili birime ulaşmamızı engelliyor. Zaten yüksek olan komisyon oranları yetmezmiş gibi bir de bu sorunla karşılaşıyoruz.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Komisyon Politikası Restoranları Zorluyor!',
    description: 'Trendyol restoran işletmesi olarak, yapılan yüksek komisyon oranlarına bir son verilmelidir. Kesilen yüksek tutarda komisyon yetmiyor gibi, panelde görünür olmak adına mecburen kampanya yapıyoruz. Ama günün sonunda cebimizden para ödüyoruz. Bütün semte yemek ısmarlayıp para kazanacağım diye bekliyoruz ama sonuçta zarar ediyoruz.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Trendyol Semtin Yıldızı Rozetim Yansıtılmıyor',
    description: 'Trendyol Yemek ile restorant olarak çalışmaktayız. Aylık dönemler halinde semtin yıldızı uygulamasında Trendyol tarafından göz göre göre hile yapılmaktadır. Komisyon oranının düşmesi gözlerine çok göründüğü için olacak ki her dönem restoran puanı yüksek ilerlerken birden bire kriterlerin altında kalıyor ve rozetimiz yansıtılmıyor.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Trendyol GO Kuryeleri Hk;',
    description: 'Trendyol yemek panelini kullandığım işletmemde evlere servis için yine Trendyol\'un kendi kuryelerini kullanıyorum. Maalesef ki kuryelerin yaptığı hataları, kurye kaynaklı geç veya soğuk teslimatların bedelini işletme olarak bize yüklüyorlar. Daha açık ifade etmek gerekirse, kuryeye teslim ettikten sonra oluşan sorunların sorumluluğu bize kalıyor.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Panelinde Borç Sorunu Ve Müşteri Hizmetleri Mağduriyeti',
    description: 'İşletmemde Trendyol Yemek/Trendyol GO panelim üzerinden Sodexo ve Multinet\'i dahil ettirdim. Bu işlemden dolayı Trendyol\'a borç göründü ve aracı komisyon bedelini ödedim. Ancak yatırdığım tutar düşürülmedi. Canlı desteğe bağlanarak dekontları ulaştırdım ve müşteri hizmetlerine bağlandım. Hala 22 gündür sorun çözülmedi.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Fiş Talep Ettiğim İçin Hesabımı Askıya Aldı!',
    description: 'Trendyol GO, fiş taleplerim için hesabımı askıya aldı. Komisyon almasını biliyorsunuz, fiş talep edince mi hesap askıya alınır? Faturasız iş mi yapıyorsunuz? Hesabımı inceleyin, talep ettiklerim hepsi fiş, fatura. Çalıştığım yerden yoksa ücret iadesi alamıyorum. Siz de fiş istediğim için hesabımı askıya aldınız.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Kartları Komisyonu Altında Haksız Kazanç Elde Ediyor',
    description: 'Merhaba, Trendyol Yemek üzerinde yemek kartlarıyla satışa başladık. Trendyol, bilgi vermeden işletmelere yüksek oranda komisyon ücreti kesiyor. Bu oran, Trendyol tarafından sır gibi saklanıyor. Benim işletmelere önerim, kesinlikle bu duruma düşmemeleri ve satış yapacaklarına gelirlerini Trendyol\'a vermemeleri.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  // SAYFA 2 - MÜŞTERİ ŞİKAYETLERİ
  {
    title: 'Trendyol Yemek Yanlış Ürün Ve İlgisiz Müşteri Hizmetleri',
    description: 'Yanlış gramajlı ürün geldiği halde üstelik restoran hatasını kabul ettiği halde Trendyol müşteri hizmetleri yardımcı olmadan konuyu kapatmaya çalışıyor. Yanlış ürüne fazladan 500 TL ödemişken bu arkadaşlar ilgilenemiyormuş. Size ne diye komisyon ödüyoruz o zaman?',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Eksik Sipariş Ve Yetersiz Destek',
    description: 'Boş yere komisyon alan, işini yapmayan, yetersiz bir canlı destek hattı ve sistemine sahip yemek sipariş sitesi. Flash indirime giren bir dükkandan kahve ve tatlı aldım. İndirimle ikisini beraber alınca uygun olduğundan aldım. Yoksa tek başına ne tatlıyı alırdım ne de kahveyi. Siparişimde kahvem eksik geldi.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'İptal Edilen Siparişin Para İadesi Yapılmadı',
    description: 'Trendyol yemek üzerinden Köfteci Yusuf\'tan söyleyip aradan birkaç dakika geçtikten sonra iptal ettiğim siparişimin parası geri iade edilmedi. Trendyol\'un Aldığı komisyon helal mi? Ya da Köfteci Yusuf\'un yediği para? Tartışılır. Ders oldu. Bir daha sipariş vermeyeceğim.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: '1.5 Saatlik Kurye Bekleyişi Ve Yetersiz Hizmet',
    description: 'Neredeyse 1.5 saat bekledim, kurye atanmadı. Çıkıp 1.5 saat sonunda kurye atamada sorun yaşandı, o yüzden yoğunluk var dediler. 5 dakikada hazırlanan sipariş\'e 1.5 saat kurye atanmadı. Gerçekten alınan komisyonlar, yemeklerin aşırı fiyatları bir yana, bari hizmet alabilsek. Yazınca arıyorlar yok şöyle yok böyle diyorlar.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol GO Çözüm Süreçlerinde Yetersizlik Ve Müşteri Memnuniyetsizliği',
    description: '6 Kasım 2024 Cuma günü Trendyol GO uygulaması üzerinden verilen yemek siparişi, soğuk bir şekilde teslim edilmiştir. Yemek tedarikçi firmasının hatası olarak değerlendirilse de, asıl problem Trendyol GO müşteri hizmetlerinin bu soruna hiçbir çözüm sunmamasıdır.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol\'un Yüksek Komisyonları Tüketiciyi Zorluyor',
    description: 'Trendyol denen tekel olmuş bir firmanın uygulaması üzerinden yemek siparişi geçmek istedim. Hani şu her mahallede köşede satılan tavuk çevirme diye tabir ettiğimiz yemekten. Bu firmanın uygulamasını açtım ve gözlerime inanamadım. 1 tane tam tavuk çevirme hemen hemen her firmanın listelemesinde 500-700 TL arası. Restoranlar Trendyol\'un ekstra aldığı ücretler nedeniyle fiyatları yükseltiyorlar.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek\'te Adil Olmayan İndirim Uygulaması!',
    description: 'Trendyol Yemek\'te restoran işletmesi yapıyorum. Minimum paket fiyatım 100 TL. 100 TL\'nin altında sipariş gönderimi sistemsel olarak olmuyor. Kampanyalar bölümünden 55 TL\'lik indirim kampanyasına katıldım. Kampanya detayında, indirimden faydalanmak için minimum paket tutarını geçmeniz durumunda indirim uygulanacağı yazıyordu. Ancak sistem böyle çalışmıyor.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Buz Gibi Yemek Ve İade Sorunları',
    description: 'Merhabalar, 13.10.2024 tarihinde saat 3\'ü 40 geçe Salamburger\'den yemek siparişi verdim. Yemek, 50 dakika sonra başka birine gidip geri gelen bir sipariş olarak bana teslim edildi ve buz gibi bir haldeydi. İade işlemleri sırasında, yemeğin açılmadığını göstermek için fotoğraf çekip iade talebi istedim ancak iade yapılmadı.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Mağdurum İlhan Yüregir',
    description: '60 görevi tamamlayamıyorum. Son 14 görevim kaldı. Bütün paramı yatırdım, şu an mağdurum. Komisyon istemiyorum. Kazandığım parayı da istemiyorum. Benim yatırdığım paranın tarafıma, hesabıma gönderilmesini istiyorum. Bana bu konuda yardımcı olun lütfen, gerçekten zor durumdayım.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Müşterilerini Korumuyor., Yardımcı Olmuyor',
    description: 'Trendyol yemek üzerinden söylediğim son yemekler restoranlar tarafından hatalı eksik veya geç gelmeye başladı. Bununla ilgili Trendyol GO Müş.-hiz. İle birkaç kez yazıştım. Ama devamlı müşterisi yerine komisyon almak için kalitesiz restoranların tarafında yer almaya başladılar. Sanki bilerek yemek siparişi veriyormuşum gibi davranıyorlar.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Trendyol İlgisizliği / Mağduriyeti',
    description: 'Trendyol yemek restoran üyeliğimiz vardı. İş yerimizi ve panelimizi kapattık. Ancak paneli açtığımızda finans bölümünde 23.05.2024 tarihinden itibaren 84,91 TL borcumuz görünüyor. Ne borcu olduğuna dair herhangi bir bilgi yok. Canlı destek hattına yazdım komisyon borcu olduğunu ilettiler ve 07.06.2024 tarihinde ödeneceği söylendi ancak hala ödenmedi.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Ve Evde Nasıl Yapıldığı Belli Olmayan Yemekler',
    description: 'Trendyol Yemek, komisyon almak uğruna halk sağlığını tehlikeye atıyor. Bugün verdiğim bir siparişin restoran değil, normal bir evden yapılıp gönderildiğini öğrendim. Nasıl ve kimin yaptığı belli olmayan, bakanlık tarafından denetlenmeyen yerleri nasıl listelersiniz diye sorduğumda, \'Biz içeriğini görmüyoruz\' dediler.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek 2 Saat Sipariş',
    description: 'Trendyol Yemek yaklaşık 2 saatte siparişimi getirmedi ve asistan uygulaması çoğu defa çalışmıyor, bizi mağdur ediyor. Yoğunluktan dolayı siparişi 2 saat sonra iptal ediyorlar, ilgilenmiyorlar ve uygulama sık sık donuyor, arıza veriyor. Bu durum bir değil, birkaç defa başıma geldi. Ayrıca, satıcılardan komisyon alıyorlar ama hizmet kalitesi çok düşük.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  // SAYFA 3 - RESTORAN ŞİKAYETLERİ
  {
    title: 'Trendyol Yemek GO Kuryelerinin Hatalarını Restoranlar Çekiyor',
    description: 'Ben Trendyol yemek üyesi olan GO kuryesi ile çalışan bir işletmeyim. Siparişi tam zamanında doğru bir şekilde göndermeme rağmen GO kuryesi ürünü teslim etmeden teslim işaretlemiştir. Müşteri doğal olarak yorum yapmış ve bütün suçu işletmeme atmıştır. Kendimi savunma amacıyla yanlışın GO kuryesi tarafında olduğunu belirttim ancak hiçbir sonuç almadım.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Kasti Puan Düşüklüğü',
    description: 'Trendyol Yemek ile restorant olarak çalışmaktayız. 3 Aylık dönemler halinde semtin yıldızı uygulamasında Trendyol tarafından göz göre göre hile yapılmaktadır. Komisyon oranının düşmesi gözlerine çok göründüğü için olacak ki her dönem restoran puanı yüksek ilerlerken birden bire kriterlerin altında kalıyor ve puanımız düşürülüyor.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek 60 TL Paramı Ödemiyor.',
    description: 'Trendyol GO yemek servisi 60 TL\'lik ödememi gerçekleştirmiyor. Trendyol yemek satıcı panelinin bir kullanıcısıyım. Bir müşteri çift porsiyon patates sipariş etti ve biz de isteğe uygun olarak çift porsiyon patates gönderdik. Müşteri, gönderdiğimiz patatesleri yedikten sonra Trendyol\'a iade talebi oluşturdu ve Trendyol bu talebi onayladı. Biz hem yemeği hem de parayı kaybettik.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Restoranımızın Zararına Satış Sorunu Ve Destek Talebi',
    description: 'Trendyol yemek, restoran işletmemizin fiyatlarını sistem hataları yüzünden düşürmüş. Fiyat düşüşünü fark ettiğimizde destek hattını aradık ancak bir sonuca ulaşamadık. Sadece \'kusura bakmayın\' dediler. Yüksek komisyonlarla sağlanan hizmetin yanı sıra, bize zararına satış yaptırıp, üzerine sadece özür dilediler.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Trendyol GO Müşterimi Kayırıyor?',
    description: 'Trendyol üzerinden yemek siparişi alan bir büfe işletiyorum. Son iki aydır sipariş almakla ilgili sorunlar yaşıyorum. Ben panelimi açıp sipariş beklerken, yakınlarımda olan bir müşterim şahsi numaramı arayarak \'Hayırdır, neden kapalısınız, bir sıkıntı mı var?\' dedi. Şaşırdım, \'Kapalı değilim\' dediğimde müşteri Trendyol uygulamasında restoranımın kapalı göründüğünü söyledi.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Yorum Değerlendirme Ayrımcılığı',
    description: 'Trendyol yemek müşterinin yorumuna karşılık düzgün şekilde yorum yaptığımız halde yorumu kabul etmeyip bir de düzeltmiyor. İş yerlerinden o kadar komisyon alınmasına rağmen iş yerlerine hiçbir şekilde yardımcı olmuyorlar. Müşteri temsilcilerine öğrettikleri tek şey bu konuda yardımcı olamıyoruz.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Trendyol Satıcı Destek Hattı Sorunları Çözmüyor!',
    description: 'Trendyol Yemek ile iş birliği yapıyoruz. Başlarken ciromuzun artacağını düşünerek Trendyol ®️ GO kuryesi ile çalışmak istediğimizi söyledik, fakat günde hiç olmadı en azından 1-2 siparişte kurye tarafından sorunlar yaşadığımız için, ve trendyolgo hiç iş olmamasına rağmen kendi restoranımızı kafasını görmüyorlar.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Restaurant Destek Hattı Hiçbir Türlü Sorunları Çözmüyor',
    description: 'Trendyol Yemek ile iş birliği yapıyoruz. Başlarken ciromuzun artacağını düşünerek Trendyol GO kuryesi ile çalışmak istediğimizi söyledik, fakat günde hiç olmadı en azından 1-2 siparişte kurye tarafından sorunlar yaşadığımız için, ve trendyolgo hiç iş olmamasına rağmen kendi restoranımızı kafasını görmüyorlar.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Restoran Kayırma Ve Haksız Puan Düşürme',
    description: 'Trendyol\'da restoranımız var, franchise olarak çalışıyoruz. Yıllardır yüksek olan puanımız ve yorumlarımız, müdürlere ait olan şubelerin puanlarını ve yorumlarını yükseltmek için düşürüldü. Canlı desteğe bağlanamıyoruz. Telefonla ulaştığımda karşıma çıkan yetkiliye, düşük bir puanım olmamasına rağmen nasıl düşürüldüğünü sorduğumda hiçbir açıklama yapılmadı.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Haksız Yere Parama El Konuldu!',
    description: '02.10.2023 tarihinde bulunduğum adrese #2345869057 takip numaralı siparişi verdim. Sipariş notu kısmına telefonumun çekmediğini, siparişim geldiğinde WhatsApp üzerinden aranmam gerektiğini not düştüm. Daha sonra öğrendim ki kuryenin WhatsApp üzerinden arama zorunluluğu yokmuş. Buna rağmen siparişim teslim edilmedi ve parama el konuldu.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Ücret İade Etmiyor!',
    description: 'Geçtiğimiz 4 Kasım günü her zaman sipariş verdiğim restorandan Trendyol GO üzerinden sipariş verdim. Siparişimin içerisinden bir ürün eksik geldi. Hemen anında Trendyol\'a asistan üzerinden bağlanıp görseller ile durumu izah ettim. Trendyol asistan bana ürün tedariği yapılamayacağını ancak iade talebi oluşturabileceğimi söyledi. İade talebi oluşturdum ancak ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Hiçbir Sorunu Çözmüyor. Canlı Destek Niye Var?',
    description: 'Trendyol yemekten gerçekten artık bıktım. Daha önce siparişimi teslim etmeyip üzerine benden para aldıkları oldu. Ki bu durum iki kez tekrarlandı. O günden sonra Trendyol yemekten asla sipariş vermeyeceğime karar verdim fakat bu akşam yine bir hataya düşüp sipariş verdim kararımı unutup. Verdiğim sipariş yine gelmedi ve canlı destek hiçbir çözüm sunmadı.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Fazla Ücretle Bayat Yemek Gönderiyor',
    description: 'Aslında zaten şikayet puanı bile Trendyol\'un neye hizmet ettiğini açıklıyor. Fiyatların üzerine komisyon veriyorsunuz ve üstüne yemek diye saman gibi bir şeyler geliyor. Yemek söylüyoruz her seferinde buz gibi saman gibi geliyor. Aradık geri alın diyoruz almıyoruz. İade başlatalım diyorlar tamam diyoruz ama iade yapılmıyor.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Gelmeyen Siparişlerin Üzerine Soğuk Su',
    description: 'Trendyol Yemekten sipariş verdim. Ürünlerimin hiçbiri ortada yok. Kurye gelmiş bana boş poşeti getirmiş. Ürünler yok dediğimde, müşteri temsilcisiyle görüşün dedi gitti. Müşteri temsilcisine söyledim, anlattım durumu fakat hiçbir sonuç alamadım. İade talebim bir saat içinde iptal edilmiş. Daha sonra tekrar aradığımda "siparişiniz gelmiş" dediler ama gelmemişti.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Trendyol Promosyon Sipariş İptali',
    description: 'Kartımda kalan son parayla flaş promosyondan sipariş verdim, \'tedarik sürecindeki aksaklık\' sebebiyle iptal oldu ki asla bu sebebe inanmıyorum. Zaten indirimde olan restoran bir de promosyona katılıyor ve böylece kâr edemeyecekleri siparişleri iptal ediyorlar. Karşılayamayacağınız promosyona niye katılıyorsunuz?',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Ve Gıda Zehirlenmesi!',
    description: 'Tavuk Dünyası Cumhuriyet Mahallesi Esenyurt/İstanbul Trendyol Yemek\'ten 12 Ağustos saat 14:00\'te tükettiğimiz 2 kişilik şefin tavası siparişinden sonra ekip arkadaşım ve kendim zehirlendim. 22:20\'de zorla kusabildim hayatımda ilk defa yaşadığım bir durum ama hijyen ve yemeklerden çıkan kıl, böcek ve diğer maddeler göz önüne alındığında bu durumun ciddiyeti anlaşılabilir.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek İptal İade Yapılmaması',
    description: 'Trendyol ücret iadesi yapmıyor hem ücreti kesiyor hem de ürünü getirmiyor haliyle hem restoran hem de Trendyol komisyonuna bakıyor temiz bir para kazanma sistemi adresi değiştirmek istedim ne adresi değiştirdiler ne de para iadesi yaptılar. Bu kadar amatör bir çalışma sistemi yok.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Siparişin Sebepsiz İptali',
    description: 'Trendyol Yemek\'ten bir sipariş verdim, sipariş verene kadar ve ödeme yapana kadar sorun yok, tam yemeği bekliyoruz sebep yoğunluktan dolayı iptal, hiçbir yaptırımınız yok. Bu kaçıncı ya, ne yaptınız, sadece komisyonunuza bakıyorsunuz. Müşteri hiç önemli değil, sonra sizi kaybetmek istemiyoruz, ne yapıyorsunuz?',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek İlgisiz, Çözümsüz Tek Dertleri Komisyon',
    description: 'Trendyol yemekten açık restoran seçilerek yemek siparişi verdik beklemeye başladık. Trendyol uygulamasından baktığımda hazırlandığı gözüküyor yani sipariş yapılmış, parası ödenmiş ve restoran siparişi almış olmak zorunda. Zaten Trendyol yemek aldığı komisyon dışında bir şey le ilgilenmediği için sipariş gelmedi.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Siparişim Yanmış Teslim Edildi',
    description: '11.0.62023 Tarihinde, Trendyol yemek üzerinden Sun Brothers Pizza, Bilkent Şubesinden pizza, ve siparişimizi verebilmek için 190 TL\'lik limiti doldurmak adına dana sucuklu Sarımsaklı ekmek siparişi verdik. Pizza soğuk ve sertti ve tadı garipti. Midemiz bulandı yiyemedik. Sarımsaklı dana sucuklu ekmek yanmış ve yenilemez haldeydi.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Hatası! Para İademi Yapmıyor',
    description: 'Trendyol yemek siparişinden sipariş verdim. 06.06.2023 tarihinde saat: 15:37\'de yemeğimin iptal edildiğini teslimat edilecek bölgenin uzak olduğu belirtildi. Kim tarafından iptal edildiğini sorduğumda sipariş etmiş olduğum kumpir yerinden olduğunu söylediler. 2.1 km\'lik yerin nesi uzaktır?, ben bulunduğum yerden 2.1 km uzakta olan bir yerden sipariş veriyorum ve iptal ediliyor.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek\'den Yepyeni Hizmet',
    description: 'Trendyol yemek\'te indirim kodu denerken yanlışlıkla çekim yaptı. Şifresiz çekti 5 saniye bile geçmeden hemen iptal etmek için müşteri temsilcisine bağlandım yalandan 30 saniye bekledi ve ulaşamıyoruz. Köfteci Yusuf\'a maalesef iptal edemeyiz diye döndü geri bari 1 dakika filan bekleseydin ya komisyon alıyorsunuz bari hizmet verin.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  // SAYFA 4 - RESTORAN ŞİKAYETLERİ
  {
    title: 'Trendyol Yemek Esnafı Mağdur Ediyor',
    description: 'Alsancak bölgesinde hizmet veren bir esnafım, şubem Katık Döner Alsancak Trendyol yemek siparişleri hakkında çok ciddi bir sorunumuz var. Siparişler geliyor ve teslim ediyoruz. Ancak bazen panel üzerinden siparişleri teslim etmeyi unutuyoruz. Müşteriler siparişleri teslim almasına rağmen, iptal etme hakkı veriliyor ve biz hem yemeği hem de parayı kaybediyoruz.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Trendyol\'dan Ödeme Alamıyorum!',
    description: 'Trendyol Yemek üyesi olan Burger Restorantının sahibiyim. Trendyol üzerinden gelen bir siparişi hazırlayıp müşteriye götürmemize rağmen Trendyol siparişi iptal etti daha sonra aradığımda müşteriden siparişi alıp almadığı konusunda arama yapıldı ve müşteri urunu teslim aldığını beyan etmesine rağmen ödememiz yapılmadı.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Buzgibi Yemek',
    description: 'Trendyol Yemek partneriyim müşteri 18;36 da sipariş oluşturmuş sipariş 18;36 da onaylandı şu an saat 19;45 ve hala kurye gelmedi yüzde 37 komisyon alıyorsunuz ve hiçbir şekilde ne müşteriye ne de esnafa saygı göstermiyorsunuz.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek GO Çalışma Modeli Şikayetleri!',
    description: 'Trendyol yemek restoran ortaklarından biriyim. GO kuryesi ile çalışıyorum. Gece 02:00 olan kapanış saatimi kurye eksikliği nedeniyle 00:30 \'a çektiler. Eyvallah dedim ama saat 21:00 gibi bir başlıyor. Ya kurye ataması yapmıyor ya beni bölgesel yoğunluğa alıyor. Tabiri caizse iş yaptırmıyor. Oturduk bekliyoruz sipariş gelmiyor.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  // SAYFA 4 - MÜŞTERİ ŞİKAYETLERİ
  {
    title: 'Trendyol Yemek Kesinlikle Tüketiciyi Umursamıyor',
    description: '29.05.2023 saat 01:01\'de Trendyol yemek uygulaması üzerinden Pasaport Pizza\'dan sipariş verdim. Tam 45 dakika sonra yani 01:46 da Trendyol\'dan "siparişin tedarik sürecindeki bir aksaklık nedeniyle gönderemiyoruz" diye mesaj geldi. Tam 45 dakika sonra. Bu Trendyol yemekteki ilk durum değil, daha önce de benzer sorunlar yaşadım.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek İlgisizliği Zorla Siparişi Vermeye Çalışmaları',
    description: 'Trendyol yemek üzerinde yemek siparişi verdim, işletmeden yolda gözükmesine teslimat süresinin üzerinden 1 saatten fazla geçmesine rağmen yemek gelmeyince haklı olarak iptal etmek istedim, müşteri temsilcisi arkadaş işletmeye bağlanamadı üstüne hala bekleyin diyor, teslimat süresi geçmiş işletme telefonu açmıyor ama hala bekleyin diyorlar.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Trendyol Yanlış Gelen Yemeklerle İlgilenmiyor',
    description: 'Trendyol\'dan sipariş verdiğim yemek yanlış geldi ve programdan talep oluşturduk. 2 gün içinde sonuçlanacağı yazıyor. Sanki elbise almışız 2 gün sonra dönüş yapacaklar. Dışarıda ki herhangi bir restorandan (numaraları zaten internette var) alışveriş yapsam daha çabuk dönüş yapılır, ilgilenirler ve sorun çözülür.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Akçaalan 2 Kokoreç & Ev Yemekleri (Karabağ) Sipariş İptali Sıkıntısı',
    description: 'Akçaalan kokoreç 2 den Trendyol üzerinden ilk siparişimi oluşturdum 99 TL yerine 39 TL kampanyalı işlem yaptım. Akçaalan kokoreç\'ten arayıp sistem üzerinden siparişimi iptal edeceklerini çünkü kendilerinden %11 komisyon kestiklerini söylediler, bende 39 TL olarak mı ödeyeceğim dediğim de hayır 99 TL ödeyeceksiniz dediler.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek İlk Sipariş Mağduriyeti',
    description: 'Trendyol Yemek ten ilk siparişimi verdim 90 TL üzeri 60 TL indirim kodum vardı. Sipariş verilir verilmez iptal edildi ve kuponumda gitti. İş artık mağduriyetten çıktı. Uygulamadan yemek siparişi falan vermem telefonla efendi gibi komisyonsuz yemeğe devam',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Yanlış Siparişin İadesini Sağlamıyor',
    description: '20 Nisan 2023 tarihinde Trendyol yemek üzerinden bir sipariş oluşturdum ve online olarak ödeme yaptım. Sipariş numarası 1971403006. Siparişle alakalı; - verdiğim siparişteki ürün ile gelen ürün farklı olması, - Trendyol yemekte görünen restoran adı ile yazar kasa fişinde ki restoran adı farklı olması gibi sorunlar yaşadım. İade talebi oluşturdum ancak iade yapılmadı.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Asılsız Sözde Firmasınız',
    description: 'İstanbul Ocakbaşı Şirinevler firması (m** m** ı**) işletmemiz için yazıyorum. Olur olmaz, asılsız tüm şikayetleri herhangi bir ispat, delil herhangi bir görüntü olmadan ciddiye alıp yayınlayıp ne kadar ciddiyetle bağdaşmayan (sözde) firma! Olduğunuzu her seferinde ispatlıyorsunuz. Asılsız şikayetler yayınlanıyor ve işletmemiz mağdur ediliyor.',
    category: 'restaurant',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek İşletme Saygısızlığı Ve Kalitesinin Düşmesi',
    description: 'Çiğli Balatçık, Çatalda Tavuk şubesinden telefon numarası üzerinden yemek siparişi verdim. İki menü için ödemem gereken fiyat Trendyol yemek uygulaması üzerinde 250 TL\'dir. Siparişi verdikten 15 dakika sonra işletme sahibi telefondan arayarak yemeğin ücretini kartla ödeme yapacağımı belirttiğim halde nakit ödeme istedi ve siparişi iptal etti.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Gönderilmeyen Ürün Ve Ücret İadesi Yapılmayan',
    description: '13.03.2023 Tarihinde Trendyol Yemekten yemek siparişi verdim. Siparişimde 34,65 t. L. Değerinde 1 Litre Fanta olmasına rağmen tarafıma teslim edilen siparişte 1 Litre Fanta yerine 24,75 t. L. Değerinde kutu Fanta vardı. Bu durumdan dolayı 9.99 t. L lik fiyat farkı ve 1 Litre yerine 330 Ml gönderilmesi nedeniyle iade talebi oluşturdum ancak iade yapılmadı.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Sipariş İptal Edilmiyormuş',
    description: '31.01.2023 tarihinde Trendyol GO\'dan yemek siparişi verdim uygulama iş adresini seçmiş sipariş yanlış adrese verildi. Müşteri hizmetlerini aradım verilen sipariş iptal edilmiyormuş para dükkanın hesabına gidiyormuş gibi saçma bahane ile siparişi iptal etmedi ve param boşuna gitti. Para dükkanın hesabına gidiyorsa ben neden ödüyorum?',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Siparişin Gelmemesi Ve İptali',
    description: 'Firma temsilcisi adeta Trendyol temsilcisi değil, benim sipariş vermiş olduğum firmanın elemanı gibi davrandı. Siparişim 1,5 saat boyunca gelmemesine rağmen iptal etmemek için direndi. Böylelikle Trendyol\'un komisyon almak için çalışmış olduğu işletmeleri kolladığı ve bizim mağdur olmamıza izin verdiği açıkça görülüyor.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Teslim Edilmeyen Ve Para İadesi Yapılmayan Kayıp Yemek Siparişi',
    description: 'Trendyol yemek asla teslim etmediği siparişi teslim ettik diye bildiriyor ve aradığımda yemek imha edildi deniyor, yemek imha edildi. Dedikleri de; ya kuryeler yiyor ya da tekrar satıyormuş, alımı yaptığım restorandan öğrendim, arayınca yapacak bir şeyimiz yok deyip telefonumu engellediler, 5 dakika sonra sipariş teslim edildi gösterildi.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Teslim Edilmeden "Edildi" Gösterilen Yemek Siparişi',
    description: '1771130680 numaralı Ürün, siparişten 60dk sonra teslim edilmeden "Teslim Edildi" şeklinde görüntülenmeye başladı. Müşteri hizmetlerinden e*** bey de yardımcı olamadı. İptal edelim o halde dedim. Edemeyiz dedi. Prosedür böyleymiş (!? ) 1 saat 15 dakika sonra buz gibi getirdiler teslim almadım. Trendyol yemek sadece komisyon almak için çalışıyor.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek İçin Müşteri Memnuniyeti Önemli Değil',
    description: 'Trendyol yemek üzerinden teslimat süresi 20-30 dakika yazan bir sipariş verdim. Siparişin 35. Dakika sında sipariş teslim edildiye dönüştü ancak sipariş gelmedi. Canlı desteğe bağlandım iptal istedim yapmadılar. 1saat 10 dakika sonra 3 tane buz gibi pide geldi teslim almadım geri gönderdim. Canlı destek hiçbir çözüm sunmadı.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Müşteri Memnuniyetsizliği',
    description: '11.12.2022 tarihinde Trendyol yemekten 57.00 TL tutarlı sipariş geçtim. İki adresim kayıtlı sistemde. İki adresimin arası 150 metre. Kendim adreste yokum. Evde iki yaşlı insan var. Sipariş geçerken iş adresim işaretli kalmış. Normalde son kez sorması lazım belirttiğin adresten uzaksın diye. G**ve Y*** restoranından sipariş verdim ama yemek gelmedi.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemekten Sipariş Geç Geldi Gelmedi İade Olmuyor',
    description: '10.12.2022 cumartesi gününü pazar gününe bağlayan gece 01:32 saatinde Trendyol yemek üzerinden evime konum olarak motorsiklet ile 4 dakika gözüken Komagene çiğköfte Eskişehir akarbaşı şubesinden sipariş verdim. Hazırlanması en kolay, konumu en yakın ve o saatte restoran yoğunluğu olmayacak şekilde sipariş verdim. Ancak sipariş 2 saat sonra geldi ve soğuktu.',
    category: 'customer',
    platform: 'Trendyol Yemek',
  },
  {
    title: 'Trendyol Yemek Paydaşlar Kontrol Edilmeli',
    description: 'Siz paydaşlarınızın elemanlarına sigorta yapıp yapmadığını sorgulamıyorsunuz. Bu tür adamlara para kazandırmayın sadece komisyon alıyoruz diye kocaman şirketsiniz en baştan bunu sıkı tutacaksınızki paydaşlarınızın yanında çalışan elemanlarda rahat etsin.',
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
