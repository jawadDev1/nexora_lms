interface StatsCounterProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const StatsCounter: React.FC<StatsCounterProps> = ({ value, label, icon }) => {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {value}
      </div>
      <div className="text-[#797979] text-sm">{label}</div>
    </div>
  );
};

export default StatsCounter;
