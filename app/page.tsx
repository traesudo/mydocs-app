import Image from 'next/image';
import Link from 'next/link';

const App: React.FC = () => {
  return (
    <div style={{
      width: '100%',
      height: '80vh', // Use vh to specify the height as a percentage of the viewport height
      position: 'relative', // Add position relative for next/image
      float:'left',
    }}>
      <Link href="/docs">
        <Image
          src="/home.png"
          alt="Background Image"
          layout="fill" // Fill the container
          objectFit="contain" // Ensure the entire image is visible
        />
      </Link>
    </div>
  );
};

export default App;
