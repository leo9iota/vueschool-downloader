# ⏬ VueSchool Downloader  

A useful tool to fetch and download the latest courses from [VueSchool.io](https://vueschool.io/).  
This project is intended for **educational purposes only**.

## 🛠️ Tech Stack  

![Skills](https://skills-icons.vercel.app/api/icons?i=ts,python,playwright)  

## 📋 Requirements  

- **Python** (latest version recommended)  
- **Node.js** (optional, for fetching course URLs)  
- **YT-DLP** (used for downloading videos)  
- **Aria2** (used for parallel downloads)  

## ⚙️ Setup Guide  

### 1️⃣ Install System Dependencies  

First, update your package list:  

```sh
sudo apt update && sudo apt upgrade -y
```

Then, install `aria2`:  

```sh
sudo apt install aria2 -y
```

### 2️⃣ Install YT-DLP  

Download and install the latest version of YT-DLP:  

```sh
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

Verify the installation:  

```sh
yt-dlp --version
```

### 3️⃣ Clone the Repository  

```sh
git clone https://github.com/leo9iota/vueschool-downloader.git  
cd vueschool-downloader
```

### 4️⃣ Configure Environment Variables  

Rename `.env.example` to `.env` and update it with your VueSchool.io credentials:  

```sh
mv .env.example .env
nano .env  # Edit with your credentials
```

### 5️⃣ (Optional) Install Node.js Dependencies  

If you want to fetch the latest course URLs dynamically:  

```sh
npm install
```

### 6️⃣ (Optional) Fetch Course URLs  

```sh
npx tsx index.ts
```

### 7️⃣ Download Courses  

Run the Python downloader script:  

```sh
python3 downloader.py
```

## 🚀 Features  

✅ Fetches the latest VueSchool course URLs automatically  
✅ Supports **YT-DLP** for high-quality downloads  
✅ Uses **Aria2** for faster parallel downloads  
✅ Simple and easy setup  

## ✨ Contribute

Please read the [CONTRIBUTING](./CONTRIBUTING.md) for information on how to contribute to this project.
