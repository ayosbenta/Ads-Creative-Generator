import React, { useState, useCallback } from 'react';
import { AdSize, FormData } from '../types';
import { SparklesIcon, UploadIcon, XCircleIcon } from './Icons';

interface InputFormProps {
  formData: FormData;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
  onSizeChange: (size: AdSize) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ formData, onFormChange, onImageUpload, onImageRemove, onSizeChange, onSubmit, isLoading }) => {
  const adTones = ['Funny', 'Persuasive', 'Professional', 'Luxury', 'Friendly', 'Bold'];
  const adObjectives = ['Brand Awareness', 'Engagement', 'Conversion', 'Lead Generation', 'Traffic'];
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };


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
          <label className="block text-sm font-medium text-brand-gray-700 dark:text-brand-gray-300 mb-1">Upload Image <span className="text-brand-gray-500">(Optional)</span></label>
          {formData.referenceImage ? (
            <div className="relative group">
              <img src={formData.referenceImage} alt="Reference" className="w-full h-auto rounded-lg object-cover" />
              <button 
                onClick={onImageRemove}
                className="absolute top-2 right-2 p-1 bg-black bg-opacity-50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragEvents}
              onDragEnter={handleDragEvents}
              onDragLeave={handleDragEvents}
              className={`relative flex justify-center items-center w-full h-32 px-6 pt-5 pb-6 border-2 border-brand-gray-300 dark:border-brand-gray-600 border-dashed rounded-md transition-colors ${isDragging ? 'border-brand-blue bg-blue-50 dark:bg-blue-900/20' : ''}`}
            >
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-10 w-10 text-brand-gray-400" />
                <div className="flex text-sm text-brand-gray-600 dark:text-brand-gray-400">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white dark:bg-brand-gray-800 rounded-md font-medium text-brand-blue hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-blue">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-brand-gray-500 dark:text-brand-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          )}
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
