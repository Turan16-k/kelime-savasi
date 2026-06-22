# 🕵️ Codenames

Tarayıcıda oynanan, **tek cihaz / pass-and-play** Codenames. Kurulum gerektirmez —
`index.html`'i çift tıkla, oyna.

## Nasıl Oynanır?

1. İki takım: **Kırmızı** ve **Mavi**. Her takımdan biri **Kaptan**.
2. "Yeni Oyun Dağıt" 25 kelimeyi ve gizli renk haritasını üretir (9 / 8 / 7 nötr / 1 suikastçı).
3. Kaptan **👁 Kaptan Görünümü** butonunu **basılı tutarak** gizli haritayı görür
   (renkler kart kenarlığında belirir). Bıraktığında gizlenir → telefon takıma geçer.
4. Kaptan ipucu kutusuna **tek kelime + sayı** yazıp "Ver" der (örn. `Mutfak 3`).
5. Takım kelimelere dokunur:
   - **Kendi rengi** → puan, devam (en fazla sayı + 1 tahmin).
   - **Nötr / rakip** → sıra geçer.
   - **Suikastçı (siyah)** → o takım anında kaybeder.
6. Tüm ajanlarını ilk bulan takım kazanır.

## Özellikler

- Rastgele 25 kelimelik tahta (140+ kelimelik Türkçe havuz, `words.js`).
- Basılı-tut kaptan görünümü (mouse + dokunmatik).
- İpucu çubuğu, kalan ajan sayacı, otomatik sıra/tahmin-hakkı yönetimi.
- Oyun sonunda tüm harita açılır.

## Dosyalar

| Dosya | İçerik |
|-------|--------|
| `index.html` | Ekran yapısı |
| `style.css` | Tema ve tahta |
| `game.js` | Oyun mantığı |
| `words.js` | Kelime havuzu |
