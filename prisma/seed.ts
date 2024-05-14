import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const avatarUrl = [
 "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/GNXZRJQKT",
 "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/UVHMSWOZE",
 "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/FIFQTMUPC",
 "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/ZOKOOOHIP",
 "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/GUXUYZJNQ",
 "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/LFKLRTJJB",
 "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/WRIFLQONZ"
];
 const predefinedDesigners = [
  {
    name: "Laila Fares",
    location: "Al-Ajmi",
    address: "12 Al Nasr Road, Al-Ajmi, Alexandria",
    yearsExperience: 5,
    gender: "Female",
    about: "Hello! I'm Laila Fares from Alexandria, where I run my boutique, Laila's Designs. With over five years of experience in bespoke tailoring, I specialize in modernizing traditional wear."
  },
  {
    name: "Noor Saleh",
    location: "Bahary",
    address: "2 Al-Gaish Road, Bahary, Alexandria",
    yearsExperience: 3,
    gender: "Female",
    about: "Hi, I'm Noor Saleh, an Alexandria-based tailor and fashion designer at Noor's Couture. I've been creating elegant evening and bridal wear for three years, turning dreams into reality."
  },
  {
    name: "Amira Nassar",
    location: "Al-Mansheya",
    address: "11 Nabi Daniel St., Al-Mansheya, Alexandria",
    yearsExperience: 12,
    gender: "Female",
    about: "Welcome! I'm Amira Nassar, the proud owner of Nassar Fashion House in Alexandria. My passion lies in crafting bespoke men's suits, with a keen eye for detail and style."
  },
  {
    name: "Yasmin Karam",
    location: "Al-Raml",
    address: "14 Ahmed Orabi Square, Al-Raml, Alexandria",
    yearsExperience: 4,
    gender: "Female",
    about: "I'm Yasmin Karam from Alexandria, specializing in children's apparel. With over four years in the industry, my boutique, Little Stars, offers custom, creative outfits for kids."
  },
  {
    name: "Farah Sabbagh",
    location: "Al-Shatby",
    address: "7 Qasr El-Aini St., Al-Shatby, Alexandria",
    yearsExperience: 6,
    gender: "Female",
    about: "Hello! I'm Farah Sabbagh, a fashion designer in Alexandria. For the past six years, I've been focusing on women's fashion, running my shop, Farah Fashions, where elegance meets modernity."
  },
  {
    name: "Sana Barakat",
    location: "El-Ibrahimeya",
    address: "84 Omar Lotfy St., El Ibrahimeya, Alexandria",
    yearsExperience: 5,
    gender: "Female",
    about: "I am Sana Barakat, operating out of Alexandria. My studio, Sana's Workshop, specializes in custom leather goods, providing unique and durable items for five years."
  },
  {
    name: "Hana Taha",
    location: "Sporting",
    address: "7 Hassan Rasim St., Sporting, Alexandria",
    yearsExperience: 7,
    gender: "Female",
    about: "Hi, I'm Hana Taha from Alexandria, owner of Taha Tailors. I've dedicated seven years to crafting bespoke bridal gowns that capture each bride's unique spirit."
  },
  {
    name: "Salma Hamdan",
    location: "Sidi Gaber",
    address: "3 Abd El Qader Ragab St., Sidi Gaber, Alexandria",
    yearsExperience: 8,
    gender: "Female",
    about: "Welcome! I'm Salma Hamdan, your expert in traditional Egyptian attire with a modern twist. Operating in Alexandria for eight years, my boutique, Salma's Creations, cherishes cultural heritage."
  },
  {
    name: "Rania Dagher",
    location: "Somoha",
    address: "12 Somoha Club St., Somoha, Alexandria",
    yearsExperience: 10,
    gender: "Female",
    about: "I'm Rania Dagher from Alexandria, specializing in upcycled and sustainable fashion. For ten years, my brand, EcoWear, has been making fashion both beautiful and environmentally conscious."
  },
  {
    name: "Aisha Daher",
    location: "Roshdy",
    address: "7 Mostafa Fahmy St., Roshdy, Alexandria",
    yearsExperience: 10,
    gender: "Female",
    about: "Hello, I'm Aisha Daher of Alexandria. My shop, Aisha's Atelier, offers bespoke tailoring and image consulting to help you look your best, with over a decade of fashion expertise."
  },
  {
    name: "Malak Ayoub",
    location: "Stanley",
    address: "3 Stanley Bridge St., Stanley, Alexandria",
    yearsExperience: 12,
    gender: "Female",
    about: "I'm Malak Ayoub, a bespoke tailor in Alexandria, focusing on men's formal wear. With 12 years of experience, I ensure every piece from Gentlemen's Choice is impeccably crafted."
  },
  {
    name: "Zara Alwan",
    location: "Glim",
    address: "15 Kamel El Shennawi St., Glim, Alexandria",
    yearsExperience: 15,
    gender: "Female",
    about: "Hi, I'm Zara Alwan, owner of Zara's Couture in Alexandria. I specialize in high-end women's apparel, bringing over fifteen years of international experience to my designs."
  },
  {
    name: "Nadia Mousa",
    location: "Saba Pasha",
    address: "7 Victor Emanuel St., Saba Pasha, Alexandria",
    yearsExperience: 6,
    gender: "Female",
    about: "Welcome! I'm Nadia Mousa, your go-to for vintage and retro fashion in Alexandria. Vintage Vogue, my boutique, has been a hub for classic styles revisited for six years."
  },
  {
    name: "Mariam Yassin",
    location: "Victoria",
    address: "18 Horreya Ave, Victoria, Alexandria",
    yearsExperience: 8,
    gender: "Female",
    about: "I am Mariam Yassin, proudly running Mariam's Bridal in Alexandria. With eight years in the industry, I craft memorable wedding dresses that embody sophistication and grace."
  },
  {
    name: "Layla Mazhar",
    location: "Sidi Bishr",
    address: "5 El Gaish Road, Sidi Bishr, Alexandria",
    yearsExperience: 10,
    gender: "Female",
    about: "Hello! I'm Layla Mazhar from Alexandria, specializing in custom knitted and crocheted garments at Layla Knits. With a decade of experience, I blend tradition with contemporary fashion."
  },
  {
    name: "Samira Masri",
    location: "Miami",
    address: "2 Khaled Ibn El Walid St., Miami, Alexandria",
    yearsExperience: 5,
    gender: "Female",
    about: "I'm Samira Masri, a designer of chic business attire in Alexandria. At Corporate Couture, which I've been running for five years, we specialize in empowering fashion for professionals."
  },
  {
    name: "Dalia Harb",
    location: "Asafra",
    address: "3 Asafra Bahary St., Asafra, Alexandria",
    yearsExperience: 7,
    gender: "Female",
    about: "Welcome to my world of fashion, I'm Dalia Harb from Alexandria. My boutique, Dalia Designs, has been home to innovative teen fashion for over seven years."
  },
  {
    name: "Rasha Qasem",
    location: "Mandara",
    address: "5 El Quds St., Mandara, Alexandria",
    yearsExperience: 9,
    gender: "Female",
    about: "Hi, I'm Rasha Qasem, a specialist in athletic wear from Alexandria. For the past nine years, my brand, ActiveStyle, has been at the forefront of stylish, functional sportswear."
  },
  {
      name: "Mona Safar",
      location: "Stanley",
      address: "20 Corniche Road, Stanley, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "I'm Mona Safar, your expert in handcrafted jewelry and accessories in Alexandria. At Mona's Gems, I've spent over six years perfecting the art of accessory making."
    },
    {
      name: "Sara Kanaan",
      location: "Glim",
      address: "22 Mohamed Mahfouz St., Glim, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "Hello, I'm Sara Kanaan from Alexandria, where I create personalized home decor textiles at HomeCraft. With eight years of experience, I ensure every piece is uniquely beautiful."
    },
    {
      name: "Nora Fakhry",
      location: "Saba Pasha",
      address: "14 Hassan Sabry St., Saba Pasha, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "I'm Nora Fakhry, an expert in luxury evening wear in Alexandria. My label, Nora's Night Out, is renowned for glamorous designs that have dazzled for over a decade."
    },
    {
      name: "Dalal Khalil",
      location: "Victoria",
      address: "12 El Shawarby St., Victoria, Alexandria",
      yearsExperience: 5,
      gender: "Female",
      about: "Welcome! I'm Dalal Khalil, specializing in plus-size fashion at Alexandria's Full Figured Fashion. For five years, I've been creating stylish, comfortable clothing for all sizes."
    },
    {
      name: "Fatima Said",
      location: "Sidi Bishr",
      address: "12 Sidi Bishr Main St., Sidi Bishr, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "I am Fatima Said, running Fatima's Fabrics in Alexandria, where I focus on organic and eco-friendly materials to produce sustainable fashion for ten years."
    },
    {
      name: "Reem Haddad",
      location: "Miami",
      address: "10 El Nasr Road, Miami, Alexandria",
      yearsExperience: 12,
      gender: "Female",
      about: "Hello! I'm Reem Haddad, the face behind Reem's Renaissance, a vintage boutique in Alexandria. I've passionately curated timeless pieces for nearly twelve years."
    },
    {
      name: "Huda Fayad",
      location: "Asafra",
      address: "7 El Gomrok El Qadim St., Asafra, Alexandria",
      yearsExperience: 7,
      gender: "Female",
      about: "I'm Huda Fayad from Alexandria, offering custom-designed scarves and shawls at Huda's Hijabs. With seven years in the market, I ensure elegance and quality in every piece."
    },
    {
      name: "Lama Aziz",
      location: "Mandara",
      address: "12 El Nasr Road, Mandara, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "Welcome! I'm Lama Aziz, a designer of children's costumes in Alexandria. At Little Dreamers, for over six years, I've been bringing joy with my fun, imaginative designs."
    },
    {
      name: "Rima Jubran",
      location: "Al-Ajmi",
      address: "23 Mahmoud Khalil St., Al-Ajmi, Alexandria",
      yearsExperience: 5,
      gender: "Female",
      about: "Hi, I'm Rima Jubran, your guide to the world of boho chic fashion in Alexandria. Boho Boutique, my store, has been the go-to place for laid-back, stylish clothing for five years."
    },
    {
      name: "Maha Zahid",
      location: "Bahary",
      address: "18 Saad Zaghloul St., Bahary, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "I'm Maha Zahid, a tailor specializing in traditional Islamic wear in Alexandria. My shop, Modest Attire, has been serving the community with respect and care for eight years."
    },
    {
      name: "Leila Baz",
      location: "Al-Raml",
      address: "33 Safeya Zaghloul St., Al-Raml, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "Hello, I'm Leila Baz, crafting custom dance and performance costumes in Alexandria. At Stage & Screen Costumes, I've been helping performers shine for over ten years."
    },
    {
      name: "Hanan Ghannam",
      location: "Al-Shatby",
      address: "9 El-Horreya Ave, Al-Shatby, Alexandria",
      yearsExperience: 15,
      gender: "Female",
      about: "I'm Hanan Ghannam, a bespoke tailor in Alexandria, focusing on men's suits at Elite Tailoring. With fifteen years of experience, I craft suits that are as unique as you are."
    },
    {
      name: "Manal Eid",
      location: "El-Ibrahimeya",
      address: "25 Abdel Salam Aref St., El Ibrahimeya, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "Welcome! I'm Manal Eid, specializing in maternity wear in Alexandria. At Motherly Fashion, I've been supporting expecting mothers with stylish, comfortable clothing for six years."
    },
    {
      name: "Noura Salim",
      location: "Sporting",
      address: "12 El Shams Club St., Sporting, Alexandria",
      yearsExperience: 7,
      gender: "Female",
      about: "I'm Noura Salim, running a custom embroidery shop in Alexandria. At Threaded Beauty, I've been creating intricate, personalized designs for textiles for over seven years."
    },
    {
      name: "Dina Nader",
      location: "Sidi Gaber",
      address: "28 Sidi Gaber El Sheikh St., Sidi Gaber, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "Hello, I'm Dina Nader from Alexandria, where I specialize in leather fashion at Leather Luxe. For the past eight years, I've been crafting high-quality, fashionable leather goods."
    },
    {
      name: "Yasmeen Awad",
      location: "Somoha",
      address: "8 Green Tower, Somoha, Alexandria",
      yearsExperience: 5,
      gender: "Female",
      about: "I'm Yasmeen Awad, proud owner of Yasmeen's Young Fashion in Alexandria. Specializing in trendy teen clothing, I've been at the forefront of youth fashion for five years."
    },
    {
      name: "Zaina Younes",
      location: "Roshdy",
      address: "18 Syria St., Roshdy, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "Hi there, I'm Zaina Younes, a designer at Alexandria's Formal Elegance. For over a decade, I've been tailoring formal wear that captures the essence of each special occasion."
    },
    {
      name: "Rabia Shammas",
      location: "Stanley",
      address: "8 Adib Ishaq St., Stanley, Alexandria",
      yearsExperience: 9,
      gender: "Female",
      about: "I'm Rabia Shammas, a couture designer in Alexandria, known for my extravagant bridal creations. My studio, Rabia's Weddings, has been a dream maker for over nine years."
    },
    {
      name: "Soha Dahdouh",
      location: "Glim",
      address: "30 Shady El Magnoun St., Glim, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "Welcome! I'm Soha Dahdouh, specializing in pet fashion in Alexandria. At Pet Parade, I create stylish, comfortable clothing for pets, serving our furry friends for six years."
    },
    {
      name: "Ghada Hatem",
      location: "Saba Pasha",
      address: "21 Shady Mahmoud St., Saba Pasha, Alexandria",
      yearsExperience: 12,
      gender: "Female",
      about: "I'm Ghada Hatem, operating Ghada's Garments in Alexandria. For over twelve years, I've been crafting bespoke uniforms for various industries, ensuring both style and comfort."
    },
    {
      name: "Amal Marouf",
      location: "Victoria",
      address: "3 Fouad St., Victoria, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "Hi, I'm Amal Marouf, a tailor and fabric expert in Alexandria, known for my custom linens and bedding at Cozy Linens. I've dedicated over ten years to perfecting home comfort."
    },
    {
      name: "Samar Rahal",
      location: "Sidi Bishr",
      address: "18 Cleopatra St., Sidi Bishr, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "I am Samar Rahal, specializing in restoration of antique clothing in Alexandria. My studio, Vintage Revival, has been bringing historical garments back to life for eight years."
    },
    {
      name: "Jana Hajj",
      location: "Miami",
      address: "18 Hassan Aflaton St., Miami, Alexandria",
      yearsExperience: 7,
      gender: "Female",
      about: "Welcome! I'm Jana Hajj from Alexandria, where I run Jana's Jumpsuits, specializing in versatile, stylish jumpsuits for all occasions, crafting them with love for seven years."
    },
    {
      name: "Zahra Qureshi",
      location: "Asafra",
      address: "11 Gamal Abdel Nasser Road, Asafra, Alexandria",
      yearsExperience: 5,
      gender: "Female",
      about: "Hi, I'm Zahra Qureshi, a passionate designer of women's athletic wear in Alexandria. At Fit Fashion, I combine style with functionality to empower women in their fitness journeys."
    },
    {
      name: "Amina Hammad",
      location: "Mandara",
      address: "20 Tariq El Geish, Mandara, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "Hello, I'm Amina Hammad, running Amina's Accessories in Alexandria. Specializing in bespoke handbags and accessories, I've been enhancing fashion with personalized touches for six years."
    },
    {
      name: "Safa Othman",
      location: "Al-Ajmi",
      address: "47 El-Horreya Ave, Al-Ajmi, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "I'm Safa Othman, a bespoke tailor in Alexandria, focusing on creating sustainable, eco-friendly fashion at Green Threads, making a difference in fashion for over a decade."
    },
    {
      name: "Heba Nawaz",
      location: "Bahary",
      address: "30 El Sultan Hussein St., Bahary, Alexandria",
      yearsExperience: 12,
      gender: "Female",
      about: "Welcome to Heba's Haute Couture in Alexandria, where I, Heba Nawaz, craft luxury evening wear. With my twelve years of experience, every gown is a masterpiece of craftsmanship."
    },
    {
      name: "Inas Khoury",
      location: "Al-Mansheya",
      address: "36 Salah Salem St., Al-Mansheya, Alexandria",
      yearsExperience: 9,
      gender: "Female",
      about: "Hello, I'm Inas Khoury, your personal tailor for bespoke blazers and jackets in Alexandria. At The Jacket Hub, I've been defining professional wardrobes with custom pieces for nine years."
    },
    {
      name: "Saja Madani",
      location: "Al-Raml",
      address: "8 Shohada St., Al-Raml, Alexandria",
      yearsExperience: 7,
      gender: "Female",
      about: "I'm Saja Madani, a designer of traditional Bedouin attire in Alexandria. My shop, Desert Weaves, offers authentic, handcrafted garments, celebrating our heritage for over seven years."
    },
    {
      name: "Nada Bassam",
      location: "Al-Shatby",
      address: "15 Mustafa Kamel St., Al-Shatby, Alexandria",
      yearsExperience: 5,
      gender: "Female",
      about: "Hi, I'm Nada Bassam, specializing in innovative swimwear in Alexandria. At Aqua Fashion, I design swimwear that combines comfort, style, and performance for all body types."
    },
    {
      name: "Hala Rizk",
      location: "El-Ibrahimeya",
      address: "39 El Nabi Daniel St., El Ibrahimeya, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "Welcome! I'm Hala Rizk, a designer at Rizk Fashion in Alexandria. I focus on teen and young adult fashion, bringing fresh and vibrant styles to the market for six years."
    },
    {
      name: "Dunia Mahfouz",
      location: "Sporting",
      address: "18 Khalil Hamada St., Sporting, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "I am Dunia Mahfouz, owner of Dunia's Draperies in Alexandria. Specializing in window treatments and soft furnishings, I've been transforming homes with beautiful textiles for eight years."
    },
    {
      name: "Hiba Shami",
      location: "Sidi Gaber",
      address: "16 Fawzy Moaz St., Sidi Gaber, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "Hello, I'm Hiba Shami, a custom shoe designer in Alexandria. At Footprint Designs, I create bespoke footwear that combines comfort with cutting-edge style, serving you for ten years."
    },
    {
      name: "Naima Zaidi",
      location: "Somoha",
      address: "15 El Saraya Ave, Somoha, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "I'm Naima Zaidi, a tailor specializing in hand-embroidered textiles in Alexandria. At Naima's Needle, I've been crafting exquisite, detailed pieces for traditional and modern settings."
    },
    {
      name: "Lama Masood",
      location: "Roshdy",
      address: "10 Albert El Awal St., Roshdy, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "Welcome to Lama's Luxuries in Alexandria, where I, Lama Masood, specialize in custom-made luxury bags and accessories, turning fine materials into fashion statements for over six years."
    },
    {
      name: "Rawan Fakih",
      location: "Stanley",
      address: "25 El Nasr St., Stanley, Alexandria",
      yearsExperience: 5,
      gender: "Female",
      about: "Hi, I'm Rawan Fakih, your expert in bohemian fashion in Alexandria. At Boho Bliss, I design clothes that are as free-spirited and unique as each of my clients, for the past five years."
    },
    {
      name: "Dana Jamal",
      location: "Glim",
      address: "9 El Batal Ahmed Abdel Aziz St., Glim, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "I'm Dana Jamal, operating DJ Bridal in Alexandria. Specializing in bespoke bridal wear, I've been part of hundreds of brides' special days, ensuring they look perfect for over a decade."
    },
    {
      name: "Nuha Mubarak",
      location: "Saba Pasha",
      address: "33 Talaat Harb St., Saba Pasha, Alexandria",
      yearsExperience: 9,
      gender: "Female",
      about: "Hello! I'm Nuha Mubarak from Alexandria, specializing in functional yet fashionable maternity wear. At Maternity Moda, I support expecting mothers with stylish choices for nine years."
    },
    {
      name: "Mai Adnan",
      location: "Victoria",
      address: "22 Mostafa Kamel St., Victoria, Alexandria",
      yearsExperience: 7,
      gender: "Female",
      about: "I am Mai Adnan, the creative force behind Mai's Evening Wear in Alexandria. I specialize in luxurious evening dresses that make any night unforgettable, serving fashion for seven years."
    },
    {
      name: "Saba Qadri",
      location: "Sidi Bishr",
      address: "25 King Faisal St., Sidi Bishr, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "Welcome! I'm Saba Qadri, a bespoke tailor for children's formal wear in Alexandria. At Little Gents and Ladies, I create charming outfits for your special occasions, with eight years of experience."
    },
    {
      name: "Iman Farhat",
      location: "Miami",
      address: "12 Gamal Abdel Nasser St., Miami, Alexandria",
      yearsExperience: 5,
      gender: "Female",
      about: "Hi, I'm Iman Farhat, a fashion designer in Alexandria, specializing in creating unique pieces that express my clients' individual styles at Iman's Fashion Lab, where I've been innovating for five years."
    },
    {
      name: "Haneen Hammoud",
      location: "Asafra",
      address: "14 El-Shaheed Abdel Hamid El-Deeb St., Asafra, Alexandria",
      yearsExperience: 12,
      gender: "Female",
      about: "I'm Haneen Hammoud, running Hammoud Haute Couture in Alexandria. For over twelve years, I've been crafting high-fashion pieces that tell a story and captivate audiences."
    },
    {
      name: "Tamara Saleem",
      location: "Mandara",
      address: "10 Khaled Ibn El Walid St., Mandara, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "Welcome to Tamara's Trends in Alexandria, where I, Tamara Saleem, focus on contemporary women's fashion. With a passion for style and innovation, I've been in the fashion industry for six years."
    },
    {
      name: "Alia Maher",
      location: "Al-Ajmi",
      address: "10 Taha Hussein Street, Al-Ajmi, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "Hello, I'm Alia Maher from Alexandria. At Alia's Artisanal Attire, I specialize in handcrafted clothing that blends traditional techniques with contemporary fashion, creating unique pieces for ten years."
    },
    {
      name: "Siham Ganim",
      location: "Bahary",
      address: "45 Al Thawra St., Bahary, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "I'm Siham Ganim, a custom tailor in Alexandria, known for my detailed craftsmanship in creating traditional Egyptian clothing. At Heritage Threads, I preserve culture through fashion for over eight years."
    },
    {
      name: "Lina Khaled",
      location: "Al-Mansheya",
      address: "5 El-Guish Ave, Al-Mansheya, Alexandria",
      yearsExperience: 7,
      gender: "Female",
      about: "Hi, I'm Lina Khaled, the creative mind behind Lina's Lounge Wear in Alexandria. Specializing in comfortable yet stylish lounge wear, I've been bringing comfort to style for seven years."
    },
    {
      name: "Rola Haidar",
      location: "Al-Raml",
      address: "28 El Horreya Rd., Al-Raml, Alexandria",
      yearsExperience: 12,
      gender: "Female",
      about: "Welcome! I'm Rola Haidar, a designer of exotic and luxury furs in Alexandria. At Arctic Elegance, I ensure each piece is ethically sourced and exquisitely crafted, leading the market for twelve years."
    },
    {
      name: "Jamila Ghulam",
      location: "Al-Shatby",
      address: "21 Mahmoud Azmy St., Al-Shatby, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "I am Jamila Ghulam, specializing in ethnic and tribal wear in Alexandria. My boutique, Tribal Threads, offers a deep dive into the rich tapestry of global cultures, crafted with respect for tradition."
    },
    {
      name: "Tala Hadid",
      location: "El-Ibrahimeya",
      address: "10 Salah Salem Road, El Ibrahimeya, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "Hello! I'm Tala Hadid from Alexandria, your expert in custom active wear. At Active Fit, I design clothes that move with you and elevate your performance, serving athletes for six years."
    },
    {
      name: "Sabrina Essa",
      location: "Sporting",
      address: "22 El-Nasr Road, Sporting, Alexandria",
      yearsExperience: 5,
      gender: "Female",
      about: "I'm Sabrina Essa, a tailor in Alexandria specializing in upcycling and transforming old garments into new fashion statements at ReVogue, where I've been promoting sustainable fashion for five years."
    },
    {
      name: "Randa Alami",
      location: "Sidi Gaber",
      address: "45 Alexander the Great St., Sidi Gaber, Alexandria",
      yearsExperience: 7,
      gender: "Female",
      about: "Welcome to Randa's Rarities in Alexandria, where I, Randa Alami, craft unique, one-of-a-kind fashion pieces. My designs are for those who dare to be different, leading trends for over seven years."
    },
    {
      name: "Abeer Hakim",
      location: "Somoha",
      address: "1 Al Ahly Club St., Somoha, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "Hi, I'm Abeer Hakim, operating Abeer's Accessories in Alexandria. I specialize in creating custom jewelry that complements my clients' personalities and styles, serving you with creativity for ten years."
    },
    {
      name: "Duaa Sabbagh",
      location: "Roshdy",
      address: "23 Abdel Salam Aref St., Roshdy, Alexandria",
      yearsExperience: 8,
      gender: "Female",
      about: "I'm Duaa Sabbagh, your go-to for eco-friendly fashion in Alexandria. At EarthWear, I use sustainable materials to create clothes that not only look good but are good for the planet, innovating for eight years."
    },
    {
      name: "Shireen Shadid",
      location: "Stanley",
      address: "3 Shady Mahmoud St., Stanley, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "Hello, I'm Shireen Shadid, a bridal fashion designer in Alexandria. At Bridal Bliss, I create dream wedding dresses that reflect each bride's personality and style, with a focus on luxury and detail."
    },
    {
      name: "Wafa Samara",
      location: "Glim",
      address: "11 El Gaish Road, Glim, Alexandria",
      yearsExperience: 9,
      gender: "Female",
      about: "I am Wafa Samara, running Samara's Sportswear in Alexandria. Specializing in high-performance athletic wear, I empower athletes to achieve their best with gear that matches their drive."
    },
    {
      name: "Ilham Fahmy",
      location: "Saba Pasha",
      address: "2 Salah Salem St., Saba Pasha, Alexandria",
      yearsExperience: 12,
      gender: "Female",
      about: "Welcome! I'm Ilham Fahmy, a designer of artisanal handbags in Alexandria. At Handbag Haven, I craft each piece with care, combining functionality with aesthetic appeal, serving you for twelve years."
    },
    {
      name: "Thuraya Azar",
      location: "Victoria",
      address: "10 Ahmed Shawky St., Victoria, Alexandria",
      yearsExperience: 11,
      gender: "Female",
      about: "Hi, I'm Thuraya Azar, specializing in avant-garde fashion in Alexandria. At The Edge, I push boundaries with designs that challenge conventions and captivate imaginations, leading fashion forward."
    },
    {
      name: "Najwa Zaki",
      location: "Sidi Bishr",
      address: "30 Bahary St., Sidi Bishr, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "I'm Najwa Zaki, a tailor and costume designer in Alexandria. At Costume Creations, I bring characters to life with custom designs for theater and film, combining historical accuracy with artistic vision."
    },
    {
      name: "Maysoon Qattan",
      location: "Miami",
      address: "25 El Horreya Ave, Miami, Alexandria",
      yearsExperience: 10,
      gender: "Female",
      about: "Hello! I'm Maysoon Qattan from Alexandria, where I run Qattan Quilts. Specializing in bespoke quilts and soft home furnishings, I've been creating comfort and style for homes for ten years."
    },
    {
      name: "Kinza Murtaza",
      location: "Asafra",
      address: "22 El Sultan Hussein St., Asafra, Alexandria",
      yearsExperience: 6,
      gender: "Female",
      about: "I am Kinza Murtaza, owner of Kinza Krafts in Alexandria. My focus is on crafting personalized gifts and home decor items, bringing joy and uniqueness to every piece for over six years."
    },
    {
      name: "Sumaya Nazari",
      location: "Mandara",
      address: "18 Mustafa Kamel St., Mandara, Alexandria",
      yearsExperience: 7,
      gender: "Female",
      about: "Welcome to Sumaya's Studio in Alexandria, where I, Sumaya Nazari, specialize in exotic leather goods. From handbags to belts, I ensure luxury and quality in every stitch, leading the market for seven years."
    }
  ];

// Predefined values for reviews, services, and team members
const predefinedReviewers = [
  "Laila Fares", "Noor Saleh", "Amira Nassar", "Yasmin Karam", "Farah Sabbagh", "Sana Barakat", "Hana Taha", "Salma Hamdan", "Rania Dagher", "Aisha Daher", 
  "Malak Ayoub", "Zara Alwan", "Nadia Mousa", "Mariam Yassin", "Layla Mazhar", "Samira Masri", "Dalia Harb", "Rasha Qasem", "Mona Safar", "Sara Kanaan", 
  "Nora Fakhry", "Dalal Khalil", "Fatima Said", "Reem Haddad", "Huda Fayad", "Lama Aziz", "Rima Jubran", "Maha Zahid", "Leila Baz", "Hanan Ghannam", 
  "Manal Eid", "Noura Salim", "Dina Nader", "Yasmeen Awad", "Zaina Younes", "Rabia Shammas", "Soha Dahdouh", "Ghada Hatem", "Amal Marouf", "Samar Rahal", 
  "Jana Hajj", "Zahra Qureshi", "Amina Hammad", "Safa Othman", "Heba Nawaz", "Inas Khoury", "Saja Madani", "Nada Bassam", "Hala Rizk", "Dunia Mahfouz"
];

const reviewTexts = [
  "Her ability to design from scratch and bring my vision to life is truly unparalleled. Each piece she creates is a masterpiece. I look forward to wearing her creations with pride and anticipation of the next collaboration.",
  "The attention to detail in every stitch is evident. She has a real talent for turning simple ideas into elegant garments. Her professionalism and creativity have made every experience memorable.",
  "Absolutely thrilled with the custom gown she crafted for my special event! The fit was perfect, and the design stood out in a sea of sameness. Her work is flawless and her service impeccable.",
  "She perfectly captured the essence of what I wanted in my wedding dress. The craftsmanship is top-notch, and the details were simply breathtaking. I felt like a true queen on my big day!",
  "From the initial consultation to the final fitting, her passion for fashion and commitment to client satisfaction were evident. I have never felt more confident in an outfit.",
  "Her designs are innovative and refreshing. She manages to balance modern trends with timeless elegance, making every piece unique and exciting.",
  "I can always count on her for apparel that's not only beautifully designed but also comfortable and durable. Her work is worth every penny!",
  "Every piece she designs tells a story. You can tell she pours her heart and soul into her work. The quality and creativity are unmatched.",
  "She went above and beyond to accommodate my requests, and the final product exceeded my expectations. The fit and comfort are unparalleled.",
  "Her unique approach to tailoring has revolutionized the way I think about fashion. Each garment is tailored to perfection, fitting like a second skin.",
  "Incredible craftsmanship! She has an eye for detail that ensures every garment is of the highest quality. I'm always impressed by her work.",
  "Her creativity and attention to detail have made her my go-to tailor. She never fails to impress with her exquisite designs and flawless execution.",
  "The bespoke suit she made for me was a hit at the event. The attention to detail and fit were exactly what I hoped for. Truly a skilled artisan.",
  "She has a fantastic ability to understand and execute on my style preferences. Each outfit she makes elevates my wardrobe to a new level.",
  "I am consistently impressed by her ability to turn fabric into a work of art. She's not just a tailor; she's a true artist with fabric.",
  "Her work ethic and commitment to quality are visible in every garment. It's always a pleasure seeing my vision come to life with such elegance.",
  "Remarkable talent! She transformed a vintage fabric into a modern masterpiece. Her ability to merge old with new is incredible.",
  "She always meets deadlines, and the quality of her work never suffers. It's rare to find such reliability and skill in one person.",
  "Her designs always catch the eye. She knows how to make each client feel exclusive with garments that are perfectly fitted and uniquely theirs.",
  "The complexity of the design I requested was high, but she handled it with ease. The outcome was stunning, and the garment was the talk of the night.",
  "She is exceptionally professional and talented. Every session with her is a lesson in fashion, and her finished products are always exquisite.",
  "Her ability to match the materials to the design concept is flawless. The textures and colors always work perfectly together, creating a visually stunning piece.",
  "I appreciate her eco-friendly approach to fashion. Not only is her work beautiful, but it's also sustainable, which makes me feel good about wearing her designs.",
  "Her bespoke dresses have a permanent place in my wardrobe. They are timeless and crafted with such skill that they always look contemporary.",
  "Every time I wear one of her pieces, I receive compliments. She has a gift for creating eye-catching designs that are both stylish and refined.",
  "The personal attention she gives to each client's needs is what sets her apart. She truly listens and delivers beyond expectations.",
  "Her work on my bridal dress was phenomenal. The intricate details and perfect fit made my special day even more unforgettable.",
  "She is a master of reinvention, transforming any concept into a fashionable reality that resonates with contemporary trends.",
  "Her fashion sense is impeccable. She's always ahead of trends, and her ability to foresee what will look good is unparalleled.",
  "The precision in her measurements and cuts makes every garment a perfect fit. It's clear she has honed her craft to perfection.",
  "She delivered exactly what I envisioned, and then some. The craftsmanship was superb, and the design was both unique and timeless.",
  "I never have to worry about fittings when I go to her. She gets it right the first time, every time, making the whole process seamless and enjoyable.",
  "Her fusion of traditional and modern techniques results in pieces that are both innovative and classic. It's the best of both worlds.",
  "Her commitment to using high-quality materials shows in the longevity of her garments. They not only look good but last long too.",
  "The gown she designed for me was a showstopper. Her use of color and fabric created an absolutely stunning effect that was both elegant and dramatic.",
  "Her meticulous attention to detail ensures that every piece is flawless from every angle. It's always a delight to see her latest creations.",
  "The personalization she offers makes every garment feel exclusive and special. It's not just clothing; it's a piece of art tailored just for me.",
  "She is not only talented but also incredibly patient and accommodating, making sure every detail is to your liking.",
  "Her expertise in tailoring is evident in how she handles complex designs and intricate patterns with ease and precision.",
  "Her ability to mix textures and patterns in ways that seem effortless is nothing short of genius. Every outfit she makes is a masterpiece.",
  "I am amazed by her ability to capture my personality in her designs. Wearing her creations makes me feel authentic and vibrant.",
  "She understands body types exceptionally well, making designs that are not only beautiful but also flattering and comfortable.",
  "Each visit is a pleasure as she brings professionalism and a warm personality, making every step of the design process enjoyable.",
  "Her innovative designs have transformed my wardrobe. She adds a touch of magic to everything she touches, making ordinary extraordinary.",
  "The luxury and quality of her work are apparent the moment you see and feel the garments. She's truly at the top of her craft.",
  "Her ability to restore and modernize my vintage pieces is incredible. She breathes new life into old fabrics with her creativity and skill.",
  "Each garment she creates is a testament to her passion for fashion and dedication to her clients. It's always a pleasure to work with her.",
  "She's transformed my vision into reality more beautifully than I could have imagined. Her work is truly bespoke and personal.",
  "Her garments reflect a deep understanding of fashion history blended with a modern perspective, resulting in truly unique pieces.",
  "The speed and efficiency with which she works are matched only by the beauty and precision of the final product. She's a true professional."
];

const serviceDetails = [
  {
    title: "Design from scratch",
    description: "Crafting your vision from the ground up – our design from scratch service brings your ideas to life with creativity and precision.",
    price: 250
  },
  {
    title: "Design implementation",
    description: "Expertly executing your designs with precision and passion.",
    price: 200
  },
  {
    title: "Hand made",
    description: "Artisanal elegance tailored just for you – where every stitch tells a story.",
    price: 300
  },
  {
    title: "Redesign",
    description: "Elevating tradition with a modern twist – our redesign service breathes new life into timeless garments.",
    price: 200
  }
];

const teamMemberNames = [
  "Laila", "Noor", "Amira", "Farah", "Yasmin", "Sana", "Hana", "Salma",
  "Rania", "Aisha", "Malak", "Zara", "Nadia"
];

const teamMemberRoles = [
  "Hand made specialist", "Redesign specialist", "Sewing Specialist", "Design specialist"
];

// Predefined categories
const categories = [
  { name: "Classic" },
  { name: "Soiree" },
  { name: "Casual" },
  { name: "Formal" }
];

function getRandomWorkingHours() {
  const workingHours = {};
  const hours = ["12:00 PM - 10:00 PM", "Closed"];

  ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].forEach(day => {
    workingHours[day] = hours[Math.floor(Math.random() * hours.length)];
  });

  return workingHours;
}


async function seedDatabase() {
  // Seed categories
  const seededCategories = await Promise.all(
    categories.map(category =>
      prisma.category.create({ data: { name: category.name } })
    )
  );

  // Seed predefined designers and link entities
  for (let i = 0; i < predefinedDesigners.length; i++) {
    const designer = await prisma.designer.create({
      data: {
        id: uuidv4(),
        name: predefinedDesigners[i].name,
        location: predefinedDesigners[i].location,
        yearsExperience: predefinedDesigners[i].yearsExperience,
        gender: "Female",
        address: predefinedDesigners[i].address,
        about: predefinedDesigners[i].about,
        workingDays: 6, // 6 days as Friday is closed
        workingHours: getRandomWorkingHours(),
        ordersFinished: 0, // Add ordersFinished property
        rating: 0, // Add rating property
        avatarUrl: avatarUrl[i % avatarUrl.length], // Use predefined avatar URL
        categories: {
          connect: seededCategories.map(cat => ({ id: cat.id }))
        }
      }
    });

    // Seed services for each designer
    for (const service of serviceDetails) {
      await prisma.service.create({
        data: {
          id: uuidv4(),
          designerId: designer.id,
          title: service.title,
          description: service.description,
          price: service.price
        }
      });
    }

    // Seed team members for each designer
    await prisma.teamMember.create({
      data: {
        id: uuidv4(),
        designerId: designer.id,
        name: teamMemberNames[i % teamMemberNames.length],
        role: teamMemberRoles[i % teamMemberRoles.length],
        avatarUrl: avatarUrl[(i + 1) % avatarUrl.length] // Use predefined avatar URL
      }
    });

    // Seed reviews for each designer
    await prisma.review.create({
      data: {
        id: uuidv4(),
        designerId: designer.id,
        customerName: predefinedDesigners[i].name,
        rating: 5,
        comment: reviewTexts[i % reviewTexts.length],
        postedOn: new Date()
      }
    });
  }
}

seedDatabase()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });