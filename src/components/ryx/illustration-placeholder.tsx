export function IllustrationPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`bg-ig-white-5 rounded-2xl flex items-center justify-center ${className}`}>
      <span className="text-ig-text-light-muted text-sm">[ Illustration ]</span>
    </div>
  );
}
