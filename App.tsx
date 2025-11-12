import React, { useState, useCallback } from 'react';
import { AdSize, FormData, GeneratedCreative } from './types';
import { generateAdCreative, generateAdImage } from './services/geminiService';
import InputForm from './components/InputForm';
import AdPreview from './components/AdPreview';
import GeneratedContent from './components/GeneratedContent';
import { SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: 'Eco-Friendly Reusable Coffee Cup',
    productDescription: 'A stylish, durable, and leak-proof coffee cup made from recycled bamboo fiber. Keeps your coffee hot for hours. Available in 5 vibrant colors.',
    referenceImage: null,
    imagePrompt: 'A minimalist and clean product shot of the coffee cup on a light-colored, slightly textured background. The lighting should be soft and natural, emphasizing the cup\'s eco-friendly material.',
    targetAudience: 'Eco-conscious millennials, students, and office workers aged 20-35.',
    adTone: 'Persuasive',
    adObjective: 'Conversion',
    adSize: 'portrait',
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedCreative | null>(null);
  const [adImages, setAdImages] = useState<string[]>(['https://picsum.photos/1080/1350']);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState(true);

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, referenceImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleImageRemove = useCallback(() => {
    setFormData(prev => ({ ...prev, referenceImage: null }));
  }, []);


  const handleSizeChange = useCallback((size: AdSize) => {
    setFormData(prev => ({ ...prev, adSize: size }));
  }, []);

  const handleSelectImage = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setIsInitialState(false);
    setAdImages([]);
    setSelectedImageIndex(0);

    try {
      const imagePrompt = formData.imagePrompt.trim()
        ? formData.imagePrompt
        : `A visually appealing ad image for '${formData.productName}'. Key features: ${formData.productDescription}. The ad's tone is ${formData.adTone} and it targets ${formData.targetAudience}.`;

      const [creativeResponse, imageResponse] = await Promise.all([
        generateAdCreative(formData),
        generateAdImage(imagePrompt, formData.adSize, formData.referenceImage)
      ]);
      
      setGeneratedContent(creativeResponse);
      if (imageResponse && imageResponse.length > 0) {
        setAdImages(imageResponse);
      } else {
        setError('Failed to generate ad images, but text content was successful.');
        setAdImages([`https://picsum.photos/${formData.adSize === 'portrait' ? '1080/1350' : '1200/628'}`]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate ad creative. Please check your API key and try again.');
      setAdImages([`https://picsum.photos/${formData.adSize === 'portrait' ? '1080/1350' : '1200/628'}`]);
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-brand-gray-100 dark:bg-brand-gray-900 text-brand-gray-800 dark:text-brand-gray-200 font-sans">
      <header className="bg-white dark:bg-brand-gray-800 shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <SparklesIcon className="w-8 h-8 text-brand-blue" />
            <h1 className="text-2xl font-bold text-brand-gray-900 dark:text-white">
              Ads Creative Generator
            </h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <InputForm
              formData={formData}
              onFormChange={handleFormChange}
              onImageUpload={handleImageUpload}
              onImageRemove={handleImageRemove}
              onSizeChange={handleSizeChange}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <AdPreview
              adSize={formData.adSize}
              adImages={adImages}
              selectedImageIndex={selectedImageIndex}
              onSelectImage={handleSelectImage}
              isLoading={isLoading}
              isInitialState={isInitialState}
              generatedContent={generatedContent}
            />
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            {!isInitialState && (
              <GeneratedContent 
                content={generatedContent} 
                isLoading={isLoading} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
