'use client';

import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

const GitHubStarsButton = () => {
  const [stars, setStars] = useState(0);
  useEffect(() => {
    fetch('https://api.github.com/repos/LenySauzet/readme-generator')
      .then((res) => res.json())
      .then((data) => setStars(data.stargazers_count));
  }, []);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a href="https://github.com/LenySauzet/readme-generator" target="_blank">
          <Button size="sm" variant="ghost" className="flex items-center gap-2">
            <Star size={16} />
            <span className="text-xs font-departure text-muted-foreground">
              {stars}
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
