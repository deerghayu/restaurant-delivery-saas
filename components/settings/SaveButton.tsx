import { Save } from 'lucide-react';

interface SaveButtonProps {
  hasChanges: boolean;
  loading: boolean;
  onSave: () => void;
}

export default function SaveButton({ hasChanges, loading, onSave }: SaveButtonProps) {
  if (!hasChanges) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      <button
        onClick={onSave}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </>
        )}
      </button>
    </div>
  );
}