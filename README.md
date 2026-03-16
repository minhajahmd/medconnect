<div align="center">
  <br />
    <a href="https://youtu.be/lEflo_sc82g?feature=shared" target="_blank">
      <img src="https://github.com/minhajahmd/medconnect/blob/main/public/assets/images/Cover.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

  <h3 align="center">A HealthCare Management System</h3>

</div>

# MedConnect

A full-stack healthcare patient management platform built with Next.js and Appwrite. MedConnect streamlines the end-to-end patient journey — from registration and appointment booking to AI-assisted triage and admin-side workflow management.


## Overview

MedConnect was built to address common friction points in outpatient healthcare workflows. Patients can self-register, submit symptoms, and book appointments without administrative overhead. An AI triage layer automatically classifies symptom urgency, surfacing high-priority cases to providers first. Admins manage scheduling, confirmations, and cancellations through a secure role-gated dashboard.



## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, ShadCN UI |
| Backend | Next.js API Routes, Appwrite (Auth, Database, Storage) |
| AI | OpenAI API (GPT-3.5 Turbo) |
| Notifications | Twilio SMS |
| Monitoring | Sentry |
| Deployment | Vercel |



## Features

**Patient-facing**
- Self-registration with profile creation and file upload via Appwrite Storage
- Multi-step appointment booking with doctor selection and time slot management
- Automated SMS confirmation on appointment scheduling via Twilio
- AI-powered symptom triage — patients submit symptoms at registration and receive an urgency classification (High / Medium / Low) powered by OpenAI

**Admin-facing**
- Secure role-gated admin dashboard with session-based authentication
- View all appointments with AI-generated urgency badges to prioritize high-risk cases
- Confirm, reschedule, or cancel appointments with automated patient notifications
- Real-time error tracking and performance monitoring via Sentry



## AI Triage Feature

The triage module is a custom addition built on top of the core platform. During patient registration, submitted symptoms are sent to a Next.js API route that queries the OpenAI API with a structured medical triage prompt. The response classifies urgency as High, Medium, or Low with a one-sentence clinical reason.

The result is stored alongside the appointment record in Appwrite and surfaced as a color-coded badge in the admin dashboard — enabling providers to prioritize critical cases without manually reviewing every submission.

```
POST /api/triage
Body: { symptoms: string }
Response: { urgency: "High | Medium | Low", reason: string }
```



## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Appwrite instance (cloud or self-hosted)
- OpenAI API key
- Twilio account SID and auth token

### Installation

```bash
git clone https://github.com/minhajahmd/medconnect.git
cd medconnect
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Appwrite
NEXT_PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1
PROJECT_ID=your_project_id
API_KEY=your_api_key
DATABASE_ID=your_database_id
PATIENT_COLLECTION_ID=your_patient_collection_id
APPOINTMENT_COLLECTION_ID=your_appointment_collection_id
NEXT_PUBLIC_BUCKET_ID=your_bucket_id

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# Admin
NEXT_PUBLIC_ADMIN_PASSKEY=your_admin_passkey
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.



## Project Structure

```
medconnect/
├── app/
│   ├── api/
│   │   └── triage/          # OpenAI triage API route
│   ├── admin/               # Admin dashboard
│   └── patients/            # Patient registration and booking flows
├── components/              # Reusable UI components
├── lib/
│   ├── actions/             # Appwrite server actions
│   └── utils.ts
└── types/                   # TypeScript type definitions
```



## Monitoring

Application performance and error tracking are handled via Sentry. API error rates, p95 latency, and client-side exceptions are monitored across both patient and admin request flows.



## License

MIT
