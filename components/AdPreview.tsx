
import React from 'react';
import { AdSize, GeneratedCreative } from '../types';
import { WorldIcon, LikeIcon, CommentIcon, ShareIcon } from './Icons';

interface AdPreviewProps {
  adSize: AdSize;
  adImage: string;
  isLoading: boolean;
  isInitialState: boolean;
  generatedContent: GeneratedCreative | null;
}

const AdPreview: React.FC<AdPreviewProps> = ({ adSize, adImage, isLoading, isInitialState, generatedContent }) => {
  const aspectRatioClass = adSize === 'landscape' ? 'aspect-[1.91/1]' : 'aspect-[4/5]';
  
  const headline = generatedContent?.adCopies[0]?.headline || "Your Amazing Headline";
  const primaryText = generatedContent?.adCopies[0]?.primaryText || "Engaging primary text about your fantastic product goes here. Make it catchy!";
  const cta = generatedContent?.adCopies[0]?.callToAction || "Learn More";

  return (
    <div className="bg-white dark:bg-brand-gray-800 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-brand-gray-900 dark:text-white">2. Ad Preview</h2>
      <div className="max-w-md mx-auto bg-white dark:bg-brand-gray-800 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center">
            <img className="h-10 w-10 rounded-full" src="https://picsum.photos/50/50?grayscale" alt="Page Logo" />
            <div className="ml-3">
              <p className="text-sm font-semibold text-brand-gray-900 dark:text-white">Your Brand Name</p>
              <div className="flex items-center text-xs text-brand-gray-500 dark:text-brand-gray-400">
                <span>Sponsored</span>
                <span className="mx-1">·</span>
                <WorldIcon className="w-3 h-3" />
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm text-brand-gray-800 dark:text-brand-gray-200">
            {isInitialState ? "Your generated ad caption will appear here..." : (isLoading ? "Generating caption..." : (generatedContent?.caption || primaryText))}
          </p>
        </div>

        {/* Image/Video */}
        <div className={`relative bg-brand-gray-200 dark:bg-brand-gray-700 w-full ${aspectRatioClass}`}>
          {isLoading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <svg className="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
          <img src={adImage} alt="Ad creative" className="absolute inset-0 w-full h-full object-cover" />
        </div>
        
        {/* CTA Bar */}
        <div className="bg-brand-gray-100 dark:bg-brand-gray-700 p-3 flex justify-between items-center">
          <div className="text-left">
            <p className="text-xs text-brand-gray-500 dark:text-brand-gray-400 uppercase">yourwebsite.com</p>
            <p className="text-sm font-semibold text-brand-gray-900 dark:text-white">{headline}</p>
          </div>
          <button className="bg-brand-blue text-white font-bold text-sm py-2 px-5 rounded-md hover:bg-blue-600 transition-colors">
            {cta}
          </button>
        </div>

        {/* Actions */}
        <div className="flex justify-around border-t border-brand-gray-200 dark:border-brand-gray-600 p-1">
            <ActionButton icon={<LikeIcon />} label="Like" />
            <ActionButton icon={<CommentIcon />} label="Comment" />
            <ActionButton icon={<ShareIcon />} label="Share" />
        </div>
      </div>
    </div>
  );
};

const ActionButton: React.FC<{icon: React.ReactNode, label: string}> = ({icon, label}) => (
    <button className="flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-semibold text-brand-gray-600 dark:text-brand-gray-300 hover:bg-brand-gray-100 dark:hover:bg-brand-gray-700 transition-colors">
        {icon}
        {label}
    </button>
)


export default AdPreview;
