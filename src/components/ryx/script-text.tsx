interface ScriptTextProps {
  children: string;
  className?: string;
}

export function ScriptText({ children, className = "" }: ScriptTextProps) {
  return (
    <span className={`ig-script ${className}`}>
      {children}
    </span>
  );
}
