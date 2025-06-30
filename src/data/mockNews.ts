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
    title: " सुदूरपश्चिमक बजेट ३३ अर्व ४७ करोड ६० लाख ",
    excerpt: "सुदूरपश्चिमक बजेट ३३ अर्व ४७ करोड ६० लाख",
    content: `सुदूरपश्चिमक बजेट ३३ अर्व ४७ करोड ६० लाख

असार 3 गते 
सुदूरपश्चिम प्रदेश सरकार अइना आर्थिक वर्ष २०८२÷०८३ क लाग ३३ अर्ब ४७ करोड ६० लाख ४८ हजार रुपैयाँक बजेट सार्वजनिक करल बा । जुन मध्ये चालुओहर १० अर्ब २० करोड ८१ लाख ८२ हजार अर्थात् ३० दशमलव ४९ प्रतिशत ओ  पुँजीगतओहर १९ अर्ब ८३ करोड २ लाख ६ हजार अर्थात् ५९।२५प्रतिशत विनियोजित बा । सुदूरपश्चिम प्रदेश सभाक छौठौ अधिवेशनक एघारौ कचह्ररीम आर्थिक मामिला तथा योजना मन्त्री बहादुर सिंह थापा उ बजेट प्रस्तुत करल रलह ।
//  `,
    image: "https://www.radiogurbaba.org.np/uploads/news/images/416622506sss.jpeg",
    author: "प्रेम चौधरी",
    publishedAt: "२०८२ असार ३ मंगलबार",
    updatedAt: "२०८२ असार ३ मंगलबार 23:01",
    category: "Money",
    tags: ["Budget", "", "price hike", "economy"],
    location: "Sudurpaschim Pradesh"
  },
  {
    id: "2",
    title: " लुम्बिनी प्रदेश ल्यानल ३८ अर्ब ९१ करोडक बजेट ",
    excerpt: "लुम्बिनी प्रदेश सरकार आगामी आर्थिक वर्ष २०८२। ०८३ क लाग ३८ अर्ब ९१ करोड रुपैयाँक बजेट सार्वजनिक करल बा ।",
    content: `लुम्बिनी प्रदेश सरकार आगामी आर्थिक वर्ष २०८२। ०८३ क लाग ३८ अर्ब ९१ करोड रुपैयाँक बजेट सार्वजनिक करल बा । जुनमध्ये चालुतर्फ १२ अर्ब १ करोड ४७ लाख ८६ हजार अर्थात् ३० दशमलव ८८ प्रतिशत व पुँजीगत तर्फ २३ अर्ब ४७ करोड १४ लाख ६५ हजार अर्थात् ६० दशमलव ३२ प्रतिशत विनियोजित बा । 

असार 3 गते 
लुम्बिनी प्रदेश सरकार आगामी आर्थिक वर्ष २०८२। ०८३ क लाग ३८ अर्ब ९१ करोड रुपैयाँक बजेट सार्वजनिक करल बा । जुनमध्ये चालुतर्फ १२ अर्ब १ करोड ४७ लाख ८६ हजार अर्थात् ३० दशमलव ८८ प्रतिशत व पुँजीगत तर्फ २३ अर्ब ४७ करोड १४ लाख ६५ हजार अर्थात् ६० दशमलव ३२ प्रतिशत विनियोजित बा ।

अटवारक लुम्बिनी प्रदेशसभाक छैठौं अधिवेशनक तेह्रौं कचह्ररीम आर्थिक मामिला तथा योजना मन्त्री धनेन्द्र कार्की बजेट प्रस्तुत कर्लक हुईट । वित्तीय हस्तान्तरणक लाग ३ अर्ब ४२ करोड ३७ लाख ४९ हजार अर्थात् ८ दशमलव ८० प्रतिशत अनुमान कैगिल बा । लुम्बिनी प्रदेश सरकार समृद्ध लुम्बिनीःखुसी नागरिकक दिर्घकालिन आकांक्षा हासिल कर्ना संकल्प  करल बा ।

जुन अन्र्तगत कृषिम उत्पादन व उत्पादकत्व बृद्धि, गुणस्तरीय शिक्षा व स्वाथ्य सेवाम पहुँच, उद्यमशिलता विकास, दिगो पूर्वाधार विकास, सामाजिक न्याय सहितक समावेशी विकास व उत्पादनशील रोजगारी सृजना कर्टी आर्थिक असमानता व गरिबी न्यूनिकरणम सहयोग पुग्नामेह्रख बजेट प्राथमिकताम ढैगिल बा । उच्च व दिगो आर्थिक वृद्धि हाँसिल कर गरिबी न्यूनिकरण तथा आर्थिक असानता घटैना मेह्रख बजेट तथा कार्यक्रमहन केन्द्रित कैगिलक  बा ।
//  `,
    image: "https://www.radiogurbaba.org.np/uploads/news/images/2036104745495267912_1026958109585053_5845782711749256097_n.jpeg",
    author: "ओम प्रकाश गुप्ता",
    publishedAt: "२०८२ असार ३ मंगलबार",
    updatedAt: "२२०८२ असार ३ मंगलबार 23:01",
    category: "Money",
    tags: ["Budget", "", "price hike", "economy"],
    location: "Lumbini Pradesh"
  },
  {
    id: "3",
    title: " मुक्त कमैयाक ११ बुंदे योजना तथा माग, कार्यन्वयन कर्ना अध्यक्ष त्रिपाठी व उपाध्यक्ष अधिकारीक प्रतिवद्धता । ",
    excerpt: "मुक्त कमैयाक ११ बुंदे योजना तथा माग, कार्यन्वयन कर्ना अध्यक्ष त्रिपाठी व उपाध्यक्ष अधिकारीक प्रतिवद्धता ।",
    content: `मुक्त कमैयाक ११ बुंदे योजना तथा माग, कार्यन्वयन कर्ना अध्यक्ष त्रिपाठी व उपाध्यक्ष अधिकारीक प्रतिवद्धता ।
मुक्त कमैया समाज पालिका समिति बढैयाताल ११ बुँदे योजना तथा माग सहितक पत्र गाउँपालिकाक अध्यक्ष हिमालय त्रिपाठी व उपाध्यक्ष लक्ष्मि अधिकारीहन  संयुक्त रुपम बुझैल बा । नेपालम कृषिम आधारित बंधुवा श्रमक अन्त्य परियोजना अन्र्तत मुक्त कमैया व श्रमीकहुकनक सवालम पालिका स्तरिय अन्र्तक्रिया कार्यक्रमक विच योजना तथा माग पत्र बुझैलक हो । २०५७ साल साउन २ गते सरकार कमैया मुक्तिक घोषण करल । तर आभिनफे बढैयाताल गाउँपालिकाम आंसिकरुपम कुछ कमैयाक भुमि सम्वन्धि समस्या, श्रम, ज्याल, शिक्षा लगाएतक मेह्रमेही समस्या आभिन कायम बा । नेपाल सरकारसे घोषण कर्लक विषयहन स्थानिय सरकार योजना बनाक कार्यन्वयन करपर्ना व मुक्त कमैया तथा श्रमीकहुकनक समस्या सम्बोधन कराएक लाग मुक्त कमैया समाज ११ बुदे योजान तथा माग पत्र बुझैलक समाजक कोषाध्यक्ष किसनी थारु जनैल बाटी । मुक्त कमैया समाज, मुक्त कमैया परिवारका बालबलिकाहुकन उच्च शिक्षा अध्ययनक लाग छात्रबृत्ति सहयोगक लाग पहिलो माग पेश करल बा । ओसेहक मुक्त कमैयाक युवाहुकन प्राविधि शिक्षा अध्ययन सहयोग, मुक्त कमैयाहुकन कृषि, व्यावसायीम सहयोग करपर्ना, आधारभुत तहसम्म अनिवार्य तथा निशुल्क शिक्षा घोषणा करपर्ना, सुरक्षित अवास निर्माण, मुक्त कमैया दिवस व श्रमिक दिवसक लाग बेजट विनियोजन करपर्ना, मुक्त कमैयाक जग्गाम सिचाईक लाग बबई सिचाई आयोजना अन्र्तगत सिचाई सुविधाक लाग नहर मर्मत व्यवस्था, अनौपचारिक क्षेत्रम कार्यरत श्रमिकहुकनक स्वास्थ्य तथा दुर्घटना विमा, अनौपचारिक क्षेत्रमा काम कर्ना श्रमिकहुकनक श्रम अनुगमन व पालिका स्तरसे श्रम डेस्क सञ्चालन, अनौपचारिक क्षेत्रम काम कर्ना श्रमिकक लाग निति तथा कार्यविधि बनपर्ना व मुक्त कमैया युवाहुकन नेतृत्व विकास तथा उद्घोषण तालिम लगाएतक योजना तथा माग पेश कर्टी आगामि वर्षक निति तथा कार्यक्रमम समाबेश कैख कार्यन्वय कर माग कैगिल बा ।



योजना तथा माग पत्र बुझैना आघ कैगिलक अन्तरक्रिया कार्याक्रमम सहभागि मुक्त कमैया समाज पालिका स्तरिय समितिक सदस्यहुक्र अनौपचारिक क्षेत्रक श्रमिकहुक्र काम करबेर सुरक्षा समाग्री, ज्याला दररेटक अनुगमन, मुक्त कमैयाक बालबालिकाहुकन छात्रबृति, जग्गा लगाएतक समस्या भोग पर्लक बटोईल रलह ।



अन्तरक्रिया कार्यक्रम उठलक समस्या व योजना तथा माग पत्र बुझ्टी गाउँपालिक अध्यक्ष हिमालय त्रिपाठी मुक्त कमैयाक समस्या प्रति गाउँपालिका गम्भीर रलक बटोईटी आगामी आर्थिक वर्षक निति तथा कार्यक्रमम समाबेस कैख कार्यन्वय कर्ना प्रतिवद्धता जनैल बाट । उहाँ मुक्त कमैयाक छाइछावन छात्रबृत्ति, प्राविधिक शिक्षा, श्रमिकक हक अधिकारक लाग गाउँपालिका तत्पर रलक उल्लेख कर्टी माग सम्बोधन कर्नामेह्रख काम कर्ना आस्वासन डेल बाट ।



ओसेहख मुक्त कमैयाक जग्गा निपैलक समस्याफे समाधान कर्ना बटोईटी ढुक्क रह अर्जि कर्ल । ओसेहख गाउँपालिका उपाध्यक्ष लक्ष्मि अधिकारी मुक्त कमैया समाज पेश कर्लक योजना तथा माग मुक्त कमैयाक केलह निहोख सक्कुनक साझा सवाल रलक बाटम जोर डेली । मुक्त कमैया समाज पालिका स्तरिय समितिसे  उठैलक शिक्षा, कृषि, श्रमीक हक लगएतक सवालहन पालिका २०७९।०८० सेजो  सबृद्ध बढैयाताल सुखि जनता बनैना लक्ष्य लेख आघ बह्रर्लक बटोईल रलही । तर गाउँपालिक सिमित स्रोत साधनक बाबजुत सक्कु काम एक संग सम्भव निरलक बटोईटी आव गाउँपालिका मानविय विकासम ध्यान डेलक बटोईली । उहाँ मुक्त कमैया समाज पालिका स्तरिया समिति पेश कर्लक योजना व माग गाउँपालिक बजेट, अवस्था व व्यवस्था अनुसार कार्यन्वय कर्ना प्रतिवद्धता जनैली । मुक्त कमैया समाज पालिका स्तरिय समितिक कोषाध्यक्ष किसनी थारुक अध्यक्षताम हुईलक  कार्यक्रम गाउपालिका अध्यक्ष हिमाय त्रिपाठी, उपाध्यक्ष लक्ष्मि अधिकारी, प्रमुख प्रशासकिय अधिकृत नारायण राज त्रिपाठी, वडा अध्यक्ष, कार्यपालिका सदस्य, समाजक सदस्यहुकनक सहभागिता रहल रह । समाजक सदस्य छङ्गा थारु सञ्चालन कर्लक कार्यक्रमक स्वागत सरिता थारु करल रलहीन, कलसे कार्यक्रमक उदेश्य बारे माया थारु प्रकाश पारल रलही । मुक्त कमैया समाजक आयोजना, एक्सनएड नेपालक सहयोग, कमैया महिला जागरण समाज नेपाल बर्दियाक सहकार्य व बढैयाताल गाँपालिकाक समन्वयम कार्यक्रम हुईलक कमैया महिला जागरण समाज नेपालक समाज परिचालक उषा चौधरी जानकारी डेल बाटी ।   
//  `,
    image: "https://www.radiogurbaba.org.np/uploads/news/images/1121843635gyapan-patra--.jpeg",
    author: "हुम कुमार चौधरी ",
    publishedAt: "२०८२ असार ३ मंगलबार",
    updatedAt: "२०८२ असार ३ मंगलबार 23:01",
    category: "Politics",
    tags: ["Budget", "", "price hike", "economy"],
    location: "Sudurpaschim Pradesh"
  },



  {
    id: "4",
    title: " शैक्षिक गुणस्तर अभिवृद्धिक ",
    excerpt: "शैक्षिक गुणस्तर अभिवृद्धिक लाग, अईना वर्षक निति तथा कार्याक्रम प्राथमिक्ता डेना नगर प्रमुख खड्का कहाई",
    content: `शैक्षिक गुणस्तर अभिवृद्धिक लाग, अईना वर्षक निति तथा कार्याक्रम प्राथमिक्ता डेना नगर प्रमुख खड्का कहाई 

असार १ गते 
शैक्षिक गुणस्तर अभिवृद्धिक लाग बाँसगढी नगरपालिका हाल कुल बजेटक ३० प्रतिशत शिक्षा क्षेत्रम विनियोजन कर्टि अईलक बाँसगढी नगरप्रमुख खड्क बहादुर खड्का बटोईल बाट । उहाँ शिक्षाक क्षेत्रम आभिन धेर काम कर बाँकी रलक ओ बजेटक अभावक कारण कुछ चुनौती रलसेफे अईना वर्षक नीति तथा कार्यक्रमम शिक्षा क्षेत्रहन प्राथमिकताम ढैख बजेटम पुनः हेरफेर कर्ना स्पष्ट पर्ल । नगरभित्रक सामुदायिक तथा संस्थागत विद्यालयक प्रधानाध्यापकहुकनसँगक शैक्षिक अन्तरक्रिया कार्यक्रमम उहाँ असिन धारणा ढरल हुईट । कार्यक्रमम नगर उपप्रमुख इन्दिरा चौधरीक अध्यक्षता, शिक्षा विकास तथा समन्वय इकाइ बर्दियाक आयोजना तथा बाँसगढी नगरपालिका शिक्षा शाखा व राधाकृष्ण थारु जनसेवा केन्द्रक समन्वयम आयोजना कैगिलक अन्तरक्रिया कार्यक्रमम ४० ठो सामुदायिक व १६ ठो संस्थागत कैख कुल ५६ विद्यालयक प्रधानाध्यापकहुकन्क सहभागिता रहल रलह ।

कार्यक्रमम शिक्षा विकास तथा समन्वय इकाइ बर्दियाक प्रमुख सूर्यबहादुर खत्री जिल्लाक शैक्षिक विवरण प्रस्तुत करल रलह । उहाँक अनुसार बर्दिया जिल्लाम प्रारम्भिक बालविकाससे कक्षा १२ सम्म १ लाख १९ हजार ८ सय ८६ जन विद्यार्थी रहल बाट । जेहिम बाँसगढी नगरपालिकाम केह्ल १७ हजार ३७१ विद्यार्थी रहल बाट । शिक्षा शाखा प्रमुख मनप्रसाद रेग्मी बाँसगढी नगरपालिकाहन साक्षरता क्षेत्र घोषणा कैगिलसेफे हालक साक्षरता दर ७९.३ प्रतिशत केह्ल रलक जानकारी डेल । उहाँ कक्षा १ से ५ सम्म खुद भर्ना दर ९७ प्रतिशत व कक्षा ९ से १२ सम्मक खुद भर्ना दर ५८.१ प्रतिशत रलक तथ्यांक प्रस्तुत कर्ल ।
बाँसगढीम हाल १७६ जन शिक्षक दरबन्दी, १२६ जन राहत अनुदान शिक्षक तथा ८ जन प्राविधिक धारक शिक्षक कार्यरत रलक फे उहाँ जानकारी डेल । ओसहेक, राधाकृष्ण थारु जनसेवा केन्द्र बर्दियाक कार्यक्रम संयोजक जीतराम चौधरी बाँसगढी नगरपालिकाम संस्थासे करर्लक शैक्षिक सहयोग विवरण प्रस्तुत कर्ल ।

उहाँक अनुसार ९ठो विद्यालयक २७ कक्षाकोठा बालमैत्री बनैलक, ८ विद्यालयक २० कक्षाकोठाम कार्पेटिङ, ३ विद्यालयक ११ कक्षाकोठाम बालपेन्ट, ५ विद्यालयक बालविकास कक्षाम खेलौना सामग्री वितरण, २ विद्यालयम श्रव्यदृश्य सामग्री जडान, ५ विद्यालयम खानेपानीक व्यवस्था तथा ९ विद्यालयम मर्मत संभार कैख सुरक्षित सिकाइ वातावरण निर्माण कैगिल बा । कार्यक्रमम सहभागी विद्यालयक प्रधानाध्यापकहुक्र विद्यालयम देखपरर्लक समस्या  सुधारक असल अभ्यास ओ उपायक बारेफे आपन धारणा ढरल रलह । 
//  `,
    image: "src/images/img1.jpeg",
    author: "बिन्दु चौधरी",
    publishedAt: "२०८२ असार १ आइतबार",
    updatedAt: "२०८२ असार १ आइतबार 23:01",
    category: "Education",
    tags: ["NOC", "petroleum", "price hike", "economy"],
    location: "Bansghadi"
  },





  {
    id: "5", 
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
    id: "6",
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
    id: "7",
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
    id: "8",
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
  },
  // New categories
  {
    id: "9",
    title: "AI breakthrough promises to revolutionize medical diagnosis",
    excerpt: "New machine learning algorithms can detect diseases with 95% accuracy, faster than human doctors.",
    content: `Researchers at Nepal Institute of Technology have developed an AI system that can diagnose various diseases with unprecedented accuracy and speed.`,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800",
    author: "Tech Reporter",
    publishedAt: "June 15, 2025",
    category: "Science & Technology",
    tags: ["AI", "medical", "technology", "healthcare"],
    location: "Kathmandu"
  },
  {
    id: "10",
    title: "Gamers line up for Nintendo Switch 2 launch with global shortfall expected",
    excerpt: "OpenAI, Google and xAI battle for superstar AI talent, shelling out millions",
    content: `Gaming enthusiasts across Nepal are queuing up for the highly anticipated Nintendo Switch 2 console launch.`,
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800",
    author: "Gaming Correspondent",
    publishedAt: "June 15, 2025",
    category: "Science & Technology",
    tags: ["gaming", "nintendo", "technology"],
    location: "Kathmandu"
  },
  {
    id: "11",
    title: "Cambodia turns to World Court over Thailand border disputes",
    excerpt: "Israel and Iran strike at each other as Trump says conflict can be easily ended",
    content: `Cambodia has filed a complaint with the International Court of Justice regarding ongoing border disputes with Thailand.`,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    author: "International Correspondent",
    publishedAt: "June 15, 2025",
    category: "World",
    tags: ["Cambodia", "Thailand", "border", "international"],
    location: "Cambodia"
  },
  {
    id: "12",
    title: "Three generations devoted to care of Central Zoo animals",
    excerpt: "Are Nepali independent singers struggling for a platform?",
    content: `A heartwarming story of three generations of a family who have dedicated their lives to caring for animals at the Central Zoo.`,
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=800",
    author: "Feature Writer",
    publishedAt: "June 15, 2025",
    category: "Features",
    tags: ["zoo", "animals", "family", "dedication"],
    location: "Kathmandu"
  },
  {
    id: "13",
    title: "Building sustainable cities allows governments to invest in rural areas",
    excerpt: "Communist unity is a good wish, but there's no solid basis yet",
    content: `An in-depth interview with urban planning expert Dr. Rajesh Khadka about sustainable city development in Nepal.`,
    image: "src/images/fictional-planet-with-colourful-night-sky-stars-nebula.jpg",
    author: "Interview Team",
    publishedAt: "June 15, 2025",
    category: "Interviews",
    tags: ["sustainability", "urban planning", "interview"],
    location: "Kathmandu"
  },
  {
    id: "14",
    title: "Mental health care for LGBTQI+ community",
    excerpt: "Uniting against divisive politics",
    content: `A column discussing the importance of mental health support for the LGBTQI+ community in Nepal.`,
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    author: "Dr. Priya Sharma",
    publishedAt: "June 15, 2025",
    category: "Columns",
    tags: ["mental health", "LGBTQI+", "community", "healthcare"],
    location: "Kathmandu"
  },
  {
    id: "15",
    title: "Slippery slope",
    excerpt: "Strengthen the base",
    content: `Editorial discussing the current political climate and the need for stronger democratic institutions.`,
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800",
    author: "Editorial Board",
    publishedAt: "June 15, 2025",
    category: "Editorial",
    tags: ["politics", "democracy", "editorial"],
    location: "Kathmandu"
  }
];
