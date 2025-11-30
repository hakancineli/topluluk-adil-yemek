import React from 'react'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 px-2 md:px-0">
      {/* Hero Section */}
      <div className="text-center py-6 md:py-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
          Hakkımızda
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">
          AdilYemek, yemek sipariş ekosistemindeki tüm paydaşların haklarını korumak ve adil bir düzen oluşturmak için çalışan bir topluluk platformudur.
        </p>
      </div>

      {/* Platform */}
      <section className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Platformumuz</h2>
        <div className="prose prose-lg text-gray-700">
          <p className="mb-4">
            AdilYemek, dijital yemek sipariş platformlarında yaşanan sorunları toplu olarak ele almak ve çözmek için oluşturulmuş bağımsız bir topluluk platformudur. Restoran sahipleri, müşteriler ve kuryelerin karşılaştığı adaletsizlikleri, şeffaflık eksikliklerini ve sistemik sorunları belgeleyerek, bunları resmi makamlara iletmek ve kamuoyu oluşturmak amacıyla faaliyet göstermektedir.
          </p>
          <p>
            Platformumuz, tüm paydaşların seslerini duyurabileceği, şikayetlerini paylaşabileceği ve dayanışma içinde çözüm arayabileceği demokratik bir alan sunmaktadır. Teknoloji ve toplumsal sorumluluk bilinciyle, dijital ekonomi döneminde adil ticaret koşullarının oluşturulmasına katkıda bulunmayı hedeflemekteyiz.
          </p>
        </div>
      </section>

      {/* Misyon */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 md:p-8 rounded-xl shadow-lg border border-primary-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Misyonumuz</h2>
        <div className="prose prose-lg text-gray-700">
          <p className="mb-4">
            AdilYemek'in misyonu, yemek sipariş ekosistemindeki tüm aktörlerin (restoran sahipleri, müşteriler ve kuryeler) haklarını korumak, şeffaflığı artırmak ve adil ticaret koşullarının oluşturulmasına katkıda bulunmaktır. Platformların tek taraflı uygulamalarını, yüksek komisyon oranlarını, haksız kesintileri ve müşteri hizmetleri sorunlarını belgeleyerek, bu sorunların çözümü için kolektif bir güç oluşturmayı amaçlıyoruz.
          </p>
          <p>
            Şikayetleri sistematik olarak toplayarak, kategorize ederek ve analiz ederek, hem bireysel sorunların çözümüne hem de sistemik değişikliklerin sağlanmasına katkıda bulunuyoruz. Resmi kurumlara, tüketici hakları örgütlerine ve medyaya ulaştırdığımız verilerle, sektördeki adaletsizliklere dikkat çekiyor ve değişim talep ediyoruz.
          </p>
        </div>
      </section>

      {/* Vizyon */}
      <section className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Vizyonumuz</h2>
        <div className="prose prose-lg text-gray-700">
          <p className="mb-4">
            AdilYemek, yemek sipariş ekosisteminde tüm paydaşların eşit haklara sahip olduğu, şeffaf ve adil bir düzenin kurulduğu bir gelecek hayal ediyor. Restoran sahiplerinin, müşterilerin ve kuryelerin birbirine karşı değil, birlikte adil koşullar için mücadele ettiği bir ekosistem yaratmayı hedefliyoruz.
          </p>
          <p>
            Vizyonumuz, platformların sadece kâr odaklı değil, tüm paydaşların refahını gözeten bir yaklaşım benimsediği, komisyon oranlarının makul seviyelerde olduğu, müşteri hizmetlerinin etkin çalıştığı ve kuryelerin adil ücretlendirildiği bir sektör yaratmaktır. Bu vizyonu gerçekleştirmek için, toplumsal dayanışma ve kolektif eylem gücünü kullanarak, sektördeki tüm aktörleri sorumluluk almaya ve değişime katkıda bulunmaya davet ediyoruz.
          </p>
        </div>
      </section>

      {/* Sorunlar */}
      <section className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Karşılaştığımız Sorunlar</h2>
        
        {/* Restoran Perspektifi */}
        <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
            <span className="bg-red-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </span>
            Restoran Sahipleri Perspektifi
          </h3>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              Restoran sahipleri, dijital platformlarda faaliyet gösterirken ciddi mali zorluklarla karşılaşmaktadır. En büyük sorunlardan biri, platformların talep ettiği yüksek komisyon oranlarıdır. Komisyon oranları %30-45 arasında değişmekte, bu da restoranların karlılığını ciddi şekilde etkilemektedir.
            </p>
            <p>
              <strong className="text-gray-900">Kar Marjı Sorunu:</strong> Restoranda yapılan satış ile pazaryeri platformundaki satış arasında ciddi bir kar farkı oluşmaktadır. Örneğin, restoranda 100 TL'ye satılan bir ürün, platform üzerinden aynı fiyata satıldığında, restorana sadece 55-70 TL kalmaktadır. Bu durum, restoranların fiyatlarını yükseltmelerine veya kaliteden ödün vermelerine neden olmaktadır.
            </p>
            <p>
              <strong className="text-gray-900">Ek Kesintiler:</strong> Komisyonun yanı sıra, platformlar "kurye bedeli", "işlem ücreti", "kampanya kesintisi" gibi çeşitli adlar altında ek kesintiler yapmaktadır. Bu kesintiler, restoranların maliyet hesaplamalarını zorlaştırmakta ve beklenmedik zararlara yol açmaktadır.
            </p>
            <p>
              <strong className="text-gray-900">Kendi Kurye Kullanımı:</strong> Birçok restoran, kendi kuryeleriyle çalışmak istemekte ancak platformlar bunu engellemekte veya zorlaştırmaktadır. Platformların kendi kurye sistemlerini zorunlu kılması, restoranların maliyet kontrolünü elinden almaktadır.
            </p>
            <p>
              <strong className="text-gray-900">Müşteri Hizmetleri Eksikliği:</strong> Restoranlar, sorun yaşadıklarında platformların müşteri hizmetlerine ulaşmakta zorlanmakta, sorunları çözülmeden bırakılmaktadır. Panel aktivasyonu, ödeme gecikmeleri, hatalı iptaller gibi konularda destek alamamaktadırlar.
            </p>
          </div>
        </div>

        {/* Müşteri Perspektifi */}
        <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
            <span className="bg-blue-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            Müşteri Perspektifi
          </h3>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              Müşteriler, yemek sipariş platformlarını kullanırken çeşitli sorunlarla karşılaşmaktadır. En yaygın sorunlar arasında teslimat gecikmeleri, yanlış siparişler, ücret iadesi problemleri ve müşteri hizmetlerine ulaşamama yer almaktadır.
            </p>
            <p>
              <strong className="text-gray-900">Fiyat Farkı:</strong> Platformlardaki ürün fiyatları, restoranlardaki fiyatlardan genellikle %15-25 daha yüksektir. Bu fark, platformların yüksek komisyon oranlarını müşterilere yansıtmasından kaynaklanmaktadır. Müşteriler, aynı ürünü daha pahalıya almak zorunda kalmaktadır.
            </p>
            <p>
              <strong className="text-gray-900">Ek Ücretler:</strong> Platformlar, "teslimat ücreti", "servis bedeli", "kapıda ödeme ücreti" gibi çeşitli adlar altında ek ücretler talep etmektedir. Bu ücretler, sipariş toplamını beklenmedik şekilde artırmaktadır.
            </p>
            <p>
              <strong className="text-gray-900">İade ve İptal Sorunları:</strong> Yanlış sipariş, gecikmiş teslimat veya kalite sorunları durumunda müşteriler iade talep etmekte ancak bu talepler genellikle reddedilmekte veya uzun süreçler sonunda çözülmektedir. İptal edilen siparişler için ücret iadesi yapılmamakta veya gecikmektedir.
            </p>
            <p>
              <strong className="text-gray-900">Müşteri Hizmetleri Erişim Sorunu:</strong> Müşteriler, sorun yaşadıklarında platformların müşteri hizmetlerine ulaşmakta zorlanmakta, canlı destek hatlarına bağlanamamakta veya yanıt alamamaktadır. E-posta ile gönderilen talepler genellikle yanıtsız kalmaktadır.
            </p>
          </div>
        </div>

        {/* Kurye Perspektifi */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
            <span className="bg-green-100 p-2 rounded-lg">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Kurye Perspektifi
          </h3>
          <div className="prose prose-lg text-gray-700 space-y-4">
            <p>
              Kuryeler, yemek sipariş ekosisteminin en zorlu koşullarda çalışan aktörleridir. Düşük ücretler, uzun çalışma saatleri, güvenlik riskleri ve sosyal güvence eksikliği gibi ciddi sorunlarla karşılaşmaktadırlar.
            </p>
            <p>
              <strong className="text-gray-900">Düşük Ücretlendirme:</strong> Kuryeler, mesafe başına çok düşük ücretler almaktadır. Bu ücretler, yakıt masraflarını, araç bakım maliyetlerini ve zaman maliyetini karşılamakta yetersiz kalmaktadır. Özellikle uzak mesafeli teslimatlar için ödenen ücretler, kuryelerin zararına çalışmasına neden olmaktadır.
            </p>
            <p>
              <strong className="text-gray-900">Sosyal Güvence Eksikliği:</strong> Birçok kurye, platformların "bağımsız iş ortağı" statüsü altında çalıştırılmakta ve sosyal güvenceden yoksun bırakılmaktadır. İş kazası, hastalık veya yaşlılık durumlarında hiçbir güvenceye sahip değillerdir.
            </p>
            <p>
              <strong className="text-gray-900">Çalışma Koşulları:</strong> Kuryeler, hava koşullarından bağımsız olarak çalışmak zorunda kalmakta, trafik riskleriyle karşı karşıya kalmakta ve uzun süreler boyunca araç kullanmak zorunda kalmaktadır. Bu koşullar, hem fiziksel hem de psikolojik sağlık sorunlarına yol açmaktadır.
            </p>
            <p>
              <strong className="text-gray-900">Gelir Belirsizliği:</strong> Kuryelerin gelirleri, sipariş sayısına ve mesafelere bağlı olarak değişmekte, düzenli bir gelir garantisi bulunmamaktadır. Düşük sipariş dönemlerinde yeterli gelir elde edememektedirler.
            </p>
          </div>
        </div>
      </section>

      {/* Topluluk ve Dayanışma */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 p-4 md:p-8 rounded-xl shadow-lg border border-primary-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Topluluk ve Dayanışma</h2>
        <div className="prose prose-lg text-gray-700 space-y-4">
          <p>
            AdilYemek, tüm bu sorunların çözümü için toplumsal dayanışmayı ön plana çıkarmaktadır. Restoran sahipleri, müşteriler ve kuryeler birbirine karşı değil, birlikte adil koşullar için mücadele etmektedir. Platformumuz, bu dayanışmayı güçlendirmek ve kolektif bir ses oluşturmak için tasarlanmıştır.
          </p>
          <p>
            Şikayetlerinizi paylaşarak, diğer paydaşların sorunlarını öğrenerek ve birlikte çözüm arayarak, sektördeki adaletsizliklere karşı güçlü bir duruş sergileyebiliriz. Her şikayet, sistemik sorunların belgelenmesine ve değişim talebinin güçlenmesine katkıda bulunmaktadır.
          </p>
          <p>
            Topluluk olarak, platformları sorumluluk almaya, şeffaf olmaya ve tüm paydaşların haklarını gözetmeye zorlayabiliriz. Birlikte hareket ederek, sektördeki güç dengesini değiştirebilir ve adil bir ekosistem yaratabiliriz.
          </p>
        </div>
      </section>

      {/* Hedefler */}
      <section className="bg-white p-4 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Hedeflerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-primary-50 p-6 rounded-lg border border-primary-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Kısa Vadeli Hedefler</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>10.000+ şikayeti sistematik olarak toplamak ve kategorize etmek</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>Resmi kurumlara (Rekabet Kurumu, Tüketici Mahkemeleri) toplu başvurular yapmak</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>Medya ve kamuoyu dikkatini sektördeki sorunlara çekmek</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-600 mt-1">•</span>
                <span>Platformlarla diyalog kurarak şeffaflık talep etmek</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Uzun Vadeli Hedefler</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Komisyon oranlarının %15-20 seviyelerine düşürülmesini sağlamak</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Kuryeler için adil ücretlendirme ve sosyal güvence standartları oluşturmak</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Şeffaf fiyatlandırma ve kesinti politikaları için yasal düzenlemeler talep etmek</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Adil ve şeffaf bir yemek sipariş ekosistemi yaratmak</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 p-6 md:p-8 rounded-xl shadow-lg text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Bize Katılın</h2>
        <p className="text-base md:text-xl text-primary-100 mb-4 md:mb-6 max-w-2xl mx-auto px-2">
          Adil bir yemek sipariş ekosistemi için birlikte mücadele edelim. Şikayetlerinizi paylaşın, sesinizi duyurun ve değişimin bir parçası olun.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
          <Link
            to="/sikayet-olustur"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-lg hover:bg-primary-50 transition-all duration-200 transform hover:scale-105 text-sm md:text-base"
          >
            Şikayet Oluştur
          </Link>
          <Link
            to="/sikayetler"
            className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-primary-500 text-white font-semibold rounded-lg shadow-lg hover:bg-primary-400 transition-all duration-200 transform hover:scale-105 text-sm md:text-base"
          >
            Şikayetleri Görüntüle
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
