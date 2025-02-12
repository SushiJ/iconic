# Iconic

Iconic is a cutting-edge SaaS application that leverages AI to generate high-quality, custom icons for your business. Powered by OpenAI's advanced language models, it streamlines the design process, allowing you to create unique and professional icons effortlessly. Whether you're building a brand, designing a website, or enhancing your product's visuals, Iconic delivers intelligent and stylish iconography in seconds.

## Features

- **User Authentication**: Secure user login and registration.
- **Responsive Design**: Optimized for various devices and screen sizes.
- **Database Integration**: Efficient data management with Drizzle ORM.
- **Styling**: Consistent and customizable UI using Tailwind CSS.

## Technologies Used

- **Next.js**: React framework for server-side rendering and static site generation.
- **NextAuth.js**: Authentication for Next.js applications.
- **Drizzle ORM**: TypeScript ORM for SQL databases.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Getting Started

To set up the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SushiJ/iconic.git
   cd iconic
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure environment variables**:
   - Duplicate `.env.example` and rename it to `.env`.
   - Fill in the necessary environment variables in the `.env` file.

4. **Run the development server**:
   ```bash
   pnpm dev
   ```
   Access the application at `http://localhost:3000`.

## Project Structure

- **`/src`**: Contains the main application code.
  - **`/pages`**: Next.js pages.
  - **`/components`**: Reusable UI components.
  - **`/styles`**: Global and component-specific styles.
  - **`/utils`**: Utility functions and helpers.

- **`/public`**: Static assets like images and icons.

## Images
Home ![Home](/iconic/landing.png)
Generate ![Generate](/iconic/generate.png)
Community ![Community](/iconic/community.png)

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/SushiJ/iconic/blob/main/LICENSE) file for more details.

---

*Note: This project was bootstrapped with [Create T3 App](https://create.t3.gg/), providing a solid foundation for building full-stack applications with Next.js.*
