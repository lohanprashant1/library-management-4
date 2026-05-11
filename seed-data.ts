export const SEED_ADMIN = {
  username: 'Prashant',
  password: 'CHANGE_THIS_PASSWORD', // Will be hashed on seed
  name: 'Library Admin',
  role: 'admin',
};

export const SEED_BOOKS = [
  { title: "Introduction to Computer Science", author: "John Smith", genre: "Computer Science", year: 2023, isbn: "978-0-13-468599-1", available: true, copies: 5, featured: false, active: true },
  { title: "Advanced Mathematics for Engineers", author: "Sarah Johnson", genre: "Mathematics", year: 2022, isbn: "978-0-471-64965-2", available: true, copies: 3, featured: false, active: true },
  { title: "Modern Physics: From Atoms to Quarks", author: "Robert Williams", genre: "Physics", year: 2023, isbn: "978-0-321-66255-3", available: false, copies: 0, featured: true, active: true },
  { title: "Organic Chemistry Fundamentals", author: "Emily Davis", genre: "Chemistry", year: 2021, isbn: "978-1-118-01446-4", available: true, copies: 2, featured: false, active: true },
  { title: "Data Structures & Algorithms in Java", author: "Michael Brown", genre: "Computer Science", year: 2024, isbn: "978-0-13-257637-5", available: true, copies: 8, featured: false, active: true },
  { title: "Principles of Economics", author: "David Miller", genre: "Economics", year: 2022, isbn: "978-0-07-802173-6", available: true, copies: 4, featured: false, active: true },
  { title: "World History: A Comprehensive Guide", author: "Lisa Anderson", genre: "History", year: 2020, isbn: "978-0-393-91883-7", available: false, copies: 0, featured: false, active: true },
  { title: "Business Management Strategies", author: "James Wilson", genre: "Business", year: 2023, isbn: "978-0-13-350748-8", available: true, copies: 6, featured: true, active: true },
  { title: "Machine Learning and AI", author: "Priya Sharma", genre: "Computer Science", year: 2024, isbn: "978-1-265-04562-9", available: true, copies: 3, featured: true, active: true },
  { title: "Environmental Science Today", author: "Amanda Green", genre: "Environmental Science", year: 2023, isbn: "978-0-13-489510-10", available: true, copies: 2, featured: true, active: true },
  { title: "Digital Signal Processing", author: "Alan Oppenheim", genre: "Engineering", year: 2022, isbn: "978-0-13-214635-12", available: true, copies: 4, featured: true, active: true },
  { title: "Biotechnology: Principles & Applications", author: "Rajesh Kumar", genre: "Biology", year: 2024, isbn: "978-0-07-352258-11", available: true, copies: 5, featured: true, active: true },
];

export const SEED_EVENTS = [
  { title: "National Library Week Celebration", description: "Join us for a week-long celebration of libraries with book readings, workshops, and cultural programs.", date: "2025-04-14", time: "10:00 AM - 4:00 PM", location: "Main Library Hall", category: "Celebration", registration: true, capacity: 200, registered: 145, active: true },
  { title: "Research Methodology Workshop", description: "Hands-on workshop on research methodologies for postgraduate students.", date: "2025-04-18", time: "2:00 PM - 5:00 PM", location: "Seminar Room A", category: "Workshop", registration: true, capacity: 50, registered: 38, active: true },
  { title: "Author Meet & Greet: Dr. Ananya Sharma", description: "Meet bestselling author Dr. Ananya Sharma as she discusses her latest book.", date: "2025-04-22", time: "11:00 AM - 1:00 PM", location: "Conference Hall", category: "Literary", registration: true, capacity: 100, registered: 72, active: true },
  { title: "Digital Literacy Bootcamp", description: "A comprehensive bootcamp covering digital research tools and online database navigation.", date: "2025-04-25", time: "9:00 AM - 3:00 PM", location: "Computer Lab 1", category: "Workshop", registration: true, capacity: 30, registered: 30, active: true },
  { title: "Database Training: Scopus & Web of Science", description: "Learn advanced search techniques for research databases.", date: "2025-05-02", time: "3:00 PM - 5:00 PM", location: "E-Resource Center", category: "Training", registration: true, capacity: 40, registered: 22, active: true },
  { title: "Open Access Week Symposium", description: "A symposium on open access publishing and institutional repositories.", date: "2025-05-10", time: "10:00 AM - 4:00 PM", location: "Auditorium", category: "Symposium", registration: true, capacity: 150, registered: 89, active: true },
];

export const SEED_NEWS = [
  { title: "Library Extends Operating Hours During Exam Season", excerpt: "The Central Library will remain open until 11 PM during the upcoming examination period.", content: "Extended hours will be from 7 AM to 11 PM on weekdays and 8 AM to 9 PM on weekends.", category: "Announcement", date: "2025-04-10", active: true },
  { title: "New Digital Archives: 1,000+ Rare Manuscripts Now Online", excerpt: "Over 1,000 rare manuscripts and historical documents are now available online.", content: "The digitization project took over 18 months to complete with support from the National Manuscript Mission.", category: "Digital Resources", date: "2025-04-08", active: true },
  { title: "OSGU Library Wins Best Academic Library Award 2025", excerpt: "The library has been recognized as the Best Academic Library at the National Library Excellence Awards 2025.", content: "The award was presented at a ceremony in New Delhi.", category: "Achievement", date: "2025-04-05", active: true },
  { title: "Spring Book Fair: Thousands of New Titles Added", excerpt: "Over 2,500 new titles added to our collection from 50+ publishers.", content: "New arrivals are being catalogued and will be available by mid-April.", category: "Collection", date: "2025-04-01", active: true },
  { title: "Plagiarism Awareness Workshop for Research Scholars", excerpt: "Over 150 research scholars attended the plagiarism awareness workshop.", content: "The workshop included hands-on training with Turnitin and iThenticate software.", category: "Workshop", date: "2025-03-28", active: true },
  { title: "Library Launches Mobile App for Easy Access", excerpt: "The new OSGU Library mobile app is now available for download.", content: "The app was developed in-house by the university IT team.", category: "Technology", date: "2025-03-25", active: true },
];

export const SEED_SERVICES = [
  { name: "Book Borrowing & Returns", description: "Borrow up to 10 books for 14 days. Renew online up to 2 times.", icon: "BookOpen", color: "#C63134", active: true, order: 0 },
  { name: "Interlibrary Loan (ILL)", description: "Request books and articles from partner libraries across India.", icon: "Globe", color: "#0095EB", active: true, order: 1 },
  { name: "Reference & Research Help", description: "Expert librarians available for research consultations and citation guidance.", icon: "GraduationCap", color: "#75B740", active: true, order: 2 },
  { name: "Printing & Photocopying", description: "High-speed printing, photocopying, and scanning services at affordable rates.", icon: "Printer", color: "#DBAA36", active: true, order: 3 },
  { name: "Computer Lab & Internet", description: "Fully equipped computer lab with 60+ workstations and high-speed internet.", icon: "Monitor", color: "#E98F10", active: true, order: 4 },
  { name: "Group Study Rooms", description: "Reserve collaborative study spaces with whiteboards and projectors.", icon: "Users", color: "#0E76A8", active: true, order: 5 },
  { name: "Scanning & Digitization", description: "Professional document scanning and digitization services.", icon: "ScanLine", color: "#8B5CF6", active: true, order: 6 },
  { name: "Accessibility Services", description: "Assistive technologies and specialized equipment for all users.", icon: "Accessibility", color: "#EC4899", active: true, order: 7 },
];

export const SEED_FAQS = [
  { question: "How do I get a library membership?", answer: "OSGU students and faculty automatically receive library membership upon enrollment. Visit the circulation desk with your OSGU ID card to activate your account.", category: "Membership", active: true, order: 0 },
  { question: "How many books can I borrow at a time?", answer: "Students can borrow up to 10 books for 14 days. Faculty members can borrow up to 20 books for 30 days.", category: "Borrowing", active: true, order: 1 },
  { question: "How do I renew my borrowed books?", answer: "You can renew books online through your library account or the mobile app. Each book can be renewed up to 2 times.", category: "Borrowing", active: true, order: 2 },
  { question: "What are the overdue fines?", answer: "A fine of Rs. 5 per day per book is charged for overdue items. Fines can be paid at the circulation desk or through the online portal.", category: "Borrowing", active: true, order: 3 },
  { question: "How do I access e-books from home?", answer: "Use the off-campus login portal on the library website and authenticate with your OSGU email credentials.", category: "Digital Resources", active: true, order: 4 },
  { question: "What research databases are available?", answer: "We subscribe to over 50 research databases including Scopus, Web of Science, JSTOR, IEEE Xplore, and PubMed Central.", category: "Digital Resources", active: true, order: 5 },
  { question: "How do I reserve a study room?", answer: "Study rooms can be booked online through the library website or mobile app. Rooms can be booked up to 7 days in advance.", category: "Services", active: true, order: 6 },
  { question: "What are the library's operating hours?", answer: "Regular hours: Mon-Fri 8:00 AM - 9:00 PM, Sat 9:00 AM - 6:00 PM, Sun 10:00 AM - 4:00 PM.", category: "General", active: true, order: 7 },
  { question: "Can I use the library if I'm not from OSGU?", answer: "Yes! External Membership is available at Rs. 1,000 per year with borrowing privileges.", category: "Membership", active: true, order: 8 },
];

export const SEED_STAFF = [
  { name: "Dr. Meera Patel", role: "Chief Librarian", email: "meera.patel@osgu.ac.in", phone: "+91-12345-67890", active: true },
  { name: "Prof. Rajesh Verma", role: "Deputy Librarian", email: "rajesh.verma@osgu.ac.in", phone: "+91-12345-67891", active: true },
  { name: "Anita Sharma", role: "Senior Librarian", email: "anita.sharma@osgu.ac.in", phone: "+91-12345-67892", active: true },
  { name: "Vikram Singh", role: "Systems Librarian", email: "vikram.singh@osgu.ac.in", phone: "+91-12345-67893", active: true },
  { name: "Neha Gupta", role: "Reference Librarian", email: "neha.gupta@osgu.ac.in", phone: "+91-12345-67894", active: true },
  { name: "Suresh Kumar", role: "Technical Assistant", email: "suresh.kumar@osgu.ac.in", phone: "+91-12345-67895", active: true },
];

export const SEED_ROOMS = [
  { name: "Study Room A", type: "Study Room", capacity: 4, features: JSON.stringify(["Whiteboard", "Power Outlets", "Wi-Fi"]), available: true },
  { name: "Study Room B", type: "Study Room", capacity: 4, features: JSON.stringify(["Whiteboard", "Power Outlets", "Wi-Fi"]), available: true },
  { name: "Conference Room 1", type: "Meeting Room", capacity: 12, features: JSON.stringify(["Projector", "Whiteboard", "Video Conferencing", "Wi-Fi"]), available: true },
  { name: "Conference Room 2", type: "Meeting Room", capacity: 8, features: JSON.stringify(["Projector", "Screen", "Wi-Fi"]), available: true },
  { name: "Quiet Zone A", type: "Quiet Zone", capacity: 30, features: JSON.stringify(["Silent Area", "Individual Desks", "Power Outlets"]), available: true },
  { name: "Computer Lab", type: "Computer Lab", capacity: 40, features: JSON.stringify(["40 Workstations", "High-Speed Internet", "Printing"]), available: true },
  { name: "Media Room", type: "Multimedia", capacity: 20, features: JSON.stringify(["Large Screen", "Sound System", "Streaming"]), available: true },
  { name: "Group Study Lounge", type: "Collaborative", capacity: 24, features: JSON.stringify(["Large Tables", "Whiteboards", "Wi-Fi", "Coffee Machine"]), available: true },
];

export const SEED_PLANS = [
  { name: "Student Membership", price: "Free", duration: "Academic Year", benefits: JSON.stringify(["Borrow up to 10 books", "Access all digital resources", "Book study rooms (free)", "Computer lab access", "Attend workshops & events", "Interlibrary loan services"]), active: true, featured: true },
  { name: "Faculty Membership", price: "Free", duration: "Employment Period", benefits: JSON.stringify(["Borrow up to 20 books", "Access all digital resources", "Priority room booking", "Research consultation", "ILL services (free)", "Extended loan periods (30 days)"]), active: true, featured: false },
  { name: "Alumni Membership", price: "Rs. 500", duration: "Per Year", benefits: JSON.stringify(["Borrow up to 5 books", "On-site digital resource access", "Study room booking", "Computer lab access", "Attend public events"]), active: true, featured: false },
  { name: "External Membership", price: "Rs. 1,000", duration: "Per Year", benefits: JSON.stringify(["Borrow up to 3 books", "On-site reading access", "Reference services", "Photocopying services", "Attend public events"]), active: true, featured: false },
];

export const SEED_RESOURCES = [
  { name: "Scopus", description: "Largest abstract and citation database of peer-reviewed literature", category: "Research Database", url: "https://www.scopus.com", icon: "Database", active: true },
  { name: "JSTOR", description: "Digital library of academic journals, books, and primary sources", category: "E-Journal", url: "https://www.jstor.org", icon: "Newspaper", active: true },
  { name: "IEEE Xplore", description: "Engineering and technology literature from IEEE", category: "Research Database", url: "https://ieeexplore.ieee.org", icon: "Database", active: true },
  { name: "SpringerLink", description: "Scientific, technical and medical research from Springer", category: "E-Journal", url: "https://link.springer.com", icon: "Newspaper", active: true },
  { name: "PubMed Central", description: "Biomedical and life sciences journal literature archive", category: "Research Database", url: "https://www.ncbi.nlm.nih.gov/pmc", icon: "Database", active: true },
  { name: "Web of Science", description: "Citation indexing and research discovery platform", category: "Research Database", url: "https://www.webofscience.com", icon: "Database", active: true },
  { name: "EBSCOhost", description: "Multi-disciplinary full-text database platform", category: "E-Journal", url: "https://search.ebscohost.com", icon: "Newspaper", active: true },
  { name: "ProQuest", description: "Dissertations, theses, and scholarly content", category: "E-Book", url: "https://www.proquest.com", icon: "BookOpen", active: true },
];

export const SEED_CONTENT = [
  { section: "hero", content: JSON.stringify({ badge: "Welcome to OSGU Central Library", title: "Your Gateway to Knowledge & Discovery", description: "Explore our vast collection of 50,000+ books, 500+ journals, digital resources, and research databases. Empowering education and research at OSGU." }) },
  { section: "stats", content: JSON.stringify([{ icon: "BookOpen", value: 50000, label: "Books & Volumes", suffix: "+" }, { icon: "Newspaper", value: 500, label: "Journals & Periodicals", suffix: "+" }, { icon: "Users", value: 10000, label: "Registered Members", suffix: "+" }, { icon: "Monitor", value: 200, label: "E-Resources & Databases", suffix: "+" }]) },
  { section: "announcements", content: JSON.stringify([{ title: "Extended Hours During Exam Season", date: "Apr 10, 2025", icon: "Clock", color: "#C63134" }, { title: "New Digital Archives: 1,000+ Rare Manuscripts", date: "Apr 8, 2025", icon: "Globe", color: "#0095EB" }, { title: "Best Academic Library Award 2025", date: "Apr 5, 2025", icon: "Star", color: "#DBAA36" }, { title: "Spring Book Fair: 2,500+ New Titles", date: "Apr 1, 2025", icon: "BookOpen", color: "#75B740" }]) },
  { section: "header", content: JSON.stringify({ ticker: ["📚 New Arrivals: 2,500+ books added to our collection — Browse the Catalog now!", "📢 Admissions Open for 2025-26 — Visit the Admission Office for details", "🏆 OSGU Central Library wins \"Best Academic Library\" Award 2025", "⏰ Extended Hours: Library open until 11 PM during exam season", "📱 New OSGU Library Mobile App — Download now on Android & iOS"], phone: "+91-12345-67890", email: "library@osgu.ac.in", libraryName: "CENTRAL LIBRARY", universityName: "Om Sterling Global University" }) },
  { section: "footer", content: JSON.stringify({ description: "The OSGU Central Library is the heart of academic excellence, providing access to a vast collection of books, journals, digital resources, and research databases for the entire university community.", address: "OSGU Campus, NH-52, Village Brahmanwas, Distt. Hisar, Haryana - 125001", phone: "+91-12345-67890", email: "library@osgu.ac.in", hours: "Mon-Fri: 8:00 AM - 9:00 PM | Sat: 9:00 AM - 6:00 PM | Sun: 10:00 AM - 4:00 PM", copyright: "© 2025 OSGU Central Library, Om Sterling Global University. All rights reserved.", socialLinks: { facebook: "#", twitter: "#", instagram: "#", linkedin: "#", youtube: "#" } }) },
  { section: "about_page", content: JSON.stringify({ mission: "To provide comprehensive library and information services that support the academic, research, and intellectual needs of the OSGU community.", vision: "To be a world-class academic library that fosters knowledge creation, innovation, and lifelong learning.", timeline: [{ year: "2015", title: "Foundation", description: "OSGU Central Library established with 5,000 volumes." }, { year: "2017", title: "Digital Transformation", description: "Launched digital library with e-books and online journals." }, { year: "2018", title: "Research Support", description: "Added Scopus, Web of Science, and 20+ research databases." }, { year: "2019", title: "Building Expansion", description: "Library expanded to 25,000 sq. ft. with new reading halls." }, { year: "2020", title: "COVID Adaptation", description: "Launched virtual library services and remote access portal." }, { year: "2021", title: "Smart Library", description: "Implemented RFID-based automated checkout system." }, { year: "2022", title: "50,000 Volumes", description: "Collection reached 50,000+ books and 500+ journal subscriptions." }, { year: "2023", title: "Innovation Hub", description: "Opened makerspace and multimedia production studio." }, { year: "2024", title: "National Award", description: "Received 'Best Academic Library' award from NLA." }], policies: [{ title: "Borrowing Policy", description: "Students: 10 books for 14 days. Faculty: 20 books for 30 days." }, { title: "Overdue Policy", description: "Fine of Rs. 5 per day per book." }, { title: "Membership Policy", description: "Free for OSGU students/faculty. Alumni: Rs. 500/year." }, { title: "Library Conduct", description: "Maintain silence. No food/drinks. Mobile phones on silent." }] }) },
  { section: "contact_page", content: JSON.stringify({ address: "OSGU Campus, NH-52, Village Brahmanwas, Distt. Hisar, Haryana - 125001", phone: "+91-12345-67890", email: "library@osgu.ac.in", hours: [{ day: "Monday - Friday", time: "8:00 AM - 9:00 PM" }, { day: "Saturday", time: "9:00 AM - 6:00 PM" }, { day: "Sunday", time: "10:00 AM - 4:00 PM" }, { day: "Exam Season", time: "7:00 AM - 11:00 PM" }, { day: "Holidays", time: "Closed" }], departments: [{ name: "Circulation Desk", phone: "+91-12345-67890", email: "circulation@osgu.ac.in" }, { name: "Reference Section", phone: "+91-12345-67891", email: "reference@osgu.ac.in" }, { name: "Digital Resources", phone: "+91-12345-67892", email: "digital@osgu.ac.in" }, { name: "Technical Section", phone: "+91-12345-67893", email: "technical@osgu.ac.in" }] }) },
  { section: "research_page", content: JSON.stringify({ citationTools: [{ name: "Zotero", description: "Free reference management tool.", url: "https://www.zotero.org" }, { name: "Mendeley", description: "Academic reference manager.", url: "https://www.mendeley.com" }, { name: "EndNote", description: "Professional reference management.", url: "https://endnote.com" }, { name: "Google Scholar", description: "Scholarly literature search.", url: "https://scholar.google.com" }], guides: [{ title: "Getting Started with Library Research", type: "Beginner" }, { title: "Advanced Database Searching", type: "Intermediate" }, { title: "Systematic Review Methods", type: "Advanced" }] }) },
  { section: "kids_page", content: JSON.stringify({ kidsCollections: [{ title: "Picture Books", age: "3-6 years", count: "500+", color: "#C63134" }, { title: "Early Readers", age: "5-7 years", count: "400+", color: "#0095EB" }, { title: "Children's Fiction", age: "7-12 years", count: "800+", color: "#75B740" }], programs: [{ title: "Summer Reading Challenge", age: "6-14 years", schedule: "May-July", color: "#C63134" }, { title: "Story Time Saturdays", age: "3-8 years", schedule: "Every Saturday 10 AM", color: "#0095EB" }] }) },
  { section: "account_page", content: JSON.stringify({ welcomeTitle: "My Library Account", welcomeMessage: "Manage your borrowed books, reservations, and profile settings.", features: [{ title: "View Borrowed Books", description: "See all books currently checked out with due dates." }, { title: "Reserve Books", description: "Place reservations on unavailable books." }, { title: "Renew Online", description: "Renew borrowed books from home." }, { title: "Reading History", description: "View your past borrowed books." }, { title: "Fine Payment", description: "Check and pay outstanding library fines." }, { title: "Profile Settings", description: "Update contact information and preferences." }] }) },
];
