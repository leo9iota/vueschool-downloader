# ⏬ VueSchool Downloader

## 🛠️ Tech Stack

![Skills](https://skills-icons.vercel.app/api/icons?i=ts,python,playwright)

## 🏗️ Setup

>You need to have Python installed and must rename `.env.example` to `.env` with your correct credentials for [vueschool.io](https://vueschool.io/).

1. Update system

```sh
sudo apt update
```

2. Download the latest version of YT-DLP

```sh
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
```

3. Set execution permissions

```sh
sudo chmod a+rx /usr/local/bin/yt-dlp
```

4. Verify latest version of YT-DLP

```sh
yt-dlp --version
```

5. Install aria2

```sh
sudo apt install aria2
```

6. Clone repository and go to top-level directory

```sh
git clone https://github.com/leo9iota/vueschool-downloader.git && cd vueschool-downloader
```

7. Install dependencies (optional)

```sh
npm i
```

8. Get the latest course URLs (optional)

```sh
npx tsx index.ts
```

9. Download the courses

```sh
python3 downloader.py
```
