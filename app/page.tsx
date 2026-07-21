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
        <div className="surum">7 sektör · 21 bağımsız site teması</div>
      </header>

      <section className="hero">
        <div className="heroEtiket">
          WEB SİTESİ ÜRETİM SİSTEMİ
        </div>

        <h1>
          Normal web sitesi gibi,
          <br />
          Studio’dan kolayca yönet.
        </h1>

        <p>
          Her müşteri için tek veya çok sayfalı bağımsız bir proje oluştur.
          İşletme bilgilerini ve görselleri Studio’dan yönet; projeyi kendi
          GitHub repositorysine gönder ve daha sonra yeniden açıp güncelle.
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
            <h2>Tek sayfa veya çok sayfa</h2>
            <p>
              Proje başında yapıyı seç; Studio GitHub’a çıkacak gerçek rotaları
              ve bağımsız site paketini buna göre hazırlasın.
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
              Kuaför, berber, güzellik salonu, nail artist, oto yıkama, halı
              yıkama ve nakliye için üçer ayrı site düzeni kullan.
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
