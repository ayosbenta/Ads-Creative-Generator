
import React, { useState, useCallback } from 'react';
import { GeneratedCreative } from '../types';
import { CopyIcon, CheckIcon, ChevronDownIcon, HashtagIcon, LightBulbIcon, PencilIcon } from './Icons';

interface GeneratedContentProps {
  content: GeneratedCreative | null;
  isLoading: boolean;
}

const GeneratedContent: React.FC<GeneratedContentProps> = ({ content, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-brand-gray-200 dark:bg-brand-gray-700 rounded-lg"></div>
        <div className="h-32 bg-brand-gray-200 dark:bg-brand-gray-700 rounded-lg"></div>
        <div className="h-24 bg-brand-gray-200 dark:bg-brand-gray-700 rounded-lg"></div>
        <div className="h-20 bg-brand-gray-200 dark:bg-brand-gray-700 rounded-lg"></div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="space-y-6">
      <CollapsibleSection title="Ad Copy Variations" icon={<PencilIcon />}>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {content.adCopies.map((copy, index) => (
            <div key={index} className="bg-brand-gray-100 dark:bg-brand-gray-900 p-4 rounded-lg">
              <h4 className="font-bold text-brand-gray-800 dark:text-white mb-2">Variation {index + 1}</h4>
              <CopyableText label="Headline" text={copy.headline} />
              <CopyableText label="Primary Text" text={copy.primaryText} />
              <CopyableText label="Call to Action" text={copy.callToAction} />
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Visual Concepts" icon={<LightBulbIcon />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.visualConcepts.map((concept, index) => (
            <div key={index} className="bg-brand-gray-100 dark:bg-brand-gray-900 p-4 rounded-lg">
              <h4 className="font-bold text-brand-gray-800 dark:text-white mb-2">Concept {index + 1}</h4>
              <CopyableText label="Layout" text={concept.layout} />
              <CopyableText label="Color Scheme" text={concept.colorScheme} />
              <CopyableText label="Image Style" text={concept.imageStyle} />
            </div>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Hashtags" icon={<HashtagIcon />}>
        <div className="flex flex-wrap gap-2 p-2">
            {content.hashtags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
            ))}
        </div>
         <CopyButton textToCopy={content.hashtags.join(' ')} className="mt-4 w-full" />
      </CollapsibleSection>
    </div>
  );
};


const CollapsibleSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="bg-white dark:bg-brand-gray-800 rounded-xl shadow-lg">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="bg-brand-blue text-white rounded-full p-2">{icon}</div>
                    <h3 className="text-lg font-bold text-brand-gray-900 dark:text-white">{title}</h3>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-brand-gray-500 dark:text-brand-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 border-t border-brand-gray-200 dark:border-brand-gray-700">
                    {children}
                </div>
            )}
        </div>
    )
}

const CopyableText: React.FC<{ label: string; text: string }> = ({ label, text }) => (
  <div className="mb-2">
    <div className="flex justify-between items-center">
      <p className="text-sm font-semibold text-brand-gray-600 dark:text-brand-gray-300">{label}</p>
      <CopyButton textToCopy={text} />
    </div>
    <p className="text-sm text-brand-gray-800 dark:text-brand-gray-200 bg-white dark:bg-brand-gray-800 p-2 rounded">{text}</p>
  </div>
);

const CopyButton: React.FC<{ textToCopy: string, className?: string }> = ({ textToCopy, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [textToCopy]);

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md transition-colors ${className} ${copied ? 'bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-200' : 'bg-brand-gray-200 dark:bg-brand-gray-600 text-brand-gray-600 dark:text-brand-gray-300 hover:bg-brand-gray-300 dark:hover:bg-brand-gray-500'}`}
      aria-label="Copy to clipboard"
    >
      {copied ? <CheckIcon className="w-4 h-4" /> : <CopyIcon className="w-4 h-4" />}
    </button>
  );
};


export default GeneratedContent;
