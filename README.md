# bus-ticket-app

Bu proje, kullanıcıların kolayca otobüs seferlerini arayıp bilet satın alabilecekleri bir web uygulaması oluşturmaktır. Bu uygulama, kullanıcıların kalkış ve varış noktalarını, seyahat tarihlerini seçmelerine olanak tanır ve buna göre mevcut otobüs seferlerini listeler. Seferleri listelerken serverside getServerSideProps methodu ile Server side tarafında verilerin çekilmesini sağladım. Böylelikle verilerin güvenliğini arttırdım ve dinamik olarak değişmesini sağladım. Toast mesajları için react-toastify paketini kullandım, bu paket sayesinde ön yüzde kullanıcıya girilen hatalı bilgiler veya bulunamayan seferler için bildirim gösterdim. Farklı cinsiyete sahip yolcuların yanyana oturması ve bir kişinin 5 ten fazla koltuk seçebilmesi engellendi.

## Gereksinimler

- Node.js
- npm veya yarn

## Kurulum

1. Depoyu yerel makinenize klonlayın.
   git clone https://github.com/TutkuEroglu/bus-ticket-app.git

2. Proje dizinine gidin.
   cd bus-ticket-app

3. Gerekli dosyaları yükleyin.
   npm install & yarn install

## Kullanım 

1. Proje dizininde aşağıdaki komutla uygulamayı çalıştırabilirsiniz:
   npm run dev & yarn dev

2. Tarayıcınızda http://localhost:3000 adresine gidin.

3. Üyelik oluşturduktan sonra giriş yapabilirsiniz.

4. Sefer tarihleri "./src/mockData/apiData.ts" içerisinde bulunmaktadır.

## Kullanılan Teknolojiler

1. React: 18
2. Next.js: 13.5.4
3. Typescript: 5.2.2
4. Context API
5. react-toastify: 9.1.3
6. react-loading: 2.0.3
7. react-icons: 4.11.0