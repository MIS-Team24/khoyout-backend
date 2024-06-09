import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

const predefinedPortfolios = [
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/JZJPRPSCU",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/JEXZWCFCS",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/DXBVEDXXG",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/HFFPNLECZ",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/ZUCFGFYLK",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/GSRUSYLRX",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/XSQGIOWTF",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/AUEPZZFWN",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/MDOHFALAX",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/NHIAXNSJH",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/DCCLXUUZR",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/MCOSXYYJI",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/ZNZIIQRZS",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/QBZJZKXLI",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/UTRQMDKMW",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/QVTICWWBS",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/WYFYAAUFC",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/YMCIAJIMV",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/ABCZZDODL",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/LHVHNLAHE",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/SBFBZCSRM",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/MEKNVXKAH",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/PVFSMRJFX",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/WWDZAOKPU",
  "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/EzzOps/HVULXQBAJ",
];

  const avatarUrl = [
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/DXFKKGJSO",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/SQMBVZTUB",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/NASYOKFVQ",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/EMXKQKIUF",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/NQJCZNDBB",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/GPZDNNCHO",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/EMSWPHKIK",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/LCRUKPMVW",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/QIRNUASDF",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/YIPKKDKEK",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/YYPFYAEEZ",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/LTRZHLYYZ",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/LCBSTBBIU",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/ZBMMPUCOM",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/XUXOITWZD",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/RSHJCHNHJ",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/GBONNJLVN",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/XXCAQLKMT",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/CDGJYXCHV",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/JVEOFMOEA",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/UBEJNMEEG",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/VGVICJHPB",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/BPSKULKNK",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/HKMJGDQXL",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/YSBQDCCIC",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/XWXWRVUTK",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/VIHZSJRDL",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/JGFGYKOXE",
    "https://uwwosfcacyovhelyelwl.supabase.co/storage/v1/object/public/khoyout/FMGQOONNF",
  ];

const predefinedDesigners = [
  {
    name: "Laila Fares",
    location: "Al Agami",
    address: "12 Al Nasr Road, Al-Ajmi, Alexandria",
    latitude: 31.1054,
    longitude: 29.7841,
    yearsExperience: 5,
    gender: "Female",
    about: "Hello! I'm Laila Fares from Alexandria, where I run my boutique, Laila's Designs. With over five years of experience in bespoke tailoring, I specialize in modernizing traditional wear."
  },
  {
    name: "Noor Saleh",
    location: "Bahary",
    address: "2 Al-Gaish Road, Bahary, Alexandria",
    latitude: 31.2135,
    longitude: 29.8851,
    yearsExperience: 3,
    gender: "Female",
    about: "Hi, I'm Noor Saleh, an Alexandria-based tailor and fashion designer at Noor's Couture. I've been creating elegant evening and bridal wear for three years, turning dreams into reality."
  },
  {
    name: "Amira Nassar",
    location: "Al-Mansheya",
    address: "11 Nabi Daniel St., Al-Mansheya, Alexandria",
    latitude: 31.2001,
    longitude: 29.9015,
    yearsExperience: 12,
    gender: "Female",
    about: "Welcome! I'm Amira Nassar, the proud owner of Nassar Fashion House in Alexandria. My passion lies in crafting bespoke men's suits, with a keen eye for detail and style."
  },
  {
    name: "Yasmin Karam",
    location: "Al-Raml",
    address: "14 Ahmed Orabi Square, Al-Raml, Alexandria",
    latitude: 31.2009,
    longitude: 29.9103,
    yearsExperience: 4,
    gender: "Female",
    about: "I'm Yasmin Karam from Alexandria, specializing in children's apparel. With over four years in the industry, my boutique, Little Stars, offers custom, creative outfits for kids."
  },
  {
    name: "Farah Sabbagh",
    location: "Al-Shatby",
    address: "7 Qasr El-Aini St., Al-Shatby, Alexandria",
    latitude: 31.2020,
    longitude: 29.9245,
    yearsExperience: 6,
    gender: "Female",
    about: "Hello! I'm Farah Sabbagh, a fashion designer in Alexandria. For the past six years, I've been focusing on women's fashion, running my shop, Farah Fashions, where elegance meets modernity."
  },
  {
    name: "Sana Barakat",
    location: "El-Ibrahimeya",
    address: "84 Omar Lotfy St., El Ibrahimeya, Alexandria",
    latitude: 31.2104,
    longitude: 29.9355,
    yearsExperience: 5,
    gender: "Female",
    about: "I am Sana Barakat, operating out of Alexandria. My studio, Sana's Workshop, specializes in custom leather goods, providing unique and durable items for five years."
  },
  {
    name: "Hana Taha",
    location: "Sporting",
    address: "7 Hassan Rasim St., Sporting, Alexandria",
    latitude: 31.2090,
    longitude: 29.9474,
    yearsExperience: 7,
    gender: "Female",
    about: "Hi, I'm Hana Taha from Alexandria, owner of Taha Tailors. I've dedicated seven years to crafting bespoke bridal gowns that capture each bride's unique spirit."
  },
  {
    name: "Salma Hamdan",
    location: "Sidi Gaber",
    address: "3 Abd El Qader Ragab St., Sidi Gaber, Alexandria",
    latitude: 31.2140,
    longitude: 29.9573,
    yearsExperience: 8,
    gender: "Female",
    about: "Welcome! I'm Salma Hamdan, your expert in traditional Egyptian attire with a modern twist. Operating in Alexandria for eight years, my boutique, Salma's Creations, cherishes cultural heritage."
  },
  {
    name: "Rania Dagher",
    location: "Somoha",
    address: "12 Somoha Club St., Somoha, Alexandria",
    latitude: 31.2163,
    longitude: 29.9647,
    yearsExperience: 10,
    gender: "Female",
    about: "I'm Rania Dagher from Alexandria, specializing in upcycled and sustainable fashion. For ten years, my brand, EcoWear, has been making fashion both beautiful and environmentally conscious."
  },
  {
    name: "Aisha Daher",
    location: "Roshdy",
    address: "7 Mostafa Fahmy St., Roshdy, Alexandria",
    latitude: 31.2166,
    longitude: 29.9723,
    yearsExperience: 10,
    gender: "Female",
    about: "Hello, I'm Aisha Daher of Alexandria. My shop, Aisha's Atelier, offers bespoke tailoring and image consulting to help you look your best, with over a decade of fashion expertise."
  },
  {
    name: "Malak Ayoub",
    location: "Stanley",
    address: "3 Stanley Bridge St., Stanley, Alexandria",
    latitude: 31.2150,
    longitude: 29.9784,
    yearsExperience: 12,
    gender: "Female",
    about: "I'm Malak Ayoub, a bespoke tailor in Alexandria, focusing on men's formal wear. With 12 years of experience, I ensure every piece from Gentlemen's Choice is impeccably crafted."
  },
  {
    name: "Zara Alwan",
    location: "Glim",
    address: "15 Kamel El Shennawi St., Glim, Alexandria",
    latitude: 31.2170,
    longitude: 29.9815,
    yearsExperience: 15,
    gender: "Female",
    about: "Hi, I'm Zara Alwan, owner of Zara's Couture in Alexandria. I specialize in high-end women's apparel, bringing over fifteen years of international experience to my designs."
  },
  {
    name: "Nadia Mousa",
    location: "Saba Pasha",
    address: "7 Victor Emanuel St., Saba Pasha, Alexandria",
    latitude: 31.2190,
    longitude: 29.9852,
    yearsExperience: 6,
    gender: "Female",
    about: "Welcome! I'm Nadia Mousa, your go-to for vintage and retro fashion in Alexandria. Vintage Vogue, my boutique, has been a hub for classic styles revisited for six years."
  },
  {
    name: "Mariam Yassin",
    location: "Victoria",
    address: "18 Horreya Ave, Victoria, Alexandria",
    latitude: 31.2187,
    longitude: 29.9874,
    yearsExperience: 8,
    gender: "Female",
    about: "I am Mariam Yassin, proudly running Mariam's Bridal in Alexandria. With eight years in the industry, I craft memorable wedding dresses that embody sophistication and grace."
  },
  {
    name: "Layla Mazhar",
    location: "Sidi Bishr",
    address: "5 El Gaish Road, Sidi Bishr, Alexandria",
    latitude: 31.2182,
    longitude: 29.9921,
    yearsExperience: 10,
    gender: "Female",
    about: "Hello! I'm Layla Mazhar from Alexandria, specializing in custom knitted and crocheted garments at Layla Knits. With a decade of experience, I blend tradition with contemporary fashion."
  },
  {
    name: "Samira Masri",
    location: "Miami",
    address: "2 Khaled Ibn El Walid St., Miami, Alexandria",
    latitude: 31.2195,
    longitude: 29.9970,
    yearsExperience: 5,
    gender: "Female",
    about: "I'm Samira Masri, a designer of chic business attire in Alexandria. At Corporate Couture, which I've been running for five years, we specialize in empowering fashion for professionals."
  },
  {
    name: "Dalia Harb",
    location: "Asafra",
    address: "3 Asafra Bahary St., Asafra, Alexandria",
    latitude: 31.2201,
    longitude: 30.0002,
    yearsExperience: 7,
    gender: "Female",
    about: "Welcome to my world of fashion, I'm Dalia Harb from Alexandria. My boutique, Dalia Designs, has been home to innovative teen fashion for over seven years."
  },
  {
    name: "Rasha Qasem",
    location: "Mandara",
    address: "5 El Quds St., Mandara, Alexandria",
    latitude: 31.2214,
    longitude: 30.0043,
    yearsExperience: 9,
    gender: "Female",
    about: "Hi, I'm Rasha Qasem, a specialist in athletic wear from Alexandria. For the past nine years, my brand, ActiveStyle, has been at the forefront of stylish, functional sportswear."
  },
  {
    name: "Mona Safar",
    location: "Stanley",
    address: "20 Corniche Road, Stanley, Alexandria",
    latitude: 31.2152,
    longitude: 29.9801,
    yearsExperience: 6,
    gender: "Female",
    about: "I'm Mona Safar, your expert in handcrafted jewelry and accessories in Alexandria. At Mona's Gems, I've spent over six years perfecting the art of accessory making."
  },
  {
    name: "Sara Kanaan",
    location: "Glim",
    address: "22 Mohamed Mahfouz St., Glim, Alexandria",
    latitude: 31.2181,
    longitude: 29.9824,
    yearsExperience: 8,
    gender: "Female",
    about: "Hello, I'm Sara Kanaan from Alexandria, where I create personalized home decor textiles at HomeCraft. With eight years of experience, I ensure every piece is uniquely beautiful."
  },
  {
    name: "Nora Fakhry",
    location: "Saba Pasha",
    address: "14 Hassan Sabry St., Saba Pasha, Alexandria",
    latitude: 31.2192,
    longitude: 29.9853,
    yearsExperience: 10,
    gender: "Female",
    about: "I'm Nora Fakhry, an expert in luxury evening wear in Alexandria. My label, Nora's Night Out, is renowned for glamorous designs that have dazzled for over a decade."
  },
  {
    name: "Dalal Khalil",
    location: "Victoria",
    address: "12 El Shawarby St., Victoria, Alexandria",
    latitude: 31.2184,
    longitude: 29.9876,
    yearsExperience: 5,
    gender: "Female",
    about: "Welcome! I'm Dalal Khalil, specializing in plus-size fashion at Alexandria's Full Figured Fashion. For five years, I've been creating stylish, comfortable clothing for all sizes."
  },
  {
    name: "Fatima Said",
    location: "Sidi Bishr",
    address: "12 Sidi Bishr Main St., Sidi Bishr, Alexandria",
    latitude: 31.2183,
    longitude: 29.9922,
    yearsExperience: 10,
    gender: "Female",
    about: "I am Fatima Said, running Fatima's Fabrics in Alexandria, where I focus on organic and eco-friendly materials to produce sustainable fashion for ten years."
  },
  {
    name: "Reem Haddad",
    location: "Miami",
    address: "10 El Nasr Road, Miami, Alexandria",
    latitude: 31.2200,
    longitude: 29.9965,
    yearsExperience: 12,
    gender: "Female",
    about: "Hello! I'm Reem Haddad, the face behind Reem's Renaissance, a vintage boutique in Alexandria. I've passionately curated timeless pieces for nearly twelve years."
  },
  {
    name: "Huda Fayad",
    location: "Asafra",
    address: "7 El Gomrok El Qadim St., Asafra, Alexandria",
    latitude: 31.2202,
    longitude: 30.0003,
    yearsExperience: 7,
    gender: "Female",
    about: "I'm Huda Fayad from Alexandria, offering custom-designed scarves and shawls at Huda's Hijabs. With seven years in the market, I ensure elegance and quality in every piece."
  },
  {
    name: "Lama Aziz",
    location: "Mandara",
    address: "12 El Nasr Road, Mandara, Alexandria",
    latitude: 31.2215,
    longitude: 30.0044,
    yearsExperience: 6,
    gender: "Female",
    about: "Welcome! I'm Lama Aziz, a designer of children's costumes in Alexandria. At Little Dreamers, for over six years, I've been bringing joy with my fun, imaginative designs."
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

interface WorkingHour {
  start: {
    display: string;
    compare: string;
  };
  end: {
    display: string;
    compare: string;
  };
}

type WorkingHours = { [key: string]: WorkingHour };

function getFormattedWorkingHours(): WorkingHours {
  return {
    "0": { start: { display: "6:00 AM", compare: "06:00" }, end: { display: "1:00 AM", compare: "01:00" } },
    "1": { start: { display: "6:00 AM", compare: "06:00" }, end: { display: "1:00 AM", compare: "01:00" } },
    "2": { start: { display: "6:00 AM", compare: "06:00" }, end: { display: "1:00 AM", compare: "01:00" } },
    "3": { start: { display: "6:00 AM", compare: "06:00" }, end: { display: "1:00 AM", compare: "01:00" } },
    "4": { start: { display: "6:00 AM", compare: "06:00" }, end: { display: "1:00 AM", compare: "01:00" } },
    "5": { start: { display: "6:00 AM", compare: "06:00" }, end: { display: "1:00 AM", compare: "01:00" } },
    "6": { start: { display: "Closed", compare: "" }, end: { display: "Closed", compare: "" } },
  };
}

function getFormattedWorkingDays(): { day: string, hours: string }[] {
  const workingHours = getFormattedWorkingHours();
  return Object.entries(workingHours).map(([day, hours]) => {
    const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][parseInt(day)];
    const displayHours = hours.start.display === "Closed" ? "Closed" : `${hours.start.display} - ${hours.end.display}`;
    return { day: dayName, hours: displayHours };
  });
}


function getRandomItems<T>(items: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return items.sort(() => 0.5 - Math.random()).slice(0, count);
}

async function main() {
  const createdCategories = await Promise.all(categories.map(category => 
    prisma.category.create({ data: category })
  ));

  for (let i = 0; i < predefinedDesigners.length; i++) {
    const designer = predefinedDesigners[i];
    const baseAccount = await prisma.baseAccount.create({
      data: {
        firstName: designer.name.split(" ")[0],
        lastName: designer.name.split(" ")[1],
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.number(),
        gender: "Female",
        createdAt: new Date(),
        updatedAt: new Date(),
        avatarUrl: avatarUrl[i % avatarUrl.length]
      }
    });

    const user = await prisma.users.create({
      data: {
        baseAccountId: baseAccount.id
      }
    });
    await prisma.designerProfile.create({
      data: {
        baseAccountId: baseAccount.id,
        address: designer.address,
        latitude: designer.latitude,
        avatarUrl: avatarUrl[i % avatarUrl.length],
        location: designer.location,
        longtitude: designer.longitude,
        yearsExperience: designer.yearsExperience,
        about: designer.about,
        workingDays: JSON.stringify(getFormattedWorkingDays()), // Update to new format
        ordersFinished: Math.floor(Math.random() * 15),
        reviews: {
          create: getRandomItems(predefinedReviewers, 2, 4).map((reviewer, index) => ({
            rating: Math.floor(Math.random() * 5) + 1,
            comment: reviewTexts[index] || "Default review comment.",
            postedOn: new Date(),
            name: reviewer,
            avatarUrl: avatarUrl[(i + index) % avatarUrl.length],
            customerId: user.baseAccountId // Ensure customerId is set correctly
          }))
        },
        services: {
          create: getRandomItems(serviceDetails, 2, 4)
        },
        teamMembers: {
          create: getRandomItems(teamMemberNames, 2, 4).map((name, index) => ({
            name: name,
            role: teamMemberRoles[index % teamMemberRoles.length],
            avatarUrl: avatarUrl[(i + index) % avatarUrl.length]
          }))
        },
        categories: {
          create: getRandomItems(createdCategories, 2, 4).map(category => ({
            Category: { connect: { id: category.id } }
          }))
        },
        portfolios: {
            create: predefinedPortfolios.slice(0, Math.floor(Math.random() * 5) + 6).map(url => ({
            url: url
          }))
        }
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });