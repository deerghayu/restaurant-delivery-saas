interface ProfileCompletionCardProps {
  profileCompleteness: number;
}

export default function ProfileCompletionCard({ profileCompleteness }: ProfileCompletionCardProps) {
  return (
    <div className="text-right">
      <div className="bg-white rounded-lg p-4 shadow border border-gray-200">
        <div className="text-sm text-gray-600 mb-1">Profile Complete</div>
        <div className="text-xl font-bold text-gray-900 mb-2">{profileCompleteness}%</div>
        <div className="w-24 bg-gray-200 rounded-full h-2">
          <div 
            className="h-full rounded-full bg-green-500 transition-all"
            style={{ width: `${profileCompleteness}%` }}
          />
        </div>
      </div>
    </div>
  );
}