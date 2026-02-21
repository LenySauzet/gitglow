import { GitGlowIcon } from '@/components/Header';

const GitGlowLogo = () => {
  return (
    <div className="flex items-center gap-3">
      <GitGlowIcon width={25} height={25} />
      <h1 className="text-2xl font-medium font-instrument tracking-wider">
        GitGlow
      </h1>
    </div>
  );
};

export default GitGlowLogo;
