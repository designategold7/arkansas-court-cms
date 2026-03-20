# ASRP CourtConnect: Judicial Case Management System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.x-black?logo=next.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

**Developed for Arkansas State Roleplay (ASRP)**
**Lead Developer:** designategold7

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Core Features](#core-features)
3. [Prerequisites](#prerequisites)
4. [Security & Discord Authentication](#security--discord-authentication)
5. [Installation & Deployment](#installation--deployment)
6. [Environment Variables](#environment-variables)

---

## System Architecture

The ASRP CourtConnect CMS is a standalone, high-performance web application designed to replicate the real-world Arkansas Administrative Office of the Courts (AOC) portal. 

Operating independently of the FiveM server process, it interfaces directly with the existing ESX database. This architecture guarantees zero tick-time degradation on the live game server while providing the Department of Justice (DOJ) with a persistent, highly immersive record management system.

---

## Core Features

* **Zero-Latency Database Integration:** Reads character data directly from the ESX users table via optimized connection pooling.
* **Discord OAuth2 SSO:** Passwordless authentication. The system dynamically reads ASRP Discord roles to grant or deny access to judicial portals.
* **Automated Document Generation:** Formatted legal templates (e.g., Form AOC-44A) automatically populate based on DA/Judge inputs.
* **Asynchronous Judicial Workflow:** Judges can review affidavits, issue warrants, and clear dockets from any web browser without needing to queue into the FiveM server.

---

## Prerequisites

The host Virtual Private Server (VPS) or Dedicated Machine requires the following infrastructure:

* **Node.js**: v18.17.0 or higher.
* **MySQL/MariaDB**: v8.0+ (Utilizing the existing FiveM database).
* **PM2**: For production process management.
* **Discord Developer Application**: For OAuth2 routing.

---

## Security & Discord Authentication

Access control is strictly enforced via NextAuth.js and the Discord API. To configure the authentication gateway:

1. Navigate to the Discord Developer Portal.
2. Create a New Application named ASRP CourtConnect.
3. In the OAuth2 tab, add your callback redirect URI:
   * Production: http://YOUR_VPS_IP:3000/api/auth/callback/discord
4. Copy the Client ID and Client Secret.
5. CRITICAL AUTHORIZATION STEP: Navigate to OAuth2 > URL Generator. Select the bot scope. Copy the generated URL and use it to invite the application to the ASRP Discord Server. The application must be present in the server's offline member list to securely verify player roles.

---

## Installation & Deployment

### 1. System Initialization
Clone the repository or extract the project files to your desired web directory on the host machine.

    cd /var/www/arkansas-court-cms
    npm install

### 2. Environment Configuration
Create the secure environment file in the root directory. Reference the Environment Variables section below for the required key-value pairs.

    nano .env.local

### 3. Production Build
Compile the Next.js application for optimal production performance.

    npm run build

### 4. Process Management (PM2)
Start the application using PM2 to ensure it runs continuously and restarts automatically upon server reboots.

    pm2 start npm --name "asrp-courtconnect" -- start
    pm2 save
    pm2 startup

The portal is now live and accessible at http://YOUR_VPS_IP:3000.

---

## Environment Variables

The .env.local file dictates the secure connections between the web server, the game database, and Discord. Use the following structure:

    # Database Configuration (Match your server.cfg / oxmysql settings)
    DB_HOST=127.0.0.1
    DB_USER=root
    DB_PASSWORD=SecureDatabasePassword123!
    DB_NAME=essentialmode

    # Discord Authentication (Sourced from the Developer Portal)
    DISCORD_CLIENT_ID=112233445566778899
    DISCORD_CLIENT_SECRET=aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV
    DISCORD_GUILD_ID=998877665544332211

    # NextAuth Security
    NEXTAUTH_URL=http://192.168.1.50:3000
    NEXTAUTH_SECRET=8f7e6d5c4b3a2109fedcba9876543210

---

arkansas-court-cms/
│
├── .gitignore                  (Created in Step 2)
├── package.json                (Created in Step 2)
├── README.md                   (The markdown file from our previous step)
├── tailwind.config.js          (Standard Tailwind config)
├── postcss.config.js           (Standard PostCSS config)
│
├── lib/
│   └── db.js                   (The MySQL connection pool)
│
└── app/
    ├── globals.css             (Tailwind imports)
    ├── layout.js               (Root layout with SessionWrapper)
    ├── SessionWrapper.js       (NextAuth provider wrapper)
    ├── page.js                 (The Public Search ARCourts UI)
    │
    ├── api/
    │   ├── auth/
    │   │   └── [...nextauth]/
    │   │       └── route.js    (Discord OAuth logic)
    │   └── cases/
    │       └── route.js        (MySQL GET/POST API logic)
    │
    ├── file-case/
    │   └── page.js             (The DA eFiling Portal UI)
    │
    ├── judge-portal/
    │   └── page.js             (The Judge Dashboard UI)
    │
    └── cases/
        └── [id]/
            └── page.js         (The Dynamic Document View UI)
*End of Technical Documentation. Unauthorized distribution of this system outside of ASRP is prohibited.*