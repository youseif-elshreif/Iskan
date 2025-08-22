import { Listing } from "@/types";

export const mockListings: Listing[] = [
  {
    id: "1",
    title: "شقة مفروشة - المعادي",
    address: "المعادي الجديدة",
    area: "المعادي",
    university: "الجامعة الأمريكية",
    nearestUniversity: "الجامعة الأمريكية",
    rooms: "2",
    price: 8000,
    description:
      "شقة مفروشة حديثة مع إطلالة رائعة. موقع ممتاز قريب من الجامعة الأمريكية ووسائل المواصلات. الشقة مجهزة بالكامل ومناسبة للطلاب والموظفين.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2070&q=80",
    size: "85 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1616047006789-b7af710a8ef5?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2070&q=80",
    ],
    amenities: [
      "تكييف مركزي",
      "إنترنت مجاني",
      "حراسة 24 ساعة",
      "موقف سيارات",
      "مفروشة بالكامل",
      "مطبخ مجهز",
      "غسالة ملابس",
      "تلفزيون",
    ],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "2",
    title: "ستوديو مفروش - مدينة نصر",
    address: "شارع الطيران",
    area: "مدينة نصر",
    university: "جامعة عين شمس",
    nearestUniversity: "جامعة عين شمس",
    rooms: "1",
    price: 5000,
    description:
      "ستوديو مفروش بالكامل بالقرب من جامعة عين شمس. مناسب للطلاب والباحثين.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
    size: "45 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["واي فاي", "مطبخ صغير", "أثاث كامل"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "3",
    title: "شقة فاخرة - الزمالك",
    address: "شارع 26 يوليو",
    area: "الزمالك",
    university: "جامعة القاهرة",
    nearestUniversity: "جامعة القاهرة",
    rooms: "3",
    price: 15000,
    description:
      "شقة فاخرة بفرش مودرن وإطلالة على النيل. موقع مميز في الزمالك.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99f1f1b0?auto=format&fit=crop&w=2080&q=80",
    size: "120 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99f1f1b0?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["بلكونة", "أسانسير", "موقف سيارات", "حراسة 24 ساعة"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!2d31.2!3d30.06",
  },
  {
    id: "4",
    title: "غرفة مفروشة - الهرم",
    address: "شارع الهرم الرئيسي",
    area: "الهرم",
    university: "جامعة القاهرة",
    nearestUniversity: "جامعة القاهرة",
    rooms: "1",
    price: 3000,
    description: "غرفة مفروشة بسيطة بأسعار مناسبة وقريبة من المواصلات العامة.",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2080&q=80",
    size: "30 متر مربع",
    images: [],
    amenities: ["أثاث أساسي", "واي فاي"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!2d31.15!3d30.02",
  },
  {
    id: "5",
    title: "شقة عائلية - مصر الجديدة",
    address: "روكسي",
    area: "مصر الجديدة",
    university: "جامعة عين شمس",
    nearestUniversity: "جامعة عين شمس",
    rooms: "4",
    price: 12000,
    description: "شقة واسعة تناسب العائلات. قريبة من الخدمات والأسواق.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2080&q=80",
    size: "80 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["بلكونة", "مطبخ مجهز", "غسالة", "تكييف"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "6",
    title: "ستوديو صغير - وسط البلد",
    address: "شارع طلعت حرب",
    area: "وسط البلد",
    university: "جامعة القاهرة",
    nearestUniversity: "جامعة القاهرة",
    rooms: "1",
    price: 4000,
    description: "ستوديو صغير مجهز بالكامل في قلب القاهرة.",
    image:
      "https://images.unsplash.com/photo-1600585154154-8dc1d0d09f54?auto=format&fit=crop&w=2080&q=80",
    size: "35 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["واي فاي", "أثاث", "مطبخ صغير"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "7",
    title: "شقة جديدة - الشيخ زايد",
    address: "كمبوند بيفرلي هيلز",
    area: "الشيخ زايد",
    university: "جامعة النيل",
    nearestUniversity: "جامعة النيل",
    rooms: "3",
    price: 11000,
    description: "شقة حديثة في كمبوند فاخر بخدمات متكاملة.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced3c4b7?auto=format&fit=crop&w=2080&q=80",
    size: "120 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["أمن 24 ساعة", "جراج", "نادي صحي"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "8",
    title: "غرفة مشاركة - فيصل",
    address: "شارع الملك فيصل",
    area: "فيصل",
    university: "جامعة القاهرة",
    nearestUniversity: "جامعة القاهرة",
    rooms: "1",
    price: 2000,
    description: "غرفة مشاركة للطلاب بالقرب من المواصلات.",
    image:
      "https://images.unsplash.com/photo-1613977257544-9b0d1b3f2b6d?auto=format&fit=crop&w=2080&q=80",
    size: "25 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["أثاث أساسي", "مطبخ مشترك"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "9",
    title: "شقة فاخرة - التجمع الخامس",
    address: "شارع التسعين",
    area: "التجمع الخامس",
    university: "الجامعة الأمريكية",
    nearestUniversity: "الجامعة الأمريكية",
    rooms: "3",
    price: 18000,
    description: "شقة فاخرة بإطلالة بانورامية وخدمات متكاملة.",
    image:
      "https://images.unsplash.com/photo-1600607687659-95a0d8a3dd9f?auto=format&fit=crop&w=2080&q=80",
    size: "170 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["تكييف", "موقف سيارات", "حراسة"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "10",
    title: "شقة متوسطة - شبرا",
    address: "خلف مترو روض الفرج",
    area: "شبرا",
    university: "جامعة عين شمس",
    nearestUniversity: "جامعة عين شمس",
    rooms: "2",
    price: 6000,
    description: "شقة متوسطة السعر في شبرا. مناسبة للعائلات الصغيرة.",
    image:
      "https://images.unsplash.com/photo-1600585154363-67e1c3a02ad0?auto=format&fit=crop&w=2080&q=80",
    size: "80 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["واي فاي", "غسالة", "مطبخ مجهز"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "11",
    title: "فيلا دوبلكس - أكتوبر",
    address: "الحصري",
    area: "6 أكتوبر",
    university: "جامعة 6 أكتوبر",
    nearestUniversity: "جامعة 6 أكتوبر",
    rooms: "5",
    price: 25000,
    description: "فيلا دوبلكس فاخرة بحمام سباحة خاص وحديقة.",
    image:
      "https://images.unsplash.com/photo-1600047509254-b5ebd846c1e2?auto=format&fit=crop&w=2080&q=80",
    size: "120 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["حمام سباحة", "حديقة", "موقف سيارات", "حراسة"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "12",
    title: "شقة اقتصادية - المرج",
    address: "محطة المرج",
    area: "المرج",
    university: "جامعة عين شمس",
    nearestUniversity: "جامعة عين شمس",
    rooms: "2",
    price: 2500,
    description: "شقة اقتصادية مناسبة للطلاب والموظفين.",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced3c4b7?auto=format&fit=crop&w=2080&q=80",
    size: "65 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["واي فاي", "أثاث"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
  {
    id: "13",
    title: "بنتهاوس - التجمع",
    address: "الحي الرابع",
    area: "التجمع الخامس",
    university: "الجامعة الأمريكية",
    nearestUniversity: "الجامعة الأمريكية",
    rooms: "4",
    price: 22000,
    description: "بنتهاوس فاخر بروف خاص وإطلالة مميزة.",
    image:
      "https://images.unsplash.com/photo-1600585153963-9f14a5c8a7e2?auto=format&fit=crop&w=2080&q=80",
    size: "85 متر مربع",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2080&q=80",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=2080&q=80",
    ],
    amenities: ["روف", "جراج", "تكييف مركزي"],
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d6015.650923517636!2d32.29502296139594!3d30.60417143592533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDM2JzE3LjgiTiAzMsKwMTcnMzcuNyJF!5e0!3m2!1sar!2seg!4v1755790397719!5m2!1sar!2seg",
  },
];

export function getListingById(id: string): Listing | undefined {
  return mockListings.find((listing) => listing.id === id);
}
