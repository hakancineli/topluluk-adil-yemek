const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Hakkımızda</h1>
      <div className="prose prose-lg">
        <p className="text-gray-700 mb-4">
          AdilYemek, yemek sipariş platformlarındaki sorunları toplu olarak 
          ele almak ve çözmek için oluşturulmuş bir topluluk platformudur.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Amacımız</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Restoran sahiplerinin, müşterilerin ve kuryelerin sesini duyurmak</li>
          <li>Şikayetleri organize etmek ve resmi makamlara iletmek</li>
          <li>Adil ve şeffaf bir yemek sipariş ekosistemi oluşturmak</li>
        </ul>
      </div>
    </div>
  )
}

export default AboutPage



