# **TurmerikTerminal: Investment Decision Support**

TurmerikTerminal is a web-based decision support tool designed to analyze NIH-funded clinical trials and provide investment recommendations based on financial and public health impact metrics. The application integrates real-time clinical trial data from **ClinicalTrials.gov**, retrieves project funding information from a **PostgreSQL database**, and uses **OpenAI's GPT-4** to generate investment justifications.

---

## **Features**
- **NIH Project Search**: Enter a valid NIH project number to analyze.
- **Financial Metrics**: View key financial indicators like **Total Cost, ROI, Value of Information (VOI), and Public ROI**.
- **Investment Decision**: Uses **AI-generated analysis** to provide a funding recommendation.
- **Visualization**: ROI and Quality-Adjusted Life Years (QALYs) displayed using charts.
- **Clinical Trials Data**: Fetches real-time trial information from **ClinicalTrials.gov**.

---

## **Tech Stack**
### **Frontend (Next.js)**
- **React** & **Next.js 14**
- **Tailwind CSS** for responsive UI
- **TypeScript** for type safety
- **Recharts** for data visualization
- **Fetch API** to interact with backend

### **Backend (FastAPI)**
- **FastAPI** for API development
- **PostgreSQL** for database storage
- **SQLAlchemy** for ORM
- **OpenAI GPT-4** for investment justification
- **CORS Middleware** to allow frontend-backend communication

---

## **Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/TurmerikTerminal.git
cd TurmerikTerminal
