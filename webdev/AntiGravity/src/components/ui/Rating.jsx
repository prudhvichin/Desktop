import { getMetacriticColor, getMetacriticBorderColor } from '../../utils/helpers';

/**
 * Displays a game's rating with color-coded Metacritic-style badge
 */
export default function Rating({ score, size = 'md', showLabel = false }) {
  if (!score && score !== 0) return null;

  const colorClass = getMetacriticColor(score);
  const borderClass = getMetacriticBorderColor(score);

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5 min-w-[28px]',
    md: 'text-sm px-2 py-1 min-w-[36px]',
    lg: 'text-base px-3 py-1.5 min-w-[44px]',
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`
          inline-flex items-center justify-center font-bold rounded-md
          border ${borderClass} ${colorClass} ${sizeClasses[size]}
          bg-transparent
        `}
      >
        {score}
      </span>
      {showLabel && (
        <span className="text-xs text-text-secondary">
          {score >= 75 ? 'Exceptional' : score >= 50 ? 'Mixed' : 'Poor'}
        </span>
      )}
    </div>
  );
}
