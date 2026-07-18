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
        <div className="surum">36 sektöre özel yeni nesil stüdyo</div>
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
          Firma bilgilerini ve sektörünü belirle. Sitemix Studio; tipografi,
          renk, sektörel tipografi ve hareketli bilgi sahneleriyle
          görsele ihtiyaç duymadan bağımsız bir web sitesi oluştursun.
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
            <h2>Sayfa ve bölüm yönetimi</h2>
            <p>
              İstediğin sayfayı oluştur, bölümleri ekle ve aşağı doğru
              sıralayarak site yapısını belirle.
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
              36 sektör için ayrı tipografik sahneler, hareket karakterleri ve
              tema düzenleriyle görsel olmadan da güçlü siteler oluştur.
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
