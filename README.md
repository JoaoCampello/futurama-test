# Futurama Presenter

An interactive React-based web application showcasing Futurama episodes and characters, featuring a dynamic landing page, episode browser, and character catalog.

## Features

- **Landing Page**: Dynamic landing page with video background and navigation buttons
- **Episodes Page**: Browse episodes by season with detailed information
  - Season selection
  - Episode cards with images
  - Air dates and broadcast codes
  - Loading states and error handling
- **Characters Page**: Browse and filter Futurama characters
  - Filter by gender, status, and species
  - Character cards with images
  - Detailed character information
  - Dynamic filtering system
- **Responsive Design**: Works on desktop and mobile devices
- **Video Backgrounds**: Themed video backgrounds across pages
- **Loading States**: Smooth loading transitions

## Project Structure

```
futurama
├── src
│   ├── components
│   │   ├── LandingPage
│   │   │   ├── index.jsx
│   │   │   └── styles.css
│   │   ├── Episodes
│   │   │   ├── index.jsx
│   │   │   └── styles.css
│   │   ├── Characters
│   │   │   ├── index.jsx
│   │   │   └── styles.css
│   │   ├── Header
│   │   │   ├── index.jsx
│   │   │   └── styles.css
│   │   └── Footer
│   │       ├── index.jsx
│   │       └── styles.css
│   ├── App.jsx
│   └── index.jsx
├── public
│   ├── assets
│   │   ├── videos
│   │   │   └── background-vid.mp4
│   │   └── images
│   │       ├── episodes
│   │       └── characters
│   └── index.html
└── README.md
```

## Technologies Used

- React
- React Router
- CSS3 with modern features
- Futurama API (futuramaapi.com)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd futurama
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

## API Integration

The application uses the Futurama API with the following endpoints:

- Episodes: `https://futuramaapi.com/api/seasons`
- Episode Details: `https://futuramaapi.com/api/episodes/{id}`
- Characters: `https://futuramaapi.com/api/characters`

## Features in Detail

### Episodes Page
- Season selection buttons
- Episode cards with images and details
- Air date and broadcast code display
- Loading states for both seasons and episodes
- Error handling for missing images

### Characters Page
- Filter characters by:
  - Gender (Male, Female, Unknown)
  - Status (Alive, Dead, Unknown)
  - Species (Human, Robot, Head, Alien, Mutant, Monster)
- Character cards with:
  - Character image
  - Name
  - Species
  - Status
  - Gender

## Styling

The project uses a consistent theme with:
- Blue accent colors (#00c3ff)
- Video backgrounds with overlay effects
- Hover animations on interactive elements
- Responsive grid layouts
- Custom loading states

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License.