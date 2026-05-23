import { getPlatformSlugs, platformMap } from '../../utils/helpers';

/**
 * Displays platform icons for a game based on its parent_platforms data
 */
export default function PlatformIcons({ platforms, className = '' }) {
  const slugs = getPlatformSlugs(platforms);

  if (slugs.length === 0) return null;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {slugs.slice(0, 5).map((slug) => {
        const platform = platformMap[slug];
        if (!platform) return null;
        return (
          <span
            key={slug}
            title={platform.name}
            className="text-xs opacity-70 hover:opacity-100 transition-opacity"
          >
            {platform.icon}
          </span>
        );
      })}
      {slugs.length > 5 && (
        <span className="text-xs text-text-secondary">+{slugs.length - 5}</span>
      )}
    </div>
  );
}
