# JobBotics

A web application to help users prepare for job interviews. It includes features like AI-powered mock interviews, course materials, and note-taking.

## Features

*   **User Authentication:** Secure sign-up and sign-in functionality using Clerk.
*   **AI-Powered Mock Interviews:** Practice mock interviews with AI-powered questions and receive feedback on your performance.
*   **Course Materials:** Access course materials to enhance your skills and knowledge.
*   **Note-Taking:** Keep track of your notes and progress.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/)
*   **UI:** [React](https://react.dev/) with [Shadcn UI](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
*   **Database:** [Neon](https://neon.tech/)
*   **Background Jobs:** [Inngest](https://www.inngest.com/)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/job-botics.git
    cd job-botics
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables. You can use `.env.example` as a template.

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database

To push schema changes to the database, run:
```bash
pnpm db:push
```

To open the Drizzle Studio, run:
```bash
pnpm db:studio
```

## Folder Structure

```
.
├── app/              # Next.js App Router pages and API routes
├── components/       # Reusable UI components
├── inngest/          # Inngest functions and client
├── lib/              # Utility functions
├── public/           # Static assets
└── utils/            # Database schema and utilities
```

## API Routes

*   `/api/courses`: Manages courses.
*   `/api/create-user`: Creates a new user.
*   `/api/generate`: AI-powered generation.
*   `/api/generate-course-outline`: Generates a course outline.
*   `/api/inngest`: Inngest webhook.
*   `/api/save`: Saves data.
*   `/api/study-type`: Manages study types.