/**
 * Genre chip / pill component with active state styling
 */
export default function GenreChip({ genre, isActive, onClick, size = 'md' }) {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  return (
    <button
      onClick={() => onClick?.(genre)}
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        transition-all duration-300 cursor-pointer select-none
        ${sizeClasses[size]}
        ${
          isActive
            ? 'bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 text-neon-cyan border border-neon-cyan/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
            : 'bg-white/5 text-text-secondary border border-white/10 hover:bg-white/10 hover:text-text-primary hover:border-white/20'
        }
      `}
    >
      {genre.icon && <span className="text-sm">{genre.icon}</span>}
      <span>{genre.name}</span>
    </button>
  );
}
