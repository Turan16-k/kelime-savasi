/* ============================================================
   CODENAMES - TÜRKÇE KELİME HAVUZU
   Karttaki 25 kelime bu havuzdan rastgele seçilir.
   ============================================================ */
const WORD_POOL = [
  "TAVA", "BIÇAK", "DOLAP", "MUTFAK", "MASA", "SANDALYE", "PENCERE", "KAPI",
  "ANAHTAR", "KİLİT", "SAAT", "AYNA", "LAMBA", "MUM", "ATEŞ", "SU",
  "BUZ", "KAR", "GÜNEŞ", "AY", "YILDIZ", "GÖKYÜZÜ", "BULUT", "YAĞMUR",
  "DENİZ", "DALGA", "GEMİ", "BALIK", "AHTAPOT", "KÖPEKBALIĞI", "KAPLUMBAĞA", "YENGEÇ",
  "ORMAN", "AĞAÇ", "ÇİÇEK", "ARI", "KELEBEK", "KARINCA", "ÖRÜMCEK", "YILAN",
  "ASLAN", "KAPLAN", "FİL", "ZÜRAFA", "MAYMUN", "AYI", "KURT", "TİLKİ",
  "KEDİ", "KÖPEK", "AT", "İNEK", "KOYUN", "TAVUK", "HOROZ", "ÖRDEK",
  "ELMA", "ARMUT", "MUZ", "PORTAKAL", "ÇİLEK", "KARPUZ", "ÜZÜM", "KİRAZ",
  "EKMEK", "PEYNİR", "ZEYTİN", "BAL", "ŞEKER", "TUZ", "BİBER", "DOMATES",
  "ÇORBA", "PİLAV", "MAKARNA", "KEBAP", "PİZZA", "ÇİKOLATA", "DONDURMA", "PASTA",
  "ARABA", "OTOBÜS", "TREN", "UÇAK", "BİSİKLET", "MOTOSİKLET", "ROKET", "VAPUR",
  "OKUL", "ÖĞRETMEN", "KİTAP", "KALEM", "DEFTER", "TAHTA", "ÇANTA", "SINIF",
  "DOKTOR", "HASTANE", "İLAÇ", "İĞNE", "AŞÇI", "POLİS", "ASKER", "PİLOT",
  "TELEFON", "BİLGİSAYAR", "KLAVYE", "EKRAN", "İNTERNET", "ROBOT", "KAMERA", "RADYO",
  "PARA", "BANKA", "ALTIN", "ELMAS", "HAZİNE", "KORSAN", "HARİTA", "PUSULA",
  "KRAL", "KRALİÇE", "ŞATO", "TAÇ", "KILIÇ", "KALKAN", "EJDERHA", "PERİ",
  "FUTBOL", "BASKETBOL", "TOP", "KALE", "GOL", "HAKEM", "MADALYA", "KUPA",
  "MÜZİK", "GİTAR", "PİYANO", "DAVUL", "ŞARKI", "DANS", "SAHNE", "MİKROFON",
  "DAĞ", "NEHİR", "GÖL", "ÇÖL", "ADA", "MAĞARA", "VOLKAN", "ŞELALE",
  "ŞEHİR", "KÖPRÜ", "KULE", "PARK", "BAHÇE", "SOKAK", "MEYDAN", "HEYKEL"
];
