(function(){
"use strict";
const A = window.Astronomy;
const SKY = window.SKY;
const D2R = Math.PI/180, R2D = 180/Math.PI;

// ================================================================ ثوابت
// كل مدن الموسوعة (597 مدينة في 22 دولة، من src/lib/wx_cities.js): [المفتاح، الاسم، العرض، الطول، المنطقة الزمنية، الدولة]
const CITIES = [
  ["cairo","القاهرة",30.06,31.25,"Africa/Cairo","EG"],["giza","الجيزة",30.01,31.21,"Africa/Cairo","EG"],["alexandria","الإسكندرية",31.2,29.92,"Africa/Cairo","EG"],["new-cairo","القاهرة الجديدة",30.03,31.47,"Africa/Cairo","EG"],
  ["6th-of-october","مدينة 6 أكتوبر",29.82,31.05,"Africa/Cairo","EG"],["helwan","حلوان",29.84,31.3,"Africa/Cairo","EG"],["shubra-al-khaymah","شبرا الخيمة",30.13,31.25,"Africa/Cairo","EG"],["qalyub","قليوب",30.18,31.21,"Africa/Cairo","EG"],
  ["banha","بنها",30.46,31.18,"Africa/Cairo","EG"],["al-qanatir-al-khayriyah","القناطر الخيرية",30.19,31.14,"Africa/Cairo","EG"],["port-said","بورسعيد",31.27,32.3,"Africa/Cairo","EG"],["suez","السويس",29.97,32.53,"Africa/Cairo","EG"],
  ["ismailia","الإسماعيلية",30.6,32.27,"Africa/Cairo","EG"],["mansoura","المنصورة",31.04,31.38,"Africa/Cairo","EG"],["mit-ghamr","ميت غمر",30.72,31.26,"Africa/Cairo","EG"],["al-mahallah-al-kubra","المحلة الكبرى",30.97,31.17,"Africa/Cairo","EG"],
  ["tanta","طنطا",30.79,31,"Africa/Cairo","EG"],["zagazig","الزقازيق",30.59,31.5,"Africa/Cairo","EG"],["10th-of-ramadan","العاشر من رمضان",30.3,31.75,"Africa/Cairo","EG"],["bilbeis","بلبيس",30.42,31.56,"Africa/Cairo","EG"],
  ["shibin-al-kawm","شبين الكوم",30.55,31.01,"Africa/Cairo","EG"],["damietta","دمياط",31.42,31.81,"Africa/Cairo","EG"],["faraskur","فارسكور",31.33,31.72,"Africa/Cairo","EG"],["kafr-ash-shaykh","كفر الشيخ",31.11,30.94,"Africa/Cairo","EG"],
  ["damanhur","دمنهور",31.03,30.47,"Africa/Cairo","EG"],["kafr-ad-dawwar","كفر الدوار",31.13,30.13,"Africa/Cairo","EG"],["rosetta","رشيد",31.4,30.42,"Africa/Cairo","EG"],["marsa-matruh","مرسى مطروح",31.35,27.24,"Africa/Cairo","EG"],
  ["siwah","سيوة",29.2,25.52,"Africa/Cairo","EG"],["al-fayyum","الفيوم",29.31,30.84,"Africa/Cairo","EG"],["bani-suwayf","بني سويف",29.07,31.1,"Africa/Cairo","EG"],["minya","المنيا",28.09,30.76,"Africa/Cairo","EG"],
  ["mallawi","ملوي",27.73,30.84,"Africa/Cairo","EG"],["assiut","أسيوط",27.18,31.18,"Africa/Cairo","EG"],["sohag","سوهاج",26.56,31.69,"Africa/Cairo","EG"],["girga","جرجا",26.34,31.89,"Africa/Cairo","EG"],
  ["qina","قنا",26.16,32.73,"Africa/Cairo","EG"],["nag-hammadi","نجع حمادي",26.05,32.24,"Africa/Cairo","EG"],["luxor","الأقصر",25.7,32.64,"Africa/Cairo","EG"],["esna","إسنا",25.29,32.55,"Africa/Cairo","EG"],
  ["edfu","إدفو",24.98,32.88,"Africa/Cairo","EG"],["aswan","أسوان",24.09,32.9,"Africa/Cairo","EG"],["kom-ombo","كوم أمبو",24.48,32.95,"Africa/Cairo","EG"],["hurghada","الغردقة",27.26,33.81,"Africa/Cairo","EG"],
  ["safaga","سفاجا",26.75,33.94,"Africa/Cairo","EG"],["ras-gharib","رأس غارب",28.36,33.08,"Africa/Cairo","EG"],["arish","العريش",31.13,33.8,"Africa/Cairo","EG"],["el-tor","الطور",28.24,33.62,"Africa/Cairo","EG"],
  ["sharm-el-sheikh","شرم الشيخ",27.92,34.33,"Africa/Cairo","EG"],["al-kharjah","الخارجة",25.45,30.55,"Africa/Cairo","EG"],["riyadh","الرياض",24.69,46.72,"Asia/Riyadh","SA"],["makkah","مكة المكرمة",21.43,39.83,"Asia/Riyadh","SA"],
  ["madinah","المدينة المنورة",24.47,39.61,"Asia/Riyadh","SA"],["jeddah","جدة",21.49,39.19,"Asia/Riyadh","SA"],["taif","الطائف",21.27,40.42,"Asia/Riyadh","SA"],["rabigh","رابغ",22.8,39.03,"Asia/Riyadh","SA"],
  ["yanbu","ينبع",24.09,38.06,"Asia/Riyadh","SA"],["dammam","الدمام",26.43,50.1,"Asia/Riyadh","SA"],["khobar","الخبر",26.28,50.21,"Asia/Riyadh","SA"],["al-jubayl","الجبيل",27.02,49.62,"Asia/Riyadh","SA"],
  ["al-qatif","القطيف",26.57,50.01,"Asia/Riyadh","SA"],["al-hufuf","الهفوف",25.36,49.59,"Asia/Riyadh","SA"],["al-mubarraz","المبرز",25.41,49.59,"Asia/Riyadh","SA"],["hafar-al-batin","حفر الباطن",28.43,45.97,"Asia/Riyadh","SA"],
  ["buraydah","بريدة",26.33,43.97,"Asia/Riyadh","SA"],["unaizah","عنيزة",26.1,44,"Asia/Riyadh","SA"],["hail","حائل",27.52,41.69,"Asia/Riyadh","SA"],["tabuk","تبوك",28.4,36.57,"Asia/Riyadh","SA"],
  ["al-wajh","الوجه",26.23,36.46,"Asia/Riyadh","SA"],["arar","عرعر",30.98,41.04,"Asia/Riyadh","SA"],["sakakah","سكاكا",29.97,40.21,"Asia/Riyadh","SA"],["qurayyat","القريات",31.33,37.34,"Asia/Riyadh","SA"],
  ["al-kharj","الخرج",24.16,47.33,"Asia/Riyadh","SA"],["abha","أبها",18.22,42.51,"Asia/Riyadh","SA"],["khamis-mushait","خميس مشيط",18.3,42.73,"Asia/Riyadh","SA"],["al-bahah","الباحة",20.01,41.47,"Asia/Riyadh","SA"],
  ["jizan","جازان",16.89,42.55,"Asia/Riyadh","SA"],["najran","نجران",17.49,44.13,"Asia/Riyadh","SA"],["abu-dhabi","أبوظبي",24.45,54.4,"Asia/Dubai","AE"],["dubai","دبي",25.08,55.31,"Asia/Dubai","AE"],
  ["sharjah","الشارقة",25.33,55.41,"Asia/Dubai","AE"],["ajman","عجمان",25.4,55.48,"Asia/Dubai","AE"],["umm-al-quwain","أم القيوين",25.56,55.56,"Asia/Dubai","AE"],["ras-al-khaimah","رأس الخيمة",25.79,55.94,"Asia/Dubai","AE"],
  ["fujairah","الفجيرة",25.12,56.34,"Asia/Dubai","AE"],["khawr-fakkan","خورفكان",25.33,56.34,"Asia/Dubai","AE"],["kalba","كلباء",25.05,56.35,"Asia/Dubai","AE"],["al-ain","العين",24.19,55.76,"Asia/Dubai","AE"],
  ["ar-ruways","الرويس",24.11,52.73,"Asia/Dubai","AE"],["doha","الدوحة",25.29,51.53,"Asia/Qatar","QA"],["ar-rayyan","الريان",25.29,51.42,"Asia/Qatar","QA"],["al-wakrah","الوكرة",25.17,51.6,"Asia/Qatar","QA"],
  ["al-khawr","الخور",25.68,51.51,"Asia/Qatar","QA"],["lusail","لوسيل",25.42,51.51,"Asia/Qatar","QA"],["kuwait","مدينة الكويت",29.37,47.97,"Asia/Kuwait","KW"],["hawalli","حولي",29.33,48.03,"Asia/Kuwait","KW"],
  ["as-salimiyah","السالمية",29.33,48.08,"Asia/Kuwait","KW"],["al-farwaniyah","الفروانية",29.28,47.96,"Asia/Kuwait","KW"],["al-jahra","الجهراء",29.34,47.66,"Asia/Kuwait","KW"],["al-ahmadi","الأحمدي",29.08,48.08,"Asia/Kuwait","KW"],
  ["al-fahahil","الفحيحيل",29.08,48.13,"Asia/Kuwait","KW"],["manama","المنامة",26.23,50.59,"Asia/Bahrain","BH"],["muharraq","المحرق",26.26,50.61,"Asia/Bahrain","BH"],["ar-rifa","الرفاع",26.13,50.55,"Asia/Bahrain","BH"],
  ["madinat-hamad","مدينة حمد",26.12,50.51,"Asia/Bahrain","BH"],["sitrah","سترة",26.15,50.62,"Asia/Bahrain","BH"],["muscat","مسقط",23.58,58.41,"Asia/Muscat","OM"],["seeb","السيب",23.67,58.19,"Asia/Muscat","OM"],
  ["sohar","صحار",24.35,56.71,"Asia/Muscat","OM"],["al-buraymi","البريمي",24.25,55.79,"Asia/Muscat","OM"],["nizwa","نزوى",22.93,57.53,"Asia/Muscat","OM"],["ibra","إبراء",22.69,58.53,"Asia/Muscat","OM"],
  ["sur","صور",22.57,59.53,"Asia/Muscat","OM"],["salalah","صلالة",17.02,54.09,"Asia/Muscat","OM"],["khasab","خصب",26.18,56.25,"Asia/Muscat","OM"],["sanaa","صنعاء",15.35,44.21,"Asia/Aden","YE"],
  ["aden","عدن",12.78,45.04,"Asia/Aden","YE"],["taiz","تعز",13.58,44.02,"Asia/Aden","YE"],["ibb","إب",13.97,44.18,"Asia/Aden","YE"],["al-hudaydah","الحديدة",14.8,42.95,"Asia/Aden","YE"],
  ["dhamar","ذمار",14.54,44.41,"Asia/Aden","YE"],["amran","عمران",15.66,43.94,"Asia/Aden","YE"],["hajjah","حجة",15.69,43.61,"Asia/Aden","YE"],["saada","صعدة",16.94,43.76,"Asia/Aden","YE"],
  ["al-bayda-yemen","البيضاء",13.99,45.57,"Asia/Aden","YE"],["marib","مأرب",15.46,45.33,"Asia/Aden","YE"],["al-hazm","الحزم",16.16,44.78,"Asia/Aden","YE"],["ataq","عتق",14.54,46.83,"Asia/Aden","YE"],
  ["lahij","لحج",13.06,44.88,"Asia/Aden","YE"],["zinjibar","زنجبار",13.13,45.38,"Asia/Aden","YE"],["mukalla","المكلا",14.54,49.12,"Asia/Aden","YE"],["baghdad","بغداد",33.34,44.4,"Asia/Baghdad","IQ"],
  ["mosul","الموصل",36.34,43.12,"Asia/Baghdad","IQ"],["erbil","أربيل",36.19,44.01,"Asia/Baghdad","IQ"],["sulaymaniyah","السليمانية",35.56,45.43,"Asia/Baghdad","IQ"],["dihok","دهوك",36.87,42.99,"Asia/Baghdad","IQ"],
  ["zaxo","زاخو",37.15,42.69,"Asia/Baghdad","IQ"],["kirkuk","كركوك",35.47,44.39,"Asia/Baghdad","IQ"],["tikrit","تكريت",34.62,43.68,"Asia/Baghdad","IQ"],["samarra","سامراء",34.2,43.89,"Asia/Baghdad","IQ"],
  ["baqubah","بعقوبة",33.75,44.61,"Asia/Baghdad","IQ"],["ramadi","الرمادي",33.42,43.31,"Asia/Baghdad","IQ"],["al-fallujah","الفلوجة",33.35,43.79,"Asia/Baghdad","IQ"],["al-hillah","الحلة",32.46,44.42,"Asia/Baghdad","IQ"],
  ["karbala","كربلاء",32.62,44.02,"Asia/Baghdad","IQ"],["najaf","النجف",32.03,44.35,"Asia/Baghdad","IQ"],["kufa","الكوفة",32.05,44.44,"Asia/Baghdad","IQ"],["al-diwaniyah","الديوانية",31.99,44.93,"Asia/Baghdad","IQ"],
  ["al-kut","الكوت",32.51,45.82,"Asia/Baghdad","IQ"],["as-samawah","السماوة",31.33,45.29,"Asia/Baghdad","IQ"],["nasiriyah","الناصرية",31.06,46.26,"Asia/Baghdad","IQ"],["al-amarah","العمارة",31.84,47.14,"Asia/Baghdad","IQ"],
  ["basra","البصرة",30.51,47.78,"Asia/Baghdad","IQ"],["damascus","دمشق",33.51,36.29,"Asia/Damascus","SY"],["aleppo","حلب",36.2,37.16,"Asia/Damascus","SY"],["manbij","منبج",36.53,37.95,"Asia/Damascus","SY"],
  ["homs","حمص",34.72,36.73,"Asia/Damascus","SY"],["hamah","حماة",35.13,36.76,"Asia/Damascus","SY"],["idlib","إدلب",35.93,36.63,"Asia/Damascus","SY"],["latakia","اللاذقية",35.53,35.79,"Asia/Damascus","SY"],
  ["tartus","طرطوس",34.89,35.89,"Asia/Damascus","SY"],["ar-raqqah","الرقة",35.95,39.01,"Asia/Damascus","SY"],["deir-ez-zor","دير الزور",35.34,40.14,"Asia/Damascus","SY"],["al-hasakah","الحسكة",36.5,40.75,"Asia/Damascus","SY"],
  ["tadmur","تدمر",34.56,38.28,"Asia/Damascus","SY"],["daraa","درعا",32.62,36.1,"Asia/Damascus","SY"],["as-suwayda","السويداء",32.71,36.57,"Asia/Damascus","SY"],["al-qunaytirah","القنيطرة",33.13,35.82,"Asia/Damascus","SY"],
  ["beirut","بيروت",33.89,35.5,"Asia/Beirut","LB"],["jounieh","جونيه",33.98,35.62,"Asia/Beirut","LB"],["byblos","جبيل",34.12,35.65,"Asia/Beirut","LB"],["tripoli-lebanon","طرابلس",34.43,35.84,"Asia/Beirut","LB"],
  ["sidon","صيدا",33.56,35.37,"Asia/Beirut","LB"],["tyre","صور",33.27,35.19,"Asia/Beirut","LB"],["nabatieh","النبطية",33.38,35.48,"Asia/Beirut","LB"],["zahle","زحلة",33.85,35.9,"Asia/Beirut","LB"],
  ["baalbek","بعلبك",34.01,36.22,"Asia/Beirut","LB"],["amman","عمّان",31.96,35.95,"Asia/Amman","JO"],["zarqa","الزرقاء",32.07,36.09,"Asia/Amman","JO"],["irbid","إربد",32.56,35.85,"Asia/Amman","JO"],
  ["mafraq","المفرق",32.34,36.21,"Asia/Amman","JO"],["jarash","جرش",32.28,35.9,"Asia/Amman","JO"],["ajlun","عجلون",32.33,35.75,"Asia/Amman","JO"],["as-salt","السلط",32.04,35.73,"Asia/Amman","JO"],
  ["madaba","مأدبا",31.72,35.79,"Asia/Amman","JO"],["karak","الكرك",31.16,35.76,"Asia/Amman","JO"],["at-tafilah","الطفيلة",30.84,35.6,"Asia/Amman","JO"],["maan","معان",30.2,35.73,"Asia/Amman","JO"],
  ["aqaba","العقبة",29.53,35.01,"Asia/Amman","JO"],["jerusalem","القدس",31.78,35.23,"Asia/Hebron","PS"],["ramallah","رام الله",31.9,35.2,"Asia/Hebron","PS"],["nablus","نابلس",32.22,35.25,"Asia/Hebron","PS"],
  ["hebron","الخليل",31.53,35.09,"Asia/Hebron","PS"],["jericho","أريحا",31.87,35.45,"Asia/Hebron","PS"],["tulkarm","طولكرم",32.31,35.03,"Asia/Hebron","PS"],["qalqilyah","قلقيلية",32.19,34.97,"Asia/Hebron","PS"],
  ["gaza","غزة",31.5,34.47,"Asia/Gaza","PS"],["khan-yunis","خان يونس",31.34,34.31,"Asia/Gaza","PS"],["rafah","رفح",31.3,34.24,"Asia/Gaza","PS"],["khartoum","الخرطوم",15.55,32.53,"Africa/Khartoum","SD"],
  ["omdurman","أم درمان",15.64,32.48,"Africa/Khartoum","SD"],["khartoum-north","الخرطوم بحري",15.65,32.53,"Africa/Khartoum","SD"],["port-sudan","بورتسودان",19.62,37.22,"Africa/Khartoum","SD"],["kassala","كسلا",15.45,36.4,"Africa/Khartoum","SD"],
  ["al-qadarif","القضارف",14.03,35.38,"Africa/Khartoum","SD"],["wad-medani","ود مدني",14.4,33.52,"Africa/Khartoum","SD"],["sennar","سنار",13.57,33.57,"Africa/Khartoum","SD"],["kosti","كوستي",13.16,32.66,"Africa/Khartoum","SD"],
  ["ad-damazin","الدمازين",11.79,34.36,"Africa/Khartoum","SD"],["el-obeid","الأبيض",13.18,30.22,"Africa/Khartoum","SD"],["kadugli","كادقلي",11.01,29.72,"Africa/Khartoum","SD"],["nyala","نيالا",12.05,24.88,"Africa/Khartoum","SD"],
  ["el-fasher","الفاشر",13.63,25.35,"Africa/Khartoum","SD"],["al-junaynah","الجنينة",13.45,22.45,"Africa/Khartoum","SD"],["atbara","عطبرة",17.7,33.99,"Africa/Khartoum","SD"],["ad-damir","الدامر",17.6,33.97,"Africa/Khartoum","SD"],
  ["dongola","دنقلا",19.18,30.48,"Africa/Khartoum","SD"],["wadi-halfa","وادي حلفا",21.8,31.37,"Africa/Khartoum","SD"],["tripoli","طرابلس",32.89,13.19,"Africa/Tripoli","LY"],["az-zawiyah","الزاوية",32.76,12.73,"Africa/Tripoli","LY"],
  ["zuwarah","زوارة",32.93,12.08,"Africa/Tripoli","LY"],["gharyan","غريان",32.17,13.02,"Africa/Tripoli","LY"],["nalut","نالوت",31.87,10.98,"Africa/Tripoli","LY"],["al-khums","الخمس",32.65,14.26,"Africa/Tripoli","LY"],
  ["misratah","مصراتة",32.38,15.09,"Africa/Tripoli","LY"],["sirte","سرت",31.21,16.59,"Africa/Tripoli","LY"],["ajdabiya","أجدابيا",30.76,20.23,"Africa/Tripoli","LY"],["benghazi","بنغازي",32.11,20.07,"Africa/Tripoli","LY"],
  ["al-marj","المرج",32.49,20.83,"Africa/Tripoli","LY"],["al-bayda","البيضاء",32.76,21.76,"Africa/Tripoli","LY"],["darnah","درنة",32.77,22.64,"Africa/Tripoli","LY"],["tobruk","طبرق",32.09,23.95,"Africa/Tripoli","LY"],
  ["hun","هون",29.13,15.95,"Africa/Tripoli","LY"],["sabha","سبها",27.04,14.43,"Africa/Tripoli","LY"],["ubari","أوباري",26.59,12.78,"Africa/Tripoli","LY"],["murzuk","مرزق",25.92,13.92,"Africa/Tripoli","LY"],
  ["tunis","تونس",36.82,10.17,"Africa/Tunis","TN"],["ariana","أريانة",36.86,10.19,"Africa/Tunis","TN"],["ben-arous","بن عروس",36.75,10.22,"Africa/Tunis","TN"],["manouba","منوبة",36.81,10.1,"Africa/Tunis","TN"],
  ["bizerte","بنزرت",37.27,9.87,"Africa/Tunis","TN"],["nabeul","نابل",36.46,10.74,"Africa/Tunis","TN"],["hammamet","الحمامات",36.4,10.62,"Africa/Tunis","TN"],["zaghouan","زغوان",36.4,10.14,"Africa/Tunis","TN"],
  ["beja","باجة",36.73,9.18,"Africa/Tunis","TN"],["jendouba","جندوبة",36.5,8.78,"Africa/Tunis","TN"],["el-kef","الكاف",36.17,8.7,"Africa/Tunis","TN"],["siliana","سليانة",36.08,9.37,"Africa/Tunis","TN"],
  ["sousse","سوسة",35.83,10.64,"Africa/Tunis","TN"],["monastir","المنستير",35.78,10.83,"Africa/Tunis","TN"],["mahdia","المهدية",35.5,11.06,"Africa/Tunis","TN"],["kairouan","القيروان",35.68,10.1,"Africa/Tunis","TN"],
  ["kasserine","القصرين",35.17,8.84,"Africa/Tunis","TN"],["sidi-bouzid","سيدي بوزيد",35.04,9.48,"Africa/Tunis","TN"],["sfax","صفاقس",34.74,10.76,"Africa/Tunis","TN"],["gafsa","قفصة",34.42,8.78,"Africa/Tunis","TN"],
  ["tozeur","توزر",33.92,8.13,"Africa/Tunis","TN"],["kebili","قبلي",33.7,8.97,"Africa/Tunis","TN"],["gabes","قابس",33.88,10.1,"Africa/Tunis","TN"],["medenine","مدنين",33.35,10.51,"Africa/Tunis","TN"],
  ["djerba","جربة",33.88,10.86,"Africa/Tunis","TN"],["tataouine","تطاوين",32.93,10.45,"Africa/Tunis","TN"],["algiers","الجزائر",36.73,3.09,"Africa/Algiers","DZ"],["boumerdas","بومرداس",36.77,3.48,"Africa/Algiers","DZ"],
  ["tipasa","تيبازة",36.59,2.45,"Africa/Algiers","DZ"],["blida","البليدة",36.47,2.83,"Africa/Algiers","DZ"],["medea","المدية",36.26,2.75,"Africa/Algiers","DZ"],["tizi-ouzou","تيزي وزو",36.71,4.05,"Africa/Algiers","DZ"],
  ["bouira","البويرة",36.37,3.9,"Africa/Algiers","DZ"],["bejaia","بجاية",36.76,5.08,"Africa/Algiers","DZ"],["jijel","جيجل",36.82,5.76,"Africa/Algiers","DZ"],["skikda","سكيكدة",36.88,6.91,"Africa/Algiers","DZ"],
  ["constantine","قسنطينة",36.37,6.61,"Africa/Algiers","DZ"],["mila","ميلة",36.45,6.26,"Africa/Algiers","DZ"],["annaba","عنابة",36.9,7.77,"Africa/Algiers","DZ"],["guelma","قالمة",36.46,7.43,"Africa/Algiers","DZ"],
  ["souk-ahras","سوق أهراس",36.29,7.95,"Africa/Algiers","DZ"],["tebessa","تبسة",35.4,8.12,"Africa/Algiers","DZ"],["khenchela","خنشلة",35.44,7.14,"Africa/Algiers","DZ"],["oum-el-bouaghi","أم البواقي",35.88,7.11,"Africa/Algiers","DZ"],
  ["batna","باتنة",35.56,6.17,"Africa/Algiers","DZ"],["setif","سطيف",36.19,5.41,"Africa/Algiers","DZ"],["bordj-bou-arreridj","برج بوعريريج",36.07,4.76,"Africa/Algiers","DZ"],["msila","المسيلة",35.71,4.54,"Africa/Algiers","DZ"],
  ["biskra","بسكرة",34.85,5.73,"Africa/Algiers","DZ"],["el-oued","الوادي",33.36,6.86,"Africa/Algiers","DZ"],["touggourt","تقرت",33.11,6.07,"Africa/Algiers","DZ"],["ouargla","ورقلة",31.95,5.33,"Africa/Algiers","DZ"],
  ["ghardaia","غرداية",32.49,3.67,"Africa/Algiers","DZ"],["laghouat","الأغواط",33.8,2.87,"Africa/Algiers","DZ"],["djelfa","الجلفة",34.67,3.26,"Africa/Algiers","DZ"],["tiaret","تيارت",35.37,1.32,"Africa/Algiers","DZ"],
  ["tissemsilt","تيسمسيلت",35.61,1.81,"Africa/Algiers","DZ"],["ain-defla","عين الدفلة",36.26,1.97,"Africa/Algiers","DZ"],["chlef","الشلف",36.17,1.33,"Africa/Algiers","DZ"],["relizane","غليزان",35.74,0.56,"Africa/Algiers","DZ"],
  ["mostaganem","مستغانم",35.93,0.09,"Africa/Algiers","DZ"],["oran","وهران",35.7,-0.64,"Africa/Algiers","DZ"],["ain-temouchent","عين تموشنت",35.3,-1.14,"Africa/Algiers","DZ"],["tlemcen","تلمسان",34.88,-1.31,"Africa/Algiers","DZ"],
  ["sidi-bel-abbes","سيدي بلعباس",35.19,-0.63,"Africa/Algiers","DZ"],["mascara","معسكر",35.4,0.14,"Africa/Algiers","DZ"],["saida","سعيدة",34.83,0.15,"Africa/Algiers","DZ"],["el-bayadh","البيض",33.68,1.02,"Africa/Algiers","DZ"],
  ["bechar","بشار",31.62,-2.22,"Africa/Algiers","DZ"],["tindouf","تندوف",27.67,-8.15,"Africa/Algiers","DZ"],["adrar","أدرار",27.87,-0.29,"Africa/Algiers","DZ"],["timimoun","تيميمون",29.26,0.24,"Africa/Algiers","DZ"],
  ["el-menia","المنيعة",30.58,2.88,"Africa/Algiers","DZ"],["tamanghasset","تمنراست",22.79,5.52,"Africa/Algiers","DZ"],["rabat","الرباط",34.01,-6.83,"UTC","MA"],["sale","سلا",34.05,-6.8,"UTC","MA"],
  ["temara","تمارة",33.93,-6.91,"UTC","MA"],["kenitra","القنيطرة",34.26,-6.58,"UTC","MA"],["casablanca","الدار البيضاء",33.59,-7.61,"UTC","MA"],["el-jadida","الجديدة",33.26,-8.51,"UTC","MA"],
  ["settat","سطات",33,-7.62,"UTC","MA"],["khouribga","خريبكة",32.88,-6.91,"UTC","MA"],["beni-mellal","بني ملال",32.34,-6.35,"UTC","MA"],["safi","آسفي",32.3,-9.24,"UTC","MA"],
  ["marrakesh","مراكش",31.63,-8,"UTC","MA"],["essaouira","الصويرة",31.51,-9.77,"UTC","MA"],["agadir","أكادير",30.42,-9.6,"UTC","MA"],["taroudant","تارودانت",30.47,-8.88,"UTC","MA"],
  ["tiznit","تزنيت",29.7,-9.73,"UTC","MA"],["guelmim","كلميم",28.99,-10.06,"UTC","MA"],["ouarzazate","ورزازات",30.92,-6.89,"UTC","MA"],["zagora","زاكورة",30.33,-5.84,"UTC","MA"],
  ["errachidia","الرشيدية",31.93,-4.43,"UTC","MA"],["ifrane","إفران",33.53,-5.11,"UTC","MA"],["meknes","مكناس",33.89,-5.55,"UTC","MA"],["fes","فاس",34.03,-5,"UTC","MA"],
  ["taza","تازة",34.21,-4.01,"UTC","MA"],["oujda","وجدة",34.68,-1.91,"UTC","MA"],["nador","الناظور",35.17,-2.93,"UTC","MA"],["al-hoceima","الحسيمة",35.25,-3.94,"UTC","MA"],
  ["chefchaouen","شفشاون",35.17,-5.26,"UTC","MA"],["tetouan","تطوان",35.58,-5.37,"UTC","MA"],["tangier","طنجة",35.77,-5.8,"UTC","MA"],["larache","العرائش",35.19,-6.16,"UTC","MA"],
  ["ksar-el-kebir","القصر الكبير",35,-5.9,"UTC","MA"],["nouakchott","نواكشوط",18.09,-15.98,"Africa/Nouakchott","MR"],["nouadhibou","نواذيبو",20.94,-17.04,"Africa/Nouakchott","MR"],["rosso","روصو",16.51,-15.81,"Africa/Nouakchott","MR"],
  ["aleg","ألاك",17.05,-13.91,"Africa/Nouakchott","MR"],["kaedi","كيهيدي",16.15,-13.51,"Africa/Nouakchott","MR"],["selibaby","سيلبابي",15.16,-12.18,"Africa/Nouakchott","MR"],["kiffa","كيفة",16.62,-11.4,"Africa/Nouakchott","MR"],
  ["ayoun-el-atrous","لعيون",16.66,-9.61,"Africa/Nouakchott","MR"],["nema","النعمة",16.62,-7.26,"Africa/Nouakchott","MR"],["atar","أطار",20.52,-13.05,"Africa/Nouakchott","MR"],["akjoujt","أكجوجت",19.74,-14.39,"Africa/Nouakchott","MR"],
  ["zouerat","ازويرات",22.74,-12.47,"Africa/Nouakchott","MR"],["mogadishu","مقديشو",2.04,45.34,"Africa/Mogadishu","SO"],["marka","مركة",1.72,44.77,"Africa/Mogadishu","SO"],["baidoa","بيدوا",3.11,43.65,"Africa/Mogadishu","SO"],
  ["kismayo","كسمايو",-0.36,42.55,"Africa/Mogadishu","SO"],["beledweyne","بلدوين",4.74,45.2,"Africa/Mogadishu","SO"],["jawhar","جوهر",2.78,45.5,"Africa/Mogadishu","SO"],["gaalkacyo","جالكعيو",6.77,47.43,"Africa/Mogadishu","SO"],
  ["garoowe","جاروي",8.4,48.48,"Africa/Mogadishu","SO"],["bosaso","بوصاصو",11.28,49.18,"Africa/Mogadishu","SO"],["hargeysa","هرجيسا",9.56,44.06,"Africa/Mogadishu","SO"],["burao","برعو",9.52,45.53,"Africa/Mogadishu","SO"],
  ["borama","بوراما",9.94,43.18,"Africa/Mogadishu","SO"],["djibouti","جيبوتي",11.59,43.15,"Africa/Djibouti","DJ"],["ali-sabih","علي صبيح",11.16,42.71,"Africa/Djibouti","DJ"],["dikhil","دخيل",11.1,42.37,"Africa/Djibouti","DJ"],
  ["tadjoura","تاجورة",11.79,42.88,"Africa/Djibouti","DJ"],["obock","أوبوك",11.97,43.29,"Africa/Djibouti","DJ"],["moroni","موروني",-11.7,43.26,"Indian/Comoro","KM"],["moutsamoudou","موتسامودو",-12.17,44.4,"Indian/Comoro","KM"],
  ["fomboni","فومبوني",-12.29,43.74,"Indian/Comoro","KM"],
  ["dahab","دهب",28.48,34.49,"Africa/Cairo","EG"],["nuweiba","نويبع",29.05,34.66,"Africa/Cairo","EG"],["taba","طابا",29.49,34.9,"Africa/Cairo","EG"],["saint-catherine","سانت كاترين",28.56,33.95,"Africa/Cairo","EG"],
  ["marsa-alam","مرسى علم",25.06,34.89,"Africa/Cairo","EG"],["el-quseir","القصير",26.11,34.28,"Africa/Cairo","EG"],["el-gouna","الجونة",27.39,33.68,"Africa/Cairo","EG"],["el-alamein","العلمين",30.83,28.95,"Africa/Cairo","EG"],
  ["ain-sokhna","العين السخنة",29.6,32.32,"Africa/Cairo","EG"],["abu-simbel","أبو سمبل",22.35,31.62,"Africa/Cairo","EG"],["bawiti","الواحات البحرية",28.35,28.87,"Africa/Cairo","EG"],["mut","الداخلة",25.49,28.98,"Africa/Cairo","EG"],
  ["farafra","الفرافرة",27.06,27.97,"Africa/Cairo","EG"],["ras-sedr","رأس سدر",29.59,32.71,"Africa/Cairo","EG"],["salloum","السلوم",31.55,25.16,"Africa/Cairo","EG"],["ras-el-bar","رأس البر",31.51,31.83,"Africa/Cairo","EG"],
  ["el-sheikh-zayed","الشيخ زايد",30.02,31,"Africa/Cairo","EG"],["shalateen","شلاتين",23.14,35.6,"Africa/Cairo","EG"],["alula","العلا",26.61,37.92,"Asia/Riyadh","SA"],["duba","ضباء",27.35,35.69,"Asia/Riyadh","SA"],
  ["umluj","أملج",25.02,37.27,"Asia/Riyadh","SA"],["farasan","فرسان",16.7,42.12,"Asia/Riyadh","SA"],["diriyah","الدرعية",24.75,46.54,"Asia/Riyadh","SA"],["dhahran","الظهران",26.29,50.11,"Asia/Riyadh","SA"],
  ["khafji","الخفجي",28.44,48.49,"Asia/Riyadh","SA"],["al-lith","الليث",20.15,40.27,"Asia/Riyadh","SA"],["qunfudhah","القنفذة",19.13,41.08,"Asia/Riyadh","SA"],["badr","بدر",23.78,38.79,"Asia/Riyadh","SA"],
  ["khaybar","خيبر",25.71,39.28,"Asia/Riyadh","SA"],["tayma","تيماء",27.62,38.54,"Asia/Riyadh","SA"],["sharurah","شرورة",17.47,47.11,"Asia/Riyadh","SA"],["wadi-ad-dawasir","وادي الدواسر",20.49,44.79,"Asia/Riyadh","SA"],
  ["bisha","بيشة",20,42.6,"Asia/Riyadh","SA"],["al-namas","النماص",19.14,42.12,"Asia/Riyadh","SA"],["hatta","حتا",24.8,56.13,"Asia/Dubai","AE"],["dibba-al-fujairah","دبا الفجيرة",25.59,56.26,"Asia/Dubai","AE"],
  ["madinat-zayed","مدينة زايد",23.65,53.7,"Asia/Dubai","AE"],["liwa","ليوا",23.13,53.77,"Asia/Dubai","AE"],["al-shamal","الشمال",26.13,51.2,"Asia/Qatar","QA"],["dukhan","دخان",25.43,50.78,"Asia/Qatar","QA"],
  ["mesaieed","مسيعيد",24.99,51.55,"Asia/Qatar","QA"],["zallaq","الزلاق",26.05,50.49,"Asia/Bahrain","BH"],["budaiya","البديع",26.21,50.45,"Asia/Bahrain","BH"],["ibri","عبري",23.23,56.52,"Asia/Muscat","OM"],
  ["bahla","بهلاء",22.98,57.3,"Asia/Muscat","OM"],["rustaq","الرستاق",23.39,57.42,"Asia/Muscat","OM"],["nakhal","نخل",23.39,57.83,"Asia/Muscat","OM"],["duqm","الدقم",19.67,57.7,"Asia/Muscat","OM"],
  ["mirbat","مرباط",17,54.69,"Asia/Muscat","OM"],["taqah","طاقة",17.04,54.4,"Asia/Muscat","OM"],["masirah","مصيرة",20.65,58.87,"Asia/Muscat","OM"],["quriyat","قريات",23.26,58.92,"Asia/Muscat","OM"],
  ["barka","بركاء",23.68,57.89,"Asia/Muscat","OM"],["shinas","شناص",24.74,56.47,"Asia/Muscat","OM"],["seiyun","سيئون",15.94,48.79,"Asia/Aden","YE"],["tarim","تريم",16.06,49,"Asia/Aden","YE"],
  ["shibam","شبام",15.93,48.63,"Asia/Aden","YE"],["hadibu","حديبو",12.65,54.02,"Asia/Aden","YE"],["zabid","زبيد",14.2,43.31,"Asia/Aden","YE"],["shihr","الشحر",14.76,49.6,"Asia/Aden","YE"],
  ["ghaydah","الغيضة",16.21,52.18,"Asia/Aden","YE"],["mokha","المخا",13.32,43.25,"Asia/Aden","YE"],["dhale","الضالع",13.7,44.73,"Asia/Aden","YE"],["kadhimiya","الكاظمية",33.38,44.34,"Asia/Baghdad","IQ"],
  ["akre","عقرة",36.76,43.89,"Asia/Baghdad","IQ"],["amedi","العمادية",37.09,43.49,"Asia/Baghdad","IQ"],["halabja","حلبجة",35.18,45.99,"Asia/Baghdad","IQ"],["shaqlawa","شقلاوة",36.4,44.33,"Asia/Baghdad","IQ"],
  ["soran","سوران",36.66,44.54,"Asia/Baghdad","IQ"],["sinjar","سنجار",36.32,41.88,"Asia/Baghdad","IQ"],["qamishli","القامشلي",37.05,41.23,"Asia/Damascus","SY"],["kobani","عين العرب",36.89,38.35,"Asia/Damascus","SY"],
  ["baniyas","بانياس",35.18,35.95,"Asia/Damascus","SY"],["jableh","جبلة",35.36,35.93,"Asia/Damascus","SY"],["safita","صافيتا",34.82,36.12,"Asia/Damascus","SY"],["masyaf","مصياف",35.06,36.34,"Asia/Damascus","SY"],
  ["zabadani","الزبداني",33.73,36.1,"Asia/Damascus","SY"],["maaloula","معلولا",33.84,36.55,"Asia/Damascus","SY"],["bosra","بصرى الشام",32.52,36.48,"Asia/Damascus","SY"],["batroun","البترون",34.26,35.66,"Asia/Beirut","LB"],
  ["bsharri","بشري",34.25,36.01,"Asia/Beirut","LB"],["ehden","إهدن",34.3,35.98,"Asia/Beirut","LB"],["zgharta","زغرتا",34.4,35.9,"Asia/Beirut","LB"],["aley","عاليه",33.8,35.6,"Asia/Beirut","LB"],
  ["bhamdoun","بحمدون",33.8,35.65,"Asia/Beirut","LB"],["deir-al-qamar","دير القمر",33.69,35.56,"Asia/Beirut","LB"],["jezzine","جزين",33.54,35.58,"Asia/Beirut","LB"],["anjar","عنجر",33.73,35.93,"Asia/Beirut","LB"],
  ["marjayoun","مرجعيون",33.36,35.59,"Asia/Beirut","LB"],["wadi-musa","البتراء",30.32,35.48,"Asia/Amman","JO"],["wadi-rum","وادي رم",29.58,35.42,"Asia/Amman","JO"],["sweimeh","البحر الميت",31.78,35.58,"Asia/Amman","JO"],
  ["umm-qais","أم قيس",32.65,35.69,"Asia/Amman","JO"],["azraq","الأزرق",31.88,36.83,"Asia/Amman","JO"],["ramtha","الرمثا",32.56,36.01,"Asia/Amman","JO"],["shobak","الشوبك",30.52,35.56,"Asia/Amman","JO"],
  ["bethlehem","بيت لحم",31.7,35.2,"Asia/Hebron","PS"],["jenin","جنين",32.46,35.3,"Asia/Hebron","PS"],["salfit","سلفيت",32.08,35.18,"Asia/Hebron","PS"],["tubas","طوباس",32.32,35.37,"Asia/Hebron","PS"],
  ["deir-al-balah","دير البلح",31.42,34.35,"Asia/Gaza","PS"],["jabalia","جباليا",31.53,34.48,"Asia/Gaza","PS"],["suakin","سواكن",19.11,37.33,"Africa/Khartoum","SD"],["shendi","شندي",16.69,33.43,"Africa/Khartoum","SD"],
  ["karima","كريمة",18.55,31.85,"Africa/Khartoum","SD"],["merowe","مروي",18.47,31.81,"Africa/Khartoum","SD"],["ghadames","غدامس",30.13,9.5,"Africa/Tripoli","LY"],["ghat","غات",24.96,10.18,"Africa/Tripoli","LY"],
  ["shahhat","شحات",32.8,21.87,"Africa/Tripoli","LY"],["sabratha","صبراتة",32.79,12.49,"Africa/Tripoli","LY"],["zliten","زليتن",32.47,14.57,"Africa/Tripoli","LY"],["kufra","الكفرة",24.2,23.29,"Africa/Tripoli","LY"],
  ["bani-walid","بني وليد",31.75,13.98,"Africa/Tripoli","LY"],["yefren","يفرن",32.06,12.53,"Africa/Tripoli","LY"],["sousa","سوسة",32.9,21.97,"Africa/Tripoli","LY"],["douz","دوز",33.47,9.02,"Africa/Tunis","TN"],
  ["tabarka","طبرقة",36.95,8.76,"Africa/Tunis","TN"],["sidi-bou-said","سيدي بوسعيد",36.87,10.34,"Africa/Tunis","TN"],["carthage","قرطاج",36.86,10.33,"Africa/Tunis","TN"],["la-marsa","المرسى",36.88,10.32,"Africa/Tunis","TN"],
  ["kelibia","قليبية",36.85,11.09,"Africa/Tunis","TN"],["ain-draham","عين دراهم",36.78,8.69,"Africa/Tunis","TN"],["nefta","نفطة",33.87,7.88,"Africa/Tunis","TN"],["zarzis","جرجيس",33.5,11.11,"Africa/Tunis","TN"],
  ["el-jem","الجم",35.3,10.72,"Africa/Tunis","TN"],["matmata","مطماطة",33.54,9.97,"Africa/Tunis","TN"],["sbeitla","سبيطلة",35.23,9.12,"Africa/Tunis","TN"],["ben-gardane","بن قردان",33.14,11.22,"Africa/Tunis","TN"],
  ["port-el-kantaoui","القنطاوي",35.89,10.59,"Africa/Tunis","TN"],["djanet","جانت",24.55,9.48,"Africa/Algiers","DZ"],["illizi","إليزي",26.48,8.47,"Africa/Algiers","DZ"],["in-salah","عين صالح",27.2,2.48,"Africa/Algiers","DZ"],
  ["taghit","تاغيت",30.93,-2,"Africa/Algiers","DZ"],["beni-abbes","بني عباس",30.13,-2.17,"Africa/Algiers","DZ"],["bou-saada","بوسعادة",35.21,4.17,"Africa/Algiers","DZ"],["el-kala","القالة",36.9,8.44,"Africa/Algiers","DZ"],
  ["cherchell","شرشال",36.6,2.19,"Africa/Algiers","DZ"],["tenes","تنس",36.51,1.31,"Africa/Algiers","DZ"],["beni-saf","بني صاف",35.3,-1.38,"Africa/Algiers","DZ"],["ghazaouet","الغزوات",35.1,-1.86,"Africa/Algiers","DZ"],
  ["hassi-messaoud","حاسي مسعود",31.68,6.07,"Africa/Algiers","DZ"],["tigzirt","تيقزيرت",36.89,4.12,"Africa/Algiers","DZ"],["laayoune","العيون",27.14,-13.19,"UTC","MA"],["dakhla","الداخلة",23.68,-15.96,"UTC","MA"],
  ["smara","السمارة",26.74,-11.67,"UTC","MA"],["boujdour","بوجدور",26.13,-14.48,"UTC","MA"],["tan-tan","طانطان",28.44,-11.1,"UTC","MA"],["sidi-ifni","سيدي إفني",29.38,-10.17,"UTC","MA"],
  ["mohammedia","المحمدية",33.69,-7.38,"UTC","MA"],["asilah","أصيلة",35.47,-6.03,"UTC","MA"],["mdiq","المضيق",35.68,-5.33,"UTC","MA"],["fnideq","الفنيدق",35.85,-5.36,"UTC","MA"],
  ["martil","مرتيل",35.62,-5.28,"UTC","MA"],["saidia","السعيدية",35.08,-2.23,"UTC","MA"],["figuig","فكيك",32.11,-1.23,"UTC","MA"],["midelt","ميدلت",32.69,-4.75,"UTC","MA"],
  ["azrou","أزرو",33.43,-5.22,"UTC","MA"],["tinghir","تنغير",31.52,-5.53,"UTC","MA"],["merzouga","مرزوقة",31.08,-4.01,"UTC","MA"],["imlil","إمليل",31.14,-7.92,"UTC","MA"],
  ["ait-benhaddou","آيت بنحدو",31.05,-7.13,"UTC","MA"],["taghazout","تغازوت",30.54,-9.71,"UTC","MA"],["oualidia","الواليدية",32.73,-9.03,"UTC","MA"],["kelaat-mgouna","قلعة مكونة",31.25,-6.13,"UTC","MA"],
  ["chinguetti","شنقيط",20.46,-12.36,"Africa/Nouakchott","MR"],["ouadane","ودان",20.93,-11.62,"Africa/Nouakchott","MR"],["tidjikja","تجكجة",18.56,-11.43,"Africa/Nouakchott","MR"],["boutilimit","بوتلميت",17.55,-14.7,"Africa/Nouakchott","MR"],
  ["oualata","ولاتة",17.3,-7.02,"Africa/Nouakchott","MR"],["tichit","تيشيت",18.44,-9.49,"Africa/Nouakchott","MR"],["berbera","بربرة",10.44,45.01,"Africa/Mogadishu","SO"],["zeila","زيلع",11.35,43.47,"Africa/Mogadishu","SO"],
  ["las-anod","لاس عانود",8.48,47.36,"Africa/Mogadishu","SO"],["erigavo","عيرجابو",10.62,47.37,"Africa/Mogadishu","SO"],["barawe","براوة",1.11,44.03,"Africa/Mogadishu","SO"],["arta","أرتا",11.53,42.85,"Africa/Djibouti","DJ"],
  ["domoni","دوموني",-12.26,44.53,"Indian/Comoro","KM"],["mitsamiouli","ميتساميولي",-11.38,43.28,"Indian/Comoro","KM"],
  ["abu-rudeis","أبو رديس",28.9,33.18,"Africa/Cairo","EG"],["sidi-barrani","سيدي براني",31.61,25.93,"Africa/Cairo","EG"],["new-capital","العاصمة الإدارية الجديدة",30.02,31.76,"Africa/Cairo","EG"],["baltim","بلطيم",31.56,31.09,"Africa/Cairo","EG"],
  ["gamasa","جمصة",31.44,31.52,"Africa/Cairo","EG"],["ras-mohammed","رأس محمد",27.73,34.25,"Africa/Cairo","EG"],["ras-shitan","رأس شيطان",29.12,34.7,"Africa/Cairo","EG"],["majmaah","المجمعة",25.91,45.36,"Asia/Riyadh","SA"],["al-rass","الرس",25.87,43.5,"Asia/Riyadh","SA"],["ras-tanura","رأس تنورة",26.64,50.16,"Asia/Riyadh","SA"],
  ["umm-salal","أم صلال",25.41,51.41,"Asia/Qatar","QA"],["isa-town","مدينة عيسى",26.17,50.55,"Asia/Bahrain","BH"],["samail","سمائل",23.32,58.02,"Asia/Muscat","OM"],["sinaw","سناو",22.5,58.04,"Asia/Muscat","OM"],
  ["al-hamra","الحمراء",23.12,57.29,"Asia/Muscat","OM"],["haditha","حديثة",34.14,42.38,"Asia/Baghdad","IQ"],["hit","هيت",33.64,42.83,"Asia/Baghdad","IQ"],["tal-afar","تلعفر",36.38,42.45,"Asia/Baghdad","IQ"],
  ["qaim","القائم",34.39,40.99,"Asia/Baghdad","IQ"],["salamiyah","سلمية",35.01,37.05,"Asia/Damascus","SY"],["abu-kamal","البوكمال",34.45,40.92,"Asia/Damascus","SY"],["mayadin","الميادين",35.02,40.45,"Asia/Damascus","SY"],
  ["tabqa","الطبقة",35.84,38.55,"Asia/Damascus","SY"],["afrin","عفرين",36.51,36.87,"Asia/Damascus","SY"],["azaz","اعزاز",36.59,37.05,"Asia/Damascus","SY"],["rashaya","راشيا",33.5,35.84,"Asia/Beirut","LB"],
  ["halba","حلبا",34.54,36.08,"Asia/Beirut","LB"],["hermel","الهرمل",34.39,36.38,"Asia/Beirut","LB"],["faraya","فاريا",34,35.83,"Asia/Beirut","LB"],["fuheis","الفحيص",32.01,35.78,"Asia/Amman","JO"],
  ["dana","دانة",30.68,35.62,"Asia/Amman","JO"],["beit-lahia","بيت لاهيا",31.55,34.49,"Asia/Gaza","PS"],["yatta","يطا",31.45,35.09,"Asia/Hebron","PS"],["abu-hamad","أبو حمد",19.53,33.33,"Africa/Khartoum","SD"],
  ["tokar","طوكر",18.43,37.73,"Africa/Khartoum","SD"],["jalu","جالو",29.03,21.55,"Africa/Tripoli","LY"],["tolmeita","طلميثة",32.7,20.95,"Africa/Tripoli","LY"],["tarhuna","ترهونة",32.44,13.63,"Africa/Tripoli","LY"],
  ["azeffoun","أزفون",36.89,4.4,"Africa/Algiers","DZ"],["zeralda","زرالدة",36.71,2.84,"Africa/Algiers","DZ"],["collo","القل",37.01,6.56,"Africa/Algiers","DZ"],["ouezzane","وزان",34.8,-5.58,"UTC","MA"],
  ["berkane","بركان",34.92,-2.32,"UTC","MA"],["khenifra","خنيفرة",32.94,-5.66,"UTC","MA"],["sefrou","صفرو",33.83,-4.83,"UTC","MA"],["qardho","قردو",9.5,49.08,"Africa/Mogadishu","SO"],
  ["afgooye","أفجوي",2.14,45.12,"Africa/Mogadishu","SO"],["bardera","بارداري",2.34,42.28,"Africa/Mogadishu","SO"],
  ["custom","إحداثيات أخرى",30,31,null,null]
];
// مدينة مختارة من مدن العالم (#320): ليست في CITIES، فتُحفظ بصفّها نفسه [المعرف، الاسم، العرض، الطول، المنطقة الزمنية، الدولة]
let WCITY=null;
const COUNTRIES_AR = [["EG","مصر"],["SA","السعودية"],["AE","الإمارات"],["QA","قطر"],["KW","الكويت"],["BH","البحرين"],["OM","عُمان"],["YE","اليمن"],["IQ","العراق"],["SY","سوريا"],["LB","لبنان"],["JO","الأردن"],["PS","فلسطين"],["SD","السودان"],["LY","ليبيا"],["TN","تونس"],["DZ","الجزائر"],["MA","المغرب"],["MR","موريتانيا"],["SO","الصومال"],["DJ","جيبوتي"],["KM","جزر القمر"]];
// [المفتاح، الاسم، الافتراضي، الوصف، الوضع الذي تظهر فيه إن اختص بواحد]
const LAYERS = [
  ["lines","خطوط الكوكبات",true,"كما تراها العين"],["fullLines","الشكل الكامل",false,"مع النجوم الخافتة"],["conNames","أسماء الكوكبات",true,""],["starNames","أسماء النجوم",true,""],
  ["planets","الكواكب والقمر",true,""],["planetNames","أسماء الكواكب والقمر",true,""],["mw","درب التبانة",true,""],["horizon","أفقك على الخريطة",true,"المظلل تحت أفقك الآن","atlas"],["below","ما تحت الأفق",false,"النجوم الغاربة الآن","sky"],["clouds","الغيوم",true,"من توقعات الطقس، في منظر 3D","sky"],
  ["grid","الشبكة",false,"الارتفاعات أو الإحداثيات"],["gridEq","الشبكة الاستوائية",false,"المطلع والميل","sky","coarse"],["ecliptic","دائرة البروج",false,"طريق الشمس"],["bounds","حدود الكوكبات",false,"الحدود الرسمية"],
  ["guides","الأشكال الدليلة",false,"مثلث الشتاء والصيف"],["dso","السدم والمجرات",false,"قائمة ميسييه"],["mansions","منازل القمر",false,"28 منزلة"],["meteors","مشعات زخات الشهب",true,"الزخات النشطة في التاريخ المعروض"]
];
const PILLS = [["north","x","اعثر على الشمال"],["con","Ori","الجبار"],["con","UMa","الدب الأكبر"],["con","Cas","ذات الكرسي"],["con","Sco","العقرب"],["con","Tau","الثور والثريا"],
  ["con","Leo","الأسد"],["con","Cyg","الدجاجة"],["route","winter-triangle","مثلث الشتاء"],["route","summer-triangle","مثلث الصيف"],["route","pegasus-andromeda","مجرة المرأة المسلسلة"]];
const TOUR = [
  ["con","Ori","نبدأ بأشهر كوكبات السماء"],["star",27989,"عملاق أحمر في كتف الجبار"],["dso","M42","حيث تولد النجوم"],
  ["route","belt-sirius","من الحزام إلى ألمع نجوم الليل"],["route","winter-triangle","مثلث الشتاء"],["route","belt-aldebaran","إلى الدبران والثريا"],
  ["con","UMa","بنات نعش الكبرى"],["route","polaris-dipper","الطريق إلى الشمال"],["route","polaris-cassiopeia","طريق ثانٍ إلى الشمال"],
  ["route","arc-arcturus-spica","القوس إلى السماكين"],["con","Sco","عروس سماء الصيف"],["route","summer-triangle","مثلث الصيف"],
  ["route","pegasus-andromeda","أبعد ما تراه العين"]
];
const GREEK = {"α":"ألفا","β":"بيتا","γ":"غاما","δ":"دلتا","ε":"إبسيلون","ζ":"زيتا","η":"إيتا","θ":"ثيتا","ι":"يوتا","κ":"كابا","λ":"لامدا","μ":"ميو","ν":"نيو","ξ":"كساي","ο":"أوميكرون","π":"باي","ρ":"رو","σ":"سيغما","τ":"تاو","υ":"أبسيلون","φ":"فاي","χ":"كاي","ψ":"بساي","ω":"أوميغا"};
const GREEK_LAT = {"α":"alpha","β":"beta","γ":"gamma","δ":"delta","ε":"epsilon","ζ":"zeta","η":"eta","θ":"theta","ι":"iota","κ":"kappa","λ":"lambda","μ":"mu","ν":"nu","ξ":"xi","ο":"omicron","π":"pi","ρ":"rho","σ":"sigma","τ":"tau","υ":"upsilon","φ":"phi","χ":"chi","ψ":"psi","ω":"omega"};
const MONTHS = ["يناير (كانون الثاني)","فبراير (شباط)","مارس (آذار)","أبريل (نيسان)","مايو (أيار)","يونيو (حزيران)","يوليو (تموز)","أغسطس (آب)","سبتمبر (أيلول)","أكتوبر (تشرين الأول)","نوفمبر (تشرين الثاني)","ديسمبر (كانون الأول)"];
const DIRS = ["الشمال","الشمال الشرقي","الشرق","الجنوب الشرقي","الجنوب","الجنوب الغربي","الغرب","الشمال الغربي"];
const DIRS_SHORT = ["شمال","شمال شرقي","شرق","جنوب شرقي","جنوب","جنوب غربي","غرب","شمال غربي"];
const BODIES = [
  {id:"sun",b:"Sun",ar:"الشمس",c:"#ffd27a",t:"نجمنا. لا تنظر إليها مباشرة أبداً، ولا بمنظار أو تلسكوب من غير مرشح شمسي مخصص، لأن ذلك يؤذي العين فوراً."},
  {id:"moon",b:"Moon",ar:"القمر",c:"#efe9da",t:"تابع الأرض الوحيد. يقطع في كل ليلة منزلة تقريباً من منازله الثماني والعشرين، وبه عرف العرب مواقيت الأنواء."},
  {id:"mercury",b:"Mercury",ar:"عطارد",c:"#c9bfae",t:"أقرب الكواكب إلى الشمس. لا يبتعد عنها كثيراً في السماء، فلا يُرى إلا منخفضاً قرب الأفق بعد الغروب أو قبل الشروق."},
  {id:"venus",b:"Venus",ar:"الزهرة",c:"#fff3d1",t:"ألمع جرم في السماء بعد الشمس والقمر. تسمى نجمة الصباح أو نجمة المساء، لأنها تظهر قرب الأفق قبل الشروق أو بعد الغروب."},
  {id:"mars",b:"Mars",ar:"المريخ",c:"#ff9566",t:"الكوكب الأحمر. يتغير لمعانه كثيراً لأن بعده عن الأرض يتغير كثيراً بين عام وآخر."},
  {id:"jupiter",b:"Jupiter",ar:"المشتري",c:"#f4dcb0",t:"أكبر كواكب المجموعة الشمسية. في المنظار العادي تظهر بجواره أقماره الأربعة الكبرى نقاطاً صغيرة."},
  {id:"saturn",b:"Saturn",ar:"زحل",c:"#e9d29a",t:"الكوكب ذو الحلقات. تظهر حلقاته في تلسكوب صغير بتكبير 30 مرة أو أكثر."},
  {id:"uranus",b:"Uranus",ar:"أورانوس",c:"#b9e6e8",t:"يحتاج إلى سماء مظلمة جداً ليُرى بالعين، والأسهل رصده بالمنظار."},
  {id:"neptune",b:"Neptune",ar:"نبتون",c:"#9fb8ff",t:"أبعد الكواكب عن الشمس. لا يُرى إلا بالمنظار أو التلسكوب."}
];
// الأطلس: محور الأعلى هو القطب السماوي الشمالي، والمطلع المستقيم يزداد نحو اليسار كما في خرائط السماء
const ATLAS = [[0,-1,0],[1,0,0],[0,0,1]];
const LINKS = window.SITE_LINKS || null;
const EMBED = !!window.ATLAS_EMBED; if(EMBED) document.body.classList.add("embed");
// الهاتف واللوحي (لمس): إضافات «يتبع هاتفك» والكرة الكاملة لا تغيّر شيئاً على الحاسوب
const COARSE = matchMedia("(pointer:coarse)").matches;
// زر الرجوع: ما فتحه القارئ في هذه الزيارة (منظر 3D، متابعة الهاتف بضغطته) يغلقه زر الرجوع قبل أن يخرج من الأطلس
const NAV={eye:false,ar:false,atlas:false,pushed:false,skip:false};
function moreLink(kind,id,label){ const u=LINKS&&LINKS[kind]&&LINKS[kind][id]; return u?`<a class="more" href="${u}" target="_top"><span class="mi"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6.5C10 5 7 4.5 4 5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V5c-3-.5-6 0-8 1.5zM12 6.5v13"/></svg></span><span class="mt"><b>${label}</b><small>في موسوعة السماء العربية</small></span><svg class="ma" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></a>`:""; }

// ================================================================ الحالة
const st = { city:"cairo", lat:30.04, lon:31.24, tz:"Africa/Cairo", live:true, t:Date.now(), play:0,
  mode:"sky", detail:"simple", night:false, clean:false, seen:{}, eye:false, eyeL:null, flipH:false, flipV:false, lp:2, az:180, alt:38, fov:105, layers:{}, sel:null, focus:null, ast:null, route:null, tour:-1, anim:null, prevMode:"sky", prevView:null };
LAYERS.forEach(l=>st.layers[l[0]]=l[2]); st.layers.arBelow=true;
// ما أخفاه القارئ بنفسه (طلب المالك 2026-11-16): كوكبات بالرمز («Ori») ونجوم برقم هيباركوس، تُحفظ في تفضيلات الأطلس
const HID={c:new Set(),s:new Set()};
// «نجومي» (#366): ما يختاره القارئ ليبقى وحده ظاهراً (on)، والباقي يختفي أو يبقى باهتاً (dim). PICK: وضع الاختيار بالضغط على السماء
const MY={on:false,dim:false,c:new Set(),s:new Set()}, PICK={on:false,t:"mine"}; // ما تحت الأفق أثناء متابعة الهاتف: مفعّل افتراضياً
// حالة «يتبع هاتفك» (تُعرَّف هنا لأن الرسم يقرؤها)
const AR={on:false,pending:false,paused:false,H:null,f:null,u:null,off:0,ios:null,ev:"",got:false,cam:null,msgT:0,t0:0,target:null,last:0,rel:false,absSeen:false,north:false,src:"",raw:0,lastT:0,capKey:"",vib:false};
const belowOn=()=>AR.on?!!st.layers.arBelow:!!st.layers.below;
// قياس السلاسة على هاتف حقيقي (#379): ‎/atlas/?perf يُظهر في أعلى الشاشة عدد الإطارات في الثانية وأبطأ إطار في آخر ثانيتين، والوضع
if(/[?&]perf/.test(location.search)){ const el=document.createElement("div"); el.id="perfBox"; el.style.cssText="position:fixed;z-index:99;top:calc(62px + env(safe-area-inset-top));left:50%;transform:translateX(-50%);padding:4px 10px;border-radius:8px;background:rgba(0,0,0,.75);color:#9f9;font:12px/1.4 ui-monospace,monospace;direction:ltr;pointer-events:none;white-space:nowrap";
  document.body.appendChild(el); let last=performance.now(); const fr=[];
  const tick=t=>{ fr.push([t,t-last]); last=t; while(fr.length&&t-fr[0][0]>2000) fr.shift(); const n=fr.length, worst=Math.max(...fr.map(f=>f[1])), slow=fr.filter(f=>f[1]>34).length;
    el.textContent=`${(n/2).toFixed(0)} fps · worst ${worst.toFixed(0)} ms · slow ${slow}/${n} · ${st.eye?"3D":st.mode} · ${devicePixelRatio}x`; requestAnimationFrame(tick); };
  requestAnimationFrame(tick); }
if(/[?&]debug/.test(location.search)){ window.__atlas=st; window.__hz=()=>horizonRegion(); window.__vaz=o=>{ if(o!==undefined) VAZ_OFF=!!o; return viewAz(); }; window.__hovp=()=>HOVP; window.__shown=()=>[...SHOWN]; window.__secl=()=>SECL; window.__ff=()=>frameDeg(); window.__pcap=()=>PCAP; window.__pl=id=>{ const o=bodies.find(x=>x.id===id), q=o&&projJ(o.v); return q?[q[0],q[1],CX,CY]:null; }; } // للاختبار الآلي فقط
// اسم المكان الذي فيه إحداثيات القارئ (موقعه الحالي أو ما كتبه بيده): {n: القرية أو المدينة، a: المحافظة، cc: الدولة، tz}
let NEAR=null;
function okTz(z){ try{ new Intl.DateTimeFormat("en",{timeZone:z}); return typeof z==="string"; }catch(e){ return false; } }
let GUESS=false; // أول زيارة بلا مدينة محفوظة: يُخمَّن مكان الزائر في boot (guessPlace، #349)
try{ const s=JSON.parse(localStorage.getItem("atlas-prefs")||"null"), OLD={alex:"alexandria",abudhabi:"abu-dhabi"};
  if(!(s&&s.city)){ const [cc,nm]=(localStorage.getItem("sky-place")||"").split("|"); const c=CITIES.find(x=>x[5]===cc&&x[1]===nm); if(c){ st.city=c[0]; st.lat=c[2]; st.lon=c[3]; st.tz=c[4]; } else GUESS=true; }
  if(s){ if(typeof s.city==="string"&&Number.isFinite(s.lat)&&Number.isFinite(s.lon)&&Math.abs(s.lat)<=90&&Math.abs(s.lon)<=180&&okTz(s.tz)){st.city=OLD[s.city]||s.city; st.lat=s.lat; st.lon=s.lon; st.tz=s.tz; if(!CITIES.some(x=>x[0]===st.city)){ if(Array.isArray(s.wc)&&s.wc[0]===st.city) WCITY=s.wc; else st.city="custom"; } } if(s.layers&&typeof s.layers==="object") for(const k in st.layers) if(typeof s.layers[k]==="boolean") st.layers[k]=s.layers[k]; if(s.hide&&typeof s.hide==="object"){ (s.hide.c||[]).forEach(x=>typeof x==="string"&&HID.c.add(x)); (s.hide.s||[]).forEach(x=>Number.isFinite(+x)&&HID.s.add(+x)); } if(s.mine&&typeof s.mine==="object"){ MY.on=s.mine.on===true; MY.dim=s.mine.dim===true; (s.mine.c||[]).forEach(x=>typeof x==="string"&&MY.c.add(x)); (s.mine.s||[]).forEach(x=>Number.isFinite(+x)&&MY.s.add(+x)); } if(s.mode==="sky"||s.mode==="atlas") st.mode=s.mode; if(s.eyeL&&typeof s.eyeL==="object") st.eyeL=s.eyeL; if(s.eye===true&&st.mode==="sky") st.eye=true; if(s.detail) st.detail=s.detail; if(s.night) st.night=true; if(s.clean&&!EMBED) st.clean=true; if(s.seen&&typeof s.seen==="object") st.seen=s.seen; if(s.follow==="finger"||s.follow==="phone") st.follow=s.follow; if(typeof s.lp==="number"&&s.lp>=0&&s.lp<=3) st.lp=s.lp; if(s.flip&&typeof s.flip==="object"){ st.flipH=s.flip.h===true; st.flipV=s.flip.v===true; } if(s.vib) AR.vib=true; if(st.city==="custom"&&s.near&&typeof s.near==="object"&&typeof s.near.n==="string"&&typeof s.near.a==="string"&&typeof s.near.cc==="string") NEAR={n:s.near.n,a:s.near.a,cc:s.near.cc,tz:okTz(s.near.tz)?s.near.tz:null}; } }catch(e){}
// علامات «رأيته» لا تُمحى (#399، مختبِر: جولة التعريف ظهرت مرة ثانية وحدها): نسخة أخرى من الأطلس مفتوحة معاً (تبويب آخر، أو خريطة الصفحة الرئيسية embed.html)
// كانت تحفظ إعداداتها بقيمة seen التي قرأتها قبل انتهاء الجولة فتمحو علامتها، فالآن تُضم العلامات المحفوظة قبل الحفظ، والعدّادات بأكبرها
function mergeSeen(){ try{ const o=JSON.parse(localStorage.getItem("atlas-prefs")||"null"), os=o&&o.seen; if(!os||typeof os!=="object") return; for(const k in os){ const v=os[k], m=st.seen[k]; if(typeof v==="number"&&typeof m==="number") st.seen[k]=Math.max(v,m); else if(m==null&&v!=null) st.seen[k]=v; } }catch(e){} }
// قلب الصورة يُحفظ فقط من النسخة التي غيّره القارئ فيها (#445): كانت كل نسخة من الأطلس (تبويب آخر، أو خريطة الرئيسية embed.html)
// تحفظ إعداداتها كلها عند أي حفظ، فنسخة قديمة فُتحت والقلب مفعّل تعيده بعد أن ألغاه القارئ في نسخة أخرى، فتظهر رسالة القلب كأنه بلا سبب
function flipToSave(){ if(FLIPW.mine) return {h:st.flipH,v:st.flipV}; try{ const o=JSON.parse(localStorage.getItem("atlas-prefs")||"null"); if(o&&o.flip&&typeof o.flip==="object") return {h:o.flip.h===true,v:o.flip.v===true}; }catch(e){} return {h:st.flipH,v:st.flipV}; }
function savePrefs(){ mergeSeen(); try{ localStorage.setItem("atlas-prefs",JSON.stringify({eye:st.eye,eyeL:st.eyeL,city:st.city,wc:WCITY&&WCITY[0]===st.city?WCITY:null,lat:st.lat,lon:st.lon,tz:st.tz,near:st.city==="custom"?NEAR:null,layers:BELOW_TMP?Object.assign({},st.layers,{below:false}):st.layers,mode:st.focus?st.prevMode:st.mode,detail:st.detail,night:st.night,clean:st.clean,seen:st.seen,follow:st.follow||null,vib:AR.vib,flip:flipToSave(),lp:st.lp,hide:{c:[...HID.c],s:[...HID.s]},mine:{on:MY.on,dim:MY.dim,c:[...MY.c],s:[...MY.s]}})); }catch(e){} }

// ================================================================ البيانات
const NAMES=SKY.names, CUR=SKY.curated;
const CONS={}, CONLAB=[];
SKY.cons.forEach(c=>{ CONLAB.push(c); if(!CONS[c.id]) CONS[c.id]=c; });
const conById = id => CONS[id];
function vec(ra,dec){ const r=ra*D2R,d=dec*D2R,c=Math.cos(d); return [c*Math.cos(r),c*Math.sin(r),Math.sin(d)]; }
function radec(v){ return {ra:(Math.atan2(v[1],v[0])*R2D+360)%360, dec:Math.asin(Math.max(-1,Math.min(1,v[2])))*R2D}; }
function dot(a,b){ return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]; }
function nrm(v){ const l=Math.hypot(v[0],v[1],v[2])||1; return [v[0]/l,v[1]/l,v[2]/l]; }
const N=SKY.stars.length, SV=new Float64Array(N*3);
SKY.stars.forEach((s,i)=>{ const v=vec(s[0],s[1]); SV[i*3]=v[0]; SV[i*3+1]=v[1]; SV[i*3+2]=v[2]; });
const starIdx={}; SKY.stars.forEach((s,i)=>starIdx[s[4]]=i);
const DATA_MAX=SKY.stars.reduce((m,x)=>Math.max(m,x[2]),0);
const starV = hip=>{ const i=starIdx[hip]; return i==null?null:[SV[i*3],SV[i*3+1],SV[i*3+2]]; };
const MWV=SKY.mw.map(p=>[vec(p[0],p[1]),p[2]]);
const LINEV={}; for(const k in SKY.lines) LINEV[k]=SKY.lines[k].map(seg=>seg.map(p=>vec(p[0],p[1])));
// خطوط الاهتداء: كيف تقودك الكوكبة إلى نجوم لامعة حولها (تظهر في الشكل البسيط)
const POINTERS={
  Ori:[{p:[25930,26311,26727,32349],t:"الحزام يشير إلى الشعرى اليمانية"},{p:[26727,26311,25930,21421],t:"وفي الاتجاه الآخر إلى الدبران"}],
  UMa:[{p:[53910,54061,11767],t:"الدليلان يشيران إلى الجدي"},{p:[62956,65378,67301,69673],t:"انحناء اليد يقود إلى السماك الرامح"}],
  CMa:[{p:[25930,26311,26727,32349],t:"حزام الجبار يقود إلى الشعرى"}],
  Tau:[{p:[26727,26311,25930,21421],t:"حزام الجبار يقود إلى الدبران"}],
  UMi:[{p:[53910,54061,11767],t:"الدليلان في الدب الأكبر يشيران إلى الجدي"}],
  Boo:[{p:[62956,65378,67301,69673],t:"انحناء يد الدب الأكبر يقود إلى السماك الرامح"}],
};
const FIG={}; for(const k in SKY.figure) FIG[k]=new Set(SKY.figure[k]);
const SIMPLEV={}; for(const k in SKY.simple) SIMPLEV[k]=SKY.simple[k].map(seg=>seg.map(p=>vec(p[0],p[1])));
const lineSet=()=>st.layers.fullLines?LINEV:SIMPLEV;
const BOUNDV={}; for(const k in SKY.bounds) BOUNDV[k]=SKY.bounds[k].map(r=>r.map(p=>vec(p[0],p[1])));
SKY.cons.forEach(c=>c.v=vec(c.c[0],c.c[1]));
SKY.dsos.forEach(d=>{ d.v=vec(d.ra,d.dec); try{ d.con=A.Constellation(d.ra/15,d.dec).symbol; }catch(e){ d.con=""; } });
SKY.mansions.forEach(m=>{ m.pv=m.p.map(p=>vec(p[0],p[1])); let x=0,y=0,z=0; m.pv.forEach(v=>{x+=v[0];y+=v[1];z+=v[2];}); m.v=nrm([x,y,z]); });
SKY.asts.forEach(a=>{ a.pv=a.stars.map(starV); let x=0,y=0,z=0; a.pv.forEach(v=>{x+=v[0];y+=v[1];z+=v[2];}); a.v=nrm([x,y,z]); });
const ASTS={}; SKY.asts.forEach(a=>ASTS[a.id]=a);
const ROUTES={}; (SKY.routes||[]).forEach(r=>{ r.pv=r.path.filter(Boolean).map(n=>vec(n[0],n[1])); r.sv=r.shape.map(seg=>seg.filter(Boolean).map(n=>vec(n[0],n[1]))); r.refs=r.path.filter(Boolean).map(n=>n[2]); r.shapeRefs=[].concat(...r.shape.map(seg=>seg.filter(Boolean).map(n=>n[2]))); ROUTES[r.id]=r; });
const routeAll=r=>r.pv.concat(...r.sv);
const ECL=[]; { const e=23.4393*D2R; for(let l=0;l<=360;l+=2){ const L=l*D2R; ECL.push([Math.cos(L),Math.sin(L)*Math.cos(e),Math.sin(L)*Math.sin(e)]); } }
const EQU=[]; for(let a=0;a<=360;a+=2) EQU.push(vec(a,0));
// انتماء كل نجم إلى كوكبته (يُحسب مرة واحدة عند الحاجة)
let STARCON=null, SCP=null, SCI=0;
function starConAt(i){ const s=SKY.stars[i]; try{ return A.Constellation(s[0]/15,s[1]).symbol; }catch(e){ return ""; } }
function starCons(){ if(STARCON) return STARCON; if(!SCP) SCP=new Array(N); for(;SCI<N;SCI++) SCP[SCI]=starConAt(SCI); return STARCON=SCP; }
// يحسبها وقت الفراغ بدفعات لا تتجاوز ما يسمح به المتصفح، فلا تصير مهمة طويلة تؤخر لمسة القارئ
function starConsIdle(dl){ if(STARCON) return; if(!SCP) SCP=new Array(N); const t=performance.now();
  while(SCI<N&&(dl&&dl.timeRemaining&&!dl.didTimeout?dl.timeRemaining()>2:performance.now()-t<8)){ const e=Math.min(N,SCI+200); for(;SCI<e;SCI++) SCP[SCI]=starConAt(SCI); }
  if(SCI>=N){ STARCON=SCP; return; } if(window.requestIdleCallback) requestIdleCallback(starConsIdle,{timeout:3000}); else setTimeout(starConsIdle,50); }
function conOfStar(hip){ const n=NAMES[hip]; if(n&&n[3]&&CONS[n[3]]) return n[3]; const i=starIdx[hip]; if(i==null) return null; return starCons()[i]; }

function starName(hip){ const n=NAMES[hip]; return n?n[0]:""; }
function shortName(t){ return (t||"").split(" (")[0]; }
function bayerAr(n){ if(!n||!n[2]) return ""; const g=n[2].replace(/\d+$/,""); const c=CONS[n[3]]; const gl=GREEK[g]; if(!c) return ""; if(!gl) return /^[A-Za-z]$/.test(g)?g+" "+shortName(c.ar):""; return gl+(n[2].length>g.length?" "+n[2].slice(g.length):"")+" "+shortName(c.ar); }
// اسم عربي يحمله أكثر من نجم في الكوكبة نفسها (أسماء المجموعات: العواء، الشرطان، سعد بلع…، #341): يُميَّز بحرف باير بين قوسين،
// «العواء (غاما)». الحرف تسمية فلكية ثابتة، فلا يحتاج مرجعاً. النجم الذي له اسم وحيد في كوكبته يبقى كما هو.
let DUPN=null;
function dupTag(hip){ const n=NAMES[hip]; if(!n||!n[0]||!n[3]) return "";
  if(!DUPN){ DUPN={}; for(const h in NAMES){ const m=NAMES[h]; if(m&&m[0]&&m[3]){ const k=m[3]+"|"+shortName(m[0]).replace(/[\u064B-\u0652]/g,""); DUPN[k]=(DUPN[k]||0)+1; } } }
  if((DUPN[n[3]+"|"+shortName(n[0]).replace(/[\u064B-\u0652]/g,"")]||0)<2) return "";
  if(n[2]){ const g=n[2].replace(/\d+$/,""); return (GREEK[g]||g)+(n[2].length>g.length?" "+n[2].slice(g.length):""); } return n[4]?String(n[4]):(n[1]||""); }
// نجم اسمه العربي اسم كوكبة (الحمل، الغراب، العقاب…، #382، المالك 2026-11-19): يُميَّز في الأسماء عن الكوكبة بحرف باير،
// «الحمل (ألفا)» إن كان في كوكبته نفسها، و«الميزان (دلتا العقاب)» إن كان في كوكبة أخرى، لأن القارئ يخلطه باسم الكوكبة المرسوم قربه
let CONN=null;
const deDia=t=>shortName(t).replace(/[\u064B-\u0652]/g,"");
function conTwin(hip){ const n=NAMES[hip]; if(!n||!n[0]||!n[2]) return "";
  if(!CONN){ CONN={}; for(const id in CONS) CONN[deDia(CONS[id].ar)]=id; }
  const id=CONN[deDia(n[0])]; if(!id) return ""; if(id!==n[3]) return bayerAr(n);
  const g=n[2].replace(/\d+$/,""); return (GREEK[g]||g)+(n[2].length>g.length?" "+n[2].slice(g.length):""); }
function starShort(hip){ if(+hip===11767) return "الجَدْي (القطبي)"; /* المالك 2026-11-19: نجم الجدي غير كوكبة الجدي */ const t=shortName(starTitle(hip)), d=conTwin(hip)||dupTag(hip); return d?t+" ("+d+")":t; }
function starTitle(hip){ const n=NAMES[hip]; if(n&&n[0]) return n[0]; const b=bayerAr(n); if(b) return b; if(n&&n[4]&&CONS[n[3]]) return n[4]+" "+shortName(CONS[n[3]].ar); if(n&&n[1]) return n[1]; return "نجم HIP "+hip; }

// ================================================================ الزمن والمكان
let obs=new A.Observer(st.lat,st.lon,0);
function curTime(){ return new Date(st.t); }
// المنسق يُبنى مرة لكل منطقة زمنية وخيارات ويُحفظ: بناؤه في كل استدعاء كان أثقل ما في تحديث الساعة عند فتح الأطلس
const FMTS=new Map();
function fmtr(o){ const k=JSON.stringify(o); let f=FMTS.get(k); if(!f){ f=new Intl.DateTimeFormat("ar-u-nu-latn",o); FMTS.set(k,f); } return f; }
function fmt(d,opt){ const o=Object.assign({timeZone:st.tz||undefined},opt); try{ return fmtr(o).format(d); }catch(e){ delete o.timeZone; return fmtr(o).format(d); } }
const fTime=d=>fmt(d,{hour:"numeric",minute:"2-digit"});
// السنة تُذكر حين لا تكون سنة اليوم، فلا يبدو يونيو 2126 كأنه هذا العام (#441)
const otherYear=d=>{ try{ return tzParts(+d).y!==tzParts(Date.now()).y; }catch(e){ return false; } };
const yr=(d,o)=>otherYear(d)?Object.assign({},o,{year:"numeric"}):o;
const fDay=d=>fmt(d,yr(d,{weekday:"long",day:"numeric",month:"long"}));
function tzParts(ms){ const o={timeZone:st.tz||undefined,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}; let p; try{ p=new Intl.DateTimeFormat("en-US",o).formatToParts(new Date(ms)); }catch(e){ delete o.timeZone; p=new Intl.DateTimeFormat("en-US",o).formatToParts(new Date(ms)); } const g=t=>+p.find(x=>x.type===t).value; return {y:g("year"),mo:g("month"),d:g("day"),h:g("hour")%24,mi:g("minute")}; }
function zonedToUtc(y,mo,d,h,mi){ let guess=Date.UTC(y,mo-1,d,h,mi); for(let i=0;i<2;i++){ const p=tzParts(guess); guess+=Date.UTC(y,mo-1,d,h,mi)-Date.UTC(p.y,p.mo-1,p.d,p.h,p.mi); } return guess; }

// ================================================================ الحساب
let M=null, MR=null, C=null, H=null, sunAlt=-90, bodies=[], frameT=0, frameObs=null;
function computeSky(){
  const time=A.MakeTime(curTime());
  const R=A.Rotation_EQJ_HOR(time,obs);
  const col=i=>{ const v=A.RotateVector(R,new A.Vector(i===0?1:0,i===1?1:0,i===2?1:0,time)); return [-v.y,v.x,v.z]; };
  const c0=col(0),c1=col(1),c2=col(2);
  M=[[c0[0],c1[0],c2[0]],[c0[1],c1[1],c2[1]],[c0[2],c1[2],c2[2]]];
  bodies=BODIES.map(b=>{ const eq=A.Equator(b.b,time,obs,false,true); const v=vec(eq.ra*15,eq.dec); let mag=null,phase=null,frac=null;
    if(b.id!=="sun"){ try{ const il=A.Illumination(b.b,time); mag=il.mag; phase=il.phase_angle; frac=il.phase_fraction; }catch(e){} }
    return Object.assign({},b,{v,ra:eq.ra*15,dec:eq.dec,dist:eq.dist,mag,phase,frac}); });
  sunAlt=Math.asin(dot(M[2],bodies[0].v))*R2D; frameT=st.t; frameObs=obs;
  SECL=solarEclipse();
}
// كسوف الشمس كما يُرى من المكان (#441، اقتراح تقرير الاختبار): موضعا الشمس والقمر من مكان الراصد (A.Equator مع obs)،
// ونصف قطر كل منهما من بعده الحقيقي (الشمس 695,700 كم والقمر 1737.4 كم من NASA). obsc نسبة ما يحجبه القمر من مساحة قرص الشمس،
// وk ما يبقى من ضوء السماء نهاراً: يقل خطياً مع الحجب، وفي الكلية تبلغ سماء سمت الرأس ما قيس فعلاً: 12.99 و13.27 قدراً/ثانية قوسية²
// في كسوف 8 أبريل 2024 (Birriel وآخرون، JAAVSO 54، 2026، ص 66، وفيه أن السطوع خطي مع الحجب حتى 99.8%)، فنأخذ 13.1، أسطع قليلاً من الشفق البحري.
// (كان k ثابتاً 10⁻³ من سماء النهار، فبلغت الكلية في النموذج نحو 10.9، أسطع من القياس بنحو 7 مرات، #443)
const ECL_TOTAL_SQM=13.1;
let SECL=null;
function solarEclipse(){ const s=bodies[0], m=bodies[1]; if(!s||!m||!s.dist||!m.dist) return null;
  const rs=Math.atan(695700/(s.dist*AU_KM))*R2D, rm=Math.atan(1737.4/(m.dist*AU_KM))*R2D, sep=Math.acos(Math.max(-1,Math.min(1,dot(s.v,m.v))))*R2D;
  if(sep>=rs+rm) return null;
  let area; if(sep<=Math.abs(rs-rm)) area=Math.PI*Math.min(rs,rm)**2;
  else { const a=Math.acos((sep*sep+rs*rs-rm*rm)/(2*sep*rs)), b=Math.acos((sep*sep+rm*rm-rs*rs)/(2*sep*rm));
    area=rs*rs*a+rm*rm*b-0.5*Math.sqrt(Math.max(0,(-sep+rs+rm)*(sep+rs-rm)*(sep-rs+rm)*(sep+rs+rm))); }
  const obsc=Math.min(1,area/(Math.PI*rs*rs)), total=sep<=rm-rs, annular=!total&&sep<=rs-rm;
  let kT=1.3e-4; try{ kT=Math.min(1,XPS.magToLum(ECL_TOTAL_SQM)/XPS.magToLum(XPS.zenithMag(Math.max(0,sunAlt)))); }catch(e){}
  return {rs,rm,sep,obsc,total,annular,mag:(rs+rm-sep)/(2*rs),k:total?kT:Math.max(kT,1-obsc)}; }
const ECLK=()=>SECL&&sunAlt>-1?SECL.k:1;
// كسوف يُرى الآن من المكان (الشمس فوق الأفق)
function eclNow(){ if(!M||frameT!==st.t) computeSky(); return SECL&&sunAlt>-1?SECL:null; }
// القرص والإكليل يملآن نحو ربع الشاشة، والعرض يتبع الشمس وهي تتحرك في السماء
function eclZoom(){ const e=eclNow(); if(!e) return; const sun=bodies[0]; st.trackId="sun";
  if(!(st.sel&&st.sel.type==="body"&&st.sel.id==="sun")) st.sel={type:"body",id:"sun"}; showInfo(st.sel);
  if(AR.on&&!AR.paused) arPause(); if(st.mode==="sky"&&altAz(sun.v).alt<-1&&!st.layers.below) tmpBelow(); animateTo(sun.v,Math.max(0.6,e.rs*2*5.2)); }
// سطر الكسوف في بطاقة الشمس والقمر، ومعه تحذير العين نفسه الذي في بطاقة الكسوف (ecl_card.js)
function eclLine(){ const e=eclNow(); if(!e) return ""; const pct=Math.round(e.obsc*100), P=esc(placeName());
  const t=e.total?`<b>كسوف كلي للشمس الآن</b> في سماء ${P}: القمر يحجب قرص الشمس كله، فتظلم السماء وتظهر الكواكب وألمع النجوم في وسط النهار.`
    :e.annular?`<b>كسوف حلقي للشمس الآن</b> في سماء ${P}: القمر أصغر من أن يغطي الشمس، فتبقى حوله حلقة منها، ويحجب ${pct}% من قرصها.`
    :`<b>كسوف جزئي للشمس الآن</b> في سماء ${P}: القمر يحجب ${pct}% من قرص الشمس.`;
  return `<div class="ocLight">${t} لا تنظر إلى الشمس أثناء الكسوف إلا بنظارة كسوف معتمدة، فالنظارة الشمسية العادية لا تحمي العين.${!EMBED&&st.trackId!=="sun"&&st.fov>e.rs*2*12?` <button class="chip" data-eclz="1">قرّب إلى الكسوف</button>`:""}</div>`; }
function altAz(v){ if(!M) computeSky(); /* بعد تغيير المكان تُحسب السماء عند أول رسم، وقد يُطلب موضع جرم قبله (رابط أو بحث) */ const e=dot(M[0],v),n=dot(M[1],v),u=dot(M[2],v); return {alt:Math.asin(Math.max(-1,Math.min(1,u)))*R2D, az:(Math.atan2(e,n)*R2D+360)%360}; }
function frameAz(v){ const R=st.mode==="atlas"?ATLAS:M; const e=dot(R[0],v),n=dot(R[1],v),u=dot(R[2],v); return {alt:Math.asin(Math.max(-1,Math.min(1,u)))*R2D, az:(Math.atan2(e,n)*R2D+360)%360}; }
function dirName(az){ return DIRS[Math.round(az/45)%8]; }
function camera(){
  MR = st.mode==="atlas"? ATLAS : M;
  if(AR.on&&AR.H&&!AR.paused&&st.mode!=="atlas"){ H=AR.H; C=[0,1,2].map(i=>[0,1,2].map(j=>H[i][0]*MR[0][j]+H[i][1]*MR[1][j]+H[i][2]*MR[2][j])); return; }
  const a=st.alt*D2R,z=st.az*D2R, f=[Math.cos(a)*Math.sin(z),Math.cos(a)*Math.cos(z),Math.sin(a)];
  // محور اليمين يتبع السمت وحده، فيستمر الميل بانسياب بعد سمت الرأس (أو القطب) وتظهر السماء مقلوبة كمن يميل رأسه إلى الخلف
  const r=[Math.cos(z),-Math.sin(z),0];
  const u=[r[1]*f[2]-r[2]*f[1],r[2]*f[0]-r[0]*f[2],r[0]*f[1]-r[1]*f[0]];
  H=[r,u,f];
  C=[0,1,2].map(i=>[0,1,2].map(j=>H[i][0]*MR[0][j]+H[i][1]*MR[1][j]+H[i][2]*MR[2][j]));
}

// ================================================================ مساحة العرض
const cv=document.getElementById("sky"), ctx=cv.getContext("2d"), info=document.getElementById("info");
let W=0,Ht=0,DPR=1,S=1,SX=1,SY=1,FX=1,FY=1,CX=0,CY=0,DMIN=1, vp={cx:0,cy:0,d:1}, vpT=null;
function resize(){ DPR=Math.min(window.devicePixelRatio||1,2.5); W=window.innerWidth; Ht=window.innerHeight; cv.width=Math.round(W*DPR); cv.height=Math.round(Ht*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); vpT=null; dirty=true; }
// المساحة الحرة من السماء بين الأشرطة: حدودها العليا والسفلى من ارتفاع الأشرطة الظاهرة
let barTop=0, barBot=0;
function measureBars(){
  const bare=EMBED||st.clean||document.body.classList.contains("ar");
  barTop=bare?0:document.querySelector(".top").getBoundingClientRect().bottom;
  barBot=bare?0:Math.max(0,Ht-document.querySelector(".bottom").getBoundingClientRect().top);
}
function targetViewport(){
  if(AR.on) return {cx:W/2,cy:Ht/2,d:Math.min(W,Ht),t:0,b:Ht,l:0,r:W}; // مركز الشاشة هو اتجاه ظهر الهاتف
  const narrow=W<=720; let l=0,r=0;
  let t=barTop+(barTop?2:8), b=barBot+(barBot?2:8);
  if(!info.hidden){ const rc=info.getBoundingClientRect(); if(narrow) b=Math.max(b,Ht-rc.top+6); else r=W-rc.left+6; }
  const fb=document.getElementById("focusBar"); if(!fb.hidden&&!EMBED){ const rc=fb.getBoundingClientRect(); t=Math.max(t,rc.bottom+4); }
  const w=Math.max(160,W-l-r), h=Math.max(160,Ht-t-b);
  return {cx:l+w/2, cy:t+h/2, d:Math.min(w,h), t, b:Ht-b, l, r:W-r};
}
function updateViewport(snap){ const T=targetViewport(); if(snap||!vpT){ vp=T; vpT=T; return; } vpT=T; const k=0.22; const dx=T.cx-vp.cx,dy=T.cy-vp.cy,dd=T.d-vp.d; if(Math.abs(dx)+Math.abs(dy)+Math.abs(dd)<0.5){ vp=T; return; } vp={cx:vp.cx+dx*k,cy:vp.cy+dy*k,d:vp.d+dd*k}; dirty=true; }
// «كأنك هناك»: إسقاط منظوري (كعين الإنسان أو عدسة الكاميرا) بدل الإسقاط المجسم، فلا تنحني السماء ولا تتمدد عند الأطراف
let PERSP=false; const EYE=()=>st.eye&&st.mode==="sky"&&!EMBED;
// في 3D تُقاس زاوية الرؤية على الضلع الطويل للشاشة (العرض على الكمبيوتر)، كعين الإنسان: 60 درجة عند الفتح و90 أقصى حد،
// فلا تظهر جهتان متعامدتان (الجنوب والشرق) معاً. وأثناء متابعة الهاتف تبقى على عرض الشاشة كالكاميرا
function scale(){ CX=vp.cx; CY=vp.cy; DMIN=vp.d; PERSP=EYE(); const LONG=PERSP&&!AR.on?Math.max(W,Ht):DMIN; S=PERSP?(LONG/2)/Math.tan(st.fov*D2R/2):(DMIN/2)/(2*Math.tan(st.fov*D2R/4));
  // قلب الصورة كعين التلسكوب: لا يُطبَّق أثناء متابعة الهاتف (الشاشة نافذة على السماء الحقيقية)، ولا في 3D (المكان كما تقف فيه)،
  // ولا في الخريطة المضمنة في الرئيسية (#335: كانت الأرض تظهر فوق السماء في 3D، ويعود القلب فجأة حين تتوقف المتابعة)
  const flipOK=!AR.on&&!PERSP&&!EMBED; FX=st.flipH&&flipOK?-1:1; FY=st.flipV&&flipOK?-1:1; SX=S*FX; SY=S*FY;
  FLIPW.on=FX<0||FY<0; }
// لا رسالة على الشاشة عن القلب (#447، المالك 2026-11-21: كانت رسالة «… معكوسان، لأن قلب الصورة مفعّل» تظهر عند كل فتح للأطلس والقلب محفوظ،
// والقلب اختيار القارئ نفسه، وقاعدته منذ 2026-11-06 ألا تُكتب على الشاشة عبارة عن القلب). mine: القارئ غيّر القلب في هذه النسخة، فتحفظه (#445)
const FLIPW={on:false,user:false,mine:false};
function projC(x,y,z){ if(PERSP){ if(z<0.02) return null; const k=1/z; return [CX+SX*k*x,CY-SY*k*y,z]; } if(z<-0.9) return null; const k=2/(1+z); return [CX+SX*k*x,CY-SY*k*y,z]; }
// عكس الإسقاط على الشاشة: اتجاه النقطة (a,b) في إطار الكاميرا
function unproj(a,b){ if(PERSP){ const L=Math.hypot(a,b,1); return [a/L,b/L,1/L]; } const rho2=a*a+b*b,z=(4-rho2)/(4+rho2); return [a*(1+z)/2,b*(1+z)/2,z]; }
const magK=z=>PERSP?1/Math.max(0.02,z):2/(1+z);
function projJ(v){ return projC(dot(C[0],v),dot(C[1],v),dot(C[2],v)); }
function projH(e,n,u){ const v=[e,n,u]; return projC(dot(H[0],v),dot(H[1],v),dot(H[2],v)); }
function hor(az,alt){ const a=alt*D2R,z=az*D2R; return [Math.cos(a)*Math.sin(z),Math.cos(a)*Math.cos(z),Math.sin(a)]; }
function onScreen(p,m){ m=m||0; return p&&p[0]>-m&&p[0]<W+m&&p[1]>-m&&p[1]<Ht+m; }
// عكس الإسقاط: اتجاه النقطة (x,y) من الشاشة في إطار العرض (شرق، شمال، أعلى)، وارتفاعها وسمتها فيه
function screenDir(x,y){ camera(); scale(); const c=unproj((x-CX)/SX,-(y-CY)/SY);
  return [0,1,2].map(j=>H[0][j]*c[0]+H[1][j]*c[1]+H[2][j]*c[2]); }
function azAltOf(e){ return {az:(Math.atan2(e[0],e[1])*R2D+360)%360, alt:Math.asin(Math.max(-1,Math.min(1,e[2])))*R2D}; }
// حدود ميل النظر: في سماء مكاني من تحت الأفق قليلاً إلى ما بعد سمت الرأس حتى الأفق المقابل، وفي الأطلس بلا حدود (يلتف)
// وفي سماء مكاني يستمر السحب بعد سمت الرأس حتى يقترب الأفق المقابل من المركز، فيظهر أعلى الدائرة كما يراه من يميل رأسه إلى الخلف
const altLow=()=>st.mode==="atlas"?-1e9:AR.on||st.layers.below?-89.5:-25, altHigh=()=>st.mode==="atlas"?1e9:175;
function setAlt(a){ st.alt=st.mode==="atlas"?Math.max(-89.5,Math.min(89.5,a)):Math.max(altLow(),Math.min(altHigh(),a)); }
// اتجاه النظر الفعلي (حين يميل النظر بعد سمت الرأس يصير السمت المقابل)، وهل العرض مقلوب
function viewDir(){ camera(); return azAltOf(H[2]); }
const upsideDown=()=>Math.cos(st.alt*D2R)<-1e-6;
function screenOf(e){ camera(); scale(); const c=[0,1,2].map(i=>dot(H[i],e)); return projC(c[0],c[1],c[2]); }
function zoomAt(x,y,f){ st.anim=null; zoomLinear(x,y,f); }
// السحب والتكبير كبرامج القبة السماوية: الأفقي يغيّر الجهة وحدها، والعمودي يغيّر الارتفاع وحده، فلا تدور السماء أبداً
// (الطريقة السابقة كانت تُبقي النجم تحت المؤشر تماماً، فتدور السماء كلها قرب سمت الرأس)
function degPerPx(){ scale(); return 1/(S*D2R); }
// قفل المحور: أول ما تتحرك اليد نعرف هل السحب عمودي أم أفقي، فيبقى كذلك طوال السحبة ولا يتحول ارتجاف اليد إلى دوران
let dragAxis=null, axSum=[0,0];
function axisLock(dx,dy){ if(dragAxis===false) return [dx,dy]; axSum[0]+=dx; axSum[1]+=dy; const ax=Math.abs(axSum[0]),ay=Math.abs(axSum[1]);
  if(!dragAxis){ if(ax+ay<10) return [0,0]; dragAxis=ay>1.4*ax?"v":ax>1.4*ay?"h":"f"; axSum=[0,0]; return dragAxis==="v"?[0,dy]:dragAxis==="h"?[dx,0]:[dx,dy]; }
  // إن غيّر القارئ اتجاه يده بوضوح نترك القفل
  if(dragAxis==="v"&&ax>60&&ax>ay){ dragAxis="f"; } else if(dragAxis==="h"&&ay>60&&ay>ax){ dragAxis="f"; }
  return dragAxis==="v"?[0,dy]:dragAxis==="h"?[dx,0]:[dx,dy]; }
function panLinear(dx,dy){ const k=degPerPx(); dx*=FX; dy*=FY;
  // قرب سمت الرأس يصير تغيير الجهة دوراناً للدائرة كلها، فنخففه، وبعد سمت الرأس تنعكس الحركة الأفقية لتتبع السماء اليد
  { const c=Math.cos(st.alt*D2R); dx*=(c<0?-1:1)*Math.max(0.25,Math.min(1,Math.abs(c)/0.5)); }
  st.az=((st.az-dx*k)%360+360)%360; setAlt(st.alt+dy*k); dirty=true; }
function zoomLinear(x,y,f){ ZA=[x,y]; scale(); x=CX+(x-CX)*FX; y=CY+(y-CY)*FY; const k0=1/(S*D2R), ox=(x-CX)*k0, oy=(y-CY)*k0; setFov(f); scale(); const k1=1/(S*D2R);
  // قرب سمت الرأس يصير تغيير الجهة دوراناً للسماء كلها، فنخففه هناك ويبقى التقريب نحو المؤشر في الارتفاع
  const c=st.mode==="atlas"?1:Math.max(0,Math.cos(st.alt*D2R));
  // التكبير لا يعبر سمت الرأس أبداً: العبور يكون بالسحب وحده
  const a0=st.alt; st.az=((st.az+(ox-(x-CX)*k1)*c)%360+360)%360; setAlt(st.alt-(oy-(y-CY)*k1));
  if(st.mode==="sky"){ if(a0<=89.5&&st.alt>89.5) st.alt=89.5; else if(a0>=90.5&&st.alt<90.5) st.alt=90.5; } dirty=true; }

// ================================================================ الألوان والصور
const BV=[[-0.4,[155,178,255]],[0,[202,216,255]],[0.3,[248,247,255]],[0.6,[255,244,232]],[0.9,[255,228,196]],[1.2,[255,210,161]],[1.6,[255,181,108]],[2.2,[255,160,90]]];
function bvColor(bv){ for(let i=1;i<BV.length;i++){ if(bv<=BV[i][0]){ const a=BV[i-1],b=BV[i],t=(bv-a[0])/(b[0]-a[0]); return [0,1,2].map(k=>Math.round(a[1][k]+(b[1][k]-a[1][k])*Math.max(0,t))); } } return BV[BV.length-1][1]; }
const SCOL=SKY.stars.map(s=>"rgb("+bvColor(s[3]).join(",")+")");
function sprite(stops){ const c=document.createElement("canvas"); c.width=c.height=64; const b=c.getContext("2d"),g=b.createRadialGradient(32,32,0,32,32,32); stops.forEach(s=>g.addColorStop(s[0],s[1])); b.fillStyle=g; b.fillRect(0,0,64,64); return c; }
const blob=sprite([[0,"rgba(220,225,255,1)"],[.5,"rgba(200,210,245,.45)"],[1,"rgba(200,210,245,0)"]]);
const glow=sprite([[0,"rgba(255,255,255,.9)"],[.25,"rgba(255,255,255,.25)"],[1,"rgba(255,255,255,0)"]]);
let FUI="sans-serif",FDISP="serif";
function readFonts(){ const cs=getComputedStyle(document.documentElement); FUI=cs.getPropertyValue("--font-ui").trim(); FDISP=cs.getPropertyValue("--font-display").trim(); }
const BRASS="#cfa955", BRASS_HI="rgba(236,200,122,.88)", LINE="rgba(140,172,230,.5)", LINE_DIM="rgba(150,182,232,.09)";

// ================================================================ الأرض والأفق
function eyeHorizon(){
  const vd=viewDir(), base=vd.az, P=a=>{ const h=hor(a,0); return projH(h[0],h[1],h[2]); };
  let a=null,b=null; for(const o of [80,60,40,20,8]){ const p=P(base-o),q=P(base+o); if(p&&q&&Math.hypot(q[0]-p[0],q[1]-p[1])>1){ a=p; b=q; break; } }
  if(!a) return vd.alt>0?{type:"none"}:{type:"full"};
  let z=null; for(const al of [8,25,50,80]){ const h=hor(base,al); z=projH(h[0],h[1],h[2]); if(z) break; }
  const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;
  if(!z){ const t=(CX-a[0])*ux+(CY-a[1])*uy, fx=a[0]+ux*t, fy=a[1]+uy*t; z=[2*fx-CX,2*fy-CY]; if(Math.hypot(z[0]-CX,z[1]-CY)<1) z=[CX,CY-1e4]; }
  return {type:"line",a:[a[0]-ux*2e4,a[1]-uy*2e4],b:[b[0]+ux*2e4,b[1]+uy*2e4],z};
}
function horizonRegion(){ if(PERSP) return eyeHorizon();
  // نقاط على الأفق؛ إن وقعت إحداها في نقطة لا تُسقط (خلف المشاهد تماماً) نجرب زوايا أخرى
  const P=(a)=>{ const h=hor(a,0); return projH(h[0],h[1],h[2]); };
  let pts=[st.az-90,st.az,st.az+90].map(P);
  for(const o of [60,120,30,150]){ if(pts.every(Boolean)) break; pts=[st.az-o,st.az+180,st.az+o].map(P); }
  // سمت الرأس قد لا يُسقط حين ننظر إلى أسفل الأفق، فنستعمل نقطة عالية أخرى تدل على جهة السماء
  let z=projH(0,0,1);
  for(const a of [60,45,30,15]){ if(z) break; const h=hor(st.az,a); z=projH(h[0],h[1],h[2]); }
  if(!z) z=[W/2,-1e5];
  if(!pts.every(Boolean)) return {type:"line",a:[-1e5,0],b:[1e5,0],z};
  const c=circle3(pts);
  if(c) return hzCircle(c,Math.hypot(z[0]-c.x,z[1]-c.y)<c.r,z);
  return {type:"line",a:pts[0],b:pts[2],z};
}
// الدائرة المارة بثلاث نقاط على الشاشة (الدوائر العظمى تُسقط دوائر في هذا الإسقاط)
function circle3([p1,p2,p3]){ const ax=p1[0],ay=p1[1],bx=p2[0],by=p2[1],cx=p3[0],cy=p3[1], d=2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by));
  if(Math.abs(d)<1e-6) return null; const ux=((ax*ax+ay*ay)*(by-cy)+(bx*bx+by*by)*(cy-ay)+(cx*cx+cy*cy)*(ay-by))/d, uy=((ax*ax+ay*ay)*(cx-bx)+(bx*bx+by*by)*(ax-cx)+(cx*cx+cy*cy)*(bx-ax))/d, r=Math.hypot(ax-ux,ay-uy);
  return isFinite(r)?{x:ux,y:uy,r}:null; }
// دائرة الأفق على الشاشة. عند التكبير الكبير تصير ضخمة (نصف قطرها ملايين البكسلات) فلا يرسمها المتصفح بدقة، وكانت تُستبدل بوتر
// يمر بنقطتين بعيدتين على جانبي الشاشة فيظهر خط الأفق والأرض في وسط السماء (#313). الآن: إن كانت الشاشة كلها في جهة واحدة
// فهي سماء كلها أو أرض كلها، وإلا نرسم الأفق خطاً مماساً للدائرة عند أقرب نقطة منها إلى وسط الشاشة.
function hzCircle(c,skyInside,z){ const diag=Math.hypot(W,Ht);
  if(c.r<=6*diag) return {type:"circle",x:c.x,y:c.y,r:c.r,skyInside};
  const dx=CX-c.x, dy=CY-c.y, dc=Math.hypot(dx,dy)||1, gap=dc-c.r;
  if(Math.abs(gap)>diag) return {type:(gap<0)===skyInside?"none":"full",z};
  const ux=dx/dc, uy=dy/dc, px=c.x+ux*c.r, py=c.y+uy*c.r, sg=skyInside?-1:1;
  return {type:"line",a:[px+uy*200,py-ux*200],b:[px-uy*200,py+ux*200],z:[px+sg*ux*100,py+sg*uy*100]}; }
// أفق المكان على الأطلس: دائرة عظمى قطبها سمت الرأس، ونعرف جهة السماء منها بسمت الرأس أو بنظيره تحت الأرض
const enuToJ=h=>[0,1,2].map(j=>M[0][j]*h[0]+M[1][j]*h[1]+M[2][j]*h[2]);
function atlasHorizon(){
  const P=t=>projJ(enuToJ(hor(t,0)));
  let pts=null; for(const o of [0,40,80]){ const q=[o,o+120,o+240].map(P); if(q.every(Boolean)){ pts=q; break; } }
  if(!pts) return null;
  const zen=projJ(M[2]), nad=projJ(M[2].map(x=>-x)), c=circle3(pts);
  if(c) return hzCircle(c,zen?Math.hypot(zen[0]-c.x,zen[1]-c.y)<c.r:!(nad&&Math.hypot(nad[0]-c.x,nad[1]-c.y)<c.r),zen||nad||[W/2,-1e5]);
  return zen?{type:"line",a:pts[0],b:pts[2],z:zen}:{type:"line",a:pts[0],b:pts[2],z:nad||[W/2,Ht*2],inv:true};
}
function pathGround(g){
  ctx.beginPath(); if(g.type==="none") return; if(g.type==="full"){ ctx.rect(-10,-10,W+20,Ht+20); return; }
  if(g.type==="circle"){ if(g.skyInside){ ctx.rect(-10,-10,W+20,Ht+20); ctx.moveTo(g.x+g.r,g.y); ctx.arc(g.x,g.y,g.r,0,Math.PI*2,true); } else ctx.arc(g.x,g.y,g.r,0,Math.PI*2); }
  else { const dx=g.b[0]-g.a[0],dy=g.b[1]-g.a[1],L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,nx=-uy,ny=ux, side=(((g.z[0]-g.a[0])*nx+(g.z[1]-g.a[1])*ny)>0?-1:1)*(g.inv?-1:1),F=1e5;
    ctx.moveTo(g.a[0]-ux*F,g.a[1]-uy*F); ctx.lineTo(g.a[0]+ux*F,g.a[1]+uy*F); ctx.lineTo(g.a[0]+ux*F+nx*side*F,g.a[1]+uy*F+ny*side*F); ctx.lineTo(g.a[0]-ux*F+nx*side*F,g.a[1]-uy*F+ny*side*F); ctx.closePath(); }
}
function skyColors(){ if(st.mode==="atlas") return ["#070b18","#0c1328",0]; const s=sunAlt, ek=ECLK();
  if(s>0&&ek<0.02) return ["#101935","#22305a",.25]; if(s>0&&ek<0.15) return ["#1c2c55","#4a5f8e",.55];
  if(s>0) return ["#3d6aa8","#7aa3d4",1]; if(s>-6) return ["#1c2c55","#4a5f8e",.55]; if(s>-12) return ["#101935","#22305a",.25]; if(s>-18) return ["#0b1226","#141d3a",.08]; return ["#070b18","#0c1328",0]; }

// ================================================================ السماء الواقعية على الهاتف (سماء مكاني فقط، والحاسوب والأطلس الكامل كما هما)
// لون السماء وسطوعها من نموذج الموقع نفسه (src/lib/xp_sky.js: تشتت رايلي وهباء وأوزون، وسطوع سمت الرأس من قياسات Patat 2006،
// وأخفت قدر تراه العين من معادلة Hecht)، وضوء القمر في السماء من نموذج Krisciunas & Schaefer (1991)، وتوهج الهواء الليلي
// نحو الأفق من معادلة van Rhijn (طبقة على ارتفاع 90 كم). كله تقريبي ويقال ذلك في «عن الخريطة».
const XPS=(()=>{
// نموذج سماء النهار والشفق لدرس «لماذا لا نرى النجوم نهاراً؟» (src/components/xp/XpStarsDay.astro).
// كله تقريبي، ويصلح لفهم الفكرة لا للقياس الدقيق:
//  1) اللون والتوزيع: تشتت واحد في هواء كروي (نصف قطر الأرض 6371 كم من ناسا)، بمعادلات رايلي وشمس تُحجب بظل الأرض،
//     فيحمرّ الأفق عند الغروب ويظلم الجو من الأعلى مع نزول الشمس. العمق البصري الرأسي لرايلي من معادلة Hansen & Travis (1974)
//     τ = 0.008569 λ^-4 (1 + 0.0113 λ^-2 + 0.00013 λ^-4)، λ بالميكرون (نحو 0.097 عند 550 نانومتر). ارتفاع مقياس الهواء 8 كم.
//     هباء بسيط (غبار) بارتفاع مقياس 1.2 كم، ودالة طور Henyey-Greenstein، وطبقة أوزون (امتصاص تشابي) من 10 إلى 40 كم.
//  2) السطوع المطلق عند سمت الرأس بحسب ارتفاع الشمس: من قياسات Patat وزملائه (A&A 455، 2006) في باراناك عند 5° إلى 15° تحت الأفق
//     (V = 11.84 + 1.518 (ζ − 95) − 0.057 (ζ − 95)² مللي قدر/ثانية قوسية²)، وبين 5° تحت الأفق والأفق وفوق الأفق تقدير تقريبي من عندنا.
//  3) أخفت نجم تراه العين من سطوع الخلفية: معادلة Hecht (1947) كما في Crumey (2014)، والنقطة الصفرية للقدر 2.54e-6 لوكس.
//  4) إضعاف الغلاف الجوي لضوء النجم قرب الأفق: k × كتلة هوائية (Rozenberg).
const RE = 6371, TOP = 80, HR = 8, HM = 1.2;
const LAM = [0.65, 0.55, 0.45]; // أحمر وأخضر وأزرق بالميكرون
const tauR = (l) => 0.008569 * l ** -4 * (1 + 0.0113 * l ** -2 + 0.00013 * l ** -4);
const TAU_R = LAM.map(tauR);
const TAU_O = [0.02, 0.027, 0.0025]; // الأوزون الرأسي (نحو 300 وحدة دوبسون)
const D2R = Math.PI / 180;

// جدول أعمدة الهواء على طول شعاع الشمس من نقطة على ارتفاع h بزاوية χ عن الرأس (ln لكل نوع)، ويُبنى مرة واحدة
const HS = [0, 0.5, 1, 2, 3, 4, 6, 8, 10, 13, 17, 22, 28, 35, 45, 60, 80], CHI_STEP = 0.5, NC = 261;
let TABLE = null;
const tent = (h) => Math.max(0, 1 - Math.abs(h - 25) / 15);
function column(h0, chiDeg) {
  const ux = Math.sin(chiDeg * D2R), uz = Math.cos(chiDeg * D2R);
  let x = 0, z = RE + h0, cR = 0, cM = 0, cO = 0;
  for (let n = 0; n < 4000; n++) {
    const hq = Math.hypot(x, z) - RE;
    if (hq < -0.01) return null; // الشعاع يدخل الأرض: الظل
    if (n > 0 && hq > TOP) break;
    const ds = Math.min(50, Math.max(0.2, 0.3 * (Math.max(hq, 0) + 1.5)));
    const mx = x + ux * ds / 2, mz = z + uz * ds / 2, hm = Math.hypot(mx, mz) - RE;
    if (hm < -0.01) return null;
    if (hm <= TOP) { cR += Math.exp(-hm / HR) * ds; cM += Math.exp(-hm / HM) * ds; cO += tent(hm) * ds; }
    x += ux * ds; z += uz * ds;
  }
  return [cR / HR, cM / HM, cO / 15];
}
function build() {
  const T = new Float32Array(HS.length * NC * 3), BIG = Math.log(1000);
  for (let a = 0; a < HS.length; a++) for (let j = 0; j < NC; j++) {
    const c = column(HS[a], j * CHI_STEP), o = (a * NC + j) * 3;
    for (let k = 0; k < 3; k++) T[o + k] = c ? Math.log(c[k] + 1e-4) : BIG;
  }
  return T;
}
const OUT = [0, 0, 0];
function sunColumns(h, chi) {
  if (!TABLE) TABLE = build();
  h = h < 0 ? 0 : h > TOP ? TOP : h;
  let a = 0; while (a < HS.length - 2 && h > HS[a + 1]) a++;
  const fa = (h - HS[a]) / (HS[a + 1] - HS[a]);
  const cj = chi / CHI_STEP; if (cj >= NC - 1) { OUT[0] = OUT[1] = OUT[2] = 1000; return OUT; }
  const j = Math.floor(cj), fj = cj - j;
  for (let k = 0; k < 3; k++) {
    const o0 = (a * NC + j) * 3 + k, o1 = ((a + 1) * NC + j) * 3 + k;
    const l0 = TABLE[o0] * (1 - fj) + TABLE[o0 + 3] * fj, l1 = TABLE[o1] * (1 - fj) + TABLE[o1 + 3] * fj;
    OUT[k] = Math.exp(l0 * (1 - fa) + l1 * fa) - 1e-4;
  }
  return OUT;
}

// الهواء: aod = العمق البصري للهباء عند 550 نانومتر، alpha = أس أنغستروم، g = اتجاهية التشتت، w = معامل التشتت الأحادي
const AIR = {
  clear: { aod: 0.1, alpha: 1.3, g: 0.72, w: 0.97, k: 0.2 },
  dust: { aod: 0.5, alpha: 0.4, g: 0.78, w: 0.9, k: 0.45 },
};
const tauM = (air) => LAM.map((l) => air.aod * (l / 0.55) ** -air.alpha);

// إشعاع السماء النسبي (أحمر، أخضر، أزرق) في اتجاه (سمت az، ارتفاع alt) والشمس في (saz، salt)، كلها بالدرجات
function skyRadiance(az, alt, saz, salt, air) {
  const ca = Math.cos(alt * D2R), vx = ca * Math.sin(az * D2R), vy = ca * Math.cos(az * D2R), vz = Math.sin(alt * D2R);
  const cs = Math.cos(salt * D2R), sx = cs * Math.sin(saz * D2R), sy = cs * Math.cos(saz * D2R), sz = Math.sin(salt * D2R);
  const cosT = vx * sx + vy * sy + vz * sz;
  const pR = (3 / (16 * Math.PI)) * (1 + cosT * cosT);
  const g = air.g, pM = (1 - g * g) / (4 * Math.PI * Math.pow(1 + g * g - 2 * g * cosT, 1.5));
  const tm = tauM(air), Rv = RE * vz, tmax = -Rv + Math.sqrt(Rv * Rv + 2 * RE * TOP + TOP * TOP);
  const N = 18; let cumR = 0, cumM = 0, cumO = 0; const L = [0, 0, 0];
  for (let i = 0; i < N; i++) {
    const t0 = tmax * (i / N) ** 2, t1 = tmax * ((i + 1) / N) ** 2, tm_ = (t0 + t1) / 2, ds = t1 - t0;
    const px = vx * tm_, py = vy * tm_, pz = RE + vz * tm_, r = Math.hypot(px, py, pz), h = r - RE;
    const cosChi = (px * sx + py * sy + pz * sz) / r, chi = Math.acos(Math.max(-1, Math.min(1, cosChi))) / D2R;
    const rR = Math.exp(-h / HR), rM = Math.exp(-h / HM), rO = tent(h);
    const half = ds / 2;
    const vR = cumR + rR * half / HR, vM = cumM + rM * half / HM, vO = cumO + rO * half / 15;
    const sc = sunColumns(h, chi);
    for (let k = 0; k < 3; k++) {
      const tau = TAU_R[k] * (vR + sc[0]) + tm[k] * (vM + sc[1]) + TAU_O[k] * (vO + sc[2]);
      L[k] += (TAU_R[k] / HR * rR * pR + (tm[k] / HM) * rM * pM * air.w) * Math.exp(-tau) * ds;
    }
    cumR += rR * ds / HR; cumM += rM * ds / HM; cumO += rO * ds / 15;
  }
  return L;
}

// سطوع السماء عند سمت الرأس (V، مللي قدر/ثانية قوسية²) بحسب ارتفاع الشمس h (درجات، سالب تحت الأفق)
const S_NIGHT = 21.7, S_DAY = 3.4;
function zenithMag(h) {
  const z = 90 - h;
  if (z >= 95) return z >= 106 ? S_NIGHT : 11.84 + 1.518 * (z - 95) - 0.057 * (z - 95) ** 2; // قياسات باراناك
  if (h <= 0) return 5.8 + (11.84 - 5.8) * (-h / 5); // خطي من 5.8 عند الأفق إلى 11.84 عند 5° تحت الأفق (تقدير)
  return 5.8 - (5.8 - S_DAY) * (1 - Math.exp(-h / 15)); // فوق الأفق: يصعد إلى نحو 3.4 (تقدير)
}
const magToLum = (S) => 10.8e4 * 10 ** (-0.4 * S); // cd/m²
// أخفت قدر ترى به العين نقطة ضوئية على خلفية سطوعها L (cd/m²)، معادلة Hecht (1947)
// ثم نطرح 0.7 قدر لعين المتوسط، حتى يعطي النموذج القدر 6.5 تحت سماء مظلمة تماماً كما تقول ناسا («الحد الأقصى 6.5 في سماء مثالية نادرة»)
const OBSERVER = 0.7;
function limitingMag(L) {
  const lo = L <= 1.645e-2, dI = lo ? 1.706e-9 * (1 + Math.sqrt(1.259e3 * L)) ** 2 : 4.808e-8 * (1 + Math.sqrt(0.1259 * L)) ** 2;
  return -2.5 * Math.log10(dI / 2.54e-6) - OBSERVER;
}
// الكتلة الهوائية (Rozenberg) لارتفاع alt بالدرجات
const airmass = (alt) => { const s = Math.sin(Math.max(alt, 0) * D2R); return 1 / (s + 0.025 * Math.exp(-11 * s)); };

return {skyRadiance,zenithMag,magToLum,limitingMag,airmass,AIR,S_NIGHT}; })();
const REAL_ON=()=>st.mode==="sky"&&!EMBED;
const RMOT=matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp01=x=>x<0?0:x>1?1:x;
// ضوء القمر المشتت (نانو لامبرت): rho الزاوية بين الاتجاه والقمر، zm وz بعدا القمر والاتجاه عن سمت الرأس (راديان)، ph زاوية الطور (درجات)
function moonSkyNL(rho,zm,z,ph){
  const k=0.172, I=Math.pow(10,-0.4*(3.84+0.026*Math.abs(ph)+4e-9*Math.pow(ph,4))), rd=rho*R2D;
  const f=Math.pow(10,5.36)*(1.06+Math.cos(rho)**2)+Math.pow(10,6.15-rd/40), X=a=>1/Math.sqrt(Math.max(0.04,1-0.96*Math.sin(a)**2));
  return f*I*Math.pow(10,-0.4*k*X(zm))*(1-Math.pow(10,-0.4*k*X(z)));
}
const NL_CD=3.183e-6, L_NIGHT=XPS.magToLum(XPS.S_NIGHT);
const vanRhijn=alt=>{ const c=Math.cos(Math.max(0,alt)*D2R), q=6371/6461; return 1/Math.sqrt(1-q*q*c*c); };
// شبكة السماء كلها (سمت كل 7.5° وارتفاع كل 5°) تُحسب حين تتحرك الشمس أو القمر فقط، ثم يُقرأ منها كل إطار
const SG={W:48,H:19,key:"",L:new Float32Array(48*19),C:new Float32Array(48*19*3)};
// ضوء المكان عند سمت الرأس (قدر/ثانية قوسية²) لأربع درجات: صحراء مظلمة، ريف، طرف مدينة، وسط مدينة مضيئة.
// قيم تقريبية من مقياس Bortle وقياسات أجهزة SQM، ويزيد الوهج نحو الأفق. أخفت قدر تراه العين يأتي من معادلة Hecht نفسها.
const LP_SQM=[21.7,20.9,19.8,18.6];
function buildSkyGrid(){
  const sun=altAz(bodies[0].v), moon=altAz(bodies[1].v), ph=bodies[1].phase||0;
  const key=((((Math.round(sun.alt*3)*1000+Math.round(sun.az/2))*1000+Math.round(moon.alt))*1000+Math.round(moon.az/2))*100+Math.round(ph/4))*1000+Math.round(st.lat*10)+"|"+st.lp+"|"+Math.round(Math.log10(ECLK())*40); if(key===SG.key) return; SG.key=key;
  const Lcity=Math.max(0,XPS.magToLum(LP_SQM[st.lp]||XPS.S_NIGHT)-L_NIGHT), CITYC=[0.78,0.6,0.46];
  const air=XPS.AIR.clear, Yf=c=>0.2126*c[0]+0.7152*c[1]+0.0722*c[2], FLOOR=1e-7, BLUE=[0.35,0.62,1], by=Yf(BLUE), NIGHTC=[0.32,0.36,0.52];
  const hasSun=sun.alt>-18.5, Lz=XPS.magToLum(XPS.zenithMag(sun.alt)), Yz=hasSun?Math.max(FLOOR,Yf(XPS.skyRadiance(sun.az,89.5,sun.az,sun.alt,air))):1;
  const mvec=hor(moon.az,moon.alt), zm=(90-moon.alt)*D2R, mUp=moon.alt>0;
  for(let j=0;j<SG.H;j++){ const alt=j*90/(SG.H-1);
    for(let i=0;i<SG.W;i++){ const az=i*360/SG.W, o=j*SG.W+i; let c=NIGHTC, L;
      if(hasSun){ const r=XPS.skyRadiance(az,Math.max(alt,0.6),sun.az,sun.alt,air), y=Yf(r), F=Math.min(300,Math.max(0.5,y/Yz));
        L=Lz*F*ECLK(); const cc=[r[0]+FLOOR*BLUE[0]/by,r[1]+FLOOR*BLUE[1]/by,r[2]+FLOOR*BLUE[2]/by], mx=Math.max(cc[0],cc[1],cc[2]); c=[cc[0]/mx,cc[1]/mx,cc[2]/mx];
        // النموذج تشتت واحد، فيبالغ في احمرار الأفق البعيد عن الشمس، فنخفف تشبع اللون هناك
        const gam=Math.acos(Math.max(-1,Math.min(1,dot(hor(az,alt),hor(sun.az,sun.alt)))))*R2D, w=0.55*Math.pow(clamp01(1-alt/25),2)*clamp01((gam-50)/60);
        if(w>0){ const m=(c[0]+c[1]+c[2])/3; c=[c[0]+(m-c[0])*w,c[1]+(m-c[1])*w,c[2]+(m-c[2])*w]; } }
      else L=Lz;
      // الليل: نصف سطوع السماء المظلمة توهج هوائي يزداد نحو الأفق (van Rhijn، بحد أقصى ثلاثة أضعاف)
      const Ln=L_NIGHT*0.5*(Math.min(3,vanRhijn(alt))-1); L+=Ln;
      if(mUp){ const d=hor(az,alt), rho=Math.acos(Math.max(-1,Math.min(1,dot(d,mvec)))), Lm=moonSkyNL(rho,zm,(90-alt)*D2R,ph)*NL_CD;
        // ضوء القمر المشتت أزرق كضوء النهار (هو ضوء الشمس منعكساً)
        const w=Lm/(L+Lm); c=[c[0]*(1-w)+BLUE[0]*w,c[1]*(1-w)+BLUE[1]*w,c[2]*(1-w)+BLUE[2]*w]; L+=Lm; }
      // ضوء المدينة: وهج دافئ يزيد نحو الأفق
      if(Lcity>0){ const Lc=Lcity*(1+2.5*Math.exp(-alt/12)), w=Lc/(L+Lc); c=[c[0]*(1-w)+CITYC[0]*w,c[1]*(1-w)+CITYC[1]*w,c[2]*(1-w)+CITYC[2]*w]; L+=Lc; }
      SG.L[o]=Math.min(1e5,L); SG.C[o*3]=c[0]; SG.C[o*3+1]=c[1]; SG.C[o*3+2]=c[2]; } }
}
// قراءة الشبكة في اتجاه (سمت، ارتفاع): تقريب خطي
const SGOUT=[0,0,0,0];
function sampleSky(az,alt){
  const fx=((az%360)+360)%360/360*SG.W, fy=Math.max(0,Math.min(SG.H-1.001,alt/90*(SG.H-1)));
  const i0=Math.floor(fx)%SG.W, i1=(i0+1)%SG.W, tx=fx-Math.floor(fx), j0=Math.floor(fy), ty=fy-j0, j1=j0+1;
  const a=j0*SG.W+i0,b=j0*SG.W+i1,c=j1*SG.W+i0,d=j1*SG.W+i1, w0=(1-tx)*(1-ty),w1=tx*(1-ty),w2=(1-tx)*ty,w3=tx*ty;
  SGOUT[0]=SG.L[a]*w0+SG.L[b]*w1+SG.L[c]*w2+SG.L[d]*w3;
  for(let k=0;k<3;k++) SGOUT[k+1]=SG.C[a*3+k]*w0+SG.C[b*3+k]*w1+SG.C[c*3+k]*w2+SG.C[d*3+k]*w3;
  return SGOUT;
}
// لون الشاشة لسطوع السماء L ولونها (r,g,bl) على ارتفاع جيبه u. الشفق والنهار كما كانا. والليل (#364، المالك مع صورة عميل:
// «تحسوا فعلا سماء، عندنا … كله اسود») لم يعد أسود: طبقة زرقاء رمادية تزيد مع لوغاريتم سطوع السماء فوق سماء الصحراء المظلمة،
// فتفتح مع ضوء المكان والقمر ونحو الأفق، وتدفأ قرب الأفق في المدينة، كما تعرضها تطبيقات القبة السماوية. الحساب (أخفت نجم يُرى) لم يتغير
const L_DARK=XPS.magToLum(21.7), NZ=[0.6,0.7,1], NW=[1,0.8,0.62], SKYD=[0,0,0];
function skyDisp(L,r,g,bl,u){
  const lg=Math.log10(Math.max(L,1e-12)), t=clamp01((lg+3.7)/7.35), kn=clamp01((lg+2.3)/1.4), lo=u>0&&u<0.16&&kn<1?1+(1-u/0.16)*(1-u/0.16)*(1-kn)*(1.4+0.6*st.lp):1, br=Math.pow(t,1.1)*(0.12+0.88*kn*kn*(3-2*kn))*lo;
  if(lo>1.6&&st.lp>=2){ const w=Math.min(0.45,(lo-1.6)*0.16); r+=(0.95-r)*w; g+=(0.66-g)*w; bl+=(0.42-bl)*w; }
  let R=br*Math.pow(r,1.5)+0.012, G=br*Math.pow(g,1.5)+0.02, B=br*Math.pow(bl,1.5)+0.05;
  const nb=Math.min(0.42,0.11+0.17*Math.max(0,Math.log10(Math.max(L,1e-12)/L_DARK)))*(1-kn)*(1-kn);
  if(nb>0){ const w=clamp01(st.lp/3*0.6*Math.pow(1-clamp01(u),6)); R+=nb*(NZ[0]+(NW[0]-NZ[0])*w); G+=nb*(NZ[1]+(NW[1]-NZ[1])*w); B+=nb*(NZ[2]+(NW[2]-NZ[2])*w); }
  SKYD[0]=clamp01(R); SKYD[1]=clamp01(G); SKYD[2]=clamp01(B); return SKYD; }
// خلفية السماء: صورة صغيرة (خلية لكل 12 نقطة من الشاشة) تُكبَّر بنعومة، لون كل نقطة من اتجاهها الحقيقي في السماء
const bgC=document.createElement("canvas"), bgX=bgC.getContext("2d"); let bgImg=null;
function drawRealSky(){
  buildSkyGrid();
  const cw=Math.max(16,Math.round(W/12)), ch=Math.max(16,Math.round(Ht/12));
  if(bgC.width!==cw||bgC.height!==ch||!bgImg){ bgC.width=cw; bgC.height=ch; bgImg=bgX.createImageData(cw,ch); }
  const d=bgImg.data, sx=W/cw, sy=Ht/ch, H0=H[0],H1=H[1],H2=H[2];
  for(let j=0;j<ch;j++){ const b=-((j+0.5)*sy-CY)/SY;
    for(let i=0;i<cw;i++){ const uc=unproj(((i+0.5)*sx-CX)/SX,b), c0=uc[0], c1=uc[1], z=uc[2];
      const e=H0[0]*c0+H1[0]*c1+H2[0]*z, n=H0[1]*c0+H1[1]*c1+H2[1]*z, u0=H0[2]*c0+H1[2]*c1+H2[2]*z;
      // شريط رفيع تحت الأفق يأخذ لون الأفق نفسه: الصورة تُكبَّر 12 مرة، ولولاه لتسرّب سواد ما تحت الأفق فوق خطه بقعاً متعرجة في النهار
      const u=u0<0&&u0>-0.09?1e-4:u0;
      let L,r,g,bl;
      if(u<0){ L=L_NIGHT; r=0.32; g=0.36; bl=0.52; } // تحت الأفق: ليل، والأرض تُرسم فوقه
      else { const s=sampleSky(Math.atan2(e,n)*R2D,Math.asin(Math.min(1,u))*R2D); L=s[0]; r=s[1]; g=s[2]; bl=s[3]; }
      const o=(j*cw+i)*4, c=skyDisp(L,r,g,bl,u);
      d[o]=255*c[0]; d[o+1]=255*c[1]; d[o+2]=255*c[2]; d[o+3]=255; } }
  bgX.putImageData(bgImg,0,0); ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="high"; ctx.drawImage(bgC,0,0,W,Ht);
}
// سطوع السماء الذي تتكيف معه العين: متوسط خمس نقاط حول اتجاه النظر (في الوسط وعلى بعد 12°)
// تكيّف العين: من سطوع السماء حول اتجاه النظر، وحين تنظر إلى الأرض فمن السماء فوق الأفق في تلك الجهة (فلا تظهر النجوم نهاراً)
function adaptLum(){ const vd=viewDir(); if(vd.alt<-5){ let s=0; for(const da of [0,25,-25]) s+=sampleSky(vd.az+da,6)[0]; return s/3; } let s=0; for(const [da,dh] of [[0,0],[12,0],[-12,0],[0,10],[0,-10]]) s+=sampleSky(vd.az+da/Math.max(0.2,Math.cos(vd.alt*D2R)),Math.max(0,Math.min(90,vd.alt+dh)))[0]; return s/5; }
// شكل النجم: نواة لامعة وهالة ناعمة بلون النجم (B−V)، صورة جاهزة لكل لون، فلا نقاط بحواف حادة
const PSF=[]; for(let k=0;k<14;k++){ const bv=-0.4+k*0.2, c=bvColor(bv).join(","), cv2=document.createElement("canvas"); cv2.width=cv2.height=64; const g=cv2.getContext("2d"), gr=g.createRadialGradient(32,32,0,32,32,32);
  gr.addColorStop(0,"rgba(255,255,255,1)"); gr.addColorStop(0.09,`rgba(${c},.95)`); gr.addColorStop(0.2,`rgba(${c},.42)`); gr.addColorStop(0.42,`rgba(${c},.1)`); gr.addColorStop(1,`rgba(${c},0)`); g.fillStyle=gr; g.fillRect(0,0,64,64); PSF.push(cv2); }
const psfBin=bv=>Math.max(0,Math.min(13,Math.round((bv+0.4)/0.2))), PCOL=PSF.map((_,k)=>"rgb("+bvColor(-0.4+k*0.2).join(",")+")");
// درب التبانة: شبكة d3-celestial (درجات السطوع 1 إلى 5) تُرسم توهجاً ناعماً على صورة بربع الحجم ثم تُكبَّر
const mwC=document.createElement("canvas"), mwX=mwC.getContext("2d"), MWN=MWV.length, MWF=new Float64Array(MWN*3), MWL=new Float32Array(MWN);
MWV.forEach(([v,l],n)=>{ MWF[n*3]=v[0]; MWF[n*3+1]=v[1]; MWF[n*3+2]=v[2]; MWL[n]=l; });
// نسخة أخشن (خلايا 3 درجات) للمجال الواسع: ربع عدد النقاط بالشكل نفسه تقريباً، لأن كل نقطة توهج عرضه أكبر من الخلية
const MWG=(()=>{ const B=new Map(); for(let n=0;n<MWN;n++){ const rd=radec([MWF[n*3],MWF[n*3+1],MWF[n*3+2]]), j=Math.round(rd.dec/3), w=Math.max(1,Math.round(120*Math.cos(rd.dec*D2R))), i=Math.round(rd.ra/360*w)%w, k=j*1000+i;
  let b=B.get(k); if(!b){ b=[0,0,0,0,0]; B.set(k,b); } b[0]+=MWF[n*3]; b[1]+=MWF[n*3+1]; b[2]+=MWF[n*3+2]; b[3]+=MWL[n]; b[4]++; }
  const F=new Float64Array(B.size*3), L=new Float32Array(B.size); let m=0; for(const b of B.values()){ const v=nrm([b[0],b[1],b[2]]); F[m*3]=v[0]; F[m*3+1]=v[1]; F[m*3+2]=v[2]; L[m]=b[3]/b[4]; m++; } return {F,L,N:m}; })();
const mwBlob=sprite([[0,"rgba(214,220,240,1)"],[.45,"rgba(205,212,236,.5)"],[1,"rgba(200,208,232,0)"]]);
function drawRealMW(pxPerDeg,fade){
  if(fade<=0.01) return; const q=4, cw=Math.ceil(W/q), ch=Math.ceil(Ht/q); if(mwC.width!==cw||mwC.height!==ch){ mwC.width=cw; mwC.height=ch; }
  mwX.setTransform(1,0,0,1,0,0); mwX.clearRect(0,0,cw,ch); mwX.globalCompositeOperation="lighter";
  const coarse=st.fov>40, FF=coarse?MWG.F:MWF, LL=coarse?MWG.L:MWL, NN=coarse?MWG.N:MWN, gk=coarse?1.6:1, gl=coarse?1.55:1;
  const sz=Math.max(3,pxPerDeg*3.4*gk/q), m=sz*q*2, C0=C[0],C1=C[1],C2=C[2], U=MR[2], minU=belowOn()?-2:Math.sin(-1.5*D2R);
  for(let n=0;n<NN;n++){ const x=FF[n*3],y=FF[n*3+1],z=FF[n*3+2], zc=C2[0]*x+C2[1]*y+C2[2]*z; if(zc<(PERSP?0.03:-0.85)) continue; if(U[0]*x+U[1]*y+U[2]*z<minU) continue;
    // في الإسقاط المنظوري تتمدد الأطراف شعاعياً بقدر 1/z² وعرضياً بقدر 1/z، فنكبّر البقعة بقدر 1/z² فلا تظهر فجوات، ونخفف شفافيتها بقدر z فلا يزيد السطوع
    const k=magK(zc), zq=Math.max(0.03,zc), kb=PERSP?1/(zq*zq):k, ka=PERSP?zq:1, px=CX+SX*k*(C0[0]*x+C0[1]*y+C0[2]*z), py=CY-SY*k*(C1[0]*x+C1[1]*y+C1[2]*z); if(px<-m||px>W+m||py<-m||py>Ht+m) continue;
    const s=sz*kb; mwX.globalAlpha=Math.min(1,(0.035+LL[n]*0.03)*gl*ka); mwX.drawImage(mwBlob,px/q-s/2,py/q-s/2,s,s); }
  ctx.save(); ctx.globalCompositeOperation="lighter"; ctx.globalAlpha=0.6*fade*fade; ctx.imageSmoothingEnabled=true; ctx.drawImage(mwC,0,0,W,Ht); ctx.restore();
}
// ================================================================ المنظر ثلاثي الأبعاد: مشهد حولك 360 درجة
// ثلاث طبقات من التضاريس (جبال بعيدة يكسوها ضباب الجو، وتلال، وكثبان قريبة)، وأرض لها ملمس يصغر مع البعد، وكلها تُسقط بالإسقاط المنظوري نفسه
// المشهد عام وليس تضاريس المدينة الحقيقية، وارتفاعه بضع درجات فلا يخفي إلا ما قرب من الأفق
const TER=[
  az=>{ const a=az*D2R, env=Math.max(0,Math.sin(a+0.8))**0.7; return 0.25+env*(1.7*Math.abs(Math.sin(1.7*a+0.4))**1.4+0.9*Math.sin(5*a+1.1)**2+0.3*Math.sin(13*a+2.3)+0.12*Math.sin(29*a+0.7)); },
  az=>{ const a=az*D2R; return Math.max(0.08,0.3+0.55*Math.sin(2*a+2.0)**2+0.22*Math.sin(7*a+0.3)+0.08*Math.sin(19*a+1.9)); },
  az=>{ const a=az*D2R; return Math.max(0.03,0.1+0.6*Math.sin(3*a+0.9)**6+0.15*Math.sin(8*a+2.7)**2); }];
const GROUND=(()=>{ let x=12345; const r=()=>((x=(x*1103515245+12345)%2147483648)/2147483648); const out=[];
  for(let i=0;i<900;i++){ const d=2*Math.pow(150,r()); out.push([r()*360,d,0.02+0.14*r()*r(),r()]); } return out; })();
const mixC=(c1,c2,t)=>c1.map((v,i)=>Math.round(v+(c2[i]-v)*t)), GLIT=dayF=>Math.pow(Math.max(0,(dayF-0.2)/0.8),1.3);
function drawLandscape(dayF,below){
  // إضاءة الأرض تتبع السماء: كاملة في النهار، وتخفت سريعاً بعد الغروب
  const vd=viewDir(), A=vd.az, alpha=below?0.7:1, lit=GLIT(dayF);
  // ملمس الأرض: حصى ونباتات صغيرة، عرضها يصغر مع المسافة وارتفاعها يصغر أكثر (منظر مائل)، فتظهر الأرض ممتدة أمامك
  ctx.save(); const gc=mixC([34,29,21],[150,128,92],lit), gd=mixC([8,7,5],[96,80,56],lit);
  for(const [az,d,sz,t] of GROUND){ let da=((az-A+540)%360)-180; if(Math.abs(da)>95) continue;
    const alt=-Math.atan(1.6/d)*R2D, h=hor(az,alt), p=projH(h[0],h[1],h[2]); if(!p||!onScreen(p,20)) continue;
    const rx=S*sz/d; if(rx<0.35) continue; const ry=Math.max(0.3,rx*Math.min(1,1.6/d)*1.4);
    ctx.globalAlpha=alpha*Math.min(0.4,0.1+0.3*Math.min(1,6/d))*(1-0.5*lit); ctx.fillStyle=t<0.55?`rgb(${gc})`:`rgb(${gd})`;
    ctx.beginPath(); ctx.ellipse(p[0],p[1],rx,ry,0,0,Math.PI*2); ctx.fill(); }
  ctx.restore();
  // الطبقات من البعيد إلى القريب، والبعيد أفتح وأزرق بسبب الهواء بيننا وبينه
  const cols=[[mixC([26,30,44],[118,132,156],lit),0.95],[mixC([16,15,15],[120,104,78],lit),1],[mixC([12,10,8],[142,120,86],lit),1]];
  for(let L=0;L<3;L++){ const f=TER[L]; let pts=[];
    const flush=()=>{ if(pts.length>1){ ctx.beginPath(); pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])); for(let i=pts.length-1;i>=0;i--) ctx.lineTo(pts[i][2],pts[i][3]); ctx.closePath(); ctx.fill();
        // حافة مضاءة قليلاً من السماء فوقها، تفصل الطبقة عن التي خلفها
        ctx.save(); ctx.globalAlpha*=0.5; ctx.strokeStyle=`rgba(${mixC([90,100,130],[230,220,200],lit)},${L===0?0.35:0.22})`; ctx.lineWidth=1; ctx.beginPath(); pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1])); ctx.stroke(); ctx.restore(); } pts=[]; };
    ctx.save(); ctx.globalAlpha=alpha*cols[L][1]; ctx.fillStyle=`rgb(${cols[L][0]})`;
    for(let d=-100;d<=100;d+=0.5){ const az=(A+d+360)%360, top=hor(az,f(az)), bot=hor(az,-0.3), p=projH(top[0],top[1],top[2]), q=projH(bot[0],bot[1],bot[2]); if(p&&q) pts.push([p[0],p[1],q[0],q[1]]); else flush(); }
    flush(); ctx.restore(); }
}
// ================================================================ منظر 3D: أرض حقيقية حولك وأفق مدينتك الحقيقي
// الأرض: صورة بانوراما لسهل مستوٍ «Aarfontein Pan» من Poly Haven (رخصة CC0، تصوير Dario Barresi)، من الأفق إلى أسفل القدمين فقط.
// الأفق: الجبال والتلال الحقيقية حول المدينة، محسوبة من بيانات الارتفاعات (Terrain Tiles على AWS، ومصدرها SRTM من NASA وغيرها)
// بـ scripts/horizon_data.py: أعلى زاوية للأرض في كل نصف درجة من الجهات، من 1 كم حتى 100 كم، مع انحناء الأرض والانكسار.
// تُرسم بـ WebGL: لكل نقطة على الشاشة نحسب اتجاهها بالكاميرا نفسها (H وقلب الصورة)، فإن كانت تحت خط الأفق الحقيقي رُسمت أرضاً
// تختفي في ضباب الجو كلما بعدت، فتقف الجبال في مكانها الحقيقي وتخفي النجوم خلفها. الصورة والأفق يُحمَّلان فقط حين يُشغَّل 3D.
const PANO={img:null,rock:null,loading:false,fail:false,gl:null,cv:null,prog:null,tex:null,ptex:null,ltex:null,ntex:null,rtex:null,ztex:null,buf:null,u:{},ROT:0,src:"",prof:null,profSlug:null,profWant:null,profLoading:null,profDirty:true,zbuf:new Uint8Array(64*4)};
function panoLoad(){ panoProfile(); if(PANO.img||PANO.loading||PANO.fail) return; PANO.loading=true;
  const big=Math.max(screen.width||0,screen.height||0)*(window.devicePixelRatio||1)>2200&&!COARSE;
  // صورتان: الأرض المستوية، ونسيج صخر حقيقي من صورة «Goegap» (CC0) يُكسى به الجبل الحقيقي
  const ld=src=>new Promise((ok,no)=>{ const im=new Image(); im.decoding="async"; im.onload=()=>ok(im); im.onerror=no; im.src=src; });
  Promise.all([ld(PANO.src="/atlas/pano/ground-"+(big?4096:2048)+".webp"),ld("./rock-512.webp")]).then(([g,r])=>{ PANO.loading=false; PANO.img=g; PANO.rock=r; if(!panoInit()) PANO.fail=true; dirty=true; }).catch(()=>{ PANO.loading=false; PANO.fail=true; }); }
// أفق المدينة المختارة، أو أقرب مدينة على بعد 30 كم من «موقعي الحالي»، وإلا فأفق مستوٍ
function horizonSlug(){ const c=CITIES.find(x=>x[0]===st.city&&x[0]!=="custom"); if(c) return c[0];
  return nearCity(30); }
function nearCity(km){ let best=null,bd=km; for(const x of CITIES){ if(x[0]==="custom") continue; const d=111.2*Math.hypot(x[2]-st.lat,(x[3]-st.lon)*Math.cos(st.lat*D2R)); if(d<bd){ bd=d; best=x[0]; } } return best; }
// الغيوم الحقيقية من توقعات الطقس (/weather/clouds/<مدينة>.json: نسبة السحب المنخفضة والمتوسطة والعالية ساعة بساعة، من Open-Meteo)
// للمدينة المختارة أو أقرب مدينة على بعد 150 كم. تُرسم في منظر 3D فقط، على ارتفاعاتها التقريبية، وتتحرك مع الريح
const CLD={want:null,slug:null,d:null,cum:null};
function cloudSlug(){ const c=CITIES.find(x=>x[0]===st.city&&x[0]!=="custom"); return c?c[0]:nearCity(150); }
function cloudLoad(){ const s=cloudSlug(); if(s===CLD.want) return; CLD.want=s; CLD.d=null; CLD.slug=null; if(!s) return;
  fetch("/weather/clouds/"+s+".json").then(r=>r.ok?r.json():null).then(j=>{ if(CLD.want!==s||!j||!j.n) return;
    // إزاحة الغيوم مع الريح، متراكمة ساعة بعد ساعة (الريح فوق أقوى منها عند السطح، والقيم تقريبية)، فلا تقفز حين يتغير الوقت
    const cum=[[0,0]]; for(let i=0;i<j.n;i++){ const v=(j.ws[i]||0)*1.8+8, a=((j.wd[i]||0)+180)*D2R, p=cum[i]; cum.push([p[0]+v*Math.sin(a),p[1]+v*Math.cos(a)]); }
    CLD.d=j; CLD.cum=cum; CLD.slug=s; CLD.tIn=performance.now(); hudKey=""; dirty=true; }).catch(()=>{}); }
// الغيوم في لحظة الأطلس: قيم الساعتين المحيطتين ممزوجة، وإزاحة الريح بالكيلومتر. خارج مدى التوقعات: لا شيء
function cloudsAt(t){ const j=CLD.d; if(!j) return null; const u=(t-j.t0)/36e5; if(u<0||u>j.n-1) return null;
  const i=Math.min(j.n-2,Math.floor(u)), f=u-i, m=a=>(a[i]*(1-f)+a[i+1]*f)/100, c0=CLD.cum[i], c1=CLD.cum[i+1];
  return {lo:m(j.lo),mi:m(j.mi),hi:m(j.hi),off:[c0[0]+(c1[0]-c0[0])*f,c0[1]+(c1[1]-c0[1])*f]}; }
// سطر «الغيوم» في «الطبقات»: نسبة السحب في الوقت المعروض، أو سبب غيابها
function cloudNote(){ const el=document.querySelector("#ly-clouds small"); if(!el) return; let t="من توقعات الطقس، في منظر 3D";
  if(PERSP){ const c=CLD.d?cloudsAt(st.t):null, P=x=>"\u2066"+Math.round(x*100)+"%\u2069";
    t=!CLD.want?"لا توقعات لمكان بعيد عن مدننا":!CLD.d?"تُحمَّل التوقعات…":!c?"لا توقعات لهذا الوقت (نحو 7 أيام فقط)":`منخفضة ${P(c.lo)}، ومتوسطة ${P(c.mi)}، وعالية ${P(c.hi)}`; }
  if(el.textContent!==t) el.textContent=t; }
// عتبة الضجيج لكل نسبة تغطية: نوزع قيم الضجيج نفسه الذي يرسم الغيوم ونأخذ مئينها، فتغطي الغيوم النسبة نفسها من السماء تقريباً
let CLD_QF=null; const CLD_Q=cov=>(CLD_QF||(CLD_QF=cldQ()))(cov);
function cldQ(){ const fr=x=>x-Math.floor(x), md=x=>x-289*Math.floor(x/289), hs=(x,y)=>{ x=md(x); y=md(y); let a=fr(x*.1031),b=fr(y*.1031),c=a; const d=a*(b+33.33)+b*(c+33.33)+c*(a+33.33); a+=d; b+=d; c+=d; return fr((a+b)*c); }, vn=(x,y)=>{ const ix=Math.floor(x),iy=Math.floor(y); let fx=x-ix,fy=y-iy; fx=fx*fx*(3-2*fx); fy=fy*fy*(3-2*fy);
  const a=hs(ix,iy),b=hs(ix+1,iy),c=hs(ix,iy+1),d=hs(ix+1,iy+1); return (a*(1-fx)+b*fx)*(1-fy)+(c*(1-fx)+d*fx)*fy; };
  const v=[]; for(let k=0;k<6000;k++){ let x=(k*0.6180339)%1*400, y=(k*0.7548776)%1*400, s=0, a=.5; for(let o=0;o<7;o++){ s+=a*vn(x,y); x=x*2.03+17.1; y=y*2.03+9.3; a*=.5; } v.push(s); }
  v.sort((a,b)=>a-b); return cov=>cov<=0?2:cov>=1?-1:v[Math.min(v.length-1,Math.floor((1-cov)*v.length))]; }
function panoProfile(){ const s=horizonSlug(); if(s===PANO.profWant) return; PANO.profWant=s;
  if(!s){ PANO.prof=null; PANO.profSlug=null; PANO.profDirty=true; dirty=true; return; }
  PANO.profLoading=s; fetch("./horizon/"+s+".json").then(r=>r.ok?r.json():null).then(j=>{ if(PANO.profWant!==s) return;
    const dec=b=>Uint8Array.from(atob(b),c=>c.charCodeAt(0));
    PANO.prof=j?{alt:dec(j.alt),dist:dec(j.dist),lay:j.lay?dec(j.lay):null,nrm:j.nrm?dec(j.nrm):null,h0:j.h0}:null; PANO.profSlug=s; PANO.profDirty=true; dirty=true; }).catch(()=>{ PANO.prof=null; PANO.profDirty=true; }); }
function panoInit(){ try{
  const cv=document.createElement("canvas"); let gl=cv.getContext("webgl2",{alpha:true,premultipliedAlpha:true,preserveDrawingBuffer:true,antialias:false});
  if(!gl) gl=cv.getContext("webgl",{alpha:true,premultipliedAlpha:true,preserveDrawingBuffer:true,antialias:false}); if(!gl) return false;
  const sh=(t,src)=>{ const o=gl.createShader(t); gl.shaderSource(o,src); gl.compileShader(o); if(!gl.getShaderParameter(o,gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(o); return o; };
  const pr=gl.createProgram(); gl.attachShader(pr,sh(gl.VERTEX_SHADER,"attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
  gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,`precision highp float;
uniform vec2 uC,uS;uniform float uDpr,uHt,uRot,uB,uA,uSat,uDay,uMoon,uMoonAz,uSunAz,uSunUp,uHasP,uHasN;uniform vec3 uTint,uRock,uSunV,uMoonV;uniform mat3 uH;uniform sampler2D uT,uP,uZ,uL,uR,uN;
uniform vec3 uCl,uThr,uSunCol;uniform vec2 uOffL,uOffM,uOffH;uniform float uCldOn,uCldA,uSunAlt,uCity,uPa;
// رقم شبه عشوائي لكل خلية بلا sin: معالجات رسوم الهواتف تحسب sin لأرقام كبيرة بدقة ضعيفة فتتشوه الغيوم إلى خطوط ومربعات.
// ورقم الخلية يُطوى على 289 فتبقى الأرقام صغيرة دقيقة (Dave Hoskins، hash12)
float hs(vec2 p){ p=mod(p,289.); vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
float vn(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hs(i),hs(i+vec2(1,0)),f.x),mix(hs(i+vec2(0,1)),hs(i+vec2(1,1)),f.x),f.y); }
// ضجيج متعدد الطبقات، وتُطفأ التفاصيل الأصغر من البكسل (قرب الأفق)، فلا تتلألأ الغيوم البعيدة
float fbmL(vec2 p,float fp){ float v=0.,a=.5,f=1.; for(int i=0;i<7;i++){ v+=a*mix(.5,vn(p),clamp(1.5-fp*f*3.,0.,1.)); p=p*2.03+vec2(17.1,9.3); f*=2.03; a*=.5; } return v; }
// طبقة غيوم على ارتفاع H كم فوق الأرض الكروية: نقطة التقاء خط النظر بها، ثم الضجيج بعتبة تجعل الغيوم تغطي نسبة cov من السماء.
// الشمس تضيئها (وتبقى العالية مضاءة بعد الغروب بقليل)، وفي الليل لا يضيئها إلا القمر وأضواء المدينة من تحتها، وتذوب البعيدة في لون الأفق
vec4 cloudL(vec3 e,float H,float cov,float thr,vec2 off,float sc,vec2 sk,float thick,vec3 hz){
 float s=max(e.z,0.),R=6371.,d=sqrt((R+H)*(R+H)-R*R*(1.-s*s))-R*s;
 float n=fbmL((e.xy*d+off)/sc*sk,d*uPa/max(s,.03)/sc), dens=smoothstep(thr-.05,thr+.09,n);
 if(dens<=0.) return vec4(0.);
 // الغيمة البعيدة نحو الشمس ترى الشمس أعلى قليلاً مما نراها (بقدر بعدها على الأرض الكروية)، فتبقى مضاءة بعد الغروب أطول من التي فوقنا
 vec2 sh=uSunV.xy/max(length(uSunV.xy),1e-4); float sa=uSunAlt+degrees(dot(e.xy*d,sh)/R);
 float core=smoothstep(thr,thr+.25,n), dep=degrees(sqrt(2.*H/R)), lit=smoothstep(-dep-1.5,-dep+.3,sa), fwd=pow(max(0.,dot(e,uSunV)),6.);
 vec3 base=mix(vec3(.94),vec3(.5,.52,.58),core*thick*(.55+.45*s))*(1.+.2*fwd*(1.-core))*mix(1.,.62,smoothstep(.65,1.,cov)*thick);
 vec3 col=base*uSunCol*lit*(.95+.9*clamp((6.-uSunAlt)/8.,0.,1.))+hz*(.12+.2*core)*(1.-.6*lit)+(uCity*vec3(1.3,.9,.55)*(H<3.?1.:.4)+uMoon*vec3(.11,.115,.13)*(1.-.5*core))*(1.-uDay);
 float hzf=1.-exp(-d/60.); col=mix(col,hz,hzf*.7);
 float a=dens*mix(.5,.96,thick)*(1.-hzf*.3); return vec4(col*a,a); }
void main(){ vec2 px=vec2(gl_FragCoord.x,uHt*uDpr-gl_FragCoord.y)/uDpr; float a=(px.x-uC.x)/uS.x, b=-(px.y-uC.y)/uS.y;
 vec3 e=uH*normalize(vec3(a,b,1.)); float alt=degrees(asin(clamp(e.z,-1.,1.))); float az=mod(degrees(atan(e.x,e.y))+360.,360.);
 // خط الأفق بدقة: الارتفاع مخزن في بايتين (لا بخطوات عُشر الدرجة) ونمزج بين نقطتين متجاورتين بأنفسنا
 float hp=0., dk=60.;
 if(uHasP>.5){ float u=az/360.*2048.-.5, i0=floor(u), f=u-i0; vec4 A=texture2D(uP,vec2((mod(i0,2048.)+.5)/2048.,.5)), B=texture2D(uP,vec2((mod(i0+1.,2048.)+.5)/2048.,.5));
  hp=mix(A.r*255.*256.+A.b*255.,B.r*255.*256.+B.b*255.,f)/65535.*25.5-2.; dk=.05*pow(2400.,mix(A.g,B.g,f));
  // حافة صخرية: نتوءات ببضعة أمتار على حافة الجبال القريبة (تصغر زاويتها مع البعد)، فلا يبدو الجبل مقصوصاً بالمقص
  // (النتوءات تتبع الجهة لا بُعد القمة، لأن البُعد يقفز حين تتغير القمة من جهة إلى جهة فيظهر شق في الحافة)
  if(hp>.15){ float xm=az*1.6, r=vn(vec2(xm,3.7))*.55+vn(vec2(xm*2.3,9.1))*.3+vn(vec2(xm*5.1,1.3))*.15;
   hp+=(r-.5)*2.*degrees(atan(5./(dk*1000.)))*smoothstep(.15,.6,hp); } }
 vec3 hz=texture2D(uZ,vec2(az/360.,.5)).rgb;
 // حافة الجبل ناعمة بعرض بكسل واحد تقريباً، فلا تظهر درجات السلم على خط الأفق
 float pxd=degrees(uPa)/uDpr, cov=clamp((hp-alt)/pxd+.5,0.,1.);
 vec4 sky=vec4(0.);
 if(cov<1.&&uCldOn>.5){
  // الغيوم من البعيد إلى القريب: العالية الرقيقة، ثم المتوسطة، ثم المنخفضة
  vec4 c=vec4(0.),l;
  if(uCl.z>.01){ l=cloudL(e,8.5,uCl.z,uThr.z,uOffH,6.,vec2(.3,1.),0.,hz); c=l+c*(1.-l.a); }
  if(uCl.y>.01){ l=cloudL(e,4.5,uCl.y,uThr.y,uOffM,2.6,vec2(1.),.7,hz); c=l+c*(1.-l.a); }
  if(uCl.x>.01){ l=cloudL(e,1.6,uCl.x,uThr.x,uOffL,2.2,vec2(1.),1.,hz); c=l+c*(1.-l.a); }
  sky=c*uCldA; } // الغيوم لا تشفّ مع «ما تحت الأفق»: الشفافية للأرض وحدها
 if(cov<=0.){ gl_FragColor=sky; return; }
 float fd=.5-.5*cos(radians(az-uMoonAz));
 // الجبال الحقيقية: لكل نقطة بعدُ الأرض التي تظهر فيها (طبقات من أسفل الجبل إلى قمته)، فيُكسى الصخر بنسيج حقيقي بحجمه الحقيقي
 // (المتر في النسيج يصغر مع البعد)، ويذوب في لون السماء كلما بعد (ضباب الجو)، ويُضاء من الشمس إن كانت خلفك ويُعتم إن كانت أمامك
 float lv=clamp(alt/max(hp,.05),0.,1.)*12.; float dl=uHasP>.5?.05*pow(2400.,texture2D(uL,vec2(az/360.,clamp(lv,.5,11.5)/12.)).r):dk;
 // النسيج بحجم زاوي ثابت (كصخر على بعد كيلومترين تقريباً) فلا تظهر خطوط حيث يتغير بعد الجبل من جهة إلى جهة، والبعد الحقيقي
 // يظهر في الضباب واللون. ونمزج مقياسين مع إزاحة، وبقعاً كبيرة من الضوء واللون، فلا يتكرر النسيج كورق الحائط
 vec2 q=vec2(az,-alt);
 vec3 r1=texture2D(uR,q/vec2(1.5,.75)).rgb, r2=texture2D(uR,q.yx*vec2(-1.,1.)/vec2(4.,2.)+.37).rgb;
 float big=vn(q/18.)*.65+vn(q/5.)*.35; vec3 rk=mix(r1,r2,.35+.3*vn(q/7.));
 // الضوء على وجه الجبل: اتجاه الوجه محسوب من بيانات الارتفاع، فتضيء الشمس الوجوه المقابلة لها وتظلم الأودية والوجوه الأخرى
 vec2 nn=texture2D(uN,vec2(az/360.,clamp(lv,.5,11.5)/12.)).rg*2.-1.; vec3 nv=vec3(nn,sqrt(max(0.,1.-dot(nn,nn))));
 float lam=max(0.,dot(nv,uSunV)); float sun=uHasN>.5?mix(.55,.5+.75*lam,uSunUp):mix(.66,1.,uSunUp*(.5-.5*cos(radians(az-uSunAz))));
 float mlam=uHasN>.5?max(0.,dot(nv,uMoonV)):fd;
 float haze=1.-exp(-dl/26.);
 // تفاصيل الصخر خافتة (الجبل على بعد كيلومترات يبدو أنعم للعين)، والضوء والظل هما ما يرسم شكله
 vec3 rkm=mix(vec3(.62,.5,.37),rk,.42+.25*(1.-haze));
 // الأرض المستوية بين المدينة والجبال (السهول) بلون التراب لا الصخر: نسبة الصخر من انحدار الوجه في بيانات الارتفاع
 float steep=uHasN>.5?smoothstep(.998,.86,nv.z):1.;
 vec3 soil=mix(vec3(.56,.49,.39),rk*vec3(.92,.88,.84),.25)*(.92+.16*big);
 vec3 rock=mix(soil,rkm*(.88+.24*big),steep)*sun*1.12;
 vec3 tday=mix(rock*uB,hz,clamp(haze*.9,0.,1.));
 vec3 tnight=hz*.5+vec3(.6,.52,.42)*(.9+.2*big)*uMoon*(.1+.6*mlam)*(1.-haze);
 vec3 tc=mix(tnight,tday,uDay);
 // الأرض القريبة: الصورة، وفي الليل يضيئها القمر أكثر حين تنظر بعيداً عنه (ترى الوجوه المضاءة)
 vec4 g=texture2D(uT,vec2(fract((az+uRot)/360.),clamp(-alt/90.,0.,1.)));
 float y=dot(g.rgb,vec3(.299,.587,.114)); vec3 gc=mix(vec3(y),g.rgb,uSat)*uB*uTint*mix(1.,.7+.6*fd,(1.-uDay)*clamp(uMoon*3.,0.,1.));
 float base=min(hp,0.); float k=smoothstep(base-.9,base-.3,alt);
 gl_FragColor=vec4(mix(gc,tc,k),1.)*uA*cov+sky*(1.-cov); }`));
  gl.linkProgram(pr); if(!gl.getProgramParameter(pr,gl.LINK_STATUS)) throw gl.getProgramInfoLog(pr);
  const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  // بلا مستويات تفاصيل (mipmaps) ومع تكرار أفقي يدوي (fract)، فلا يظهر خط عند التقاء طرفي الصورة
  const mk=()=>{ const t=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,t); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR); return t; };
  const tex=mk(); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,PANO.img);
  const ptex=mk(), ztex=mk(), ltex=mk(), ntex=mk();
  // نسيج الصخر يتكرر (أبعاده قوى للعدد 2) بمستويات تفاصيل، فلا يتلألأ في الجبال البعيدة
  const rtex=gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D,rtex); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,PANO.rock);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT); gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
  Object.assign(PANO,{gl,cv,prog:pr,tex,ptex,ztex,ltex,ntex,rtex,buf,profDirty:true});
  ["uC","uS","uDpr","uHt","uRot","uB","uA","uSat","uDay","uMoon","uMoonAz","uSunAz","uSunUp","uHasP","uHasN","uTint","uRock","uSunV","uMoonV","uH","uCl","uThr","uSunCol","uOffL","uOffM","uOffH","uCldOn","uCldA","uSunAlt","uCity","uPa","uT","uP","uZ","uL","uR","uN"].forEach(k=>PANO.u[k]=gl.getUniformLocation(pr,k));
  return true; }catch(e){ console.warn("pano",e); return false; } }
const panoReady=()=>!!(PANO.gl&&PANO.img);
// خط الأفق الحقيقي: ارتفاعه الزاوي في كل جهة، لنخفي ما وراء الجبال من أسماء ونقرات
function terrainAlt(az){ const P=PANO.prof; if(!P) return 0; const u=((az%360)+360)%360*2, a=Math.floor(u)%720, f=u-Math.floor(u); return ((P.alt[a]*(1-f)+P.alt[(a+1)%720]*f)/10)-2; }
const panoOn=()=>PERSP&&!AR.cam&&panoReady();
function behindTerrain(x,y){ if(!panoOn()) return false; const e=screenDir(x,y), aa=azAltOf(e); return aa.alt<terrainAlt(aa.az)-0.1; }
// لون السماء عند الأفق في كل جهة (كما تُرسم الخلفية)، لتذوب فيه الجبال البعيدة
function skyRGB(az,alt){ const s=sampleSky(az,alt), c=skyDisp(s[0],s[1],s[2],s[3],Math.max(0.17,Math.sin(Math.max(0,alt)*D2R))); return [c[0],c[1],c[2]]; }
// الإضاءة كما تراها العين: الأرض صُوّرت نهاراً فتخفت مع السماء، وفي الليل تتكيف العين فترى الأرض باهتة الألوان مائلة للزرقة،
// والجبال ظلالاً أغمق من السماء خلفها، ويضيء القمر ما يقابله من الأرض. قيم تقريبية لتشبه ما تراه العين، لا قياساً للسطوع
function drawPano(dayF,below){
  panoProfile();
  // رسم متدرج (كما تفعل خرائط جوجل): أثناء الحركة نرسم الأرض والغيوم بدقة أقل فتبقى الحركة سلسة، وحين تتوقف نعيد الرسم بالدقة
  // الكاملة بعد لحظة. والدقة الكاملة على الهاتف حتى ضعفي البكسل (الشاشات الأعلى لا يظهر فيها فرق، وتتعب معالج الرسوم)
  const gl=PANO.gl, cw=Math.round(W*DPR), ch=Math.round(Ht*DPR); if(PANO.cv.width!==cw||PANO.cv.height!==ch){ PANO.cv.width=cw; PANO.cv.height=ch; }
  // «تتحرك» فقط إن انتقلت السماء أكثر من بكسل ونصف تقريباً بين إطارين: ارتعاش حساس الهاتف والحركة البطيئة لا يخفضان الدقة
  const now=performance.now(), L=PANO.sig, pxDeg=R2D/Math.abs(SX||1);
  const moving=!!L&&(Math.abs(((st.az-L.az+540)%360)-180)*Math.cos(Math.min(89,Math.abs(st.alt))*D2R)>1.5*pxDeg||Math.abs(st.alt-L.alt)>1.5*pxDeg||Math.abs(st.fov-L.fov)>st.fov*0.004||L.W!==W||L.H!==Ht||L.fh!==st.flipH||L.fv!==st.flipV);
  PANO.sig={az:st.az,alt:st.alt,fov:st.fov,W,H:Ht,fh:st.flipH,fv:st.flipV}; if(moving) PANO.mvT=now;
  const full=Math.min(1,(COARSE?2:2.5)/DPR), q=now-(PANO.mvT||0)<160?Math.min(full,COARSE?0.5:0.65):full, qw=Math.max(1,Math.round(cw*q)), qh=Math.max(1,Math.round(ch*q));
  PANO.q=q/full; if(q<full){ clearTimeout(PANO.sharpT); PANO.sharpT=setTimeout(()=>{ dirty=true; },200); }
  gl.viewport(0,0,qw,qh); gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT); gl.useProgram(PANO.prog);
  if(PANO.profDirty){ PANO.profDirty=false; const P=PANO.prof, d=new Uint8Array(2048*4);
    // الارتفاعات محفوظة بخطوات عُشر الدرجة: تنعيم خفيف يزيل الدرجات، ثم منحنى ناعم (Catmull-Rom) بين نقاط نصف الدرجة، وبايتان للدقة
    if(P){ const A=new Float32Array(720); for(let i=0;i<720;i++) A[i]=(P.alt[(i+719)%720]+2*P.alt[i]+P.alt[(i+1)%720])/40-2;
      for(let i=0;i<2048;i++){ const u=i*720/2048, a=Math.floor(u), f=u-a, p0=A[(a+719)%720],p1=A[a%720],p2=A[(a+1)%720],p3=A[(a+2)%720];
        const h=p1+0.5*f*(p2-p0+f*(2*p0-5*p1+4*p2-p3+f*(3*(p1-p2)+p3-p0))), v=Math.max(0,Math.min(65535,Math.round((h+2)/25.5*65535)));
        d[i*4]=v>>8; d[i*4+2]=v&255; d[i*4+1]=Math.round(P.dist[a%720]*(1-f)+P.dist[(a+1)%720]*f); d[i*4+3]=255; } }
    gl.bindTexture(gl.TEXTURE_2D,PANO.ptex); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,2048,1,0,gl.RGBA,gl.UNSIGNED_BYTE,d);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);
    // تنعيم خفيف للبعد واتجاه الوجه عبر الجهات والطبقات (البيانات كل نصف درجة وفي 12 طبقة)، فلا تظهر مربعات بحواف حادة
    const smooth=(get,ra,rk)=>{ const out=new Float32Array(720*12); for(let k=0;k<12;k++) for(let a=0;a<720;a++){ let sm=0,w=0; for(let dk=-rk;dk<=rk;dk++){ const kk=k+dk; if(kk<0||kk>11) continue; for(let da=-ra;da<=ra;da++){ const ww=(ra+1-Math.abs(da))*(rk+1-Math.abs(dk)); sm+=get(kk,(a+da+720)%720)*ww; w+=ww; } } out[k*720+a]=sm/w; } return out; };
    const up=(arr,k,i)=>{ const u=i*720/1024, a=Math.floor(u)%720, b=(a+1)%720, f=u-Math.floor(u); return arr[k*720+a]*(1-f)+arr[k*720+b]*f; };
    const L=new Uint8Array(1024*12*4), N=new Uint8Array(1024*12*4);
    if(P&&P.lay){ const sl=smooth((k,a)=>P.lay[k*720+a],3,1); for(let k=0;k<12;k++) for(let i=0;i<1024;i++){ const o=(k*1024+i)*4; L[o]=Math.round(up(sl,k,i)); L[o+3]=255; } }
    gl.bindTexture(gl.TEXTURE_2D,PANO.ltex); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1024,12,0,gl.RGBA,gl.UNSIGNED_BYTE,L);
    if(P&&P.nrm){ const sx=smooth((k,a)=>P.nrm[(k*720+a)*2],3,1), sy=smooth((k,a)=>P.nrm[(k*720+a)*2+1],3,1); for(let k=0;k<12;k++) for(let i=0;i<1024;i++){ const o=(k*1024+i)*4; N[o]=Math.round(up(sx,k,i)); N[o+1]=Math.round(up(sy,k,i)); N[o+3]=255; } }
    gl.bindTexture(gl.TEXTURE_2D,PANO.ntex); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1024,12,0,gl.RGBA,gl.UNSIGNED_BYTE,N); }
  const z=PANO.zbuf; for(let i=0;i<64;i++){ const c=skyRGB(i*360/64,1.5); z[i*4]=c[0]*255; z[i*4+1]=c[1]*255; z[i*4+2]=c[2]*255; z[i*4+3]=255; }
  gl.bindTexture(gl.TEXTURE_2D,PANO.ztex); gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,64,1,0,gl.RGBA,gl.UNSIGNED_BYTE,z);
  const lit=GLIT(dayF), n=1-lit, U=PANO.u, mo=bodies&&bodies.find(b=>b.id==="moon");
  const moon=mo&&mo.v?Math.max(0,dot(M[2],mo.v))**0.5*(mo.frac||0):0, mAz=mo&&mo.v?altAz(mo.v).az:0, city=[0,0.03,0.07,0.12][st.lp]||0;
  cloudLoad(); const cl=st.layers.clouds?cloudsAt(st.t):null, thick=cl?Math.max(cl.lo,cl.mi):0; cloudNote();
  // السماء الملبدة تحجب ضوء الشمس المباشر: الجبال بلا ظلال وأخفت قليلاً
  const nightB=0.24+0.3*moon*(1-0.6*thick)+city, B=(nightB+(1-nightB)*lit)*(1-0.3*thick*lit), su=bodies&&bodies[0], sAz=su&&su.v?altAz(su.v).az:0;
  gl.uniform1f(U.uCldOn,cl?1:0); { const k=CLD.tIn?Math.min(1,(performance.now()-CLD.tIn)/900):1; gl.uniform1f(U.uCldA,k*k*(3-2*k)); if(k<1) dirty=true; } gl.uniform1f(U.uSunAlt,sunAlt); gl.uniform1f(U.uCity,city); gl.uniform1f(U.uPa,1/Math.abs(SX||1));
  { const w=clamp01((8-sunAlt)/10), r=clamp01(-sunAlt/4); gl.uniform3f(U.uSunCol,1,1-0.3*w-0.1*r,1-0.5*w-0.15*r); }
  if(cl){ gl.uniform3f(U.uCl,cl.lo,cl.mi,cl.hi); gl.uniform3f(U.uThr,CLD_Q(cl.lo),CLD_Q(cl.mi),CLD_Q(cl.hi)); const o=cl.off;
    gl.uniform2f(U.uOffL,o[0],o[1]); gl.uniform2f(U.uOffM,o[0]*1.4,o[1]*1.4); gl.uniform2f(U.uOffH,o[0]*2,o[1]*2); }
  gl.uniform2f(U.uC,CX,CY); gl.uniform2f(U.uS,SX,SY); gl.uniform1f(U.uDpr,DPR*qw/cw); gl.uniform1f(U.uHt,Ht); gl.uniform1f(U.uRot,PANO.ROT);
  gl.uniform1f(U.uB,B); gl.uniform1f(U.uA,below?0.72:1); gl.uniform1f(U.uSat,0.18+0.82*lit+0.25*moon*n); gl.uniform3f(U.uTint,1-0.22*n+0.25*city*n,1-0.12*n+0.08*city*n,1+0.06*n-0.2*city*n);
  gl.uniform1f(U.uDay,lit); gl.uniform1f(U.uMoon,moon*n); gl.uniform1f(U.uMoonAz,mAz); gl.uniform1f(U.uHasP,PANO.prof?1:0); gl.uniform1f(U.uSunAz,sAz); gl.uniform1f(U.uSunUp,clamp01((sunAlt+2)/10)*(1-0.8*thick)); gl.uniform1f(U.uHasN,PANO.prof&&PANO.prof.nrm?1:0);
  { const sv=su&&su.v?[dot(M[0],su.v),dot(M[1],su.v),dot(M[2],su.v)]:[0,0,1], mv=mo&&mo.v?[dot(M[0],mo.v),dot(M[1],mo.v),dot(M[2],mo.v)]:[0,0,1]; gl.uniform3f(U.uSunV,sv[0],sv[1],sv[2]); gl.uniform3f(U.uMoonV,mv[0],mv[1],mv[2]); } gl.uniform3f(U.uRock,0.6,0.5,0.39);
  gl.uniformMatrix3fv(U.uH,false,new Float32Array([H[0][0],H[0][1],H[0][2],H[1][0],H[1][1],H[1][2],H[2][0],H[2][1],H[2][2]]));
  gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D,PANO.tex); gl.uniform1i(U.uT,0);
  gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D,PANO.ptex); gl.uniform1i(U.uP,1);
  gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D,PANO.ztex); gl.uniform1i(U.uZ,2);
  gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D,PANO.ltex); gl.uniform1i(U.uL,3);
  gl.activeTexture(gl.TEXTURE4); gl.bindTexture(gl.TEXTURE_2D,PANO.rtex); gl.uniform1i(U.uR,4);
  gl.activeTexture(gl.TEXTURE5); gl.bindTexture(gl.TEXTURE_2D,PANO.ntex); gl.uniform1i(U.uN,5); gl.activeTexture(gl.TEXTURE0);
  gl.bindBuffer(gl.ARRAY_BUFFER,PANO.buf); const loc=gl.getAttribLocation(PANO.prog,"p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
  ctx.save(); ctx.setTransform(1,0,0,1,0,0); ctx.globalAlpha=1; ctx.globalCompositeOperation="source-over"; ctx.filter="none"; ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="high"; ctx.drawImage(PANO.cv,0,ch-qh,qw,qh,0,0,cw,ch); ctx.restore();
}
// تلال عامة منخفضة على الأفق (ليست أفق مكان حقيقي)، ارتفاعها أقل من درجة ونصف
const hillAlt=az=>{ const a=az*D2R; return Math.max(0,0.35+0.4*Math.sin(3*a+0.7)**2+0.28*Math.sin(7*a+2.1)+0.14*Math.sin(13*a+0.4)); };
function drawHills(col){ drawSil(hillAlt,col,2,viewAz()); }
// الجزء الظاهر من الأفق (#386): عند التكبير الشديد (قرّب إلى الزهرة) كانت الجبال والمباني تُحسب على الأفق كله كل درجتين،
// فتقع نقاطها على بعد ملايين البكسلات وتملأ مضلعات ضخمة في كل إطار، فيهنج الهاتف. هنا السمت من..إلى وأدنى وأعلى ارتفاع على الشاشة،
// أو null في المنظر الواسع وقرب سمت الرأس، فيُرسم الأفق كله كما كان
let VAZ_OFF=false;
function viewAz(){ if(VAZ_OFF||st.fov>=30) return null; const A=[];
  for(const x of [0,W/2,W]) for(const y of [0,Ht/2,Ht]){ const e=screenDir(x,y); if(!e||!e.every(Number.isFinite)) return null; A.push(azAltOf(e)); }
  const c=A[4].az; let lo=0,hi=0,amin=90,amax=-90;
  for(const a of A){ const d=((a.az-c+540)%360)-180; lo=Math.min(lo,d); hi=Math.max(hi,d); amin=Math.min(amin,a.alt); amax=Math.max(amax,a.alt); }
  if(hi-lo>90||amax>75) return null; const pad=Math.max((hi-lo)*0.25,0.002);
  return { a0:c+lo-pad, a1:c+hi+pad, amin, amax }; }
const inViewAz=(az,V)=>!V||((az-V.a0)%360+360)%360<=V.a1-V.a0;
function drawSil(fn,col,step,V){
  let a0=0,a1=360;
  if(V){ a0=V.a0; a1=V.a1; step=Math.min(step,Math.max((a1-a0)/120,1e-4));
    let mx=-0.4; for(let az=a0;az<=a1;az+=step) mx=Math.max(mx,fn(az)); if(V.amin>mx+0.3||V.amax<-0.7) return null; }
  ctx.save(); ctx.fillStyle=col; let seg=[]; const all=new Path2D();
  const flush=()=>{ if(seg.length>1){ const P=new Path2D(); seg.forEach((p,i)=>i?P.lineTo(p[0],p[1]):P.moveTo(p[0],p[1])); for(let i=seg.length-1;i>=0;i--) P.lineTo(seg[i][2],seg[i][3]); P.closePath(); ctx.fill(P); all.addPath(P); } seg=[]; };
  for(let az=a0;az<=a1+1e-9;az+=step){ const h=hor(az,fn(az)), g=hor(az,-0.4), p=projH(h[0],h[1],h[2]), q=projH(g[0],g[1],g[2]); if(p&&q&&p[2]>-0.6) seg.push([p[0],p[1],q[0],q[1]]); else flush(); }
  flush(); ctx.restore(); return all;
}
// الأرض حول القبة وتحت الأفق في سماء مكاني (#364): لونها من ضوء السماء فوق الأفق (فتظهر في الليل باهتة كما تراها العين، وتضيء مع
// القمر والمدينة والنهار)، وتغمق بعيداً عن الأفق، وعليها حبيبات خفيفة كالتربة. على الأفق جبال المدينة الحقيقية من بيانات الارتفاع
// (ملف الأفق نفسه الذي يستعمله 3D) أو تلال منخفضة عامة، وفي «طرف مدينة» و«وسط مدينة» صف مبانٍ بعيدة رسمٌ عام لا مبانٍ حقيقية
let GPAT=null, BLDK=-1, BLD=null;
function bldTable(){ if(BLDK===st.lp) return BLD; BLDK=st.lp; BLD=new Float32Array(1440); if(st.lp<2) return BLD;
  let s=12345; const R=()=>((s=(s*1664525+1013904223)>>>0)/4294967296), hMax=st.lp>=3?4.5:2.2; let i=0;
  while(i<1440){ const w=3+Math.floor(R()*13), gap=R()<(st.lp>=3?0.12:0.4), h=gap?0:0.3+R()*R()*hMax; for(let k=0;k<w&&i<1440;k++,i++) BLD[i]=h; }
  return BLD; }
const bldAlt=az=>bldTable()[Math.floor((((az%360)+360)%360)*4)%1440];
function drawDomeGround(hz){
  panoProfile();
  let r=0,g=0,b=0; for(let a=0;a<360;a+=45){ const c=skyRGB(a,2); r+=c[0]; g+=c[1]; b+=c[2]; } r/=8; g/=8; b/=8;
  const G=[clamp01(r*0.6+0.05),clamp01(g*0.56+0.05),clamp01(b*0.42+0.038)], css=(c,k=1)=>`rgb(${Math.round(c[0]*k*255)},${Math.round(c[1]*k*255)},${Math.round(c[2]*k*255)})`;
  if(!GPAT){ const c=document.createElement("canvas"); c.width=c.height=96; const x=c.getContext("2d"), im=x.createImageData(96,96); let s=7; const R=()=>((s=(s*1664525+1013904223)>>>0)/4294967296);
    for(let i=0;i<96*96;i++){ const v=R(), o=i*4; if(v<0.5){ im.data[o+3]=Math.round((0.5-v)*70); } else { im.data[o]=255; im.data[o+1]=236; im.data[o+2]=200; im.data[o+3]=Math.round((v-0.5)*26); } }
    x.putImageData(im,0,0); GPAT=ctx.createPattern(c,"repeat"); }
  ctx.save(); pathGround(hz); ctx.fillStyle=css(G); ctx.fill("evenodd"); ctx.clip("evenodd");
  if(GPAT){ ctx.fillStyle=GPAT; ctx.fillRect(-10,-10,W+20,Ht+20); }
  if(hz.type==="circle"&&hz.skyInside){ const R2=Math.max(...[[0,0],[W,0],[0,Ht],[W,Ht]].map(q=>Math.hypot(q[0]-hz.x,q[1]-hz.y))), gr=ctx.createRadialGradient(hz.x,hz.y,hz.r,hz.x,hz.y,Math.max(hz.r+1,R2));
    gr.addColorStop(0,"rgba(0,0,0,0)"); gr.addColorStop(0.12,"rgba(0,0,0,.12)"); gr.addColorStop(1,"rgba(0,0,0,.62)"); ctx.fillStyle=gr; ctx.fillRect(-10,-10,W+20,Ht+20); }
  else if(hz.type==="line"){ const dx=hz.b[0]-hz.a[0],dy=hz.b[1]-hz.a[1],L=Math.hypot(dx,dy)||1; let nx=-dy/L,ny=dx/L;
    const t=((CX-hz.a[0])*dx+(CY-hz.a[1])*dy)/(L*L), fx=hz.a[0]+dx*t, fy=hz.a[1]+dy*t; if(hz.z&&(hz.z[0]-fx)*nx+(hz.z[1]-fy)*ny>0){ nx=-nx; ny=-ny; }
    const gr=ctx.createLinearGradient(fx,fy,fx+nx*Ht,fy+ny*Ht); gr.addColorStop(0,"rgba(0,0,0,0)"); gr.addColorStop(0.1,"rgba(0,0,0,.1)"); gr.addColorStop(1,"rgba(0,0,0,.55)"); ctx.fillStyle=gr; ctx.fillRect(-10,-10,W+20,Ht+20); }
  ctx.restore();
  const P=PANO.prof, far=[r*0.6+G[0]*0.15,g*0.6+G[1]*0.15,b*0.6+G[2]*0.15];
  const V=viewAz(); let sil=drawSil(az=>Math.max(P?terrainAlt(az):0,hillAlt(az)*1.6),css(far),P?0.5:1,V);
  if(st.lp>=2){ sil=drawSil(bldAlt,css(G,0.78),0.25,V);
    // نوافذ مضيئة قليلة في المباني البعيدة
    ctx.save(); ctx.fillStyle=st.lp>=3?"rgba(255,214,150,.75)":"rgba(255,214,150,.5)"; const T=bldTable(); let s=99; const R=()=>((s=(s*1664525+1013904223)>>>0)/4294967296);
    for(let i=0;i<1440;i+=3){ const h=T[i], q=R(), q2=R(); if(h<0.6||q>(st.lp>=3?0.5:0.22)||!inViewAz(i/4,V)) continue; const v=hor(i/4,0.15+q2*(h-0.3)), p=projH(v[0],v[1],v[2]); if(p&&p[2]>-0.6) ctx.fillRect(p[0]-0.6,p[1]-0.6,1.3,1.3); }
    ctx.restore(); }
  return sil;
}

// ================================================================ الرسم
let hits=[], labels=[], dirty=true, drawnLow=0;
function polyline(vs,minZ,cull){ ctx.beginPath(); const ps=[]; for(const v of vs){ const p=(cull&&!cull(v))?null:projJ(v); ps.push(p&&p[2]>=minZ?p:null); } segPath(ps); }
// خطوط الكوكبات تقف قبل النجم بقليل، فيظهر النجم واضحاً ولا يبدو الخط مثقوباً به
// قص قطعة عند الشاشة مع هامش (Liang–Barsky)، فلا يُرسم خط طوله ملايين البكسلات عند التكبير الشديد (#386)، ولا يتغير ما يظهر
function clipSeg(x0,y0,x1,y1,m){ let t0=0,t1=1; const dx=x1-x0,dy=y1-y0, P=[-dx,dx,-dy,dy], Q=[x0+m,W+m-x0,y0+m,Ht+m-y0];
  for(let i=0;i<4;i++){ if(P[i]===0){ if(Q[i]<0) return null; continue; } const r=Q[i]/P[i];
    if(P[i]<0){ if(r>t1) return null; if(r>t0) t0=r; } else { if(r<t0) return null; if(r<t1) t1=r; } }
  return [x0+t0*dx,y0+t0*dy,x0+t1*dx,y0+t1*dy]; }
// خط من نقاط مسقطة (null يقطعه) يُضاف إلى المسار مقصوصاً عند الشاشة مع هامش 24 بكسل (#409، المالك: «لما جيت اعمل زوم ع الزهرة هنج … بيخرج من الموقع كله»):
// عند التكبير الشديد يصير طول خط الشبكة أو البروج أو الحدود أو الاستواء ملايين البكسلات، والمتصفح يقطّع الخط المتقطع شُرَطاً على طوله كله،
// فقِيس في المختبر 586 ملي ثانية للإطار من الشبكة وحدها والكود نفسه 2 ملي ثانية، وعلى معالج رسوم الهاتف يتوقف الإطار حتى تُغلق الصفحة.
// ولا يتغير ما يظهر: القطعة المقصوصة تبدأ من نقطة على امتدادها بطور الشُّرَط نفسه الذي كانت ستأخذه من أول الخط، فتبقى الشُّرَط في مواضعها
function segPath(ps,closed){ const dl=ctx.getLineDash(), per=dl.length?dl.reduce((a,b)=>a+b,0)*(dl.length%2?2:1):0, n=ps.length; let last=null, acc=0; // acc: الطول من أول الخط قبل القص
  for(let i=0;i<(closed?n:n-1);i++){ const a=ps[i], b=ps[(i+1)%n]; if(!a||!b){ last=null; acc=0; continue; }
    const dx=b[0]-a[0], dy=b[1]-a[1], L=Math.hypot(dx,dy)||1, c=clipSeg(a[0],a[1],b[0],b[1],24); if(!c){ last=null; acc+=L; continue; }
    if(last!==a){ const k=per?((acc+Math.hypot(c[0]-a[0],c[1]-a[1]))%per)/L:0; ctx.moveTo(c[0]-dx*k,c[1]-dy*k); }
    ctx.lineTo(c[2],c[3]); acc+=L; last=Math.hypot(c[2]-b[0],c[3]-b[1])<0.5?b:null; } }
function gapline(vs,minZ,cull,g){ ctx.beginPath(); let a=null; for(const v of vs){ const p=(cull&&!cull(v))?null:projJ(v); const b=p&&p[2]>=minZ?p:null;
  if(a&&b){ const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy); if(L>2*g+2){ const ux=dx/L,uy=dy/L, s=clipSeg(a[0]+ux*g,a[1]+uy*g,b[0]-ux*g,b[1]-uy*g,24); if(s){ ctx.moveTo(s[0],s[1]); ctx.lineTo(s[2],s[3]); } } } a=b; } }
function spikes(x,y,len,col,a){ ctx.save(); ctx.globalAlpha=a; ctx.strokeStyle=col; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(x-len,y); ctx.lineTo(x+len,y); ctx.moveTo(x,y-len); ctx.lineTo(x,y+len); ctx.stroke(); ctx.restore(); }

function render(){ if(!window.__atlas){ render0(); return; } const t0=performance.now(); render0(); const P=window.__prof=window.__prof||{n:0,ms:0}; P.n++; P.ms+=performance.now()-t0; }
function render0(){
  dirty=false;
  if(frameT!==st.t||frameObs!==obs||!M) computeSky();
  trackBody();
  updateViewport(); camera(); scale();
  hits=[]; labels=[]; drawnLow=0;
  const atlas=st.mode==="atlas", focus=st.focus, below=atlas||belowOn(), sc=skyColors(), dayF=sc[2], REAL=REAL_ON()&&!focus, nowT=performance.now();
  LDAY=REAL&&!atlas?dayF:0; belowTmpCheck();
  if(AR.cam){ ctx.clearRect(0,0,W,Ht); ctx.fillStyle="rgba(4,8,20,.28)"; ctx.fillRect(0,0,W,Ht); }
  else if(REAL) drawRealSky();
  else { const g=ctx.createLinearGradient(0,0,0,Ht); g.addColorStop(0,sc[0]); g.addColorStop(1,sc[1]); ctx.fillStyle=g; ctx.fillRect(0,0,W,Ht); }
  const minU=Math.sin((below?-91:-1.5)*D2R), visible=v=>dot(MR[2],v)>minU;
  // على الهاتف: أسماء ما تحت الأفق باهتة، لأنه لا يُرى الآن
  const lowLab=!atlas&&COARSE&&below, dimL=(L,u)=>{ if(lowLab&&u<0){ L.col="rgba(160,150,132,.6)"; L.pr+=3; L.low=1; } return L; };
  const pxPerDeg=S*D2R, ctxDim=focus?0.22:1;
  const limMag=(dayF>=1?1.5:6.2-Math.max(0,(st.fov-60)/120))-dayF*3.5;
  // على الهاتف: أخفت نجم تراه العين من سطوع السماء حول اتجاه نظرك، والتكبير يُظهر نجوماً أخفت حتى حد البيانات
  let limEye=99, limR=limMag; if(REAL){ limEye=XPS.limitingMag(adaptLum()); limR=Math.min(limEye,(COARSE?5.0:5.9)+1.4*clamp01((110-st.fov)/90)); } // شاشة الحاسوب الكبيرة تتسع لنجوم العين كلها في المجال الواسع
  st.limShown=+Math.min(REAL?limR:limMag,DATA_MAX).toFixed(2); st.limEye=+limEye.toFixed(2);
  const focusSet = focus? starCons() : null;
  const astSel = st.ast? ASTS[st.ast] : null;
  const RT=st.route?ROUTES[st.route]:null;
  // في الأطلس: نظلل ما تحت أفق المكان الآن، ونخفت نجومه (إلا عند عرض كوكبة أو طريق وحده، فالمهم شكله)
  const hzOn=atlas&&st.layers.horizon&&!focus&&!RT&&!astSel&&!EMBED, hz=hzOn?atlasHorizon():null;
  if(hz){ ctx.save(); pathGround(hz); ctx.fillStyle="rgba(2,3,8,.42)"; ctx.fill("evenodd"); ctx.restore(); }

  // درب التبانة
  if(REAL){ st.mwFade=st.layers.mw&&!AR.cam?clamp01((limEye-4.4)/1.6):0; drawRealMW(pxPerDeg,st.mwFade); }
  else if(st.layers.mw && dayF<.6 && !AR.cam){
    ctx.save(); ctx.globalCompositeOperation="lighter"; const sz=Math.max(8,pxPerDeg*3.6);
    for(const [v,l] of MWV){ if(!visible(v)) continue; const p=projJ(v); if(!onScreen(p,sz)) continue; const k=magK(p[2]); ctx.globalAlpha=(0.010+l*0.013)*(1-dayF*1.6)*(focus?0.45:1); ctx.drawImage(blob,p[0]-sz*k/2,p[1]-sz*k/2,sz*k,sz*k); }
    ctx.restore(); ctx.globalAlpha=1;
  }
  // الشبكة
  if(st.layers.grid){
    ctx.save(); ctx.strokeStyle="rgba(207,169,85,.2)"; ctx.lineWidth=1; ctx.setLineDash([2,5]);
    const draw=(fn)=>{ const ps=[]; fn(p=>ps.push(p||null)); ctx.beginPath(); segPath(ps); ctx.stroke(); };
    const P=(az,alt)=>{ if(atlas){ const p=projJ(vec(-az,alt)); return p; } const h=hor(az,alt); return projH(h[0],h[1],h[2]); };
    const step=atlas?15:10;
    const a0=atlas?-75:lowLab?-80:10, a1=atlas?-88:lowLab?-88:0;
    for(let a=a0;a<90;a+=step) draw(put=>{ for(let az=0;az<=360;az+=3) put(P(az,a)); });
    for(let az=0;az<360;az+=30) draw(put=>{ for(let a=a1;a<=88;a+=4) put(P(az,a)); });
    ctx.setLineDash([]); ctx.fillStyle="rgba(207,169,85,.6)"; ctx.font="11px "+FUI; ctx.textAlign="center";
    if(atlas){ for(let h=0;h<24;h+=2){ const p=projJ(vec(h*15,0)); if(onScreen(p)) ctx.fillText(h+"س",p[0],p[1]-4); } for(let a=-60;a<=60;a+=30){ if(!a) continue; const p=projJ(vec((-st.az+360)%360,a)); if(onScreen(p)) ctx.fillText(a+"°",p[0]+14,p[1]-3); } }
    else for(let a=(lowLab?-70:10);a<90;a+=20){ const p=P(st.az,a); if(onScreen(p)) ctx.fillText("\u2066"+(a<0?"−"+(-a):a)+"°\u2069",p[0]+14,p[1]-3); }
    ctx.restore();
  }
  // الشبكة الاستوائية في سماء مكاني (على الهاتف): دوائر الميل كل 15 درجة، وخطوط المطلع كل ساعتين، وخط الاستواء السماوي أوضح
  if(!atlas&&COARSE&&st.layers.gridEq){
    ctx.save(); ctx.strokeStyle="rgba(130,175,255,.24)"; ctx.lineWidth=1; ctx.setLineDash([2,5]); const cull=below?null:visible;
    for(let d=-75;d<90;d+=15){ if(!d) continue; const ring=[]; for(let a=0;a<=360;a+=3) ring.push(vec(a,d)); polyline(ring,-0.7,cull); ctx.stroke(); }
    for(let h=0;h<24;h+=2){ const mer=[]; for(let d=-88;d<=88;d+=4) mer.push(vec(h*15,d)); polyline(mer,-0.7,cull); ctx.stroke(); }
    ctx.setLineDash([]); ctx.strokeStyle="rgba(130,175,255,.45)"; polyline(EQU,-0.7,cull); ctx.stroke();
    ctx.fillStyle="rgba(150,190,255,.75)"; ctx.font="11px "+FUI; ctx.textAlign="center";
    for(let h=0;h<24;h+=2){ const v=vec(h*15,0); if(cull&&!cull(v)) continue; const p=projJ(v); if(onScreen(p)) ctx.fillText("\u2066"+h+"h\u2069",p[0],p[1]-4); }
    ctx.restore();
  }
  // خط الاستواء السماوي دائماً في الأطلس، ليعرف القارئ أين الشمال والجنوب من الخريطة
  if(atlas&&!st.layers.grid){ ctx.save(); ctx.strokeStyle="rgba(130,175,255,.3)"; ctx.lineWidth=1; ctx.setLineDash([3,6]); polyline(EQU,-0.7); ctx.stroke(); ctx.restore(); }
  if(atlas&&!focus){ const p=projJ(vec((360-st.az)%360,0)); if(onScreen(p,-30)) labels.push({x:p[0],y:p[1]-6,t:"خط الاستواء السماوي",font:"12px "+FUI,col:"rgba(150,190,255,.7)",pr:6}); }
  // دائرة البروج
  if(st.layers.ecliptic){ ctx.save(); ctx.strokeStyle="rgba(207,169,85,.5)"; ctx.lineWidth=1.2; ctx.setLineDash([6,5]); polyline(ECL,-0.7); ctx.stroke(); ctx.restore(); }
  // الحدود
  const selConId = focus || (st.sel&&st.sel.type==="con"? st.sel.id : null);
  if(st.layers.bounds||selConId){
    ctx.save(); ctx.lineWidth=1; ctx.setLineDash([3,4]);
    for(const k in BOUNDV){ const on=k===selConId; if(!st.layers.bounds&&!on) continue; if(!on&&HID.c.has(k)) continue; if(!on&&myOn()&&!MY.c.has(k)) continue; ctx.strokeStyle=on?"rgba(207,169,85,.3)":"rgba(150,182,232,"+(focus?0.06:0.18)+")";
      for(const ring of BOUNDV[k]){ polyline(ring.concat([ring[0]]),-0.6, below?null:visible); ctx.stroke(); } }
    ctx.restore();
  }
  // خطوط الكوكبات
  if(st.layers.lines||selConId){
    ctx.save(); ctx.lineJoin="round"; ctx.lineCap="round";
    const LV=lineSet(), LVF=(focus&&st.detail==="full")?LINEV:LV;
    for(const k in LV){ const on=k===selConId; if(!st.layers.lines&&!on) continue; if(on||(HID.c.has(k)&&!PICK.on)) continue; if(myOn()&&!MY.c.has(k)) continue;
      ctx.strokeStyle=focus?LINE_DIM:(RT?"rgba(150,182,232,.22)":LINE); ctx.lineWidth=1.2; ctx.globalAlpha=1-dayF*.6;
      for(const seg of LV[k]){ gapline(seg,-0.6, below?null:visible,4); ctx.stroke(); } }
    if(selConId&&LVF[selConId]){ ctx.globalAlpha=1; ctx.strokeStyle=BRASS_HI; ctx.lineWidth=1.8; ctx.shadowColor="rgba(240,203,120,.45)"; ctx.shadowBlur=3;
      for(const seg of LVF[selConId]){ gapline(seg,-0.6, below?null:visible,5.5); ctx.stroke(); } }
    ctx.restore(); ctx.globalAlpha=1;
  }
  // خطوط الاهتداء في الشكل البسيط
  if(focus&&st.detail!=="full"&&POINTERS[focus]){
    ctx.save(); ctx.setLineDash([5,6]); ctx.lineWidth=1.3; ctx.strokeStyle="rgba(150,200,255,.55)";
    for(const g of POINTERS[focus]){ const ps=g.p.map(h=>{ const v=starV(h); return v?projJ(v):null; }); if(ps.some(p=>!p||p[2]<-0.6)) continue;
      const a=ps[ps.length-2], b=ps[ps.length-1]; ctx.beginPath(); segPath(ps); ctx.stroke();
      const ang=Math.atan2(b[1]-a[1],b[0]-a[0]); ctx.setLineDash([]); ctx.beginPath(); ctx.moveTo(b[0]-Math.cos(ang)*10,b[1]-Math.sin(ang)*10); ctx.lineTo(b[0]-Math.cos(ang)*18-Math.sin(ang)*5,b[1]-Math.sin(ang)*18+Math.cos(ang)*5); ctx.moveTo(b[0]-Math.cos(ang)*10,b[1]-Math.sin(ang)*10); ctx.lineTo(b[0]-Math.cos(ang)*18+Math.sin(ang)*5,b[1]-Math.sin(ang)*18-Math.cos(ang)*5); ctx.stroke(); ctx.setLineDash([5,6]);
      const m=ps[Math.max(1,ps.length-2)], mx=(m[0]+b[0])/2, my=(m[1]+b[1])/2; labels.push({x:mx,y:my-6,t:g.t,font:"12.5px "+FUI,col:"rgba(170,210,255,.85)",pr:0.5}); }
    ctx.restore();
  }
  // طريق الاهتداء المختار
  if(RT){
    ctx.save(); ctx.lineJoin="round"; ctx.lineCap="round";
    ctx.strokeStyle="rgba(150,182,232,.75)"; ctx.lineWidth=1.6;
    for(const seg of RT.sv){ polyline(seg,-0.6, below?null:visible); ctx.stroke(); }
    const ps=RT.pv.map(v=>(below||visible(v))?projJ(v):null);
    ctx.strokeStyle="rgba(240,203,120,.95)"; ctx.fillStyle="rgba(240,203,120,.95)"; ctx.lineWidth=2; ctx.setLineDash([7,6]);
    for(let i=1;i<ps.length;i++){ const a=ps[i-1], b=ps[i]; if(!a||!b||a[2]<-0.6||b[2]<-0.6) continue;
      const L=Math.hypot(b[0]-a[0],b[1]-a[1]); if(L<4) continue; const ux=(b[0]-a[0])/L, uy=(b[1]-a[1])/L, pad=Math.min(9,L/4);
      ctx.beginPath(); segPath([[a[0]+ux*pad,a[1]+uy*pad],[b[0]-ux*pad,b[1]-uy*pad]]); ctx.stroke();
      if(!RT.closed||true){ ctx.save(); ctx.setLineDash([]); const tx=b[0]-ux*pad, ty=b[1]-uy*pad; ctx.beginPath(); ctx.moveTo(tx,ty); ctx.lineTo(tx-ux*10-uy*5,ty-uy*10+ux*5); ctx.lineTo(tx-ux*10+uy*5,ty-uy*10-ux*5); ctx.closePath(); ctx.fill(); ctx.restore(); } }
    ctx.setLineDash([]);
    ps.forEach((p,i)=>{ if(!p||p[2]<-0.6) return; ctx.beginPath(); ctx.arc(p[0],p[1],i===ps.length-1&&!RT.closed?11:7,0,Math.PI*2); ctx.strokeStyle="rgba(240,203,120,.85)"; ctx.lineWidth=1.4; ctx.stroke(); });
    ctx.restore();
  }
  // الأشكال الدليلة
  const astList = st.layers.guides? SKY.asts : (astSel?[astSel]:[]);
  if(astList.length){
    ctx.save(); ctx.setLineDash([7,6]); ctx.lineWidth=1.6;
    for(const a of astList){ const on=a===astSel; ctx.strokeStyle=on?"rgba(240,203,120,.95)":"rgba(207,169,85,.5)"; ctx.fillStyle=on?"rgba(207,169,85,.07)":"rgba(207,169,85,.03)";
      const ps=a.pv.map(v=>visible(v)?projJ(v):null); if(ps.some(p=>!p||p[2]<-0.6)) continue;
      if(a.closed){ ctx.save(); ctx.setLineDash([]); ctx.beginPath(); ps.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])); ctx.closePath(); ctx.fill(); ctx.restore(); } // التعبئة لا شُرَط فيها، والحافة مقصوصة
      ctx.beginPath(); segPath(ps,a.closed); ctx.stroke();
      const c=projJ(a.v); if(c&&a.closed) labels.push({x:c[0],y:c[1],t:a.ar,font:"700 15px "+FDISP,col:on?BRASS:"rgba(207,169,85,.8)",pr:on?-2:1.5}); }
    ctx.restore();
  }
  // منازل القمر
  const manSel = st.sel&&st.sel.type==="mansion"? st.sel.id : null;
  if(st.layers.mansions||manSel){
    ctx.save(); ctx.lineWidth=1.3;
    for(const m of SKY.mansions){ const on=m.n===manSel; if(!st.layers.mansions&&!on) continue; if(!visible(m.v)) continue;
      const ps=m.pv.map(projJ).filter(p=>p&&p[2]>-0.5); if(!ps.length) continue;
      ctx.strokeStyle=on?BRASS_HI:"rgba(207,169,85,"+(focus?.3:.7)+")"; ctx.fillStyle=ctx.strokeStyle;
      if(ps.length>1){ ctx.beginPath(); segPath(ps); ctx.stroke(); }
      const c=projJ(m.v); if(!onScreen(c,40)) continue;
      ctx.beginPath(); ctx.moveTo(c[0],c[1]-5); ctx.lineTo(c[0]+4,c[1]); ctx.lineTo(c[0],c[1]+5); ctx.lineTo(c[0]-4,c[1]); ctx.closePath(); ctx.fill();
      hits.push({type:"mansion",id:m.n,x:c[0],y:c[1],r:8,pr:2});
      labels.push({x:c[0],y:c[1]+(on?22:18),t:m.ar,font:(on?"700 17px "+FDISP:"600 13px "+FUI),col:BRASS,pr:on?-9:5}); }
    ctx.restore();
  }
  // الأجرام العميقة
  { const dsoSel=st.sel&&st.sel.type==="dso"?st.sel.id:null;
    ctx.save(); ctx.lineWidth=1.1;
    for(const d of SKY.dsos){ const on=d.id===dsoSel||(RT&&RT.refs[RT.refs.length-1]===d.id), inFocus=focus&&d.con===focus.slice(0,3);
      if(!(st.layers.dso||on||inFocus)) continue; if(!on&&!inFocus&&d.mag>(st.fov>90?7:11)) continue; if(!on&&myOn()&&!myConHas(d.con)) continue;
      if(!visible(d.v)) continue; const p=projJ(d.v); if(!onScreen(p,20)) continue;
      const r=on?7:5; ctx.strokeStyle=on?BRASS_HI:"rgba(196,170,230,"+(focus&&!inFocus?.25:.85)+")"; ctx.beginPath();
      if(d.t==="s"||d.t==="e"||d.t==="i") ctx.ellipse(p[0],p[1],r+2,r-1.5,-0.5,0,Math.PI*2);
      else if(d.t==="oc"){ ctx.setLineDash([2,2.5]); ctx.arc(p[0],p[1],r,0,Math.PI*2); }
      else if(d.t==="gc"){ ctx.arc(p[0],p[1],r,0,Math.PI*2); ctx.moveTo(p[0]-r,p[1]); ctx.lineTo(p[0]+r,p[1]); ctx.moveTo(p[0],p[1]-r); ctx.lineTo(p[0],p[1]+r); }
      else ctx.rect(p[0]-r,p[1]-r,r*2,r*2);
      ctx.stroke(); ctx.setLineDash([]);
      if(d.id==="M42"&&(inFocus||on||st.fov<80)){ const nr=Math.max(10,pxPerDeg*0.9); const gr=ctx.createRadialGradient(p[0],p[1],1,p[0],p[1],nr); gr.addColorStop(0,"rgba(244,140,190,.5)"); gr.addColorStop(.5,"rgba(160,110,230,.22)"); gr.addColorStop(1,"rgba(0,0,0,0)"); ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(p[0],p[1],nr,0,Math.PI*2); ctx.fill(); }
      hits.push({type:"dso",id:d.id,x:p[0],y:p[1],r:10,pr:3});
      if(d.mag<5.5||st.fov<70||on||inFocus) labels.push(on?{x:p[0],y:p[1]+4,t:d.ar||d.id,font:"700 15px "+FUI,col:BRASS,pr:-11,star:{x:p[0],y:p[1],g:16},key:"dso:"+d.id}:{x:p[0],y:p[1]+18,t:d.ar||d.id,font:"12.5px "+FUI,col:"rgba(214,196,244,.92)",pr:d.ar?4:7,key:"dso:"+d.id}); }
    ctx.restore(); }
  // مشعات زخات الشهب النشطة (#441): نقطة تخرج منها أشعة قصيرة، وأقوى ليلة الذروة
  if(METS.length&&!(myOn()&&!st.layers.meteors)){ const mSel=st.sel&&st.sel.type==="met"?st.sel.id:null;
    ctx.save(); ctx.lineCap="round";
    for(const m of METS){ const on=m.slug===mSel; if(!on&&!(st.layers.meteors&&metActive(m))) continue;
      if(!visible(m.vv)) continue; const p=projJ(m.vv); if(!onScreen(p,30)) continue;
      const pk=metNearPeak(m), r0=on?6:5, r1=on?16:pk?15:11, col=on?BRASS_HI:pk?"rgba(150,226,255,.95)":"rgba(150,226,255,.7)";
      ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=on?1.8:1.4; ctx.beginPath();
      for(let k=0;k<8;k++){ const a=k*Math.PI/4+Math.PI/8, c=Math.cos(a), s2=Math.sin(a); ctx.moveTo(p[0]+c*r0,p[1]+s2*r0); ctx.lineTo(p[0]+c*r1,p[1]+s2*r1); }
      ctx.stroke(); ctx.beginPath(); ctx.arc(p[0],p[1],2.2,0,Math.PI*2); ctx.fill();
      hits.push({type:"met",id:m.slug,x:p[0],y:p[1],r:14,pr:2});
      labels.push(on?{x:p[0],y:p[1]+4,t:"مشع "+m.ar,font:"700 15px "+FUI,col:BRASS,pr:-11,star:{x:p[0],y:p[1],g:18},key:"met:"+m.slug}:{x:p[0],y:p[1]+r1+12,t:"مشع "+m.ar,font:(pk?"600 13.5px ":"12.5px ")+FUI,col:"rgba(170,232,255,.95)",pr:pk?2:5,key:"met:"+m.slug}); }
    ctx.restore(); }
  // النجوم
  // زاوية الضلع الأطول: على الهاتف تُقاس st.fov بالعرض، فكانت 60° بالعرض (نحو 130° طولاً) تُظهر أسماء حتى القدر 3.8 وتزحم الشاشة (#379)
  const fovL=st.fov*Math.max(1,Ht/W);
  const boost=Math.pow(105/Math.max(1,st.fov),0.35), zoomLab=(st.sel&&(st.sel.type==="mansion"||st.sel.type==="route"))?0.9:AR.on?(st.fov>100?2.3:st.fov>60?3.1:4.2):(fovL>100?1.6:fovL>60?2.6:3.8);
  const selStar=st.sel&&st.sel.type==="star"?st.sel.id:null;
  const ptrTargets=new Set(focus&&POINTERS[focus]?POINTERS[focus].map(g=>g.p[g.p.length-1]):[]);
  const manSet=new Set(st.sel&&st.sel.type==="mansion"?SKY.mansions[st.sel.id-1].p.map(q=>q[2]).filter(x=>typeof x==="number"):[]);
  const full=focus&&st.detail==="full", figSet=focus?FIG[focus.slice(0,3)]:null, obst=[], starLabs=[];
  const MYON=myOn(), SCm=MYON?starCons():null, MYC3=new Set([...MY.c].map(k=>k.slice(0,3)));
  for(let i=0;i<N;i++){
    const s=SKY.stars[i], hip=s[4], inF=focusSet&&focusSet[i]===focus.slice(0,3), inFig=inF&&figSet&&figSet.has(hip), landmark=focus&&!inF&&(s[2]<1.6||(st.detail!=="full"&&ptrTargets.has(hip)));
    if(!focus){ if(s[2]>(REAL?limR+0.3:limMag)) break; }
    else if(inF){ if(s[2]>(full?5.6:Math.min(limMag,4.8))&&!inFig) continue; }
    else if(!landmark&&s[2]>4.6) continue;
    if(HID.s.size&&HID.s.has(hip)&&hip!==selStar&&!PICK.on) continue;
    let myDim=false; if(MYON&&hip!==selStar&&!MY.s.has(hip)&&!MYC3.has(SCm[i])){ if(!MY.dim) continue; myDim=true; }
    const vx=SV[i*3],vy=SV[i*3+1],vz=SV[i*3+2];
    const uu=MR[2][0]*vx+MR[2][1]*vy+MR[2][2]*vz; if(uu<minU) continue;
    // النجم الواقعي: قدره بعد إضعاف الهواء قرب الأفق (k=0.2 × الكتلة الهوائية، Rozenberg) يحدد لمعانه وحجمه، فيُترك الخافت قبل حساب موضعه
    let Xr=1, eff=s[2], aR=1; if(REAL){ if(uu>0) Xr=1/(uu+0.025*Math.exp(-11*uu)); eff=s[2]+0.2*(Xr-1); aR=(limR-eff+0.3)/0.6; if(aR<=0) continue; if(aR>1) aR=1; }
    const z=C[2][0]*vx+C[2][1]*vy+C[2][2]*vz; if(z<(PERSP?0.02:-0.9)) continue;
    const k=magK(z), x=CX+SX*k*(C[0][0]*vx+C[0][1]*vy+C[0][2]*vz), y=CY-SY*k*(C[1][0]*vx+C[1][1]*vy+C[1][2]*vz);
    if(x<-20||x>W+20||y<-20||y>Ht+20) continue;
    if(myDim){ if(s[2]>3.6) continue; ctx.globalAlpha=0.32; ctx.fillStyle="#c9d4ee"; ctx.beginPath(); ctx.arc(x,y,Math.max(0.7,1.9-s[2]*0.3),0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1; continue; }
    let r,a;
    // ويحمرّ لونه قليلاً قرب الأفق، ويتلألأ هناك أثناء متابعة الهاتف (ولا تلألؤ مع تقليل الحركة)
    if(REAL){ a=aR; if(AR.on&&!RMOT&&uu>0&&uu<0.4226){ const altS=Math.asin(uu)*R2D; a*=1+0.22*(1-altS/25)*Math.sin(nowT*0.011+i*1.7)*Math.sin(nowT*0.0071+i*0.9); }
      // نواة واضحة بلون النجم حجمها من قدره (كالعرض السابق أو أكبر)، وهالة ناعمة فوقها للامع، ونقطة بيضاء في قلب ألمع النجوم
      const bin=psfBin(s[3]+Math.min(0.8,0.12*(Xr-1))), al=a>1?1:a; r=Math.min(4.6,Math.max(0.6,(limR+0.9-eff)*0.52))*boost;
      if(eff<3.4){ const gs=r*(eff<1.5?9:6.5); ctx.globalAlpha=al*(eff<1.5?0.6:0.38); ctx.drawImage(PSF[bin],x-gs/2,y-gs/2,gs,gs); }
      ctx.globalAlpha=al; ctx.fillStyle=PCOL[bin]; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      if(eff<1.8&&r>1.6){ ctx.globalAlpha=al*0.9; ctx.fillStyle="#fff"; ctx.beginPath(); ctx.arc(x,y,r*0.5,0,Math.PI*2); ctx.fill(); } }
    else { r=Math.max(0.45,(6.6-s[2])*0.52)*boost; a=Math.min(1,0.35+(6.4-s[2])*0.2)*(1-dayF*0.55);
    if(focus){ if(inFig){ r=Math.max(r*1.3,2.6); a=1; } else if(inF){ if(full){ r*=1.1; a=Math.min(1,a+0.2); } else a*=0.5; } else if(landmark) a*=ptrTargets.has(hip)?1:0.75; else { r*=0.8; a*=ctxDim; } }
    if(hzOn&&M[2][0]*vx+M[2][1]*vy+M[2][2]*vz<0) a*=0.42;
    if(s[2]<2.2||inFig){ const gs=r*7; ctx.globalAlpha=a*0.5; ctx.drawImage(glow,x-gs/2,y-gs/2,gs,gs); } else if(s[2]<3.6&&dayF<.5){ const gs=r*5; ctx.globalAlpha=a*0.28; ctx.drawImage(glow,x-gs/2,y-gs/2,gs,gs); }
    if((inFig&&s[2]<2.2)||(!focus&&s[2]<0.6&&st.fov<90)) spikes(x,y,r*4.5,SCOL[i],a*0.45);
    ctx.globalAlpha=a; ctx.fillStyle=SCOL[i]; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
    hits.push({type:"star",id:hip,x,y,r:r+5,pr:(CUR[hip]?1:2)+s[2]/10-(inFig?2:inF?1:0)}); if(lowLab&&uu<0) drawnLow++;
    if(inFig||landmark||hip===selStar) obst.push([x-r-1,y-r-1,x+r+1,y+r+1]);
    const nm=starName(hip), isCur=!!CUR[hip], gap=hip===selStar?24:r+5;
    let L=null;
    if(focus){
      if(inFig) L={t:starShort(hip),font:"600 14.5px "+FUI,col:"rgba(248,240,220,1)",pr:-6+s[2]/10};
      else if(full&&inF){ const t=shortLabel(hip); if(t) L={t,font:"12.5px "+FUI,col:"rgba(196,206,228,.85)",pr:s[2]}; }
      else if(landmark) L= ptrTargets.has(hip)? {t:starShort(hip),font:"600 14px "+FUI,col:"rgba(190,220,255,1)",pr:-5} : {t:starShort(hip),font:"13px "+FUI,col:"rgba(226,220,204,.8)",pr:1+s[2]/10};
    } else if(st.layers.starNames && nm && !(REAL&&dayF>0.5) && (s[2]<zoomLab||(isCur&&s[2]<(st.fov>100?2.3:3.2)))) L={t:(+hip===11767||conTwin(hip)||dupTag(hip))?starShort(hip):shortName(nm),font:(s[2]<1.5?"600 14px ":"13px ")+FUI,col:"rgba(237,229,209,.9)",pr:s[2]};
    if(hip===selStar){ if(!L) L={t:starShort(hip),font:"600 14px "+FUI,col:BRASS,pr:-8}; else { L.col=BRASS; L.pr=-8; } }
    if(RT&&(RT.refs.includes(hip)||RT.shapeRefs.includes(hip))){ const tgt=RT.refs[RT.refs.length-1]===hip; L={t:starShort(hip),font:(tgt?"700 15.5px ":RT.refs.includes(hip)?"600 14px ":"13px ")+FUI,col:tgt?BRASS:(RT.refs.includes(hip)?"rgba(248,240,220,1)":"rgba(200,210,232,.9)"),pr:tgt?-10:(RT.refs.includes(hip)?-7:-4)}; obst.push([x-r-1,y-r-1,x+r+1,y+r+1]); if(L){ L.star={x,y,g:r+(RT.refs.includes(hip)?10:5)}; labels.push(L); } continue; }
    const manName=manSet.size?SKY.mansions[st.sel.id-1].ar.replace(/[\u064B-\u065F]/g,""):"";
    if(manSet.has(hip)&&shortName(starTitle(hip)).replace(/[\u064B-\u065F]/g,"")!==manName){ L={t:starShort(hip),font:"600 13.5px "+FUI,col:"rgba(240,215,160,1)",pr:-7}; obst.push([x-r-1,y-r-1,x+r+1,y+r+1]); }
    else if(manSet.has(hip)) L=null;
    if(L){ L.star={x,y,g:gap}; L.key="star:"+hip; if(lowLab) dimL(L,uu); if(AR.on&&hip!==selStar){ L.kind="star"; L.score=s[2]+2.2*Math.hypot(x-CX,y-CY)/(DMIN/2); starLabs.push(L); } else labels.push(L); }
  }
  // أثناء متابعة الهاتف: أسماء قليلة واضحة، وتزيد مع التكبير
  if(starLabs.length){ const f0=COARSE?phoneFov(80):68, nMax=Math.round(Math.max(8,Math.min(28,10*Math.pow(f0/st.fov,0.6)))); starLabs.sort((p,q)=>p.score-q.score); for(let k=0;k<starLabs.length&&k<nMax;k++) labels.push(starLabs[k]); }
  labelObstacles=obst;
  ctx.globalAlpha=1;
  // الكواكب والقمر
  const bodyLabs=[];
  if(st.layers.planets){
    // الأخفت أولاً فيُرسم الألمع فوقه حين تتداخل النقطتان
    // كوكبان متقاربان في التصغير البعيد (المريخ والمشتري على بعد 1.8 درجة في 19 نوفمبر 2026 = نحو 6 نقاط على الهاتف في القبة كلها، #371):
    // نصف قطر كل نقطة لا يزيد على نصف المسافة إلى أقرب كوكب، فيظهران نقطتين متجاورتين لا كتلة واحدة، والمكان حقيقي كما هو
    PCAP={}; { const pts=[]; for(const b of bodies){ if(!PL_DISC[b.id]||!visible(b.v)) continue; const q=projJ(b.v); if(q&&onScreen(q,40)) pts.push([b.id,q]); }
      for(const [id,q] of pts){ let dm=1e9; for(const [i2,q2] of pts) if(i2!==id) dm=Math.min(dm,Math.hypot(q[0]-q2[0],q[1]-q2[1])); PCAP[id]=Math.max(1.4,dm/2-1.2); } }
    for(const b of bodies.slice().sort((x,y)=>(y.mag==null?-99:y.mag)-(x.mag==null?-99:x.mag))){ const on=st.sel&&st.sel.type==="body"&&st.sel.id===b.id; if(!visible(b.v)&&!on) continue; if(REAL&&!on&&b.mag!=null&&b.id!=="moon"&&b.mag>limEye+0.3) continue; const p=projJ(b.v); if(!onScreen(p,40)) continue;
      // في «سماء مكاني» يخبو الكوكب بقدر قربه من حد ما تراه العين (#407، المالك: «في النهار ظاهر كوكب الزهرة ولا كانه منور زي الشمس»):
      // الزهرة نهاراً عند الحد تقريباً فتظهر نقطة باهتة، وفي الليل كل الكواكب أسطع من الحد بكثير فلا يتغير شيء
      const vis=REAL&&b.mag!=null&&b.id!=="sun"&&b.id!=="moon"?clamp01((limEye+0.3-b.mag)/2.5):1;
      const ga=(focus&&!on?0.5:1)*(hzOn&&dot(M[2],b.v)<0?0.5:1)*Math.max(on?0.4:0.12,vis); ctx.globalAlpha=ga;
      let rSun=0;
      if(b.id==="sun") rSun=drawSun(p,b,pxPerDeg); // بُعد الاسم عن المركز: تحت الوهج الساطع لا فوق القرص (المالك: «متخليش كلمة الشمس فوق القرص»)
      // في 3D بحجمه الحقيقي (نصف قطره 1737.4 كم من NASA ÷ بعده الحقيقي الليلة: نحو ربع درجة)، وفي المنظر العادي مكبّراً قليلاً ليظهر طوره
      else if(b.id==="moon"&&SECL&&sunAlt>-1){} // في الكسوف لا يُرى القمر إلا حيث يحجب الشمس، فيرسمه drawEclipse
      else if(b.id==="moon") drawMoon(p,b,PERSP?Math.max(2.5,pxPerDeg*Math.atan(1737.4/((b.dist||0.00257)*149597870.7))*R2D):Math.max(9,pxPerDeg*0.26));
      let ext=b.id==="moon"?Math.max(9,pxPerDeg*0.26):b.id==="sun"?rSun:10;
      if(PL_DISC[b.id]) ext=drawPlanet(p,b,pxPerDeg,ga).ext;
      ctx.globalAlpha=1;
      hits.push({type:"body",id:b.id,x:p[0],y:p[1],r:Math.max(16,ext),pr:0});
      // الاسم تحت الكوكب لا فوقه، وإن كبر قرصه نزل الاسم تحته (#313)
      obst.push([p[0]-ext-1,p[1]-ext-1,p[0]+ext+1,p[1]+ext+1]); // لا يُكتب اسم نجم فوق كوكب
      if(st.layers.planetNames||on) bodyLabs.push({x:p[0],py:p[1],ext,y:p[1]+ext+(b.id==="moon"?16:14),L:dimL({x:p[0],y:p[1]+ext+(b.id==="moon"?16:14),ya:p[1]-ext-7,t:b.ar,font:"600 13.5px "+FUI,col:b.id==="sun"||b.id==="moon"?"#f3ecd9":b.c,pr:focus&&!on?3:-1,key:"body:"+b.id},dot(M[2],b.v))}); }
  }
  bodyRow(bodyLabs).forEach(L=>labels.push(L));
  // الأرض والأفق (في سماء مكاني فقط)
  if(!atlas){
    const hz=horizonRegion(), hzPath=()=>{ ctx.beginPath(); if(hz.type==="none"||hz.type==="full") return; if(hz.type==="circle") ctx.arc(hz.x,hz.y,hz.r,0,Math.PI*2); else { const dx=hz.b[0]-hz.a[0],dy=hz.b[1]-hz.a[1], c=clipSeg(hz.a[0]-dx*1e3,hz.a[1]-dy*1e3,hz.a[0]+dx*1e3,hz.a[1]+dy*1e3,130); if(c){ ctx.moveTo(c[0],c[1]); ctx.lineTo(c[2],c[3]); } } };
    // توهج الهواء فوق الأفق: أزرق خافت في الليل، ودافئ في الشفق
    if(!AR.cam&&!REAL){ const gc=dayF>.5?"150,190,240":dayF>.05?"220,150,110":"90,120,190"; ctx.save(); hzPath(); ctx.lineCap="round";
      for(let w=110;w>=8;w-=9){ ctx.lineWidth=w; ctx.strokeStyle=`rgba(${gc},.018)`; ctx.stroke(); } ctx.restore(); }
    const PAN=PERSP&&!AR.cam&&panoReady(); if(PERSP&&!AR.cam&&!PAN) panoLoad();
    if(PAN){ drawPano(dayF,below); }
    else { ctx.save(); pathGround(hz); ctx.fillStyle=PERSP&&!AR.cam&&!below?`rgb(${mixC([11,9,7],[118,100,70],GLIT(dayF))})`:AR.cam?"rgba(16,13,10,.38)":below?(COARSE?"rgba(9,7,5,.68)":"rgba(16,13,10,.55)"):(dayF>.5?"#1b1a14":"#0d0b08"); ctx.fill("evenodd");
    let DG=null; if(PERSP&&!AR.cam) drawLandscape(dayF,below); else if(REAL&&!AR.cam&&!below){ DG=drawDomeGround(hz)||0; } else if(REAL&&!AR.cam) drawHills("rgba(9,7,5,.68)");
    // «كأنك هناك»: عمق للأرض، أفتح قليلاً عند الأفق البعيد وأغمق نحو قدميك
    if(PERSP&&hz.type==="line"&&!AR.cam&&!below){ const dx=hz.b[0]-hz.a[0],dy=hz.b[1]-hz.a[1],L=Math.hypot(dx,dy)||1; let nx=-dy/L,ny=dx/L;
      const t=((CX-hz.a[0])*dx+(CY-hz.a[1])*dy)/(L*L), fx=hz.a[0]+dx*t, fy=hz.a[1]+dy*t; if((hz.z[0]-fx)*nx+(hz.z[1]-fy)*ny>0){ nx=-nx; ny=-ny; }
      const g=ctx.createLinearGradient(fx,fy,fx+nx*Ht,fy+ny*Ht), w=dayF>.5?"70,62,46":"46,38,26";
      g.addColorStop(0,`rgba(${w},.55)`); g.addColorStop(0.06,`rgba(${w},.32)`); g.addColorStop(0.35,`rgba(${w},.10)`); g.addColorStop(1,"rgba(0,0,0,.35)");
      ctx.save(); pathGround(hz); ctx.clip("evenodd"); ctx.fillStyle=g; ctx.fillRect(-10,-10,W+20,Ht+20); ctx.restore(); }
    if(!AR.cam&&!below&&DG!==0){ if(DG) ctx.clip(DG); else ctx.clip("evenodd"); hzPath(); [[60,"rgba(58,48,34,.16)"],[22,"rgba(70,58,40,.18)"]].forEach(w=>{ ctx.lineWidth=w[0]; ctx.strokeStyle=w[1]; ctx.stroke(); }); }
    ctx.restore(); }
    ctx.save(); ctx.strokeStyle=PAN?"rgba(207,169,85,.28)":"rgba(207,169,85,.6)"; ctx.lineWidth=1.3; ctx.beginPath(); if(hz.type==="none"||hz.type==="full"){} else if(hz.type==="circle") ctx.arc(hz.x,hz.y,hz.r,0,Math.PI*2); else { ctx.moveTo(hz.a[0],hz.a[1]); ctx.lineTo(hz.b[0],hz.b[1]); } ctx.stroke(); ctx.restore();
    ctx.save(); ctx.textAlign="center"; ctx.direction="rtl";
    // أسماء الجهات على جهة الأرض من خط الأفق (فوقه حين تميل رأسك إلى الخلف أو تقلب الصورة)
    // تُوضع بعيداً عن سمت الرأس على الشاشة (خارج الدائرة حين تظهر القبة كلها)، أو على جهة الأرض إن لم يظهر سمت الرأس
    const gUp=upsideDown()!==(FY<0), zq=projH(0,0,1);
    for(let i=0;i<8;i++){ const h=hor(i*45,0),p=projH(h[0],h[1],h[2]); if(!onScreen(p,30)) continue; const main=i%2===0; ctx.font=lfont((main?"700 19px ":"13px ")+FDISP); ctx.fillStyle=LDAY>0.5?(main?"#4a3206":"rgba(74,50,6,.8)"):(main?BRASS:"rgba(207,169,85,.7)"); /* نهاراً على أرض فاتحة: نحاسي داكن (#379) */ const t=main?DIRS[i]:DIRS_SHORT[i], hw=ctx.measureText(t).width/2+6; let ux=0,uy=gUp?-1:1; if(zq&&onScreen(zq,200)){ const dx=p[0]-zq[0],dy=p[1]-zq[1],L=Math.hypot(dx,dy); if(L>40){ ux=dx/L; uy=dy/L; } }
      // مكان الاسم: خارج الأفق أولاً، فإن وقع تحت زر أو تحت الشريط السفلي فداخله، ثم منزاحاً قليلاً على امتداد الأفق،
      // ولا يُحذف إلا إذا غطّت الأزرار كل هذه الأماكن (#457، المالك: «في الزوم اوت احيانا الاتجاهات بتختفي … الجنوب خصوصا في وضع الديسكتوب»)
      const th=main?20:14, ob=EMBED?[]:uiObstacles(), cl=(x,y)=>[Math.max(hw,Math.min(W-hw,x)),Math.max(th+2,Math.min(Ht-8,y))], free=([x,y])=>!ob.some(b=>!(x+hw<b[0]||x-hw>b[2]||y+6<b[1]||y-th>b[3]));
      const sx=-uy, sy=ux, sh=hw*2+10, cands=[cl(p[0]+ux*(hw+6),p[1]+uy*16+6)];
      for(const k of [1,2,3]){ const ix=p[0]-ux*(hw+6)*k, iy=p[1]-uy*(th+4)*k+6; cands.push(cl(ix,iy)); }
      for(const k of [1,2]) for(const g of [1,-1]){ cands.push(cl(p[0]+ux*(hw+6)+g*sx*sh*k,p[1]+uy*16+6+g*sy*sh*k)); cands.push(cl(p[0]-ux*(hw+6)+g*sx*sh*k,p[1]-uy*(th+4)+6+g*sy*sh*k)); }
      const at=cands.find(free); if(!at) continue; /* لا اسم جهة تحت زر (#379) */ const [tx,ty]=at; ctx.fillText(t,tx,ty); labelObstacles.push([tx-hw,ty-th,tx+hw,ty+6]); /* أسماء النجوم تتجنب اسم الجهة */ }
    ctx.restore();
    // سمت الرأس: النقطة فوق رأسك تماماً
    const zp=projH(0,0,1); if(onScreen(zp,-10)){ ctx.save(); ctx.strokeStyle="rgba(207,169,85,.55)"; ctx.lineWidth=1.2; ctx.beginPath(); ctx.moveTo(zp[0]-7,zp[1]); ctx.lineTo(zp[0]+7,zp[1]); ctx.moveTo(zp[0],zp[1]-7); ctx.lineTo(zp[0],zp[1]+7); ctx.stroke(); ctx.restore();
      labels.push({x:zp[0],y:zp[1]+20,t:"سمت الرأس",font:"12px "+FUI,col:"rgba(207,169,85,.75)",pr:5}); }
    // تحت قدميك (نظير السمت)، وتنبيه على الأرض الشفافة بأن ما تحتها لا يُرى الآن
    if(lowLab){ const np=projH(0,0,-1); if(onScreen(np,-10)){ ctx.save(); ctx.strokeStyle="rgba(207,169,85,.45)"; ctx.lineWidth=1.2; ctx.beginPath(); ctx.arc(np[0],np[1],6,0,Math.PI*2); ctx.moveTo(np[0]-10,np[1]); ctx.lineTo(np[0]+10,np[1]); ctx.moveTo(np[0],np[1]-10); ctx.lineTo(np[0],np[1]+10); ctx.stroke(); ctx.restore();
        labels.push({x:np[0],y:np[1]+22,t:"تحت قدميك",font:"12px "+FUI,col:"rgba(207,169,85,.7)",pr:5}); }
      const vd=viewDir(); for(const o of [0,-60,60]){ const h=hor(vd.az+o,-7), gp=projH(h[0],h[1],h[2]); if(onScreen(gp,-30)){ labels.push({x:gp[0],y:gp[1],t:"تحت الأفق، لا تُرى الآن",font:"600 12.5px "+FUI,col:"rgba(196,170,120,.72)",pr:0}); break; } } }
  }
  // أفق المكان على الأطلس، وجهاته الأربع
  if(hz){
    ctx.save(); ctx.strokeStyle="rgba(207,169,85,.55)"; ctx.lineWidth=1.2; ctx.setLineDash([8,6]); ctx.beginPath();
    if(hz.type==="circle") ctx.arc(hz.x,hz.y,hz.r,0,Math.PI*2); else if(hz.type==="line"){ const dx=hz.b[0]-hz.a[0],dy=hz.b[1]-hz.a[1]; segPath([[hz.a[0]-dx*1e3,hz.a[1]-dy*1e3],[hz.a[0]+dx*1e3,hz.a[1]+dy*1e3]]); }
    ctx.stroke(); ctx.restore();
    ["شمال أفقك","شرق أفقك","جنوب أفقك","غرب أفقك"].forEach((t,i)=>{ const p=projJ(enuToJ(hor(i*90,0))); if(!onScreen(p,-12)) return;
      ctx.fillStyle=BRASS; ctx.beginPath(); ctx.arc(p[0],p[1],3,0,Math.PI*2); ctx.fill();
      labels.push({x:p[0],y:p[1]+4,t,font:"600 12.5px "+FUI,col:BRASS,pr:-3,star:{x:p[0],y:p[1],g:7}}); });
  }
  // أسماء الكوكبات
  if(st.layers.conNames||selConId){
    // أثناء متابعة الهاتف: أسماء الكوكبات السبع الأقرب إلى وسط الشاشة فقط، بخط أهدأ من أسماء النجوم
    let near=null; if(AR.on){ const cj=cameraCenter(); near=new Set(CONLAB.filter(c=>c.v&&visible(c.v)).map(c=>[c,dot(c.v,cj)]).sort((p,q)=>q[1]-p[1]).slice(0,7).map(x=>x[0])); }
    for(const c of CONLAB){ const on=c.id===selConId; if(!st.layers.conNames&&!on) continue; if(focus&&!on) continue; if(!on&&HID.c.has(c.id)&&!PICK.on) continue; if(!on&&myOn()&&!MY.c.has(c.id)) continue; if(near&&!on&&!near.has(c)) continue; if(!visible(c.v)) continue; const p=projJ(c.v); if(!onScreen(p)) continue;
      if(st.fov>120&&c.r>2&&!on) continue;
      labels.push(dimL({x:p[0],y:on&&focus?p[1]-Math.max(18,pxPerDeg*0.5):p[1],t:c.ar,font:(on?"700 ":"")+(on&&focus?24:(c.r===1||on?17:15))+"px "+FDISP,col:on?BRASS:"rgba(172,182,208,"+(0.62-dayF*.3)+")",pr:on?-4:(c.r===1?1.2:2.4),kind:"con"},dot(M[2],c.v))); if(near&&!on){ const L=labels[labels.length-1]; L.font="14px "+FDISP; if(!L.low) L.col="rgba(172,182,208,"+(0.5-dayF*.25)+")"; L.pr=6; } }
  }
  // علامة التحديد
  if(st.sel&&st.sel.type!=="con"&&st.sel.type!=="ast"&&st.sel.type!=="mansion"&&st.sel.type!=="route"){ const v=selVec(st.sel); if(v){ const p=projJ(v); if(onScreen(p,30)){ ctx.save(); ctx.strokeStyle=BRASS; ctx.lineWidth=1.6; const r=15; ctx.beginPath(); ctx.arc(p[0],p[1],r,0,Math.PI*2); ctx.stroke(); [0,1,2,3].forEach(q=>{ const a=q*Math.PI/2; ctx.beginPath(); ctx.moveTo(p[0]+Math.cos(a)*(r+3),p[1]+Math.sin(a)*(r+3)); ctx.lineTo(p[0]+Math.cos(a)*(r+9),p[1]+Math.sin(a)*(r+9)); ctx.stroke(); }); ctx.restore(); } } }
  if(atlas) drawPoles();
  if(AR.on){ drawReticle(); arReadout(); }
  fovChip();
  drawFrame(pxPerDeg);
  drawLabels();
  drawHover(); drawPickMarks();
  if(atlas) drawAtlasCompass();
  updateDayBanner();
  updateHud();
}

// مجال الرؤية على الهاتف، وضغطة تعيد التكبير المعتاد
let fovKey="";
// الرقم المعروض نفسه هو مفتاح التحديث (كان المفتاح الرقم مقرباً إلى عدد صحيح فيتجمد العرض على «0.5°» تحت الدرجة الواحدة، #335)
function fovChip(){ const on=COARSE&&!EMBED&&st.mode==="sky", k=on?(st.fov<1?st.fov.toFixed(2):st.fov<10?st.fov.toFixed(1):Math.round(st.fov)+""):""; if(k===fovKey) return; fovKey=k; const el=document.getElementById("fovChip"); el.hidden=!on; if(on) document.getElementById("fovTxt").textContent="\u2066"+k+"°\u2069"; }
document.getElementById("fovChip").addEventListener("click",()=>{ const f=AR.on?(COARSE?phoneFov(80):55):EYE()?(COARSE?70:60):(COARSE&&st.mode==="sky"?60:100);
  // كان الضغط بلا أثر ظاهر حين يكون التكبير قريباً من المعتاد، فلا يعرف القارئ ما الدائرة (#371)
  const same=Math.abs(st.fov-f)<1.5; toast(same?`هذا الرقم عرض ما تراه من السماء الآن بالدرجات، يصغر كلما كبّرت ويكبر كلما صغّرت، والضغط عليه يعيد التكبير المعتاد.`:`عاد التكبير إلى المعتاد (${Math.round(f)} درجة)، والرقم عرض ما تراه من السماء بالدرجات.`); if(same) return; if(AR.on&&!AR.paused){ const f0=st.fov,t0=performance.now(); st.anim=now=>{ let k=Math.min(1,(now-t0)/350); k=1-Math.pow(1-k,3); setFov(f0+(f-f0)*k); if(k>=1) st.anim=null; }; } else animateView({az:st.az,alt:st.alt,fov:f}); haptic(); });
// وجّه هاتفك: دائرة في وسط الشاشة، واسم أقرب نجم أو كوكب إليها
function hitName(h){ if(h.type==="star"){ const n=NAMES[h.id]; return n&&n[0]?n[0]:""; } if(h.type==="body"){ const b=BODIES.find(x=>x.id===h.id); return b&&b.ar; } if(h.type==="dso"){ const d=SKY.dsos.find(x=>x.id===h.id); return d&&(d.ar||d.id); } return ""; }
function hitKind(h){ if(h.type==="star"){ const c=CONS[conOfStar(h.id)]; return "نجم"+(c?` في كوكبة ${shortName(c.ar)}`:""); }
  if(h.type==="body") return h.id==="sun"?"نجمنا":h.id==="moon"?"تابع الأرض":"كوكب"; if(h.type==="dso"){ const d=SKY.dsos.find(x=>x.id===h.id); return d&&d.ta||"جرم عميق"; } return ""; }
function drawReticle(){
  const x=CX,y=CY; let best=null,bd=46;
  for(const h of hits){ if(h.type==="mansion") continue; const d=Math.hypot(h.x-x,h.y-y)+h.pr*3; if(d<bd&&hitName(h)){ bd=d; best=h; } }
  AR.target=best;
  ctx.save(); ctx.strokeStyle=best?"rgba(255,255,255,.95)":"rgba(255,255,255,.5)"; ctx.lineWidth=1.4;
  ctx.beginPath(); ctx.arc(x,y,20,0,Math.PI*2); ctx.stroke();
  [0,1,2,3].forEach(q=>{ const a=q*Math.PI/2; ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*24,y+Math.sin(a)*24); ctx.lineTo(x+Math.cos(a)*31,y+Math.sin(a)*31); ctx.stroke(); });
  ctx.restore();
  // سطر تحت الدائرة: اسم أقرب جرم إلى الوسط ونوعه، أو الكوكبة التي في الوسط، ويفتح البطاقة عند الضغط
  const cen=cameraCenter(), low=dot(M[2],cen)<0; let t="",sub="",sel=null,isLow=low;
  // السطر يتبع طبقتي الأسماء (#371: «السلوقيان» بقي ظاهراً بعد إيقاف الأسماء): اسم النجم والجرم العميق مع «أسماء النجوم»،
  // والكوكبة مع «أسماء الكوكبات»، والكواكب والقمر والشمس دائماً كأسمائها على السماء
  if(best&&best.type!=="body"&&!st.layers.starNames) best=null;
  if(best){ const v=selVec({type:best.type,id:best.id}); isLow=v?dot(M[2],v)<0:low; t=shortName(hitName(best)); sub=hitKind(best); sel={type:best.type,id:best.id}; }
  else if(!st.layers.conNames) t=low?"تحت الأفق":"";
  else { if(!AR.cc||dot(AR.cc,cen)<0.99996){ const rd=radec(cen); AR.cc=cen; AR.csym=""; try{ AR.csym=A.Constellation(rd.ra/15,rd.dec).symbol; }catch(e){} } const sym=AR.csym, c=CONS[sym]; if(c){ t="كوكبة "+shortName(c.ar); sel={type:"con",id:sym}; } else t=low?"تحت الأفق":""; }
  if(isLow&&t) sub=(sub?sub+" · ":"")+"تحت الأفق، لا تُرى الآن"; else if(sel) sub=(sub?sub+" · ":"")+"انقر لتعرف أكثر";
  const key=t+"|"+sub; AR.capSel=sel;
  if(key!==AR.capKey){ AR.capKey=key; const cap=document.getElementById("arCap"); cap.hidden=!t; document.getElementById("arCapT").textContent=t; document.getElementById("arCapS").textContent=sub; cap.classList.toggle("low",isLow);
    if(best&&AR.vib&&navigator.vibrate&&!AR.paused) try{ navigator.vibrate(8); }catch(e){} }
}

// اتجاهات الأطلس: الشمال السماوي أعلى الخريطة دائماً، فنكتبه على حوافها، أو نعلّم القطب حين يظهر
function edgeTag(t,x,y,dir){
  if(window.__atlas) (window.__edge=window.__edge||{})[t]=[x,y]; // للاختبار الآلي: أين رُسمت كل جهة
  // شارة صغيرة: السهم يسار النص إن كان الاتجاه يساراً، وإلا يمينه
  ctx.save(); ctx.font="600 12.5px "+FUI; ctx.direction="rtl"; const w=ctx.measureText(t).width, pw=w+32, ph=24, left=dir==="l";
  const bx=dir==="l"?x:dir==="r"?x-pw:x-pw/2, by=y-ph/2, cy=y, ax=left?bx+12:bx+pw-12, tx=left?bx+22+w/2:bx+pw-22-w/2;
  ctx.fillStyle="rgba(10,15,30,.74)"; ctx.strokeStyle="rgba(207,169,85,.38)"; ctx.lineWidth=1; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(bx,by,pw,ph,12); else ctx.rect(bx,by,pw,ph); ctx.fill(); ctx.stroke();
  ctx.fillStyle=BRASS; ctx.beginPath();
  if(dir==="u"){ ctx.moveTo(ax,cy-5); ctx.lineTo(ax+5,cy+3); ctx.lineTo(ax-5,cy+3); }
  else if(dir==="d"){ ctx.moveTo(ax,cy+5); ctx.lineTo(ax+5,cy-3); ctx.lineTo(ax-5,cy-3); }
  else if(dir==="l"){ ctx.moveTo(ax-5,cy); ctx.lineTo(ax+3,cy-5); ctx.lineTo(ax+3,cy+5); }
  else { ctx.moveTo(ax+5,cy); ctx.lineTo(ax-3,cy-5); ctx.lineTo(ax-3,cy+5); }
  ctx.fill(); ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.fillStyle="rgba(237,229,209,.94)"; ctx.fillText(t,tx,cy+1); ctx.restore();
}
function drawPoles(){
  [[[0,0,1],"القطب الشمالي السماوي"],[[0,0,-1],"القطب الجنوبي السماوي"]].forEach(([v,t])=>{ const p=projJ(v); if(!onScreen(p,-12)) return;
    ctx.save(); ctx.strokeStyle=BRASS; ctx.lineWidth=1.3; ctx.beginPath(); ctx.arc(p[0],p[1],7,0,Math.PI*2); ctx.moveTo(p[0]-12,p[1]); ctx.lineTo(p[0]+12,p[1]); ctx.moveTo(p[0],p[1]-12); ctx.lineTo(p[0],p[1]+12); ctx.stroke(); ctx.restore();
    labels.push({x:p[0],y:p[1]+4,t,font:"600 12.5px "+FUI,col:BRASS,pr:-12,star:{x:p[0],y:p[1],g:14}}); });
}
function drawAtlasCompass(){
  const hudB=(W<=720&&!st.clean&&!EMBED)?document.getElementById("hud").getBoundingClientRect().bottom+8:0;
  const V=vpT||vp, top=Math.max((V.t!=null?V.t:0),hudB)+18, bot=(V.b!=null?V.b:Ht)-18, lft=(V.l||0)+(W>720&&!st.clean&&!EMBED?66:10), rgt=(V.r!=null?V.r:W)-10;
  const inBox=p=>p&&p[0]>lft&&p[0]<rgt&&p[1]>top-10&&p[1]<bot+10;
  const pn=projJ([0,0,1]), ps=projJ([0,0,-1]), nIn=inBox(pn), sIn=inBox(ps);
  if(EMBED&&st.focus) return;
  // «قلب الصورة» يعكس الجهات مع السماء (#314، المالك: كانت السماء تنقلب والشمال والجنوب في مكانهما):
  // القلب الرأسي يُنزل الشمال إلى أسفل، والأفقي ينقل الشرق إلى اليمين، والخريطة المقلوبة بعد القطب تعكس الاثنين
  const inv=upsideDown(), cd=radec(cameraCenter()).dec, nd=inv!==(FY<0), er=inv!==(FX<0);
  if(window.__atlas) window.__edge={};
  if(!nIn) edgeTag("الشمال",CX,nd?bot:top,nd?"d":"u");
  if(!sIn) edgeTag("الجنوب",CX,nd?top:bot,nd?"u":"d");
  if(!nIn&&!sIn&&Math.abs(cd)<70){ edgeTag("الشرق",er?rgt:lft,CY,er?"r":"l"); edgeTag("الغرب",er?lft:rgt,CY,er?"l":"r"); }
}

// البوصلة والنص بجانبها: إلى أين تنظر، أو ما في مركز الخريطة
const DIAL=[["ش",0],["ق",90],["ج",180],["غ",270]];
const dialRot=document.getElementById("dialRot");
dialRot.innerHTML=[0,45,90,135,180,225,270,315].map(a=>`<line data-a="${a}" stroke="rgba(207,169,85,.4)" stroke-width="1.5"/>`).join("")+DIAL.map(([t])=>`<text text-anchor="middle" dominant-baseline="central" font-size="${t==="ش"?30:23}" font-weight="700" fill="${t==="ش"?"#cfa955":"rgba(237,229,209,.82)"}" font-family="IBM Plex Sans Arabic,Tahoma,sans-serif">${t}</text>`).join("");
let hudKey="";
function conAt(v){ const rd=radec(v); try{ const s=A.Constellation(rd.ra/15,rd.dec).symbol; if(s==="Ser") return "الحية"; const c=CONS[s]; return c?shortName(c.ar):""; }catch(e){ return ""; } }
function updateHud(){
  if(EMBED||AR.on) return;
  const atlas=st.mode==="atlas", cen=cameraCenter(), con=conAt(cen);
  // في سماء مكاني تدور البوصلة فيكون اتجاه نظرك أعلاها، وفي الأطلس الشمال أعلى والشرق يسار كخرائط السماء
  // وحين تنظر إلى أعلى تقريباً لا معنى لاتجاه النظر، فنرسم الجهات كما تظهر على الشاشة (مقلوبة الشرق والغرب لأنك تنظر إلى أعلى)
  const vd=viewDir(), inv=upsideDown(), up=!atlas&&(vd.alt>80||inv), rot=atlas?(inv?180:0):up?st.az-180:-st.az, flip=atlas||up?-1:1;
  document.getElementById("dialMark").style.display=atlas||up?"none":"";
  let l1,l2,l3="";
  if(atlas){ const rd=radec(cen), h=Math.floor(rd.ra/15), m=Math.floor((rd.ra/15-h)*60);
    l1=con?`في المركز: كوكبة ${con}`:"مركز الخريطة"; l2=`المطلع ${h}س ${m}د · الميل \u2066${rd.dec<0?"−":"+"}${Math.abs(Math.round(rd.dec))}°\u2069`;
    if(st.layers.horizon&&!st.focus&&!st.route&&!st.ast) l3=`المظلل: تحت أفق ${placeName()} الآن`; }
  else { const azd=`\u2066${Math.round(vd.az)%360}°\u2069`, altT=vd.alt<-0.5?`تحت الأفق \u2066${Math.round(-vd.alt)}°\u2069`:`الارتفاع \u2066${Math.round(Math.max(0,vd.alt))}°\u2069`, conT=con&&st.layers.conNames?` · كوكبة ${con}`:"";
    // السمت بالدرجات (من الشمال 0 إلى 360) مع اسم الجهة، كما في متابعة الهاتف (#371)، وعلى الهاتف السطر الثاني مخفي فيُكتب الارتفاع في الأول
    if(vd.alt>80){ l1="تنظر إلى أعلى، نحو سمت الرأس"; l2=altT+conT; }
    else if(W<=720){ l1=`${dirName(vd.az)} ${azd} · ${altT}`; l2=conT.slice(3); }
    else { l1=`تنظر نحو ${dirName(vd.az)} ${azd}`; l2=altT+conT; }
    if(inv&&vd.alt<=80) l3="كأنك تميل رأسك إلى الخلف، والبوصلة تعيدك معتدلاً"; }
  if(atlas&&inv) l3="الخريطة مقلوبة: اضغط البوصلة لتعديلها";
  const key=Math.round(rot)+"|"+FX+FY+"|"+l1+"|"+l2+"|"+l3; if(key===hudKey) return; hudKey=key;
  // زاوية كل جهة على البوصلة كما تظهر على الشاشة (مع قلب الصورة)، وتُحفظ لتعرف أي حرف ضغطه القارئ
  // (القلب الأفقي يعكس اليمين واليسار دائماً، والرأسي يغيّرها فقط حين ترسم البوصلة الشاشة نفسها: فوق الرأس وفي الأطلس)
  const ang=a=>{ let t=rot+flip*a; if(FX<0) t=-t; if(FY<0&&(atlas||up)) t=180-t; return t; };
  const R=34, pos=a=>{ const t=ang(a)*D2R; return [Math.sin(t),-Math.cos(t)]; };
  dialRot.querySelectorAll("line").forEach(el=>{ const [x,y]=pos(+el.dataset.a), r0=+el.dataset.a%90?40:41; el.setAttribute("x1",x*r0); el.setAttribute("y1",y*r0); el.setAttribute("x2",x*45); el.setAttribute("y2",y*45); });
  dialRot.querySelectorAll("text").forEach((el,i)=>{ const [x,y]=pos(DIAL[i][1]); el.setAttribute("x",x*(R-8)); el.setAttribute("y",y*(R-8)); });
  document.getElementById("hud1").textContent=l1; document.getElementById("hud2").textContent=l2;
  const e3=document.getElementById("hud3"); e3.textContent=l3; e3.hidden=!l3;
  document.getElementById("dial").setAttribute("aria-label",(atlas?"البوصلة: الشمال إلى أعلى. اضغط لتنتقل إلى القطب الشمالي السماوي":"البوصلة: "+l1+". "+(upsideDown()?"اضغط لتعيد العرض معتدلاً":(st.az<45||st.az>315)&&st.alt<=80?"اضغط لتتجه نحو الجنوب":"اضغط لتتجه نحو الشمال")));
}

// ================================================================ الكواكب عند التكبير (#313)
// في المنظر العادي نقطة لامعة كما تراها العين. فإذا صار حجمها الحقيقي على الشاشة أكبر من النقطة رُسم القرص بحجمه الزاوي الحقيقي
// (نصف القطر الاستوائي والقطبي من صحيفة بيانات NASA للكواكب ÷ بعده الليلة)، والجهة المضاءة نحو الشمس بطوره الحقيقي (Illumination)،
// ومحوره باتجاهه الحقيقي (RotationAxis)، وحلقات زحل بميلها الليلة (أنصاف أقطار الحلقات من صحيفة NASA للحلقات)،
// وأقمار المشتري الأربعة في مواضعها الحقيقية (JupiterMoons، مع زمن وصول الضوء). أحزمة المشتري وزحل رسم تقريبي.
// لا نكتب تحت الكوكب سطراً يشرح ما هو حقيقي وما هو تقريبي (المالك 2026-11-16: «مينفعش توضح الواضح»).
const PL_DISC={ // نصف القطر الاستوائي كم، ونسبة القطبي إليه، واللون
  mercury:[2439.7,1,"#b9b1a4"], venus:[6051.8,1,"#f4ecd6"], mars:[3396.2,0.9941,"#d4693f"], jupiter:[71492,0.9351,"#e9d8b6"],
  saturn:[60268,0.9020,"#e4cf98"], uranus:[25559,0.9771,"#aee0e6"], neptune:[24764,0.9829,"#7593e6"] };
const AU_KM=149597870.7;
const PL_BANDS={ // [من خط عرض، إلى خط عرض، لون] رسم تقريبي للأحزمة الداكنة المعروفة
  jupiter:[[45,90,"rgba(118,96,74,.42)"],[24,31,"rgba(142,98,62,.38)"],[7,18,"rgba(152,92,56,.58)"],[-20,-7,"rgba(152,92,56,.58)"],[-32,-26,"rgba(142,98,62,.32)"],[-90,-45,"rgba(118,96,74,.42)"]],
  saturn:[[55,90,"rgba(120,112,90,.35)"],[12,24,"rgba(176,138,78,.28)"],[-24,-12,"rgba(176,138,78,.22)"],[-90,-55,"rgba(120,112,90,.35)"]] };
// حلقات زحل: الحافة الداخلية للحلقة C، ثم B، ثم فجوة كاسيني، ثم A (كم ÷ 60268)
const SAT_RINGS=[[1.239,1.527,"rgba(150,135,110,.35)"],[1.527,1.951,"rgba(232,214,170,.92)"],[2.027,2.269,"rgba(205,186,146,.78)"]];
const JUP_MOONS=[["io","آيو",1821.6,"#f1e3a6"],["europa","يوروبا",1560.8,"#ebe5d6"],["ganymede","غانيميد",2634.1,"#d3cabb"],["callisto","كاليستو",2410.3,"#a49a8e"]];
// الكوكب الذي يُكبَّر عليه: المختار، أو أقرب كوكب إلى وسط الشاشة أو إلى موضع التكبير (المؤشر أو منتصف الإصبعين)
let ZA=null;
function planetNear(){ if(st.sel&&st.sel.type==="body"&&PL_DISC[st.sel.id]) return st.sel.id; if(st.sel&&st.sel.type==="body"&&(st.sel.id==="sun"||st.sel.id==="moon")&&eclNow()) return "sun"; if(!C||!bodies||!bodies.length) return null; // قبل أول رسم لا كاميرا بعد
  let best=null,bd=0.3*DMIN; for(const b of bodies){ if(!PL_DISC[b.id]) continue; const q=projJ(b.v); if(!q) continue;
    const d=Math.min(Math.hypot(q[0]-CX,q[1]-CY),ZA?Math.hypot(q[0]-ZA[0],q[1]-ZA[1]):1e9); if(d<bd){ bd=d; best=b.id; } } return best; }
// زاوية الرؤية التي يملأ فيها قرص الكوكب (وحلقات زحل) نحو ثلث الشاشة، من قطره الحقيقي وبعده الليلة (#335)
function planetFitFov(id){ const b=bodies.find(x=>x.id===id), D=PL_DISC[id]; if(!b||!D) return null; scale();
  const ang=2*Math.atan(D[0]/((b.dist||1)*AU_KM))*R2D*(id==="saturn"?2.3:1), K=PERSP&&!AR.on?Math.max(W,Ht):DMIN;
  return Math.max(0.04,Math.min(8,ang*K/(0.32*DMIN))); }
function zoomToPlanet(id){ const b=bodies.find(x=>x.id===id), f=planetFitFov(id); if(!b||!f) return;
  if(!(st.sel&&st.sel.type==="body"&&st.sel.id===id)){ st.sel={type:"body",id}; showInfo(st.sel); }
  if(AR.on&&!AR.paused) arPause(); st.trackId=null; animateTo(b.v,f); }
const nearPlanetZoom=()=>!!planetNear();
function trackBody(){ if(!M||!st.trackId||st.fov>=3||(AR.on&&!AR.paused)||ptrs.size||st.anim) return;
  const b=bodies.find(x=>x.id===st.trackId); if(!b) return; const a=frameAz(b.v); if(Math.abs(a.az-st.az)>1e-7||Math.abs(a.alt-st.alt)>1e-7){ st.az=a.az; st.alt=a.alt; } }
// زاوية اتجاه نقطة قريبة من الجرم على الشاشة (للشمس ولقطب الكوكب)
// الشمس كما تراها العين (#407، المالك: «خلي التصميم دقيق … قريب من الحقيقة»)، وكل جزء منها من حقيقة فيزيائية:
// - حجم القرص الحقيقي: نصف قطرها 695,700 كم (NASA) ÷ بعدها في ذلك اليوم، نحو ربع درجة، مع حد أدنى حتى لا تضيع في المنظر الواسع.
// - الوهج يحدث في العين لا في السماء، فحجمه على الشاشة ثابت تقريباً مهما كبّرت (كان يكبر مع القرص فتمتلئ الشاشة بياضاً ويبدو القرص كرة باهتة)،
//   وهو أشد ما يكون عند حافة القرص ثم يخبو بسرعة ثم ببطء، وكبير قوي وهي عالية تبهر النظر، وأصغر وأخف قرب الأفق حيث يخفت ضوؤها في الهواء.
// - أشعة رفيعة خافتة حولها نهاراً حين تكون عالية: هالة الأهداب التي تراها العين حين تنظر إلى ضوء باهر (ciliary corona)، ولا تظهر قرب الغروب.
// - لونها من ارتفاعها: بيضاء فوق نحو 12 درجة ثم تصفرّ فتبرتقل فتحمرّ نحو الأفق، وحافتها السفلى أحمر من العليا لأن ضوءها يعبر هواءً أكثر.
// - تتفلطح قرب الأفق: الانكسار يرفع الحافة السفلى أكثر من العليا (صيغة سايموندسون، Meeus, Astronomical Algorithms 16.4).
// - حافة القرص أدفأ لوناً من وسطه حين يكبر على الشاشة، لكنها لا تعتم: إظلام الأطراف الحقيقي يتركها أسطع من السماء بملايين المرات، فلو رسمناها أعتم لبدت الشمس كرة رمادية على سماء النهار.
// ولا بقع شمسية: لا بيانات عندنا لبقع ذلك اليوم، فلا نرسم بقعاً من خيالنا.
function drawSun(p,b,pxPerDeg){
  const sa=Math.asin(Math.max(-1,Math.min(1,dot(M[2],b.v))))*R2D, rd=Math.atan(695700/((b.dist||1)*AU_KM))*R2D;
  const rS=Math.max(PERSP?4:6,pxPerDeg*rd);
  // الهواء ينزع الأزرق أولاً، فقرب الأفق يقل الأزرق في لونها فتصير ذهبية ثم برتقالية (لا خوخية)
  // وحتى في الظهر يبقى فيها دفء كريمي خفيف، لأن الهواء ينزع جزءاً صغيراً من الأزرق (من خارج الهواء تبدو بيضاء تماماً)
  const w=clamp01((sa+1)/13), lo=[255,104,18], mid=[255,186,66], hi=[255,244,214];
  const sc=w<0.5?mixC(lo,mid,w*2):mixC(mid,hi,(w-0.5)*2), core=mixC(sc,[255,250,234],0.1+0.9*w*w);
  const c=(k,a)=>`rgba(${k[0]},${k[1]},${k[2]},${a})`;
  // في الكسوف يقل الوهج بقدر ما بقي من قرص الشمس، ويختفي في الكسوف الكلي (#441)
  const lit=SECL?1-SECL.obsc:1, G=clamp01((sa+2)/22)*Math.sqrt(lit), gW=(40+190*G)*(0.25+0.75*Math.sqrt(lit)), gR=rS+gW, f=rS/gR; // gW: عرض الوهج على الشاشة، لا يتبع التكبير
  const g=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],gR);
  g.addColorStop(0,c(core,1)); g.addColorStop(f,c(core,.9)); g.addColorStop(f+(1-f)*.06,c(core,.55+.3*G)); g.addColorStop(f+(1-f)*.18,c(sc,.28+.3*G)); g.addColorStop(f+(1-f)*.45,c(sc,.08+.14*G)); g.addColorStop(1,c(sc,0));
  ctx.fillStyle=g; ctx.beginPath(); ctx.arc(p[0],p[1],gR,0,Math.PI*2); ctx.fill();
  if(G>0.35){ const k=(G-0.35)/0.65; ctx.save(); ctx.translate(p[0],p[1]); ctx.lineCap="round";
    for(let i=0;i<36;i++){ const a=i*0.1745+((i*37)%11)*0.013, len=rS+gW*(0.35+0.55*(((i*53)%17)/17)), wd=0.6+((i*29)%5)*0.25;
      const lg=ctx.createLinearGradient(0,0,Math.cos(a)*len,Math.sin(a)*len); lg.addColorStop(rS/len,`rgba(255,250,234,${0.32*k})`); lg.addColorStop(1,"rgba(255,250,234,0)");
      ctx.strokeStyle=lg; ctx.lineWidth=wd; ctx.beginPath(); ctx.moveTo(Math.cos(a)*rS,Math.sin(a)*rS); ctx.lineTo(Math.cos(a)*len,Math.sin(a)*len); ctx.stroke(); }
    ctx.restore(); }
  const ref=h=>{ h=Math.max(-1.5,h); return 1.02/Math.tan((h+10.3/(h+5.11))*D2R)/60; };
  const flat=Math.max(0.65,Math.min(1,((sa+rd+ref(sa+rd))-(sa-rd+ref(sa-rd)))/(2*rd)));
  ctx.save(); ctx.translate(p[0],p[1]); ctx.rotate(screenAng(p,b.v,M[2],0.002)); ctx.scale(flat,1); // المحور x نحو سمت الرأس، فالتفلطح رأسي
  const L=clamp01((rS-14)/50), warm=mixC(core,[255,214,150],0.45), d=ctx.createRadialGradient(0,0,0,0,0,rS);
  for(const r of [0,.6,.85,1]){ const mu=Math.sqrt(Math.max(0,1-r*r)); d.addColorStop(r,`rgb(${mixC(core,warm,L*(1-mu))})`); }
  ctx.fillStyle=d; ctx.beginPath(); ctx.arc(0,0,rS,0,Math.PI*2); ctx.fill();
  if(sa<8){ const t=clamp01((8-sa)/9)*0.55, lg=ctx.createLinearGradient(-rS,0,rS,0); lg.addColorStop(0,c(lo,t)); lg.addColorStop(.6,c(lo,0)); ctx.fillStyle=lg; ctx.beginPath(); ctx.arc(0,0,rS,0,Math.PI*2); ctx.fill(); }
  ctx.restore();
  if(SECL) drawEclipse(p,rS,rd,pxPerDeg);
  return rS+Math.min(70,gW*0.32);
}
// القمر أمام الشمس: قرصه بلون السماء خلفه (لا يُرى الجزء المظلم منه إلا حيث يحجب الشمس)، وفي الكسوف الكلي الإكليل حول القرص الأسود.
// إذا كُبّر قرص الشمس ليُرى في التصغير البعيد كُبّر القمر وبعده عنها بالنسبة نفسها، فيبقى شكل الكسوف صحيحاً
function drawEclipse(p,rS,rd,ppd){ const mp=projJ(bodies[1].v); if(!mp) return; const k=rS/Math.max(1e-9,rd*ppd);
  const cx=p[0]+(mp[0]-p[0])*k, cy=p[1]+(mp[1]-p[1])*k, rM=rS*SECL.rm/SECL.rs;
  if(SECL.total){ const R=rS*3.2, g=ctx.createRadialGradient(cx,cy,rM*0.98,cx,cy,R); g.addColorStop(0,"rgba(255,252,240,.95)"); g.addColorStop(.06,"rgba(240,242,255,.7)"); g.addColorStop(.25,"rgba(210,220,245,.28)"); g.addColorStop(.6,"rgba(190,205,240,.08)"); g.addColorStop(1,"rgba(190,205,240,0)");
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.fill();
    ctx.save(); ctx.translate(cx,cy); ctx.lineCap="round"; for(let i=0;i<14;i++){ const a=i*0.449+((i*37)%7)*0.09, len=rM*(1.6+((i*53)%11)/7); const lg=ctx.createLinearGradient(0,0,Math.cos(a)*len,Math.sin(a)*len); lg.addColorStop(rM/len,"rgba(235,240,255,.35)"); lg.addColorStop(1,"rgba(235,240,255,0)"); ctx.strokeStyle=lg; ctx.lineWidth=rM*0.18; ctx.beginPath(); ctx.moveTo(Math.cos(a)*rM,Math.sin(a)*rM); ctx.lineTo(Math.cos(a)*len,Math.sin(a)*len); ctx.stroke(); } ctx.restore(); }
  let col="#05070d"; if(REAL_ON()&&!SECL.total){ const aa=altAz(bodies[0].v), sk=sampleSky(aa.az,Math.max(0,aa.alt)), c=skyDisp(sk[0],sk[1],sk[2],sk[3],Math.sin(Math.max(0,aa.alt)*D2R)); col=`rgb(${Math.round(70*c[0]+8)},${Math.round(70*c[1]+10)},${Math.round(70*c[2]+18)})`; } // الوجه المظلم للقمر أمام قرص الشمس الساطع يبدو داكناً
  // خارج قرص الشمس لا يُرى القمر (الوهج في الهواء وفي العين أمامه)، فيُرسم داخل القرص فقط إلا في الكلية
  ctx.save(); if(!SECL.total){ ctx.beginPath(); ctx.arc(p[0],p[1],rS+0.5,0,Math.PI*2); ctx.clip(); }
  ctx.fillStyle=col; ctx.beginPath(); ctx.arc(cx,cy,rM,0,Math.PI*2); ctx.fill(); ctx.restore(); }
// إطار المنظار أو التلسكوب أو الكاميرا (#441، اقتراح تقرير الاختبار، كإضافة Oculars في Stellarium). الحساب من أرقام القارئ نفسه:
// المنظار: المجال المكتوب عليه (بالدرجة، أو بالأمتار على بعد 1000 متر: 2·atan(م/2000))؛ التلسكوب: المجال الظاهري للعينية × بؤرة العينية ÷ بؤرة التلسكوب،
// والتكبير بؤرة التلسكوب ÷ بؤرة العينية؛ الكاميرا: 2·atan(ضلع المستشعر ÷ (2 × البعد البؤري)). يُحفظ في المتصفح (atlas-frame)
const FF={kind:"off",bd:"",bu:"deg",tf:"700",ef:"25",ea:"52",cf:"50",sp:"36x24"};
try{ const s=JSON.parse(localStorage.getItem("atlas-frame")||"null"); if(s&&typeof s==="object") for(const k in FF) if(typeof s[k]==="string") FF[k]=s[k]; }catch(e){}
function frameDeg(){ const n=k=>{ const v=parseFloat(FF[k]); return isFinite(v)&&v>0?v:null; };
  if(FF.kind==="bino"){ const v=n("bd"); if(!v) return null; const d=FF.bu==="m"?2*Math.atan(v/2000)*R2D:v; return d>0&&d<90?{w:d,h:d,round:true}:null; }
  if(FF.kind==="tel"){ const tf=n("tf"), ef=n("ef"), ea=n("ea"); if(!tf||!ef||!ea) return null; const d=ea*ef/tf; return d>0&&d<90?{w:d,h:d,round:true,mag:tf/ef}:null; }
  if(FF.kind==="cam"){ const f=n("cf"), sp=String(FF.sp).split("x").map(Number); if(!f||!(sp[0]>0&&sp[1]>0)) return null; return {w:2*Math.atan(sp[0]/(2*f))*R2D,h:2*Math.atan(sp[1]/(2*f))*R2D,round:false}; }
  return null; }
const degTxt=d=>d>=10?Math.round(d)+"°":d>=1?d.toFixed(1)+"°":d.toFixed(2)+"°";
function drawFrame(ppd){ if(EMBED||st.clean) return; const f=frameDeg(); if(!f) return; const w=f.w*ppd, h=f.h*ppd; if(w<6||w>W*3) return;
  ctx.save(); ctx.beginPath(); ctx.rect(0,0,W,Ht); if(f.round) ctx.arc(CX,CY,w/2,0,Math.PI*2,true); else { ctx.moveTo(CX-w/2,CY-h/2); ctx.lineTo(CX-w/2,CY+h/2); ctx.lineTo(CX+w/2,CY+h/2); ctx.lineTo(CX+w/2,CY-h/2); ctx.closePath(); }
  ctx.fillStyle="rgba(0,0,0,.38)"; ctx.fill("evenodd");
  ctx.strokeStyle="rgba(236,200,122,.9)"; ctx.lineWidth=1.5; ctx.beginPath(); if(f.round) ctx.arc(CX,CY,w/2,0,Math.PI*2); else ctx.rect(CX-w/2,CY-h/2,w,h); ctx.stroke();
  const name=FF.kind==="bino"?"منظار":FF.kind==="tel"?"تلسكوب":"كاميرا", t=`${name} · ${f.round?degTxt(f.w):degTxt(f.w)+" × "+degTxt(f.h)}`;
  const ty=Math.max(barTop+16,CY-(f.round?w:h)/2-10); ctx.font="600 13px "+FUI; ctx.textAlign="center"; ctx.textBaseline="bottom"; ctx.lineWidth=3; ctx.strokeStyle="rgba(5,7,15,.8)"; ctx.strokeText(t,CX,ty); ctx.fillStyle=BRASS; ctx.fillText(t,CX,ty);
  ctx.restore(); }
function frameOut(){ const f=frameDeg(), o=document.getElementById("ffOut"), mf=document.getElementById("menuFov");
  if(FF.kind==="off"){ o.textContent=""; if(mf) mf.textContent="ما يدخل في مجال عدستك"; return; }
  if(!f){ o.textContent="اكتب الأرقام المطلوبة ليظهر الإطار."; return; }
  const moons=Math.round(Math.min(f.w,f.h)/0.52), dg=x=>"\u2066"+degTxt(x)+"\u2069";
  o.textContent=`مجال الرؤية الحقيقي ${f.round?dg(f.w):dg(f.w)+" عرضاً و"+dg(f.h)+" ارتفاعاً"}${f.mag?`، والتكبير ${Math.round(f.mag)} مرة`:""}، ${moons>=2?`فيتسع لنحو ${moons===2?"قمرين متجاورين":moons<=10?moons+" أقمار متجاورة":moons+" قمراً متجاوراً"}، لأن قرص القمر نحو نصف درجة`:moons===1?"وهذا نحو قرص القمر، فهو نحو نصف درجة":"وهو أصغر من قرص القمر، فهو نحو نصف درجة"}.`;
  if(mf) mf.textContent=(FF.kind==="bino"?"منظار":FF.kind==="tel"?"تلسكوب":"كاميرا")+" "+(f.round?degTxt(f.w):degTxt(f.w)+"×"+degTxt(f.h)); }
function frameSync(fit){ const ids={bd:"ffBd",bu:"ffBu",tf:"ffTf",ef:"ffEf",ea:"ffEa",cf:"ffCf",sp:"ffSp"};
  for(const k in ids){ const el=document.getElementById(ids[k]); if(el&&document.activeElement!==el) el.value=FF[k]; }
  document.querySelectorAll("#ffKind [data-ff]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.ff===FF.kind)));
  document.getElementById("ffBino").hidden=FF.kind!=="bino"; document.getElementById("ffTel").hidden=FF.kind!=="tel"; document.getElementById("ffCam").hidden=FF.kind!=="cam";
  frameOut(); try{ localStorage.setItem("atlas-frame",JSON.stringify(FF)); }catch(e){}
  // يقرّب العرض أو يبعده حتى يملأ الإطار نحو ثلث الشاشة، فلا يكون نقطة ولا أكبر من الشاشة
  const f=frameDeg(); if(fit&&f){ const k=PERSP&&!AR.on?Math.max(W,Ht)/DMIN:1, want=Math.max(f.w,f.h)*2.6*k; if(want<st.fov/2.5||want>st.fov*0.95){ const vd=viewDir(); animateView({az:vd.az,alt:vd.alt,fov:want}); } }
  dirty=true; }
function screenAng(p,from,dir,k){ const q=projJ(nrm([from[0]+dir[0]*k,from[1]+dir[1]*k,from[2]+dir[2]*k])); return q?Math.atan2(q[1]-p[1],q[0]-p[0]):0; }
let PCAP={};
function drawPlanet(p,b,pxPerDeg,ga){
  const D=PL_DISC[b.id], t=A.MakeTime(curTime()), dist=b.dist||1;
  const rTrue=pxPerDeg*Math.atan(D[0]/(dist*AU_KM))*R2D;
  // النقطة: حجمها من لمعانها، يكبر قليلاً مع التكبير حتى 20 درجة ثم يثبت (كان يكبر بلا حد فيبدو قرصاً بحجم غير حقيقي)
  const rDot=Math.min(PCAP[b.id]||99,Math.max(2.4,(5-(b.mag==null?5:b.mag))*0.9)*Math.pow(105/Math.max(20,st.fov),0.35));
  // نقطة ضوء كما تراها العين (#403، المالك: «عامل حولين الكوكب زي دايرة سودة»): قلب أبيض يذهب إلى لون الكوكب ثم يخبو في السماء، بلا حلقة داكنة ولا حافة.
  // كانت الحلقة الداكنة (#352) تفصل كوكبين متقاربين، والآن يفصلهما PCAP: نصف قطر النقطة أقل من نصف المسافة إلى أقرب جرم (#371)
  if(rTrue<rDot*0.85){ const rc=rDot*1.15; ctx.globalAlpha=ga*.55; ctx.drawImage(glow,p[0]-rDot*3.6,p[1]-rDot*3.6,rDot*7.2,rDot*7.2); ctx.globalAlpha=ga;
    const gr=ctx.createRadialGradient(p[0],p[1],0,p[0],p[1],rc); gr.addColorStop(0,"#fffdf6"); gr.addColorStop(.32,"#fffdf6"); gr.addColorStop(.62,b.c); gr.addColorStop(.84,b.c+"99"); gr.addColorStop(1,b.c+"00");
    ctx.fillStyle=gr; ctx.beginPath(); ctx.arc(p[0],p[1],rc,0,Math.PI*2); ctx.fill(); return {ext:rDot}; }
  const r=Math.max(rTrue,rDot*0.85), flat=D[1];
  // اتجاه الشمس والقطب الشمالي للكوكب على الشاشة
  const sv=bodies[0].v, sunAng=screenAng(p,b.v,[sv[0]-b.v[0],sv[1]-b.v[1],sv[2]-b.v[2]],0.002);
  let pole=null; try{ const ax=A.RotationAxis(A.Body[b.b],t); pole=[ax.north.x,ax.north.y,ax.north.z]; }catch(e){}
  const poleAng=pole?screenAng(p,b.v,pole,1e-4):-Math.PI/2;
  // توهج خفيف يخبو كلما كبر القرص
  ctx.globalAlpha=ga*Math.max(0,0.5-r/120); if(ctx.globalAlpha>0.01) ctx.drawImage(glow,p[0]-r*3,p[1]-r*3,r*6,r*6); ctx.globalAlpha=ga;
  // ميل حلقات زحل: الزاوية بين خط النظر ومستوى الحلقات (موجبة حين يواجهنا وجهها الشمالي)
  let B=0; if(b.id==="saturn"&&pole) B=Math.asin(Math.max(-1,Math.min(1,-dot(pole,b.v))));
  const rings=half=>{ // half: +1 النصف على جهة القطب الشمالي في الصورة، -1 الآخر
    ctx.save(); ctx.translate(p[0],p[1]); ctx.rotate(poleAng); ctx.beginPath(); ctx.rect(half>0?0:-r*3,-r*3,r*3,r*6); ctx.clip();
    const sb=Math.max(0.004,Math.abs(Math.sin(B)));
    for(const [a0,a1,c] of SAT_RINGS){ ctx.beginPath(); ctx.ellipse(0,0,r*a1*sb,r*a1,0,0,Math.PI*2); ctx.ellipse(0,0,r*a0*sb,r*a0,0,0,Math.PI*2); ctx.fillStyle=c; ctx.fill("evenodd"); }
    ctx.restore(); };
  // النصف القريب من الحلقات أمام الكوكب: في الجهة المقابلة للقطب الظاهر لنا
  const near=B>0?-1:1;
  if(b.id==="saturn") rings(-near);
  // القرص: نرسم الجزء المضاء فقط (الجانب المظلم لا يُرى في السماء)، والطور كما في القمر
  ctx.save(); ctx.translate(p[0],p[1]); ctx.rotate(sunAng);
  const pa=(b.phase||0)*D2R, rx=r*Math.cos(pa);
  ctx.beginPath(); ctx.arc(0,0,r,-Math.PI/2,Math.PI/2,false);
  if(rx>=0) ctx.ellipse(0,0,Math.abs(rx),r,0,Math.PI/2,3*Math.PI/2,false); else ctx.ellipse(0,0,Math.abs(rx),r,0,Math.PI/2,-Math.PI/2,true);
  ctx.clip(); ctx.rotate(poleAng-sunAng);
  ctx.beginPath(); ctx.ellipse(0,0,r*flat,r,0,0,Math.PI*2); ctx.fillStyle=D[2]; ctx.fill(); ctx.clip();
  for(const [l0,l1,c] of (PL_BANDS[b.id]||[])){ const x0=Math.sin(l0*D2R)*r*flat, x1=Math.sin(l1*D2R)*r*flat; ctx.fillStyle=c; ctx.fillRect(Math.min(x0,x1),-r,Math.abs(x1-x0),2*r); }
  const g=ctx.createRadialGradient(0,0,r*0.35,0,0,r*1.02); g.addColorStop(0,"rgba(0,0,0,0)"); g.addColorStop(1,"rgba(0,0,0,.42)"); ctx.fillStyle=g; ctx.fillRect(-r,-r,2*r,2*r);
  ctx.restore();
  if(b.id==="saturn") rings(near);
  // المسافة من المركز إلى أسفل ما رُسم (الحلقات المائلة في زحل) حتى يُكتب الاسم تحته
  const sbE=Math.abs(Math.sin(B)), ext=b.id==="saturn"?Math.max(r,r*2.269*Math.hypot(sbE*Math.sin(poleAng),Math.cos(poleAng))):r;
  // أقمار المشتري الأربعة: مواضعها لحظة خروج ضوئها نحونا (زمن الضوء 499 ثانية لكل وحدة فلكية)
  if(b.id==="jupiter"){ let jm=null; try{ jm=A.JupiterMoons(t.AddDays(-dist*0.0057755183)); }catch(e){}
    if(jm){ const J=[b.v[0]*dist,b.v[1]*dist,b.v[2]*dist];
      for(const [k,ar,km,col] of JUP_MOONS){ const m=jm[k]; if(!m) continue; const P=[J[0]+m.x,J[1]+m.y,J[2]+m.z], dm=Math.hypot(P[0],P[1],P[2]), q=projJ(nrm(P)); if(!q) continue;
        const sep=Math.hypot(q[0]-p[0],q[1]-p[1]); if(dm>dist&&sep<r*0.98) continue; // خلف الكوكب
        const rm=Math.max(1.5,pxPerDeg*Math.atan(km/(dm*AU_KM))*R2D);
        ctx.globalAlpha=ga*(sep<r?0.55:1); ctx.fillStyle=col; ctx.beginPath(); ctx.arc(q[0],q[1],rm,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=ga;
        if(sep>r+6) labels.push({x:q[0],y:q[1]+rm+13,t:ar,font:"12px "+FUI,col:"rgba(220,212,192,.85)",pr:1}); } } }
  return {ext};
}
function drawMoon(p,b,r){
  const sun=bodies[0], sp=projJ(sun.v); let ang=0;
  if(sp) ang=Math.atan2(sp[1]-p[1],sp[0]-p[0]); else { const t=projJ(nrm([b.v[0]+(sun.v[0]-b.v[0])*0.02,b.v[1]+(sun.v[1]-b.v[1])*0.02,b.v[2]+(sun.v[2]-b.v[2])*0.02])); if(t) ang=Math.atan2(t[1]-p[1],t[0]-p[0]); }
  const ga=ctx.globalAlpha; ctx.save(); ctx.translate(p[0],p[1]); ctx.rotate(ang);
  ctx.globalAlpha=ga*.35; ctx.drawImage(glow,-r*3,-r*3,r*6,r*6); ctx.globalAlpha=ga;
  ctx.fillStyle="#2a2a2e"; ctx.beginPath(); ctx.arc(0,0,r,0,Math.PI*2); ctx.fill();
  const pa=(b.phase||0)*D2R, rx=r*Math.cos(pa);
  ctx.fillStyle="#efe9da"; ctx.beginPath(); ctx.arc(0,0,r,-Math.PI/2,Math.PI/2,false);
  if(rx>=0) ctx.ellipse(0,0,Math.abs(rx),r,0,Math.PI/2,3*Math.PI/2,false); else ctx.ellipse(0,0,Math.abs(rx),r,0,Math.PI/2,-Math.PI/2,true);
  ctx.fill(); ctx.restore();
}
let labelObstacles=[]; const LW=new Map(); // عرض كل اسم بخطه، يُقاس مرة واحدة
let HOV=null, HOVP=null; const SHOWN=new Set(); // أسماء الأجرام المكتوبة فعلاً على الشاشة في هذا الإطار
function drawHover(){ HOVP=null; if(!HOV||AR.on) return; const h=hits.find(x=>x.type===HOV.type&&x.id===HOV.id); if(!h) return;
  let t=hitName(h);
  // نجم بلا اسم مشهور: تسميته الفلكية بالعربية إن وُجدت، وإلا كوكبته وقدره، لا رقم الفهرس
  if(!t&&h.type==="star"){ t=starTitle(h.id); if(/^نجم HIP/.test(t)){ const i=starIdx[h.id], c=conOfStar(h.id), m=i!=null?SKY.stars[i][2]:null; t="نجم"+(c&&CONS[c]?" في "+shortName(CONS[c].ar):"")+(m!=null?" · القدر "+m.toFixed(1):""); } }
  if(!t) return;
  ctx.save(); ctx.strokeStyle="rgba(232,200,130,.9)"; ctx.lineWidth=1.3; ctx.beginPath(); ctx.arc(h.x,h.y,Math.max(7,h.r-1),0,Math.PI*2); ctx.stroke();
  // الاسم مكتوب على الشاشة بجوار الجرم: تكفي الحلقة، فلا يتكرر الاسم في بطاقة ثانية
  if(SHOWN.has(h.type+":"+h.id)){ ctx.restore(); return; }
  HOVP=t; ctx.font="600 14px "+FUI; ctx.direction="rtl"; const w=ctx.measureText(t).width, px=8, bh=24; let x=h.x+Math.max(10,h.r+4), y=h.y-bh-4;
  if(x+w+2*px>W-6) x=h.x-Math.max(10,h.r+4)-w-2*px; if(y<6) y=h.y+Math.max(10,h.r+4);
  ctx.fillStyle="rgba(10,15,30,.86)"; ctx.beginPath(); ctx.roundRect?ctx.roundRect(x,y,w+2*px,bh,12):ctx.rect(x,y,w+2*px,bh); ctx.fill();
  ctx.strokeStyle="rgba(201,162,92,.55)"; ctx.lineWidth=1; ctx.stroke(); ctx.fillStyle="#f3ecd9"; ctx.textAlign="right"; ctx.textBaseline="middle"; ctx.fillText(t,x+w+px,y+bh/2+1); ctx.restore(); }
// أسماء الكواكب المتقاربة على الشاشة (#352): كان لكل كوكب اسم تحت نقطته وحده، فإذا تقاربت النقطتان تصادم الاسمان
// وغاب الثاني، فبدا المشتري جزءاً من المريخ. الآن تُكتب أسماء المتقاربين في صف واحد تحتهم، كلٌّ بلونه وبترتيب مواضعهم من اليسار إلى اليمين
function bodyRow(list){ const used=new Set(), out=[];
  ctx.save(); ctx.direction="rtl";
  for(let i=0;i<list.length;i++){ if(used.has(i)) continue; const g=[i]; used.add(i);
    for(let k=0;k<g.length;k++) for(let j=0;j<list.length;j++) if(!used.has(j)&&Math.abs(list[g[k]].x-list[j].x)<70&&Math.abs(list[g[k]].py-list[j].py)<44){ used.add(j); g.push(j); }
    if(g.length===1){ out.push(list[i].L); continue; }
    const it=g.map(n=>list[n]).sort((a,b)=>a.x-b.x), gap=16;
    it.forEach(o=>{ ctx.font=o.L.font; o.w=ctx.measureText(o.L.t).width; });
    const tot=it.reduce((a,o)=>a+o.w,0)+gap*(it.length-1), cx=it.reduce((a,o)=>a+o.x,0)/it.length, y=Math.max(...it.map(o=>o.y)), pr=Math.min(...it.map(o=>o.L.pr));
    const ya=Math.min(...it.map(o=>o.py-o.ext))-7; // فوقهم إن لم يتسع المكان تحتهم (قرب الأفق مثلاً)
    // (#379، المالك: «اسم المشتري يظهر قريب من المريخ»): كان الصف تحت أوطى نقطة فينزل اسم الأعلى تحت جاره؛ الآن كل اسم بجوار نقطته
    // من الجهة البعيدة عن مركز المجموعة، ويجرّب الجهات الأخرى حول نقطته نفسها إن لم يتسع المكان
    const cy=it.reduce((a,o)=>a+o.py,0)/it.length;
    for(const o of it){ const dx=o.x-cx, dy=o.py-cy; o.L.star={x:o.x,y:o.py,g:o.ext+5}; o.L.side=Math.abs(dx)>=Math.abs(dy)*0.8?(dx<0?"l":"r"):(dy<0?"u":"d"); delete o.L.ya; o.L.pr=pr; o.L.row=1; out.push(o.L); } }
  ctx.restore(); return out; }
// مراجعة #379 (المالك 2026-11-19): الأسماء على الهاتف أصغر قليلاً (كانت تغطي 6.5% من شاشته مقابل 2.8% على الحاسوب)،
// ولا يُرسم اسم مقطوع عند الحافة أو تحت زر شبه شفاف، وتُكتب نهاراً وفي الشفق بحبر داكن بهالة فاتحة (كان التباين 1.1–1.9)
const LSCALE=()=>W<380?0.86:W<500?0.88:1, LFONT=new Map();
function lfont(f){ const sc=LSCALE(); if(sc===1) return f; const k=sc+"|"+f; let r=LFONT.get(k); if(r==null){ r=f.replace(/(\d+(?:\.\d+)?)px/,(m,n)=>(+n*sc).toFixed(1)+"px"); if(LFONT.size>600) LFONT.clear(); LFONT.set(k,r); } return r; }
const UI_SEL=".top>*,#hud,#fovChip,#topTools>*,#zoomCtl,#b3d,#bAtlas,.bottom,#dockTog,#day,#focusBar,#pickBar,#arTop,#arBar,#arCap,#fab,#info";
let UIOB=[], UIOB_T=-1e9, LDAY=0;
function uiObstacles(){ const now=performance.now(); if(now-UIOB_T<400) return UIOB; UIOB_T=now; UIOB=[];
  for(const el of document.querySelectorAll(UI_SEL)){ if(el.hidden||el.closest("[hidden]")) continue; const r=el.getBoundingClientRect(); if(r.width<2||r.height<2) continue; const cs=getComputedStyle(el); if(cs.display==="none"||cs.visibility==="hidden"||+cs.opacity<0.05) continue; UIOB.push([r.left-3,r.top-3,r.right+3,r.bottom+3]); }
  return UIOB; }
const SIDE={r:[0,4,5,2,3,1,6,7],l:[1,6,7,2,3,0,4,5],u:[2,4,6,0,1,3,5,7],d:[3,5,7,0,1,2,4,6]};
function dayInk(c){ if(c===BRASS||/207,169,85/.test(c)) return "#5a3c06"; const m=/rgba\([^)]*,\s*([\d.]+)\)/.exec(c); return m?"rgba(16,24,46,"+Math.max(0.8,+m[1]).toFixed(2)+")":"#101830"; }
function drawLabels(){
  labels.sort((a,b)=>a.pr-b.pr); const placed=labelObstacles.concat(EMBED?[]:uiObstacles()); SHOWN.clear();
  const hit=box=>placed.some(b=>!(box[2]<b[0]||box[0]>b[2]||box[3]<b[1]||box[1]>b[3]));
  const DAYI=LDAY>0.12;
  ctx.save(); ctx.direction="rtl"; ctx.shadowColor=DAYI?"rgba(255,255,255,.8)":"rgba(0,0,0,.9)"; ctx.shadowBlur=DAYI?3:4; ctx.textAlign="left";
  const PO=panoOn();
  for(const l of labels){ if(PO&&behindTerrain(l.star?l.star.x:l.x,l.star?l.star.y:l.y-4)) continue; const font=lfont(l.font); ctx.font=font; const wk=font+"|"+l.t; let w=LW.get(wk); if(w==null){ w=ctx.measureText(l.t).width; if(LW.size>4000) LW.clear(); LW.set(wk,w); } const h=parseFloat(font.replace(/^\d+ /,""))||14;
    let cands;
    if(l.star){ const {x,y,g}=l.star; cands=[[x+g,y+h*0.35],[x-g-w,y+h*0.35],[x-w/2,y-g-2],[x-w/2,y+g+h-2],[x+g,y-h*0.55],[x+g,y+h*1.15],[x-g-w,y-h*0.55],[x-g-w,y+h*1.15]]; if(l.side) cands=SIDE[l.side].map(i=>cands[i]); }
    else { const x0=l.align==="r"?l.x:l.x-w/2, xc=Math.max(3,Math.min(W-w-3,x0)); cands=[[x0,l.y]]; if(xc!==x0) cands.push([xc,l.y]); if(l.ya!=null) cands.push([x0,l.ya]); } // اسم الكوكب تحته، وإلا فوقه؛ واسم الكوكبة يُزاح إلى داخل الشاشة
    for(const [x0,yb] of cands){ const box=[x0-2,yb-h+2,x0+w+2,yb+4];
      if(box[0]<1||box[2]>W-1||box[1]<1||box[3]>Ht-1) continue; if(hit(box)) continue; // كله داخل الشاشة، لا نصفه
      placed.push(box); ctx.fillStyle=DAYI?dayInk(l.col):l.col; ctx.fillText(l.t,x0,yb); if(l.key) SHOWN.add(l.key); break; }
  }
  ctx.restore();
}
function shortLabel(hip){ const n=NAMES[hip]; if(n&&n[0]) return shortName(n[0]); if(n&&n[2]){ const g=n[2].replace(/\d+$/,""); if(GREEK[g]) return GREEK[g]+(n[2].length>g.length?" "+n[2].slice(g.length):""); } return ""; }

// ================================================================ معاينة النجم
// مقارنة حجم النجم بالشمس، بالمقياس نفسه دائماً. ثلاث حالات:
// 1) نجم قريب من حجم الشمس: الكرتان جنباً إلى جنب.
// 2) نجم أكبر بكثير: كرة كبيرة، والشمس صغيرة إلى جوارها.
// 3) عملاق فائق: جزء من سطح النجم يملأ المشهد، والشمس نقطة، ومدارا الأرض والمريخ داخله إن وصلا.
const pv={el:null,hip:null,t0:0,key:"",grain:null};
const SUN_RGB=[255,214,120];
function rgbOf(str){ const m=/rgb\((\d+),(\d+),(\d+)\)/.exec(str||""); return m?[+m[1],+m[2],+m[3]]:[255,255,255]; }
function hexRgb(h){ const n=parseInt(h.slice(1),16); return [(n>>16)&255,(n>>8)&255,n&255]; }
const mix=(c,d,t)=>c.map((v,i)=>Math.round(v+(d[i]-v)*t));
const css3=(c,a)=>`rgba(${c[0]},${c[1]},${c[2]},${a==null?1:a})`;
function grainTex(){ if(pv.grain) return pv.grain; const c=document.createElement("canvas"); c.width=c.height=256; const g=c.getContext("2d");
  let seed=7; const rnd=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
  // حبيبات دقيقة كثيرة، مع تكرار سلس عند حواف المربع
  for(let i=0;i<5200;i++){ const x=rnd()*256,y=rnd()*256,r=0.5+rnd()*1.4,l=rnd()>0.5; g.fillStyle=l?`rgba(255,255,255,${0.035+0.03*rnd()})`:`rgba(0,0,0,${0.04+0.035*rnd()})`;
    for(const dx of [-256,0,256]) for(const dy of [-256,0,256]){ if((dx||dy)&&(x+dx<-3||x+dx>259||y+dy<-3||y+dy>259)) continue; g.beginPath(); g.arc(x+dx,y+dy,r,0,Math.PI*2); g.fill(); } }
  pv.grain=c; return c; }
// كرة نجمية: توهج خارجي، وإظلام نحو الحافة، وحبيبات خفيفة على السطح
function sphere(g,x,y,r,rgb,o){ o=o||{};
  if(r<1.3){ const gl=g.createRadialGradient(x,y,0,x,y,7); gl.addColorStop(0,css3(rgb,0.6)); gl.addColorStop(1,css3(rgb,0)); g.fillStyle=gl; g.beginPath(); g.arc(x,y,7,0,Math.PI*2); g.fill();
    g.fillStyle=css3(mix(rgb,[255,255,255],0.5)); g.beginPath(); g.arc(x,y,Math.max(0.9,r),0,Math.PI*2); g.fill(); return; }
  const halo=r*(o.big?1.06:1.35)+5, hg=g.createRadialGradient(x,y,r*0.96,x,y,halo); hg.addColorStop(0,css3(rgb,0.38)); hg.addColorStop(1,css3(rgb,0));
  g.fillStyle=hg; g.beginPath(); g.arc(x,y,halo,0,Math.PI*2); g.fill();
  const core=mix(rgb,[255,255,255],0.6), mid=mix(rgb,[255,255,255],0.22), edge=mix(rgb,[0,0,0],0.38);
  const dg=g.createRadialGradient(x-r*0.08,y-r*0.1,0,x,y,r); dg.addColorStop(0,css3(core)); dg.addColorStop(0.5,css3(mid)); dg.addColorStop(0.85,css3(rgb)); dg.addColorStop(0.97,css3(mix(rgb,edge,0.6))); dg.addColorStop(1,css3(edge));
  g.fillStyle=dg; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill();
  if(r>10){ g.save(); g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.clip(); g.globalAlpha=Math.min(0.85,r/60); const t=grainTex(), sz=Math.min(220,Math.max(70,r*0.45));
    const x0=Math.max(o.vx0!=null?o.vx0:-1e9,x-r), x1=Math.min(o.vx1!=null?o.vx1:1e9,x+r), y0=Math.max(-sz,y-r), y1=Math.min(y+r,(o.vy1!=null?o.vy1:1e9));
    for(let gx=x0-((x0-x)%sz+sz)%sz; gx<x1; gx+=sz) for(let gy=y0-((y0-y)%sz+sz)%sz; gy<y1; gy+=sz) g.drawImage(t,gx,gy,sz,sz);
    g.globalAlpha=1; const lg=g.createRadialGradient(x,y,r*0.6,x,y,r); lg.addColorStop(0,"rgba(0,0,0,0)"); lg.addColorStop(1,"rgba(0,0,0,.28)"); g.fillStyle=lg; g.fillRect(x0,y0,x1-x0,y1-y0);
    g.restore(); }
  if(o.dimBy){ g.fillStyle=`rgba(0,0,0,${o.dimBy})`; g.beginPath(); g.arc(x,y,r,0,Math.PI*2); g.fill(); }
}
function txt(g,t,x,y,o){ o=o||{}; g.font=(o.w||"600")+" "+(o.s||12.5)+"px "+FUI; g.textAlign=o.al||"center"; g.direction="rtl"; g.fillStyle=o.c||"#ece6d6"; g.fillText(t,x,y); }
function drawPreview(now){
  const c=pv.el; if(!c||!c.isConnected){ pv.el=null; return; }
  const d=CUR[pv.hip]; const rect=c.getBoundingClientRect(); if(!rect.width) return;
  const dpr=Math.min(window.devicePixelRatio||1,2.5); if(c.width!==Math.round(rect.width*dpr)||c.height!==Math.round(rect.height*dpr)){ c.width=Math.round(rect.width*dpr); c.height=Math.round(rect.height*dpr); }
  const g=c.getContext("2d"); g.setTransform(dpr,0,0,dpr,0,0); const w=rect.width,h=rect.height;
  const bg=g.createLinearGradient(0,0,0,h); bg.addColorStop(0,"#080c1a"); bg.addColorStop(1,"#03050b"); g.fillStyle=bg; g.fillRect(0,0,w,h);
  let sd=pv.hip; const rr=()=>{ sd=(sd*16807+11)%2147483647; return sd/2147483647; }; g.fillStyle="#fff"; for(let i=0;i<46;i++){ g.globalAlpha=0.12+rr()*0.35; g.fillRect(rr()*w,rr()*h,1,1); } g.globalAlpha=1;
  const rgb=rgbOf(SCOL[starIdx[pv.hip]]), R=d.r||1, name=shortName(starTitle(pv.hip));
  const motion=!matchMedia("(prefers-reduced-motion: reduce)").matches, t=motion?(now-pv.t0)/1000:2.2;
  const TOP=20, BAND=40, ch=h-TOP-BAND, cy=TOP+ch/2;
  const sizeTxt=d.rt? d.rt.replace(/ قطر الشمس.*/," قطر الشمس") : `نحو ${R<10?R:Math.round(R)} ضعف قطر الشمس`;
  const comp=d.b? {name:d.b[0], rgb:hexRgb(d.b[1]), kind:d.b[2], r:d.b[3]||0.5} : null;
  let cap="الأحجام بالمقياس نفسه", sunX, sunNote="";
  if(R<=9){
    // الحالة 1: الكرتان جنباً إلى جنب
    const big=Math.max(R,1,comp?comp.r:0); let s=(ch*0.44)/big;
    const orbExtra=comp?(R*s*0.9+Math.max(1.8,comp.r*s)*2+14):0;
    const need=2*s+2*R*s+orbExtra*2+56; if(need>w) s*=w/need;
    const sunR=Math.max(2.4,s), starR=R*s; sunX=Math.max(sunR+18,w*0.22);
    const stx=Math.min(w-(R*s+(comp?R*s*0.9+Math.max(1.8,comp.r*s)*2+14:0))-12, Math.max(sunX+sunR+R*s+(comp?orbExtra:0)+24, w*0.64));
    sphere(g,sunX,cy,sunR,SUN_RGB);
    drawStarWithCompanion(g,stx,cy,starR,rgb,comp,s,t,w);
    if(R<1.6) cap="الحجمان متقاربان";
  } else if(R<=90){
    // الحالة 2: كرة كبيرة والشمس إلى جوارها
    const starR=Math.min(ch*0.5,(w*0.56)/2), s=starR/R, stx=w*0.64+(comp?-starR*0.1:0); sunX=Math.min(w*0.15, stx-starR-30);
    sphere(g,sunX,cy,s,SUN_RGB); if(s<1.3) sunNote="نقطة بهذا المقياس";
    drawStarWithCompanion(g,stx,cy,starR,rgb,comp,s,t,w);
  } else {
    // الحالة 3: عملاق فائق؛ نرى جزءاً من سطحه، ومداري الأرض والمريخ لو وُضع مكان الشمس
    const edgeX=w*0.36; let starR=Math.max(h*1.15,w*0.9);
    if(R>215) starR=Math.max(h*1.0,Math.min(starR,(w*0.5)/(1-215/R)));
    const stx=edgeX+starR, sty=cy, s=starR/R;
    sphere(g,stx,sty,starR,rgb,{big:true,vx0:edgeX-10,vx1:w+2,vy1:h});
    const orbits=[[215,"مدار الأرض"],[327,"مدار المريخ"]].filter(([au])=>au<R);
    orbits.forEach(([au,lab],i)=>{ const or=starR*au/R; if(stx-or>w-14) return;
      g.save(); g.setLineDash([5,5]); g.strokeStyle="rgba(255,255,255,.75)"; g.lineWidth=1.3; g.beginPath(); g.arc(stx,sty,or,Math.PI*0.62,Math.PI*1.38); g.stroke(); g.restore();
      const yy=TOP+16+i*16; const dy=yy-sty, xx=stx-Math.sqrt(Math.max(0,or*or-dy*dy));
      g.save(); g.font="600 11px "+FUI; const tw=g.measureText(lab).width; g.restore();
      const lx=(xx+9+tw+6<w)?xx+9:xx-9-tw; g.fillStyle="rgba(6,8,16,.62)"; g.fillRect(lx-4,yy-11,tw+8,15);
      txt(g,lab,lx,yy,{al:"left",s:11,c:"#fff"}); });
    sunX=w*0.16; sphere(g,sunX,cy,s,SUN_RGB);
    g.strokeStyle="rgba(255,214,120,.55)"; g.lineWidth=1; g.beginPath(); g.arc(sunX,cy,8,0,Math.PI*2); g.stroke();
    sunNote="نقطة بهذا المقياس"; cap="جزء من سطح النجم، والأحجام بالمقياس نفسه";
  }
  // شريط الأسماء أسفل المشهد
  const bandG=g.createLinearGradient(0,h-BAND-34,0,h); bandG.addColorStop(0,"rgba(3,5,11,0)"); bandG.addColorStop(0.45,"rgba(3,5,11,.62)"); bandG.addColorStop(1,"rgba(3,5,11,.93)");
  g.fillStyle=bandG; g.fillRect(0,h-BAND-34,w,BAND+34);
  txt(g,name,w-12,h-22,{al:"right",s:13.5}); txt(g,sizeTxt,w-12,h-7,{al:"right",w:"400",s:11.5,c:"#b8bfce"});
  txt(g,"الشمس",Math.max(26,sunX),h-22,{s:12.5,c:"#f0dca6"}); if(sunNote) txt(g,sunNote,Math.max(40,sunX),h-7,{w:"400",s:10.5,c:"#8f98ac"});
  if(comp) cap+=" · المدار مبسّط";
  g.font="400 11px "+FUI; const cw=g.measureText(cap).width; g.fillStyle="rgba(3,5,11,.6)"; g.fillRect(4,3,cw+12,16);
  txt(g,cap,10,15,{al:"left",w:"400",s:11,c:"rgba(196,202,218,.9)"});
}
// نجم ومرافقه في مدار مائل: المرافق يمر خلف النجم ثم أمامه
function drawStarWithCompanion(g,x,y,r,rgb,comp,s,t,w){
  if(!comp){ sphere(g,x,y,r,rgb); return; }
  const cr0=Math.max(comp.r<0.05?1.3:1.8, comp.r*s);
  let orb=r*1.9+cr0+12; if(x+orb+cr0>w-6) orb=Math.max(r+cr0+6,w-6-cr0-x);
  const ang=t*0.6, cx=x+Math.cos(ang)*orb, cyy=y+Math.sin(ang)*orb*0.28, front=Math.sin(ang)>0;
  const cr=cr0*(1+Math.sin(ang)*0.07);
  const ring=(from,to)=>{ g.save(); g.strokeStyle="rgba(170,180,210,.35)"; g.setLineDash([3,4]); g.lineWidth=1; g.beginPath(); g.ellipse(x,y,orb,orb*0.28,0,from,to); g.stroke(); g.restore(); };
  ring(Math.PI,Math.PI*2);
  if(!front) sphere(g,cx,cyy,cr,comp.rgb);
  let dimBy=0; if(comp.kind==="eclipse"&&front&&Math.abs(cx-x)<r+cr) dimBy=0.4*(1-Math.abs(cx-x)/(r+cr));
  sphere(g,x,y,r,rgb,{dimBy});
  ring(0,Math.PI);
  if(front) sphere(g,cx,cyy,cr,comp.rgb);
}

// ================================================================ التحديد والمعلومات
function selVec(sel){
  if(sel.type==="star") return starV(sel.id);
  if(sel.type==="con"){ const c=CONS[sel.id]; return c?c.v:null; }
  if(sel.type==="dso"){ const d=SKY.dsos.find(x=>x.id===sel.id); return d&&d.v; }
  if(sel.type==="body"){ const b=bodies.find(x=>x.id===sel.id); return b&&b.v; }
  if(sel.type==="mansion"){ const m=SKY.mansions[sel.id-1]; return m&&m.v; }
  if(sel.type==="ast"){ const a=ASTS[sel.id]; return a&&a.v; }
  if(sel.type==="met"){ const m=METBY[sel.id]; return m&&m.vv; }
  if(sel.type==="route"){ const r=ROUTES[sel.id]; return r&&r.pv[r.pv.length-1]; }
  return null;
}
function riseSet(ra,dec,bodyName){
  const t0=A.MakeTime(curTime()), maxAlt=90-Math.abs(st.lat-dec), minAlt=Math.abs(st.lat+dec)-90;
  if(!bodyName){ if(minAlt>0) return {always:true}; if(maxAlt<0) return {never:true}; A.DefineStar("Star1",ra/15,dec,1000); }
  const b=bodyName||"Star1"; let rise=null,set=null,tr=null;
  try{ rise=A.SearchRiseSet(b,obs,+1,t0,1.1); }catch(e){} try{ set=A.SearchRiseSet(b,obs,-1,t0,1.1); }catch(e){} try{ tr=A.SearchHourAngle(b,obs,0,t0,+1); }catch(e){}
  return {rise:rise&&rise.date,set:set&&set.date,transit:tr&&tr.time.date,transitAlt:tr&&tr.hor.altitude};
}
function bestMonth(ra){ let best=0,bd=99; const y=tzParts(st.t).y;
  for(let m=0;m<12;m++){ const t=zonedToUtc(y,m+1,15,21,0); const lst=(A.SiderealTime(new Date(t))+st.lon/15+48)%24; let ha=lst-ra/15; ha=((ha+36)%24)-12; if(Math.abs(ha)<bd){bd=Math.abs(ha);best=m;} } return MONTHS[best]; }
function relDay(d){ const a=tzParts(st.t),b=tzParts(d.getTime()); const n=Math.round((Date.UTC(b.y,b.mo-1,b.d)-Date.UTC(a.y,a.mo-1,a.d))/864e5); return n===0?"اليوم":n===1?"غداً":n===-1?"أمس":fmt(d,{weekday:"long"}); }
function placeName(){ const ci=cityRow(st.city); return ci&&ci[0]!=="custom"?ci[1]:(nearShort()||"مكانك"); }
function nowBlock(sel,bodyName){
  const v=selVec(sel); if(!v) return ""; const rd=radec(v), aa=altAz(v); let h="";
  h+= aa.alt>0? `<b>فوق الأفق الآن</b> في سماء ${placeName()}، باتجاه ${dirName(aa.az)}، على ارتفاع ${Math.round(aa.alt)} درجة.` : `<b>تحت الأفق الآن</b> في سماء ${placeName()}.`;
  const r=riseSet(rd.ra,rd.dec,bodyName);
  if(r.always) h+= (sel.type==="star"&&sel.id===11767)? `<br>يبقى ثابتاً تقريباً في جهة الشمال طوال الليل وطوال العام.` : `<br>لا يغيب أبداً عن سماء ${placeName()}، بل يدور حول ${st.lat>=0?"النجم القطبي":"القطب السماوي الجنوبي"} طوال الليل.`;
  else if(r.never) h+=`<br>لا يرتفع أبداً فوق أفق ${placeName()}. يحتاج إلى مكان أقرب إلى ${rd.dec<0?"الجنوب":"الشمال"}.`;
  // الشمس والقمر والكواكب قرب القطبين: لا شروق ولا غروب في هذه الأيام
  else if(bodyName&&!r.rise&&!r.set) h+= aa.alt>0? `<br>لا يغيب عن سماء ${placeName()} في هذه الأيام.` : `<br>لا يرتفع فوق أفق ${placeName()} في هذه الأيام.`;
  else { const ev=[]; if(r.rise) ev.push([r.rise,`يشرق ${relDay(r.rise)} الساعة ${fTime(r.rise)}`]); if(r.transit) ev.push([r.transit,`يبلغ أعلى ارتفاع له ${relDay(r.transit)} الساعة ${fTime(r.transit)}${r.transitAlt!=null?`، على ارتفاع ${Math.round(r.transitAlt)} درجة`:""}`]); if(r.set) ev.push([r.set,`يغرب ${relDay(r.set)} الساعة ${fTime(r.set)}`]);
    ev.sort((a,b)=>a[0]-b[0]); if(ev.length) h+="<br>"+ev.map(e=>e[1]).join("، ثم ")+"."; }
  return h;
}
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c])); }
function ltr(h){ return h.replace(/([A-Za-z][A-Za-z0-9.\-+:/ ]*[A-Za-z0-9.])/g,'<bdi dir="ltr">$1</bdi>'); }
const fmag=m=>(m<0?"−":"")+Math.abs(m).toFixed(2).replace(/0$/,"");
const num=n=>Math.round(n).toLocaleString("ar-u-nu-latn");
function factsHtml(rows){ return `<dl class="facts">${rows.filter(r=>r&&r[1]!=null&&r[1]!=="").map(r=>`<div class="${r[2]||""}"><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join("")}</dl>`; }
function conChip(id){ const c=CONS[id]; return c?`<button class="chip" data-sel="con:${c.id}">${esc(shortName(c.ar))}</button>`:""; }

function openInfo(html){ document.body.classList.add("info-open"); info.innerHTML=`<button class="close" aria-label="إغلاق" data-close="info">✕</button>${EMBED?"":`<button class="share" data-share aria-label="انسخ رابط هذا الجرم أو شاركه" title="رابط هذا الجرم"><svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M10 14a4 4 0 0 0 5.7 0l3.6-3.6a4 4 0 0 0-5.7-5.7L12 6.3M14 10a4 4 0 0 0-5.7 0l-3.6 3.6a4 4 0 0 0 5.7 5.7L12 17.7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>`}`+html; info.hidden=false; info.scrollTop=0; layout();
  const c=info.querySelector(".pv canvas"); pv.el=c||null; if(c){ pv.hip=+c.dataset.hip; pv.t0=performance.now(); } }
function showInfo(sel){
  if(!sel){ info.hidden=true; pv.el=null; document.body.classList.remove("info-open"); info.classList.remove("oc","peek","full"); info.dataset.key=""; layout(); return; }
  if(!M) computeSky();
  const f={star:starInfo,con:conInfo,dso:dsoInfo,body:bodyInfo,mansion:mansionInfo,ast:astInfo,route:routeInfo,met:metInfo}[sel.type];
  const key=sel.type+":"+sel.id, same=!info.hidden&&info.dataset.key===key;
  const opened=same?[...info.querySelectorAll("details")].map(d=>[d.dataset.k,d.open]):null, wasFull=same&&info.classList.contains("full");
  openInfo(f(sel.id)); info.dataset.key=key; hideBtn(sel); mineBtn(sel); lpTip(sel);
  const isCard=!!info.querySelector(".ocMore");
  info.classList.toggle("oc",isCard); info.classList.toggle("full",isCard&&wasFull); info.classList.toggle("peek",isCard&&!wasFull);
  if(opened) opened.forEach(([k,o])=>{ const d=info.querySelector(`details[data-k="${k}"]`); if(d) d.open=o; });
}
// لمحة البطاقة ثم كاملة: بالزر، أو بمقبض أعلاها، أو بالسحب لأعلى ولأسفل
function ocSet(full){ info.classList.toggle("full",full); info.classList.toggle("peek",!full); info.scrollTop=0; layout(); }
info.addEventListener("click",e=>{ const t=e.target.closest("[data-oc]"); if(!t) return; ocSet(t.dataset.oc==="full"?true:!info.classList.contains("full")); });
{ let y0=null; info.addEventListener("touchstart",e=>{ y0=info.scrollTop<=0?e.touches[0].clientY:null; },{passive:true});
  info.addEventListener("touchend",e=>{ if(y0==null||!info.classList.contains("oc")) return; const dy=e.changedTouches[0].clientY-y0; y0=null;
    if(dy<-40&&info.classList.contains("peek")) ocSet(true); else if(dy>60&&info.classList.contains("full")) ocSet(false); else if(dy>60&&info.classList.contains("peek")){ showInfo(null); st.sel=st.focus?{type:"con",id:st.focus}:null; dirty=true; } },{passive:true}); }
// ---------- بطاقة الجرم: لمحة (الاسم والشارات وسطر الضوء) ثم التفاصيل في أقسام ----------
const EXTRA=window.ATLAS_EXTRA||{deep:{},bodies:{},quran:{}};
// مشعات زخات الشهب (#441، اقتراح تقرير الاختبار: «أبص فين؟» ليلة الزخة). البيانات من SHOWERS في src/lib/meteors.js عبر atlas_meteors() في build_data.py:
// الموضع ليلة الذروة (المشع يتحرك قليلاً كل ليلة)، وموعد الذروة في كل سنة من خط طول الشمس كما في صفحات الزخات
const METS=(EXTRA.meteors||[]).map(m=>({slug:m[0],ar:m[1],con:m[2],ra:m[3],dec:m[4],lam:m[5],zhr:m[6],v:m[7],parent:m[8],a:m[9],b:m[10],vv:vec(m[3],m[4])}));
const METBY=Object.fromEntries(METS.map(m=>[m.slug,m]));
// الزخة نشطة في التاريخ المعروض (بتوقيت المكان)؟ فترة النشاط قد تعبر رأس السنة (الربعيات)
function metActive(m,ms){ const p=tzParts(ms==null?st.t:ms), x=p.mo*100+p.d, a=m.a[0]*100+m.a[1], b=m.b[0]*100+m.b[1]; return a<=b?x>=a&&x<=b:x>=a||x<=b; }
// ذروة الزخة الأقرب إلى الوقت المعروض (بحث عن خط طول الشمس في نصف سنة قبله ونصف بعده)
const METPK={}; function metPeak(m){ const k=m.slug+"|"+Math.round(st.t/864e5/5); if(k in METPK) return METPK[k]; let r=null; try{ const t=A.SearchSunLongitude(m.lam,A.MakeTime(new Date(st.t-182*864e5)),366); r=t?t.date:null; }catch(e){} return METPK[k]=r; }
function metNearPeak(m){ const p=metPeak(m); return !!p&&Math.abs(p-st.t)<1.5*864e5; }
// العدد مع «سنة»: من 3 إلى 10 «سنوات»، وغيرها «سنة» (310 سنوات، 25 سنة)
const yrs=n=>{ const r=Math.round(n)%100; return `${n} ${Number.isInteger(n)&&r>=3&&r<=10?"سنوات":"سنة"}`; };
function agoText(ly){ if(ly<20) return yrs(+ly.toFixed(2)); if(ly<10000) return "نحو "+yrs(Math.round(ly)); if(ly<1e6){ const k=Math.round(ly/1000); return `نحو ${k} ${k>=3&&k<=10?"آلاف":"ألف"} سنة`; } return `نحو ${+(ly/1e6).toFixed(1)} مليون سنة`; }
// المسافة بالسنين الضوئية من نص الموسوعة نفسه («نحو 310»، «بين 500 و700»، «2.5 مليون»)، ولا نحسب شيئاً من غيره
function lyRange(text){ if(!text||!/ضوئي/.test(text)) return null; const segs=text.split("،"), t=segs.find(x=>/\d|ألف|مليون/.test(x))||text;
  let ns=(t.match(/\d+(?:\.\d+)?/g)||[]).map(Number);
  if(!ns.length) ns=[/مليونين ونصف/.test(t)?2.5e6:/مليونين/.test(t)?2e6:/مليون/.test(t)?1e6:/ألفين/.test(t)?2000:/ألف/.test(t)?1000:NaN].filter(isFinite);
  else { const mul=/مليون|ملايين/.test(t)?1e6:/ألف|آلاف/.test(t)?1e3:1; ns=ns.map(n=>n*mul); }
  return ns.length?[Math.min(...ns),Math.max(...ns)]:null; }
const distShort=t=>{ if(!t) return ""; const segs=t.split("،"); return segs.find(x=>/\d|ألف|مليون/.test(x))||segs[0]; };
function agoRange(lo,hi){ if(Math.round(lo)===Math.round(hi)) return agoText(lo);
  if(hi<10000) return `ما بين ${Math.round(lo)} و${yrs(Math.round(hi))}`;
  if(hi<1e6){ const k=Math.round(hi/1000); return `ما بين ${Math.round(lo/1000)} و${k} ${k>=3&&k<=10?"آلاف":"ألف"} سنة`; }
  return `ما بين ${+(lo/1e6).toFixed(1)} و${+(hi/1e6).toFixed(1)} مليون سنة`; }
function lightLine(name,text){
  const r=lyRange(text); if(!r) return ""; const Y=tzParts(st.t).y, [lo,hi]=r;
  const when=hi<Y-1?(()=>{ const a=Y-Math.round(hi), b=Y-Math.round(lo); return a===b?` نحو سنة <b>${a}م</b>`:` بين سنة <b>${a}م</b> وسنة <b>${b}م</b>`; })():"";
  return `الضوء الذي يصل عينك الليلة خرج من ${esc(name)}${when}${when?"، أي":""} قبل ${agoRange(lo,hi)}، فأنت ترى الماضي لا الحاضر.`;
}
function magWord(m){ return m<0?"من ألمع ما في السماء":m<1.5?"لامع جداً":m<3?"لامع":m<4.5?"متوسط اللمعان":m<6?"خافت، يحتاج سماء مظلمة":"لا يُرى بالعين"; }
function chips(sel,mag,dist,extra){ const v=selVec(sel), aa=v?altAz(v):null; let h=`<div class="ocChips">`;
  if(mag!=null) h+=`<span><i>اللمعان</i>${esc(magWord(mag))} (<bdi dir="ltr">${fmag(mag)}</bdi>)</span>`;
  if(dist) h+=`<span><i>البعد</i>${esc(dist)}</span>`;
  if(aa) h+=aa.alt>0?`<span class="up">فوق الأفق الآن</span>`:`<span class="down">تحت الأفق الآن</span>`;
  return h+(extra||"")+`</div>`; }
// أنسب وقت للرؤية واختصار «اعرضه مع كوكبته وحدها» في لمحة بطاقة النجم والجرم العميق (اقتراح زائر، #327)
// الشهر الذي يبلغ فيه الجرم أعلى ارتفاعه نحو التاسعة مساءً (bestMonth، الحساب نفسه للكوكبات)، ولا شيء لجرم لا يشرق من مكانك
function bestChip(sel){ const v=selVec(sel); if(!v) return ""; const rd=radec(v), r=riseSet(rd.ra,rd.dec);
  if(r.never) return ""; const m=bestMonth(rd.ra);
  return r.always?`<span class="best"><i>أنسب وقت للرؤية</i>طوال العام، وأعلى ما يكون في سهرات ${esc(m)}</span>`:`<span class="best"><i>أنسب وقت للرؤية</i>سهرات ${esc(m)}</span>`; }
function soloBtn(sel,conId){ if(!conId||!CONS[conId]||st.focus===conId) return ""; return `<button class="ocSolo" data-sel="${sel.type}:${sel.id}">اعرضه مع كوكبته وحدها</button>`; }
const sec=(k,title,html,open)=>html?`<details data-k="${k}"${open?" open":""}><summary>${title}</summary>${html}</details>`:"";
const photoHtml=ph=>ph?`<figure class="ocPh"><img loading="lazy" src="${ph.src}" alt="${esc(ph.alt)}"><figcaption>${esc(ph.credit)}</figcaption></figure>`:"";
function quranHtml(key){ const q=EXTRA.quran[key]; if(!q) return ""; return q.map(x=>`<div class="ocAyah">﴿${esc(x.text)}﴾</div><p class="ocRef">${esc(x.ref)}</p><p>${moreHref(x.href,"شرح «"+x.label+"» في الموسوعة")}</p>`).join(""); }
// يضم أساس الموقع إلى مسار يبدأ بـ «/» دون شرطتين: «//quran/...» يقرؤه المتصفح موقعاً اسمه quran (تقرير اختبار الأطلس، #441)
function siteHref(u){ const base=String((LINKS&&LINKS.home)||"").replace(/\/+$/,""); return /^[a-z]+:/i.test(u)?u:base+(u.charAt(0)==="/"?u:"/"+u); }
function moreHref(u,label){ return `<a class="more" href="${siteHref(u)}" target="_top">${label} ←</a>`; }
// زر «اعرضه مع كوكبته وحدها» و«كل التفاصيل» في صف واحد، فلا تطول لمحة البطاقة على الهاتف فتغطي السماء
function card(head,peek,more,act){ return `<button class="ocGrab" data-oc="toggle" aria-label="عرض التفاصيل أو إخفاؤها"></button>${head}${peek}<div class="ocActs">${act||""}<button class="ocMoreBtn" data-oc="full">كل التفاصيل</button></div><div class="ocMore">${more}</div>`; }
function starInfo(hip){
  const i=starIdx[hip], s=SKY.stars[i], n=NAMES[hip]||["","","",""], c=CUR[hip], conId=conOfStar(hip), con=CONS[conId], name=shortName(starTitle(hip));
  const latin=[n[1], n[2]&&con?n[2]+" "+con.gen:""].filter(Boolean).join(" · ");
  const head=`<div class="kind">${c?"نجم مشهور":"نجم"}${con?` في كوكبة ${esc(shortName(con.ar))}`:""}</div><h2>${esc(starTitle(hip))}</h2>${latin?`<div class="latin">${esc(latin)}</div>`:""}`;
  const dShort=c&&c.d?distShort(c.d):"";
  let peek=chips({type:"star",id:hip},s[2],dShort,hip===11767?"":bestChip({type:"star",id:hip}));
  const ll=c?lightLine(name,c.d):""; if(ll) peek+=`<div class="ocLight">${ll}</div>`;
  let more="";
  if(c&&c.r) more+=`<div class="pv"><canvas data-hip="${hip}" role="img" aria-label="مقارنة حجم ${esc(name)} بالشمس"></canvas></div>${c.b?`<p class="pvnote">في المعاينة يدور حوله ${esc(c.b[0])}.</p>`:""}${c.r>215?`<p class="pvnote">الخطوط المتقطعة داخل النجم مدارات الكواكب حول الشمس بالمقياس نفسه.</p>`:""}`;
  more+=`<div class="now">${nowBlock({type:"star",id:hip})}</div>`;
  more+=factsHtml([["القدر الظاهري (اللمعان)",fmag(s[2])+(s[2]<1.5?" — من ألمع النجوم":"")],["الكوكبة",conChip(conId)],
    c?["المسافة",esc(c.d),"wide"]:null, c&&c.r?["الحجم",esc(c.rt||("نحو "+(c.r<10?c.r:Math.round(c.r))+" ضعف قطر الشمس")),"wide"]:null, c?["النوع واللون",ltr(esc(c.s)),"wide"]:null]);
  if(c) more+=sec("about","عن النجم",`<p>${esc(c.t)}</p>`,true);
  if(c&&c.m) more+=sec("name","الاسم عند العرب",`<p>${esc(c.m)}</p>`,false);
  more+=sec("quran","في القرآن الكريم",quranHtml(String(hip)),true);
  const rts=routesTo(hip);
  if(c||rts.length) more+=sec("find","كيف تجده بعينك",(c?`<p>${esc(c.g)}</p>`:"")+(rts.length?`<div class="chips">${rts.map(r=>`<button class="chip" data-sel="route:${r.id}">${esc(r.ar)}</button>`).join("")}</div>`:""),false);
  const ms=SKY.mansions.filter(m=>m.p.some(p=>p[2]===hip)); if(ms.length) more+=sec("mansion","منزلة القمر",`<p>هذا النجم من نجوم منزلة ${ms.map(m=>`<button class="chip" data-sel="mansion:${m.n}">${esc(m.ar)}</button>`).join(" ")}.</p>`,false);
  more+=moreLink("star",hip,"صفحة النجم كاملة");
  if(!c) more+=`<p class="note">${n[0]?"الاسم العربي مأخوذ من بيانات مفتوحة ولم يُراجَع بعد. ":""}${moreLink("star",hip,"")?"":"صفحة هذا النجم التفصيلية لم تُكتب بعد."}</p>`;
  return card(head,peek,more,soloBtn({type:"star",id:hip},conId));
}
function conInfo(id){
  const c=CONS[id]; if(!c) return ""; const sym=id.slice(0,3);
  let h=`<div class="kind">كوكبة</div><h2>${esc(id==="Ser"?"الحية":c.ar)}</h2><div class="latin">${esc(id==="Ser"?"Serpens":c.la)} · ${esc(c.gen)}</div>`;
  if(st.focus!==id) h+=`<div class="act"><button class="primary" data-focus="${id}">عرضها وحدها مكبَّرة</button></div>`;
  else if(st.mode==="atlas"&&!st.focusSky) h+=`<div class="act"><button data-skyview="${id}">أين هي في سماء ${esc(placeName())} الآن؟</button></div>`;
  if(c.txt){ h+=`<p>${esc(c.txt[0])}</p>`; }
  h+=`<div class="now">${nowBlock({type:"con",id})}<br>أفضل شهر لرصدها في السهرة: <b>${bestMonth(c.c[0])}</b>.</div>`;
  const areaId=id; const cc=SKY.cons.find(x=>x.id===areaId);
  h+=factsHtml([["المساحة",cc&&cc.area?num(cc.area)+" درجة مربعة":""],["ترتيبها في المساحة",cc&&cc.ar_rank?`${cc.ar_rank} من 88`:""]]);
  if(c.txt){ if(c.txt[1]) h+=`<h3>كيف تجدها؟</h3><p style="margin-top:2px">${esc(c.txt[1])}</p>`; if(c.txt[2]) h+=`<h3>من التراث</h3><p style="margin-top:2px">${esc(c.txt[2])}</p>`; }
  const rf=routesFrom(sym); if(rf.length) h+=`<h3>انطلق منها إلى نجوم أخرى</h3><div class="chips">${rf.map(r=>`<button class="chip" data-sel="route:${r.id}">${esc(r.ar)}</button>`).join("")}</div>`;
  const fig=[...(FIG[sym]||[])].filter(x=>starIdx[x]!=null&&conOfStar(x)===sym).sort((p,q)=>SKY.stars[starIdx[p]][2]-SKY.stars[starIdx[q]][2]);
  if(fig.length) h+=`<h3>النجوم التي ترسم شكلها</h3><p style="margin:2px 0 4px;font-size:13.5px;color:var(--muted)">هذه النجوم تراها العين بسهولة حتى من المدينة. اضغط على أي منها لتعرف عنه أكثر.</p><div class="chips">${fig.map(x=>`<button class="chip" data-sel="star:${x}">${esc(starShort(x))}</button>`).join("")}</div>`;
  const top=c.top.filter(x=>starIdx[x]!=null&&!fig.includes(x));
  if(top.length) h+=`<h3>ألمع نجومها</h3><div class="chips">${top.map(x=>`<button class="chip" data-sel="star:${x}">${esc(starShort(x))}</button>`).join("")}</div>`;
  const ds=SKY.dsos.filter(d=>d.con===sym); if(ds.length) h+=`<h3>أجرام عميقة فيها</h3><div class="chips">${ds.map(d=>`<button class="chip" data-sel="dso:${d.id}">${esc(d.ar||d.id)}</button>`).join("")}</div>`;
  const ms=SKY.mansions.filter(m=>m.p.some(p=>{ const nn=NAMES[p[2]]; return nn&&nn[3]===sym; })); if(ms.length) h+=`<h3>منازل القمر فيها</h3><div class="chips">${ms.map(m=>`<button class="chip" data-sel="mansion:${m.n}">${esc(m.ar)}</button>`).join("")}</div>`;
  h+=moreLink("con",id,"صفحة الكوكبة كاملة");
  if(!c.txt&&!moreLink("con",id,"")) h+=`<p class="note">صفحة الكوكبة التفصيلية لم تُكتب بعد.</p>`;
  return h;
}
function dsoInfo(id){
  const d=SKY.dsos.find(x=>x.id===id), X=EXTRA.deep[id]||{}, eye=d.mag<=4.5?"يُرى بالعين المجردة في سماء مظلمة":d.mag<=7?"يحتاج إلى منظار":"يحتاج إلى تلسكوب", name=d.ar||("مسييه "+d.id.slice(1));
  const head=`<div class="kind">${esc(d.ta)}</div><h2>${esc(name)}</h2><div class="latin">${esc([d.id,d.ngc,d.en].filter(Boolean).join(" · "))}</div>`;
  let peek=chips({type:"dso",id},d.mag,distShort(X.dist),bestChip({type:"dso",id}));
  const ll=X.dist?lightLine(name,X.dist):""; if(ll) peek+=`<div class="ocLight">${ll}</div>`;
  let more=photoHtml(X.photo);
  more+=`<div class="now">${nowBlock({type:"dso",id})}</div>`;
  more+=factsHtml([["القدر الظاهري",fmag(d.mag)],["الرصد",eye],["الحجم الظاهري",d.dim?d.dim+" دقيقة قوسية":""],["الكوكبة",conChip(d.con)],X.dist?["المسافة",esc(X.dist),"wide"]:null]);
  { const ab=X.d||d.note||""; if(ab) more+=sec("about","عنه",`<p>${esc(ab)}</p>`,true); }
  if(X.see) more+=sec("see","ماذا ترى بالعين والمنظار",`<p>${esc(X.see)}</p>`,false);
  more+=sec("history","الاسم والتاريخ",(X.h?`<p>${esc(X.h)}</p>`:"")+(d.note&&X.d?`<p>${esc(d.note)}</p>`:"")+`<p>رقمه في فهرس مسييه ${esc(d.id)}${d.ngc?`، وفي الفهرس العام الجديد ${esc(d.ngc)}`:""}.</p>`,false);
  more+=sec("quran","في القرآن الكريم",quranHtml(id),true);
  const ms=SKY.mansions.filter(m=>m.p.some(p=>p[2]===id)); if(ms.length) more+=sec("mansion","منزلة القمر",`<p>هو منزلة ${ms.map(m=>`<button class="chip" data-sel="mansion:${m.n}">${esc(m.ar)}</button>`).join(" ")} من منازل القمر.</p>`,false);
  if(X.link) more+=moreHref(X.link,"اقرأ صفحته كاملة");
  return card(head,peek,more,soloBtn({type:"dso",id},d.con));
}
// اسم الطور من زاوية الطور، وهي القاعدة نفسها في src/lib/moon.js حتى يتفق الأطلس مع بقية الموقع
function moonPhaseName(){ const ang=A.MoonPhase(A.MakeTime(curTime())), f=bodies[1].frac, a=((ang%360)+360)%360;
  const n=a<6||a>354?"محاق":a<84?"هلال متزايد":a<96?"تربيع أول":a<174?"أحدب متزايد":a<186?"بدر":a<264?"أحدب متناقص":a<276?"تربيع أخير":"هلال متناقص";
  return {n,f,age:ang/360*29.53}; }
function nearestMansion(v){ let best=null,bd=9; for(const m of SKY.mansions){ const d=Math.acos(Math.max(-1,Math.min(1,dot(m.v,v)))); if(d<bd){bd=d;best=m;} } return best; }
// جرم قريب منه في السماء الآن (#352): المريخ والمشتري بينهما 1.2 درجة في 15 نوفمبر 2026، فتتلاصق نقطتاهما في المنظر الواسع.
// السطر يقول إنهما اثنان، وكم بينهما بعرض البدر (نحو نصف درجة)، وإن القرب ظاهري فقط
function closeBodies(b){ if(b.id==="sun") return ""; const out=[];
  for(const o of bodies){ if(o===b||o.id==="sun") continue; const d=Math.acos(Math.max(-1,Math.min(1,dot(o.v,b.v))))*R2D; if(d<4) out.push([o,d]); }
  if(!out.length) return ""; out.sort((x,y)=>x[1]-y[1]); const [o,d]=out[0], k=Math.round(d/0.52);
  const fb=b.id==="venus"; // الزهرة مؤنثة
  const far=o.dist&&b.dist?Math.abs(o.dist-b.dist)*149.6:0, farTxt=o.id==="moon"||b.id==="moon"?"":`، ف${o.dist>b.dist?esc(o.ar)+(fb?" أبعد منها":" أبعد منه"):(fb?"هي أبعد من ":"هو أبعد من ")+esc(o.ar)} بنحو ${num(Math.round(far))} مليون كم`;
  return `<div class="ocLight">${fb?"تبدو الآن قريبة":"يبدو الآن قريباً"} من <button class="chip" data-sel="body:${o.id}">${esc(o.ar)}</button>، وبينهما في السماء نحو <b>${d.toFixed(1)} درجة</b>${k>=1?`، أي ${k===1?"عرض البدر تقريباً":k===2?"ضعفا عرض البدر":k+" أضعاف عرض البدر"}`:""}، وهو قرب في اتجاه النظر فقط${farTxt}.</div>`; }
function bodyInfo(id){
  const b=bodies.find(x=>x.id===id); if(!b) return ""; const conSym=A.Constellation(b.ra/15,b.dec).symbol, X=EXTRA.bodies[id]||{};
  const head=`<div class="kind">${id==="sun"?"نجم":id==="moon"?"تابع الأرض":"كوكب"}</div><h2>${b.ar}</h2>`;
  const km=b.dist*149597870.7, sec_=b.dist*499.005;
  const dShort=id==="moon"?num(km)+" كم":num(km/1e6)+" مليون كم";
  let peek=chips({type:"body",id},b.mag,dShort);
  // زمن الضوء من البعد المحسوب الآن (499 ثانية لكل وحدة فلكية)
  const tt=sec_<60?`${sec_.toFixed(1)} ثانية`:(()=>{ const m=Math.round(sec_/60); return m<60?`${m} ${m>=3&&m<=10?"دقائق":"دقيقة"}`:`${Math.floor(m/60)} ساعة و${m%60} دقيقة`; })();
  peek+=`<div class="ocLight">${id==="sun"?`الضوء الذي تراه الآن خرج من الشمس قبل نحو <b>${tt}</b>.`:`ضوء ${id==="moon"?"القمر":esc(b.ar)} الذي تراه هو ضوء الشمس منعكساً ${id==="venus"?"عنها":"عنه"}، ويصل إلى عينك بعد <b>${tt}</b> من انعكاسه.`}</div>`;
  peek+=closeBodies(b);
  if(id==="sun"||id==="moon") peek+=eclLine();
  let more=photoHtml(X.photo);
  more+=`<div class="now">${nowBlock({type:"body",id},b.b)}</div>`;
  const rows=[];
  if(b.mag!=null) rows.push(["القدر الظاهري",fmag(b.mag)]);
  rows.push(["البعد عن الأرض",id==="moon"?num(km)+" كم":b.dist.toFixed(2)+" وحدة فلكية ("+num(km/1e6)+" مليون كم)"]);
  rows.push(["يقع الآن أمام كوكبة",conChip(conSym)]);
  if(id==="moon"){ const ph=moonPhaseName(); rows.unshift(["الطور",ph.n+` (${Math.round(ph.f*100)}% مضاء)`]); rows.push(["عمر القمر",ph.age.toFixed(1)+" يوماً منذ المحاق"]); }
  else if(b.frac!=null&&(id==="venus"||id==="mercury")) rows.push(["الجزء المضاء",Math.round(b.frac*100)+"%"]);
  more+=factsHtml(rows)+sec("about","عنه",`<p>${esc(b.t)}</p>`,true);
  const fz=PL_DISC[id]?planetFitFov(id):null, zb=fz&&st.fov>fz*1.6?`<button class="ocSolo" data-zoompl="${id}">قرّب إلى ${esc(b.ar)}</button>`:"";
  if(id==="moon"){ const m=nearestMansion(b.v); more+=sec("mansion","المنزلة",`<p>القمر الآن قريب من منزلة <button class="chip" data-sel="mansion:${m.n}">${esc(m.ar)}</button>، المنزلة رقم ${m.n} من 28.</p>`,true); }
  return card(head,peek,more,zb);
}
function mansionInfo(n){
  const m=SKY.mansions[n-1];
  let h=`<div class="kind">منزلة القمر رقم ${n} من 28</div><h2>${esc(m.ar)}</h2><div class="now">${nowBlock({type:"mansion",id:n})}</div>`;
  if(m.empty) h+=`<p>منطقة من السماء تكاد تخلو من النجوم اللامعة، تقع شرق النعائم. سمّاها العرب البلدة، وشبّهوها بالفرجة الخالية.</p>`;
  else h+=`<h3>نجومها</h3><div class="chips">${m.p.map(p=>typeof p[2]==="string"?`<button class="chip" data-sel="dso:${p[2]}">${esc(SKY.dsos.find(d=>d.id===p[2]).ar)}</button>`:`<button class="chip" data-sel="star:${p[2]}">${esc(starShort(p[2]))}</button>`).join("")}</div>`;
  h+=`<h3>منازل القمر</h3><p style="margin-top:2px">قسم العرب طريق القمر بين النجوم إلى 28 منزلة، ينزل القمر كل ليلة في واحدة منها تقريباً. وربطوا طلوع المنازل وسقوطها عند الفجر بالمواسم والمطر، وهو ما يعرف بالأنواء.</p>`;
  h+=`<div class="chips"><button class="chip" data-sel="mansion:${n===1?28:n-1}">السابقة: ${esc(SKY.mansions[(n+26)%28].ar)}</button><button class="chip" data-sel="mansion:${n%28+1}">التالية: ${esc(SKY.mansions[n%28].ar)}</button></div>`;
  h+=moreLink("mansion",n,"صفحة المنزلة: معناها وما قالته العرب");
  h+=`<p class="note">النجوم وفق التعريف الشائع في كتب الأنواء، وتختلف المصادر في تحديد نجوم بعض المنازل.</p>`;
  return h;
}
const MONTHS_SHORT=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
function fists(d){ const f=d/10; if(f<0.8) return `نحو ${Math.max(1,Math.round(d))} درجات، أقل من قبضة`; const r=Math.round(f*2)/2; return `نحو ${r===1?"قبضة واحدة":r===2?"قبضتين":r===1.5?"قبضة ونصف":r===2.5?"قبضتين ونصف":(r%1?Math.floor(r)+" قبضات ونصف":r+" قبضات")} (${Math.round(d)} درجة)`; }
function monthsText(ms){ if(!ms||!ms.length) return ""; if(ms.length===12) return "طوال السنة"; return ms.map(m=>MONTHS_SHORT[m-1]).join("، "); }
function routeInfo(id){
  const r=ROUTES[id]; if(!M) computeSky();
  const all=routeAll(r), up=all.every(v=>altAz(v).alt>5);
  let h=`<div class="kind">${esc(r.q)}</div><h2>${esc(r.ar)}</h2>`;
  h+=`<ol style="margin:10px 0;padding-inline-start:20px;font-size:15px;line-height:1.85">${r.steps.map(t=>`<li>${esc(t)}</li>`).join("")}</ol>`;
  if(r.tip) h+=`<p style="font-size:14px;color:var(--muted)">${esc(r.tip)}</p>`;
  h+=`<div class="now">${up?`<b>الطريق كله فوق أفقك الآن</b>، فيمكنك تجربته بعينك.`:`<b>الطريق ليس كله فوق الأفق الآن</b> في سماء ${placeName()}، لذلك نعرضه على الأطلس.`}${(()=>{ const ms=routeMonths(r); return ms.length?`<br>يظهر كله قرابة التاسعة مساءً من ${placeName()} في: ${monthsText(ms)}.`:`<br>لا يظهر كله معاً فوق أفق ${placeName()} في السهرة. جرّبه من مكان أبعد جنوباً.`; })()}</div>`;
  h+=`<p style="font-size:13.5px;color:var(--muted)">القبضة: مدّ ذراعك كاملة واقبض يدك، فعرضها يغطي نحو 10 درجات من السماء.</p>`;
  h+=moreLink("route",id,"الدرس كاملاً بالصور");
  return h;
}
function routeMonths(r){ const y=tzParts(st.t).y, out=[];
  for(let m=1;m<=12;m++){ const t=zonedToUtc(y,m,15,21,0); const lst=((A.SiderealTime(new Date(t))+st.lon/15)%24+24)%24, la=st.lat*D2R;
    const ok=r.path.filter(Boolean).every(n=>{ const ha=(lst*15-n[0])*D2R, d=n[1]*D2R; return Math.asin(Math.sin(la)*Math.sin(d)+Math.cos(la)*Math.cos(d)*Math.cos(ha))*R2D>=10; });
    if(ok) out.push(m); } return out; }
function routesTo(hip){ return Object.values(ROUTES).filter(r=>r.refs[r.refs.length-1]===hip||(r.closed&&r.refs.includes(hip))); }
function routesFrom(sym){ return Object.values(ROUTES).filter(r=>{ const f=r.shapeRefs.length?r.shapeRefs[0]:r.refs[0]; return typeof f==="number"&&conOfStar(f)===sym; }); }
function metInfo(id){
  const m=METBY[id], con=CONS[m.con], pk=metPeak(m), act=metActive(m), cn=con?shortName(con.ar):"";
  const per=`من ${m.a[1]} ${MONTHS_SHORT[m.a[0]-1]} إلى ${m.b[1]} ${MONTHS_SHORT[m.b[0]-1]}`;
  let h=`<div class="kind">مشع زخة شهب${cn?` في كوكبة ${esc(cn)}`:""}</div><h2>مشع ${esc(m.ar)}</h2>`;
  h+=`<p>تبدو شهب ${esc(m.ar)} كأنها تخرج من هذه النقطة، لكنها تظهر في كل اتجاه من السماء وليس عند المشع وحده، وكلما ارتفع المشع ظهرت شهب أكثر.</p>`;
  h+=`<p>${act?`<b>الزخة نشطة الآن</b>، ونشاطها ${per}`:`<b>الزخة ليست نشطة في هذا التاريخ</b>، فنشاطها ${per}`}${pk?`، وذروتها يوم ${esc(fDay(pk))} قرابة الساعة ${fTime(pk)} بتوقيت ${esc(placeName())}`:""}.</p>`;
  h+=`<p>والمعدل المثالي في ذروتها ${esc(m.zhr)}، وهو عدد الشهب في ساعة لو كانت السماء مظلمة تماماً والمشع فوق رأسك، فيقل كثيراً في سماء المدينة وحين يكون المشع منخفضاً، وسرعة شهبها ${Math.round(m.v)} كم في الثانية${m.parent?`، وهي غبار تركه ${esc(m.parent)}`:""}.</p>`;
  h+=`<p style="color:var(--muted);font-size:13px">رسمنا المشع في موضعه ليلة الذروة، وهو ينتقل قليلاً بين النجوم من ليلة إلى ليلة.</p>`;
  h+=`<div class="now">${nowBlock({type:"met",id})}</div>`;
  if(!EMBED) h+=moreHref("/meteor-showers/"+m.slug+"/","ليلة الذروة وأفضل ساعات الرصد في مدينتك");
  return h;
}
function astInfo(id){
  const a=ASTS[id];
  let h=`<div class="kind">شكل نجمي للاهتداء، وليس كوكبة رسمية</div><h2>${esc(a.ar)}</h2><p>${esc(a.t)}</p>`;
  h+=`<h3>نجومه</h3><div class="chips">${a.stars.map(x=>`<button class="chip" data-sel="star:${x}">${esc(starShort(x))}</button>`).join("")}</div>`;
  h+=`<h3>كيف تجده؟</h3><p style="margin-top:2px">${esc(a.g)}</p>`;
  h+=`<div class="now">${nowBlock({type:"ast",id})}</div>`;
  return h;
}

// ================================================================ التنقل
function viewOf(v){ const R=st.mode==="atlas"?ATLAS:M; const e=dot(R[0],v),n=dot(R[1],v),u=dot(R[2],v); return {az:(Math.atan2(e,n)*R2D+360)%360,alt:Math.asin(Math.max(-1,Math.min(1,u)))*R2D}; }
function fitFov(center,vs){ let m=0; for(const v of vs){ m=Math.max(m,Math.acos(Math.max(-1,Math.min(1,dot(center,v))))); } return Math.max(22,Math.min(130,m*R2D*2*1.22+8)); }
function animateTo(v,fov){
  const t=viewOf(v); animateView({az:t.az,alt:Math.max(st.mode==="atlas"?-89:st.layers.below?-85:-20,Math.min(st.mode==="atlas"?89:85,t.alt)),fov:fov||st.fov});
}
function animateView(tgt){
  tgt.fov=Math.max(fovLo(),Math.min(fovHi(),tgt.fov));
  // التكبير يتحرك بنسبة ثابتة في كل لحظة (لوغاريتمياً)، فلا يبطئ في المجال الواسع ثم يقفز في آخره حين يكون الفرق كبيراً (60 درجة إلى حلقات زحل)
  const daz=((tgt.az-st.az+540)%360)-180, from={az:st.az,alt:st.alt,fov:st.fov}, t0=performance.now(), big=Math.abs(Math.log(tgt.fov/from.fov))>3, dur=matchMedia("(prefers-reduced-motion: reduce)").matches?1:big?1200:800;
  st.anim=now=>{ let k=Math.min(1,(now-t0)/dur); k=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2; st.az=(from.az+daz*k+360)%360; st.alt=from.alt+(tgt.alt-from.alt)*k; st.fov=from.fov*Math.pow(tgt.fov/from.fov,k); dirty=true;
    if(k>=1){ st.anim=null; if(st.fov>=3) st.trackId=null; else if(!st.trackId){ const id=planetNear(); if(id) st.trackId=id; } } };
}
function conVectors(id){ const vs=[]; if(st.detail!=="full") (POINTERS[id]||[]).forEach(g=>g.p.forEach(h=>{ const v=starV(h); if(v) vs.push(v); })); ((st.detail==="full"?LINEV:SIMPLEV)[id]||LINEV[id]||[]).forEach(s=>s.forEach(v=>vs.push(v))); if(!vs.length) (BOUNDV[id]||[]).forEach(r=>r.forEach(v=>vs.push(v))); return vs; }
// كلمة بحث بقيت في الشريط بلا نتيجة تُمسح عند تبديل الوضع أو المكان (#441)
function clearSearch(){ const q=document.getElementById("q"), r=document.getElementById("results"); if(q&&document.activeElement!==q){ q.value=""; if(r) r.hidden=true; } }
function setMode(m,quiet){ if(st.mode===m) return; clearSearch(); if(AR.on&&m==="atlas") arStop(false); const keep=st.sel?selVec(st.sel):null; const center=cameraCenter(); st.mode=m; computeSky(); camera();
  const t=viewOf(keep||center); st.az=t.az; st.alt=Math.max(m==="atlas"?-89:-25,Math.min(89.5,t.alt)); syncModeBtns(); hudKey="";
  if(!quiet){ savePrefs(); if(m==="atlas"&&!st.seen.atlas){ st.seen.atlas=1; savePrefs(); toast("الأطلس الكامل: كل نجوم السماء، والشمال السماوي إلى أعلى. الجزء المظلل تحت أفقك الآن."); } }
  dirty=true; }
function cameraCenter(){ camera(); const f=H[2]; return [0,1,2].map(j=>MR[0][j]*f[0]+MR[1][j]*f[1]+MR[2][j]*f[2]); }
// اختيار الوضع من الأزرار: «كأنك هناك» هو سماء مكاني نفسها بعين الإنسان (st.eye)، فتبقى كل أدواتها
function pickMode(m){ const eye=m==="eye", was=EYE(); if(eye) m="sky"; NAV.atlas=m==="atlas"&&(st.mode==="atlas"?NAV.atlas:true);
  if(m==="sky"&&(st.focus||st.ast||st.route)){ st.prevMode="sky"; exitFocus(); }
  // الأطلس الكامل له إسقاطه الخاص، ويبقى اختيار 3D محفوظاً فيعود حين ترجع إلى سماء مكاني
  // وتعود فيه الخطوط والأسماء كما اخترتها (أطفأها 3D وحده)، ثم تُخفى من جديد إن رجعت إلى 3D
  if(m!=="sky"){ if(was&&st.eyeL){ const L=st.eyeL; st.eyeL=null; Object.keys(L).forEach(k=>setLayer(k,L[k])); } setMode(m); savePrefs(); syncModeBtns(); return; }
  if(st.mode!=="sky") setMode("sky",true);
  if(eye!==was){ cv.style.transition="none"; cv.style.opacity="0.15"; requestAnimationFrame(()=>requestAnimationFrame(()=>{ cv.style.transition="opacity .32s ease-out"; cv.style.opacity="1"; })); }
  st.eye=eye; savePrefs(); syncModeBtns(); hudKey=""; dirty=true; setTimeout(cloudNote,300);
  // 3D يبدأ كما تراه العين: بلا خطوط كوكبات ولا أسماء (تظهر من «الطبقات» أو بالإشارة إلى النجم)، ثم تعود اختياراتك حين تغلقه
  if(eye&&!was&&!st.eyeL){ st.eyeL={lines:!!st.layers.lines,conNames:!!st.layers.conNames,starNames:!!st.layers.starNames}; ["lines","conNames","starNames"].forEach(k=>setLayer(k,false)); savePrefs(); }
  if(!eye&&was&&st.eyeL){ const L=st.eyeL; st.eyeL=null; Object.keys(L).forEach(k=>setLayer(k,L[k])); savePrefs(); }
  // الدخول يحفظ الارتفاع والتكبير، والخروج يعيدهما كما كانا. ومع متابعة الهاتف يبقى الهاتف هو من يوجّه السماء ويكبّرها
  if(eye&&!was){ panoLoad(); st.anim=null; NAV.eye=true; if(!AR.on){ st.eyePrev={alt:st.alt,fov:st.fov}; const kv=st.sel&&selVec(st.sel), kt=kv?viewOf(kv):null; st.trackId=null;
      animateView(kt&&kt.alt>-2?{az:kt.az,alt:Math.max(5,Math.min(80,kt.alt)),fov:COARSE?70:60}:{az:viewDir().az,alt:COARSE?32:Math.max(5,Math.min(35,viewDir().alt)),fov:COARSE?70:60}); }
    toast(AR.on?`منظر ثلاثي الأبعاد: حولك جبال ${placeName()} الحقيقية، فوجّه هاتفك نحوها، وزر 3D يغلقه.`:`منظر ثلاثي الأبعاد: كأنك واقف في ${placeName()} وحولك جبالها الحقيقية. اسحب لتدير رأسك، وأشر إلى نجم لتعرف اسمه، والخطوط والأسماء من «الطبقات».`); }
  else if(!eye&&was){ st.anim=null; NAV.eye=false; const P=st.eyePrev; st.eyePrev=null;
    if(!AR.on) animateView({az:st.az,alt:P?P.alt:Math.min(89.5,st.alt),fov:P?P.fov:Math.max(st.fov,COARSE?60:100)});
    toast("خرجت من منظر 3D، وعادت السماء والخطوط والأسماء كما كانت."); } }
// زر 3D على اليسار: يشغّل المنظر ثلاثي الأبعاد ويغلقه (ويعود إلى سماء مكاني من الأطلس الكامل)
document.getElementById("b3d").onclick=()=>{ pickMode(EYE()?"sky":"eye"); };
// زر «الأطلس» (الهاتف): يفتح الأطلس الكامل، والضغطة الثانية تعيدك إلى سماء مكاني كما تركتها (بـ 3D إن كان مفتوحاً)
// إخفاء الشريط السفلي وإظهاره (#455)
function setDock(off){ document.body.classList.toggle("dockOff",!!off); const t=document.getElementById("dockTog"); t.setAttribute("aria-expanded",String(!off)); t.title=off?"أظهر الشريط السفلي":"أخفِ الشريط السفلي"; t.setAttribute("aria-label",t.title);
  try{ if(off) localStorage.setItem("atlas-dock","off"); else localStorage.removeItem("atlas-dock"); }catch(e){} if(off) closeSheets(); layout(); dirty=true; }
document.getElementById("dockTog").onclick=()=>setDock(!document.body.classList.contains("dockOff"));
try{ if(!EMBED&&localStorage.getItem("atlas-dock")==="off") document.body.classList.add("dockOff"); }catch(e){}
{ const t=document.getElementById("dockTog"), off=document.body.classList.contains("dockOff"); t.setAttribute("aria-expanded",String(!off)); t.title=off?"أظهر الشريط السفلي":"أخفِ الشريط السفلي"; t.setAttribute("aria-label",t.title); }
document.getElementById("bAtlas").onclick=()=>{ if(st.mode==="atlas") pickMode(st.eye?"eye":"sky"); else pickMode("atlas"); };
function syncModeBtns(){ if(typeof syncFlip==="function") syncFlip(); const ba=document.getElementById("bAtlas"); if(ba) ba.setAttribute("aria-pressed",String(st.mode==="atlas")); const b3=document.getElementById("b3d"); if(b3){ b3.setAttribute("aria-pressed",String(EYE())); b3.title=EYE()?"إغلاق المنظر ثلاثي الأبعاد":"منظر ثلاثي الأبعاد: كأنك واقف في المكان والسماء حولك"; } try{ syncLp(); }catch(e){} document.querySelectorAll("button[data-mode]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.mode===st.mode)); if(typeof syncLayerVis==="function") syncLayerVis(); }

function enterFocus(id,opts){
  opts=opts||{}; const c=CONS[id]; if(!c) return;
  if(!st.focus){ st.prevMode=st.mode; st.prevView={az:st.az,alt:st.alt,fov:st.fov}; }
  // من سماء مكاني نبقى فيها: يُبرز النجم وكوكبته حيث هما في سماء المكان الآن، ولا ننتقل إلى الأطلس الكامل
  const inSky=!!opts.sky&&st.mode==="sky";
  st.focus=id; st.ast=null; st.route=null; st.focusSky=inSky;
  if(!inSky) setMode("atlas",true);
  else { const v=opts.center||c.v; if(altAz(v).alt<-1&&!st.layers.below){ tmpBelow(); toast(opts.sel&&opts.sel.type!=="con"?"هذا الجرم تحت الأفق الآن، فأظهرنا ما تحت الأفق.":"الكوكبة تحت الأفق الآن، فأظهرنا ما تحت الأفق."); } }
  const vs=conVectors(id); let ctr=nrm(vs.reduce((a,v)=>[a[0]+v[0],a[1]+v[1],a[2]+v[2]],[0,0,0])); if(!vs.length) ctr=c.v;
  const sel=opts.sel||{type:"con",id};
  st.sel=sel; showInfo(sel); updateFocusBar(); updateViewport(true);
  animateTo(opts.center||ctr, fitFov(ctr,vs));
  markPills(); dirty=true;
}
function exitFocus(){
  if(!st.focus&&!st.ast&&!st.route) return; const was=st.focus;
  st.focus=null; st.ast=null; st.route=null; st.tour=-1; document.getElementById("btnTour").setAttribute("aria-pressed","false");
  if(st.prevMode!==st.mode) setMode(st.prevMode,true);
  if(st.prevView){ const pv0=st.prevView; st.az=pv0.az; st.alt=pv0.alt; st.fov=pv0.fov; st.prevView=null; }
  st.sel=was?{type:"con",id:was}:st.sel; showInfo(null); st.sel=null;
  updateFocusBar(); markPills(); dirty=true;
}
function showRoute(id){
  const r=ROUTES[id]; if(!r) return; if(!st.focus&&!st.ast&&!st.route){ st.prevMode=st.mode; st.prevView={az:st.az,alt:st.alt,fov:st.fov}; }
  st.focus=null; st.ast=null; st.route=id;
  if(!M) computeSky();
  const up=routeAll(r).every(v=>altAz(v).alt>3);
  if(st.mode==="sky"&&!up) setMode("atlas",true);
  st.sel={type:"route",id}; showInfo(st.sel); updateFocusBar(); updateViewport(true);
  const all=routeAll(r), ctr=nrm(all.reduce((a,v)=>[a[0]+v[0],a[1]+v[1],a[2]+v[2]],[0,0,0]));
  animateTo(ctr, Math.min(140,fitFov(ctr,all)*1.05)); markPills(); dirty=true;
}
function northRoute(){ if(!M) computeSky(); const d=ROUTES["polaris-dipper"]; return routeAll(d).every(v=>altAz(v).alt>8)?"polaris-dipper":"polaris-cassiopeia"; }
function showAst(id){
  const a=ASTS[id]; if(!st.focus&&!st.ast&&!st.route){ st.prevMode=st.mode; st.prevView={az:st.az,alt:st.alt,fov:st.fov}; }
  st.focus=null; st.route=null; st.ast=id; setMode("atlas",true); st.sel={type:"ast",id}; showInfo(st.sel); updateFocusBar(); updateViewport(true);
  animateTo(a.v, fitFov(a.v,a.pv)); markPills(); dirty=true;
}
// مواضع العناصر العائمة تُحسب من ارتفاع الأشرطة الظاهرة فعلاً (يختلف بين الحاسوب والهاتف ووضع السماء فقط)
function layout(){
  measureBars(); const bs=document.body.style, fb=document.getElementById("focusBar");
  bs.setProperty("--top-h",barTop+"px"); bs.setProperty("--bot-h",barBot+"px");
  fb.style.top=(barTop?barTop+4:10)+"px";
  const fbB=fb.hidden?0:fb.getBoundingClientRect().bottom;
  bs.setProperty("--hud-top",(Math.max(barTop,fbB)+8)+"px");
  // شريط «الكوكبة وحدها» في الوسط: إذا بلغ عرضُه البطاقةَ الجانبية (شاشة متوسطة) نزلت البطاقة تحته، فلا يغطي أزرارها
  { const fr=fb.hidden?null:fb.getBoundingClientRect(), side=W>720, hit=side&&fr&&fr.right>W-12-360-8; bs.setProperty("--info-top",((hit?fbB:barTop)+8)+"px"); }
  if(AR.on){ const t=document.getElementById("arTop").getBoundingClientRect(), b=document.getElementById("arBar").getBoundingClientRect(); bs.setProperty("--top-h",Math.round(t.bottom)+"px"); bs.setProperty("--bot-h",Math.round(Math.max(0,Ht-b.top))+"px"); }
}
const placeBars=layout;
function updateFocusBar(){
  const fb=document.getElementById("focusBar"), tour=st.tour>=0;
  const title= st.focus? "كوكبة "+shortName(CONS[st.focus].ar) : st.ast? ASTS[st.ast].ar : st.route? ROUTES[st.route].ar : "";
  fb.hidden=!(st.focus||st.ast||st.route||tour);
  document.getElementById("fbTitle").textContent= tour? TOUR[st.tour][2] : (st.focus? title+" وحدها" : title);
  const step=document.getElementById("fbStep"); step.hidden=!tour; step.textContent= tour? `المحطة ${st.tour+1} من ${TOUR.length}`:"";
  document.getElementById("fbDetail").hidden=!st.focus; document.querySelectorAll("#fbDetail [data-detail]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.detail===st.detail));
  document.getElementById("fbPrev").hidden=!tour; document.getElementById("fbNext").hidden=!tour;
  document.getElementById("fbNext").textContent= tour&&st.tour===TOUR.length-1? "إنهاء الجولة":"التالية";
  document.getElementById("fbExit").innerHTML= tour? "إيقاف" : (W<=720? "✕" : "العودة إلى السماء");
  layout();
}

// اختيار من البحث أو الاختصارات أو الروابط داخل البطاقة
function go(sel){
  closeSheets();
  if(sel.type==="con"){ enterFocus(sel.id,{sky:true}); if(st.focusSky) animateTo(CONS[sel.id].v,Math.max(70,Math.min(110,fitFov(CONS[sel.id].v,conVectors(sel.id))))); return; }
  if(sel.type==="ast"){ showAst(sel.id); return; }
  if(sel.type==="route"){ showRoute(sel.id); return; }
  if(sel.type==="north"){ showRoute(northRoute()); return; }
  if(sel.type==="star"){ const cid=conOfStar(sel.id); if(cid&&CONS[cid]){ const vs=conVectors(cid); const ctr=starV(sel.id); enterFocus(cid,{sel,center:ctr,sky:true}); const f=fitFov(ctr,vs); animateTo(ctr,Math.min(f,90)); return; } }
  if(sel.type==="dso"){ const d=SKY.dsos.find(x=>x.id===sel.id); if(d&&CONS[d.con]){ enterFocus(d.con,{sel,center:d.v,sky:true}); animateTo(d.v,Math.min(fitFov(d.v,conVectors(d.con)),70)); return; } }
  // كوكب أو قمر أو منزلة: بلا تركيز
  if(st.focus||st.ast||st.route){ st.focus=null; st.ast=null; st.route=null; updateFocusBar(); }
  // الشمس أو القمر في لحظة كسوف (رابط «شاهده في الأطلس» من صفحات الكسوف، #441): يقترب إلى الكسوف مباشرة
  if(sel.type==="body"&&(sel.id==="sun"||sel.id==="moon")&&eclNow()){ st.sel=null; eclZoom(); updateViewport(true); markPills(); dirty=true; return; }
  st.sel=sel; showInfo(sel); updateViewport(true);
  const v=selVec(sel); if(v){ if(st.mode==="sky"&&altAz(v).alt<-1&&!st.layers.below){ tmpBelow(); toast("هذا الجرم تحت الأفق الآن، فأظهرنا ما تحت الأفق."); } animateTo(v,sel.type==="mansion"?(SKY.mansions[sel.id-1].p.length>3?50:38):Math.min(st.fov,70)); }
  markPills(); dirty=true;
}
// ضغطة على الخريطة
function pickTap(sel){
  if(sel.type==="star"&&st.focus){ const cid=conOfStar(sel.id); if(cid&&cid!==st.focus){ st.focus=cid; updateFocusBar(); markPills(); } }
  st.sel=sel; showInfo(sel); dirty=true;
}

// ================================================================ الجولة
function tourGo(i){ st.tour=i; document.getElementById("btnTour").setAttribute("aria-pressed","true"); const s=TOUR[i]; go({type:s[0],id:s[1]}); st.tour=i; updateFocusBar(); }
document.getElementById("btnTour").onclick=()=>{ closeSheets(); if(st.tour>=0){ exitFocus(); return; } tourGo(0); };
document.getElementById("fbNext").onclick=()=>{ if(st.tour>=TOUR.length-1){ exitFocus(); return; } tourGo(st.tour+1); };
document.getElementById("fbPrev").onclick=()=>tourGo((st.tour-1+TOUR.length)%TOUR.length);
document.getElementById("fbExit").onclick=exitFocus;
document.getElementById("fbDetail").addEventListener("click",e=>{ const b=e.target.closest("[data-detail]"); if(!b||!st.focus) return; st.detail=b.dataset.detail; savePrefs(); updateFocusBar();
  const vs=conVectors(st.focus), ctr=nrm(vs.reduce((a,v)=>[a[0]+v[0],a[1]+v[1],a[2]+v[2]],[0,0,0])); animateTo(ctr,fitFov(ctr,vs)); if(st.sel&&st.sel.type==="con") showInfo(st.sel); dirty=true; });

// ================================================================ التفاعل باللمس والفأرة
let ptrs=new Map(),dragStart=null,moved=false,pinch0=null;
// على الهاتف: السحب يستمر قليلاً بعد رفع الإصبع ثم يتباطأ (قصور واحتكاك)، والتكبير بإصبعين كذلك، والنقر المزدوج يقرّب ويضع الجرم في الوسط
const VS=[]; let pinchRate=0, pinchT=0, lastTap={t:0,x:0,y:0};
function glide(vx,vy,vf){ const sp=Math.hypot(vx,vy); if(sp>1.4){ vx*=1.4/sp; vy*=1.4/sp; } vf=Math.max(-0.003,Math.min(0.003,vf||0)); let last=performance.now(); st.anim=now=>{ const dt=Math.min(50,now-last); last=now; const k=Math.exp(-dt/200);
  if(vx||vy){ panLinear(vx*dt,vy*dt); vx*=k; vy*=k; if(Math.hypot(vx,vy)<0.01) vx=vy=0; }
  if(vf){ setFov(st.fov*Math.exp(vf*dt)); vf*=Math.exp(-dt/140); if(Math.abs(vf)<2e-5||st.fov<=fovLo()||st.fov>=fovHi()) vf=0; }
  if(!vx&&!vy&&!vf) st.anim=null; dirty=true; }; }
cv.addEventListener("pointerdown",e=>{ if(e.pointerType==="mouse"&&e.button!==0) return; cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId,[e.clientX,e.clientY]); moved=false; st.anim=null; VS.length=0; document.getElementById("results").hidden=true;
  clearTimeout(LP.t); LP.fired=false;
  if(ptrs.size===1){ dragStart=[e.clientX,e.clientY]; dragAxis=null; axSum=[0,0]; if(e.pointerType!=="mouse"){ const x=e.clientX,y=e.clientY; LP.t=setTimeout(()=>{ if(!moved&&ptrs.size===1){ LP.fired=true; openLp(x,y); } },520); } } if(ptrs.size===2){ const p=[...ptrs.values()]; pinch0={d:Math.hypot(p[0][0]-p[1][0],p[0][1]-p[1][1]),fov:st.fov,fl:st.fov}; pinchT=0; pinchRate=0; } cv.classList.add("dragging"); });
// السحب يمسك السماء نفسها: النجم الذي تحت الإصبع يبقى تحته، وفي الإصبعين نكبّر حول منتصفهما ونحرك معاً
cv.addEventListener("pointerleave",()=>{ if(HOV){ HOV=null; cv.style.cursor=""; dirty=true; } });
cv.addEventListener("pointermove",e=>{ if(e.pointerType==="mouse"&&!ptrs.size){ let best=null,bd=1e9; for(const h of hits){ if(h.type!=="star"&&h.type!=="body"&&h.type!=="dso") continue; const d=Math.hypot(h.x-e.clientX,h.y-e.clientY); if(d<Math.max(9,h.r+2)&&d+h.pr*2<bd){ bd=d+h.pr*2; best=h; } }
    if(best&&behindTerrain(best.x,best.y)) best=null; const k=best?best.type+":"+best.id:"", k0=HOV?HOV.type+":"+HOV.id:""; if(k!==k0){ HOV=best?{type:best.type,id:best.id}:null; cv.style.cursor=best?"pointer":""; dirty=true; } }
  if(!ptrs.has(e.pointerId)) return; const prev=ptrs.get(e.pointerId), cur=[e.clientX,e.clientY];
  if(LP.t&&(ptrs.size>1||Math.hypot(cur[0]-dragStart[0],cur[1]-dragStart[1])>8)){ clearTimeout(LP.t); LP.t=0; }
  if(ptrs.size===2&&pinch0){ const other=[...ptrs.entries()].find(([id])=>id!==e.pointerId)[1];
    const m0=[(prev[0]+other[0])/2,(prev[1]+other[1])/2], m1=[(cur[0]+other[0])/2,(cur[1]+other[1])/2];
    ptrs.set(e.pointerId,cur); const f=pinch0.fov*pinch0.d/Math.max(10,Math.hypot(cur[0]-other[0],cur[1]-other[1]));
    { const tn=performance.now(), dt=tn-pinchT; if(!pinchT||dt>=8){ if(pinchT&&dt<80) pinchRate=pinchRate*0.5+0.5*Math.log(Math.max(fovLo(),Math.min(fovHi(),f))/pinch0.fl)/dt; pinchT=tn; pinch0.fl=Math.max(fovLo(),Math.min(fovHi(),f)); } }
    if(AR.on&&!AR.paused) setFov(f);
    else { panLinear(m1[0]-m0[0],m1[1]-m0[1]); zoomLinear(m1[0],m1[1],f); }
    moved=true; return; }
  ptrs.set(e.pointerId,cur); if(ptrs.size>1) return;
  // أثناء متابعة الهاتف: السحب بالإصبع يوقف المتابعة مؤقتاً ويحرك السماء، وزر يعيدها
  if(AR.on&&!AR.paused){ if(Math.abs(cur[0]-dragStart[0])+Math.abs(cur[1]-dragStart[1])>8){ moved=true; arPause(); } else return; }
  if(Math.abs(cur[0]-dragStart[0])+Math.abs(cur[1]-dragStart[1])>5){ moved=true; st.trackId=null; }
  const [ldx,ldy]=st.mode==="sky"?axisLock(cur[0]-prev[0],cur[1]-prev[1]):[cur[0]-prev[0],cur[1]-prev[1]];
  VS.push([performance.now(),ldx,ldy]); if(VS.length>6) VS.shift();
  panLinear(ldx,ldy); });
const endPtr=e=>{ if(!arAsk.hidden&&e.type==="pointerup") arAsk.hidden=true; clearTimeout(LP.t); LP.t=0; if(!ptrs.has(e.pointerId)) return;
  if(LP.fired&&ptrs.size===1){ LP.fired=false; ptrs.delete(e.pointerId); pinch0=null; cv.classList.remove("dragging"); VS.length=0; return; } const wasPinch=ptrs.size===2&&!!pinch0; ptrs.delete(e.pointerId); if(ptrs.size<2) pinch0=null;
  if(wasPinch&&COARSE){ const r=performance.now()-pinchT<90?pinchRate:0; pinchRate=0; pinchT=0; VS.length=0; if(Math.abs(r)>1e-4) glide(0,0,r); return; }
  if(ptrs.size===0){ cv.classList.remove("dragging");
    if(!moved&&e.type==="pointerup"){ const tn=performance.now(); if(!PICK.on&&COARSE&&tn-lastTap.t<330&&Math.hypot(e.clientX-lastTap.x,e.clientY-lastTap.y)<34){ lastTap.t=0; doubleTap(e.clientX,e.clientY,lastTap.sel); } else { lastTap={t:tn,x:e.clientX,y:e.clientY}; tap(e.clientX,e.clientY); lastTap.sel=st.sel&&st.sel.type!=="con"?st.sel:null; } }
    else if(moved&&(COARSE||EYE())&&!(AR.on&&!AR.paused)&&e.type==="pointerup"){ const tn=performance.now(), rec=VS.filter(v=>tn-v[0]<90); let vx=0,vy=0;
      if(rec.length>=2){ const span=Math.max(16,tn-rec[0][0]); let sx=0,sy=0; rec.forEach(v=>{ sx+=v[1]; sy+=v[2]; }); vx=sx/span; vy=sy/span; }
      // هاتف بطيء تصله حركة الإصبع كل 50 مللي ثانية أو أكثر: في النافذة عينة واحدة، فتُحسب السرعة منها ومن وقت العينة التي قبلها (#390)، وإصبع توقف ثم ارتفع يبقى بلا انزلاق
      else if(rec.length===1&&VS.length>=2){ const pv=VS[VS.length-2], span=tn-pv[0]; if(span<200){ vx=rec[0][1]/span; vy=rec[0][2]/span; } }
      if(Math.hypot(vx,vy)>0.25) glide(vx,vy,0); }
    VS.length=0; } };
function doubleTap(x,y,sel0){
  if(AR.on&&!AR.paused){ const f0=st.fov,f1=Math.max(fovLo(),f0/2),t0=performance.now(); st.anim=now=>{ let k=Math.min(1,(now-t0)/320); k=1-Math.pow(1-k,3); setFov(f0+(f1-f0)*k); if(k>=1) st.anim=null; }; return; }
  // النقرة الأولى اختارت الجرم (وقد تتحرك السماء قليلاً حين تظهر بطاقته)، فالثانية تقرّبه هو
  if(sel0&&sel0.type==="body"&&PL_DISC[sel0.id]){ zoomToPlanet(sel0.id); return; }
  if(sel0&&selVec(sel0)){ animateTo(selVec(sel0),Math.max(fovLo(),st.fov/2.2)); return; }
  let best=null,bd=1e9; for(const h of hits){ if(h.type==="mansion") continue; const d=Math.hypot(h.x-x,h.y-y); if(d>Math.max(h.r,28)) continue; if(d+h.pr*4<bd){ bd=d+h.pr*4; best=h; } }
  if(best&&best.type==="body"&&PL_DISC[best.id]){ zoomToPlanet(best.id); return; }
  if(best){ const sel={type:best.type,id:best.id}, v=selVec(sel); pickTap(sel); if(v){ animateTo(v,Math.max(fovLo(),st.fov/2.2)); return; } }
  const e=screenDir(x,y), aa=azAltOf(e); animateView({az:st.mode==="atlas"?viewOf([0,1,2].map(j=>MR[0][j]*e[0]+MR[1][j]*e[1]+MR[2][j]*e[2])).az:aa.az,alt:st.mode==="atlas"?viewOf([0,1,2].map(j=>MR[0][j]*e[0]+MR[1][j]*e[1]+MR[2][j]*e[2])).alt:Math.max(altLow(),Math.min(85,aa.alt)),fov:st.fov/2.2});
}
cv.addEventListener("pointerup",endPtr); cv.addEventListener("pointercancel",endPtr);
// التكبير بالعجلة عند موضع المؤشر، لا عند مركز الشاشة
cv.addEventListener("wheel",e=>{ e.preventDefault(); const dy=e.deltaMode===1?e.deltaY*33:e.deltaY; ZA=[e.clientX,e.clientY];
  // مع كوكب مختار أو قريب من المؤشر تسرع العجلة (نحو 26% للنقرة بدل 12%)، فيصل القارئ إلى حلقات زحل في أقل من نصف النقرات السابقة،
  // وزر «قرّب إلى …» في بطاقته أو النقر مرتين عليه يوصله في خطوة واحدة
  zoomAt(e.clientX,e.clientY,st.fov*Math.exp(Math.max(-200,Math.min(200,dy))*(nearPlanetZoom()?0.003:0.0013))); },{passive:false});
cv.addEventListener("dblclick",e=>{ e.preventDefault(); if(COARSE) return; const x=e.clientX,y=e.clientY;
  const pl=hits.find(h=>h.type==="body"&&PL_DISC[h.id]&&Math.hypot(h.x-x,h.y-y)<=Math.max(h.r,20)); if(pl){ zoomToPlanet(pl.id); return; }
  const f0=st.fov,f1=Math.max(FOV_MIN,f0/2.2),t0=performance.now();
  st.anim=now=>{ let k=Math.min(1,(now-t0)/350); k=1-Math.pow(1-k,3); zoomLinear(x,y,f0+(f1-f0)*k); if(k>=1) st.anim=null; }; });
const FOV_MIN=8, FOV_MAX=190;
// على الهاتف مجال الرؤية على عرض الشاشة، فالطول أوسع بكثير: نحسب العرض الذي يجعل طولها زاوية معينة
const phoneFov=long=>{ const asp=Math.max(window.innerWidth,window.innerHeight)/Math.max(1,Math.min(window.innerWidth,window.innerHeight)); return 4*Math.atan(Math.tan(long*D2R/4)/asp)/D2R; };
const fovLo=()=>planetNear()?0.04:Math.min(COARSE&&st.mode==="sky"?1:FOV_MIN,frameMin()), frameMin=()=>{ let f=null; try{ f=frameDeg(); }catch(e){} return f?Math.max(0.04,Math.max(f.w,f.h)*1.2):99; }, fovHi=()=>EYE()?(COARSE&&!AR.on?110:90):COARSE&&st.mode==="sky"&&AR.on?Math.min(120,phoneFov(160)):FOV_MAX;
// على الهاتف كان حد التصغير نحو 120 درجة دائماً، فلا تظهر القبة كلها (#362، طلب عميل). الحد باقٍ أثناء متابعة الهاتف وحدها،
// لأن الشاشة فيها نافذة على جهة واحدة من السماء؛ وبالإصبع يصغّر القارئ حتى تصير السماء كلها دائرة بعرض الشاشة
// وحين يواصل القارئ التصغير بعد الحد وهو يتابع بالهاتف (#371: «التصغير مش ظابط») تتوقف المتابعة ويستمر التصغير حتى القبة كلها،
// ورسالة فيها زر يعيد المتابعة. 3D على الهاتف يُقاس على طول الشاشة، فحده 110 درجات (نحو 67 درجة عرضاً) بدل 90 (نحو 50 درجة عرضاً)
function setFov(f){ if(AR.on&&COARSE&&st.mode==="sky"&&!EYE()&&f>fovHi()*1.06){ const vd=viewDir(); arStop(false); st.az=vd.az; st.alt=Math.max(-89.5,Math.min(89.5,vd.alt)); st.anim=null;
    toastAct("صغّرت السماء أكثر مما تتسع له شاشة تتبع اتجاه الهاتف، فتوقفت المتابعة لترى السماء كلها.","عُد إلى متابعة الهاتف",()=>{ st.follow="phone"; savePrefs(); NAV.ar=true; arStart(); }); }
  st.fov=Math.max(fovLo(),Math.min(fovHi(),f)); dirty=true;
  // التكبير على كوكب مختار في وسط الشاشة: تتبعه الشاشة وهو يتحرك مع دوران السماء (#313)
  if(st.fov>=3) st.trackId=null; else if(!st.trackId){ const id=planetNear(); if(id) st.trackId=id; } }
function zoomBy(k){ animateView({az:st.az,alt:st.alt,fov:st.fov*k}); }
// «السماء كلها»: في سماء مكاني القبة كلها والشمال أعلى والشرق يسار كخرائط السماء، وفي الأطلس نصف الكرة الذي فوق أفقك الآن
function resetView(){ if(st.focus||st.route||st.ast) exitFocus(); if(!M) computeSky();
  // القبة كلها، والجهة التي تنظر إليها الآن في أسفلها، فلا تدور السماء
  if(st.mode==="sky") animateView({az:Math.round(viewDir().az),alt:89.5,fov:COARSE?fovHi():190}); else { const t=viewOf(M[2]); animateView({az:t.az,alt:Math.max(-89,Math.min(89,t.alt)),fov:190}); } }
function faceNorth(){
  if(st.focus||st.route||st.ast) exitFocus();
  const vd=viewDir();
  if(st.mode==="sky"){ if(upsideDown()){ animateView({az:vd.az,alt:Math.min(60,vd.alt),fov:st.fov}); toast("عاد العرض معتدلاً."); return; }
    const toN=!(st.az<45||st.az>315)||st.alt>80; animateView({az:toN?0:180,alt:toN?Math.max(12,Math.min(60,st.lat)):40,fov:Math.max(80,Math.min(st.fov,120))});
    toast(toN?(st.lat>2?`تنظر الآن نحو الشمال. النجم القطبي على ارتفاع ${Math.round(st.lat)} درجة تقريباً، بقدر خط عرض مدينتك.`:"تنظر الآن نحو الشمال."):"تنظر الآن نحو الجنوب."); }
  else { if(upsideDown()){ animateView({az:vd.az,alt:Math.max(-89,Math.min(89,vd.alt)),fov:st.fov}); toast("عادت الخريطة والشمال إلى أعلى."); return; }
    const toN=st.alt<60; animateView({az:st.az,alt:toN?89.5:0,fov:Math.max(st.fov,100)});
    toast(toN?"في المركز الآن القطب الشمالي السماوي، والنجم القطبي قريب منه.":"عدت إلى خط الاستواء السماوي."); }
}
// البوصلة: تتجه نحو الشمال ثم نحو الجنوب، أو تعدّل العرض المقلوب بعد سمت الرأس
document.getElementById("dial").onclick=()=>faceNorth();
document.getElementById("zIn").onclick=()=>zoomBy(nearPlanetZoom()?1/3:1/1.5);
document.getElementById("zOut").onclick=()=>zoomBy(1.5);
document.getElementById("zReset").onclick=resetView;
window.addEventListener("keydown",e=>{ if(e.target&&e.target.closest&&e.target.closest("input,select,textarea")||e.ctrlKey||e.metaKey||e.altKey) return; const k=e.key, c=e.code; let used=true;
  // الأسهم تحرك النظر كما يحركه السحب (5 درجات)، فتتبع قلب الصورة وما بعد سمت الرأس
  const ARW={ArrowLeft:[1,0],ArrowRight:[-1,0],ArrowUp:[0,1],ArrowDown:[0,-1]}[k];
  if(ARW){ st.anim=null; const px=5/degPerPx(); panLinear(ARW[0]*px,ARW[1]*px); }
  else if(k==="+"||k==="=") zoomBy(1/1.3); else if(k==="-") zoomBy(1.3);
  else if(c==="KeyH") setClean(!st.clean); else if(c==="KeyN") toggleNight(); else if(c==="KeyF"&&FS_OK) toggleFull();
  else if(k==="Escape"&&!lpMenu.hidden) lpClose();
  else if(k==="Escape"&&PICK.on) pickEnd();
  else if(k==="Escape"){ if(!sheetOpen()&&info.hidden&&st.clean&&!st.focus&&!st.route&&!st.ast) setClean(false); else if(sheetOpen()) closeSheets(); else if(!info.hidden){ showInfo(null); st.sel=st.focus?{type:"con",id:st.focus}:null; } else exitFocus(); } else used=false;
  if(used){ dirty=true; e.preventDefault(); } });
function tap(x,y){
  if(AR.qClosed&&performance.now()-AR.qClosed<700){ AR.qClosed=0; return; } // النقرة التي أغلقت لوح الطبقات لا تختار شيئاً
  if(performance.now()-LP.closed<500) return; // والنقرة التي أغلقت قائمة الضغطة الطويلة
  if(sheetOpen()){ closeSheets(); return; }
  if(PICK.on){ pickToggleAt(x,y); return; }
  if(behindTerrain(x,y)) return;
  let best=null,bd=1e9; for(const h of hits){ const d=Math.hypot(h.x-x,h.y-y); if(d>Math.max(h.r,COARSE?22:14)) continue; const s=d+h.pr*4; if(s<bd){bd=s;best=h;} }
  if(best){ pickTap({type:best.type,id:best.id}); return; }
  if(st.focus) return;
  camera(); scale(); const c=unproj((x-CX)/SX,-(y-CY)/SY);
  const enu=[0,1,2].map(j=>H[0][j]*c[0]+H[1][j]*c[1]+H[2][j]*c[2]), j2=[0,1,2].map(j=>MR[0][j]*enu[0]+MR[1][j]*enu[1]+MR[2][j]*enu[2]), rd=radec(j2);
  try{ const sym=A.Constellation(rd.ra/15,rd.dec).symbol; if(CONS[sym]) pickTap({type:"con",id:sym}); }catch(e){}
}

// ================================================================ البحث
function norm(s){ return (s||"").toLowerCase().replace(/[ً-ٰٟـ‎‏]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/\s+/g," ").trim(); }
function stripAl(s){ return s.split(" ").map(w=>w.replace(/^(وال|بال|لل|ال)/,"")).join(" "); }
// فهرس البحث يُبنى عند أول بحث لا عند فتح الأطلس (نحو 1500 اسم)
const INDEX=[];
function addIdx(keys,label,kind,sel,rank){ const k=keys.filter(Boolean).map(norm); INDEX.push({k,k2:k.map(stripAl),label,kind,sel,rank}); }
// أسماء أخرى يكتبها الناس في البحث
const STAR_ALIAS={11767:["نجم القطب","النجم القطبي","نجم الشمال","نجمة الشمال","بولاريس"],27989:["إبط الجوزاء","يد الجوزاء"],32349:["الشعرى","نجم الشعرى","سيريوس"],30438:["نجم سهيل","كانوبس"],91262:["فيغا","نجم النسر"],24436:["رايجل"]};
function buildIndex(){
addIdx(["درب التبانة","التبانة","درب اللبانة","المجرة","مجرتنا","milky way","milky"],"درب التبانة","طبقة على الخريطة",{type:"layer",id:"mw"},-2);
if(!EMBED) addIdx(["بلوتو","pluto","الكوكب القزم"],"بلوتو","كوكب قزم · صفحته في الموسوعة",{type:"page",id:"/solar-system/pluto/"},-1);
BODIES.forEach(b=>addIdx([b.ar,b.id,b.b],b.ar,b.id==="sun"?"نجم":b.id==="moon"?"القمر":"كوكب",{type:"body",id:b.id},-3));
SKY.cons.forEach(c=>{ if(CONS[c.id]!==c) return; addIdx([c.id==="Ser"?"الحية":c.ar,c.la,c.gen,c.id,"كوكبة "+shortName(c.ar)],c.id==="Ser"?"الحية":c.ar,"كوكبة",{type:"con",id:c.id},-1); });
SKY.asts.forEach(a=>{ if(a.id==="winter"||a.id==="summer") return; addIdx([a.ar],a.ar,"شكل نجمي",{type:"ast",id:a.id},-1); });
Object.values(ROUTES).forEach(r=>{ const extra=r.id.startsWith("polaris")?["الشمال","اتجاه الشمال","نجم الشمال","النجم القطبي","القطب","كيف اعرف الشمال"]:[]; addIdx([r.ar,r.q,...extra],r.ar,r.q,{type:"route",id:r.id},r.id.startsWith("polaris")?-2.5:-1.2); });
SKY.mansions.forEach(m=>addIdx([m.ar,"منزلة "+m.ar],m.ar,"منزلة القمر "+m.n,{type:"mansion",id:m.n},0));
METS.forEach(m=>addIdx([m.ar,"مشع "+m.ar,"زخة "+m.ar,m.slug.replace(/-/g," "),"زخة شهب","زخات الشهب","شهب"],"مشع "+m.ar,"زخة شهب"+(metActive(m)?" · نشطة الآن":""),{type:"met",id:m.slug},metActive(m)?-1:0.5));
SKY.dsos.forEach(d=>addIdx([d.ar,d.id,d.en,d.ngc,/^M\d+$/.test(d.id)?"م"+d.id.slice(1):"",/^M\d+$/.test(d.id)?"م "+d.id.slice(1):""],d.ar||d.id,d.ta+" · "+d.id,{type:"dso",id:d.id},d.ar?-.5:2));
for(const hip in NAMES){ const n=NAMES[hip], i=starIdx[hip]; if(i==null) continue; const mag=SKY.stars[i][2]; if(!n[0]&&!n[1]&&mag>4.5) continue; const g=n[2]?n[2].replace(/\d+$/,""):"";
  addIdx([n[0],shortName(n[0]),n[1],...(STAR_ALIAS[hip]||[]),bayerAr(n),n[2]&&CONS[n[3]]?n[2]+" "+CONS[n[3]].gen:"",GREEK_LAT[g]&&CONS[n[3]]?GREEK_LAT[g]+" "+CONS[n[3]].gen:""],starTitle(+hip),"نجم"+(CONS[n[3]]?" في "+shortName(CONS[n[3]].ar):""),{type:"star",id:+hip},(CUR[hip]?-2:0)+mag/10); }
}
function search(q,only){ const nq=norm(q),nq2=stripAl(nq); if(!nq) return []; const out=[]; if(!INDEX.length) buildIndex();
  for(const e of INDEX){ if(only&&!only(e)) continue; let sc=99; e.k.forEach((k,i)=>{ if(k===nq) sc=Math.min(sc,0); else if(k.startsWith(nq)) sc=Math.min(sc,1); else if(k.includes(nq)) sc=Math.min(sc,3); const k2=e.k2[i]; if(nq2&&k2.startsWith(nq2)) sc=Math.min(sc,2); else if(nq2.length>1&&k2.includes(nq2)) sc=Math.min(sc,4); }); if(sc<99) out.push([sc+e.rank*0.3,e]); }
  // إذا كتب القارئ سؤالاً مثل «كيف أجد الشمال؟» نبحث بالكلمات المهمة فيه
  if(!out.length){ const STOP=new Set(["كيف","اين","اجد","تجد","نجد","اعرف","يعرف","ما","ماهو","هو","هي","في","من","الي","علي","عن","هل","اري","يري","تري","السماء"]);
    const SYN={"الشمال":"القطبي","شمال":"القطبي","الجنوب":"سهيل","جنوب":"سهيل"};
    const toks=nq.replace(/[؟?،,.]/g," ").split(" ").filter(w=>w.length>1&&!STOP.has(w)).map(w=>SYN[w]||w);
    if(toks.length) for(const e of INDEX){ if(only&&!only(e)) continue; const all=e.k.concat(e.k2).join(" "); if(toks.every(t=>all.includes(t)||all.includes(stripAl(t)))) out.push([5+e.rank*0.3,e]); } }
  out.sort((a,b)=>a[0]-b[0]); return out.slice(0,9).map(x=>x[1]); }
const qEl=document.getElementById("q"),resEl=document.getElementById("results"); let resSel=0,resList=[];
function showResults(){ resList=search(qEl.value); resSel=0; if(!qEl.value.trim()){ resEl.hidden=true; return; }
  resEl.innerHTML=resList.length?resList.map((e,i)=>`<button role="option" data-i="${i}" class="${i===0?"on":""}"><span class="t">${esc(e.label)}</span><span class="k">${esc(e.kind)}</span></button>`).join(""):`<div style="padding:10px;color:var(--muted);font-size:14px">لا نجم ولا جرم بهذا الاسم. جرّب اسماً آخر أو اكتب الاسم الإنجليزي.</div>`+cityQBtn(); resEl.hidden=false; }
// كتب القارئ اسم مدينة في بحث الأجرام (تقرير الاختبار، #441: «Oslo» بدت غير موجودة وهي في قائمة المدن): زر ينقل الكلمة إلى بحث المكان
function cityQBtn(){ const q=qEl.value.trim(); return q.length>=2&&!EMBED?`<button role="option" data-cityq="1"><span class="t">ابحث عن «${esc(q)}» بين المدن</span><span class="k">مكان</span></button>`:""; }
function cityQ(){ const q=qEl.value.trim(); resEl.hidden=true; qEl.value=""; qEl.blur(); if(document.getElementById("placeSheet").hidden) toggleSheet("placeSheet"); const pi=document.getElementById("placeQ"); pi.value=q; pi.dispatchEvent(new Event("input")); try{ pi.focus({preventScroll:true}); }catch(e){} }
qEl.addEventListener("input",showResults);
qEl.addEventListener("keydown",e=>{ if(resEl.hidden) return; if(e.key==="ArrowDown"||e.key==="ArrowUp"){ resSel=(resSel+(e.key==="ArrowDown"?1:-1)+resList.length)%resList.length; [...resEl.children].forEach((b,i)=>b.classList.toggle("on",i===resSel)); e.preventDefault(); } else if(e.key==="Enter"&&resList[resSel]) pick(resList[resSel]); else if(e.key==="Enter"&&!resList.length&&resEl.querySelector("[data-cityq]")) cityQ(); else if(e.key==="Escape") resEl.hidden=true; });
resEl.addEventListener("click",e=>{ if(e.target.closest("[data-cityq]")){ cityQ(); return; } const b=e.target.closest("button[data-i]"); if(b) pick(resList[+b.dataset.i]); });
function pick(e){ resEl.hidden=true; qEl.value=""; qEl.blur();
  // نتيجتان ليستا جرماً على الخريطة (#341): درب التبانة طبقة تُشغَّل، وبلوتو صفحته في الموسوعة (أخفت من أن يُرسم هنا)
  if(e.sel.type==="layer"){ setLayer(e.sel.id,true); dirty=true; toast(st.mode==="sky"?"شُغّلت طبقة درب التبانة. يظهر في الليل المظلم بعيداً عن أضواء المدن، فجرّب «صحراء مظلمة» من «الطبقات».":"شُغّلت طبقة درب التبانة: الشريط الفاتح الممتد عبر الخريطة."); return; }
  if(e.sel.type==="page"){ (window.top||window).location.href=e.sel.id; return; }
  st.tour=-1; document.getElementById("btnTour").setAttribute("aria-pressed","false"); go(e.sel); updateFocusBar(); }

// ================================================================ الواجهة
document.addEventListener("click",e=>{ if(!(e.target&&e.target.closest)) return;
  if(e.target.closest("[data-eclz]")){ eclZoom(); return; }
  const s=e.target.closest("[data-sel]"); if(s){ const [t,id]=s.dataset.sel.split(":"); const sel={type:t,id:(t==="star"||t==="mansion")?+id:id};
    if(st.focus&&t==="star"&&conOfStar(sel.id)===st.focus){ pickTap(sel); const v=starV(sel.id); animateTo(v,st.fov); } else go(sel); return; }
  const f=e.target.closest("[data-focus]"); if(f){ enterFocus(f.dataset.focus); return; }
  const sk=e.target.closest("[data-skyview]"); if(sk){ const id=sk.dataset.skyview; st.focusSky=true; setMode("sky",true); if(altAz(CONS[id].v).alt<-1&&!st.layers.below){ tmpBelow(); toast("الكوكبة تحت الأفق الآن، فأظهرنا ما تحت الأفق."); } animateTo(CONS[id].v,Math.max(70,st.fov)); showInfo(st.sel); return; }
  const c=e.target.closest("[data-close]"); if(c){ if(c.dataset.close==="info"){ showInfo(null); st.sel=st.focus?{type:"con",id:st.focus}:null; dirty=true; } else closeSheets(); return; }
  const o=e.target.closest("[data-open]"); if(o){ e.preventDefault(); const id=o.dataset.open; if(id==="tour"){ closeSheets(); tourGo(0); } else toggleSheet(id); return; }
  const md=e.target.closest("[data-mode]"); if(md){ const m=md.dataset.mode; pickMode(m==="sky"&&st.eye?"eye":m); return; }
  const tm=e.target.closest("[data-time]"); if(tm){ const v=tm.dataset.time; if(v==="now"){ setPlay(0); setTime(Date.now(),true); } else setTime(st.t+(+v)); return; }
});
// الألواح: لوح واحد مفتوح في كل مرة، وزر كل لوح يعرف إن كان لوحه مفتوحاً
const SHEETS=["viewSheet","placeSheet","tonightSheet","aboutSheet","browseSheet","timeSheet","menuSheet","arSet","shotSheet","fovSheet"], SHEET_BTN={shotSheet:["bShot"],arSet:["arCal"],viewSheet:["btnView","arMore"],tonightSheet:["btnTonight"],timeSheet:["btnTime"],menuSheet:["btnMenu"]};
const sheetOpen=()=>SHEETS.some(id=>!document.getElementById(id).hidden);
function syncSheetBtns(){ for(const id in SHEET_BTN) SHEET_BTN[id].forEach(b=>document.getElementById(b).setAttribute("aria-expanded",!document.getElementById(id).hidden)); }
// لوحة المفاتيح: التركيز يدخل اللوح عند فتحه بالمفاتيح، ويعود إلى الزر الذي فتحه عند إغلاقه
let KBD=false, sheetFrom=null; addEventListener("keydown",e=>{ if(e.key==="Tab"||e.key==="Enter"||e.key===" ") KBD=true; },true); addEventListener("pointerdown",()=>{ KBD=false; },true);
SHEETS.forEach(id=>{ const el=document.getElementById(id); el.setAttribute("role","dialog"); if(!el.getAttribute("aria-label")){ const h=el.querySelector("h2"); if(h) el.setAttribute("aria-label",h.textContent.trim()); } });
function closeSheets(){ const act=document.activeElement, inS=!!(act&&act.closest&&act.closest(".sheet")); SHEETS.forEach(id=>document.getElementById(id).hidden=true); syncSheetBtns(); if(inS&&sheetFrom&&sheetFrom.isConnected&&sheetFrom.offsetParent!==null){ try{ sheetFrom.focus({preventScroll:true}); }catch(e){} } }
function toggleSheet(id){ const el=document.getElementById(id), open=el.hidden, from=document.activeElement; closeSheets(); if(open&&from&&from!==document.body&&!from.closest(".sheet")) sheetFrom=from; if(open) openFlipPick(false); el.hidden=!open; if(open) document.getElementById("toast").hidden=true; if(open&&W<=720) showInfo(null); if(open&&id==="tonightSheet") buildTonight(); if(open&&id==="placeSheet"){ loadWorld(); syncPlaceForm(); } if(open&&id==="timeSheet"){ whenLabel(); syncWhen(); scrub.key=""; syncScrub(); }  if(open) el.scrollTop=0; syncSheetBtns(); if(open&&KBD){ const x=el.querySelector("[data-close],button,select,input"); if(x) try{ x.focus({preventScroll:true}); }catch(e){} } }
document.getElementById("btnTonight").onclick=()=>toggleSheet("tonightSheet");
document.getElementById("btnView").onclick=()=>toggleSheet("viewSheet");
document.getElementById("fab").onclick=()=>setClean(false);
document.getElementById("btnTime").onclick=()=>toggleSheet("timeSheet");
document.getElementById("btnMenu").onclick=()=>toggleSheet("menuSheet");
document.getElementById("where").onclick=()=>toggleSheet("placeSheet");
function setNight(v){ st.night=v; document.documentElement.classList.toggle("night",v); document.getElementById("vNight").setAttribute("aria-pressed",v); if(typeof syncQuick==="function") syncQuick(); const m=document.querySelector('meta[name="theme-color"]'); if(m) m.content=v?"#000000":"#0a0f1e"; }
function toggleNight(){ setNight(!st.night); savePrefs(); toast(st.night?"الرؤية الليلية: الشاشة حمراء خافتة لتحافظ على تكيّف عينك. خفّض سطوع هاتفك أيضاً.":"عادت الألوان الطبيعية."); }
document.getElementById("vNight").onclick=toggleNight;
setNight(st.night);
// ملء الشاشة حيث يدعمه المتصفح (لا يدعمه سفاري على آيفون)
const FS_EL=()=>document.fullscreenElement||document.webkitFullscreenElement||null;
const FS_OK=!!((document.fullscreenEnabled&&document.documentElement.requestFullscreen)||(document.webkitFullscreenEnabled&&document.documentElement.webkitRequestFullscreen))&&!EMBED;
const vFull=document.getElementById("vFull"); vFull.hidden=!FS_OK;
// كان رفض المتصفح يمر بصمت فلا يحدث شيء (المالك 2026-11-19، أندرويد Chrome: «مفيش أي حاجة بتحصل»): الآن إن لم تمتلئ الشاشة
// تختفي الأدوات بدلاً منها («السماء فقط») فتتسع السماء فعلاً، وتقول رسالة سبب الرفض كما أعطاه المتصفح
function exitFull(){ try{ const x=(document.exitFullscreen||document.webkitExitFullscreen).call(document); if(x&&x.catch) x.catch(()=>{}); }catch(e){} }
function toggleFull(){
  if(FS_EL()){ exitFull(); return; }
  const el=document.documentElement, req=el.requestFullscreen||el.webkitRequestFullscreen; let ended=false;
  const fail=e=>{ if(ended||FS_EL()) return; ended=true; if(!st.clean) setClean(true);
    toast("لم يسمح المتصفح بملء الشاشة"+(e&&e.message?" ("+String(e.message).slice(0,90)+")":"")+"، فأخفينا الأدوات لتتسع السماء، وزر «الأدوات» يعيدها."); };
  try{ const pr=req.call(el,{navigationUI:"hide"}); if(pr&&pr.then) pr.then(()=>{ ended=true; },fail); }catch(e){ fail(e); }
  setTimeout(()=>{ if(!FS_EL()) fail(null); },900); }
vFull.onclick=toggleFull;
const btnFull=document.getElementById("btnFull"); btnFull.hidden=!FS_OK; btnFull.onclick=toggleFull;
// زر ملء الشاشة ظاهر أيضاً في أدوات أعلى الشاشة، في كل الأوضاع ومنها 3D (#371: لم يجده المالك في 3D)
const bFull=document.getElementById("bFull"); bFull.hidden=!FS_OK; bFull.onclick=toggleFull;
const onFsChange=()=>{ const on=!!FS_EL(); [vFull,btnFull,bFull].forEach(b=>b.setAttribute("aria-pressed",on)); bFull.title=on?"الخروج من ملء الشاشة":"ملء الشاشة"; setTimeout(()=>{ resize(); layout(); },120); };
document.addEventListener("fullscreenchange",onFsChange); document.addEventListener("webkitfullscreenchange",onFsChange);
// وضع «السماء فقط»: تختفي الأدوات، ويبقى زر دائري في الركن يفتح خيارات العرض، وينتقل البحث إلى داخل اللوح
const searchBox=document.getElementById("searchBox"), searchHome=searchBox.nextElementSibling;
function setClean(v,quiet){ st.clean=!!v; document.body.classList.toggle("clean",st.clean);
  if(st.clean) document.getElementById("searchSlot").appendChild(searchBox); else searchHome.parentNode.insertBefore(searchBox,searchHome);
  document.getElementById("vClean").setAttribute("aria-pressed",st.clean); document.querySelector("#vClean span").textContent=st.clean?"إظهار الأدوات":"السماء فقط";
  document.getElementById("results").hidden=true; closeSheets(); layout(); vpT=null; dirty=true;
  if(!quiet){ savePrefs(); if(st.clean&&!st.seen.clean){ st.seen.clean=1; savePrefs(); toast(COARSE?"أُخفيت الأدوات لتبقى السماء وحدها، وزر «الأدوات» في الركن يعيدها.":"أُخفيت الأدوات لتبقى السماء وحدها، وزر «الأدوات» في الركن أو زر H يعيدها."); } } }
document.getElementById("btnHide").onclick=()=>setClean(true);
document.getElementById("vClean").onclick=()=>setClean(!st.clean);
// الطبقات: أزرار تبديل، وما يخص وضعاً واحداً يظهر فيه وحده
const tg=document.getElementById("toggles");
tg.innerHTML=LAYERS.filter(l=>!(l[5]==="coarse"&&!COARSE)).map(l=>`<button id="ly-${l[0]}" data-layer="${l[0]}" ${l[4]?`data-only="${l[4]}"`:""} aria-pressed="${!!st.layers[l[0]]}"><span>${l[1]}${l[3]?`<small>${l[3]}</small>`:""}</span></button>`).join("");
tg.addEventListener("click",e=>{ const b=e.target.closest("[data-layer]"); if(!b) return; if(b.dataset.layer==="below"&&AR.on) setLayer("arBelow",!st.layers.arBelow); else setLayer(b.dataset.layer,!st.layers[b.dataset.layer]); });
function syncLayerVis(){ tg.querySelectorAll("[data-only]").forEach(b=>b.hidden=b.dataset.only!==st.mode); }
const FLIP_NOTE=s=>AR.on?"لا يُطبَّق القلب أثناء متابعة الهاتف، فالشاشة هناك نافذة على السماء كما هي.":EYE()?"لا يُطبَّق القلب في منظر 3D، لأنه يعرض المكان كما تقف فيه.":
  s.flipH&&s.flipV?"مقلوبة 180 درجة كما ترى في التلسكوب النيوتوني أو أي تلسكوب بلا مرآة زاوية.":
  s.flipH?"اليمين واليسار معكوسان، كما ترى في تلسكوب بمرآة زاوية (عدسي أو شميت كاسجرين).":
  s.flipV?"الأعلى والأسفل معكوسان.":"الصورة كما تراها بعينك. شغّل الاثنين معاً لتنقلب 180 درجة كما في التلسكوب النيوتوني.";
function syncFlip(){ document.querySelectorAll("[data-flip]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.flip==="h"?st.flipH:st.flipV)));
  document.querySelectorAll(".flip-note").forEach(el=>el.textContent=FLIP_NOTE(st)); }
// قلب الصورة: زر في الشريط السفلي على الحاسوب والهاتف (#453، المالك: «بجوار يتبع هاتفك … الجزء اللى من تحت قادر انه يشيل 5 ازرار»)، ومفتاحاه أيضاً في تبويب «الشكل» على الهاتف
const flipPick=document.getElementById("flipPick");
function openFlipPick(on){ flipPick.hidden=!on; document.getElementById("btnFlip").setAttribute("aria-expanded",!!on); if(on){ closeSheets(); syncFlip(); } }
document.getElementById("btnFlip").onclick=()=>openFlipPick(flipPick.hidden);
document.getElementById("flipX").onclick=()=>openFlipPick(false);
[document.getElementById("flipRow"),flipPick].forEach(el=>el.addEventListener("click",e=>{ const b=e.target.closest("[data-flip]"); if(!b) return;
  if(b.dataset.flip==="h") st.flipH=!st.flipH; else st.flipV=!st.flipV; FLIPW.user=true; FLIPW.mine=true; st.anim=null; savePrefs(); syncFlip(); hudKey=""; dirty=true; }));
syncFlip();
// إذا غيّر القارئ القلب في نسخة أخرى (تبويب آخر) تتبعه هذه النسخة دون رسالة
addEventListener("storage",e=>{ if(e.key!=="atlas-prefs"||!e.newValue) return; try{ const f=JSON.parse(e.newValue).flip; if(!f) return; const h=f.h===true, v=f.v===true; if(h!==st.flipH||v!==st.flipV){ st.flipH=h; st.flipV=v; FLIPW.user=true; FLIPW.mine=false; syncFlip(); hudKey=""; dirty=true; } }catch(_){} });
// ضوء المكان: يغيّر سطوع السماء في «سماء مكاني» فيغيّر عدد النجوم التي تراها العين فعلاً
const LP_NOTE=["سماء صحراء بلا أضواء: تظهر النجوم حتى أخفت ما تراه العين، ودرب التبانة واضح.","ريف بعيد عن المدن: نجوم كثيرة، ودرب التبانة باهت.","طرف مدينة: تظهر النجوم المتوسطة واللامعة فقط، كما في أغلب الأحياء.","وسط مدينة مضيئة: لا يظهر إلا ألمع النجوم والكواكب، كما تراها في وسط القاهرة."];
function syncLp(){ document.querySelectorAll("#lpRow [data-lp]").forEach(b=>b.setAttribute("aria-pressed",String(+b.dataset.lp===st.lp))); document.getElementById("lpNote").textContent=LP_NOTE[st.lp]; document.getElementById("lpBox").hidden=st.mode!=="sky"||EMBED; }
document.getElementById("lpRow").addEventListener("click",e=>{ const b=e.target.closest("[data-lp]"); if(!b) return; st.lp=+b.dataset.lp; savePrefs(); syncLp(); hudKey=""; dirty=true; });
syncLp();
// ---------- إخفاء كوكبة أو نجم بعينه وإظهاره (طلب المالك 2026-11-16: «يخفي كوكبة معينة او نجم معين، او يظهره، ويقدر يحفظ الوضع») ----------
const hidSet=t=>t==="con"?HID.c:HID.s, isHidden=sel=>!!sel&&(sel.type==="con"||sel.type==="star")&&hidSet(sel.type).has(sel.id);
const hidName=(t,id)=>t==="con"?(id==="Ser"?"الحية":shortName((CONS[id]||{}).ar||id)):starShort(id);
const EYE_ON='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M10.6 5.1A10.8 10.8 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a10 10 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2M3 3l18 18"/></svg>';
function hideBtn(sel){ if(EMBED||!(sel.type==="con"||sel.type==="star")) return; const h=isHidden(sel), what=sel.type==="con"?"هذه الكوكبة":"هذا النجم";
  const b=document.createElement("button"); b.className="hideb"; b.dataset.hide=""; b.setAttribute("aria-pressed",String(h));
  b.setAttribute("aria-label",h?`أظهر ${what} في السماء`:`أخفِ ${what} من السماء`); b.title=b.getAttribute("aria-label"); b.innerHTML=h?EYE_OFF:EYE_ON;
  const sh=info.querySelector(".share"); if(sh) sh.after(b); else info.prepend(b); }
function setHidden(t,id,on){ const S=hidSet(t); if(on) S.add(id); else S.delete(id); savePrefs(); syncHide(); hudKey=""; dirty=true; }
function syncHide(){ const el=document.getElementById("hideList"), all=[...[...HID.c].map(id=>["con",id]),...[...HID.s].map(id=>["star",id])];
  el.innerHTML=all.map(([t,id])=>{ const n=hidName(t,id); return `<span class="hchip"><b>${esc(n)}</b><small>${t==="con"?"كوكبة":"نجم"}</small><button data-unhide="${t}:${id}" aria-label="أظهر ${esc(n)}">إظهار</button></span>`; }).join("")+(all.length>1?`<button class="hall" data-unhide="all">إظهار الكل (${all.length})</button>`:"");
  const b=info.querySelector(".hideb"); if(b&&st.sel){ b.remove(); hideBtn(st.sel); } }
document.getElementById("hideList").addEventListener("click",e=>{ const b=e.target.closest("[data-unhide]"); if(!b) return; const v=b.dataset.unhide;
  if(v==="all"){ const n=HID.c.size+HID.s.size; HID.c.clear(); HID.s.clear(); savePrefs(); syncHide(); hudKey=""; dirty=true; toast(`أظهرنا كل ما أخفيته (${n}).`); return; }
  const i=v.indexOf(":"), t=v.slice(0,i), id=t==="star"?+v.slice(i+1):v.slice(i+1); setHidden(t,id,false); toast(`أظهرنا «${hidName(t,id)}» من جديد.`);
  const nx=document.querySelector("#hideList [data-unhide]"); (nx||document.getElementById("hideQ")).focus(); });
info.addEventListener("click",e=>{ if(!e.target.closest("[data-hide]")||!st.sel) return; const sel=st.sel, on=!isHidden(sel), n=hidName(sel.type,sel.id);
  setHidden(sel.type,sel.id,on);
  if(!on){ toast(`أظهرنا «${n}» من جديد.`); return; }
  // أُخفي: تُغلق بطاقته ليختفي من الشاشة فوراً، ومكان إظهاره في «الطبقات»
  if(sel.type==="con"&&st.focus===sel.id) exitFocus();
  showInfo(null); st.sel=st.focus?{type:"con",id:st.focus}:null; if(st.sel) showInfo(st.sel); updateFocusBar(); markPills(); dirty=true;
  toast(`أخفينا «${n}»، ويمكنك إظهار ما أخفيته من «الطبقات».`); });
// ================================================================ «نجومي» والضغطة الطويلة (#366)
// القارئ يختار من السماء ما يبقى ظاهراً وحده (أو ما يُخفى)، بضغطات متتالية بلا بطاقات. وكل ما في قائمة الضغطة الطويلة موجود أيضاً
// في البطاقة (زر النجمة وزر العين) وفي «الطبقات»، فلا يحتاج أحد أن يعرف الضغطة الطويلة ليصل إلى شيء (المالك: «ازاي هنعرف العميل»)
const myOn=()=>!EMBED&&MY.on&&!PICK.on&&MY.c.size+MY.s.size>0;
const myConHas=c=>{ for(const k of MY.c) if(k.slice(0,3)===c) return true; return false; };
const mySet=t=>t==="con"?MY.c:MY.s, isMine=sel=>!!sel&&(sel.type==="con"||sel.type==="star")&&mySet(sel.type).has(sel.id);
const STAR_I='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.2l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L12 16.5l-5.4 2.9 1.2-5.9-4.4-4.1 6-.7z"/></svg>';
function cntAr(n,one,two,few,many){ return n===1?one:n===2?two:n>=3&&n<=10?`${n} ${few}`:`${n} ${many}`; }
function myCount(A){ const ns=[...A.s].length, nc=[...A.c].length, p=[]; if(ns) p.push(cntAr(ns,"نجماً واحداً","نجمين","نجوم","نجماً")); if(nc) p.push(cntAr(nc,"كوكبة واحدة","كوكبتين","كوكبات","كوكبة")); return p.join(" و"); }
function conAt(x,y){ camera(); scale(); const c=unproj((x-CX)/SX,-(y-CY)/SY);
  const enu=[0,1,2].map(j=>H[0][j]*c[0]+H[1][j]*c[1]+H[2][j]*c[2]), j2=[0,1,2].map(j=>MR[0][j]*enu[0]+MR[1][j]*enu[1]+MR[2][j]*enu[2]), rd=radec(j2);
  try{ const sym=A.Constellation(rd.ra/15,rd.dec).symbol; if(CONS[sym]) return {type:"con",id:sym}; }catch(e){} return null; }
function hitAt(x,y,types){ let best=null,bd=1e9; for(const h of hits){ if(types&&!types.includes(h.type)) continue; const d=Math.hypot(h.x-x,h.y-y); if(d>Math.max(h.r,COARSE?22:14)) continue; const sc=d+h.pr*4; if(sc<bd){ bd=sc; best=h; } } return best?{type:best.type,id:best.id}:null; }
function syncMine(){ const el=document.getElementById("mineList"), all=[...[...MY.c].map(id=>["con",id]),...[...MY.s].map(id=>["star",id])];
  el.innerHTML=all.map(([t,id])=>{ const n=hidName(t,id); return `<span class="hchip"><b>${esc(n)}</b><small>${t==="con"?"كوكبة":"نجم"}</small><button data-unmine="${t}:${id}" aria-label="أزل ${esc(n)} من نجومي">إزالة</button></span>`; }).join("")+(all.length>1?`<button class="hall" data-unmine="all">مسح الكل</button>`:"");
  const on=document.getElementById("mineOn"); on.disabled=!all.length; on.setAttribute("aria-pressed",String(MY.on&&all.length>0)); document.getElementById("mineDim").checked=MY.dim;
  const b=info.querySelector(".mineb"); if(b&&st.sel){ b.remove(); mineBtn(st.sel); } hudKey=""; dirty=true; }
function mineBtn(sel){ if(EMBED||!(sel.type==="con"||sel.type==="star")) return; const m=isMine(sel), what=sel.type==="con"?"هذه الكوكبة":"هذا النجم";
  const b=document.createElement("button"); b.className="mineb"; b.dataset.mine=""; b.setAttribute("aria-pressed",String(m));
  b.setAttribute("aria-label",m?`أزل ${what} من نجومي`:`أضف ${what} إلى نجومي`); b.title=b.getAttribute("aria-label"); b.innerHTML=STAR_I;
  const h=info.querySelector(".hideb"); if(h) h.after(b); else info.prepend(b); }
function setMine(t,id,on){ const S=mySet(t); if(on) S.add(id); else S.delete(id); if(!MY.c.size&&!MY.s.size) MY.on=false; savePrefs(); syncMine(); }
function showOnly(sel){ MY.c.clear(); MY.s.clear(); mySet(sel.type).add(sel.id); MY.on=true; savePrefs(); syncMine();
  toastAct(`تعرض السماء الآن «${hidName(sel.type,sel.id)}» وحده مع الكواكب والقمر والشمس.`,"أظهر كل شيء",()=>{ MY.on=false; savePrefs(); syncMine(); }); }
function mineToggle(sel){ const on=!isMine(sel), n=hidName(sel.type,sel.id); setMine(sel.type,sel.id,on);
  if(!on){ toast(`أزلنا «${n}» من نجومي.`); return; }
  if(MY.on) toast(`أضفنا «${n}» إلى نجومي، فصار ظاهراً مع ما اخترته.`);
  else toastAct(`أضفنا «${n}» إلى نجومي (${myCount(MY)}).`,"اعرض نجومي فقط",()=>{ MY.on=true; savePrefs(); syncMine(); }); }
info.addEventListener("click",e=>{ if(e.target.closest("[data-mine]")&&st.sel) mineToggle(st.sel); });
document.getElementById("mineList").addEventListener("click",e=>{ const b=e.target.closest("[data-unmine]"); if(!b) return; const v=b.dataset.unmine;
  if(v==="all"){ MY.c.clear(); MY.s.clear(); MY.on=false; savePrefs(); syncMine(); toast("مسحنا نجومي، فعادت السماء كلها."); return; }
  const i=v.indexOf(":"), t=v.slice(0,i), id=t==="star"?+v.slice(i+1):v.slice(i+1); setMine(t,id,false); });
document.getElementById("mineOn").onclick=()=>{ if(!MY.c.size&&!MY.s.size) return; MY.on=!MY.on; savePrefs(); syncMine(); toast(MY.on?`تعرض السماء الآن نجومي وحدها (${myCount(MY)}) مع الكواكب والقمر والشمس.`:"عادت السماء كلها، وبقي اختيارك محفوظاً."); };
document.getElementById("mineDim").onchange=e=>{ MY.dim=e.target.checked; savePrefs(); syncMine(); };
// وضع الاختيار: كل ضغطة على نجم تضيفه أو تزيله، وعلى غيره تضيف الكوكبة التي في ذلك المكان
function pickText(){ const A=PICK.t==="mine"?MY:HID, n=myCount(A);
  document.getElementById("pickTxt").textContent=(PICK.t==="mine"?"اضغط النجوم والكوكبات التي تريد أن تبقى ظاهرة، والضغطة الثانية تلغي الاختيار. ":"اضغط النجوم والكوكبات التي تريد إخفاءها، والضغطة الثانية تلغي الإخفاء. ")+(n?`اخترت ${n}.`:"لم تختر شيئاً بعد."); }
function pickStart(t){ if(EMBED) return; if(AR.on&&!AR.paused) arPause(); closeSheets(); showInfo(null); st.sel=st.focus?{type:"con",id:st.focus}:null; if(st.focus) exitFocus(); setClean(false,true);
  PICK.on=true; PICK.t=t; document.getElementById("pickBar").hidden=false; pickText(); hudKey=""; dirty=true; }
function pickEnd(){ if(!PICK.on) return; PICK.on=false; document.getElementById("pickBar").hidden=true; const A=PICK.t==="mine"?MY:HID, n=myCount(A);
  if(PICK.t==="mine"&&n){ MY.on=true; savePrefs(); syncMine(); toastAct(`تعرض السماء الآن ما اخترته (${n})، والباقي ${MY.dim?"باهت":"مخفي"}.`,"أظهر كل شيء",()=>{ MY.on=false; savePrefs(); syncMine(); }); }
  else if(PICK.t==="hide"&&n) toast(`أخفينا ${n}، وتظهرها من «الطبقات»، «نجومي».`);
  syncHide(); syncMine(); hudKey=""; dirty=true; }
function pickToggleAt(x,y){ const sel=hitAt(x,y,["star"])||conAt(x,y); if(!sel) return; const A=PICK.t==="mine"?MY:HID, S=sel.type==="con"?A.c:A.s;
  if(S.has(sel.id)) S.delete(sel.id); else S.add(sel.id); if(PICK.t==="mine"&&!MY.c.size&&!MY.s.size) MY.on=false; savePrefs(); pickText(); haptic(); hudKey=""; dirty=true; }
// علامات الاختيار فوق السماء أثناء وضع الاختيار: حلقة ذهبية للمختار (حمراء لما سيُخفى)، واسم الكوكبة المختارة في إطار
function drawPickMarks(){ if(!PICK.on) return; const A=PICK.t==="mine"?MY:HID, col=PICK.t==="mine"?"#e8c46a":"#ff8a7a", visible=v=>st.mode==="atlas"||belowOn()||dot(MR[2],v)>-0.026; ctx.save(); ctx.lineWidth=2; ctx.strokeStyle=col;
  for(const hip of A.s){ const v=starV(hip); if(!v||!visible(v)) continue; const p=projJ(v); if(!onScreen(p,10)) continue; ctx.beginPath(); ctx.arc(p[0],p[1],9,0,Math.PI*2); ctx.stroke(); }
  ctx.font="700 13px "+FUI; ctx.textAlign="center"; ctx.textBaseline="middle"; ctx.direction="rtl";
  for(const c of CONLAB){ if(!A.c.has(c.id)||!visible(c.v)) continue; const p=projJ(c.v); if(!onScreen(p,30)) continue; const t=hidName("con",c.id), w=ctx.measureText(t).width+18;
    ctx.fillStyle="rgba(10,14,30,.75)"; ctx.beginPath(); ctx.roundRect?ctx.roundRect(p[0]-w/2,p[1]-13,w,26,13):ctx.rect(p[0]-w/2,p[1]-13,w,26); ctx.fill(); ctx.stroke(); ctx.fillStyle=col; ctx.fillText(t,p[0],p[1]+1); }
  ctx.restore(); }
document.getElementById("minePick").onclick=()=>pickStart("mine");
document.getElementById("hidePick").onclick=()=>pickStart("hide");
document.getElementById("pickDone").onclick=pickEnd;
document.getElementById("pickClear").onclick=()=>{ const A=PICK.t==="mine"?MY:HID; A.c.clear(); A.s.clear(); if(PICK.t==="mine") MY.on=false; savePrefs(); pickText(); hudKey=""; dirty=true; };
// الضغطة الطويلة (نصف ثانية بلا حركة) على الهاتف، والزر الأيمن على الحاسوب
const LP={t:0,fired:false,last:0,closed:0}, lpMenu=document.getElementById("lpMenu");
function lpClose(){ if(lpMenu.hidden) return; lpMenu.hidden=true; LP.closed=performance.now(); }
function openLp(x,y){ if(EMBED||PICK.on) return; let sel=hitAt(x,y,["star","body","dso"]); if(!sel&&!behindTerrain(x,y)) sel=conAt(x,y); if(!sel) return;
  LP.last=performance.now(); if(!st.seen.lp){ st.seen.lp=1; savePrefs(); } haptic(); if(navigator.vibrate&&COARSE) try{ navigator.vibrate(12); }catch(e){}
  const so=sel.type==="star"||sel.type==="con", what=sel.type==="con"?"الكوكبة":"النجم";
  let name=so?hidName(sel.type,sel.id):""; if(sel.type==="body"){ const b=bodies.find(q=>q.id===sel.id); name=b?b.ar:""; } if(sel.type==="dso"){ const d=SKY.dsos.find(q=>q.id===sel.id); name=d?(d.ar||d.id):""; }
  const items=[["info","تفاصيله"]];
  if(so){ items.push(["only",`اعرض ${what} ${sel.type==="con"?"وحدها":"وحده"}`],["mine",isMine(sel)?"أزله من نجومي":"أضفه إلى نجومي"],["hide",isHidden(sel)?`أظهر ${what}`:`أخفِ ${what}`]); }
  else items.push(["zoom","قرّب إليه"]);
  lpMenu.innerHTML=`<p class="lpH">${esc(name)}</p>`+items.map(([k,t])=>`<button role="menuitem" data-lp="${k}">${t}</button>`).join("");
  lpMenu._sel=sel; lpMenu.hidden=false; const r=lpMenu.getBoundingClientRect(); lpMenu.style.left=Math.max(8,Math.min(W-r.width-8,x-r.width/2))+"px"; lpMenu.style.top=Math.max(8,Math.min(Ht-r.height-8,y-r.height-18))+"px";
  if(KBD) try{ lpMenu.querySelector("button").focus(); }catch(e){} }
lpMenu.addEventListener("click",e=>{ const b=e.target.closest("[data-lp]"); if(!b) return; const k=b.dataset.lp, sel=lpMenu._sel; lpClose(); if(!sel) return;
  if(k==="info") pickTap(sel); else if(k==="only") showOnly(sel); else if(k==="mine") mineToggle(sel);
  else if(k==="hide"){ const on=!isHidden(sel); if(on&&st.sel&&st.sel.type===sel.type&&st.sel.id===sel.id){ showInfo(null); st.sel=null; } if(on&&sel.type==="con"&&st.focus===sel.id) exitFocus(); setHidden(sel.type,sel.id,on); toast(on?`أخفينا «${hidName(sel.type,sel.id)}»، وتظهره من «الطبقات»، «نجومي».`:`أظهرنا «${hidName(sel.type,sel.id)}» من جديد.`); }
  else if(k==="zoom"){ if(sel.type==="body"&&PL_DISC[sel.id]) zoomToPlanet(sel.id); else { const v=selVec(sel); if(v) animateTo(v,Math.max(fovLo(),st.fov/2.2)); } } });
document.addEventListener("pointerdown",e=>{ if(!lpMenu.hidden&&!lpMenu.contains(e.target)) lpClose(); },true);
cv.addEventListener("contextmenu",e=>{ e.preventDefault(); if(performance.now()-LP.last<900) return; openLp(e.clientX,e.clientY); });
// تلميح يعرّف بالضغطة الطويلة حين تُفتح بطاقة نجم أو كوكبة، أول ثلاث مرات وحتى يستعملها القارئ. رسالة أعلى الشاشة لا سطر في البطاقة،
// لأن البطاقة الأطول على الهاتف تغطي النجم فتضيع الضغطة الثانية من الضغطتين للتقريب
function lpTip(sel){ if(EMBED||st.seen.lp||!(sel.type==="star"||sel.type==="con")) return; const n=st.seen.lpTip||0; if(n>=3) return; st.seen.lpTip=n+1; savePrefs();
  setTimeout(()=>{ const t=document.getElementById("toast"); if(!t.hidden) return; toast((COARSE?"تلميح: اضغط مطولاً على أي نجم أو كوكبة":"تلميح: اضغط بزر الفأرة الأيمن على أي نجم أو كوكبة")+" لتعرضه وحده أو تخفيه أو تضيفه إلى نجومي."); },700); }
// أقسام «الطبقات»: ما يظهر، ونجومي، والشكل
let VTAB="show"; function setVtab(t){ VTAB=t; document.querySelectorAll("[data-vtab]").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.vtab===t))); document.querySelectorAll("#viewSheet [data-vt]").forEach(el=>el.classList.toggle("vt-off",el.dataset.vt!==t)); }
document.querySelector(".vtabs").addEventListener("click",e=>{ const b=e.target.closest("[data-vtab]"); if(b) setVtab(b.dataset.vtab); });
setVtab("show");
document.getElementById("bClean").onclick=()=>setClean(true);
(function(){
  const inp=document.getElementById("hideQ"), ul=document.getElementById("hideQL"); let hits=[], cur=-1;
  const close=()=>{ ul.hidden=true; inp.setAttribute("aria-expanded","false"); cur=-1; };
  const mark=()=>[...ul.children].forEach((li,i)=>li.setAttribute("aria-selected",i===cur?"true":"false"));
  function find(){ if(!inp.value.trim()) return close();
    hits=search(inp.value,e=>(e.sel.type==="con"||e.sel.type==="star")&&!isHidden(e.sel)).slice(0,8); cur=hits.length?0:-1;
    ul.innerHTML=hits.length?hits.map((e,i)=>`<li role="option" data-i="${i}"><b>${esc(e.label)}</b><span>${esc(e.kind)}</span></li>`).join(""):`<li class="none" role="option" aria-disabled="true">لا توجد كوكبة أو نجم بهذا الاسم</li>`;
    ul.hidden=false; inp.setAttribute("aria-expanded","true"); mark(); }
  const choose=i=>{ const e=hits[i]; if(!e) return; inp.value=""; close(); const {type,id}=e.sel;
    if(st.sel&&st.sel.type===type&&st.sel.id===id){ showInfo(null); st.sel=st.focus&&!(type==="con"&&st.focus===id)?{type:"con",id:st.focus}:null; }
    if(type==="con"&&st.focus===id) exitFocus();
    setHidden(type,id,true); toast(`أخفينا «${hidName(type,id)}».`); };
  inp.addEventListener("input",find);
  inp.addEventListener("keydown",e=>{ e.stopPropagation(); if(ul.hidden&&e.key!=="Enter") return; if(e.key==="ArrowDown"||e.key==="ArrowUp"){ e.preventDefault(); if(!hits.length) return; cur=(cur+(e.key==="ArrowDown"?1:-1)+hits.length)%hits.length; mark(); } else if(e.key==="Enter"){ e.preventDefault(); if(cur>=0) choose(cur); } else if(e.key==="Escape"){ close(); } });
  ul.addEventListener("mousedown",e=>{ e.preventDefault(); const li=e.target.closest("li[data-i]"); if(li) choose(+li.dataset.i); });
  inp.addEventListener("blur",()=>setTimeout(close,120));
})();
syncHide(); syncMine();
// «ما تحت الأفق» مؤقت (#379): حين يشغّله فتحُ جرم تحت الأفق يعود كما كان إذا أُغلقت البطاقة ولم يبقَ جرم مختار، ولا يُحفظ في التفضيلات
let BELOW_TMP=false;
function tmpBelow(){ BELOW_TMP=true; st.layers.below=true; const b=document.getElementById("ly-below"); if(b) b.setAttribute("aria-pressed","true"); hudKey=""; dirty=true; }
function belowTmpCheck(){ if(BELOW_TMP&&!st.sel&&!st.focus){ BELOW_TMP=false; setLayer("below",false); } }
function setLayer(k,v){ if(k==="below") BELOW_TMP=false; st.layers[k]=v; const b=document.getElementById("ly-"+k); if(b) b.setAttribute("aria-pressed",!!v); savePrefs(); if(k==="below"&&!v&&st.mode==="sky"&&st.alt<altLow()){ st.anim=null; animateView({az:st.az,alt:altLow(),fov:st.fov}); } hudKey=""; dirty=true; if(typeof syncQuick==="function") syncQuick(); }
const pillsEl=document.getElementById("pills");
pillsEl.innerHTML=PILLS.map(p=>`<button data-pill="${p[0]}:${p[1]}">${p[2]}</button>`).join("");
pillsEl.addEventListener("click",e=>{ const b=e.target.closest("[data-pill]"); if(!b) return; const [t,id]=b.dataset.pill.split(":");
  if((t==="con"&&st.focus===id)||(t==="ast"&&st.ast===id)||(t==="route"&&st.route===id)||(t==="north"&&st.route&&st.route.startsWith("polaris"))){ exitFocus(); return; } closeSheets(); st.tour=-1; document.getElementById("btnTour").setAttribute("aria-pressed","false"); go({type:t,id}); updateFocusBar(); });
function markPills(){ pillsEl.querySelectorAll("[data-pill]").forEach(b=>{ const [t,id]=b.dataset.pill.split(":"); b.classList.toggle("on",(t==="con"&&st.focus===id)||(t==="ast"&&st.ast===id)||(t==="route"&&st.route===id)||(t==="north"&&!!st.route&&st.route.startsWith("polaris"))||(t==="dso"&&st.sel&&st.sel.type==="dso"&&st.sel.id===id)); }); }
// تعريف أول زيارة: ست خطوات قصيرة، كل خطوة تضيء زراً واحداً، ويمكن إعادته من القائمة
function introWanted(){ return !EMBED&&!st.seen.intro&&!(location.hash||"").slice(1)&&!/[?&]o=/.test(location.search)&&!/[?&](ar|sensor)\b/.test(location.search)&&(!/[?&]debug/.test(location.search)||/[?&]intro/.test(location.search)); }
const INTRO=[
  [null,"أهلاً بك في أطلس السماء",()=>`هذه سماء ${placeName()} الآن كما تراها بعينك، والأفق في أسفل الشاشة. اسحب لتتحرك، وكبّر ${matchMedia("(pointer:coarse)").matches?"بإصبعين":"بعجلة الفأرة"}، واضغط على أي نجم لتعرف اسمه العربي وقصته. وإن بحثت عن نجم أو كوكبة من أعلى الشاشة ظهر ما تبحث عنه واضحاً مع كوكبته وبهتت بقية السماء.`],
  ["btnTonight","الآن في السماء",()=>"قائمة بما يظهر فوق أفقك الآن: القمر والكواكب وألمع النجوم، ومتى يغرب كل منها، والكوكبات الواضحة فوقك."],
  ["btnTime","الوقت",()=>"اسحب شريط الزمن لترى السماء في أي ساعة من الليلة، أو انتقل إلى يوم آخر لترى ما يظهر في فصل آخر."],
  [()=>arBtn.hidden?"b3d":"btnAR",()=>arBtn.hidden?"منظر 3D":"يتبع هاتفك",()=>arBtn.hidden?"اضغط 3D لتقف في المكان وترى السماء حولك كما تراها عينك، فتدير رأسك يميناً ويساراً وترفعه إلى أعلى، واضغطه مرة أخرى للإغلاق.":"ارفع هاتفك نحو السماء فتتحرك السماء على الشاشة معه، وتظهر أسماء النجوم التي أمامه. وإن أردت أن تحرك السماء بإصبعك فاختر «بإصبعك» من أسفل الشاشة."],
  ["btnView","الطبقات",()=>"اختر ما يظهر على السماء، وبدّل بين سماء مكانك والأطلس الكامل، وشغّل الرؤية الليلية حين تكون في الخارج. والمدينة تغيّرها من أعلى الشاشة."],
  ["bClean","تحكّم سريع في السماء",()=>(matchMedia("(pointer:coarse)").matches?"اضغط مطولاً على أي نجم أو كوكبة":"اضغط بزر الفأرة الأيمن على أي نجم أو كوكبة")+" لتعرضه وحده أو تخفيه أو تضيفه إلى «نجومي»، فتبقى في السماء النجوم التي تختارها وحدها. وزر العين هذا يخفي الأدوات كلها لتبقى السماء وحدها، وزر «الأدوات» يعيدها."]];
const intro={i:-1}, introEl=document.getElementById("intro");
const val=x=>typeof x==="function"?x():x;
function introShow(){ const s=INTRO[intro.i], id=val(s[0]), el=id&&document.getElementById(id), ring=document.getElementById("introRing"), card=document.getElementById("introCard");
  document.getElementById("introT").textContent=val(s[1]); document.getElementById("introP").textContent=s[2]();
  document.getElementById("introDots").innerHTML=INTRO.map((_,k)=>`<i class="${k===intro.i?"on":""}"></i>`).join("");
  document.getElementById("introNext").textContent=intro.i===INTRO.length-1?"ابدأ":"التالي";
  if(el&&!el.hidden){ const r=el.getBoundingClientRect(); Object.assign(ring.style,{left:r.left-5+"px",top:r.top-5+"px",width:r.width+10+"px",height:r.height+10+"px"}); ring.hidden=false; introEl.classList.remove("dim"); card.classList.remove("mid"); }
  else { ring.hidden=true; introEl.classList.add("dim"); card.classList.add("mid"); }
  document.getElementById("introNext").focus(); }
function introStart(){ if(document.body.classList.contains("ar")) return; closeSheets(); openFlipPick(false); if(st.clean) setClean(false,true); intro.i=0; introEl.hidden=false; introShow(); }
function introEnd(){ introEl.hidden=true; intro.i=-1; st.seen.intro=1; savePrefs(); if(typeof arAuto==="function") setTimeout(arAuto,250); }
document.getElementById("introNext").onclick=()=>{ if(intro.i>=INTRO.length-1) introEnd(); else { intro.i++; introShow(); } };
document.getElementById("introSkip").onclick=introEnd;
document.getElementById("btnIntro").onclick=()=>{ closeSheets(); introStart(); };
introEl.addEventListener("keydown",e=>{ if(e.key==="Escape"){ e.stopPropagation(); introEnd(); } });
window.addEventListener("resize",()=>{ if(intro.i>=0) introShow(); });
window.atlasToast=t=>{ const el=document.getElementById("toast"), wait=el.classList.contains("act")&&!el.hidden; if(wait) setTimeout(()=>window.atlasToast(t),1500); else toast(t); };
let toastT=0; function toast(t){ const el=document.getElementById("toast"); el.classList.remove("act"); el.textContent=t; el.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>el.hidden=true,3500); }
function toastAct(t,label,fn){ const el=document.getElementById("toast"), b=document.createElement("button"); el.textContent=t+" "; b.className="tact"; b.textContent=label;
  b.onclick=()=>{ fn(); el.hidden=true; el.classList.remove("act"); }; el.append(b); el.classList.add("act"); el.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>{ el.hidden=true; el.classList.remove("act"); },8000); }

// المكان
// مدن العالم كلها (#320، طلب المالك: «ضيف المدن كلها … طالما ده مش هيتقل سرعة الموقع»): 33,641 مدينة من GeoNames في
// /atlas/places/ (يكتبها scripts/atlas_places.py)، لا يُحمَّل منها شيء مع الصفحة: قائمة الدول حين يُفتح اختيار المكان،
// ومدن الدولة حين تُختار، وملف البحث لأول حرف يكتبه القارئ. أسماء الدول من المتصفح (Intl.DisplayNames).
const cityEl=document.getElementById("city"), ccEl=document.getElementById("country");
ccEl.innerHTML=COUNTRIES_AR.map(k=>`<option value="${k[0]}">${k[1]}</option>`).join("")+`<option value="custom">إحداثيات أخرى</option>`;
const PLACES="/atlas/places/", ARAB_CC=new Set(COUNTRIES_AR.map(k=>k[0])), WROWS={}, WC={}, WQ={};
// حاجز التكرار (#376): مدينة من مدننا لا تظهر مرة ثانية من ملفات مدن العالم (ملف قديم في ذاكرة المتصفح، أو مدينة أضيفت بعد كتابتها): نفس القاعدة التي يطبّقها scripts/atlas_places_arab.mjs على الملفات (8 كم أو أقل في الدولة نفسها)
const OWNK=(()=>{ const m={}; for(const c of CITIES){ if(!c[5]) continue; const k=c[5]+Math.floor(c[2])+","+Math.floor(c[3]); (m[k]||(m[k]=[])).push(c); } return m; })();
const nearOwn=(cc,la,lo,r)=>{ for(let dy=-1;dy<=1;dy++) for(let dx=-1;dx<=1;dx++) for(const c of OWNK[cc+(Math.floor(la)+dy)+","+(Math.floor(lo)+dx)]||[]) if(111.2*Math.hypot(la-c[2],(lo-c[3])*Math.cos(la*D2R))<=r) return true; return false; };
let DN=null; try{ DN=new Intl.DisplayNames(["ar"],{type:"region"}); }catch(e){}
const ccName=cc=>{ const k=COUNTRIES_AR.find(x=>x[0]===cc); if(k) return k[1]; try{ return (DN&&DN.of(cc))||cc; }catch(e){ return cc; } };
const cityRow=id=>CITIES.find(x=>x[0]===id)||WROWS[id]||(WCITY&&WCITY[0]===id?WCITY:null);
const getJSON=u=>fetch(u).then(r=>r.ok?r.json():null).catch(()=>null);
function countryCities(cc){ return WC[cc]||(WC[cc]=getJSON(PLACES+"c/"+cc+".json").then(d=>d?d.c.filter(r=>!nearOwn(cc,r[2],r[3],8)).map(r=>(WROWS[r[0]]=[r[0],r[1],r[2],r[3],d.tz[r[4]],cc,r[5]||""])):[])); }
let worldP=null;
function loadWorld(){ return worldP||(worldP=getJSON(PLACES+"countries.json").then(list=>{ if(!list) return; const coll=new Intl.Collator("ar");
  const opts=list.filter(x=>!ARAB_CC.has(x[0])).map(x=>[x[0],ccName(x[0])]).sort((a,b)=>coll.compare(a[1],b[1]));
  const og=document.createElement("optgroup"); og.label="دول العالم"; og.innerHTML=opts.map(([c,n])=>`<option value="${c}">${esc(n)}</option>`).join("");
  ccEl.insertBefore(og,ccEl.querySelector('option[value="custom"]')); if(WCITY&&WCITY[0]===st.city) syncPlaceForm(); })); }
// مدن الدولة: المراجعة أولاً (في الدول العربية)، ثم بقية مدنها من GeoNames، الأكبر سكاناً أولاً
let fillTok=0;
function fillCities(cc,sel){ const tok=++fillTok, cur=CITIES.filter(c=>c[5]===cc);
  document.getElementById("city").parentElement.hidden=cc==="custom"; if(cc==="custom"){ cityEl.innerHTML=""; return Promise.resolve(); }
  const put=extra=>{ if(tok!==fillTok) return; const more=(extra||[]).map(c=>`<option value="${c[0]}">${esc(c[1])}${c[6]?"، "+esc(c[6]):""}</option>`).join(""); // المحافظة لمدينتين بالاسم نفسه (#399)
    cityEl.innerHTML=cur.map(c=>`<option value="${c[0]}">${c[1]}</option>`).join("")+(more?(cur.length?`<optgroup label="مدن أخرى">${more}</optgroup>`:more):""); if(sel) cityEl.value=sel; };
  put(null); return countryCities(cc).then(put); }
function pickCity(id){ if(!id) return; if(CITIES.some(x=>x[0]===id)) setPlace(id); else if(WROWS[id]) setPlace(id,0,0,WROWS[id]); }
ccEl.onchange=()=>{ const cc=ccEl.value; if(cc==="custom"){ fillCities("custom"); document.getElementById("customBox").hidden=false; setPlace("custom",+document.getElementById("lat").value||st.lat,+document.getElementById("lon").value||st.lon); return; }
  document.getElementById("customBox").hidden=true; const p=fillCities(cc); if(ARAB_CC.has(cc)) pickCity(cityEl.value); else p.then(()=>{ if(ccEl.value===cc) pickCity(cityEl.value); }); };
// «استعمل موقعي الحالي»: كان فشل المتصفح يمر بلا كلمة فيبقى الأطلس على القاهرة (#349، المالك في جدة)، فالآن رسالة لكل سبب، كما في src/lib/geo_msg.js
function geoErr(e){ const c=e&&e.code;
  if(c===1) return "لم يسمح المتصفح لهذا الموقع بمعرفة مكانك، فاسمح له من إعدادات المتصفح ثم اضغط زر الموقع مرة أخرى، أو اختر مدينتك من القائمة.";
  if(c===2) return "لم يعرف جهازك مكانه الآن، فشغّل خدمة الموقع في الهاتف ثم اضغط زر الموقع مرة أخرى، أو اختر مدينتك من القائمة.";
  if(c===3) return "طال انتظار موقعك من الجهاز، فاضغط زر الموقع مرة أخرى، أو اختر مدينتك من القائمة.";
  return "لا يعطي متصفحك موقعك، فاختر مدينتك من القائمة."; }
document.getElementById("myLoc").onclick=()=>{ const b=document.getElementById("myLoc"), m=document.getElementById("locMsg"), say=t=>{ m.textContent=t; m.hidden=!t; };
  if(!navigator.geolocation||!window.isSecureContext) return say(geoErr(null));
  b.disabled=true; say("نبحث عن موقعك…");
  navigator.geolocation.getCurrentPosition(p=>{ b.disabled=false; say(""); setPlace("custom",Math.round(p.coords.latitude*100)/100,Math.round(p.coords.longitude*100)/100); syncPlaceForm(); },e=>{ b.disabled=false; say(geoErr(e)); },{timeout:12000,maximumAge:600000}); };
// أول زيارة بلا مدينة محفوظة (#349): كان الأطلس يبدأ بالقاهرة دائماً، فالآن بترتيب أدوات الموقع (#314): أقرب مدينة إلى موقع الزائر
// التقريبي من Cloudflare (/weather/here.json، 300 كم أو أقل)، ثم أول مدن دولته، ثم مدينة في منطقته الزمنية، وإلا تبقى القاهرة
function guessPlace(){ const t0=st.city, ac=window.AbortController?new AbortController():null, tm=setTimeout(()=>ac&&ac.abort(),2500), real=x=>x[0]!=="custom";
  fetch("/weather/here.json",ac?{signal:ac.signal}:{}).then(r=>r.ok?r.json():null).catch(()=>null).then(h=>{ clearTimeout(tm);
    let c=h&&h.slug&&CITIES.find(x=>real(x)&&x[0]===h.slug);
    if(!c&&h&&h.cc) c=CITIES.find(x=>real(x)&&x[5]===h.cc);
    // «UTC» الخام من الجهاز لا يعني المغرب (مدنه عندنا على UTC): متصفحات تخفي منطقتها تعطيه، فلا يُخمَّن منه شيء
    if(!c){ let z=""; try{ z=Intl.DateTimeFormat().resolvedOptions().timeZone||""; }catch(e){} if(/^(Etc\/|UTC$|GMT$)/.test(z)) z=""; if(z==="Africa/Casablanca"||z==="Africa/El_Aaiun") z="UTC"; if(z==="Asia/Jerusalem") z="Asia/Hebron"; c=z&&CITIES.find(x=>real(x)&&x[4]===z); }
    if(c&&st.city===t0&&c[0]!==st.city){ setPlace(c[0]); if(!document.getElementById("placeSheet").hidden) syncPlaceForm(); } }); }
function syncPlaceForm(){ const c=cityRow(st.city), cc=c&&c[5]?c[5]:"custom"; ccEl.value=cc; fillCities(cc,st.city); cityEl.value=st.city; document.getElementById("customBox").hidden=st.city!=="custom"; document.getElementById("lat").value=st.lat; document.getElementById("lon").value=st.lon; }
function syncWhen(){ const p=tzParts(st.t),z=n=>String(n).padStart(2,"0"); whenEl.value=`${p.y}-${z(p.mo)}-${z(p.d)}T${z(p.h)}:${z(p.mi)}`; }
// إحداثيات يكتبها القارئ بيده قد تكون بعيدة عن مكانه، فتوقيت الجهاز يعطي شروقاً في العصر. إن فرق توقيت الجهاز عن خط الطول
// ساعتين أو أكثر استعملنا توقيتاً تقريبياً من خط الطول (ساعة لكل 15 درجة)، ويقول العنوان ذلك. «موقعي الحالي» يبقى بتوقيت الجهاز.
function lonTz(lon){ const dev=Intl.DateTimeFormat().resolvedOptions().timeZone||null, n=Math.max(-12,Math.min(12,Math.round(lon/15)));
  let off=0; try{ off=-new Date().getTimezoneOffset()/60; }catch(e){} if(Math.abs(off-lon/15)<2) return dev; return n===0?"UTC":"Etc/GMT"+(n>0?"-":"+")+Math.abs(n); }
function whenLabel(){ const l=document.querySelector('label[for="when"]'); if(!l) return; const z=String(st.tz||""), dev=Intl.DateTimeFormat().resolvedOptions().timeZone||"", m=/^Etc\/GMT([+-])(\d+)$/.exec(z), approx=st.city==="custom"&&z!==dev&&(m||z==="UTC");
  l.textContent="التاريخ والوقت "+(st.city!=="custom"||(NEAR&&NEAR.tz===z)?"(بتوقيت المكان)":approx?"(بتوقيت تقريبي من خط الطول، \u2066UTC"+(m?(m[1]==="-"?"+":"−")+m[2]:"")+"\u2069)":"(بتوقيت جهازك)"); }
// ---------- اسم المكان من الإحداثيات (#341): من أماكن GeoNames المأهولة (500 نسمة فأكثر) في مربعات 2° تُحمَّل عند الحاجة فقط.
// القارئ «في» المكان إن كان داخل نصف قطره (من عدد سكانه). إن لم يكن داخل مكان فالمحافظة والدولة من أقرب مكان (حتى 150 كم)، بلا «قرب كذا». الحساب كله في المتصفح.
const NEARC={};
function nearLoad(k){ return NEARC[k]||(NEARC[k]=fetch("/atlas/near/"+k+".json").then(r=>r.ok?r.json():null).catch(()=>null)); }
function nearKeys(lat,lon){ const y=(lat+90)/2, x=(lon+180)/2, i=Math.min(89,Math.max(0,Math.floor(y))), j=((Math.floor(x)%180)+180)%180, my=0.2, mx=Math.min(0.5,0.2/Math.max(0.1,Math.cos(lat*D2R)));
  const di=[0], dj=[0]; if(y-i<my&&i>0) di.push(-1); if(i+1-y<my&&i<89) di.push(1); if(x-Math.floor(x)<mx) dj.push(-1); if(Math.floor(x)+1-x<mx) dj.push(1);
  const ks=[]; for(const a of di) for(const b of dj) ks.push((i+a)+"_"+(((j+b)%180)+180)%180); return ks; }
async function nearFind(lat,lon){ const ts=await Promise.all(nearKeys(lat,lon).map(nearLoad)); let best=null,bs=1e9,far=null,fd=150,near=null,nd=1e9,core=null; const cl=Math.cos(lat*D2R);
  for(const t of ts){ if(!t) continue; for(const p of t.p){ let dx=Math.abs(p[1]-lon); if(dx>180) dx=360-dx; const d=111.2*Math.hypot(p[0]-lat,dx*cl); if(d<fd){ fd=d; far=[t,p]; } if(d<=p[5]){ const sc=d/p[5]; if(sc<bs){ bs=sc; best=[t,p]; } if(d<1.5&&d<nd){ nd=d; near=[t,p]; } if(sc<0.35&&(!core||p[5]>core[1][5])) core=[t,p]; } } }
  // قلب أكبر مدينة تحوي النقطة (الثلث الداخلي من نصف قطرها) يغلب أحياءها ودوائرها وما التصق بها؛ خارجه يغلب المكان الذي أنت فيه فعلاً (أقل من 1.5 كم)
  if(core) best=core; else if(near) best=near;
  const k=best||far; if(!k) return null; const a=k[0].a[k[1][3]]||["",""]; return {n:best?k[1][2]:"",a:a[1]||"",cc:a[0]||"",tz:k[0].tz[k[1][4]]||null}; }
const admShort=a=>String(a||"").replace(/^(محافظة|منطقة|ولاية|إمارة|إقليم|مقاطعة|جهة)\s+/,"");
// الاسم القصير (أعلى الشاشة وفي البطاقات) والكامل (في لوح المكان): «سمالوط» و«سمالوط، محافظة المنيا، مصر»
function nearShort(){ return NEAR?(NEAR.n||NEAR.a||ccName(NEAR.cc)):""; }
function nearFull(){ if(!NEAR) return ""; const out=[]; if(NEAR.n) out.push(NEAR.n); if(NEAR.a&&admShort(NEAR.a)!==NEAR.n) out.push(NEAR.a); if(NEAR.cc) out.push(ccName(NEAR.cc)); return out.join("، "); }
function nearName(){ if(EMBED||st.city!=="custom") return; const la=st.lat, lo=st.lon;
  nearFind(la,lo).then(r=>{ if(st.city!=="custom"||st.lat!==la||st.lon!==lo) return; NEAR=r; if(r&&r.tz&&okTz(r.tz)) st.tz=r.tz;
    savePrefs(); updateWhere(); refreshInfo(); whenLabel(); if(!document.getElementById("timeSheet").hidden){ syncWhen(); scrub.key=""; syncScrub(); } if(!document.getElementById("tonightSheet").hidden) buildTonight(); dirty=true; }); }
function setPlace(id,lat,lon,row,typed){ clearSearch(); if(row) WCITY=row; const c=cityRow(id); st.city=id; if(id==="custom"||!c){ st.city="custom"; st.lat=lat; st.lon=lon; st.tz=typed?lonTz(lon):(Intl.DateTimeFormat().resolvedOptions().timeZone||null); } else { st.lat=c[2]; st.lon=c[3]; st.tz=c[4]; }
  NEAR=null; obs=new A.Observer(st.lat,st.lon,0); M=null; savePrefs(); updateWhere(); refreshInfo(); whenLabel(); dirty=true; nearName(); }
cityEl.onchange=()=>{ document.getElementById("customBox").hidden=true; pickCity(cityEl.value); };
// البحث بالاسم في مدن كل الدول (#307، طلب المالك: كل قائمة مدن بلا بحث يكون فيها بحث)، بالتطبيع نفسه في PickSearch بالموقع
(function(){
  const inp=document.getElementById("placeQ"), ul=document.getElementById("placeQL");
  const norm=s=>String(s).toLowerCase().replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآٱ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/ؤ/g,"و").replace(/ئ/g,"ي").replace(/[-_()]/g," ").replace(/\s+/g," ").trim();
  const strip=n=>n.split(" ").map(w=>w.replace(/^ال(?=..)/,"")).join(" ");
  // مثل norm في scripts/atlas_places.py: التطبيع العربي ثم نزع علامات الحروف اللاتينية، فيجد «Zurich» مدينة Zürich
  // وحروف لا يفككها NFD (#388: «Tromso» تجد Tromsø)، مثل FOLD في atlas_places_arab.mjs وatlas_places.py
  const FOLD={"ø":"o","æ":"ae","œ":"oe","ß":"ss","ł":"l","đ":"d","ð":"d","þ":"th","ı":"i","ə":"e","ħ":"h","ŧ":"t","ŋ":"n","ʻ":"","ʼ":""};
  const normW=s=>norm(String(s).toLowerCase().replace(/[øæœßłđðþıəħŧŋʻʼ]/g,ch=>FOLD[ch]).replace(/['’.,]/g," ")).normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  const CN=Object.fromEntries(COUNTRIES_AR.map(k=>[k[0],k[1]]));
  // اسم آخر معروف للمدينة (مثل alt في src/lib/wx_cities.js): «طور سيناء» تجد الطور
  // (#388) وأسماء يبحث بها الناس عن مكان في قايمتنا باسم آخر: الأحساء ← الهفوف، بابل ← الحلة، سقطرى ← حديبو
  const CITY_ALT={"el-tor":["طور سيناء"],"ras-mohammed":["محمية رأس محمد"],"al-hufuf":["الأحساء"],"al-hillah":["بابل"],"hadibu":["سقطرى"],"wadi-musa":["وادي موسى"],"bawiti":["الباويطي"],"ouadane":["وادان"],"mut":["موط"]};
  let idx=null, hits=[], cur=-1;
  const close=()=>{ ul.hidden=true; inp.setAttribute("aria-expanded","false"); cur=-1; };
  const mark=()=>[...ul.children].forEach((li,i)=>li.setAttribute("aria-selected",i===cur?"true":"false"));
  function find(){
    if(!idx) idx=CITIES.filter(c=>c[5]).flatMap(c=>{ const n=normW(c[1]), s=norm(CN[c[5]]||""); return [{ c, n, b:strip(n), e:"", s }].concat((CITY_ALT[c[0]]||[]).map(a=>({ c, n, b:strip(n), e:normW(a), s }))); });
    const q=normW(inp.value), qb=strip(q); if(!q) return close();
    // مدن العالم: ملف البحث لأول حرف من أول كلمة (بلا «ال»)، يُحمَّل مرة واحدة، ثم يعاد البحث حين يصل
    let wl=[], wait=false; const k=qb.trim()[0];
    if(k&&!/^ال?$/.test(q)){ const h=k.codePointAt(0).toString(16);
      if(!(h in WQ)){ WQ[h]=null; // ملف مدن العالم (15 ألف ساكن فأكثر) وملف القرى والمنتجعات العربية qa/ (#367: دهب ونويبع لم يكونا يظهران)
        const rowsOf=(d,strict)=>d?d.c.filter(r=>!strict||!nearOwn(r[3],r[4],r[5],8)).map(r=>{ const row=[r[0],r[1]||r[2],r[4],r[5],d.tz[r[6]],r[3],r[7]||""], n=normW(r[1]||r[2]); return { c:row, n, b:strip(n), e:r[1]&&r[2]?normW(r[2]):"", s:"" }; }):[];
        Promise.all([getJSON(PLACES+"q/"+h+".json"),getJSON(PLACES+"qa/"+h+".json")]).then(([d,a])=>{ WQ[h]=rowsOf(d,true).concat(rowsOf(a)); if(!ul.hidden||document.activeElement===inp) find(); }); }
      if(WQ[h]) wl=WQ[h]; else wait=true; }
    const sc=e=>e.n===q||e.b===qb||e.e===q?0:e.n.startsWith(q)||e.b.startsWith(qb)||(e.e&&e.e.startsWith(q))?1:e.n.includes(q)||e.b.includes(qb)||(e.e&&e.e.includes(q))?2:e.s&&e.s.startsWith(q)?3:9;
    // الترتيب: الأقرب تطابقاً، ثم مدننا المراجعة، ثم مدن العالم الأكبر سكاناً (ملفاتها مرتبة بالسكان)
    const srt=idx.concat(wl).map((e,i)=>[sc(e),i,e]).filter(a=>a[0]<9).sort((a,b)=>a[0]-b[0]||a[1]-b[1]), seenN={};
    // الاسم نفسه في الدولة نفسها على بعد أقل من 8 كم مكان واحد: يبقى الأول (مدننا قبل ملفات العالم)
    hits=srt.filter(a=>{ const c=a[2].c, k=a[2].n+"|"+c[5], L=seenN[k]||(seenN[k]=[]); if(L.some(p=>111.2*Math.hypot(c[2]-p[0],(c[3]-p[1])*Math.cos(c[2]*D2R))<8)) return false; L.push([c[2],c[3]]); return true; }).slice(0,8).map(a=>a[2].c);
    cur=hits.length?0:-1;
    ul.innerHTML=hits.length?hits.map((c,i)=>`<li role="option" data-i="${i}"><b>${esc(c[1])}</b><span>${c[6]?esc(c[6])+"، ":""}${esc(ccName(c[5]))}</span></li>`).join(""):`<li class="none" role="option" aria-disabled="true">${wait?"جارٍ البحث…":"لا توجد مدينة بهذا الاسم"}</li>`;
    ul.hidden=false; inp.setAttribute("aria-expanded","true"); mark();
  }
  const choose=i=>{ const c=hits[i]; if(!c) return; inp.value=""; close(); document.getElementById("customBox").hidden=true;
    if(CITIES.includes(c)) setPlace(c[0]); else { WROWS[c[0]]=c; setPlace(c[0],0,0,c); if(!ARAB_CC.has(c[5])) loadWorld(); } syncPlaceForm(); };
  inp.addEventListener("input",find);
  inp.addEventListener("keydown",e=>{ e.stopPropagation(); if(ul.hidden&&e.key!=="Enter") return; if(e.key==="ArrowDown"||e.key==="ArrowUp"){ e.preventDefault(); if(!hits.length) return; cur=(cur+(e.key==="ArrowDown"?1:-1)+hits.length)%hits.length; mark(); } else if(e.key==="Enter"){ e.preventDefault(); if(cur>=0) choose(cur); } else if(e.key==="Escape"){ close(); } });
  ul.addEventListener("mousedown",e=>{ e.preventDefault(); const li=e.target.closest("li[data-i]"); if(li) choose(+li.dataset.i); });
  inp.addEventListener("blur",()=>setTimeout(close,120));
})();
["lat","lon"].forEach(id=>document.getElementById(id).addEventListener("change",()=>{ const la=+document.getElementById("lat").value,lo=+document.getElementById("lon").value; if(isFinite(la)&&isFinite(lo)&&Math.abs(la)<=90&&Math.abs(lo)<=180){ setPlace("custom",la,lo,null,true); if(!document.getElementById("timeSheet").hidden){ syncWhen(); } } else toast("خط العرض بين 90- و90، وخط الطول بين 180- و180."); }));
document.getElementById("when").addEventListener("change",e=>{ const m=/^(\d+)-(\d+)-(\d+)T(\d+):(\d+)/.exec(e.target.value); if(m) setTime(zonedToUtc(+m[1],+m[2],+m[3],+m[4],+m[5])); });
function updateWhere(){ const c=cityRow(st.city); const name=c&&c[0]!=="custom"?c[1]:(nearShort()||`${st.lat.toFixed(2)}°، ${st.lon.toFixed(2)}°`); { const nl=document.getElementById("nearLine"); if(nl){ const f=st.city==="custom"?nearFull():""; nl.hidden=!f; nl.textContent=f?"المكان: "+f:""; } } document.getElementById("whereText").textContent=name; document.getElementById("whereLat").textContent=` · ${Math.abs(st.lat).toFixed(1)}° ${st.lat>=0?"شمالاً":"جنوباً"}`; document.getElementById("menuWhere").textContent=name; document.getElementById("arPlace").textContent=c&&c[0]!=="custom"?c[1]:(nearShort()||"موقعك"); hudKey=""; }

// الوقت
function setTime(ms,keepLive){ st.t=ms; st.live=!!keepLive; if(!keepLive) setPlay(0); updateClock(); refreshInfo(); dirty=true; }
const clockEl=document.getElementById("clock"), nowBtn=document.getElementById("tNow");
const clockDock=document.getElementById("clockDock"), whenEl=document.getElementById("when");
function updateClock(){ const d=curTime(), short=`${fmt(d,yr(d,{day:"numeric",month:"short"}))}، ${fTime(d)}`; clockEl.textContent=`${fDay(d)}، ${fTime(d)}`; document.getElementById("clock2").textContent=short;
  clockDock.textContent=st.live?"الوقت":Math.abs(st.t-Date.now())<20*3600e3?fTime(d):fmt(d,yr(d,{day:"numeric",month:"short"})); clockDock.classList.toggle("live",st.live);
  if(!document.getElementById("timeSheet").hidden){ if(document.activeElement!==whenEl) syncWhen(); syncScrub(); }
  [nowBtn,document.getElementById("tNow2")].forEach(b=>{ b.textContent=st.live?"● مباشر":"الآن"; b.classList.toggle("live",st.live); });
  document.getElementById("arTime").textContent=st.live?`الآن ${fTime(d)}`:Math.abs(st.t-Date.now())<20*3600e3?fTime(d):`${fmt(d,yr(d,{day:"numeric",month:"short"}))}، ${fTime(d)}`; }
document.getElementById("tHourBack").onclick=()=>setTime(st.t-36e5);
document.getElementById("tHourFwd").onclick=()=>setTime(st.t+36e5);
document.getElementById("tDayBack").onclick=()=>setTime(st.t-864e5);
document.getElementById("tDayFwd").onclick=()=>setTime(st.t+864e5);
nowBtn.onclick=()=>{ setPlay(0); setTime(Date.now(),true); };
// شريط الزمن: أربع وعشرون ساعة من ظهر اليوم إلى ظهر الغد بتوقيت المكان، ولونه من ارتفاع الشمس، وتحته خط حين يكون القمر فوق الأفق
const scrub={ws:0,key:""}, scrubIn=document.getElementById("scrubIn");
const skyCol=a=>a>0?"#5b8fd6":a>-6?"#c98a5e":a>-12?"#3b3f7a":a>-18?"#1e2453":"#080c1c";
function altOf(body,ms){ const t=A.MakeTime(new Date(ms)), e=A.Equator(body,t,obs,true,true); return A.Horizon(t,obs,e.ra,e.dec,"normal").altitude; }
function noonBefore(ms){ const p=tzParts(ms); let ws=zonedToUtc(p.y,p.mo,p.d,12,0); if(ws>ms){ const q=tzParts(ws-864e5); ws=zonedToUtc(q.y,q.mo,q.d,12,0); } return ws; }
// أحداث الشمس والقمر في يوم واحد من لحظة البدء: الغروب، والظلام التام (الشمس 18 درجة تحت الأفق)، وأول ضوء، والشروق، وشروق القمر وغروبه
function skyEvents(t0,span){
  const T=A.MakeTime(new Date(t0)), ev=[], add=(k,f)=>{ try{ const r=f(); if(r&&r.date-t0<span) ev.push([r.date.getTime(),k]); }catch(e){} };
  add("set",()=>A.SearchRiseSet("Sun",obs,-1,T,1)); add("dark",()=>A.SearchAltitude("Sun",obs,-1,T,1,-18));
  add("dawn",()=>A.SearchAltitude("Sun",obs,+1,T,1,-18)); add("rise",()=>A.SearchRiseSet("Sun",obs,+1,T,1));
  add("mrise",()=>A.SearchRiseSet("Moon",obs,+1,T,1)); add("mset",()=>A.SearchRiseSet("Moon",obs,-1,T,1));
  return ev.sort((a,b)=>a[0]-b[0]);
}
const EVW={set:"الغروب",dark:"الظلام التام",dawn:"بداية الفجر الفلكي",rise:"الشروق",mrise:"شروق القمر",mset:"غروب القمر"};
function buildScrub(){
  const ws=noonBefore(st.t), key=ws+"|"+st.lat+"|"+st.lon; if(key===scrub.key) return; scrub.key=key; scrub.ws=ws;
  const N=144, sun=[], moon=[]; for(let i=0;i<=N;i++){ const ms=ws+i*600e3; sun.push(`${skyCol(altOf("Sun",ms))} ${(i/N*100).toFixed(2)}%`); const up=altOf("Moon",ms)>0?"rgba(239,233,218,.8)":"transparent"; moon.push(`${up} ${(Math.max(0,i-.5)/N*100).toFixed(2)}%`,`${up} ${(Math.min(N,i+.5)/N*100).toFixed(2)}%`); }
  document.getElementById("scrubBar").style.background=`linear-gradient(to left,${sun.join(",")})`;
  document.getElementById("scrubMoon").style.background=`linear-gradient(to left,${moon.join(",")})`;
  const ev=skyEvents(ws,864e5), pos=ms=>((ms-ws)/864e5*100).toFixed(2)+"%";
  let mk=ev.filter(e=>e[1]==="set"||e[1]==="rise").map(e=>`<i class="sMk" style="right:${pos(e[0])}"></i>`).join("");
  if(Date.now()>ws&&Date.now()<ws+864e5) mk+=`<i class="sNow" style="right:${pos(Date.now())}" title="الآن"></i>`;
  document.getElementById("scrubMarks").innerHTML=mk;
  document.getElementById("scrubHours").innerHTML=[3,6,9,12,15,18,21].map(h=>{ const hh=(12+h)%24; return `<span style="right:${(h/24*100).toFixed(2)}%">${hh===0?"12 ص":hh===12?"12 م":hh<12?hh+" ص":(hh-12)+" م"}</span>`; }).join("");
  document.getElementById("scrubEvs").innerHTML=ev.map(e=>`<span>${EVW[e[1]]} <b>${fTime(new Date(e[0]))}</b></span>`).join("");
  document.getElementById("scrubDay").textContent=`من ظهر ${fmt(new Date(ws),{weekday:"long",day:"numeric",month:"long"})} إلى ظهر ${fmt(new Date(ws+864e5),{weekday:"long"})}`;
}
function syncScrub(){ buildScrub(); scrubIn.value=Math.round((st.t-scrub.ws)/60e3); }
scrubIn.addEventListener("input",()=>setTime(scrub.ws+(+scrubIn.value)*60e3));
const playBtn=document.getElementById("tPlay"), SPEEDS=[0,600,3600];
function setPlay(i){ st.play=i; playBtn.setAttribute("aria-pressed",i>0); playBtn.textContent=i===0?"▶ تسريع":i===1?"▶▶ 10 دقائق/ث":"■ ساعة/ث"; if(i>0) st.live=false; updateClock(); }
playBtn.onclick=()=>setPlay((st.play+1)%3);
function toNight(){ const p=tzParts(st.t); let t=zonedToUtc(p.y,p.mo,p.d,21,0); if(t<st.t-6*36e5) t+=864e5; setTime(t); }
document.getElementById("toNight").onclick=toNight;
document.getElementById("tonightList").addEventListener("click",e=>{ if(e.target.closest("[data-tonight]")){ toNight(); buildTonight(); } });
// رسالة النهار والشفق (المالك 2026-11-19: «مش بتختفي لوحدها ومفيهاش علامة اكس»): زر إغلاق، وتختفي وحدها بعد 10 ثوانٍ،
// ولا تعود في الحال نفسها (نهار أو شفق) حتى يمر الليل أو يتغير المكان أو الوضع
let DAYX=null, DAYT=0;
function updateDayBanner(){ const el=document.getElementById("day"), ec=SECL&&sunAlt>-1?(SECL.total?"ecl":"pecl"):"", k=st.mode==="sky"&&sunAlt>-6?(ec||(sunAlt>0?"day":"twi"))+"|"+st.city:null;
  if(!k){ el.hidden=true; DAYX=null; clearTimeout(DAYT); DAYT=0; return; }
  if(DAYX===k){ el.hidden=true; return; }
  document.getElementById("dayText").textContent=ec==="ecl"?"كسوف كلي للشمس: أظلمت السماء فظهرت الكواكب وألمع النجوم.":ec?"كسوف للشمس الآن: اختر الشمس لترى كم يحجب القمر منها.":sunAlt>0?"الشمس فوق الأفق الآن، فالنجوم لا تُرى.":"وقت الشفق: تظهر النجوم اللامعة فقط.";
  if(el.hidden||el.dataset.k!==k){ el.dataset.k=k; clearTimeout(DAYT); DAYT=setTimeout(()=>{ DAYX=k; el.hidden=true; DAYT=0; },10000); }
  el.hidden=false; }
document.getElementById("dayX").onclick=()=>{ const el=document.getElementById("day"); DAYX=el.dataset.k||null; el.hidden=true; clearTimeout(DAYT); DAYT=0; };
function refreshInfo(){ if(st.sel&&!info.hidden){ computeSky(); const y=info.scrollTop, keepPv=pv.el; showInfo(st.sel); info.scrollTop=y; } }

// «الآن في السماء»: ملخص الليلة (الشمس والقمر)، ثم ما فوق الأفق الآن في أقسام، وكل سطر يفتح بطاقة الجرم
// حالة السماء للرصد من توقعات الطقس (/weather/sky/<مدينة>.json، أو near.json لموقع القارئ)، ما دام الوقت المعروض قريباً من الآن
const WXC={};
function wxLine(){
  if(Math.abs(st.t-Date.now())>12*36e5) return "";
  const key=st.city&&st.city!=="custom"?st.city:`near:${st.lat.toFixed(2)},${st.lon.toFixed(2)}`, w=WXC[key];
  if(w===undefined){ WXC[key]=null; const u=key.startsWith("near:")?`/weather/sky/near.json?lat=${st.lat.toFixed(2)}&lon=${st.lon.toFixed(2)}`:`/weather/sky/${key}.json`;
    fetch(u).then(r=>r.json()).then(j=>{ WXC[key]=j&&j.verdict?j:false; if(WXC[key]) buildTonight(); }).catch(()=>{ WXC[key]=false; }); return ""; }
  if(!w) return "";
  const dust=w.dl>=2?" وغبار كثيف":w.dl>=1?" وبعض الغبار":"";
  return `<a class="tnWx v${w.vc}" href="${"/weather/"+w.slug+"/"}" target="_top"><b>${esc(w.verdict)}</b><span>${w.isNow?"من الآن حتى الفجر":"الليلة"}: السحب نحو ${w.cl}%${dust}، بحسب توقعات الطقس</span></a>`;
}
function buildTonight(){
  computeSky(); const P=placeName(), mp=moonPhaseName(), mv=altAz(bodies[1].v);
  const tSet=(rd,bn)=>{ const r=riseSet(rd.ra,rd.dec,bn); if(r.always) return "لا يغيب الليلة"; if(!r.set) return ""; const d=relDay(r.set); return "يغرب "+(d==="اليوم"?"":d+" ")+fTime(r.set); };
  const row=(sel,name,sub,aa,extra)=>`<button data-sel="${sel}"><span class="n">${esc(name)}<small>${sub}</small></span><span class="k">${dirName(aa.az)}، ارتفاع <bdi dir="ltr">${Math.round(aa.alt)}°</bdi>${extra?`<small>${extra}</small>`:""}</span></button>`;
  const EVS={set:"تغرب الشمس",dark:"يحل الظلام التام",dawn:"يبدأ الفجر الفلكي",rise:"تشرق الشمس"};
  const ev=skyEvents(st.t,864e5).filter(e=>EVS[e[1]]).slice(0,2).map(e=>`${EVS[e[1]]} ${relDay(new Date(e[0]))==="اليوم"?"":relDay(new Date(e[0]))+" "}${fTime(new Date(e[0]))}`);
  let h=`<div class="tnSum"><p><b>${sunAlt>0?"نهار":sunAlt>-12?"شفق":"ليل"}</b> ${sunAlt>0?`في ${esc(P)} الآن، فلا يظهر بالعين إلا القمر وأحياناً الزهرة.`:sunAlt>-12?`في ${esc(P)} الآن، فتظهر الكواكب وألمع النجوم أولاً.`:`في ${esc(P)} الآن، والسماء مظلمة.`}</p>`;
  if(ev.length) h+=`<p>${ev.join("، ثم ")}.</p>`;
  const wx=wxLine(); if(wx) h+=wx;
  h+=`<p>القمر ${esc(mp.n)}، يضيء نحو ${Math.round(mp.f*100)}% من وجهه، ${mv.alt>0?`وهو فوق الأفق نحو ${dirName(mv.az)}`:"وهو تحت الأفق الآن"}.</p>`;
  if(sunAlt>-6) h+=`<button class="tnGo" data-tonight="1">انتقل إلى التاسعة مساءً</button>`;
  h+=`</div>`;
  const pl=bodies.filter(b=>b.id!=="sun").map(b=>({b,aa:altAz(b.v)})).filter(x=>x.aa.alt>=1).sort((x,y)=>x.b.mag-y.b.mag);
  if(pl.length) h+=`<h3>القمر والكواكب</h3>`+pl.map(x=>row(`body:${x.b.id}`,x.b.ar,x.b.id==="moon"?esc(mp.n):"كوكب، "+magWord(x.b.mag),x.aa,tSet({ra:x.b.ra,dec:x.b.dec},x.b.b))).join("");
  const stars=[]; for(const hip in CUR){ const s=SKY.stars[starIdx[hip]]; if(!s||s[2]>2) continue; const aa=altAz(starV(+hip)); if(aa.alt>5) stars.push({hip:+hip,m:s[2],aa}); }
  stars.sort((x,y)=>x.m-y.m);
  if(stars.length) h+=`<h3>ألمع النجوم</h3>`+stars.slice(0,12).map(x=>{ const c=CONS[conOfStar(x.hip)], rd=radec(starV(x.hip)); return row(`star:${x.hip}`,shortName(NAMES[x.hip][0]),magWord(x.m)+(c?`، في ${esc(shortName(c.ar))}`:""),x.aa,tSet(rd)); }).join("");
  const cons=Object.values(CONS).filter(c=>c.v&&c.top&&c.top.length&&starIdx[c.top[0]]!=null&&SKY.stars[starIdx[c.top[0]]][2]<2.6).map(c=>({c,a:altAz(c.v).alt})).filter(x=>x.a>20).sort((x,y)=>y.a-x.a).slice(0,12);
  if(cons.length) h+=`<h3>كوكبات واضحة فوقك</h3><div class="chips">${cons.map(x=>`<button class="chip" data-sel="con:${x.c.id}">${esc(shortName(x.c.ar))}</button>`).join("")}</div>`;
  const ds=SKY.dsos.filter(d=>d.mag<=6.5).map(d=>({d,aa:altAz(d.v)})).filter(x=>x.aa.alt>20).sort((x,y)=>x.d.mag-y.d.mag).slice(0,6);
  if(ds.length) h+=`<h3>بالمنظار أو في سماء مظلمة</h3>`+ds.map(x=>row(`dso:${x.d.id}`,x.d.ar||x.d.id,esc(x.d.ta)+"، "+(x.d.mag<=4.5?"يُرى بالعين في سماء مظلمة":"يحتاج إلى منظار"),x.aa,"")).join("");
  if(!pl.length&&!stars.length) h+=`<p>لا توجد أجرام لامعة فوق الأفق الآن.</p>`;
  document.getElementById("tonightList").innerHTML=h;
}

// ================================================================ التشغيل
let lastTick=performance.now(), lastLive=0;
// خريطة الصفحة الرئيسية (embed) لا ترسم وهي خارج الشاشة: كانت تعيد رسم السماء كل 5 ثوانٍ وتقطع تمرير الصفحة، فتتوقف الحلقة وتعود حين تظهر
let loopOn=true, embVis=true;
if(EMBED&&window.IntersectionObserver&&window.top!==window) new IntersectionObserver(es=>{ embVis=es[es.length-1].isIntersecting; if(embVis&&!loopOn){ loopOn=true; lastTick=performance.now(); dirty=true; requestAnimationFrame(loop); } },{rootMargin:"100px"}).observe(document.documentElement);
// في سماء مكاني: كلما اتسع مجال الرؤية فوق 110 درجات اقترب مركز النظر من سمت الرأس، فتظهر القبة كاملة عند أقصى تصغير
// ولا يمتلئ نصف الشاشة بالأرض الفارغة ويُقطع أعلى الدائرة
function keepDome(){ if(st.mode!=="sky"||st.eye||AR.on||belowOn()||st.fov<=110) return; const m=89.5*Math.min(1,(st.fov-110)/80);
  const a=Math.max(m,Math.min(180-m,st.alt)); if(Math.abs(a-st.alt)>1e-6){ st.alt=a; dirty=true; } }
function loop(now){
  const dt=Math.min(0.1,(now-lastTick)/1000); lastTick=now;
  if(st.anim) st.anim(now); keepDome();
  if(document.body.classList.contains("ar")){ arStep(); if(AR.on&&!RMOT) dirty=true; }
  if(st.play>0){ st.t+=dt*SPEEDS[st.play]*1000; updateClock(); dirty=true; if(st.sel&&now-lastLive>700){ lastLive=now; refreshInfo(); } }
  else if(st.live&&now-lastLive>5000){ lastLive=now; st.t=Date.now(); updateClock(); dirty=true; }
  if(vpT===null){ dirty=true; } else { const T=targetViewport(); if(Math.abs(T.cx-vp.cx)+Math.abs(T.cy-vp.cy)+Math.abs(T.d-vp.d)>0.5) dirty=true; }
  if(dirty) render();
  if(pv.el) drawPreview(now);
  if(!embVis){ loopOn=false; return; }
  requestAnimationFrame(loop);
}
window.addEventListener("resize",()=>{ resize(); updateClock(); layout(); });
{ const q=document.getElementById("q"); const ph=()=>{ q.placeholder=innerWidth<=420?"ابحث…":"ابحث عن نجم أو كوكبة…"; }; ph(); addEventListener("resize",ph); }
if(LINKS&&LINKS.home){ document.getElementById("btnHome").href=LINKS.home; document.getElementById("homeLink").href=LINKS.home; }
// ================================================================ يتبع هاتفك (وجّه هاتفك نحو السماء)
// نحتاج اتجاه ظهر الهاتف (حيث الكاميرا) وأعلى الشاشة بالنسبة إلى الشرق والشمال وسمت الرأس، من حدث deviceorientation
// بمصفوفة الدوران التي يعرّفها معيار W3C نفسه (R = Rz(alpha)·Rx(beta)·Ry(gamma))، ومنها مثال البوصلة في المعيار.
// المصادر: الحدث المطلق (absolute، في كروم أندرويد deviceorientationabsolute) أو بوصلة آيفون webkitCompassHeading،
// وإلا القراءة النسبية مع زر «أنا أنظر نحو الشمال الآن»، لأن النسبية تبدأ من حيث كان الهاتف لا من الشمال.
// لا نستعمل AbsoluteOrientationSensor: اتجاه دورانه انعكس على هواتف حقيقية فاحتاج القارئ أن يقلب هاتفه.
// على أندرويد تبدأ المتابعة وحدها عند فتح الأطلس (لا يحتاج المتصفح إذناً)، فإن لم تصل قراءة مطلقة في ثانية ونصف بقي الإصبع.
// وعلى آيفون بطاقة بزر واحد، لأن سفاري لا يعطي الاتجاه إلا بعد ضغطة من القارئ.
// السماء كرة كاملة: لا زوايا أويلر في الرسم، بل محاور الهاتف نفسها، فلا تنقلب السماء عند سمت الرأس ولا تحت القدمين،
// ودوران الهاتف حول محور النظر يميل الأفق على الشاشة كما يميل الأفق الحقيقي.
const cross=(p,q)=>[p[1]*q[2]-p[2]*q[1],p[2]*q[0]-p[0]*q[2],p[0]*q[1]-p[1]*q[0]];
// زاوية الشاشة: صفر في الوضع العمودي، و90 حين يدور الهاتف أفقياً وأعلاه نحو اليسار، و270 نحو اليمين
function scrAngle(){ const a=screen.orientation&&typeof screen.orientation.angle==="number"?screen.orientation.angle:(window.orientation||0); return ((a%360)+360)%360; }
function fromEuler(e){
  let a=e.alpha,b=e.beta,g=e.gamma; if(a==null||b==null||g==null) return null;
  let abs=e.absolute===true;
  if(e.webkitCompassHeading!=null&&isFinite(e.webkitCompassHeading)&&e.webkitCompassHeading>=0){
    const d=((360-e.webkitCompassHeading-a)%360+540)%360-180;
    if(AR.ios==null) AR.ios=d; else if(Math.abs(b)<55) AR.ios+=(((d-AR.ios)%360+540)%360-180)*0.08;
    a+=AR.ios; abs=true;
  }
  a*=D2R; b*=D2R; g*=D2R;
  const cA=Math.cos(a),sA=Math.sin(a),cB=Math.cos(b),sB=Math.sin(b),cG=Math.cos(g),sG=Math.sin(g);
  const x=[cA*cG-sA*sB*sG, cG*sA+cA*sB*sG, -cB*sG], y=[-cB*sA, cA*cB, sB], z=[cA*sG+cG*sA*sB, sA*sG-cA*cG*sB, cB*cG];
  const th=scrAngle()*D2R, c=Math.cos(th), s=Math.sin(th);
  return { f:[-z[0],-z[1],-z[2]], u:[0,1,2].map(i=>s*x[i]+c*y[i]), abs };
}
// تصحيح الاتجاه حول سمت الرأس بزاوية AR.off (موجبة مع عقارب الساعة)
function turn(v,deg){ const t=deg*D2R,c=Math.cos(t),s=Math.sin(t); return [v[0]*c+v[1]*s, v[1]*c-v[0]*s, v[2]]; }
function arApply(f,u,src){
  AR.got=true; AR.src=src; AR.last=Date.now();
  AR.rawF=f; AR.rawU=u; AR.tf=turn(f,AR.off); AR.tu=turn(u,AR.off);
}
// تنعيم متكيف في كل إطار: قوي حين يكاد الهاتف يسكن (فلا ترتجف السماء مع اليد)، وخفيف حين يتحرك بسرعة (فلا تتأخر عنه)
function arStep(){
  if(!AR.on||!AR.tf||AR.paused) return;
  const now=performance.now(), dt=Math.min(0.1,AR.lastT?(now-AR.lastT)/1000:1/60); AR.lastT=now;
  let f=AR.tf,u=AR.tu;
  if(AR.f){ const ang=Math.max(Math.acos(Math.min(1,dot(AR.f,f))),Math.acos(Math.min(1,dot(AR.u,u))));
    if(ang<2e-5) return;
    const t=Math.min(1,Math.max(0,(ang-0.003)/0.07)), k60=0.07+0.6*t*t*(3-2*t), k=1-Math.pow(1-k60,dt*60);
    f=AR.f.map((v,i)=>v+(f[i]-v)*k); u=AR.u.map((v,i)=>v+(u[i]-v)*k); }
  f=nrm(f); const kk=dot(u,f); u=nrm(u.map((v,i)=>v-f[i]*kk)); AR.f=f; AR.u=u;
  AR.H=[cross(f,u),u,f];
  st.az=(Math.atan2(f[0],f[1])*R2D+360)%360; st.alt=Math.asin(Math.max(-1,Math.min(1,f[2])))*R2D;
  dirty=true;
}
// الجهة والارتفاع أعلى الشاشة، ورسالة قصيرة عند الحاجة
const DEG=n=>"⁦"+n+"°⁩";
function arReadout(){
  const t=Date.now(); if(t-AR.msgT<150) return; AR.msgT=t; const vd=viewDir();
  document.getElementById("arDir").textContent=vd.alt>80?"فوق رأسك":vd.alt<-80?"تحت قدميك":`${dirName(vd.az)} ${DEG(Math.round(vd.az)%360)}`;
  document.getElementById("arAlt").textContent=vd.alt<0?`${DEG(Math.round(-vd.alt))} تحت الأفق`:`${DEG(Math.round(vd.alt))} فوق الأفق`;
  let m="";
  if(AR.paused) m="";
  else if(AR.rel&&!AR.absSeen&&!AR.north) m="لا يعطي متصفحك اتجاه البوصلة، فوجّه ظهر الهاتف نحو الشمال، ثم اضغط زر البوصلة واختر «أنا أنظر نحو الشمال الآن».";
  else if(AR.tip&&t-AR.t0<6500) m="ارفع هاتفك نحو أي جهة، واضغط على أي نجم لتعرف اسمه، و«بإصبعك» في الأسفل يوقف المتابعة.";
  if(m){ if(arMsg.textContent!==m) arMsg.textContent=m; arMsg.classList.remove("out"); } else if(arMsg.textContent&&!arMsg.classList.contains("out")){ arMsg.classList.add("out"); setTimeout(()=>{ if(arMsg.classList.contains("out")) arMsg.textContent=""; },750); }
}
function arEvent(e){
  const m=fromEuler(e); if(!m) return;
  if(!m.abs){ AR.rel=true; if(AR.absSeen||AR.pending) return; } else AR.absSeen=true;
  if(AR.pending){ AR.pending=false; arEnter(); }
  arApply(m.f,m.u,m.abs?"events":"relative");
}
const arBtn=document.getElementById("btnAR"), arBar=document.getElementById("arBar"), arMsg=document.getElementById("arMsg"), arVid=document.getElementById("arcam"), arAsk=document.getElementById("arAsk");
const canAR=!EMBED&&"DeviceOrientationEvent" in window&&COARSE;
arBtn.hidden=!canAR; document.getElementById("btnFlip").hidden=EMBED; document.getElementById("flipLayers").hidden=true; syncFlip();
const needPerm=()=>{ const DOE=window.DeviceOrientationEvent; return !!(DOE&&typeof DOE.requestPermission==="function"); };
function arListen(){ AR.ev="ondeviceorientationabsolute" in window?"deviceorientationabsolute":"deviceorientation";
  window.addEventListener(AR.ev,arEvent,true); if(AR.ev!=="deviceorientation") window.addEventListener("deviceorientation",arEvent,true); }
function arUnlisten(){ if(AR.ev) window.removeEventListener(AR.ev,arEvent,true); window.removeEventListener("deviceorientation",arEvent,true); }
// auto: يستمع بصمت، ولا تتغير الشاشة إلا إذا وصلت قراءة مطلقة
async function arStart(opts){
  const auto=!!(opts&&opts.auto); arAsk.hidden=true;
  if(!auto){ try{ if(needPerm()&&(await window.DeviceOrientationEvent.requestPermission())==="denied") throw 0; }
    catch(e){ toast("لم يُسمح بقراءة اتجاه الهاتف، فاسمح به من إعدادات المتصفح ثم حاول مرة أخرى."); return; } }
  arUnlisten(); Object.assign(AR,{got:false,H:null,f:null,u:null,tf:null,tu:null,ios:null,rel:false,absSeen:false,last:0,lastT:0,paused:false,capKey:"",north:false});
  arListen(); AR.t0=Date.now();
  if(auto){ AR.pending=true;
    setTimeout(()=>{ if(!AR.pending) return; AR.pending=false; arUnlisten();
      if(opts.ask){ arAsk.hidden=false; return; }
      toast(AR.rel?"لا يعطي متصفحك اتجاه البوصلة، فحرّك السماء بإصبعك، أو اضغط «يتبع هاتفك» واضبط الشمال بنفسك.":"لم يصل اتجاه الهاتف، فحرّك السماء بإصبعك."); },opts.ask?700:1500);
    return; }
  arEnter();
  // الموقع الدقيق إن سمح القارئ (بعد ضغطته فقط، فلا يُسأل عن موقعه بمجرد فتح الصفحة)
  if(navigator.geolocation) navigator.geolocation.getCurrentPosition(p=>{ const la=p.coords.latitude,lo=p.coords.longitude; if(Math.abs(la-st.lat)>0.5||Math.abs(lo-st.lon)>0.5) setPlace("custom",Math.round(la*100)/100,Math.round(lo*100)/100); },()=>{},{timeout:10000,maximumAge:600000});
  setTimeout(()=>{ if(AR.on&&!AR.got){ arStop(false); toast("لا يرسل جهازك اتجاهه إلى المتصفح، فلا تعمل المتابعة عليه، ويمكنك تحريك السماء بإصبعك."); } },4000);
}
function arEnter(){
  if(st.focus||st.route||st.ast) exitFocus(); if(st.mode!=="sky") setMode("sky",true);
  AR.on=true; st.play=0; st.live=true; st.t=Date.now(); st.anim=null; updateClock();
  st.fov=COARSE?phoneFov(80):55; dirty=true;
  document.body.classList.add("ar"); arBtn.setAttribute("aria-pressed","true"); closeSheets(); openFlipPick(false); showInfo(null); st.sel=null;
  arBar.hidden=false; document.getElementById("arTop").hidden=false; document.getElementById("arResume").hidden=true;
  document.getElementById("arFollow").setAttribute("aria-pressed","true"); document.getElementById("arStop").setAttribute("aria-pressed","false");
  AR.tip=!st.seen.arTip; if(AR.tip){ st.seen.arTip=1; savePrefs(); } quickOpen(false);
  syncQuick(); layout(); vpT=null; AR.msgT=0;
}
function arStop(save){
  arUnlisten(); const was=AR.on; AR.on=false; NAV.ar=false; AR.pending=false; AR.paused=false; AR.H=null; arCamera(false);
  if(save){ st.follow="finger"; savePrefs(); }
  if(!was) return;
  closeSheets(); document.body.classList.remove("ar"); arBtn.setAttribute("aria-pressed","false"); arBar.hidden=true; document.getElementById("arTop").hidden=true; document.getElementById("arCap").hidden=true; AR.capKey="";
  st.fov=COARSE?Math.max(st.fov,60):Math.max(st.fov,90); setAlt(st.alt); syncQuick(); layout(); vpT=null; dirty=true;
  if(FS_EL()) exitFull();
}
// سحب الإصبع يوقف المتابعة مؤقتاً من حيث كانت السماء، وزر يعيدها بانسياب
function arPause(){ if(!AR.on||AR.paused) return; const vd=viewDir(); AR.paused=true; st.az=vd.az; st.alt=Math.max(-89.5,Math.min(89.5,vd.alt)); st.anim=null;
  document.getElementById("arResume").hidden=false; document.getElementById("arFollow").setAttribute("aria-pressed","false"); document.getElementById("arStop").setAttribute("aria-pressed","false"); dirty=true; }
function arResume(){ if(!AR.on) return; if(AR.paused){ camera(); AR.f=H[2].slice(); AR.u=H[1].slice(); AR.lastT=0; } AR.paused=false; st.anim=null;
  document.getElementById("arResume").hidden=true; document.getElementById("arFollow").setAttribute("aria-pressed","true"); dirty=true; haptic(); }
// يبدأ وحده على أندرويد، وبطاقة على آيفون، إلا إن اختار القارئ «بإصبعك» من قبل (force: الرابط /atlas/?ar)
function arAuto(force){
  if(!canAR||AR.on||AR.pending||(!force&&st.follow==="finger")||st.mode!=="sky"||st.focus||st.route||st.ast||!introEl.hidden) return;
  // سفاري على آيفون (وبعض نسخ كروم) تعرّف طلب الإذن: نستمع بصمت أولاً، فإن وصلت القراءات (أُذن من قبل) بدأنا، وإلا عرضنا بطاقة بزر واحد
  arStart({auto:true,ask:needPerm()});
}
async function arCamera(on){
  if(on){
    try{ const s=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false}); arVid.srcObject=s; await arVid.play(); AR.cam=s; document.body.classList.add("ar-cam"); st.fov=COARSE?phoneFov(80):55; }
    catch(e){ toast("لم يُسمح باستعمال الكاميرا، والخريطة تعمل بدونها."); }
  } else { if(AR.cam) AR.cam.getTracks().forEach(t=>t.stop()); AR.cam=null; arVid.srcObject=null; document.body.classList.remove("ar-cam"); }
  syncQuick(); dirty=true;
}
function haptic(){ if(AR.vib&&navigator.vibrate) try{ navigator.vibrate(10); }catch(e){} }
// الأزرار السريعة: نفس طبقات الأطلس (st.layers) والرؤية الليلية والكاميرا، وكل ضغطة تقول حالتها الجديدة
const QNAME={lines:"خطوط الكوكبات",conNames:"أسماء الكوكبات",starNames:"أسماء النجوم",planets:"الكواكب والقمر",grid:"شبكة الأفق",gridEq:"الشبكة الاستوائية",below:"ما تحت الأفق",night:"الرؤية الليلية",cam:"الكاميرا"};
function qOn(k){ return k==="night"?!!st.night:k==="cam"?!!AR.cam:k==="below"?belowOn():!!st.layers[k]; }
function syncQuick(){ document.querySelectorAll("#arQuick [data-q]").forEach(b=>b.setAttribute("aria-pressed",String(qOn(b.dataset.q)))); const lb=document.getElementById("ly-below"); if(lb) lb.setAttribute("aria-pressed",String(belowOn())); }
document.getElementById("arQuick").addEventListener("click",e=>{ const b=e.target.closest("[data-q]"); if(!b) return; const k=b.dataset.q;
  if(k==="night"){ setNight(!st.night); savePrefs(); }
  else if(k==="cam"){ arCamera(!AR.cam); return; }
  else if(k==="below") setLayer(AR.on?"arBelow":"below",!belowOn());
  else setLayer(k,!st.layers[k]);
  syncQuick(); haptic();
  toast(k==="below"?(belowOn()?"الأرض شفافة: ترى ما تحت الأفق باهتاً، وهو لا يُرى الآن.":"الأرض معتمة: يظهر ما فوق الأفق وحده."):k==="night"?(st.night?"الرؤية الليلية: الشاشة حمراء خافتة لتحافظ على تكيّف عينك. خفّض سطوع هاتفك أيضاً.":"عادت الألوان الطبيعية."):`${QNAME[k]}: ${qOn(k)?"ظاهرة":"مخفية"}`); });
// ضغطة طويلة على زر سريع تشرحه
{ let lpT=0; const qb=document.getElementById("arQuick"); qb.addEventListener("pointerdown",e=>{ const b=e.target.closest("[data-q]"); if(!b) return; clearTimeout(lpT); lpT=setTimeout(()=>toast(b.getAttribute("aria-label")+(qOn(b.dataset.q)?": ظاهرة الآن":": مخفية الآن")),550); });
  ["pointerup","pointercancel","pointerleave"].forEach(t=>qb.addEventListener(t,()=>clearTimeout(lpT))); }
function arSrcText(){ return AR.rel&&!AR.absSeen?"لا يعطي متصفحك اتجاه البوصلة، بل حركة الهاتف من حيث بدأ، فوجّه ظهر الهاتف نحو الشمال واضغط «أنا أنظر نحو الشمال الآن».":AR.ios!=null?"يأتي الاتجاه من بوصلة هاتفك.":"يأتي الاتجاه من بوصلة هاتفك وحساس الحركة فيه."; }
function quickOpen(on){ const q=document.getElementById("arQuick"); q.hidden=!on; document.getElementById("arLayers").setAttribute("aria-expanded",String(!!on)); if(on){ closeSheets(); syncQuick(); } }
document.getElementById("arLayers").addEventListener("click",()=>quickOpen(document.getElementById("arQuick").hidden));
document.addEventListener("pointerdown",e=>{ const q=document.getElementById("arQuick"); if(!q.hidden&&e.target&&e.target.closest&&!e.target.closest("#arQuick,#arLayers")){ quickOpen(false); AR.qClosed=performance.now(); } },true);
document.getElementById("arCal").addEventListener("click",()=>{ document.getElementById("arSrc").textContent=arSrcText(); toggleSheet("arSet"); });
document.getElementById("arMore").addEventListener("click",()=>{ quickOpen(false); toggleSheet("viewSheet"); });
document.getElementById("arWhere").addEventListener("click",()=>toggleSheet("placeSheet"));
document.getElementById("arTime").addEventListener("click",()=>toggleSheet("timeSheet"));
document.getElementById("arCap").addEventListener("click",()=>{ if(AR.capSel){ closeSheets(); pickTap(AR.capSel); } });
document.getElementById("arFollow").addEventListener("click",arResume);
document.getElementById("arResume").addEventListener("click",arResume);
arBtn.addEventListener("click",()=>{ if(AR.on){ arStop(true); return; } st.follow="phone"; savePrefs(); NAV.ar=true; arStart(); });
document.getElementById("arGo").addEventListener("click",()=>{ st.follow="phone"; savePrefs(); NAV.ar=true; arStart(); });
document.getElementById("arNo").addEventListener("click",()=>{ arAsk.hidden=true; st.follow="finger"; savePrefs(); toast("حرّك السماء بإصبعك، وزر «يتبع هاتفك» في الأسفل يعيد المتابعة متى شئت."); });
document.getElementById("arStop").addEventListener("click",()=>{ arStop(true); toast("صارت السماء تتحرك بإصبعك، وزر «يتبع هاتفك» في الأسفل يعيد المتابعة متى شئت."); });
{ const fb=document.getElementById("arFull"); fb.hidden=!FS_OK; fb.onclick=toggleFull; document.addEventListener("fullscreenchange",()=>fb.setAttribute("aria-pressed",!!document.fullscreenElement)); }
{ const vb=document.getElementById("arVib"); vb.hidden=!navigator.vibrate; vb.setAttribute("aria-pressed",AR.vib); vb.onclick=()=>{ AR.vib=!AR.vib; vb.setAttribute("aria-pressed",AR.vib); savePrefs(); haptic(); }; }
const turnAll=d=>{ AR.off+=d; if(AR.tf){ AR.tf=turn(AR.tf,d); AR.tu=turn(AR.tu,d); } dirty=true; };
document.getElementById("arL").addEventListener("click",()=>turnAll(-5));
document.getElementById("arR").addEventListener("click",()=>turnAll(5));
document.getElementById("arNorth").addEventListener("click",()=>{ AR.off=AR.rawF?-Math.atan2(AR.rawF[0],AR.rawF[1])*R2D:0; if(AR.rawF){ AR.tf=turn(AR.rawF,AR.off); AR.tu=turn(AR.rawU,AR.off); } AR.f=null; AR.north=true; closeSheets(); toast("ضُبط الشمال."); AR.t0=0; dirty=true; });
if(window.ResizeObserver){ const ro=new ResizeObserver(()=>{ if(AR.on) layout(); }); ro.observe(arBar); ro.observe(document.getElementById("arTop")); }
// زر الرجوع في الهاتف (والمتصفح): يغلق أعلى ما هو مفتوح، لوحاً ثم بطاقة جرم ثم متابعة الهاتف ثم منظر 3D، ولا يخرج من الأطلس
// إلا وكل ذلك مغلق. نضيف خطوة واحدة في سجل المتصفح ما دام شيء مفتوحاً، ونزيلها حين يُغلق كل شيء بالأزرار
function navTop(){ if(SHEETS.some(id=>!document.getElementById(id).hidden)||!document.getElementById("arQuick").hidden||!flipPick.hidden) return "sheet";
  if(!lpMenu.hidden) return "lp"; if(PICK.on) return "pick";
  if(!info.hidden) return "info"; if(st.clean&&!EMBED) return "clean"; if(AR.on&&NAV.ar) return "ar"; if(NAV.atlas&&st.mode==="atlas") return "atlas"; if(NAV.eye&&EYE()) return "eye"; return ""; }
function navSync(){ if(EMBED) return; const top=navTop();
  // الخطوة التي يعود إليها زر الرجوع بلا رابط جرم (/atlas/)، والخطوة الجديدة تحمل رابط الجرم المفتوح
  if(top&&!NAV.pushed){ try{ const u=location.href; history.replaceState(history.state,"",location.pathname+location.search); history.pushState({atlasNav:1},"",u); NAV.pushed=true; }catch(e){} }
  else if(!top&&NAV.pushed){ NAV.pushed=false; NAV.skip=true; history.back(); } }
window.addEventListener("popstate",()=>{ if(NAV.skip){ NAV.skip=false; return; } if(!NAV.pushed) return; NAV.pushed=false;
  const top=navTop();
  if(top==="sheet"){ closeSheets(); quickOpen(false); openFlipPick(false); }
  else if(top==="lp") lpClose();
  else if(top==="pick") pickEnd();
  else if(top==="clean") setClean(false);
  else if(top==="info"){ showInfo(null); st.sel=null; dirty=true; }
  else if(top==="ar"){ arStop(true); toast("توقفت متابعة الهاتف، وصارت السماء تتحرك بإصبعك."); }
  else if(top==="atlas") pickMode(st.eye?"eye":"sky");
  else if(top==="eye") pickMode("sky");
  setTimeout(navSync,60); });
if(!EMBED) setInterval(()=>{ navSync(); hashSync(); },250);
syncQuick();
if(/[?&]debug/.test(location.search)){ window.__ar={AR,arEvent,arApply,arStart,arStop,arPause,arResume,arAuto,scrAngle,drawnLow:()=>drawnLow,labels:()=>labels.map(l=>({t:l.t,low:!!l.low,kind:l.kind||""})),hits:()=>hits.map(h=>({type:h.type,id:h.id,x:h.x,y:h.y})),cap:()=>document.getElementById("arCap").hidden?"":document.getElementById("arCapT").textContent+" | "+document.getElementById("arCapS").textContent};
  window.__dirPos=(az,alt)=>{ camera(); scale(); const h=hor(az,alt||0); return projH(h[0],h[1],h[2]); }; window.__view=()=>({cx:CX,cy:CY,up:upsideDown()}); window.__pano={terrainAlt:a=>terrainAlt(a),behind:(x,y)=>behindTerrain(x,y),ready:()=>panoReady(),dirAt:(x,y)=>azAltOf(screenDir(x,y)),cv:()=>PANO.cv,q:()=>PANO.q}; window.__horPos=(az,alt)=>{ camera(); scale(); const h=hor(az,alt||0), v=[0,1,2].map(j=>M[0][j]*h[0]+M[1][j]*h[1]+M[2][j]*h[2]); return projH(dot(MR[0],v),dot(MR[1],v),dot(MR[2],v)); }; }

// ================================================================ رابط لكل جرم
// الرابط بعد # باسم صفحة الموسوعة نفسها: /atlas/#betelgeuse، #orion، #orion-nebula، #mars، #mansion-thurayya، #route-polaris-dipper.
// جوجل يتجاهل ما بعد #، فالأطلس عنده صفحة واحدة (canonical /atlas/) ولا محتوى مكرر. الروابط القديمة (hip-، con-، M42، mansion-1) تبقى صالحة.
// نجم أو جرم بلا صفحة: hip-<رقم> أو m<رقم>. المصدر الواحد للأسماء: SITE_LINKS (النجوم والكوكبات والمنازل) وATLAS_EXTRA.deep (الأجرام العميقة).
const HASH=(()=>{ const slug=u=>String(u||"").replace(/\/+$/,"").split("/").pop(), to={}, from={};
  const add=(kind,id,s)=>{ if(!s) return; to[kind+":"+id]=s; if(!(s in from)) from[s]={type:kind,id}; };
  if(LINKS){ Object.entries(LINKS.star||{}).forEach(([hip,u])=>add("star",+hip,slug(u)));
    Object.entries(LINKS.con||{}).forEach(([id,u])=>add("con",id,slug(u)));
    Object.entries(LINKS.mansion||{}).forEach(([n,u])=>add("mansion",+n,"mansion-"+slug(u))); }
  // جرمان في صفحة واحدة (M81 وM82، وعناقيد ممسك الأعنة): الصفحة تفتح أولهما، ورابط كل واحد رقمه في فهرس مسييه
  const cnt={}; Object.values(EXTRA.deep||{}).forEach(x=>{ if(x.link) cnt[slug(x.link)]=(cnt[slug(x.link)]||0)+1; });
  Object.entries(EXTRA.deep||{}).forEach(([id,x])=>{ const s=x.link&&slug(x.link); if(s&&!(s in from)) from[s]={type:"dso",id}; if(s&&cnt[s]===1) to["dso:"+id]=s; });
  BODIES.forEach(b=>add("body",b.id,b.id));
  METS.forEach(m=>add("met",m.slug,m.slug));
  return {to,from}; })();
function hashOf(sel){ if(!sel) return ""; const k=sel.type+":"+sel.id; if(HASH.to[k]) return HASH.to[k];
  return sel.type==="star"?"hip-"+sel.id : sel.type==="con"?"con-"+sel.id : sel.type==="dso"?String(sel.id).toLowerCase() : sel.type==="mansion"?"mansion-"+sel.id : sel.type==="route"?"route-"+sel.id : sel.type==="ast"?"ast-"+sel.id : ""; }
function parseHash(raw){ let h=String(raw||"").replace(/^#/,""); try{ h=decodeURIComponent(h); }catch(e){} h=h.split(/[?&]/)[0].trim(); if(!h) return null;
  const l=h.toLowerCase(); let sel=HASH.from[l]||null;
  if(!sel){ if(/^hip-\d+$/.test(l)) sel={type:"star",id:+l.slice(4)};
    else if(/^con-\w+$/.test(h)) sel={type:"con",id:h.slice(4)};
    else if(/^m\d+$/.test(l)) sel={type:"dso",id:"M"+l.slice(1)};
    else if(/^mansion-\d+$/.test(l)) sel={type:"mansion",id:+l.slice(8)};
    else if(/^route-[\w-]+$/.test(l)) sel={type:"route",id:l.slice(6)};
    else if(/^ast-[\w-]+$/.test(l)) sel={type:"ast",id:l.slice(4)}; }
  if(!sel) return null;
  if(sel.type==="star"&&starIdx[sel.id]==null) return null; if(sel.type==="con"&&!CONS[sel.id]) return null; if(sel.type==="route"&&!ROUTES[sel.id]) return null; if(sel.type==="ast"&&!ASTS[sel.id]) return null; if(sel.type==="met"&&!METBY[sel.id]) return null;
  if(sel.type==="dso"&&!SKY.dsos.some(d=>d.id===sel.id)) return null; if(sel.type==="mansion"&&!SKY.mansions[sel.id-1]) return null;
  return sel; }
// المدينة والوقت في الرابط (#240): /atlas/?o=betelgeuse&c=cairo&t=2026-11-13T21:00 (رابط المشاركة، ويقرأ الـ Worker منه o لمعاينة الجرم)،
// أو بعد #: #betelgeuse&c=cairo&t=... . الوقت بتوقيت المدينة المحلي. المدينة من الرابط لا تُحفظ مدينةً للقارئ.
function linkOpts(){ const o={}; new URLSearchParams(location.search).forEach((v,k)=>{ if(/^[oct]$/.test(k)) o[k]=v; });
  String(location.hash||"").replace(/^#/,"").split("&").slice(1).forEach(kv=>{ const i=kv.indexOf("="); if(i>0&&/^[ct]$/.test(kv.slice(0,i))) try{ o[kv.slice(0,i)]=decodeURIComponent(kv.slice(i+1)); }catch(e){} });
  return o; }
function applyLinkOpts(o){ if(EMBED||!o) return false; let ch=false, cityName="";
  const c=o.c&&CITIES.find(x=>x[0]===o.c&&x[0]!=="custom");
  if(c){ st.city=c[0]; st.lat=c[2]; st.lon=c[3]; st.tz=c[4]; obs=new A.Observer(st.lat,st.lon,0); M=null; updateWhere(); ch=true; cityName=c[1]; }
  const m=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)$/.exec(o.t||"");
  const mOk=m&&+m[2]>=1&&+m[2]<=12&&+m[3]>=1&&+m[3]<=new Date(Date.UTC(+m[1],+m[2],0)).getUTCDate()&&+m[4]<24&&+m[5]<60;
  if(mOk){ setTime(zonedToUtc(+m[1],+m[2],+m[3],+m[4],+m[5])); ch=true; }
  if(ch){ if(!M) computeSky(); const d=curTime(); toast(`السماء ${cityName?"من "+cityName+" ":""}${mOk?`يوم ${fmt(d,{day:"numeric",month:"long"})} الساعة ${fTime(d)}`:"الآن"}، كما في الرابط.`); }
  return ch; }
function linkTail(){ const c=st.city&&st.city!=="custom"?"&c="+encodeURIComponent(st.city):""; if(st.live) return c;
  const p=tzParts(st.t), z=n=>String(n).padStart(2,"0"); return c+`&t=${p.y}-${z(p.mo)}-${z(p.d)}T${z(p.h)}:${z(p.mi)}`; }
// الجرم المعروض الآن: البطاقة المفتوحة، وإلا الكوكبة أو الطريق أو الشكل المعروض وحده
function shownSel(){ if(!info.hidden&&info.dataset.key){ const k=info.dataset.key, i=k.indexOf(":"), t=k.slice(0,i), id=k.slice(i+1); return {type:t,id:t==="star"||t==="mansion"?+id:id}; }
  if(st.focus) return {type:"con",id:st.focus}; if(st.route) return {type:"route",id:st.route}; if(st.ast) return {type:"ast",id:st.ast}; return null; }
// يُكتب الرابط بـ replaceState، فلا يزيد خطوات زر الرجوع (زر الرجوع يديره navSync)، ويعود /atlas/ حين لا يُعرض جرم
function hashSync(){ if(EMBED) return; const want=hashOf(shownSel()), cur=(location.hash||"").slice(1);
  const sp=new URLSearchParams(location.search), dirtyQ=["o","c","t"].some(k=>sp.has(k));
  if(want===cur&&!dirtyQ) return; if(!want&&!cur&&!dirtyQ) return;
  ["o","c","t"].forEach(k=>sp.delete(k)); const base=location.pathname+(sp.toString()?"?"+sp.toString():"");
  try{ history.replaceState(history.state,"",base+(want?"#"+want:"")); }catch(e){} }
// رابط كُتب في شريط العنوان والأطلس مفتوح. زر الرجوع يعود دائماً إلى خطوة بلا رابط جرم (navSync)، فلا يفتح هنا شيئاً
window.addEventListener("hashchange",()=>{ const sel=parseHash(location.hash); if(!sel) return; const lo=applyLinkOpts(linkOpts());
  if(!lo&&!info.hidden&&hashOf(shownSel())===hashOf(sel)) return; if(AR.on) arStop(true); go(sel); });
async function shareSel(){ const sel=shownSel(); if(!sel) return; const h=hashOf(sel); hashSync();
  const url=location.origin+location.pathname+"?o="+encodeURIComponent(h)+linkTail(), t=(info.querySelector("h2")||{}).textContent||"";
  const title=t?t+" في أطلس السماء التفاعلي":"أطلس السماء التفاعلي";
  if(navigator.share&&COARSE){ try{ await navigator.share({title,url}); return; }catch(e){ if(e&&e.name==="AbortError") return; } }
  try{ await navigator.clipboard.writeText(url); toast("نُسخ رابط "+(t||"الجرم")+` في سماء ${placeName()} ${st.live?"الآن":"الساعة "+fTime(curTime())}، فأرسله لمن تشاء.`); }
  catch(e){ toast(url); } }
// صورة السماء (#362، طلب عميل: «ميزة تحميل الصورة»): ما على الشاشة الآن كما هو، وتحته شريط فيه المكان واليوم والساعة واسم الموقع.
// على الهاتف «شارك الصورة» يفتح قائمة المشاركة (واتساب وفيسبوك والحالة)، و«حمّل الصورة» يحفظها في الجهاز. ملف JPEG لأن صورة
// سماء بعرض الهاتف تصير بصيغة PNG عدة ميغابايتات. الاسم لاتيني لأن Chromium يتجاهل اسم الملف العربي
const SHOT={url:null,blob:null,name:""};
function shotCompose(){
  const w=cv.width,h=cv.height,k=w/Math.max(1,cv.clientWidth||W||w);
  const fs=Math.round(Math.max(14,Math.min(22,(cv.clientWidth||W)/22))*k), pad=Math.round(fs*0.9), fh=Math.round(fs*3.5);
  const c=document.createElement("canvas"); c.width=w; c.height=h+fh; const x=c.getContext("2d");
  x.fillStyle="#05070f"; x.fillRect(0,0,w,h); x.drawImage(cv,0,0);
  const g=x.createLinearGradient(0,h,0,h+fh); g.addColorStop(0,"#0e1530"); g.addColorStop(1,"#080c1c"); x.fillStyle=g; x.fillRect(0,h,w,fh);
  x.fillStyle="#cfa955"; x.fillRect(0,h,w,Math.max(2,Math.round(1.5*k)));
  const d=curTime(), t1="سماء "+placeName(), t2=fmt(d,{weekday:"long",day:"numeric",month:"long",year:"numeric"})+"، الساعة "+fTime(d);
  x.direction="rtl"; x.textBaseline="middle";
  let f1=fs,f2=Math.round(fs*0.7),f3=Math.round(fs*0.78),f4=Math.round(fs*0.64);
  const wid=(t,f,b)=>{ x.font=(b?"600 ":"")+f+"px "+FUI; return x.measureText(t).width; };
  // يصغر الخط حتى لا يلتقي اسم المكان بالتاريخ واسم الموقع على شاشة ضيقة
  for(let i=0;i<8&&Math.max(wid(t1,f1,1),wid(t2,f2))+Math.max(wid("موسوعة السماء العربية",f3,1),wid("arabskypedia.com",f4))+pad*3>w;i++){ f1*=.92; f2*=.92; f3*=.92; f4*=.92; }
  x.textAlign="right"; x.fillStyle="#f3ead6"; x.font="600 "+Math.round(f1)+"px "+FUI; x.fillText(t1,w-pad,h+fh*0.36);
  x.fillStyle="rgba(243,234,214,.75)"; x.font=Math.round(f2)+"px "+FUI; x.fillText(t2,w-pad,h+fh*0.7);
  x.textAlign="left"; x.fillStyle="#cfa955"; x.font="600 "+Math.round(f3)+"px "+FUI; x.fillText("موسوعة السماء العربية",pad,h+fh*0.36);
  x.direction="ltr"; x.fillStyle="rgba(243,234,214,.62)"; x.font=Math.round(f4)+"px "+FUI; x.fillText("arabskypedia.com",pad,h+fh*0.7);
  return c; }
async function openShot(){
  if(EMBED) return;
  const sh=document.getElementById("shotSheet"); if(!sh.hidden){ closeSheets(); return; }
  closeSheets(); dirty=true; await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  let blob=null; try{ blob=await new Promise(r=>shotCompose().toBlob(r,"image/jpeg",0.9)); }catch(e){}
  if(!blob){ toast("تعذّر صنع الصورة في هذا المتصفح."); return; }
  const p=tzParts(st.t), z=n=>String(n).padStart(2,"0");
  if(SHOT.url) URL.revokeObjectURL(SHOT.url);
  SHOT.blob=blob; SHOT.url=URL.createObjectURL(blob); SHOT.name=`arabskypedia-sky-${p.y}${z(p.mo)}${z(p.d)}-${z(p.h)}${z(p.mi)}.jpg`;
  const img=document.getElementById("shotImg"); img.src=SHOT.url; img.alt="سماء "+placeName()+" "+fTime(curTime());
  let canFile=false; try{ canFile=COARSE&&!!navigator.canShare&&navigator.canShare({files:[new File([blob],SHOT.name,{type:"image/jpeg"})]}); }catch(e){}
  document.getElementById("shotShare").hidden=!canFile;
  document.getElementById("shotNote").textContent=(canFile?"«شارك الصورة» يفتح واتساب وفيسبوك وغيرهما، فتنشرها حالةً أو ترسلها لمن تشاء. ":"")+
    "الصورة هي ما تراه على الشاشة الآن، فإن أردت السماء كلها دائرة واحدة فصغّرها قبل التصوير"+(COARSE?" بإصبعين":" بالعجلة أو بزر «عرض السماء كلها»")+".";
  toggleSheet("shotSheet"); }
document.getElementById("bShot").onclick=openShot;
document.addEventListener("click",e=>{ if(e.target.closest("[data-shot]")) openShot(); });
document.getElementById("ffKind").addEventListener("click",e=>{ const b=e.target.closest("[data-ff]"); if(!b) return; FF.kind=b.dataset.ff; if(FF.kind==="bino"&&!FF.bd) FF.bd="6.5"; frameSync(true); });
[["ffBd","bd"],["ffBu","bu"],["ffTf","tf"],["ffEf","ef"],["ffEa","ea"],["ffCf","cf"],["ffSp","sp"]].forEach(([id,k])=>{ const el=document.getElementById(id); el.addEventListener("input",()=>{ FF[k]=String(el.value); frameSync(false); }); el.addEventListener("change",()=>{ FF[k]=String(el.value); frameSync(true); }); });
frameSync(false);
document.getElementById("shotShare").onclick=async()=>{ if(!SHOT.blob) return;
  const file=new File([SHOT.blob],SHOT.name,{type:"image/jpeg"}), url=location.origin+"/atlas/"+(linkTail()?"?"+linkTail().slice(1):"");
  try{ await navigator.share({files:[file],title:"سماء "+placeName(),text:"سماء "+placeName()+" في أطلس السماء التفاعلي: "+url}); }
  catch(e){ if(!e||e.name!=="AbortError") toast("لم تكتمل المشاركة، فجرّب «حمّل الصورة»."); } };
document.getElementById("shotSave").onclick=()=>{ if(!SHOT.url) return; const a=document.createElement("a"); a.href=SHOT.url; a.download=SHOT.name; document.body.appendChild(a); a.click(); a.remove();
  toast(COARSE?"حُفظت الصورة في التنزيلات، وتجدها في معرض الصور أو في الملفات.":"حُفظت الصورة في مجلد التنزيلات."); };
info.addEventListener("click",e=>{ if(e.target.closest("[data-share]")) shareSel(); const z=e.target.closest("[data-zoompl]"); if(z){ zoomToPlanet(z.dataset.zoompl); z.remove(); } });

// يبدأ الأطلس في مهمة مستقلة بعد قراءة البرنامج (#269): كانت قراءة البرنامج وحساب السماء وقياس الشاشة مهمة واحدة نحو
// نصف ثانية على هاتف بطيء تجمّد الصفحة. وبطاقة الترحيب تظهر في أول إطار مع السماء نفسها بدل الانتظار 0.9 ثانية بعده
function boot(){
if(st.city==="custom"&&!NEAR&&!EMBED) setTimeout(nearName,1500); // مكان محفوظ من قبل هذه الخاصية: نعرف اسمه الآن
readFonts(); resize(); setClean(st.clean,true); updateWhere(); updateClock(); syncModeBtns(); computeSky(); layout(); updateViewport(true);
(function initialView(){
  const lo=linkOpts(); applyLinkOpts(lo); const sel=parseHash(location.hash)||parseHash(lo.o);
  if(sel&&selVec(sel)){ go(sel); if(EMBED){ showInfo(null); st.sel=sel.type==="con"?{type:"con",id:st.focus}:sel; } return; }
  if(st.mode==="sky"){ const aa=altAz(starV(27989)); if(aa.alt>15){ st.az=aa.az; st.alt=Math.min(55,aa.alt); } else { st.az=180; st.alt=40; }
    if(COARSE) st.fov=60; if(EYE()) st.fov=COARSE?70:60; }
  else { const t=viewOf(starV(27989)); st.az=t.az; st.alt=t.alt; st.fov=110; }
})();
if(GUESS&&!linkOpts().c) guessPlace();
if(introWanted()) introStart();
else if(!(location.hash||"").slice(1)&&!/[?&]o=/.test(location.search)) setTimeout(()=>arAuto(/[?&]ar\b/.test(location.search)),300);
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{ readFonts(); dirty=true; });
if(window.requestIdleCallback) window.requestIdleCallback(starConsIdle,{timeout:3000}); else setTimeout(starConsIdle,1500);
requestAnimationFrame(loop);
}
setTimeout(boot,0);
// ?sensor: لوحة تشخيص لحساس الهاتف، تعرض ما يرسله المتصفح وما يفعله الأطلس به (للفحص فقط، ولا تظهر من غير الرابط)
if(/[?&]sensor\b/.test(location.search)){
  const box=document.createElement("pre"); box.id="sensorDbg";
  box.style.cssText="position:fixed;left:6px;right:6px;top:70px;z-index:9999;margin:0;padding:8px 10px;background:rgba(0,0,0,.8);color:#bdf;font:12px/1.5 monospace;direction:ltr;text-align:left;border:1px solid #456;border-radius:8px;pointer-events:none;white-space:pre-wrap";
  document.body.appendChild(box);
  const R={dor:0,dora:0,pd:0,pda:0,rd:0,rda:0,last:null,lastA:null,tick:Date.now()};
  const rec=(k,lk)=>e=>{ R[k]++; R[lk]={a:e.alpha,b:e.beta,g:e.gamma,abs:e.absolute,ch:e.webkitCompassHeading}; };
  addEventListener("deviceorientation",rec("dor","last"),true);
  addEventListener("deviceorientationabsolute",rec("dora","lastA"),true);
  const n=(x,d=1)=>x==null||!isFinite(x)?"-":(+x).toFixed(d);
  const dirOf=f=>[(Math.atan2(f[0],f[1])/D2R+360)%360, Math.asin(Math.max(-1,Math.min(1,f[2])))/D2R];
  const pointsTo=v=>{ if(!v||v.a==null) return "-"; const m=fromEuler({alpha:v.a,beta:v.b,gamma:v.g,absolute:true}); if(!m) return "-"; const [az,al]=dirOf(m.f); return "az "+n(az,0)+"  alt "+n(al,0); };
  const ua=(navigator.userAgent.match(/(SamsungBrowser|EdgA|OPR|Firefox|CriOS|Chrome|Version)\/[\d.]+/g)||[]).join(" ")+(/Android/.test(navigator.userAgent)?" Android":/iPhone|iPad/.test(navigator.userAgent)?" iOS":"");
  setInterval(()=>{
    const now=Date.now(), dt=Math.max(0.2,(now-R.tick)/1000); R.rd=(R.dor-R.pd)/dt; R.rda=(R.dora-R.pda)/dt; R.pd=R.dor; R.pda=R.dora; R.tick=now;
    const vd=viewDir(), shortSide=st.fov, asp=Math.max(W,Ht)/Math.min(W,Ht), longSide=4*Math.atan(Math.tan(st.fov*D2R/4)*asp)/D2R;
    const L=R.last, A=R.lastA;
    box.textContent=[
      "وجّه الهاتف نحو الشرق والأفق في منتصف الشاشة، ثم صوّرها",
      "browser: "+ua,
      "screen: "+W+"x"+Ht+"  angle "+scrAngle()+"  needPerm "+(needPerm()?"yes":"no")+"  canAR "+canAR,
      "deviceorientation: "+R.dor+" ("+n(R.rd,0)+"/s)  absolute="+(L?L.abs:"-")+(L&&L.ch!=null?"  compass "+n(L.ch,0):""),
      "   a "+n(L&&L.a)+"  b "+n(L&&L.b)+"  g "+n(L&&L.g)+"   -> "+pointsTo(L),
      "deviceorientationabsolute: "+R.dora+" ("+n(R.rda,0)+"/s)  absolute="+(A?A.abs:"-"),
      "   a "+n(A&&A.a)+"  b "+n(A&&A.b)+"  g "+n(A&&A.g)+"   -> "+pointsTo(A),
      "atlas: mode "+st.mode+"  follow "+st.follow+"  AR.on "+AR.on+"  pending "+AR.pending+"  paused "+AR.paused,
      "   src "+(AR.src||"-")+"  listens "+(AR.ev||"-")+"  rel "+AR.rel+"  absSeen "+AR.absSeen+"  off "+n(AR.off,0),
      "view centre: az "+n(vd.az,0)+"  alt "+n(vd.alt,0)+"   fov "+n(shortSide,0)+" (short side)  "+n(longSide,0)+" (long side)"
    ].join("\n");
  },250);
}
})();
