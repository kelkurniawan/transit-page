import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'as-needed',

  /**
   * Indonesia adalah bahasa utama; Inggris hanya pilihan.
   *
   * Secara bawaan next-intl mendeteksi locale dari header `accept-language`
   * dan cookie, sehingga pengunjung dengan ponsel/browser berbahasa Inggris
   * — sangat umum di Indonesia — otomatis dilempar ke /en dan tidak pernah
   * melihat versi Indonesianya. Padahal pasar Transit adalah pabrik dan
   * distributor lokal.
   *
   * Dengan `false`, setiap kunjungan ke URL tanpa awalan selalu menyajikan
   * bahasa Indonesia. Versi Inggris hanya tercapai lewat /en secara eksplisit,
   * yaitu ketika pengunjung menekan tombol EN.
   */
  localeDetection: false
});
