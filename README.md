# Slotify 

Slotify is a tool designed to automate helpdesk slot scheduling for clubs.

It eliminates the need for manual spreadsheets and Google Forms by collecting member availability and generating day order wise schedules all in one platform.
Perfect for managing shifts & event promotions.

## Features
- **Free Hour Form**: Members fill their free hours, day order wise. Each form has a unique form id 
- **Schedule Generator**: Admins can automatically generate a schedule based on the form responses for each day order using the unique form id
- **(WIP) Dashboard**: Page to view created forms, answered forms

## Screenshots

1) Create a form
<img width="1371" alt="image" src="https://github.com/user-attachments/assets/9cc326a0-1bc4-46a1-9ee6-a7500a601b1c">
<br> </br>

2) Share & fill the form
<img width="1381" alt="image" src="https://github.com/user-attachments/assets/b9d4887a-3876-4327-b1ec-e9b975555062">
<br> </br>

3) Generate the schedule
<img width="1359" alt="image" src="https://github.com/user-attachments/assets/170581d1-ea02-4e42-96a9-30c9cac235c9">
<img width="1425" alt="image" src="https://github.com/user-attachments/assets/aa7d07fa-b70b-4469-b9c0-4af9392aea21">


## Tech Stack

- **Next.js**
- **TypeScript**
- **PostgreSQL**
- **Prisma**
- **shadcn/ui**


## Sel Hosting Guide

Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FSwebi%2FSlotify&env=DATABASE_URL&envDescription=ADD%20A%20POSTGRESQL%20DATABASE%20URL%20HERE)


Alternatively: 

1. Fork the repository:
   ```bash
   https://github.com/Swebi/Slotify.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables in your `.env` file (refer env example):
   ```
    DATABASE_URL=
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

5. Prisma setup:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

---

