import work1 from "@/assets/works/work-1.jpg";
import work2 from "@/assets/works/work-2.jpg";
import work3 from "@/assets/works/work-3.jpg";
import work4 from "@/assets/works/work-4.jpg";
import work5 from "@/assets/works/work-5.jpg";
import work6 from "@/assets/works/work-6.jpg";
import work7 from "@/assets/works/work-7.jpg";
import work8 from "@/assets/works/work-8.jpg";
import work9 from "@/assets/works/work-9.jpg";
import work10 from "@/assets/works/work-10.jpg.asset.json";
import work11 from "@/assets/works/work-11.jpg.asset.json";
import work12 from "@/assets/works/work-12.jpg.asset.json";
import work13 from "@/assets/works/work-13.jpg.asset.json";
import work14 from "@/assets/works/work-14.jpg.asset.json";
import work15 from "@/assets/works/work-15.jpg.asset.json";
import work16 from "@/assets/works/work-16.jpg.asset.json";
import work17 from "@/assets/works/work-17.jpg.asset.json";
import work18 from "@/assets/works/work-18.jpg.asset.json";
import work19 from "@/assets/works/work-19.jpg.asset.json";

type WorkCategory = "Двери" | "Окна" | "Витражи и остекление" | "Входные группы";

const raw: { src: string; alt: string; category: WorkCategory }[] = [
  // Двери
  { src: work10.url, alt: "Алюминиевая входная дверь антрацит на облицованном фасаде", category: "Двери" },
  { src: work11.url, alt: "Белая двустворчатая входная группа с фрамугой из ПВХ", category: "Входные группы" },
  { src: work14.url, alt: "Две алюминиевые межкомнатные двери антрацит со стеклом", category: "Двери" },
  { src: work17.url, alt: "Межкомнатная белая дверь ПВХ с матовым стеклом", category: "Двери" },
  { src: work18.url, alt: "Двустворчатая входная дверь под дуб в срубе", category: "Двери" },
  { src: work1, alt: "Входная дверь из ПВХ под дерево", category: "Двери" },
  { src: work2, alt: "Двустворчатая дверь с тонированным стеклом", category: "Двери" },
  { src: work5, alt: "Французские двери с раскладкой, белый ПВХ", category: "Двери" },
  // Входные группы
  { src: work12.url, alt: "Панорамная входная группа под золотой дуб, поворотно-откидные створки", category: "Входные группы" },
  { src: work16.url, alt: "Входная группа с боковыми витражами под золотой дуб", category: "Входные группы" },
  { src: work8, alt: "Входная группа под дуб золотой", category: "Входные группы" },
  { src: work9, alt: "Витражная входная группа в террасу", category: "Входные группы" },
  // Окна
  { src: work15.url, alt: "ПВХ-окно под тёмное дерево с москитной сеткой", category: "Окна" },
  { src: work19.url, alt: "Треугольное и прямоугольные окна в доме A-frame, антрацит", category: "Окна" },
  { src: work3, alt: "Окно ПВХ под тёмное дерево", category: "Окна" },
  { src: work4, alt: "Панорамные окна с раскладкой", category: "Окна" },
  { src: work7, alt: "Большие окна с раскладкой Шпрос", category: "Окна" },
  // Витражи и панорамное остекление
  { src: work13.url, alt: "Панорамное остекление второго этажа алюминиевым профилем", category: "Витражи и остекление" },
  { src: work6, alt: "Витражная группа на цокольном этаже", category: "Витражи и остекление" },
];

export const works = raw;
export const worksByCategory: { category: WorkCategory; items: typeof raw }[] = [
  { category: "Двери", items: raw.filter((w) => w.category === "Двери") },
  { category: "Входные группы", items: raw.filter((w) => w.category === "Входные группы") },
  { category: "Окна", items: raw.filter((w) => w.category === "Окна") },
  { category: "Витражи и остекление", items: raw.filter((w) => w.category === "Витражи и остекление") },
];
