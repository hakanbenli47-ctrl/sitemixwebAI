import Link from "next/link";
import {
  ArrowRight,
  MonitorSmartphone,
  PanelsTopLeft,
  Sparkles,
} from "lucide-react";

export default function AnaSayfa() {
  return (
    <main className="anaSayfa">
      <header className="ustAlan">
        <Link href="/" className="logo">
          <span>SITEMIX</span>
          <small>STUDIO</small>
        </Link>
        <div className="surum">10 güçlü hizmet sektörüne özel stüdyo</div>
      </header>

      <section className="hero">
        <div className="heroEtiket">
          WEB SİTESİ ÜRETİM SİSTEMİ
        </div>

        <h1>
          Görsel aramadan,
          <br />
          sektöre özel siteler oluştur.
        </h1>

        <p>
          Firma bilgilerini, sektörünü ve sunduğun hizmetleri seç. Hazır içerik
          paketleri, bağımsız sayfalar ve görsel düzenleyiciyle kod yazmadan
          profesyonel bir web sitesi kur.
        </p>

        <div className="heroButonlar">
          <Link href="/studio/yeni" className="anaButon">
            Yeni proje oluştur
            <ArrowRight size={19} />
          </Link>

          <Link href="/studio/projeler" className="ikincilButon">
            Projeleri görüntüle
          </Link>
        </div>
      </section>

      <section className="sistemOzeti">
        <div className="bolumBasligi">
          <span>01</span>
          <p>Sistem yapısı</p>
        </div>

        <div className="ozellikSatiri">
          <div className="ozellikIkon">
            <PanelsTopLeft size={30} strokeWidth={1.5} />
          </div>

          <div className="ozellikMetni">
            <h2>Görsel çok sayfalı stüdyo</h2>
            <p>
              Sayfaları, bölümleri ve metinleri canlı önizleme üzerinde yönet;
              hazır blokları ekle ve istediğin sıraya taşı.
            </p>
          </div>
        </div>

        <div className="ozellikSatiri">
          <div className="ozellikIkon">
            <Sparkles size={30} strokeWidth={1.5} />
          </div>

          <div className="ozellikMetni">
            <h2>Sektöre özel tasarım dili</h2>
            <p>
              Kuaförden nakliyata, tesisatçıdan VIP transfere odaklanan on iş
              kolu için ayrı içerik, renk, tipografi ve hareket dili kullan.
            </p>
          </div>
        </div>

        <div className="ozellikSatiri">
          <div className="ozellikIkon">
            <MonitorSmartphone size={30} strokeWidth={1.5} />
          </div>

          <div className="ozellikMetni">
            <h2>Tüm cihazlara uygun</h2>
            <p>
              Masaüstü, tablet ve mobil görünümü panel içerisinden kontrol et.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
