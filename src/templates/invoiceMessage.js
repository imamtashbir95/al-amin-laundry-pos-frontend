import dayjs from "dayjs";

export const generateWhatsAppMessage = (data) => `
--------------------------------------------
As-salāmu ʿalaikum wa-raḥmatu -llāhi wa-barakātuhᵘ̄

Umi Laundry
Perum. Vila Rizki Ilhami, Kel. Bojong Nangka, Kec. Kelapa Dua, Kab. Tangerang, Banten 15810
Depan Masjid Khoirurroziqin

Buka setiap hari, 
Jam 8 pagi s.d. 8 malam
--------------------------------------------
${dayjs(new Date()).format("DD-MM-YYYY")}
Jam: ${dayjs(new Date()).format("HH:mm:ss")}

No. Nota: ${data.invoiceId}
A.n. Nama: ${data.customer.name}
No. WA: ${data.customer.phoneNumber}
Alamat: ${data.customer.address}
--------------------------------------------
Layanan: ${data.product.name}
Qty.: ${data.qty} ${data.product.type}
Harga: ${Number(data.product.price).toLocaleString("id-ID")}
Total: ${Number(data.product.price * data.qty)},
).toLocaleString("id-ID")}
--------------------------------------------
Pembayaran rek. BCA
567 603 5296
a.n. Imam Tashbir Arrahman
--------------------------------------------
Perkiraan Selesai:
${dayjs(new Date(data.finishDate)).format("DD-MM-YYYY")}
Jam: ${dayjs(new Date(data.finishDate)).format("HH:mm:ss")}
--------------------------------------------
Status: ${data.paymentStatus
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}
--------------------------------------------
Antar jemput gratiss..
WA: 085283267928
--------------------------------------------
${data.paymentStatus === "belum-dibayar" ? "Silakan selesaikan pembayaran tagihan. " : ""}Kami akan antar langsung bila sudah selesai. Terima kasih
Salam
--------------------------------------------
`;
