# Wait-A-Moment React App

A simple but elegant loading page that handles waiting for backend services to start up before redirecting users.

![Loading Screen Preview](https://via.placeholder.com/600x400?text=Loading+Screen)

## Features

- **Elegant Loading Interface**: GitHub-inspired dark theme with a spinning loader to indicate progress
- **Automatic Backend Checking**: Polls the backend API until it becomes available
- **Auto-Restart Capability**: Automatically refreshes after 10 failed attempts
- **Real-time Feedback**: Shows current attempt number and status messages to keep users informed
- **Responsive Design**: Looks great on both desktop and mobile devices
- **Seamless Redirect**: Automatically redirects to the main application once the backend is available

## How It Works

This application serves as a "waiting room" for web applications whose backend services may take time to initialize. It:

1. Makes periodic API calls to check if the backend is ready
2. Displays a friendly loading interface with progress information
3. Automatically redirects users to the main application when ready
4. Self-restarts the checking process if too many attempts fail

## Configuration

The app uses two environment variables that should be set in your `.env` file:

- `VITE_PING_URL`: The URL to ping to check if the backend is ready
- `VITE_REDIRECT_URL`: The URL to redirect to once the backend is available

Example:
```
VITE_PING_URL=https://api.example.com/health
VITE_REDIRECT_URL=https://example.com/app
```

## Technologies

- React
- Vite
- Tailwind CSS
- Modern ES6+ JavaScript

## Development

This project was built with Vite for fast development and optimal production builds.

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Use Cases

- Cloud-hosted applications where backend services have a cold start
- Serverless applications that need time to initialize
- Any web application where you want to ensure the backend is ready before users interact with the frontend
