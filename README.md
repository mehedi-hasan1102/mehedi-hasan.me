# Mehedi Hasan — Personal Website

A modern, responsive personal website built with Next.js (App Router) and TypeScript, designed to showcase my professional work, technical capabilities, and writing. This portfolio includes interactive sections, project highlights, blog content, GitHub activity visualization, and a lightweight demo authentication flow for experimenting with protected routes.

The portfolio also includes a lightweight demo authentication context for protected routes and experimental features.

**🚀 Features**
- Next.js App Router + TypeScript
- Tailwind CSS with custom CSS vars and next-themes
- Optimized LCP: hero image prioritized + `fetchPriority="high"`
- Blog + MDX content with refined typography
- Global “Last Visitor” footer: server-side location lookup + MongoDB storage
- GitHub activity visualization
- Responsive, animated UI (Framer Motion)

**🛠️ Tech Stack**
- Frontend: Next.js 16, TypeScript, Tailwind CSS, next-themes, Framer Motion
- Content: Local MDX/JSON
- Data: MongoDB (last visitor location)
- Deploy: Vercel

**📁 Project Structure**
```/
├── app/                → Next.js App Router pages
├── components/         → Reusable UI components
├── public/             → Assets and static files
├── data/               → Blog posts, JSON data
├── hooks/              → Custom React hooks
├── context/            → Demo auth context
└── styles/             → Global CSS and configs
```

**📦 Installation & Setup**

```bash
git clone https://github.com/mehedi-hasan1102/m-hasan.vercel.app
cd mehedi-hasan.vercel.app
pnpm install
cp .env.example .env.local   # fill in your values
pnpm dev
```

**Required env vars** (see [.env.example](.env.example))
- `MONGODB_URI`, `MONGODB_DB`
- `NEXT_PUBLIC_EMAILJS_*`, contact details, Calendly URL

**🌐 Live Demo**
- Hosted on Vercel → https://www.mehedi-hasan.me




**📬 Contact**

Mehedi Hasan

Full Stack Web Developer (MERN)

Email: mehedi.hasan11023@gmail.com

LinkedIn: https://www.linkedin.com/in/mehedi-hasan1102

Portfolio: https://www.mehedi-hasan.me

GitHub: https://github.com/mehedi-hasan1102


## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# yest
