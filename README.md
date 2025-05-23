# LIA EXPRESSEN

This is a collaborative project between web developers and digital designers to create a sleek, user-friendly interface for a company-student event. The event connects companies seeking interns (LIA) with students looking for internship opportunities. The website features separate sign-up sections for both companies and students, where they can create profiles that are showcased in the company and student card sections. The design is optimized for mobile-first, with a responsive layout for desktop screens as well.

## Installation

This project utilizes **Next.js** alongside **Supabase** for its core structure. For user registration and authentication, the project uses **Supabase Auth**, and for image management, it leverages **Supabase Storage Buckets**. The project also incorporates **ESLint** for maintaining code quality, along with **SVGR** for handling SVGs efficiently.

### Install Dependencies

This project uses **Next.js** without TypeScript, Tailwind CSS, or Turbopack. First, install the project dependencies by running:

```bash
npm install
```

or

```bash
yarn install
```

### Database Setup

Create the following tables in your Supabase database. These tables store the essential data for companies, students, programs, and specializations.

```SQL
-- programs
create table public.programs (
  id bigint generated by default as identity not null,
  program_name text not null,
  constraint programs_pkey primary key (id),
  constraint programs_program_name_key unique (program_name)
) TABLESPACE pg_default;
```

```SQL
-- specializations
create table public.specializations (
  id bigint generated by default as identity not null,
  specialization_name text not null,
  constraint specialization_pkey primary key (id),
  constraint specialization_specialization_name_key unique (specialization_name)
) TABLESPACE pg_default;
```

```SQL
-- roles
create table public.roles (
  id bigint generated by default as identity not null,
  role text not null,
  constraint roles_pkey primary key (id)
) TABLESPACE pg_default;
```

```SQL
-- users
create table public.users (
  id uuid not null default auth.uid (),
  created_at timestamp with time zone not null default now(),
  email text not null,
  role bigint not null,
  constraint users_pkey primary key (id),
  constraint users_email_key unique (email),
  constraint users_role_fkey foreign KEY (role) references roles (id) on update CASCADE on delete CASCADE,
  constraint users_role_fkey1 foreign KEY (role) references roles (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
```

```SQL
-- students
create table public.students (
  id bigint generated by default as identity not null,
  user_id uuid null,
  full_name text not null,
  bio text null,
  linkedin text null,
  portfolio text null,
  created_at timestamp with time zone not null default now(),
  constraint students_pkey primary key (id),
  constraint students_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;
```

```SQL
-- student_programs
create table public.student_programs (
  id bigint generated by default as identity not null,
  student_id bigint not null,
  program_id bigint not null,
  constraint student_programs_pkey primary key (id),
  constraint student_programs_program_id_fkey foreign KEY (program_id) references programs (id) on update CASCADE on delete CASCADE,
  constraint student_programs_student_id_fkey foreign KEY (student_id) references students (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
```

```SQL
-- student_specializations
create table public.student_specializations (
  id bigint generated by default as identity not null,
  student_id bigint not null,
  specialization_id bigint not null,
  constraint student_specializations_pkey primary key (id),
  constraint student_specializations_specialization_id_fkey foreign KEY (specialization_id) references specializations (id) on update CASCADE on delete CASCADE,
  constraint student_specializations_student_id_fkey foreign KEY (student_id) references students (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
```

```SQL
-- companies
create table public.companies (
  id bigint generated by default as identity not null,
  user_id uuid null,
  contact_person text not null,
  company_name text not null,
  created_at timestamp with time zone not null default now(),
  want_lia text null,
  company_info text null,
  constraint companies_pkey primary key (id),
  constraint companies_user_id_fkey foreign KEY (user_id) references users (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
```

```SQL
-- companies_specializations
create table public.company_specializations (
  id bigint generated by default as identity not null,
  company_id bigint not null,
  specializations_id bigint not null,
  constraint company_specializations_pkey primary key (id),
  constraint company_specializations_company_id_fkey foreign KEY (company_id) references companies (id) on update CASCADE on delete CASCADE,
  constraint company_specializations_specializations_id_fkey foreign KEY (specializations_id) references specializations (id) on update CASCADE on delete CASCADE
) TABLESPACE pg_default;
```

```SQL
-- images
create table public.images (
  id uuid not null default gen_random_uuid (),
  user_id uuid not null,
  url text null,
  created_at timestamp without time zone null default now(),
  constraint images_pkey primary key (id),
  constraint images_user_id_fkey foreign KEY (user_id) references users (id) on delete CASCADE
) TABLESPACE pg_default;
```

### .env Configuration

Create a `.env.local` file in the root of your project and add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Make sure to replace `<your-supabase-url>` and `<your-supabase-anon-key>` with your actual Supabase project values.

### Running the Project

Once the database tables are created and environment variables are set up, you can run the project locally using:

```bash
npm run dev
```

or

```bash
yarn dev
```

This will start the Next.js development server, and you can access the app at `http://localhost:3000`.

## Acknowledgments

This project utilizes the following tools and libraries:

- **Next.js** - A React framework that powers the frontend and handles server-side rendering.
- **Supabase** - Provides authentication and database services for the application.
- **ESLint** - Used for maintaining code quality and consistency throughout the project.
- **SVGR** - Helps in importing SVGs as React components efficiently.

We also appreciate the open-source community for making these tools available!
