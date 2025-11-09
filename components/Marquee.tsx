export default function Marquee() {
  const text = "Machine Learning ★ TensorFlow ★ PyTorch ★ Meta-Learning ★ Kaggle Competitor ★ Self-Taught Developer ★ ";

  return (
    <div className="relative z-10 bg-black text-white py-4 overflow-hidden border-y-2 border-black">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="pr-12 font-semibold">{text}</span>
        <span className="pr-12 font-semibold">{text}</span>
      </div>
    </div>
  );
}
