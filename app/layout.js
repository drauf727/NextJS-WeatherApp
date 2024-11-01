import { WeatherProvider } from './context/WeatherContext';
import './styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <WeatherProvider>
          {children}
        </WeatherProvider>
      </body>
    </html>
  );
}