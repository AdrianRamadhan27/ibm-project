import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PenTool, MessageCircle, Brain } from "lucide-react"
import Image from "next/image"
import Scroller from "@/components/ui/scroller"
import Link from "next/link"
export default function SuaraHatiLanding() {
  return (
    <main className="main overflow-x-hidden">
    <div className="mainDiv min-h-screen font-sans">
      
      

      {/* Man Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-10 lg:px-30 py-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
            <div className="space-y-6 order-2 lg:order-1">
              <h1 className="text-3xl lg:text-6xl font-bold text-black leading-tight" data-aos="fade-up">
                Suarakan Isi <span className="text-[#ec616a]">Hatimu</span>
                <br />
                Demi Kebaikan
                <br />
                <span className="text-[#ec616a]">Hidupmu</span>
              </h1>
              <p className="text-gray-700 text-md lg:text-lg" data-aos="fade-up">
                Buat Jurnal Rutin atau Tanyakan Keluh Kesahmu
                <br />
                dan Dapatkan Saran dan Solusi dari AI secara Instan!
              </p>
              <Button className="glow-on-hover text-xl " data-aos="fade-right"><Link href="/auth">Mulai Suarakan Hati</Link></Button>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="relative mask-fade">
                <Image data-aos="zoom-in-up" src="/man confused 2.png" alt="Man thinking" width={500} height={300} className="w-full h-auto"/>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-black mb-12" data-aos="fade-up-right">
            Apa yang kamu dapatkan di Suara<span className="text-[#ec616a]">Hati</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-md" data-aos="fade-right">
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
            <Card className="bg-white border-0 shadow-md" data-aos="fade-up">
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
            <Card className="bg-white border-0 shadow-md" data-aos="fade-left">
              <CardContent className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-black">Deteksi Mood</h3>
                <p className="text-gray-600 text-sm">
                  Selidiki perasaanmu dan dapatkan
                  <br />
                  rekomendasi cara mengatasinya
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
           <section className="py-16 ">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-black mb-12" data-aos="fade-up-left">
            Apa kata pengguna Suara<span className="text-[#ec616a]">Hati</span>
          </h2>
            <Scroller/>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-8" data-aos="fade-up">
            Tertarik Gunakan Suara<span className="text-[#ec616a]">Hati</span>?
          </h2>
          <Button className="glow-on-hover text-lg" data-aos="zoom-in"><Link href="/auth">Mulai Suarakan Hati</Link></Button>
        </div>
      </section>


    </div>
    </main>
  )
}
