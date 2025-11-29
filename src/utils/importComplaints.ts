import { Complaint } from '../types'
import { complaintApi } from '../services/complaintApi'

/**
 * Şikayetvar'dan alınan gerçek şikayetler
 * Kaynak: 
 * - https://www.sikayetvar.com/trendyol-yemek/komisyon (4 sayfa, 93 şikayet)
 * - https://www.sikayetvar.com/yemeksepeti/komisyon (2 sayfa, 44 şikayet)
 * - https://www.sikayetvar.com/getiryemek (1 sayfa, 25 şikayet)
 * Toplam: 162 şikayet
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
  // YEMEKSEPETİ KOMİSYON ŞİKAYETLERİ
  // Kaynak: https://www.sikayetvar.com/yemeksepeti/komisyon
  // SAYFA 1 - RESTORAN ŞİKAYETLERİ
  {
    title: 'Kendi Kuryeme Geçiş Talebime Yemeksepeti\'nden Yanıt Alamıyorum, İşlerim Aksıyor',
    description: 'Yemeksepeti iş ortağı olarak Ankara Aktepe\'de hizmet veren Zirve Soğuk Baklava işletmecisiyim. Yaklaşık 2 aydır kendi kuryeme geçiş yapmak istiyorum. Komisyon oranlarının yüksek olması nedeniyle kendi kuryemle çalışarak bu oranı düşürmek ve fiyatlarımı müşterilerim için daha uygun hale getirmek istiyorum.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Kendi Kuryemizle Çalışma Talebimize Dönüş Yapılmıyor Ve Sorunumuz Çözülmüyor',
    description: 'Tosthane Didim (Didim/Aydın) işletmesinin sahibi olarak, Yemeksepeti üzerinden uzun süredir yaşadığımız bir sorunu paylaşmak istiyorum. Yüksek komisyon oranları nedeniyle kendi kuryemizle çalışmak için defalarca başvuruda bulunduk. Ancak her seferinde "kısa sürede dönüş yapacağız" denilerek süreç sürüncemede bırakılıyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Joker Kesintisiyle Haksız Kazanç Ve Destek Eksikliği',
    description: 'Restoran sahibiyim. Yemeksepeti\'nde Joker indirimi hiçbir şekilde aktif olmamasına rağmen, her siparişimden \'Joker kesintisi\' adı altında haksız para alıyorlar. Müşteri hizmetlerini defalarca aradım; \'Joker aktif görünmüyor ama kesinti var, işlem yapamıyoruz\' diyerek geçiştiriyorlar. Bu tamamen işletmemizi mağdur eden bir durum.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Kendi Kuryemizi Kullanmamıza İzin Verilmiyor, Mağduriyet Yaşıyoruz',
    description: 'Haziran 2025\'ten bu yana, restoran kodumuz gjsn ile Yemeksepeti üzerinden kendi kuryemizi kullanmak için en az 5 defa yazılı olarak ve çok sayıda telefon görüşmesiyle başvuruda bulunduk. Ancak her hafta e-posta yoluyla yaptığımız başvurular dikkate alınmadı, tarafımıza yalnızca "Müşteri yorumlarında..." denilerek geçiştirildi.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti\'nden Haksız Sipariş İletim Bedeli Kesintisi Nedeniyle Maddi Zarar',
    description: 'Sakarya\'da faaliyet gösteren "Çorbam" adlı restoranımda, yaklaşık 10 gündür Yemeksepeti iş ortağı olarak hizmet vermekteyim. Restoranımı açtığımdan bu yana toplamda 30 sipariş aldım. İlk 20 siparişte herhangi bir sorun yaşanmazken, son 10 siparişte her bir siparişten "sipariş iletim bedeli" adı altında haksız kesinti yapıldı.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti\'nin Ek Ücret Ve Komisyon Politikaları İşletmemizi Mağdur Ediyor',
    description: 'Lüleburgaz Büfe Komşu olarak Yemeksepeti\'nin son dönemde uyguladığı ücretlendirme politikası nedeniyle ciddi mağduriyet yaşamaktayız. Sipariş veren müşterilerden alınan ek ücretler ve yüksek komisyon oranları işletmemizin karlılığını olumsuz etkiliyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Yüksek Komisyon Ve Kurye Zorunluluğu Mağduriyeti',
    description: 'Yemeksepeti üzerinden Eskişehir\'de faaliyet gösteren restoranım için yaklaşık 3 aydır ciddi bir sorun yaşıyorum. Platform, kendi kuryeleriyle çalışmam için beni zorlamakta ve bu nedenle yüksek komisyon talep etmektedir. Restoranımın üye numarası: zmgx. Bu konuyla ilgili olarak defalarca Yemeksepeti müşteri hizmetlerine başvurdum ancak çözüm bulamadım.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Vale\'den Ayrılamıyoruz: Yüksek Komisyon Ve Cevapsızlık',
    description: 'Ayvalık Tost Dünyası Aydın Efeler Cumhuriyet Caddesi şubesi olarak, Yemeksepeti Vale kurye sistemine yaklaşık bir yıldan uzun süredir dahiliz. İşletme numaramız D 531\'dir. Başlangıçta cazip görünen komisyon oranları zamanla ciddi şekilde arttı; yüzde 20 ile başlayan oranlar şu an yüzde 44\'e ulaştı.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Yemek Kartı Ve Kendi Kurye Kullanımına İzin Vermiyor',
    description: 'İstanbul Bayrampaşa\'da faaliyet gösteren Gwzy jr. Tosting ve Sandviç olarak, Yemeksepeti Partner platformunda yaşadığımız bir sorunu paylaşmak istiyorum. Lokasyonumuzun çevresindeki diğer restoranlar yemek kartı ile ödeme kabul edebiliyor ve kendi kuryeleriyle çalışabiliyorlar. Ancak aynı talebimizi bizim için reddediyorlar.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yüksek Komisyon Oranları İşletmeleri Zorluyor',
    description: 'Yemeksepeti\'nde mağaza açacağım ama komisyon oranları ciddi derecede yüksek benden daha fazla para kazanıyor. Hesap yaptığımda bu kadar ciddi komisyon oranı alınır mı? Sadece Yemeksepeti\'nde değil getir, Migros ve Trendyol\'da da böyle! İşletmelere yazık değil mi?',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Hem Müşteriden Hem Restorandan Haksız Ek Ücretler Alıyor',
    description: 'Yemeksepeti verdiği hizmeti zaten restoranlardan komisyon olarak alıyor. Ben hem Yemeksepeti müşterisi hem de restoran panel kullanıcısıyım. Hem restoranlardan kurye için ekstra ücret alınıyor hem de müşteriden son zamanlarda hizmet ve servis bedeli altında ekstra ücretler alınıyor. Hiç hoş değil, Yemeksepeti bu uygulamadan vazgeçmeli.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Onayım Olmadan Express Sisteme Geçişle Büyük Maddi Kayıp Yaşadım',
    description: 'Ankara Çankaya ilçesinde faaliyet gösteren Ünlü Dalyan Balıkçısı restoran işletmecisiyim. Restoran kodum L43J\'dir. Hiçbir yazılı veya sözlü talebim olmadan, kendi kuryelerimle çalışırken Yemeksepeti Express kurye sistemine geçişim yapıldı. Bu değişiklik sonrası müşteri memnuniyetsizliği ve şikayetler arttı.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Kendi Kuryemizle Çalışma Talebimizin Sürekli Göz Ardı Edilmesi',
    description: 'Doydoy Kumru Sandviç & Tost olarak yaklaşık 3 aydır Yemeksepeti üzerinden yaşadığımız bir sorunu paylaşmak istiyorum. Restoranımız olarak kendi kuryemizle çalışmak istediğimizi defalarca belirtmemize rağmen, Yemeksepeti tarafından bu talebimiz dikkate alınmıyor ve sürekli olarak \'kriter saçmalığı\' denilerek reddediliyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Kendi Kuryemi Kullanamıyorum, Mağduriyetim Giderilmiyor!',
    description: 'Yemeksepeti üzerinden "Harbiye Antakya Dürüm" (Çankaya, Ankara) restoranı olarak yaklaşık 1 yıldır kendi kuryeme geçmek istiyorum. Başlangıçta 2 ay boyunca Yemeksepeti\'nin kendi kuryeleriyle çalışmam gerektiği, sonrasında ise kendi kuryemi kullanabileceğim belirtildi. Ancak defalarca başvurmama rağmen hala geçiş yapamadım.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Müşteri Temsilcileri Telefonda Yardımcı Olmuyor Maille De Dönüş Yapılmıyor',
    description: 'Ayrıca, panelde yeni olan işletme sahipleri olarak müşteri temsilcilerinin telefonda daha fazla yardımcı olmasını bekliyoruz. Aradığımızda sadece "mail atın" denilerek görüşme kapatılıyor ve gönderdiğimiz maillere de herhangi bir düzeltme ya da dönüş yapılmıyor. Bu konuda da destek ve çözüm talep ediyoruz.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti\'nden Açıklamasız İletişim Bedeli Kesintisi Ve Geri Dönüş Sorunu',
    description: 'Yemeksepeti restoran hizmetini kullanıyoruz ve yaklaşık 1 hafta önce, "Meşhur Tavukçu Adem Usta" adlı işletmemiz üzerinden hesabımızdan "iletişim bedeli" adı altında 408 TL kesinti yapıldı. Bu tür bir kesintiyle ilk kez karşılaşıyoruz ve söz konusu tutarın neden alındığı konusunda herhangi bir açıklama yapılmadı.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti\'nde Bilgilendirme Olmadan Yüksek Komisyon Ve Kesinti Mağduriyeti',
    description: 'Yemeksepeti platformunda restoran işletmecisi olarak hizmet veriyorum. Uzun süredir, özellikle kampanya dönemlerinde, tarafımıza detaylı bir açıklama yapılmadan yüksek oranlarda komisyon ve kesinti uygulanıyor. Şirket olarak bu kesintileri ancak işletme sahipleri fark ettiğinde öğreniyoruz; Yemeksepeti önceden bilgilendirme yapmıyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Joker Kampanyasında Aşırı Komisyon Kesintisi Mağduriyeti',
    description: 'İstanbul Bahçelievler\'de bulunan restoranım üzerinden Yemeksepeti platformunda Joker kampanyası kapsamında alınan siparişlerde çok yüksek komisyon kesintileriyle karşılaşıyorum. Özellikle bugün gerçekleşen bir siparişte, 1000 TL\'lik toplam tutardan 700 TL komisyon kesildi. Bu durum, hem Joker kampanyası hem de normal komisyon oranlarının birleşmesiyle oluşuyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti\'nin Yüksek Komisyon Ve Ekstra Kurye Ücretleri Rekabeti Zorlaştırıyor',
    description: 'Restoranımda Yemeksepeti üzerinden satış yapıyorum ve Yemeksepeti kuryesi ile çalışıyorum. %38 komisyon ödememe rağmen müşteriden kurye 42₺ ekstra kurye bedeli parası isteniyor. Benden bu tutar zaten kesiliyor. Ekstra müşteriden almaları hiç etik değil ve platformda rekabete giremiyorum.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Vale Hizmeti Zorunluluğu Ve Yüksek Komisyonlar Küçük Esnafı Zorluyor',
    description: 'Kadıköy Zühtü Paşa Mahallesi\'nde bulunan Pişigurme restoranı olarak yaklaşık beş yıldır Yemeksepeti üzerinden hizmet veriyorum ve son bir yıldır da vale hizmetini kullanıyorum. Ancak son bir ay içinde iki kez vale hizmetinden çıkmak ve kendi ekibimle teslimata devam etmek istediğimi Yemeksepeti\'ne ilettim ancak reddedildi.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti\'nde Sözleşmeye Aykırı Yüksek Komisyon Kesintileri ve Müşteri Hizmetlerine Ulaşamamak',
    description: 'Son iki aydır Yemeksepeti üzerinden gelen siparişlerde, sözleşmede belirtilen oranların dışında, anlam veremediğimiz yüksek oranda komisyon kesintileriyle karşılaşıyoruz. Örneğin, 917 TL\'lik bir siparişten tarafımıza yalnızca 275 TL ödeme yapılıyor. Bu durum neredeyse tüm siparişlerde tekrarlanıyor ve müşteri hizmetlerine ulaşamıyoruz.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  // SAYFA 1 - MÜŞTERİ ŞİKAYETLERİ
  {
    title: 'Sipariş İptali Ve Kötü Hizmet Sonrası Ücret İadesi Sorunu',
    description: '30.08.2025 tarihinde saat 20:28\'de Yemeksepeti üzerinden Waffle Sarayı adlı işletmeden 3 adet waffle siparişi verdim (Sipariş No: #rkx0-s8jv). Siparişi Aydınlıkevler Mah. Defne Sok. No:9 Hüma Apt. Melikgazi/Kayseri adresine verdim ve toplam 520 TL\'yi nakit olarak ödedim. Sipariş sürecinde önce teknolojik sorunlar yaşandı, sonra sipariş iptal edildi ancak ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'Yemeksepeti',
  },
  // SAYFA 2 - RESTORAN ŞİKAYETLERİ
  {
    title: 'Yemek Sepeti\'nin Restoran İşletmelerine Destek Olmaması',
    description: 'Yemek Sepeti, restoran işletmelerine asla sahip çıkmayan bir kurum. Bizim üzerimizden para kazanıp bizi savunmuyor, her türlü zarara uğramamıza neden oluyor. Bu Yemek Sepeti platformunu CİMER dahil her yere şikayet ettim. İnşallah kısa zamanda ceza kesilir ve hakkımı kim yiyorsa, çalışanları dahil, cezasını çeksin.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Kapıda Kredi Kartı İle Ödeme İçin Alınan Ek Ücret Ve İletişim Sorunları',
    description: 'Yemeksepeti\'nden kapıda kredi kartı ile ödeme seçeneğini kullandığınızda, 5 TL komisyon ücreti yansıtılıyor. Ben her gittiğim yerde bahşiş veren biriyim. 5 TL günümüzde artık sakız parası gibi görünebilir ama mesele bu değil. Asıl sorun, bu uygulamanın adil olmaması. Kapıda kredi kartı ile ödeme yapmak için ekstra ücret alınması mantıksız.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Joker Bedeli Ve Marketing Ücreti Kesintilerinden Şikayetçiyim',
    description: 'Dünyanın en kötü hizmet sağlayıcısı olabilir. Önce Joker bedeli kesiliyor, sonra tekrar Joker bedeli kesiliyor. Müşterileri yanıltmak için de \'marketing fee\' adı altında ücret alınıyor. Joker\'den çıkmak istiyorum ancak 2 iş gününden önce çıkamıyorum. Sanki 90\'larda yaşıyoruz.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemek Sepeti Joker Kampanyasında Yüksek Komisyon Kesintileri Mağduriyeti',
    description: 'Yemek Sepeti Joker\'e katıldım, siparişlerim biraz artsın diye. Ama yapmaz olaydım; o kadar çok kesinti ve komisyon uyguluyorlar ki, siparişlerimiz ya zararına ya da bedavaya gidiyor. Zaten kendi uygulama ve yüzdelik ücretinizi kesiyorsunuz, bu kadar yüksek komisyon neden? Buna bir çözüm düşünülmeli.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemek Sepeti\'nin Kendi Kuryesiyle Yüksek Komisyon Alması Müşteriyi Ve Restoranı Mağdur Ediyor',
    description: 'Yemek Sepeti bir çok şirkette zorunlu olarak kendi kuryesiyle çalıştırıyor. Bu kuryelerle çalışınca restorandan %40 yakın kesinti yapıyor ve restoranlarda buna kıyasla fiyat artışı yapıyor. Bana soracak olursanız kesinlikle getir yemek. Trendyol veya Migros\'tan sipariş verin. Yemek Sepeti\'nden sipariş vermeyin.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti\'nin Kendi Kuryemize Geçişi Engellemesi Mağduriyet Yaratıyor',
    description: 'Yemeksepeti Kendi Kuryeme Geçmeme İzin Vermiyor, Cevap Yok. Yemeksepeti üzerinden uzun süredir restoran işletmesi olarak hizmet veriyoruz. Ancak artan komisyon oranları, müşterilere yansıtılan teslimat ve ödeme bedelleri nedeniyle ciddi müşteri kaybı yaşamaktayız. Bu nedenle kendi kuryemize geçmek istiyoruz ancak izin verilmiyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemek Sepeti Kurye Ve Komisyon Sorunları Nedeniyle Mağduriyet Yaşıyorum',
    description: 'Samsunda bir çiğ köfteci olarak her esnaf gibi yemek sepetine üyeyim fakat ilk günden itibaren Yemek Sepeti expres kuryesini kullanmaktayım! Komisyonların ve sistemdeki kuryelerinden sürekli memnuniyetsizlik yaşamama rağmen ve de sözleşmede yazmayan maddelerden alakasız sürekli bir bahane uydurarak kendi kuryeme geçiş yapmama izin vermiyorlar.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti\'nde Yüksek Komisyon Ve İlgisiz Müşteri Hizmeti Nedeniyle Yaşanan Maddi Kayıp',
    description: 'Yemeksepeti Aşırı Komisyon Kesintisi ve İlgisizlik! 190 TL\'lik bir siparişte bana sadece 58 TL kaldı! Yemeksepeti\'nde işletmeci olarak uzun süredir bulunmama rağmen, %38 olması gereken kesinti oranı hiçbir zaman tutmadı. Komisyon üstüne komisyon, indirim üstüne indirim kesiliyor. Tüm siparişlerde bu durum devam ediyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Express Teslimattan Çıkış Talebim Reddediliyor Mağdur Ediliyorum',
    description: 'Yemeksepeti Restoranıyım Antalya\'da 2 haftadır express teslimattan çıkmak istiyorum. Her gün arayıp talep oluşturuyorum fakat sırf daha yüksek komisyon almak için benim restoranımı çıkarmıyorlar. Kendi kuryelerime boşuna para ödüyorum onların da parasını faturalandırıp dava açmayı düşünüyorum',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Komisyon Kesintileri Ve Müşteri Hizmetlerinde Çözüm Bulamama Sorunu',
    description: 'Yemeksepeti kuryesine geçiş için sözleşme imzaladım, onay maili geldi. Daha sonra gelen siparişlerde kuryeler gelmedi ve benim götürmem gerektiği söylendi. Kendim götürmüş olmama rağmen yaklaşık %40 komisyon kestiler. Bir haftadır sistemimi kapalı tutuyorum. Müşteri hizmetlerine bağlanmak çok zor; bağlanınca da çözüm sunmuyorlar.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemek Sepeti\'nde Devir İşlemleri Aylardır Tamamlanmıyor, İletişim Yok',
    description: 'Restoranlardan yüzde 40 komisyon alıp, Türkiye\'de belki milyonlarca işletmenin ortağı bile değil, patron koltuğuna geçen Yemek Sepeti\'nin her alanda restoranları görmezden gelmesine, ulaşılabilirlik ve iletişim sorunlarına (sadece mail, telefonda ulaşmak mümkün değil, maile de lütfedip dönerlerse) aylardır şikayetçiyim.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Komisyonları Kazancımı Eritiyor!',
    description: 'İşletme sahibi olarak 4 aydır Yemeksepeti ile çalışıyorum fakat komisyon oranları çok fazla. Resimde görmüş olduğunuz şekilde satış yapmışım: 6.720 TL, bana kalan ise sadece 1.600 TL. Bu nasıl bir adalet, bu nasıl bir sistem? Bana ortak mı, işletmeyi satın mı aldı?',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Taleplere Dönüş Yapmıyor Restoranlar Mağdur Oluyor',
    description: 'Yemeksepeti şirketi hiçbir şekilde mail olarak gönderilen taleplere karşılık vermiyor. Çağrı merkezinden yapılan görüşmelerde oluşturulan taleplere de ne arama ne görüşme olarak dönüş sağlanmamıştır. Bu süreçte restoranım mağduriyet yaşamakta ve çözüm odaklı muhatap bulamamaktadır. Kurye sistemini değiştirmek istiyoruz ancak izin verilmiyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Açılış Süreci Ve Yüksek Komisyonlarla Mağduriyet Yaşatıyor',
    description: 'yemeksepeti.com müşteriyi umursamıyor. Açılışı için 1 ay beklettiler 1 ay süren sistemlerinde goweb e giremiyorum. Şifre yenileme mesajı gelmiyor. Arıyorum kayıt oluşturalım bey efen deniliyor. Tamam kayıt oluşturun. Diyoruz eee aradan günler geçiyor yine arayan soran yok. Çözüm yok ilgi alaka yok. Komisyonlar çok yüksek.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Komisyon Kesintisi Nedeniyle Eksik Ödeme',
    description: 'Merhaba, Yemeksepeti üzerinden işletmem ile satış yapmaktaydım. İki hafta içerisinde 15.000 liralık satış yaptım ve bunun sadece hesabıma yatan 1.500 TL tutarını görüntüledim. Yemeksepeti ekipleri ile iletişime geçtiğimde, bana geri kalan tutarın komisyon kesintisi olduğunu söylediler.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemek Sepeti Yüksek Komisyon Ve Kurye Geçişinde Mağduriyet',
    description: 'Alanya\'da Tostladin işletme sahibiyim. Yemek Sepeti ile 3 yıl boyunca kendi kuryem ile çalıştıktan sonra, Yemek Sepeti bölge sorumlusu F***** Bey tarafından Yemek Sepeti\'nin kurye hizmetini almaya başladım. Bu geçişi yaparken kendisine defalarca, istediğimde ya da memnun kalmadığım takdirde kendi kuryeme geri dönebileceğimi söyledim ancak şimdi izin verilmiyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemek Sepeti\'nde Yüksek Komisyon Ve Bilgilendirme Eksikliği',
    description: 'Yemek Sepeti\'ne üye oldum, üç hafta geçti. 5.665 TL\'lik satıştan hesabıma yatacak olan ücret yaklaşık 1.400 TL civarında. Joker kampanyasına girerken herhangi bir bilgilendirme yapılmıyor, anlaşmada Joker kesintisi yer almıyor. Yemek Sepeti\'ne girerken yalnızca %34 komisyon olduğu belirtiliyor. Ancak gerçekte çok daha fazla kesinti yapılıyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemek Sepeti Joker Komisyonları İşletmemi Zarara Uğratıyor',
    description: 'İşletmemde Yemek Sepeti hizmetini kullanıyorum fakat Joker adı altında yüksek komisyonlar kesiliyor ve iki gündür işletmem zarar ediyor. Konuyla ilgili destek alamıyorum. Müşteri hizmetlerini aradığımda, mail atmam gerektiği söyleniyor. Mail atıyorum fakat geri dönüş alamıyorum. Ancak her gün zarar etmeye devam ediyorum.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Muhasebe Ve Reklam Gelirlerinde Haksız Kesinti Ve Eksik Ödeme Sorunu',
    description: 'Adres: Aydınlı, Gürpınar CD. No:** 34953 Tuzla/İstanbul. Always Şube sahibiyim, Yemeksepeti Motokurye Partner kullanıcısıyım. Yemeksepeti Muhasebe Birimi, hak ediş faturalarımı eksik yatırıyor. Joker kullanımı ve öne çıkan reklam gelirleri hizmetlerini kapatmama rağmen, bu hizmetler kasıtlı olarak tekrar açılıyor ve kesintiler yapılıyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Yemeksepeti Joker Kampanyası Küçük Esnafı Zorluyor!',
    description: 'Yemeksepeti\'ne kayıtlı bir restoranım var ve Joker adı altında sattığımız ürünlerin yaklaşık %70\'ini kendisi alıyor, tüm maliyeti karşılayan restoranlara ise %30 gibi oldukça düşük bir ödeme yapıyorlar. Acilen bu sorunun düzeltilmesi gerekiyor. Bu uygulamalar küçük esnafı batırmaya yönelik çabalar gibi görünüyor.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Joker Bedeliyle Gizli Komisyon Kesintisi: Adil Ticaret İhlali',
    description: 'Yemeksepeti platformunda uygulanan "Joker bedeli" adı altındaki kesinti, kabul ettiğimiz %34 + KDV komisyon oranının dışında, kârdan %50 oranında ek bir kesintiyle sonuçlanmaktadır. Bu uygulama, başta belirtilen ticari koşulların dışındadır ve işletmemiz açısından büyük bir gelir kaybına yol açmaktadır.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
  },
  // SAYFA 2 - MÜŞTERİ ŞİKAYETLERİ
  {
    title: 'Yemeksepeti\'nde Değişen Ödeme Seçenekleri Ve Ek Ücret Şikayeti',
    description: 'Yemeksepeti ile ilgili şikayetim var. Önceleri sipariş verirken ödeme seçenekleri arasında kapıda nakit ödeme ve kredi kartıyla ödeme seçenekleri varken, kapıda ödeme seçeneğiyle güzelce alıyorduk. Enflasyon sebebiyle ve her şeyin fiyatlarının aşırı artmaya başlamasından ötürü kapıda nakit ödemeyi kaldırdılar ve ek ücret eklediler.',
    category: 'customer',
    platform: 'Yemeksepeti',
  },
  {
    title: 'Kapıda Ödeme İçin Alınan Ekstra Ücretin Gerekçesi Anlaşılmıyor',
    description: 'Yemek Sepeti, kapıda ödemede ekstra para almaya başlamış. Hangi hizmeti veriyorsunuz da para alıyorsunuz? Yemek yemek için parasını ödemek yetmiyor, bir de ödemeyi yapabilmek için ayrıca para isteniyor. Bu para kime gidiyor, kim alıyor, kim ne gibi bir hizmet veriyor da bu parayı hak ediyor? Bu, insanları mağdur eden bir uygulama.',
    category: 'customer',
    platform: 'Yemeksepeti',
  },
  // GETİRYEMEK ŞİKAYETLERİ BAŞLANGICI
  {
    title: 'Kupon Kullanılamadı, İptal Talebim Dikkate Alınmadı Ve Müşteri Güveni Sarsıldı',
    description: '29.11.2025 tarihinde saat 23:40\'ta Getir Yemek üzerinden yaklaşık 495 TL tutarında bir sipariş verdim ve 150 TL indirim sağlayan kuponumu kullanmak istedim. Kuponu sipariş sırasında tanımlamama rağmen sistemde bir bug sebebiyle kuponum işlememiş göründü. Bunun üzerine 23:41\'de canlı desteğe bağlandım ancak hiçbir çözüm sunulmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'GetirYemek Yanlış Siparişimi İptal Etmedi, Ücretimi İade Etmiyor',
    description: '22 Kasım\'da GetirYemek üzerinden yanlışlıkla bir sipariş verdim. Hatanın farkına varır varmaz, yaklaşık 1 dakika bile geçmeden canlı destek üzerinden Getir ile iletişime geçip siparişimde yanlışlık olduğunu, iptal edilmesini istediğimi belirttim. Ancak talebime rağmen siparişi iptal etmediler. Canlı destek ile görüşmemde ücret iadesi yapılacağı söylendi ancak hala iade edilmedi.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Siparişim Gecikti, Çözüm Sunulmadı, Kurye De Saygısızdı',
    description: '29 Kasım Cumartesi günü saat 19:50\'de Getir üzerinden Maydanoz Döner\'den iki dürümlük yemek siparişi verdim. Ev ile restoran arasındaki mesafe en fazla 1,5 km olmasına rağmen siparişim 1 saat 20 dakika boyunca teslim edilmedi. Bu süreçte Getir müşteri hizmetlerine yazılı olarak ulaştım ve siparişin durumunu sordum ancak hiçbir çözüm sunulmadı. Kurye geldiğinde de saygısız bir tutum sergiledi.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Yanlış Siparişe Anında Müdahaleye Rağmen Ücret İadesi Yapılmadı',
    description: '29 Kasım tarihinde Getir Yemek üzerinden Meri Paşa adlı restorandan yaklaşık 500 TL tutarında bir sipariş verdim, ödemeyi kredi kartı ile gerçekleştirdim. Siparişte yanlış ürün verdiğimi fark eder etmez, anında hem müşteri hizmetlerini aradım hem de restorana ulaştım; ayrıca uygulama üzerinden de müşteri hizmetlerine yazdım. Ancak hiçbir şekilde ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Teslim Edilmeyen Sipariş İçin Ücret İadesi Ve Müşteri Hizmetlerinde Yaşanan İletişim Sorunu',
    description: '29.11.2025 tarihinde saat 17.35 civarında Getir Yemek üzerinden Mc Donald\'s Mezitli şubesinden yaklaşık 342 TL tutarında sipariş verdim. Aradan 1,5 saat geçmesine rağmen ne restoran ne de kuryeden herhangi bir arama almadım. Sipariş durumunu öğrenmek için müşteri hizmetlerini aradığımda, kuryeye ulaşılamadığı söylendi ve siparişim teslim edilmedi. Ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Sipariş Gelmedi, Para İadesi Yapılmadı, Mağdur Edildim',
    description: '28.11.2025 tarihinde saat 12:56\'da çalıştığım ofise Getir Yemek üzerinden kurumsal şirket adresime sipariş verdim. Bir süre sonra 0 (850) 532 50 50 numaralı hattan arandım, sesli yanıt sistemi "Siparişi size ulaştıramadık" dedi ve uygulamada siparişim "ulaştırılamadı" olarak işaretlenmişti. Bunun üzerine müşteri hizmetlerine ulaştım ancak para iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Teslim Edilmemiş Sipariş İçin Muhatap Bulamıyorum',
    description: '29 Kasım 2025 tarihinde saat 17.11\'de Getir Yemek üzerinden verdiğim siparişim, üzerinden 1 saat 20 dakikadan fazla süre geçmesine rağmen tarafıma teslim edilmedi. Buna rağmen siparişim uygulamada 18.37 itibarıyla \'teslim edildi\' olarak görünmektedir. Online kart ile ödemesini yaptığım bu siparişim için muhatap bulamıyorum ve ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Kazandığım Ödülde Hata: Güvenim Sarsıldı',
    description: 'Getir Yemek uygulamasındaki Çark kampanyasını yaklaşık 10 gün boyunca sorunsuz bir şekilde kullandım. Ancak bugün, 100 TL Getir Yemek ödülü kazandığım çevirmede ekranda \'Bir hata oluştu\' uyarısı çıktı ve çarkı yeniden çevirmemi istedi. Günlerce hiçbir sorun olmazken, tam para ödülü kazandığım anda hata çıkması ve ödülün verilmemesi güvenimi sarsıyor.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Geç Teslimat, Soğuk Ve Eksik Ürün, Yanıltıcı Müşteri Hizmetleri: Ücret İadesi Talebim Reddedildi',
    description: '29/11/2025 tarihinde saat 13:28\'de Getir Yemek uygulaması üzerinden Bereket Döner\'den yaklaşık 235 TL tutarında bir yemek siparişi verdim. Uygulamada teslimat süresi açıkça 13:58 olarak belirtilmiş olmasına rağmen, siparişim bu sürenin dışında ve gecikmeli şekilde tarafıma ulaştırıldı. Teslimatın zamanında yapılmaması nedeniyle yemek soğuk geldi ve eksik ürün vardı. Ücret iadesi talebim reddedildi.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Geç Teslimat Ve Soğuk Yemek Nedeniyle Ücret İadesi Talebi',
    description: '29.11.2025 tarihinde Getir Yemek uygulaması üzerinden saat 13.58\'de verdiğim siparişim, saat 15.16\'da teslim edildi. Sipariş numarası gibi bilgileri mobil uygulamada bulamadım; sanırım bu bilgileri eklemiyorlar. Sipariş sürecinde, 40. dakikada canlı destek hattına ulaştım. Önce siparişin hazırlanıp hazırlanmadığını sordum, sonra kuryenin yola çıkıp çıkmadığını öğrenmek istedim. Yemek soğuk geldi ve ücret iadesi talebim kabul edilmedi.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Teslim Edilmeyen Sipariş Ve Kaybolan Kupon Mağduriyeti',
    description: '29.11.2025 tarihinde saat 13.50 civarında Van İpekyolu bölgesinden Getir Yemek üzerinden verdiğim 67808613 numaralı siparişim, tarafıma teslim edilmediği halde uygulamada "teslim edildi" olarak işaretlendi. Kurye siparişi bana hiç getirmedi, ancak sistemde sipariş tamamlanmış gibi görünüyor. Bu sipariş için kullandığım kuponum da kayboldu ve ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Ücret İadesi Yapılmadan Siparişin Teslim Edilmemesi Ve Mağduriyet',
    description: 'Bugün saat 13.11\'de Getir üzerinden yemek siparişi verdim. Adresim uygulamada kayıtlı ve daha önce defalarca kez aynı adresten sorunsuz şekilde sipariş verdim. Buna rağmen bu siparişte görevli kurye, adresimin sistemde görünen adresle uyuşmadığını söyleyerek yemeği getirmedi. Durumu öğrenmek için telefon açtım ancak ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Adresim Açık Olmasına Rağmen Siparişim Teslim Edilmedi Ve Ücret İadesi Yapılmadı',
    description: '28.11.2025 tarihinde Konya Selçuklu ilçesi Kosova Mahallesi\'ndeki açık ve detaylı olarak kayıtlı adresime Getir üzerinden Belora Waffle & Magnolia\'dan 234,85 TL tutarında sipariş verdim. Adresimde belediyenin ve devletin belirlediği resmi adres bilgileri, bina numarası, kat ve daire numarasına kadar her şey açık ve net olmasına rağmen siparişim teslim edilmedi ve ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Siparişimde Çiğ Et Çıkması Nedeniyle Sağlığım Tehlikeye Girdi',
    description: '28 Kasım günü saat 10:30–12:00 arasında Getir Yemek üzerinden Mimarsinan Mahallesi S**** T**** Camisi karşısında bulunan Kaya Hatay Döner\'den 2 adet dürüm siparişi verdim. Siparişim geldiğinde dürümlerden birinin içinden çiğ et çıktığını fark ettim. Durumu görünce sağlığımı riske atmamak için yemeği yemedim ve müşteri hizmetlerine bildirdim ancak hiçbir çözüm sunulmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Sipariş İptalinde Müşteri Mağduriyeti Ve İade Sorunu',
    description: '29 Kasım öğlen saat 12.00 civarında Getir Yemek üzerinden Starbucks\'tan iki Frappuccino ve bir brookie siparişi verdim. Aslında yanlışlıkla iki tane Frappuccino söyledim ve aynı zamanda yanlış adresi seçtim. Siparişi düzenlemek üzereyken farkında olmadan onayladım. Siparişi oluşturur oluşturmaz, henüz hazırlanmadan iptal etmek istedim ancak iptal edilemedi ve ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Getir Uygulamasında Sipariş Hatası Ve Çözüm Eksikliği',
    description: 'Getir uygulaması üzerinden bugün akşam saatlerinde 4 kişi için yemek siparişi verdik. Siparişi verdikten sonra uygulamada hiçbir şekilde aktif sipariş görünmediği için sistemde bir hata olduğunu düşünerek yaklaşık 1 dakika içinde aynı siparişi tekrar vermek zorunda kaldık. Sonuç olarak kapıya 8 kişilik yemek geldi ve çift ödeme yaptık. Müşteri hizmetleri ile iletişime geçtik ancak çözüm sunulmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Sipariş İptali Sonrası Para İadesi Ve Numara Güncelleme Sorunu',
    description: 'Getir Yemek üzerinden Cajun Corner adlı restorandan 18:19\'da bir sipariş verdim. Sipariş sonrası yaklaşık 18:50 civarında, uygulamada telefon numaramı değiştirme seçeneği olmadığı için hesabımda eski numaramın kayıtlı olduğunu fark ettim. Getir, beni arayamadıklarını söyleyerek siparişi kendi kendilerine iptal ettiler. Para iadesi yapılmadı ve telefon numarası güncelleme sorunu çözülmedi.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Yanlışlıkla Oluşan Siparişin İptal Edilememesi Ve Ücret İadesi Talebi',
    description: '28.11 tarihinde saat yaklaşık 17.50 civarında Getir Yemek üzerinden Afyon Merkez\'de sipariş verirken, ürün seçimi aşamasında kayıtlı kartımdan ödeme çekildi ve sipariş yanlışlıkla oluşturuldu. Yanlışlıkla verilen bu siparişin hemen ardından Getir\'le iletişime geçtim ancak siparişin iptal edilemeyeceği söylendi. Ücret iadesi talebim kabul edilmedi.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Sipariş Adrese Teslim Edilmedi, Ücret İadesi Yapılmadı Ve Kötü Müşteri Hizmeti',
    description: 'Bugün Getir Yemek üzerinden ctr Chicken Fried Chicken & More Karabağlar şubesinden, adresimi açık ve net bir şekilde yazmama rağmen siparişim adresime getirilmedi. Siparişi kendi kendilerine iptal edip uygulamada kafalarına göre bir açıklama yazılmış ve bu süreçte muhatap bulamadım. Restoranı aradım ancak onlar da Getir\'e bağlı olduklarını söylediler. Ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'İptal Edilen Siparişimde Ücretim İade Edilmedi',
    description: 'GetirYemek üzerinden Kahve Dünyası\'ndan az önce kartla ödeme yaparak sipariş verdim. Siparişim kısa süre içinde restoran tarafından iptal edildi ancak ücret iadesi tarafıma yapılmadı. Gerekçe olarak da ürünlerin bir daha satışa sunulamayacağı söylendi. Oysa siparişimdeki iki ürün de seri üretim, paketli ürünlerdi ve tekrar satılabilir durumdaydı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Yanlışlıkla Verilen Siparişi İptal Edememek Ve Ücret İadesi Sorunu',
    description: 'Bugün saat 14:30 civarında Getir Yemek üzerinden yanlışlıkla bir sipariş verdim. Hemen fark edip yaklaşık 1 dakika içinde iptal etmek istedim ancak uygulama üzerinden iptal edemedim ve siparişim iptal edilmedi. Bu sipariş için kredi kartımla 280 TL ödeme yaptım. Konuyla ilgili olarak Getir müşteri hizmetlerine ulaştım ancak ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Getir Yemek Siparişimde Yanıltıcı Bilgilendirme Ve Ücret İadesi Sorunu',
    description: '27.11.2025 tarihinde Getir Yemek üzerinden verdiğim siparişim, o an müsait olamadığım ve telefonu açamadığım için iptal edildi. İptalden sadece 2 dakika sonra geri dönüş yapmaya çalıştım fakat çağrı desteğe aktarıldı. Destekle yaptığım görüşmede, aynı siparişi tekrar verirsem benden herhangi bir ücret alınmayacağı söylendi ancak bu doğru çıkmadı ve ücret iadesi yapılmadı.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'Teslim Edilmeyen Siparişin Ücreti Halen İade Edilmedi',
    description: '11 Kasım günü Getir Yemek üzerinden Begonvil\'den makarna siparişi verdim. Uygulamada sipariş "teslim edildi" olarak görünmesine rağmen, bana herhangi bir ürün teslim edilmedi, kapıma da hiçbir şey bırakılmadı. Durumu Getir müşteri hizmetlerine ve uygulama içi destek hattına ilettiğimde, sistemde teslim edildi olarak göründüğü için iade yapılamayacağı söylendi.',
    category: 'customer',
    platform: 'GetirYemek',
  },
  {
    title: 'GetirYemek Panelinde Sayfa Aktivasyonu Ve Destek Sorunu',
    description: 'Getir paneline Yablonya Cafe Restaurant işletmem adına ürünlerimi yaklaşık 1 ay önce yükledim. Üzerinden 15 günden fazla zaman geçmesine rağmen ne bir geri dönüş yapıldı ne de sayfam aktif edildi. Bu süreçte işletmem resmen beklemede kaldı ve işlerimizin akışı olumsuz etkilendi. Müşteri hizmetlerine defalarca ulaştım ancak hiçbir çözüm sunulmadı.',
    category: 'restaurant',
    platform: 'GetirYemek',
  },
]

/**
 * Şikayetvar'dan alınan şikayetleri sisteme ekler
 */
export async function importSikayetvarComplaints(): Promise<void> {
  console.log(`[importSikayetvarComplaints] Şikayetvar'dan ${sikayetvarComplaints.length} şikayet ekleniyor...`)
  
  // Mevcut şikayetleri kontrol et - duplicate önlemek için
  const existingComplaints = await complaintApi.getAll()
  
  // Daha güçlü duplicate kontrolü: title + description + platform kombinasyonu
  const existingComplaintsSet = new Set(
    existingComplaints.map(c => {
      const title = (c.title || '').toLowerCase().trim()
      const desc = (c.description || '').toLowerCase().trim().substring(0, 50) // İlk 50 karakter
      const platform = (c.platform || '').toLowerCase().trim()
      return `${title}|${desc}|${platform}`
    })
  )
  
  let addedCount = 0
  let skippedCount = 0
  
  for (const complaint of sikayetvarComplaints) {
    // Duplicate kontrolü - title + description + platform kombinasyonu
    const title = (complaint.title || '').toLowerCase().trim()
    const desc = (complaint.description || '').toLowerCase().trim().substring(0, 50)
    const platform = (complaint.platform || '').toLowerCase().trim()
    const complaintKey = `${title}|${desc}|${platform}`
    
    if (existingComplaintsSet.has(complaintKey)) {
      skippedCount++
      continue
    }
    
    try {
      await complaintApi.create(complaint)
      existingComplaintsSet.add(complaintKey) // Eklenen şikayeti set'e ekle
      addedCount++
      if (addedCount % 10 === 0) {
        console.log(`[importSikayetvarComplaints] ${addedCount}/${sikayetvarComplaints.length} şikayet eklendi...`)
      }
    } catch (error) {
      console.error(`[importSikayetvarComplaints] Şikayet eklenirken hata: ${complaint.title.substring(0, 50)}...`, error)
    }
  }
  
  console.log(`[importSikayetvarComplaints] Tamamlandı! ${addedCount} yeni şikayet eklendi, ${skippedCount} duplicate atlandı.`)
}
