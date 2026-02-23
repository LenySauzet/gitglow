'use client';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import NumberFlow from '@number-flow/react';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const GitHubStarsButton = () => {
  const [stars, setStars] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    fetch('https://api.github.com/repos/LenySauzet/readme-generator')
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count));
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href="https://github.com/LenySauzet/readme-generator"
          target="_blank"
        >
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Star size={16} fill={isHovered ? 'currentColor' : 'none'} />
            <span className="text-xs font-departure text-muted-foreground">
              <NumberFlow value={isHovered ? stars + 1 : stars} />
            </span>
          </Button>
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>GitHub Stars</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default GitHubStarsButton;
