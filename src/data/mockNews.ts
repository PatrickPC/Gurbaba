
export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  location?: string;
}

export const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "NOC increases petrol and diesel prices",
    excerpt: "The revised prices come into effect from 12 midnight on Sunday.",
    content: `Nepal Oil Corporation (NOC) has raised the prices of petroleum products, citing a hike in the new corporation.

The revised prices will see petrol increase by Rs 2 per litre, diesel by Rs 1.50 per litre, and kerosene by Rs 1.50 per litre. The new rates will be effective from 12 midnight on Sunday.

According to NOC, the price adjustment has been made following the fluctuation in international petroleum prices and exchange rates. The corporation stated that the decision was inevitable due to rising global crude oil prices.

The new prices are: Petrol Rs 157 per litre (up from Rs 155), Diesel Rs 142 per litre (up from Rs 140.50), and Kerosene Rs 142 per litre (up from Rs 140.50).

This latest price hike is expected to have a direct impact on transportation costs and subsequently on the prices of essential commodities across the country.`,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    author: "Post Report",
    publishedAt: "June 15, 2025",
    updatedAt: "June 15, 2025 23:01",
    category: "Money",
    tags: ["NOC", "petroleum", "price hike", "economy"],
    location: "Kathmandu"
  },
  {
    id: "2", 
    title: "Surya Nepal Premier Golf Championship tees off tomorrow",
    excerpt: "It is the grand finale of the 2024-25 season of the Surya Nepal Golf Tour, where 38 professional golfers will compete for a whopping prize pool of Rs 1.6 million.",
    content: `The Surya Nepal Premier Golf Championship, the most prestigious golf tournament in Nepal, is set to begin tomorrow at the Royal Nepal Golf Club.

This year's tournament features 38 professional golfers competing for the largest prize pool in Nepalese golf history - Rs 1.6 million. The championship marks the grand finale of the 2024-25 Surya Nepal Golf Tour season.

The three-day tournament will see both local and international players showcase their skills on one of Nepal's most challenging golf courses. The winner will take home Rs 400,000 along with the coveted championship trophy.

"This tournament represents the pinnacle of golf in Nepal," said tournament director Raj Kumar Shrestha. "We're excited to see the level of competition this year."

The event will be broadcast live and is expected to draw significant crowds over the weekend.`,
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    author: "Post Report", 
    publishedAt: "June 15, 2025",
    category: "Sports",
    tags: ["golf", "championship", "sports", "Surya Nepal"],
    location: "Kathmandu"
  },
  {
    id: "3",
    title: "Parsa attorney files fraud and organised crime case against Rabi Lamichhane",
    excerpt: "RSP chair among 20 individuals charged over alleged embezzlement of cooperative funds totalling over Rs1.15 billion.",
    content: `The Parsa District Attorney's Office has filed fraud and organised crime charges against Rastriya Swatantra Party (RSP) Chairman Rabi Lamichhane and 19 other individuals.

The charges relate to the alleged embezzlement of cooperative funds totalling over Rs 1.15 billion. The case was filed following a comprehensive investigation by the Central Investigation Bureau (CIB).

According to the charges, Lamichhane and the co-accused are alleged to have systematically embezzled funds from multiple cooperatives between 2018 and 2022. The scheme reportedly involved creating fake loan documents and diverting funds for personal use.

"This is a significant case involving organized financial crime," stated District Attorney Ramesh Kafle. "The evidence clearly shows a pattern of systematic fraud."

Lamichhane has denied all charges, calling them "politically motivated" and stating he will fight the case in court. The RSP has called the charges an attempt to defame their party ahead of upcoming elections.

The case is expected to have significant political ramifications as Lamichhane is one of Nepal's most prominent political figures.`,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800",
    author: "Shankar Acharya",
    publishedAt: "June 15, 2025",
    category: "Politics", 
    tags: ["Rabi Lamichhane", "fraud", "cooperative", "RSP", "politics"],
    location: "Parsa"
  },
  {
    id: "4",
    title: "Helicopter crash in northern India kills 7 on Hindu pilgrimage route", 
    excerpt: "The incident occurred during bad weather conditions in the mountainous region.",
    content: `A helicopter carrying Hindu pilgrims crashed in northern India, killing all seven people on board during bad weather conditions in the mountainous region.

The helicopter was returning from Kedarnath, one of Hinduism's holiest shrines, when it went down in heavy fog and rain. The victims included five pilgrims and two crew members.

Rescue operations were hampered by poor weather conditions and difficult terrain. Emergency teams reached the crash site after several hours of trekking through treacherous mountain paths.

"The weather turned very bad very quickly," said rescue coordinator Captain Vijay Singh. "Visibility was near zero when the helicopter went down."

This tragedy highlights the risks associated with pilgrimage travel in the Himalayas, where weather conditions can change rapidly and pose significant challenges for aviation.

The state government has announced compensation for the families of the victims and ordered a thorough investigation into the cause of the crash.`,
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800",
    author: "Post Report",
    publishedAt: "June 14, 2025", 
    category: "National",
    tags: ["helicopter", "crash", "pilgrimage", "India", "tragedy"],
    location: "India"
  },
  {
    id: "5",
    title: "Dubious claims and institutional overreach",
    excerpt: "Politicians are increasingly controlling and hollowing out state institutions to protect themselves.",
    content: `Nepal's democratic institutions are facing an unprecedented crisis as politicians increasingly use their positions to control and hollow out state institutions for personal protection.

Recent events have shown a disturbing pattern where political leaders manipulate institutional processes to shield themselves from accountability. This trend threatens the very foundation of Nepal's democratic system.

The erosion of institutional independence has become particularly evident in the justice system, where political interference in investigations and prosecutions has become commonplace. Anti-corruption bodies, election commissions, and other oversight institutions are similarly compromised.

"We're witnessing the systematic dismantling of institutional checks and balances," warns political analyst Dr. Shyam Shrestha. "This poses a fundamental threat to democracy."

The international community has expressed growing concern about Nepal's institutional decline. Recent reports from transparency organizations highlight the urgent need for reforms to restore institutional independence.

Citizens must remain vigilant and demand accountability from their leaders to preserve democratic governance for future generations.`,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac81?w=800",
    author: "Ajaya Bhadra Khanal", 
    publishedAt: "June 15, 2025",
    category: "Opinion",
    tags: ["politics", "institutions", "democracy", "accountability", "opinion"],
    location: "Kathmandu"
  }
];
