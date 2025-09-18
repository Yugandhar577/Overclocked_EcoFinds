# Overclocked EcoFinds

**Sustainable Second-Hand Marketplace**

A web application aimed at empowering sustainable consumption by enabling users to buy & sell pre-owned goods. Built with **Node.js, Express, MongoDB, and EJS**, Overclocked EcoFinds is designed to be user-friendly, responsive, and trust-oriented.


## 🚀 Features

- 🔐 User Authentication (Register / Login)  
- 👤 User profile dashboard  
- 🛒 CRUD for Listings:
  - Create, Read, Update, Delete listings
  - Add multiple images (with default placeholder if none provided)  
- 🔎 Browse & Search listings by category or keyword  
- 📱 Responsive UI for desktop & mobile  
- 💾 MongoDB session storage  

---

## 🛠 Tech Stack

| Component        | Technology |
|------------------|------------|
| Backend Server   | Node.js + Express |
| Templating       | EJS (with `ejs-mate`) |
| Database         | MongoDB (Mongoose) |
| Sessions/Auth    | express-session + connect-mongo |
| Styles/Static    | Tailwind CSS + Public assets |
| Utilities        | method-override, body-parser |

---

## ⚙️ Setup & Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/Yugandhar577/Overclocked_EcoFinds.git
   cd Overclocked_EcoFinds
   ```
   
2. Install dependencies

   ```bash
   npm install
   ```

3. Start MongoDB locally (or update the connection string in `app.js`)

4. (Optional) Seed the database with sample listings

   ```bash
   node init/db.js
   ```

5. Run the server

   ```bash
   node app.js
   ```

   Or use **nodemon** for auto-restart:

   ```bash
   npx nodemon app.js
   ```

6. Open the app in your browser → [http://localhost:8080](http://localhost:8080)

---

## ✍️ Usage

* **Create Listings:** Add new products with title, description, category, and images
* **Browse Listings:** View, search, and filter items
* **User Dashboard:** Manage your own listings
* **Default Images:** Placeholder image is used if none provided

---

## 🧪 Roadmap / Improvements

* [ ] File/image upload system (not just URLs)
* [ ] Payment integration
* [ ] Messaging between users
* [ ] Mobile-first UI redesign
* [ ] Stronger form validation

---

## 📬 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "Added new feature"`)
4. Push branch (`git push origin feature-name`)
5. Open a Pull Request 🎉

---

## 💡 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

* Inspired by sustainable e-commerce platforms
* Built for hackathon/learning purposes


## to do
* work on the styling // Take inspiration from MongoDB Website's UI ^*
*add proper server side err handling 
