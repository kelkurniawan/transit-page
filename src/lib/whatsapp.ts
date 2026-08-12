/**
 * Pembuat link WhatsApp terpusat.
 *
 * Sebelumnya URL lengkap di-hardcode di 9 tempat dengan pesan pre-fill yang
 * SAMA PERSIS ("Halo, saya ingin menanyakan layanan pengiriman barang"), jadi
 * tidak mungkin tahu lead datang dari halaman mana sebelum membalas. Sekarang
 * tiap pemanggil mengirim pesan sesuai konteksnya.
 *
 * Pesan pre-fill mengikuti bahasa locale-nya: ID berbahasa Indonesia, EN
 * berbahasa Inggris. Inbox jadi campur bahasa, dan itu memang disengaja —
 * pesan berbahasa Inggris yang masuk langsung menandakan lead datang dari
 * situs /en dan perlu dibalas dalam bahasa Inggris. Kalau kedua locale
 * memakai teks Indonesia yang sama, asal lead tidak bisa dibedakan sama
 * sekali, dan pengunjung berbahasa Inggris cenderung menghapus teks yang
 * tak ia mengerti sehingga sinyal asal halamannya ikut hilang.
 */
export const WA_NUMBER = "6282124064792";

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
