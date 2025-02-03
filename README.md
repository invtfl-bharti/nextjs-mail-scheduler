This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
# Next.js Mail Scheduler

This project is a mail scheduling application built with Next.js. It allows users to select a sender profile, choose recipients, and schedule emails to be sent at a specified date and time.

## Features

- **Profile Management**: Switch between different sender profiles or create new ones.
- **Recipient Management**: Select recipients from predefined lists.
- **Date and Time Picker**: Choose the date and time for scheduling emails.
- **Mail Template Editor**: Edit and save email templates.
- **Schedule Emails**: Schedule emails to be sent at a specified date and time.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nextjs-mail-scheduler.git
   cd nextjs-mail-scheduler
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open your browser and navigate to `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```

## Project Structure

- `src/components`: Contains all the React components used in the application.
- `src/custom-hooks`: Contains custom hooks used in the application.
- `public`: Contains static assets such as images.
- `pages`: Contains Next.js pages.

## Custom Hooks

### useOutsideClick

A custom hook to detect clicks outside of a given ref.

```javascript
import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
```

## Components

### TimePicker

A component to select time.

### ScheduleInput

A component to manage the scheduling input form.

### ScheduledList

A component to display the list of scheduled emails.

### RecipientListDropdown

A component to select recipient lists.

### ProfileSwitcher

A component to switch between different sender profiles.

### MailTemplateEditor

A component to edit and save mail templates.

### DatePicker

A component to select a date.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
```
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
