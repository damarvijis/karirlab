Instruksi untuk menjalankan kode:
a. clone file dari git
b. npm i
1. Running App: npm run start
2. Running Test: npm run test

Keputusan teknis utama:
1. Saya membuat store uyang didalam nya terdapat actions (berisi function untuk mendukung jalannya aplikasi) dan reducer (untuk penyimpanan sementara menggunakan redux).
2. Semua function saya letakkan di dalam folder action agar lebih mudah dibaca
3. Pada halaman utama, saya menampilkan 20 post. Di sampingnya terdapat sidebar navigasi untuk memudahkan pengguna ketika ingin membuat post & melakukan sorting / filtering (by category)
4. Ketika judul post pada halaman utama di pencet, maka akan di arahkan ke detail post. disini user juga bisa menambahkan langsung komentar terhadap post tersebut.
5. Ketika button arrow / panah pada setiap post di pencet, upvote pada post tersebut akan terupdate
6. pada bagian add post, ketika membuat post wajib mengisi Nama, Judul Post, dan Deskripsi Post.

Komentar:
1. testing yang dilakukan masih sangat sederhana (hanya bagian tag html saja). Saya masih perlu banyak belajar untuk menerapkan testing di Redux, state, dll.
2. Secara fungsional saya berusaha menyesuaikan dengan requirement dan sudah responsive. hanya saja tampilan yang saya buat sangat sederhana
