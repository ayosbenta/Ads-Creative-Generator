
import React from 'react';
import { AdSize, FormData } from '../types';
import { SparklesIcon } from './Icons';

interface InputFormProps {
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSizeChange: (size: AdSize) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ formData, onFormChange, onSizeChange, onSubmit, isLoading }) => {
  const adTones = ['Funny', 'Persuasive', 'Professional', 'Luxury', 'Friendly', 'Bold'];
  const adObjectives = ['Brand Awareness', 'Engagement', 'Conversion', 'Lead Generation', 'Traffic'];

  return (
    <div className="bg-white dark:bg-brand-gray-800 p-6 rounded-xl shadow-lg space-y-6 sticky top-24">
      <h2 className="text-xl font-bold text-brand-gray-900 dark:text-white">1. Enter Your Ad Details</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="productName" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-1">Product Name</label>
          <input type="text" name="productName" id="productName" value={formData.productName} onChange={onFormChange} className="w-full bg-brand-gray-50 dark:bg-brand-gray-700 border border-brand-gray-300 dark:border-brand-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue dark:text-white transition" />
        </div>
        <div>
          <label htmlFor="productDescription" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-1">Product Description</label>
          <textarea name="productDescription" id="productDescription" value={formData.productDescription} onChange={onFormChange} rows={4} className="w-full bg-brand-gray-50 dark:bg-brand-gray-700 border border-brand-gray-300 dark:border-brand-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue dark:text-white transition"></textarea>
        </div>
        <div>
          <label htmlFor="imagePrompt" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-1">Image Prompt <span className="text-brand-gray-500">(Optional)</span></label>
          <textarea name="imagePrompt" id="imagePrompt" value={formData.imagePrompt} onChange={onFormChange} rows={3} className="w-full bg-brand-gray-50 dark:bg-brand-gray-700 border border-brand-gray-300 dark:border-brand-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue dark:text-white transition" placeholder="Describe the image you want to generate. e.g., style, mood, key elements..."></textarea>
        </div>
        <div>
          <label htmlFor="targetAudience" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-1">Target Audience</label>
          <input type="text" name="targetAudience" id="targetAudience" value={formData.targetAudience} onChange={onFormChange} className="w-full bg-brand-gray-50 dark:bg-brand-gray-700 border border-brand-gray-300 dark:border-brand-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue dark:text-white transition" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="adTone" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-1">Ad Tone</label>
            <select name="adTone" id="adTone" value={formData.adTone} onChange={onFormChange} className="w-full bg-brand-gray-50 dark:bg-brand-gray-700 border border-brand-gray-300 dark:border-brand-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue dark:text-white transition">
              {adTones.map(tone => <option key={tone} value={tone}>{tone}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="adObjective" className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-1">Ad Objective</label>
            <select name="adObjective" id="adObjective" value={formData.adObjective} onChange={onFormChange} className="w-full bg-brand-gray-50 dark:bg-brand-gray-700 border border-brand-gray-300 dark:border-brand-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue dark:text-white transition">
              {adObjectives.map(obj => <option key={obj} value={obj}>{obj}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-2">Ad Size</label>
          <div className="flex rounded-lg border border-brand-gray-300 dark:border-brand-gray-600 p-1">
            <button
              type="button"
              onClick={() => onSizeChange('landscape')}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${formData.adSize === 'landscape' ? 'bg-brand-blue text-white' : 'text-brand-gray-600 dark:text-brand-gray-300 hover:bg-brand-gray-100 dark:hover:bg-brand-gray-700'}`}
            >
              Landscape
            </button>
            <button
              type="button"
              onClick={() => onSizeChange('portrait')}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${formData.adSize === 'portrait' ? 'bg-brand-blue text-white' : 'text-brand-gray-600 dark:text-brand-gray-300 hover:bg-brand-gray-100 dark:hover:bg-brand-gray-700'}`}
            >
              Portrait
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full flex justify-center items-center gap-2 bg-brand-blue text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate Creatives
          </>
        )}
      </button>
    </div>
  );
};

export default InputForm;