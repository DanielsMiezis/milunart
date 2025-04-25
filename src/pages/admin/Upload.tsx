import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Upload, ArrowLeft, Loader } from 'lucide-react';
import { addArtwork, updateArtwork, getArtworks, uploadImage, Artwork } from '../../services/firebase';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const emptyArtwork: Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'> = {
  title: '',
  description: '',
  imageUrl: '',
  year: undefined,
  medium: '',
  dimensions: '',
  featured: false
};

const UploadPage = () => {
  const [artwork, setArtwork] = useState<Omit<Artwork, 'id' | 'createdAt' | 'updatedAt'>>(emptyArtwork);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [artworkId, setArtworkId] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're in edit mode based on URL query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const editId = params.get('edit');
    
    if (editId) {
      setIsEditMode(true);
      setArtworkId(editId);
      loadArtwork(editId);
    }
  }, [location]);

  const loadArtwork = async (id: string) => {
    setInitialLoading(true);
    try {
      const artworks = await getArtworks();
      const foundArtwork = artworks.find(a => a.id === id);
      
      if (foundArtwork) {
        setArtwork({
          title: foundArtwork.title,
          description: foundArtwork.description,
          imageUrl: foundArtwork.imageUrl,
          year: foundArtwork.year,
          medium: foundArtwork.medium || '',
          dimensions: foundArtwork.dimensions || '',
          featured: foundArtwork.featured || false
        });
        
        setPreview(foundArtwork.imageUrl);
      } else {
        setError('Artwork not found');
        navigate('/admin');
      }
    } catch (err) {
      console.error('Error loading artwork:', err);
      setError('Failed to load artwork');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setArtwork({ ...artwork, [name]: checked });
    } else if (name === 'year' && value) {
      setArtwork({ ...artwork, [name]: parseInt(value) });
    } else {
      setArtwork({ ...artwork, [name]: value });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file type
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate form
      if (!artwork.title) {
        throw new Error('Title is required');
      }
      
      if (!isEditMode && !file) {
        throw new Error('Please select an image');
      }
      
      // If we have a new file, upload it
      let imageUrl = artwork.imageUrl;
      if (file) {
        const timestamp = Date.now();
        const fileName = `artworks/${timestamp}_${file.name.replace(/\s+/g, '_')}`;
        imageUrl = await uploadImage(file, fileName);
      }
      
      const artworkData = {
        ...artwork,
        imageUrl
      };
      
      if (isEditMode && artworkId) {
        await updateArtwork(artworkId, artworkData);
      } else {
        await addArtwork(artworkData);
      }
      
      navigate('/admin');
    } catch (err: any) {
      console.error('Error saving artwork:', err);
      setError(err.message || 'Failed to save artwork');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <button
              onClick={() => navigate('/admin')}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-3xl font-serif">
              {isEditMode ? 'Edit Artwork' : 'Upload New Artwork'}
            </h1>
          </div>
          
          {error && (
            <div className="bg-error-500 bg-opacity-10 border border-error-500 text-error-500 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                {/* Image Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Artwork Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {preview ? (
                        <div className="mb-3">
                          <img 
                            src={preview} 
                            alt="Preview" 
                            className="max-h-64 mx-auto object-contain" 
                          />
                        </div>
                      ) : (
                        <div className="flex text-sm text-gray-600">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 hover:text-primary-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={artwork.featured}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                    Feature this artwork on homepage
                  </label>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={artwork.title}
                    onChange={handleInputChange}
                    required
                    className="input"
                  />
                </div>
                
                {/* Year */}
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={artwork.year || ''}
                    onChange={handleInputChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="input"
                  />
                </div>
                
                {/* Medium */}
                <div>
                  <label htmlFor="medium" className="block text-sm font-medium text-gray-700 mb-1">
                    Medium
                  </label>
                  <input
                    type="text"
                    id="medium"
                    name="medium"
                    value={artwork.medium}
                    onChange={handleInputChange}
                    placeholder="e.g., Oil on canvas"
                    className="input"
                  />
                </div>
                
                {/* Dimensions */}
                <div>
                  <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700 mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    id="dimensions"
                    name="dimensions"
                    value={artwork.dimensions}
                    onChange={handleInputChange}
                    placeholder="e.g., 24 x 36 inches"
                    className="input"
                  />
                </div>
                
                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={artwork.description}
                    onChange={handleInputChange}
                    className="input"
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="btn btn-outline mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary inline-flex items-center"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {isEditMode ? 'Update' : 'Upload'} Artwork
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;