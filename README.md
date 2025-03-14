# Next.js Defender Game

A simple browser-based defender game built with Next.js, TypeScript, and Framer Motion.

## Game Overview

In this game, you control a player at the center of the screen. Enemies spawn from the edges and move toward you. Your goal is to survive as long as possible by shooting the enemies before they reach you.

## Features

- Real-time game loop using `requestAnimationFrame`
- Automatic shooting at enemies within range
- Collision detection between bullets and enemies
- Score tracking
- Visual indicators for enemies in range
- Performance optimizations including player position caching

## Technologies Used

- Next.js 14
- TypeScript
- Framer Motion for animations
- Tailwind CSS for styling

## How to Play

1. Click "Start Game" to begin
2. Enemies will spawn from the edges and move toward you
3. Your character automatically shoots at enemies within range
4. If an enemy touches you, it's game over
5. Try to achieve the highest score possible!

## Development

This project uses a modular action-based architecture to separate game logic:

- `enemy-actions.ts`: Enemy movement and position tracking
- `bullet-actions.ts`: Bullet creation and collision detection
- `game-state.ts`: Game state management
- `collision-detection.ts`: Collision detection logic
- `range-detection.ts`: Enemy range tracking
- `utils.ts`: Utility functions

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to play the game.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
