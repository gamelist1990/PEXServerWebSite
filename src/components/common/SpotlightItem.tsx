type SpotlightItemProps = {
  title: string;
  body: string;
};

export function SpotlightItem({ title, body }: SpotlightItemProps) {
  return (
    <div className="spotlight-item">
      <span>{title}</span>
      <strong>{body}</strong>
    </div>
  );
}
