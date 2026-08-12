/**
 * Pembuat link WhatsApp terpusat.
 *
 * Sebelumnya URL lengkap di-hardcode di 9 tempat dengan pesan pre-fill yang
 * SAMA PERSIS ("Halo, saya ingin menanyakan layanan pengiriman barang"), jadi
 * tidak mungkin tahu lead datang dari halaman mana sebelum membalas. Sekarang
 * tiap pemanggil mengirim pesan sesuai konteksnya.
 *
 * Pesan pre-fill selalu Bahasa Indonesia di kedua locale — mengikuti konvensi
 * yang sudah dipakai 28 artikel — supaya inbox tidak campur bahasa.
 */
export const WA_NUMBER = "6282124064792";

export function waLink(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
