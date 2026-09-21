export const pakistanCities = [
  "Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Gujranwala", "Hyderabad", "Bahawalpur", "Sargodha", "Sukkur", "Larkana", "Sheikhupura", "Jhang", "Rahim Yar Khan", "Gujrat", "Mardan", "Kasur", "Mingora", "Dera Ghazi Khan", "Nawabshah", "Sahiwal", "Mirpur", "Okara", "Wah Cantonment", "Bannu", "Chiniot", "Kāmoke", "Hafizabad", "Khanewal", "Dera Ismail Khan", "Turbat", "Muzaffargarh", "Abbottabad", "Mandi Bahauddin", "Jacobabad", "Jhelum", "Khanpur", "Khairpur", "Khuzdar", "Pakpattan", "Hub", "Daska", "Gojra", "Muridke", "Bahawalnagar", "Samundri", "Burewala", "Tando Adam", "Kohat", "Jaranwala", "Chakwal", "Mian Channu", "Vihari", "Kamalia", "Haroonabad", "Lodhran", "Attock", "Nowshera", "Charsadda", "Swabi", "Mansehra", "Chitral", "Dir", "Karak", "Hangu", "Tank", "Buner", "Batagram", "Shangla", "Lakki Marwat", "Pattoki", "Wazirabad", "Narowal", "Shakargarh", "Hassan Abdal", "Taxila", "Kallar Syedan", "Murree", "Kotli", "Muzaffarabad", "Rawalakot", "Gilgit", "Skardu", "Hunza", "Chilas", "Astore", "Ghanche", "Ghizer", "Nagar", "Thatta", "Badin", "Mirpur Khas", "Tando Allahyar", "Tando Muhammad Khan", "Dadu", "Matiari", "Umerkot", "Sanghar", "Ghotki", "Kandhkot", "Shikarpur", "Rohri", "Moro", "Kambar", "Kotri", "Jamshoro", "Ormara", "Gwadar", "Panjgur", "Kech", "Chaman", "Sibi", "Zhob", "Loralai", "Mastung", "Kalat", "Nushki", "Dalbandin", "Lasbela", "Dera Bugti", "Killa Saifullah", "Killa Abdullah", "Awaran", "Washuk", "Jhal Magsi", "Jaffarabad", "Nasirabad", "Kachhi", "Barkhan", "Musakhel", "Sherani", "Harnai", "Ziarat"
] as const;

export const popularAreasByCity: Record<string, string[]> = {
  Lahore: ["DHA Lahore", "Bahria Town Lahore", "Gulberg", "Johar Town", "Model Town", "Wapda Town", "Lake City", "Raiwind Road"],
  Karachi: ["DHA Karachi", "Clifton", "Gulshan-e-Iqbal", "Bahria Town Karachi", "PECHS", "North Nazimabad", "Malir", "Scheme 33"],
  Islamabad: ["DHA Islamabad", "Bahria Town Islamabad", "F-6", "F-7", "G-11", "E-11", "I-8", "Park View City"],
  Rawalpindi: ["Bahria Town Rawalpindi", "DHA Phase 2", "Askari 14", "Saddar", "Chakri Road", "Adiala Road"],
  Faisalabad: ["Wapda City", "Canal Road", "Peoples Colony", "Madina Town", "Satyana Road"],
  Multan: ["DHA Multan", "Bosan Road", "Gulgasht Colony", "MPS Road", "Mumtazabad"],
  Peshawar: ["Hayatabad", "Regi Model Town", "University Town", "Warsak Road", "Ring Road"],
  Quetta: ["Jinnah Town", "Airport Road", "Samungli Road", "Brewery Road", "Satellite Town"],
  Sialkot: ["Citi Housing", "Paris Road", "Cantt", "Daska Road", "Model Town"],
  Gujranwala: ["Citi Housing", "Wapda Town", "DC Colony", "Sialkot Road", "Gondlanwala Road"],
};

export const propertyCategories = {
  Residential: ["House", "Apartment / Flat", "Villa", "Plot", "Farmhouse", "Room", "Portion"],
  Commercial: ["Office", "Shop", "Plaza", "Building", "Showroom", "Warehouse"],
  Agriculture: ["Agricultural Land", "Farm", "Orchard", "Dairy Farm", "Poultry Farm"],
  Industrial: ["Factory", "Industrial Land", "Manufacturing Unit", "Industrial Park", "Cold Storage"],
  Investment: ["Rental Income", "Land Banking", "Joint Venture", "Development Project", "REIT Opportunity"],
} as const;

export const userCategories = ["Seller", "Buyer", "Agent", "Real Estate Agency", "Industrialist", "Investor", "Corporate", "Government"] as const;
export const propertyIntents = ["Buy a property", "Rent a property", "Sell a property", "Invest in property"] as const;

const assistantNames = [
  "Buyer AI", "Seller AI", "Agent AI", "Property AI", "Verification AI", "Deal AI", "Negotiation AI", "Marketing AI", "Media AI", "Investment AI", "Developer AI", "CRM AI", "WhatsApp AI", "Admin AI", "Legal Documentation AI", "Area Intelligence AI", "Listing Intelligence AI", "Property Pricing AI", "Property Risk AI", "Property Recommendation AI", "Property Matching AI", "Property Compliance AI", "Property Analytics AI", "Property Twin AI", "City Intelligence AI", "Area Demand AI", "Market Trend AI", "Rental Intelligence AI", "Investment Zone AI", "National Property Intelligence AI", "Lead Qualification AI", "Lead Routing AI", "Lead Protection AI", "Deal Protection AI", "Commission Intelligence AI", "Dispute Resolution AI", "Agency Management AI", "Team Performance AI", "Agent Performance AI", "Corporate Advisory AI", "Enterprise Solutions AI", "Portfolio Intelligence AI", "Industrial Property AI", "Agriculture Property AI", "Land Intelligence AI", "Water Intelligence AI", "ROI Intelligence AI", "Capital Advisory AI", "JV Matching AI", "Funding Intelligence AI", "Fraud Detection AI", "Trust Intelligence AI", "Compliance Intelligence AI", "AI Admin"
] as const;

export const aiAssistants = assistantNames.map((name, index) => ({
  id: index + 1,
  name,
  department: index < 16 ? "Core Workforce" : index < 24 ? "Property Operations" : index < 30 ? "Area Intelligence" : index < 36 ? "Lead & Deal Infrastructure" : index < 42 ? "Agency & Enterprise" : index < 46 ? "Industrial & Agriculture" : index < 50 ? "Financial & Investment" : "Governance & OS",
  description: `Specialist intelligence for ${name.replace(" AI", "").toLowerCase()} workflows, recommendations, and auditable next steps.`,
}));
