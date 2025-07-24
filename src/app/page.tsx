import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, PenTool, MessageCircle, Brain, Facebook, Instagram, Twitter, Linkedin, Globe } from "lucide-react"
import Image from "next/image"

export default function SuaraHatiLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-[#ec616a]" />
          <span className="text-xl font-bold text-black">
            Suara<span className="text-[#ec616a]">Hati</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-700 hover:text-[#ec616a]">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-[#ec616a]">
            Pricing
          </a>
          <a href="/journal" className="text-gray-700 hover:text-[#ec616a]">
            Jurnal
          </a>
          <a href="#" className="text-gray-700 hover:text-[#ec616a]">
            Konsultasi
          </a>
          <a href="/auth" className="text-gray-700 hover:text-[#ec616a]">
            Masuk
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                Suarakan Isi <span className="text-[#ec616a]">Hatimu</span>
                <br />
                Demi Kebaikan
                <br />
                <span className="text-[#ec616a]">Hidupmu</span>
              </h1>
              <p className="text-gray-700 text-lg">
                Buat Jurnal Rutin atau Tanyakan Keluh Kesahmu
                <br />
                dan Dapatkan Saran dan Solusi dari AI secara Instan!
              </p>
              <Button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800">Mulai Sekarang</Button>
            </div>
            <div className="relative">
              <div className="relative">
                <Image src="/Man Thinking.png" alt="Man thinking" width={500} height={400} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">
                Beban mental bisa <span className="text-[#ec616a]">menurunkan</span>
                <br />
                <span className="text-[#ec616a]">produktivitas</span> kerja per harinya hingga
              </p>
              <div className="text-4xl font-bold text-black">3 jam</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-black">1 dari 3</div>
              <p className="text-gray-600 text-sm">
                orang dewasa Indonesia mengalami
                <br />
                gangguan <span className="text-[#ec616a]">kecemasan atau depresi</span>
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm">
                Menulis jurnal secara rutin terbukti
                <br />
                <span className="text-[#ec616a]">menurunkan stres</span> hingga
              </p>
              <div className="text-4xl font-bold text-black">28%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Apa yang kamu dapatkan di Suara<span className="text-[#ec616a]">Hati</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <PenTool className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold text-black">Tulis Jurnal</h3>
                <p className="text-gray-600 text-sm">
                  Tuliskan jurnal secara rutin dan
                  <br />
                  dapatkan insight tentang kondisimu
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <MessageCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-black">Konsultasi</h3>
                <p className="text-gray-600 text-sm">
                  Tanyakan keluh kesahmu dan dapatkan
                  <br />
                  saran yang bisa membantu
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white border-0 shadow-sm">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-black">Deteksi Mood</h3>
                <p className="text-gray-600 text-sm">
                  Selidiiki perasaanmu dan dapatkan
                  <br />
                  rekomendasi cara mengatasinya
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="/Woman Laptop.png"
                alt="Woman using laptop"
                width={500}
                height={400}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="text-sm font-medium text-gray-600">Jurnal</div>
              <p className="text-gray-700 leading-relaxed">
                Hari ini terasa berat. Banyak pekerjaan yang datang bertubi-tubi dan aku merasa tidak dihargai oleh tim.
                Aku berusaha sekuat mungkin untuk menyelesaikan semua tugas, tapi tetap ada saja kritik yang membuatku
                merasa gagal. Aku ingin sekali bisa lebih santai dan tidak selalu merasa cemas akan penilaian orang
                lain.
              </p>
              <Card className="bg-[#ec616a] text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Brain className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div className="font-medium">Insight AI ✨</div>
                  </div>
                  <p className="text-sm leading-relaxed">
                    Sepertinya kamu sedang merasa stres dan kurang dihargai. Aku merekomendasikan untuk mengambil waktu
                    istirahat yang teratur, bicara dengan atasan tentang beban kerja, dan ingat bahwa nilai dirimu tidak
                    bergantung pada penilaian orang lain. Cobalah teknik pernapasan dalam selama 5 menit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-8">
            Tertarik Gunakan Suara<span className="text-[#ec616a]">Hati</span>?
          </h2>
          <Button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800">Mulai Sekarang →</Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-6 mb-6">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
          </div>
          <p className="text-center text-gray-600 text-sm">© 2025 SuaraHati. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
