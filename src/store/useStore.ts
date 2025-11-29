import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Complaint, Platform, OfficialComplaint, BulkComplaint } from '../types'
import { complaintApi } from '../services/complaintApi'

interface StoreState {
  complaints: Complaint[]
  platforms: Platform[]
  officialComplaints: OfficialComplaint[]
  bulkComplaints: BulkComplaint[]
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'upvotes' | 'status'>) => Promise<void>
  upvoteComplaint: (id: string) => Promise<void>
  updateComplaintStatus: (id: string, status: Complaint['status']) => Promise<void>
  addOfficialComplaint: (officialComplaint: OfficialComplaint) => void
  updateOfficialComplaintStatus: (id: string, status: OfficialComplaint['status']) => void
  addBulkComplaint: (bulkComplaint: BulkComplaint) => void
  addComplaintToBulk: (bulkComplaintId: string, complaintId: string) => void
  updateBulkComplaintStatus: (id: string, status: BulkComplaint['status']) => void
}

// Mock data - başlangıç verileri
const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Yemeksepeti Yüksek Komisyon Oranı',
    description: 'Yemeksepeti işletmeme %35 komisyon uyguluyor. Bu oran çok yüksek ve sürdürülebilir değil. Diğer platformlarda bu oran %20-25 arasında.',
    category: 'restaurant',
    platform: 'Yemeksepeti',
    createdAt: new Date('2024-11-20'),
    upvotes: 45,
    status: 'pending',
  },
  {
    id: '2',
    title: 'GetirYemek Sipariş İptal Sorunu',
    description: 'Siparişimi iptal ettim ama para iadesi yapılmadı. Müşteri hizmetleri ile iletişime geçtim ama çözüm bulamadım.',
    category: 'customer',
    platform: 'GetirYemek',
    createdAt: new Date('2024-11-22'),
    upvotes: 32,
    status: 'pending',
  },
  {
    id: '3',
    title: 'Kurye Ücretleri Yetersiz',
    description: 'Trendyol Yemek kurye ücretlerini çok düşük tutuyor. Mesafe başına ödenen ücret benzin masraflarını bile karşılamıyor.',
    category: 'courier',
    platform: 'Trendyol Yemek',
    createdAt: new Date('2024-11-25'),
    upvotes: 67,
    status: 'reviewed',
  },
  {
    id: '4',
    title: 'Yemeksepeti Müşteri Hizmetleri Yanıt Vermiyor',
    description: 'Bir haftadır müşteri hizmetlerine yazıyorum ama hiçbir yanıt alamıyorum. Şikayetim çözülmedi.',
    category: 'customer',
    platform: 'Yemeksepeti',
    createdAt: new Date('2024-11-26'),
    upvotes: 28,
    status: 'pending',
  },
  {
    id: '5',
    title: 'GetirYemek Restoran Listeleme Ücreti',
    description: 'Platformda listelenmek için aylık sabit ücret talep ediliyor. Bu uygulama haksız rekabet oluşturuyor.',
    category: 'restaurant',
    platform: 'GetirYemek',
    createdAt: new Date('2024-11-27'),
    upvotes: 51,
    status: 'escalated',
  },
]

// Platform'ları şikayetlerden dinamik olarak oluştur
const createPlatformsFromComplaints = (complaints: Complaint[]): Platform[] => {
  const platformMap = new Map<string, number>()
  
  // Her platform için şikayet sayısını hesapla
  complaints.forEach((complaint) => {
    const count = platformMap.get(complaint.platform) || 0
    platformMap.set(complaint.platform, count + 1)
  })
  
  // Platform objelerini oluştur
  const platforms: Platform[] = []
  let id = 1
  
  platformMap.forEach((totalComplaints, name) => {
    platforms.push({
      id: id.toString(),
      name,
      logo: `https://via.placeholder.com/150x80?text=${encodeURIComponent(name)}`,
      totalComplaints,
    })
    id++
  })
  
  return platforms
}

// İlk platform listesini oluştur
const initialPlatforms = createPlatformsFromComplaints(mockComplaints)

export const useStore = create<StoreState>()(
  persist(
    (set) => {
      // Store başlatıldığında API'den şikayetleri yükle (async, arka planda)
      complaintApi.getAll().then((apiComplaints) => {
        if (apiComplaints.length > 0) {
          const platformMap = new Map<string, number>()
          apiComplaints.forEach((complaint) => {
            const count = platformMap.get(complaint.platform) || 0
            platformMap.set(complaint.platform, count + 1)
          })
          
          const platforms: Platform[] = []
          let id = 1
          platformMap.forEach((totalComplaints, name) => {
            platforms.push({
              id: id.toString(),
              name,
              logo: `https://via.placeholder.com/150x80?text=${encodeURIComponent(name)}`,
              totalComplaints,
            })
            id++
          })
          
          set({ complaints: apiComplaints, platforms })
        }
      }).catch(console.error)
      
      return {
        complaints: mockComplaints,
        platforms: initialPlatforms,
        officialComplaints: [],
        bulkComplaints: [],

        addComplaint: async (complaintData) => {
          try {
            // API'ye kaydet
            const newComplaint = await complaintApi.create(complaintData)
            
            // Store'u güncelle
            set((state) => {
              const updatedComplaints = [newComplaint, ...state.complaints]

              // Platform listesini güncelle
              const platformMap = new Map<string, number>()
              updatedComplaints.forEach((complaint) => {
                const count = platformMap.get(complaint.platform) || 0
                platformMap.set(complaint.platform, count + 1)
              })

              const updatedPlatforms = state.platforms.map((platform) => {
                const count = platformMap.get(platform.name) || 0
                return { ...platform, totalComplaints: count }
              })

              // Yeni platformlar varsa ekle
              platformMap.forEach((totalComplaints, name) => {
                if (!updatedPlatforms.find((p) => p.name === name)) {
                  updatedPlatforms.push({
                    id: Date.now().toString(),
                    name,
                    logo: `https://via.placeholder.com/150x80?text=${encodeURIComponent(name)}`,
                    totalComplaints,
                  })
                }
              })

              return {
                complaints: updatedComplaints,
                platforms: updatedPlatforms,
              }
            })
          } catch (error) {
            console.error('Şikayet eklenirken hata:', error)
            throw error
          }
        },

        upvoteComplaint: async (id) => {
          try {
            const updated = await complaintApi.upvote(id)
            set((state) => ({
              complaints: state.complaints.map((complaint) =>
                complaint.id === id ? updated : complaint
              ),
            }))
          } catch (error) {
            console.error('Oy verme hatası:', error)
          }
        },

        updateComplaintStatus: async (id, status) => {
          try {
            const updated = await complaintApi.updateStatus(id, status)
            set((state) => ({
              complaints: state.complaints.map((complaint) =>
                complaint.id === id ? updated : complaint
              ),
            }))
          } catch (error) {
            console.error('Durum güncelleme hatası:', error)
          }
        },

        addOfficialComplaint: (officialComplaint) => {
          set((state) => ({
            officialComplaints: [...state.officialComplaints, officialComplaint],
          }))
        },

        updateOfficialComplaintStatus: (id, status) => {
          set((state) => ({
            officialComplaints: state.officialComplaints.map((complaint) =>
              complaint.id === id
                ? { ...complaint, status, lastUpdated: new Date() }
                : complaint
            ),
          }))
        },

        addBulkComplaint: (bulkComplaint) => {
          set((state) => ({
            bulkComplaints: [...state.bulkComplaints, bulkComplaint],
          }))
        },

        addComplaintToBulk: (bulkComplaintId, complaintId) => {
          set((state) => ({
            bulkComplaints: state.bulkComplaints.map((bulk) =>
              bulk.id === bulkComplaintId
                ? {
                    ...bulk,
                    complaintIds: [...bulk.complaintIds, complaintId],
                    totalComplaints: bulk.totalComplaints + 1,
                  }
                : bulk
            ),
          }))
        },

        updateBulkComplaintStatus: (id, status) => {
          set((state) => ({
            bulkComplaints: state.bulkComplaints.map((bulk) =>
              bulk.id === id ? { ...bulk, status } : bulk
            ),
          }))
        },
      }
    },
    {
      name: 'adil-yemek-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        complaints: state.complaints,
        platforms: state.platforms,
        officialComplaints: state.officialComplaints,
        bulkComplaints: state.bulkComplaints,
      }),
    }
  )
)
